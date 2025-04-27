import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

export async function GET(){
    return NextResponse.json({ message: 'Delete IP'})
}


// export async function DELETE(request: Request, context: { params: { id: string } }) {
//   const { id } = context.params
  
//   try {
//     // Step 1: Check if the Attendance exists
//     const existingAttendance = await prisma.attendance.findUnique({
//       where: {
//         id: Number(id),
//       },
//     })

//     if (!existingAttendance) {
//       return NextResponse.json({ message: 'Attendance ID not found' }, { status: 404 })
//     }

//     // Step 2: If found, then delete
//     const deletedAttendance = await prisma.attendance.delete({
//       where: {
//         id: Number(id),
//       },
//     })

//     return NextResponse.json({ message: 'Attendance deleted successfully', data: deletedAttendance })
//   } catch (error) {
//     console.error('Error deleting attendance:', error)
//     return NextResponse.json({ message: 'Error deleting attendance' }, { status: 500 })
//   }
// }
