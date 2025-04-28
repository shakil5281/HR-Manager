import {
    AudioWaveform,
    BookOpen,
    Bot,
    CircleCheckBig,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    ShieldUser,
    SquareTerminal,
} from "lucide-react"

export const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    Home: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Task",
            url: "/task",
            icon: CircleCheckBig,
        },
        {
            name: "Users",
            url: "/users",
            icon: ShieldUser,
        },
    ],
    navMain: [
        {
            title: "Manpower",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Create Employee",
                    url: "/create-employee",
                },
                {
                    title: "Employee List",
                    url: "/employee-list",
                },
                {
                    title: "Job Age",
                    url: "/job-age",
                },
                {
                    title: "Requirement",
                    url: "/requirement",
                }
            ]

        },
        {
            title: "Attendance",
            url: "#",
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: "Summary",
                    url: "/summary",
                },
                {
                    title: "Daily Attendance",
                    url: "/daily-attendance",
                },
                {
                    title: "Job Card",
                    url: "/job-card",
                },
                {
                    title: "Leave",
                    url: "/leave",
                },
                {
                    title: "Overtime",
                    url: "/overtime",
                },
                {
                    title: "Holidays",
                    url: "/holidays",
                }
            ],
        },
        {
            title: "Payroll",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Summary",
                    url: "/summary",
                },
                {
                    title: "Salary",
                    url: "/salary",
                },
                {
                    title: "Salary Structure",
                    url: "/salary-structure",
                },
                {
                    title: "Salary Process",
                    url: "/salary-process",
                },
                {
                    title: "Salary Slip",
                    url: "/salary-slip",
                },
                {
                    title: "Daily Salary sheet",
                    url: "/daily-salary-sheet",
                },
                {
                    title: "Monthly Salary sheet",
                    url: "/monthly-salary-sheet",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Company Information",
                    url: "/compary-information",
                },
                {
                    title: "Department",
                    url: "/department",
                },
                {
                    title: "Designation",
                    url: "designation",
                },
                {
                    title: "Section",
                    url: "/section",
                },
                {
                    title: "Shift",
                    url: "/shift",
                },
                {
                    title: "location",
                    url: "/location",
                },
                {
                    title: "Degree",
                    url: "/degree",
                },
                {
                    title: "",
                    url: ""
                }
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "/general",
                },
                {
                    title: "Users",
                    url: "/users",
                },
                {
                    title: "Permissions",
                    url: "/permissions",
                },
                {
                    title: "Limits",
                    url: "/limits",
                },
            ],
        },
        {
            title: "ZK Device",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Status",
                    url: "/status",
                },
                {
                    title: "Data Collection",
                    url: "/data-collection",
                },
                {
                    title: "User Management",
                    url: "/user-management",
                },
                {
                    title: "Backup",
                    url: "/backup",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}