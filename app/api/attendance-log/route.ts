import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const attendances = await prisma.attendance.findMany({
      orderBy: {
        recordTime: 'desc',
      },
    })

    return NextResponse.json({ data: attendances })
  } catch (error) {
    console.error('Error fetching attendance from database:', error)
    return NextResponse.json({ message: 'Error fetching attendance data' }, { status: 500 })
  }
}


// Dynamic route হবে [id]/route.ts

type Params = {
  params: {
    id: string
  }
}

