"use client"

import type { ReactNode } from "react"

interface LoadingWrapperProps {
  isLoading: boolean
  skeleton: ReactNode
  children: ReactNode
  className?: string
}

export function LoadingWrapper({ isLoading, skeleton, children, className }: LoadingWrapperProps) {
  if (isLoading) {
    return <div className={className}>{skeleton}</div>
  }

  return <div className={className}>{children}</div>
}
