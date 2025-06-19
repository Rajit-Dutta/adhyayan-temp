"use client"

import type { ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  className?: string
  minHeight?: string | number
  fadeIn?: boolean
  delay?: number
}

export function LazyComponent({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "100px",
  triggerOnce = true,
  className,
  minHeight = "200px",
  fadeIn = true,
  delay = 0,
}: LazyComponentProps) {
  const { elementRef, shouldLoad } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  })

  const defaultFallback = (
    <div className="space-y-4" style={{ minHeight }}>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-32 w-full" />
    </div>
  )

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-opacity duration-500",
        fadeIn && shouldLoad ? "opacity-100" : fadeIn ? "opacity-0" : "",
        className,
      )}
      style={{ minHeight: shouldLoad ? "auto" : minHeight }}
    >
      {shouldLoad ? (
        <div className={cn(fadeIn ? "animate-fade-in" : "", delay > 0 ? `animation-delay-${delay}` : "")}>
          {children}
        </div>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  )
}
