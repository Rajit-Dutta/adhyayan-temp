"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  FileText,
  Home,
  LineChart,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAtom } from "jotai";
import { loadableStudentCookieData } from "@/lib/store/student";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { studentID } = useParams();
  const pathname = usePathname();

  const [student] = useAtom(loadableStudentCookieData);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: `/${studentID}/dashboard` },
    {
      icon: BookOpen,
      label: "Courses",
      href: `/${studentID}/dashboard/courses`,
    },
    {
      icon: FileText,
      label: "Assignments",
      href: `/${studentID}/dashboard/assignments`,
    },
    {
      icon: LineChart,
      label: "Progress",
      href: `/${studentID}/dashboard/progress`,
    },
    {
      icon: MessageSquare,
      label: "Feedback",
      href: `/${studentID}/dashboard/feedback`,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen">
        <Sidebar className="neo-brutalism-sidebar p-3">
          <SidebarContent className="px-2">
            <div className="my-4 rounded-md border-2 border-foreground p-3 bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold">{student.jwtDecoded.name}</p>
                  <p className="text-xs">{student.jwtDecoded.email}</p>
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
                    className={`neo-brutalism-button my-1 ${pathname === item.href ? "neo-brutalism-active" : ""}`}
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
                <SidebarMenuButton
                  asChild
                  className="neo-brutalism-button my-1"
                >
                  <Link href={`/${studentID}/dashboard/settings`}>
                    <Settings className="h-5 w-5" />
                    <span className="font-bold">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="neo-brutalism-button my-1"
                >
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
              <h1 className="text-2xl font-black tracking-tight">
                {sidebarItems.find((item) => item.href === pathname)?.label ||
                  "Dashboard"}
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="icon"
                className="relative border-2 border-foreground rounded-md"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-2 border-foreground rounded-md"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
