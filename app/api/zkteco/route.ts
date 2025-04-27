import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import ZKLib from 'node-zklib'

// Step 1: Device list
const devices = [
  { ip: '192.168.1.201', port: 4370 },
  { ip: '192.168.1.202', port: 4370 },
  { ip: '192.168.1.203', port: 4370 },
  { ip: '192.168.1.204', port: 4370 },
  { ip: '192.168.1.220', port: 4370 },
]

export async function GET() {
  try {
    for (const device of devices) {
      const zkInstance = new ZKLib(device.ip, device.port, 10000, 4000)

      try {
        // Connect to each device
        await zkInstance.createSocket()

        // Get attendance logs from device
        const attendances: any = await zkInstance.getAttendances()

        console.log(`Attendance from device ${device.ip}:`, attendances.data)

        for (const attendance of attendances.data) {
          // Check if attendance already exists
          const existing = await prisma.attendance.findFirst({
            where: {
              userSn: attendance.userSn,
              recordTime: new Date(attendance.recordTime),
            },
          })

          if (!existing) {
            // Save attendance if not duplicate
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

        // Disconnect device after data fetch
        await zkInstance.disconnect()

      } catch (deviceError) {
        console.error(`Error connecting device ${device.ip}:`, deviceError)
      }
    }

    return NextResponse.json({ message: 'All devices attendance stored successfully' })
  } catch (error) {
    console.error('Error processing devices:', error)
    return NextResponse.json({ message: 'Error fetching attendance' }, { status: 500 })
  }
}
