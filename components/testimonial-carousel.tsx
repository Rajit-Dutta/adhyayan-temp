"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LazyImage } from "@/components/lazy-image"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { TestimonialCarouselSkeleton } from "@/components/skeletons/testimonial-skeleton"

interface TestimonialCarouselProps {
  testimonials: {
    content: string
    name: string
    role: string
    avatar: string
  }[]
  autoScroll?: boolean
  interval?: number
  isLoading?: boolean
}

export function TestimonialCarousel({
  testimonials,
  autoScroll = true,
  interval = 5000,
  isLoading = false,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleItems, setVisibleItems] = useState(3)

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visibleItems)

  const next = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  useEffect(() => {
    if (!autoScroll || isPaused || isLoading) return

    const intervalId = setInterval(() => {
      if (currentIndex < maxIndex) {
        next()
      } else {
        setCurrentIndex(0)
      }
    }, interval)

    return () => clearInterval(intervalId)
  }, [autoScroll, interval, isPaused, currentIndex, maxIndex, isLoading])

  return (
    <LoadingWrapper isLoading={isLoading} skeleton={<TestimonialCarouselSkeleton visibleItems={visibleItems} />}>
      <div
        className="relative overflow-hidden neo-brutalism-card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="p-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {testimonials.map((testimonial, index) => {
              const isPriority = index < visibleItems // Load first set immediately

              return (
                <div key={index} className="px-2" style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}>
                  <div className="h-full flex flex-col items-center text-center p-4 border-2 border-foreground rounded-md bg-background/50">
                    <div className="mb-3">
                      <LazyImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-foreground"
                        priority={isPriority}
                      />
                    </div>
                    <blockquote className="mb-3 text-sm italic line-clamp-4">"{testimonial.content}"</blockquote>
                    <div className="mt-auto">
                      <div className="text-sm font-black">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 neo-brutalism-button-outline-sm bg-background/80 backdrop-blur-sm"
          onClick={prev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 neo-brutalism-button-outline-sm bg-background/80 backdrop-blur-sm"
          onClick={next}
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-6 rounded-full border-2 border-foreground transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-background/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </LoadingWrapper>
  )
}
