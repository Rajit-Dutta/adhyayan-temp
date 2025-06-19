"use client"

import { useState } from "react"
import Link from "next/link"
import { GraduationCap, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { FormField } from "@/components/form-field"
import { useFormValidation } from "@/hooks/use-form-validation"
import { commonRules } from "@/lib/validation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const { formData, errors, touched, isSubmitting, updateField, touchField, handleSubmit } = useFormValidation({
    rules: {
      email: commonRules.email,
      password: [{ required: true, message: "Password is required" }],
    },
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Login data:", data)
      // Handle successful login here
    },
  })

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
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-tight">Welcome Back!</h1>
            <p className="text-muted-foreground">Sign in to continue your learning journey</p>
          </div>

          <Card className="neo-brutalism-card">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-black">Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="student@adhyayan.com"
                  value={formData.email || ""}
                  onChange={(value) => updateField("email", value)}
                  onBlur={() => touchField("email")}
                  errors={errors.email}
                  touched={touched.email}
                  required
                />

                <FormField
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password || ""}
                  onChange={(value) => updateField("password", value)}
                  onBlur={() => touchField("password")}
                  errors={errors.password}
                  touched={touched.password}
                  required
                >
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password || ""}
                      onChange={(e) => updateField("password", e.target.value)}
                      onBlur={() => touchField("password")}
                      className={`neo-brutalism-input pr-20 ${
                        errors.password?.length && touched.password
                          ? "border-destructive focus:border-destructive focus:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
                          : touched.password && !errors.password?.length && formData.password
                            ? "border-green-500 focus:border-green-500 focus:shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]"
                            : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </button>
                  </div>
                </FormField>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-2 border-foreground text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-sm font-bold">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline font-bold"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full neo-brutalism-button" disabled={isSubmitting}>
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t-2 border-foreground" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground font-bold">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Button variant="outline" className="neo-brutalism-button-outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="neo-brutalism-button-outline">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col border-t-2 border-foreground pt-6">
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary underline-offset-4 hover:underline font-bold">
                  Create one now
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground font-bold">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
