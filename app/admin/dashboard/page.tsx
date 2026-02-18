"use client"

import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  MessageSquare,
  FileText,
  Briefcase,
  Newspaper,
  Users,
} from "lucide-react"
import { ContactsTable } from "@/components/admin/contacts-table"
import { KycTable } from "@/components/admin/kyc-table"
import { BlogsManager } from "@/components/admin/blogs-manager"
import { CareersManager } from "@/components/admin/careers-manager"
import { ApplicantsTable } from "@/components/admin/applicants-table"

export default function AdminDashboardPage() {
  const router = useRouter()

  async function handleLogout() {
    document.cookie = "admin_token=; path=/; max-age=0"
    router.push("/admin")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your website content and submissions.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="contacts"
            className="gap-2 rounded-lg border border-border bg-card px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger
            value="kyc"
            className="gap-2 rounded-lg border border-border bg-card px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="h-4 w-4" />
            KYC
          </TabsTrigger>
          <TabsTrigger
            value="blogs"
            className="gap-2 rounded-lg border border-border bg-card px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Newspaper className="h-4 w-4" />
            Blogs
          </TabsTrigger>
          <TabsTrigger
            value="careers"
            className="gap-2 rounded-lg border border-border bg-card px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Briefcase className="h-4 w-4" />
            Careers
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="gap-2 rounded-lg border border-border bg-card px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="h-4 w-4" />
            Applicants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <ContactsTable />
        </TabsContent>
        <TabsContent value="kyc">
          <KycTable />
        </TabsContent>
        <TabsContent value="blogs">
          <BlogsManager />
        </TabsContent>
        <TabsContent value="careers">
          <CareersManager />
        </TabsContent>
        <TabsContent value="applicants">
          <ApplicantsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
