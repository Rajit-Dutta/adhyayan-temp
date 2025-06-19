"use client"

import { useState, useEffect } from "react"
import { TestimonialCarousel } from "@/components/testimonial-carousel"

export function HomeTestimonials() {
  const [isLoading, setIsLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])

  // Simulate loading data
  useEffect(() => {
    const loadTestimonials = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const testimonialsData = [
        {
          content:
            "ADHYAYAN has completely transformed my learning experience. The personalized approach and dedicated teachers have helped me excel in my studies.",
          name: "Sarah Johnson",
          role: "Class of 2023",
          avatar: "/placeholder.svg?height=60&width=60&text=SJ",
        },
        {
          content:
            "The interactive learning platform made complex subjects easy to understand. I've improved my grades significantly since joining ADHYAYAN.",
          name: "Michael Chen",
          role: "Class of 2022",
          avatar: "/placeholder.svg?height=60&width=60&text=MC",
        },
        {
          content:
            "The teachers at ADHYAYAN are exceptional. They go above and beyond to ensure every student understands the material and reaches their full potential.",
          name: "Priya Patel",
          role: "Class of 2023",
          avatar: "/placeholder.svg?height=60&width=60&text=PP",
        },
        {
          content:
            "I appreciate how ADHYAYAN combines traditional teaching methods with modern technology. It's the perfect balance for effective learning.",
          name: "David Wilson",
          role: "Class of 2022",
          avatar: "/placeholder.svg?height=60&width=60&text=DW",
        },
        {
          content:
            "The course materials are comprehensive and well-structured. I feel more confident in my abilities after studying with ADHYAYAN.",
          name: "Emma Thompson",
          role: "Class of 2023",
          avatar: "/placeholder.svg?height=60&width=60&text=ET",
        },
        {
          content:
            "The flexibility of the platform allowed me to learn at my own pace while still receiving guidance when needed. Highly recommended!",
          name: "Alex Rodriguez",
          role: "Class of 2022",
          avatar: "/placeholder.svg?height=60&width=60&text=AR",
        },
      ]

      setTestimonials(testimonialsData)
      setIsLoading(false)
    }

    loadTestimonials()
  }, [])

  return (
    <section className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">Student Testimonials</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Hear what our students have to say about their learning experience
            </p>
          </div>
        </div>
        <div className="mx-auto">
          <TestimonialCarousel testimonials={testimonials} isLoading={isLoading} />
        </div>
      </div>
    </section>
  )
}
