"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, Users, Star, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LazyImage } from "@/components/lazy-image"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { CourseCarouselSkeleton } from "@/components/skeletons/course-skeleton"

interface Course {
  id: string
  title: string
  description: string
  image: string
  category: string
  duration: string
  students: number
  rating: number
  price: string
  instructor: string
  level: string
}

interface CourseCarouselProps {
  courses: Course[]
  autoScroll?: boolean
  interval?: number
  isLoading?: boolean
  lazy?: boolean
}

export function CourseCarousel({
  courses,
  autoScroll = true,
  interval = 5000,
  isLoading = false,
  lazy = true,
}: CourseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleItems, setVisibleItems] = useState(3)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

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

  const maxIndex = Math.max(0, courses.length - visibleItems)

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

  const handleImageLoad = (courseId: string) => {
    setLoadedImages((prev) => new Set(prev).add(courseId))
  }

  const isImageLoaded = (courseId: string) => loadedImages.has(courseId)

  return (
    <LoadingWrapper isLoading={isLoading} skeleton={<CourseCarouselSkeleton visibleItems={visibleItems} />}>
      <div
        className="relative overflow-hidden neo-brutalism-card bg-gradient-to-br from-primary/5 to-secondary/5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="p-4 md:p-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {courses.map((course, index) => {
              // Determine if this card should be prioritized for loading
              const isVisible = index >= currentIndex && index < currentIndex + visibleItems
              const isPriority = index < visibleItems // Load first set immediately

              return (
                <div key={index} className="px-2 md:px-3" style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}>
                  <Card className="h-full neo-brutalism-card bg-background hover:shadow-lg transition-all duration-300 group">
                    <div className="relative overflow-hidden">
                      <div className="aspect-video w-full relative">
                        <LazyImage
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={isPriority}
                          onLoad={() => handleImageLoad(course.id)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground font-bold border-2 border-foreground">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-background/90 text-foreground font-bold border-2 border-foreground"
                        >
                          {course.level}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 border-2 border-foreground">
                        <div className="flex items-center gap-1 text-sm font-bold">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-2">
                        <h3 className="font-black text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span className="font-medium">{course.instructor}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">{course.students.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-lg font-black text-primary">{course.price}</div>
                      </div>

                      <div className="pt-2 space-y-2">
                        <Button asChild size="sm" className="w-full neo-brutalism-button-sm">
                          <Link href={`/courses/${course.id}`}>Enroll Now</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="w-full neo-brutalism-button-outline-sm">
                          <Link href={`/courses/${course.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
          <span className="sr-only">Previous course</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 neo-brutalism-button-outline-sm bg-background/80 backdrop-blur-sm"
          onClick={next}
          disabled={currentIndex === maxIndex}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next course</span>
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
