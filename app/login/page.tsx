"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { FormField } from "@/components/form-field";
import { useFormValidation } from "@/hooks/use-form-validation";
import { commonRules } from "@/lib/validation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    touchField,
    handleSubmit,
  } = useFormValidation({
    rules: {
      email: commonRules.email,
      password: [{ required: true, message: "Password is required" }],
    },
    onSubmit: async () => {
      try {
        const signInPromise = axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN!}/signIn`,
          formData
        );

        toast.promise(signInPromise, {
          loading: "Loading",
          success: "Log in successful!✅",
          error: "Log in unsuccessful! ❌.",
        });
        await signInPromise;
        await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN!}/rememberMe`,{
          email: formData.email,
          isRemembered: isRemembered,
        })
      } catch (error) {
        console.error("Signup error:", error);
      }
    },
  });

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
            <h1 className="text-3xl font-black tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue your learning journey
            </p>
          </div>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              className: "neo-brutalism-toast",
              style: {
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                border: "2px solid var(--border)",
                boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 0.1)",
              },
            }}
          />

          <Card className="neo-brutalism-card">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-black">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
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

                <div className="w-full relative flex items-center">
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
                        onChange={(e) =>
                          updateField("password", e.target.value)
                        }
                        onBlur={() => touchField("password")}
                        className={`neo-brutalism-input md:pr-[130px] pr-[115px] py-[7px] px-3 ${
                          errors.password?.length && touched.password
                            ? "border-destructive focus:border-destructive focus:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
                            : touched.password &&
                              !errors.password?.length &&
                              formData.password
                            ? "border-green-500 focus:border-green-500 focus:shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]"
                            : ""
                        }`}
                      />
                    </div>
                  </FormField>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded border-2 border-foreground text-primary focus:ring-primary"
                      onClick={() => {
                        setIsRemembered(!isRemembered);
                      }}
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

                <Button
                  type="submit"
                  className="w-full neo-brutalism-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col border-t-2 border-foreground pt-6">
              <div className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary underline-offset-4 hover:underline font-bold"
                >
                  Create one now
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground font-bold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
