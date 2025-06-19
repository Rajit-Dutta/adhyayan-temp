"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CourseCarousel } from "@/components/course-carousel"

export function FeaturedCourses() {
  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<any[]>([])

  // Simulate loading data
  useEffect(() => {
    const loadCourses = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const coursesData = [
        {
          id: "advanced-mathematics",
          title: "Advanced Mathematics",
          description:
            "Master complex mathematical concepts including calculus, linear algebra, and differential equations with our expert instructors.",
          image: "/placeholder.svg?height=400&width=600&text=Mathematics",
          category: "Mathematics",
          duration: "12 weeks",
          students: 1245,
          rating: 4.8,
          price: "$299",
          instructor: "Dr. Sarah Johnson",
          level: "Advanced",
        },
        {
          id: "physics-chemistry",
          title: "Physics & Chemistry Fundamentals",
          description:
            "Explore the fundamental laws of nature through hands-on experiments, interactive simulations, and real-world applications.",
          image: "/placeholder.svg?height=400&width=600&text=Science",
          category: "Science",
          duration: "10 weeks",
          students: 987,
          rating: 4.7,
          price: "$249",
          instructor: "Prof. Michael Chen",
          level: "Intermediate",
        },
        {
          id: "computer-science",
          title: "Computer Science Fundamentals",
          description:
            "Learn programming, algorithms, data structures, and software development from industry experts and build real projects.",
          image: "/placeholder.svg?height=400&width=600&text=Computer+Science",
          category: "Technology",
          duration: "8 weeks",
          students: 1532,
          rating: 4.9,
          price: "$349",
          instructor: "Alex Rodriguez",
          level: "Beginner",
        },
        {
          id: "language-arts",
          title: "Language Arts & Literature",
          description:
            "Develop critical thinking and communication skills through literary analysis, creative writing, and public speaking.",
          image: "/placeholder.svg?height=400&width=600&text=Literature",
          category: "Humanities",
          duration: "6 weeks",
          students: 756,
          rating: 4.6,
          price: "$199",
          instructor: "Emma Thompson",
          level: "Intermediate",
        },
        {
          id: "history-world",
          title: "World History & Civilizations",
          description:
            "Journey through time and explore the events, cultures, and civilizations that shaped our modern world.",
          image: "/placeholder.svg?height=400&width=600&text=History",
          category: "Humanities",
          duration: "9 weeks",
          students: 842,
          rating: 4.5,
          price: "$229",
          instructor: "Dr. David Wilson",
          level: "Beginner",
        },
        {
          id: "biology-advanced",
          title: "Advanced Biology & Genetics",
          description:
            "Dive deep into the study of living organisms with detailed lessons on genetics, molecular biology, and ecology.",
          image: "/placeholder.svg?height=400&width=600&text=Biology",
          category: "Science",
          duration: "11 weeks",
          students: 923,
          rating: 4.7,
          price: "$279",
          instructor: "Dr. Priya Patel",
          level: "Advanced",
        },
      ]

      setCourses(coursesData)
      setIsLoading(false)
    }

    loadCourses()
  }, [])

  return (
    <section className="w-full py-8 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter">
              Featured Courses
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
              Explore our most popular courses and start your learning journey today
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          <CourseCarousel courses={courses} isLoading={isLoading} />

          <div className="mt-6 md:mt-8 text-center">
            <Button asChild className="neo-brutalism-button" disabled={isLoading}>
              <Link href="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
