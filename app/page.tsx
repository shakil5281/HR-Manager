import { Button } from "@/components/ui/button";
import Link from "next/link";

// app/hr/page.tsx (Next.js 14 App Router)
export default function HrHomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 flex justify-center items-center flex-col">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, HR Manager 👋</h1>
          <p className="mt-2 text-gray-600">Here’s your dashboard overview. Manage everything at one place.</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Employees" description="Manage employee data" icon="👥" />
          <Card title="Leave Requests" description="Approve or reject leaves" icon="📝" />
          <Card title="Reports" description="View daily/monthly reports" icon="📊" />
          <Card title="Settings" description="Manage system settings" icon="⚙️" />
        </div>
      </div>
      <div className="mt-12">
        <Link href='/login'>
          <Button variant='outline' className="cursor-pointer px-12">Login</Button>
        </Link>
      </div>
    </main>
  );
}

// Reusable Card Component
function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  );
}
