import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import ZKLib from 'node-zklib'
import { exec } from 'child_process'

// Device List
const devices = [
  { ip: '192.168.1.201', port: 4370 },
  { ip: '192.168.1.202', port: 4370 },
  { ip: '192.168.1.203', port: 4370 },
  { ip: '192.168.1.204', port: 4370 },
  { ip: '192.168.1.220', port: 4370 },
]

// Function: Ping Check
async function pingDevice(ip: string): Promise<boolean> {
  return new Promise((resolve) => {
    exec(`ping -n 1 ${ip}`, (error, stdout) => {
      if (error) {
        resolve(false)
      } else {
        resolve(stdout.includes('TTL='))
      }
    })
  })
}

export async function GET() {
  try {
    const allResults = []

    for (const device of devices) {
      const isAlive = await pingDevice(device.ip)

      if (!isAlive) {
        console.log(`Device ${device.ip} is offline. Skipping.`)
        allResults.push({ device: device.ip, status: 'Offline - Skipped' })
        continue
      }

      console.log(`Connecting to device: ${device.ip}`)

      const zkInstance = new ZKLib(device.ip, device.port, 10000, 4000)

      try {
        await zkInstance.createSocket()

        let attendances: any = null
        try {
          attendances = await zkInstance.getAttendances()
        } catch (attendanceError) {
          console.error(`Error fetching attendance from ${device.ip}:`, attendanceError)
          await zkInstance.disconnect()
          allResults.push({ device: device.ip, status: 'Failed to fetch attendance - Skipped' })
          continue
        }

        if (!attendances || !Array.isArray(attendances.data) || attendances.data.length === 0) {
          console.log(`No attendance logs from device ${device.ip}`)
          await zkInstance.disconnect()
          allResults.push({ device: device.ip, status: 'No logs found - Skipped' })
          continue
        }

        console.log(`Fetched ${attendances.data.length} logs from ${device.ip}`)

        for (const attendance of attendances.data) {
          if (!attendance.userSn || !attendance.recordTime) {
            console.log(`Invalid attendance data, skipping entry:`, attendance)
            continue
          }

          const existing = await prisma.attendance.findFirst({
            where: {
              userSn: attendance.userSn,
              recordTime: new Date(attendance.recordTime),
            },
          })

          if (!existing) {
            await prisma.attendance.create({
              data: {
                userSn: attendance.userSn,
                deviceUserId: attendance.deviceUserId,
                recordTime: new Date(attendance.recordTime),
                ip: attendance.ip,
              },
            })
          }
        }

        await zkInstance.disconnect()
        allResults.push({ device: device.ip, status: 'Success' })

      } catch (deviceError: any) {
        console.error(`Error connecting to device ${device.ip}:`, deviceError?.err || deviceError)

        try {
          await zkInstance.disconnect()
        } catch (disconnectError) {
          console.error(`Failed to disconnect device ${device.ip}:`, disconnectError)
        }

        allResults.push({
          device: device.ip,
          status: 'Failed to connect or fetch',
          error: {
            message: deviceError?.err?.message || 'Unknown device error',
            ip: deviceError?.ip || device.ip,
            command: deviceError?.command || 'Unknown command'
          }
        })
      }
    }

    return NextResponse.json({ message: 'Attendance collection process completed.', results: allResults })

  } catch (error) {
    console.error('Unexpected error during attendance collection:', error)
    return NextResponse.json({ message: 'Unexpected server error', error: String(error) }, { status: 500 })
  }
}
