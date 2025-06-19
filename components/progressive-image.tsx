"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProgressiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  lowQualitySrc?: string
  placeholder?: "blur" | "empty"
}

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  lowQualitySrc,
  placeholder = "blur",
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src)

  useEffect(() => {
    if (lowQualitySrc && lowQualitySrc !== src) {
      // Preload the high-quality image
      const img = new window.Image()
      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
      }
      img.src = src
    } else {
      setIsLoaded(true)
    }
  }, [src, lowQualitySrc])

  const generateLowQualityBlur = () => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <circle cx="50%" cy="50%" r="20%" fill="#e5e7eb" opacity="0.5"/>
        <circle cx="30%" cy="30%" r="15%" fill="#d1d5db" opacity="0.3"/>
        <circle cx="70%" cy="70%" r="10%" fill="#9ca3af" opacity="0.2"/>
      </svg>`,
    ).toString("base64")}`
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-700 ease-out",
          isLoaded ? "blur-0 scale-100" : "blur-sm scale-105",
          className,
        )}
        placeholder={placeholder}
        blurDataURL={generateLowQualityBlur()}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Loading overlay */}
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 animate-pulse" />}
    </div>
  )
}
