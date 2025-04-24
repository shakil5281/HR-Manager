import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const reports = await prisma.productionReport.findMany()
  return NextResponse.json(reports)
}
