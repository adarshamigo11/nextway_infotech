import {
  BarChart3,
  Code2,
  Users,
  GraduationCap,
  Plane,
  Scale,
  TrendingUp,
  Shield,
  Zap,
  LineChart,
  Settings,
  Briefcase,
  BookOpen,
  Bus,
  Globe,
  FileText,
  Gavel,
  Clock,
} from "lucide-react"

export interface ServiceData {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: React.ComponentType<{ className?: string }>
  features: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[]
  benefits: string[]
}

export const servicesData: ServiceData[] = [
  {
    slug: "algo-trading",
    title: "Algo Trading Solutions",
    shortTitle: "Algo Trading",
    description:
      "Automated trading strategies powered by advanced algorithms for optimal market performance.",
    longDescription:
      "Our algorithmic trading platform enables traders and institutions to execute sophisticated trading strategies with precision and speed. We build custom trading bots, backtesting engines, and real-time market analysis tools that give you a competitive edge in financial markets. From high-frequency trading to portfolio optimization, our solutions cover the full spectrum of algorithmic trading needs.",
    icon: BarChart3,
    features: [
      { icon: LineChart, title: "Real-Time Analytics", description: "Live market data processing and visualization with sub-second latency." },
      { icon: Shield, title: "Risk Management", description: "Built-in risk controls and automated stop-loss mechanisms to protect your capital." },
      { icon: Zap, title: "High-Speed Execution", description: "Ultra-low latency order execution for time-sensitive trading strategies." },
      { icon: TrendingUp, title: "Backtesting Engine", description: "Test your strategies against historical data before deploying to live markets." },
    ],
    benefits: [
      "Eliminate emotional decision-making from trading",
      "Execute trades 24/7 without manual intervention",
      "Process market data faster than humanly possible",
      "Diversify strategies across multiple instruments",
      "Reduce operational costs with automation",
    ],
  },
  {
    slug: "software-development",
    title: "Custom Software Development",
    shortTitle: "Software Development",
    description:
      "Custom software solutions built with modern technologies to solve complex business challenges.",
    longDescription:
      "We design and develop bespoke software solutions that align perfectly with your business processes. Our team of experienced developers uses modern frameworks and agile methodologies to deliver scalable, maintainable applications. From web and mobile apps to enterprise systems and APIs, we handle projects of any complexity and scale.",
    icon: Code2,
    features: [
      { icon: Globe, title: "Web Applications", description: "Modern, responsive web apps using React, Next.js, and other cutting-edge frameworks." },
      { icon: Settings, title: "API Development", description: "RESTful and GraphQL APIs with robust authentication and documentation." },
      { icon: Shield, title: "Security First", description: "Security best practices baked into every layer of the application." },
      { icon: Zap, title: "Performance Optimized", description: "Fast-loading, optimized applications that provide excellent user experience." },
    ],
    benefits: [
      "Tailored solutions that fit your exact requirements",
      "Scalable architecture that grows with your business",
      "Modern tech stack ensuring long-term maintainability",
      "Agile development with regular progress updates",
      "Post-launch support and maintenance",
    ],
  },
  {
    slug: "hrm-payroll",
    title: "HRM & Payroll Management",
    shortTitle: "HRM & Payroll",
    description:
      "Streamline your human resource operations and payroll management with our integrated platform.",
    longDescription:
      "Our comprehensive HRM and Payroll management system automates every aspect of human resource operations. From employee onboarding and attendance tracking to payroll processing and tax compliance, our platform handles it all. Reduce administrative overhead, minimize errors, and empower your HR team with powerful tools and analytics.",
    icon: Users,
    features: [
      { icon: Users, title: "Employee Management", description: "Complete employee lifecycle management from onboarding to exit." },
      { icon: Clock, title: "Attendance & Leave", description: "Automated attendance tracking and leave management with policy enforcement." },
      { icon: Briefcase, title: "Payroll Processing", description: "Accurate, compliant payroll processing with tax calculations and reports." },
      { icon: TrendingUp, title: "HR Analytics", description: "Actionable insights and reports for data-driven HR decisions." },
    ],
    benefits: [
      "Reduce payroll processing time by up to 80%",
      "Ensure compliance with labor laws and tax regulations",
      "Employee self-service portal for common HR requests",
      "Automated attendance and leave tracking",
      "Detailed HR analytics and reporting dashboards",
    ],
  },
  {
    slug: "school-management",
    title: "School Management System",
    shortTitle: "School Management",
    description:
      "Comprehensive school ERP system for managing academics, administration, and communication.",
    longDescription:
      "Our School Management System is a complete ERP solution designed for educational institutions. It integrates academics, administration, finance, and communication into a single unified platform. Teachers, students, parents, and administrators all benefit from streamlined workflows, real-time updates, and powerful reporting capabilities.",
    icon: GraduationCap,
    features: [
      { icon: BookOpen, title: "Academic Management", description: "Manage curricula, timetables, exams, and grading with ease." },
      { icon: Users, title: "Student & Parent Portal", description: "Dedicated portals for students and parents to track progress and communicate." },
      { icon: Briefcase, title: "Administration", description: "Fee management, transport tracking, inventory, and staff management." },
      { icon: TrendingUp, title: "Reports & Analytics", description: "Comprehensive reports on student performance, attendance, and finances." },
    ],
    benefits: [
      "Digitize all school operations in one platform",
      "Improve parent-school communication significantly",
      "Automate fee collection and financial reporting",
      "Track student academic performance over time",
      "Reduce administrative workload for teachers and staff",
    ],
  },
  {
    slug: "tour-travel",
    title: "Tour & Travel Management",
    shortTitle: "Tour & Travel",
    description:
      "End-to-end travel management software for agencies and tour operators.",
    longDescription:
      "Our Tour and Travel management platform provides a complete solution for travel agencies and tour operators. Manage bookings, itineraries, customer relationships, and finances all in one place. With built-in CRM, invoicing, and reporting tools, you can focus on creating memorable travel experiences while we handle the operational complexity.",
    icon: Plane,
    features: [
      { icon: Globe, title: "Booking Management", description: "Centralized booking system for flights, hotels, and tour packages." },
      { icon: Bus, title: "Itinerary Builder", description: "Create and share detailed travel itineraries with clients." },
      { icon: Users, title: "Customer CRM", description: "Track customer preferences, history, and communication in one place." },
      { icon: FileText, title: "Invoicing & Finance", description: "Automated invoicing, payment tracking, and financial reporting." },
    ],
    benefits: [
      "Manage all bookings from a centralized dashboard",
      "Automate invoicing and payment reminders",
      "Build and share beautiful itineraries in minutes",
      "Track customer preferences for personalized service",
      "Real-time availability checks and booking confirmations",
    ],
  },
  {
    slug: "law-firm",
    title: "Law Firm Management",
    shortTitle: "Law Firm",
    description:
      "Digital case management and workflow solutions tailored for legal professionals.",
    longDescription:
      "Our Law Firm Management system digitizes and streamlines legal practice operations. From case management and document storage to client communication and billing, our platform is purpose-built for law firms and legal departments. Improve case tracking, meet deadlines, and deliver better outcomes for your clients with our comprehensive legal technology solution.",
    icon: Scale,
    features: [
      { icon: Gavel, title: "Case Management", description: "Track cases, hearings, deadlines, and outcomes in a structured workflow." },
      { icon: FileText, title: "Document Management", description: "Secure storage and organization of legal documents with version control." },
      { icon: Users, title: "Client Portal", description: "Dedicated portal for clients to track case progress and communicate securely." },
      { icon: Clock, title: "Time & Billing", description: "Track billable hours and generate detailed invoices automatically." },
    ],
    benefits: [
      "Never miss a court date or filing deadline",
      "Secure, organized access to all case documents",
      "Transparent client communication and progress tracking",
      "Automated time tracking and invoice generation",
      "Reduce administrative burden on legal professionals",
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug)
}
