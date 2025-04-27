'use client'

import { useEffect, useState } from 'react'

interface DeviceStatus {
  device: string
  status: string
  error?: {
    message: string
    ip: string
    command: string
  }
}

const AdminDashboard = () => {
  const [deviceStatuses, setDeviceStatuses] = useState<DeviceStatus[]>([])

  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const response = await fetch('/api/device-status')
        const data = await response.json()
        setDeviceStatuses(data.results || [])
      } catch (error) {
        console.error('Error fetching device status:', error)
      }
    }

    fetchDeviceStatus()
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="overflow-hidden shadow-xl sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Device IP</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Error</th>
            </tr>
          </thead>
          <tbody>
            {deviceStatuses.map((status, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{status.device}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{status.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {status.error ? (
                    <div>
                      <p className="font-medium">Message: {status.error.message}</p>
                      <p>IP: {status.error.ip}</p>
                      <p>Command: {status.error.command}</p>
                    </div>
                  ) : (
                    <span className="text-green-500">No errors</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
