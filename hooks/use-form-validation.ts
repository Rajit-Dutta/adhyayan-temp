"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { type ValidationRules, type ValidationErrors, validateField, validateForm } from "@/lib/validation"

export interface UseFormValidationProps {
  rules: ValidationRules
  onSubmit: (data: { [key: string]: string }) => void | Promise<void>
}

export const useFormValidation = ({ rules, onSubmit }: UseFormValidationProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({})
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))

      // Validate field if it has been touched
      if (touched[field] && rules[field]) {
        const fieldErrors = validateField(value, rules[field])
        setErrors((prev) => ({
          ...prev,
          [field]: fieldErrors,
        }))
      }
    },
    [rules, touched],
  )

  const touchField = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }))

      // Validate field when touched
      if (rules[field]) {
        const fieldErrors = validateField(formData[field] || "", rules[field])
        setErrors((prev) => ({
          ...prev,
          [field]: fieldErrors,
        }))
      }
    },
    [rules, formData],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Mark all fields as touched
      const allTouched = Object.keys(rules).reduce(
        (acc, field) => {
          acc[field] = true
          return acc
        },
        {} as { [key: string]: boolean },
      )
      setTouched(allTouched)

      // Validate entire form
      const formErrors = validateForm(formData, rules)
      setErrors(formErrors)

      // If no errors, submit form
      if (Object.keys(formErrors).length === 0) {
        try {
          await onSubmit(formData)
        } catch (error) {
          console.error("Form submission error:", error)
        }
      }

      setIsSubmitting(false)
    },
    [formData, rules, onSubmit],
  )

  const hasErrors = Object.keys(errors).some((field) => errors[field]?.length > 0)
  const isValid = !hasErrors && Object.keys(touched).length > 0

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    touchField,
    handleSubmit,
    hasErrors,
    isValid,
  }
}
