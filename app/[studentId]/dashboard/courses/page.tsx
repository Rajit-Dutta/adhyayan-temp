"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BookOpen,
  Clock,
  Download,
  FileText,
  Filter,
  Play,
  Search,
  Star,
  Users,
  Video,
  ChevronDown,
  CheckCircle2,
  Lock,
  BarChart3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const enrolledCourses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Ramesh Sharma",
    progress: 72,
    totalLessons: 24,
    completedLessons: 17,
    nextLesson: "Integration by Parts",
    category: "Mathematics",
    rating: 4.8,
    students: 156,
    image: "/placeholder.svg?height=120&width=200&text=Math",
    chapters: [
      { name: "Algebra Fundamentals", status: "completed", lessons: 4 },
      { name: "Calculus I - Limits", status: "completed", lessons: 5 },
      { name: "Calculus II - Derivatives", status: "completed", lessons: 4 },
      { name: "Calculus III - Integration", status: "in-progress", lessons: 5, current: 3 },
      { name: "Differential Equations", status: "locked", lessons: 6 },
    ],
    materials: [
      { name: "Chapter 4 Notes.pdf", type: "pdf", size: "2.3 MB" },
      { name: "Practice Problems Set 4", type: "pdf", size: "1.1 MB" },
      { name: "Video: Integration Techniques", type: "video", duration: "45 min" },
    ],
  },
  {
    id: 2,
    title: "Physics - Mechanics",
    instructor: "Prof. Anita Desai",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    nextLesson: "Newton's Third Law",
    category: "Science",
    rating: 4.6,
    students: 132,
    image: "/placeholder.svg?height=120&width=200&text=Physics",
    chapters: [
      { name: "Motion in 1D", status: "completed", lessons: 4 },
      { name: "Motion in 2D", status: "completed", lessons: 5 },
      { name: "Newton's Laws", status: "in-progress", lessons: 5, current: 2 },
      { name: "Work & Energy", status: "locked", lessons: 6 },
    ],
    materials: [
      { name: "Chapter 3 Notes.pdf", type: "pdf", size: "1.8 MB" },
      { name: "Lab Report Template", type: "pdf", size: "0.5 MB" },
    ],
  },
  {
    id: 3,
    title: "English Literature",
    instructor: "Ms. Priya Mehta",
    progress: 88,
    totalLessons: 18,
    completedLessons: 16,
    nextLesson: "Modern Poetry Analysis",
    category: "Language",
    rating: 4.9,
    students: 98,
    image: "/placeholder.svg?height=120&width=200&text=English",
    chapters: [
      { name: "Shakespeare Studies", status: "completed", lessons: 5 },
      { name: "Victorian Literature", status: "completed", lessons: 4 },
      { name: "Modern Fiction", status: "completed", lessons: 5 },
      { name: "Poetry & Prose", status: "in-progress", lessons: 4, current: 3 },
    ],
    materials: [
      { name: "Poetry Anthology.pdf", type: "pdf", size: "3.2 MB" },
      { name: "Essay Writing Guide", type: "pdf", size: "0.8 MB" },
    ],
  },
]

const availableCourses = [
  {
    id: 4,
    title: "Chemistry - Organic",
    instructor: "Dr. Vikram Singh",
    category: "Science",
    rating: 4.7,
    students: 144,
    lessons: 22,
    duration: "12 weeks",
    image: "/placeholder.svg?height=120&width=200&text=Chem",
  },
  {
    id: 5,
    title: "History - Modern India",
    instructor: "Prof. Suresh Kumar",
    category: "Humanities",
    rating: 4.5,
    students: 87,
    lessons: 16,
    duration: "10 weeks",
    image: "/placeholder.svg?height=120&width=200&text=History",
  },
  {
    id: 6,
    title: "Computer Science",
    instructor: "Ms. Neha Gupta",
    category: "Technology",
    rating: 4.9,
    students: 201,
    lessons: 30,
    duration: "16 weeks",
    image: "/placeholder.svg?height=120&width=200&text=CS",
  },
  {
    id: 7,
    title: "Biology - Genetics",
    instructor: "Dr. Kavita Rao",
    category: "Science",
    rating: 4.6,
    students: 112,
    lessons: 18,
    duration: "10 weeks",
    image: "/placeholder.svg?height=120&width=200&text=Bio",
  },
]

