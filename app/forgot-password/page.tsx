"use client"

import Link from "next/link"
import { GraduationCap, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { FormField } from "@/components/form-field"
import { useFormValidation } from "@/hooks/use-form-validation"
import { commonRules } from "@/lib/validation"

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { formData, errors, touched, isSubmitting, updateField, touchField, handleSubmit } = useFormValidation({
    rules: {
      email: commonRules.email,
    },
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Reset password for:", data.email)
      setIsSubmitted(true)
    },
  })

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 to-secondary/5">
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
          <div className="w-full max-w-md space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 neo-brutalism-card bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Check Your Email</h1>
              <p className="text-muted-foreground">We've sent password reset instructions to your email.</p>
            </div>

            <Card className="neo-brutalism-card">
              <CardContent className="pt-6">
                <div className="space-y-4 text-center">
                  <div className="p-4 rounded-md border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">
                      Reset link sent to: {formData.email}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Didn't receive the email? Check your spam folder.</p>
                    <p>The link will expire in 15 minutes for security.</p>
                  </div>

                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full neo-brutalism-button-outline"
                  >
                    Try Different Email
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t-2 border-foreground pt-6">
                <Button asChild className="w-full neo-brutalism-button">
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 to-secondary/5">
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
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 neo-brutalism-card bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Forgot Password?</h1>
            <p className="text-muted-foreground">No worries! We'll send you reset instructions.</p>
          </div>

          <Card className="neo-brutalism-card">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-black">Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email || ""}
                  onChange={(value) => updateField("email", value)}
                  onBlur={() => touchField("email")}
                  errors={errors.email}
                  touched={touched.email}
                  required
                />

                <Button type="submit" className="w-full neo-brutalism-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>

              <div className="mt-6 p-4 rounded-md border-2 border-primary bg-primary/5">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-primary">Check your email</p>
                    <p className="text-xs text-muted-foreground">
                      We'll send password reset instructions to your email address if an account exists.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col border-t-2 border-foreground pt-6 space-y-4">
              <Button variant="outline" asChild className="w-full neo-brutalism-button-outline">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>

              <div className="text-sm text-muted-foreground text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary underline-offset-4 hover:underline font-bold">
                  Sign up here
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Additional Help */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Still having trouble?{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline font-bold">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
