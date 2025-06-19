import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle, GraduationCap, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LazyComponent } from "@/components/lazy-component"
import { LazyCarousel } from "@/components/lazy-carousel"
import { ProgressiveImage } from "@/components/progressive-image"
import { FeaturedCourses } from "@/components/featured-courses"
import { HomeTestimonials } from "@/components/home-testimonials"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
            <span className="text-lg md:text-xl font-black">ADHYAYAN</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="#" className="text-sm font-bold hover:underline underline-offset-4 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-bold hover:underline underline-offset-4 transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm font-bold hover:underline underline-offset-4 transition-colors">
              Courses
            </Link>
            <Link href="#" className="text-sm font-bold hover:underline underline-offset-4 transition-colors">
              Testimonials
            </Link>
            <Link href="#" className="text-sm font-bold hover:underline underline-offset-4 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex neo-brutalism-button-outline-sm text-xs md:text-sm"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="neo-brutalism-button-sm text-xs md:text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-center lg:text-left">
                <div className="space-y-2 md:space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter">ADHYAYAN</h1>
                  <p className="max-w-[600px] text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
                    Empowering students through innovative learning experiences. Our platform combines traditional
                    teaching methods with modern technology to create an engaging educational journey.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link href="/signup">
                    <Button className="w-full sm:w-auto neo-brutalism-button">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#about">
                    <Button variant="outline" className="w-full sm:w-auto neo-brutalism-button-outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center order-first lg:order-last">
                <ProgressiveImage
                  src="/placeholder.svg?height=550&width=550"
                  alt="Hero Image"
                  width={550}
                  height={550}
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center w-full max-w-md lg:max-w-full neo-brutalism-card"
                  priority
                  lowQualitySrc="/placeholder.svg?height=100&width=100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Carousel - Lazy Loaded */}
        <LazyCarousel type="course" className="w-full py-8 md:py-16 lg:py-20">
          <FeaturedCourses />
        </LazyCarousel>

        {/* Statistics Section - Lazy Loaded */}
        <LazyComponent
          threshold={0.2}
          rootMargin="100px"
          className="w-full py-8 md:py-16 lg:py-20 bg-muted"
          minHeight="400px"
        >
          <section className="w-full py-8 md:py-16 lg:py-20 bg-muted">
            <div className="container px-4 md:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter">
                    Our Impact
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    We've helped thousands of students achieve their academic goals
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-6 md:py-8 lg:py-12">
                <div className="flex flex-col items-center justify-center space-y-2 border-2 border-foreground rounded-lg p-6 md:p-8 bg-background neo-brutalism-card">
                  <Users className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black">5,000+</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">Active Students</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border-2 border-foreground rounded-lg p-6 md:p-8 bg-background neo-brutalism-card">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black">200+</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">Courses Offered</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border-2 border-foreground rounded-lg p-6 md:p-8 bg-background neo-brutalism-card sm:col-span-2 lg:col-span-1">
                  <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-primary mb-2" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black">95%</h3>
                  <p className="text-sm md:text-base text-muted-foreground text-center">Success Rate</p>
                </div>
              </div>
            </div>
          </section>
        </LazyComponent>

        {/* Testimonials Section - Lazy Loaded */}
        <LazyCarousel type="testimonial" className="w-full py-12 md:py-16">
          <HomeTestimonials />
        </LazyCarousel>

        {/* About/CEO Section - Lazy Loaded */}
        <LazyComponent
          threshold={0.2}
          rootMargin="100px"
          className="w-full py-8 md:py-16 lg:py-20 bg-muted"
          minHeight="500px"
        >
          <section id="about" className="w-full py-8 md:py-16 lg:py-20 bg-muted">
            <div className="container px-4 md:px-6 lg:px-8">
              <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex justify-center order-last lg:order-first">
                  <ProgressiveImage
                    src="/placeholder.svg?height=400&width=400&text=CEO"
                    alt="CEO"
                    width={400}
                    height={400}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center w-full max-w-sm md:max-w-md lg:max-w-full neo-brutalism-card"
                    lowQualitySrc="/placeholder.svg?height=100&width=100&text=CEO"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-center lg:text-left">
                  <div className="space-y-2 md:space-y-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter">About Us</h2>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                      Founded in 2020, ADHYAYAN was born out of a passion for transforming education. Our mission is to
                      make quality education accessible to all students, regardless of their background or location.
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                      Our team of experienced educators and technology experts work together to create an innovative
                      learning platform that combines traditional teaching methods with modern technology.
                    </p>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <h3 className="text-lg md:text-xl font-black">Meet Our CEO</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      With over 15 years of experience in education, our CEO has dedicated their career to improving how
                      students learn and grow. Their vision drives our commitment to educational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </LazyComponent>

        {/* CTA Section - Lazy Loaded */}
        <LazyComponent threshold={0.3} rootMargin="50px" className="w-full py-8 md:py-16 lg:py-20" minHeight="300px">
          <section className="w-full py-8 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 text-center">
                <div className="space-y-2 md:space-y-4 max-w-3xl">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter">
                    Ready to Start Learning?
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    Join thousands of students who are already benefiting from our platform
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
                  <Link href="/signup">
                    <Button size="lg" className="w-full sm:w-auto neo-brutalism-button">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto neo-brutalism-button-outline">
                      Log In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </LazyComponent>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-2 border-foreground bg-background py-6 md:py-8 lg:py-12">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3 md:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-lg md:text-xl font-black">ADHYAYAN</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering students through innovative learning experiences.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-sm font-black">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-sm font-black">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-sm font-black">Connect</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-8 border-t-2 border-foreground pt-6 md:pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ADHYAYAN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
