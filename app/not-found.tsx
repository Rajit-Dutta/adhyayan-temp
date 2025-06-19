"use client"

import Link from "next/link"
import { GraduationCap, Home, ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-destructive/5 to-orange/5">
      <div className="flex h-16 items-center border-b-2 border-foreground px-4 md:px-6 bg-background">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <span className="text-xl font-black">ADHYAYAN</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg space-y-6 text-center">
          {/* Error Illustration */}
          <div className="mx-auto w-64 h-64 neo-brutalism-card bg-gradient-to-br from-destructive/10 to-orange/10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-8xl font-black text-destructive">404</div>
              <div className="text-2xl font-black text-muted-foreground">OOPS!</div>
            </div>
          </div>

          <Card className="neo-brutalism-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-black">Page Not Found</CardTitle>
              <CardDescription className="text-lg">
                The page you're looking for seems to have wandered off to another dimension. Don't worry, even the best
                students sometimes take a wrong turn!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Here are some things you can try:</p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Check the URL for any typos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Go back to the previous page
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Visit our homepage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Use the search function
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild className="neo-brutalism-button">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="neo-brutalism-button-outline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>

              <div className="pt-4 border-t-2 border-foreground">
                <p className="text-sm text-muted-foreground mb-3">Still can't find what you're looking for?</p>
                <Button variant="outline" asChild className="neo-brutalism-button-outline">
                  <Link href="/contact">
                    <Search className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Link
              href="/dashboard"
              className="p-3 rounded-md border-2 border-foreground hover:bg-muted transition-colors font-bold"
            >
              Dashboard
            </Link>
            <Link
              href="/courses"
              className="p-3 rounded-md border-2 border-foreground hover:bg-muted transition-colors font-bold"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="p-3 rounded-md border-2 border-foreground hover:bg-muted transition-colors font-bold"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="p-3 rounded-md border-2 border-foreground hover:bg-muted transition-colors font-bold"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
