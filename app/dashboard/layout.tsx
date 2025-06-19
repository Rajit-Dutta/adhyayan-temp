"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  LineChart,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "Courses", href: "/dashboard/courses" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: LineChart, label: "Progress", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Feedback", href: "/dashboard/feedback" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="neo-brutalism-sidebar">
          <SidebarHeader className="flex h-16 items-center border-b-2 border-foreground px-4">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-black">ADHYAYAN</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-2">
            <div className="my-4 rounded-md border-2 border-foreground p-3 bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold">Student Name</p>
                  <p className="text-xs">student@adhyayan.com</p>
                </div>
              </div>
            </div>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className={`neo-brutalism-button ${pathname === item.href ? "neo-brutalism-active" : ""}`}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-bold">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t-2 border-foreground p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="neo-brutalism-button">
                  <Link href="/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span className="font-bold">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="neo-brutalism-button">
                  <Link href="/">
                    <LogOut className="h-5 w-5" />
                    <span className="font-bold">Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b-2 border-foreground bg-background px-4 sm:px-6">
            <div className="flex md:hidden">
              <SidebarTrigger className="border-2 border-foreground rounded-md" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-black">
                {sidebarItems.find((item) => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="icon" className="relative border-2 border-foreground rounded-md">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <Button variant="outline" size="icon" className="border-2 border-foreground rounded-md">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