type ExpandedCourse = number | null

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedCourse, setExpandedCourse] = useState<ExpandedCourse>(null)

  const categories = ["All", "Mathematics", "Science", "Language", "Humanities", "Technology"]

  const filteredAvailable = availableCourses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = selectedCategory === "All" || c.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">My Courses</h2>
          <p className="text-sm text-muted-foreground">
            {enrolledCourses.length} enrolled courses, {availableCourses.length} available to join
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-48 border-2 border-foreground"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Enrolled</p>
                <p className="text-lg font-black">{enrolledCourses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-500/10 border-2 border-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-lg font-black">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10 border-2 border-foreground">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hours Spent</p>
                <p className="text-lg font-black">128</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-500/10 border-2 border-foreground">
                <BarChart3 className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Score</p>
                <p className="text-lg font-black">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enrolled" className="neo-brutalism-tabs">
        <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
          <TabsTrigger value="enrolled" className="font-bold">Enrolled ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="available" className="font-bold">Browse Courses</TabsTrigger>
        </TabsList>

        {/* Enrolled Courses */}
        <TabsContent value="enrolled" className="space-y-4 pt-4">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="neo-brutalism-card overflow-hidden">
              <CardContent className="p-0">
                {/* Course Header */}
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r" />
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                      <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground border border-primary-foreground/20">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-black">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {course.students}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="h-3 w-3" /> {course.totalLessons} lessons
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-primary">{course.progress}%</span>
                        <p className="text-xs text-muted-foreground">{course.completedLessons}/{course.totalLessons} done</p>
                      </div>
                    </div>
                    <Progress value={course.progress} className="mt-3 neo-brutalism-progress" />
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        Next: <span className="font-bold text-foreground">{course.nextLesson}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="neo-brutalism-button-sm gap-1 text-xs h-8">
                          <Play className="h-3 w-3" /> Continue
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                          onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                        >
                          <ChevronDown className={`h-3 w-3 transition-transform ${expandedCourse === course.id ? "rotate-180" : ""}`} />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCourse === course.id && (
                  <div className="border-t-2 border-foreground bg-muted/30 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Chapters */}
                      <div>
                        <h4 className="mb-3 text-sm font-black">Course Chapters</h4>
                        <div className="space-y-2">
                          {course.chapters.map((ch, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-between rounded-md border-2 border-foreground p-2.5 text-sm ${
                                ch.status === "completed"
                                  ? "bg-green-500/10"
                                  : ch.status === "in-progress"
                                    ? "bg-primary/10"
                                    : "bg-muted/50 opacity-60"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {ch.status === "completed" ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : ch.status === "in-progress" ? (
                                  <Play className="h-4 w-4 text-primary" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="font-bold text-xs">{ch.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {ch.status === "in-progress" ? `${ch.current}/${ch.lessons}` : `${ch.lessons} lessons`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Materials */}
                      <div>
                        <h4 className="mb-3 text-sm font-black">Study Materials</h4>
                        <div className="space-y-2">
                          {course.materials.map((mat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-md border-2 border-foreground p-2.5"
                            >
                              <div className="flex items-center gap-2">
                                {mat.type === "video" ? (
                                  <Video className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <FileText className="h-4 w-4 text-red-600" />
                                )}
                                <div>
                                  <p className="text-xs font-bold">{mat.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {mat.type === "video" ? mat.duration : mat.size}
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Browse Courses */}
        <TabsContent value="available" className="space-y-4 pt-4">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`h-7 text-xs ${selectedCategory === cat ? "neo-brutalism-button-sm" : "border-2 border-foreground"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredAvailable.map((course) => (
              <Card key={course.id} className="neo-brutalism-card overflow-hidden">
                <div className="relative h-32 overflow-hidden">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                      {course.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-black">{course.title}</h3>
                  <p className="text-xs text-muted-foreground">{course.instructor}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" className="flex-1 neo-brutalism-button-sm text-xs h-8">
                      Enroll Now
                    </Button>
                    <Button size="sm" variant="outline" className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
