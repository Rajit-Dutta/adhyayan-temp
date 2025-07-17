"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
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
import { PasswordStrength } from "@/components/password-strength";
import { useFormValidation } from "@/hooks/use-form-validation";
import { commonRules } from "@/lib/validation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      firstName: commonRules.firstName,
      lastName: commonRules.lastName,
      email: commonRules.email,
      phone: commonRules.phone,
      password: commonRules.password,
      confirmPassword: [
        { required: true, message: "Please confirm your password" },
        {
          custom: (value: string) => value === formData.password,
          message: "Passwords do not match",
        },
      ],
      terms: [
        { required: true, message: "You must accept the terms and conditions" },
      ],
    },
    onSubmit: async (data) => {
      try {
        const signUpPromise = axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN!}/signUp`,
          formData
        );
        toast.promise(signUpPromise, {
          loading: "Loading",
          success: "Sign up successful!✅",
          error: "Sign up unsuccessful! ❌.",
        });
        const response = await signUpPromise;
        console.log(response.data);
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
              Join ADHYAYAN
            </h1>
            <p className="text-muted-foreground">
              Start your educational journey with us today
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
              <CardTitle className="text-2xl font-black">
                Create Account
              </CardTitle>
              <CardDescription>
                Fill in your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName || ""}
                    onChange={(value) => updateField("firstName", value)}
                    onBlur={() => touchField("firstName")}
                    errors={errors.firstName}
                    touched={touched.firstName}
                    required
                  />
                  <FormField
                    label="Last Name"
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName || ""}
                    onChange={(value) => updateField("lastName", value)}
                    onBlur={() => touchField("lastName")}
                    errors={errors.lastName}
                    touched={touched.lastName}
                    required
                  />
                </div>

                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email || ""}
                  onChange={(value) => updateField("email", value)}
                  onBlur={() => touchField("email")}
                  errors={errors.email}
                  touched={touched.email}
                  required
                />

                <FormField
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone || ""}
                  onChange={(value) => updateField("phone", value)}
                  onBlur={() => touchField("phone")}
                  errors={errors.phone}
                  touched={touched.phone}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Age"
                    id="age"
                    type="number"
                    placeholder="12"
                    value={formData.age || ""}
                    onChange={(value) => updateField("age", value)}
                    onBlur={() => touchField("age")}
                    errors={errors.age}
                    touched={touched.age}
                    required
                  />

                  <FormField
                    label="Standard"
                    id="standard"
                    type="text"
                    placeholder="Xth Grade"
                    value={formData.standard || ""}
                    onChange={(value) => updateField("standard", value)}
                    onBlur={() => touchField("standard")}
                    errors={errors.standard}
                    touched={touched.standard}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="w-full relative flex items-center">
                    <FormField
                      label="Password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
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
                          placeholder="Create a strong password"
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
                      className="absolute right-3 top-[47px] -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <PasswordStrength password={formData.password} />
                  )}
                </div>

                <div className="w-full relative flex items-center">
                  <FormField
                    label="Confirm Password"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword || ""}
                    onChange={(value) => updateField("confirmPassword", value)}
                    onBlur={() => touchField("confirmPassword")}
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    required
                  >
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword || ""}
                        onChange={(e) =>
                          updateField("confirmPassword", e.target.value)
                        }
                        onBlur={() => touchField("confirmPassword")}
                        className={`neo-brutalism-input md:pr-[130px] pr-[115px] py-[7px] px-3 ${
                          errors.confirmPassword?.length &&
                          touched.confirmPassword
                            ? "border-destructive focus:border-destructive focus:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
                            : touched.confirmPassword &&
                              !errors.confirmPassword?.length &&
                              formData.confirmPassword
                            ? "border-green-500 focus:border-green-500 focus:shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]"
                            : ""
                        }`}
                      />
                    </div>
                  </FormField>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[47px] -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={formData.terms === "true"}
                        onChange={(e) =>
                          updateField("terms", e.target.checked ? "true" : "")
                        }
                        onBlur={() => touchField("terms")}
                        className="h-4 w-4 rounded border-2 border-foreground text-primary focus:ring-primary mt-0.5"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-bold leading-5"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.terms && touched.terms && (
                      <div className="text-sm text-destructive ml-6">
                        {errors.terms[0]}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full neo-brutalism-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col border-t-2 border-foreground pt-6">
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline font-bold"
                >
                  Sign in here
                </a>
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
