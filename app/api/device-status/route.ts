import { NextResponse } from 'next/server'
import * as ping from 'ping'  // Install 'ping' module to ping devices
import ZKLib from 'node-zklib'

async function checkDeviceStatus(ip:any) {
  // First, ping the device to check if it's reachable
  const pingResult = await ping.promise.probe(ip)

  if (!pingResult.alive) {
    return { status: 'Offline', error: { message: 'No response', ip, command: 'Ping' } }
  }

  // If device is reachable, check if the ZK device responds via TCP
  try {
    const zkInstance = new ZKLib(ip, 4370, 10000, 4000)
    await zkInstance.createSocket()
    await zkInstance.disconnect()
    return { status: 'Online', error: null }
  } catch (error:any) {
    return { status: 'Offline', error: { message: error.message, ip, command: 'TCP CONNECT' } }
  }
}

export async function GET() {
  const deviceIPs = ['192.168.1.201', '192.168.1.202', '192.168.1.203', '192.168.1.204', '192.168.1.220']

  const results = await Promise.all(deviceIPs.map(async (ip) => {
    const status = await checkDeviceStatus(ip)
    return { device: ip, ...status }
  }))

  return NextResponse.json({ message: 'Device status fetched successfully', results })
}
