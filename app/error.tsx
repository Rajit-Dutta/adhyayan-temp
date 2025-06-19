"use client"

import { useEffect } from "react"
import Link from "next/link"
import { GraduationCap, RefreshCw, Home, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-destructive/5 to-red/5">
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
          <div className="mx-auto w-64 h-64 neo-brutalism-card bg-gradient-to-br from-destructive/10 to-red/10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <AlertTriangle className="mx-auto h-20 w-20 text-destructive" />
              <div className="text-2xl font-black text-destructive">ERROR!</div>
            </div>
          </div>

          <Card className="neo-brutalism-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-black">Something Went Wrong</CardTitle>
              <CardDescription className="text-lg">
                Oops! It looks like we encountered an unexpected error. Don't worry, our team has been notified and
                we're working on it!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error.message && (
                <div className="p-4 rounded-md border-2 border-destructive bg-destructive/5">
                  <p className="text-sm font-bold text-destructive mb-1">Error Details:</p>
                  <p className="text-sm text-muted-foreground font-mono">{error.message}</p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Here's what you can do:</p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Try refreshing the page
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Check your internet connection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Go back to the homepage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Contact support if the problem persists
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button onClick={reset} className="neo-brutalism-button">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild className="neo-brutalism-button-outline">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t-2 border-foreground">
                <p className="text-sm text-muted-foreground mb-3">Need immediate assistance?</p>
                <Button variant="outline" asChild className="neo-brutalism-button-outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Code */}
          {error.digest && <div className="text-xs text-muted-foreground">Error ID: {error.digest}</div>}
        </div>
      </div>
    </div>
  )
}
