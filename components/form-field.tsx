"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  errors?: string[];
  touched?: boolean;
  required?: boolean;
  children?: ReactNode;
  className?: string;
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  errors = [],
  touched = false,
  required = false,
  children,
  className = "",
}: FormFieldProps) {
  const hasErrors = errors.length > 0 && touched;
  const isValid = touched && errors.length === 0 && value.length > 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="font-bold text-sm flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>

      <div className="flex justify-start items-start flex-col h-[70px]">
        <div className="relative w-full">
          {children || (
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className={`neo-brutalism-input w-full pr-10 ${
                hasErrors
                  ? "border-destructive focus:border-destructive focus:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]"
                  : isValid
                    ? "border-green-500 focus:border-green-500 focus:shadow-[2px_2px_0px_0px_rgba(34,197,94,1)]"
                    : ""
              }`}
              aria-invalid={hasErrors}
              aria-describedby={hasErrors ? `${id}-error` : undefined}
            />
          )}

          {/* Status Icon */}
          {touched && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {hasErrors ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : isValid ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : null}
            </div>
          )}
        </div>

        {/* Error Messages */}
        {hasErrors && (
          <div id={`${id}-error`} className="space-y-1 mt-2">
            {errors.map((error, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}

        {/* Success Message */}
        {isValid && (
          <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
            <CheckCircle className="h-3 w-3" />
            <span>Looks good!</span>
          </div>
        )}
      </div>
    </div>
  );
}
