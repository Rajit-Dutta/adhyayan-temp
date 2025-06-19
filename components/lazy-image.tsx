"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  placeholder?: string
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  sizes?: string
  quality?: number
  style?: React.CSSProperties
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  onError,
  sizes,
  quality = 75,
  style,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const { shouldLoad } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
    triggerOnce: true,
    skip: priority, // Skip intersection observer for priority images
  })

  const shouldRender = priority || shouldLoad

  useEffect(() => {
    if (shouldRender && !isLoaded && !hasError && !isLoading) {
      setIsLoading(true)
    }
  }, [shouldRender, isLoaded, hasError, isLoading])

  const handleLoad = () => {
    setIsLoaded(true)
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const generateBlurDataURL = (w: number, h: number) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.5"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`,
    ).toString("base64")}`
  }

  const defaultBlurDataURL = blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)

  return (
    <div ref={imageRef} className={cn("relative overflow-hidden", className)} style={style}>
      {/* Loading skeleton */}
      {!shouldRender && <Skeleton className={cn("absolute inset-0", fill ? "w-full h-full" : "")} />}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted border-2 border-dashed border-muted-foreground/20">
          <div className="text-center text-muted-foreground">
            <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {shouldRender && isLoading && !hasError && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full animate-pulse" />
        </div>
      )}

      {/* Actual image */}
      {shouldRender && !hasError && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
          // placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          quality={quality}
          priority={priority}
        />
      )}
    </div>
  )
}
