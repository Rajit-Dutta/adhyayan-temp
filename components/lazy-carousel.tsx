"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { CourseCarouselSkeleton } from "@/components/skeletons/course-skeleton"
import { TestimonialCarouselSkeleton } from "@/components/skeletons/testimonial-skeleton"

interface LazyCarouselProps {
  children: React.ReactNode
  type?: "course" | "testimonial" | "custom"
  fallback?: React.ReactNode
  loadDelay?: number
  className?: string
}

export function LazyCarousel({ children, type = "custom", fallback, loadDelay = 0, className }: LazyCarouselProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { elementRef, shouldLoad } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "200px",
    triggerOnce: true,
  })

  useEffect(() => {
    if (shouldLoad) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, loadDelay)

      return () => clearTimeout(timer)
    }
  }, [shouldLoad, loadDelay])

  const getDefaultFallback = () => {
    switch (type) {
      case "course":
        return <CourseCarouselSkeleton />
      case "testimonial":
        return <TestimonialCarouselSkeleton />
      default:
        return fallback || <div className="h-64 bg-muted animate-pulse rounded-lg" />
    }
  }

  return (
    <div ref={elementRef} className={className}>
      {isLoaded ? <div className="animate-fade-in">{children}</div> : getDefaultFallback()}
    </div>
  )
}
