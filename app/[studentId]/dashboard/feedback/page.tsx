"use client"

import { useState } from "react"
import Image from "next/image"
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  MessageSquare,
  Search,
  Send,
  Star,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FeedbackItem = {
  id: number
  subject: string
  assignment: string
  teacher: string
  teacherImage: string
  date: string
  grade: string
  percentage: number
  feedback: string
  type: "praise" | "improvement" | "action" | "general"
  isRead: boolean
  replies: { from: string; message: string; date: string }[]
  actionItems: string[]
}

const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    subject: "Mathematics",
    assignment: "Calculus - Integration Test",
    teacher: "Dr. Ramesh Sharma",
    teacherImage: "/placeholder.svg?height=40&width=40&text=RS",
    date: "2026-02-06",
    grade: "A",
    percentage: 92,
    type: "praise",
    feedback: "Outstanding performance on the integration test. Your understanding of substitution methods and integration by parts is exceptional. The way you approached problem 8 with the trigonometric substitution shows real mathematical maturity. Keep up this excellent work.",
    isRead: false,
    replies: [],
    actionItems: ["Practice more complex substitution problems", "Try the advanced problem set for extra credit"],
  },
  {
    id: 2,
    subject: "Physics",
    assignment: "Newton's Laws Lab Report",
    teacher: "Prof. Anita Desai",
    teacherImage: "/placeholder.svg?height=40&width=40&text=AD",
    date: "2026-02-04",
    grade: "B+",
    percentage: 84,
    type: "improvement",
    feedback: "Good lab report overall. Your experimental setup and data collection were thorough. However, the error analysis section needs more detail - you should include percentage errors and discuss systematic vs random errors. Your conclusion is well-written but could reference the theoretical values more explicitly.",
    isRead: false,
    replies: [
      { from: "You", message: "Thank you for the feedback. I'll revise the error analysis section.", date: "2026-02-05" },
      { from: "Prof. Anita Desai", message: "Great. I've shared some reference material on error analysis in the course materials section.", date: "2026-02-05" },
    ],
    actionItems: ["Revise error analysis section", "Study systematic vs random errors", "Reference theoretical values in conclusion"],
  },
  {
    id: 3,
    subject: "English",
    assignment: "Poetry Analysis Essay",
    teacher: "Ms. Priya Mehta",
    teacherImage: "/placeholder.svg?height=40&width=40&text=PM",
    date: "2026-02-02",
    grade: "A-",
    percentage: 88,
    type: "general",
    feedback: "Your analysis of the poems demonstrates strong critical thinking and genuine engagement with the texts. The comparison between the two poets was particularly insightful. Your vocabulary is impressive and your arguments are well-structured. For even stronger essays, try to vary your sentence structure more and use more specific textual evidence to support your points.",
    isRead: true,
    replies: [],
    actionItems: ["Work on sentence structure variation", "Include more direct quotations as evidence"],
  },
  {
    id: 4,
    subject: "History",
    assignment: "French Revolution Research Paper",
    teacher: "Prof. Suresh Kumar",
    teacherImage: "/placeholder.svg?height=40&width=40&text=SK",
    date: "2026-01-28",
    grade: "A+",
    percentage: 96,
    type: "praise",
    feedback: "This is one of the best research papers I have received this semester. Your analysis of the socio-economic factors leading to the revolution is both thorough and nuanced. The primary source references are particularly impressive. I would like to recommend this paper for the school journal. Excellent work.",
    isRead: true,
    replies: [
      { from: "You", message: "Thank you so much! I'd be honored to have it published.", date: "2026-01-29" },
    ],
    actionItems: ["Prepare paper for journal submission", "Add 2-3 more primary source references"],
  },
  {
    id: 5,
    subject: "Mathematics",
    assignment: "Probability Homework #3",
    teacher: "Dr. Ramesh Sharma",
    teacherImage: "/placeholder.svg?height=40&width=40&text=RS",
    date: "2026-01-25",
    grade: "B",
    percentage: 78,
    type: "action",
    feedback: "You're showing improvement in probability but still struggling with conditional probability problems. Questions 4, 7, and 9 have fundamental errors in applying Bayes' theorem. Please revisit the chapter on conditional probability and attempt the practice problems. I've scheduled extra help sessions on Wednesdays.",
    isRead: true,
    replies: [],
    actionItems: ["Revisit conditional probability chapter", "Re-attempt questions 4, 7, and 9", "Attend Wednesday help session"],
  },
]

const typeConfig = {
  praise: { icon: Award, label: "Praise", color: "bg-green-100 text-green-800 border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500" },
  improvement: { icon: AlertTriangle, label: "Needs Improvement", color: "bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500" },
  action: { icon: Lightbulb, label: "Action Required", color: "bg-red-100 text-red-800 border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500" },
  general: { icon: MessageSquare, label: "General", color: "bg-blue-100 text-blue-800 border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500" },
}

export default function FeedbackPage() {
  const [filterSubject, setFilterSubject] = useState("All")
  const [filterType, setFilterType] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFeedback, setExpandedFeedback] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const subjects = ["All", "Mathematics", "Physics", "English", "History"]
  const types = ["All", "praise", "improvement", "action", "general"]

  const filtered = feedbackData.filter((f) => {
    const matchSearch = f.assignment.toLowerCase().includes(searchQuery.toLowerCase()) || f.feedback.toLowerCase().includes(searchQuery.toLowerCase())
    const matchSubject = filterSubject === "All" || f.subject === filterSubject
    const matchType = filterType === "All" || f.type === filterType
    return matchSearch && matchSubject && matchType
  })

  const unreadCount = feedbackData.filter((f) => !f.isRead).length
  const totalActionItems = feedbackData.reduce((a, b) => a + b.actionItems.length, 0)
  const avgGrade = Math.round(feedbackData.reduce((a, b) => a + b.percentage, 0) / feedbackData.length)

  const gradeColor = (pct: number) => {
    if (pct >= 90) return "text-green-600"
    if (pct >= 80) return "text-blue-600"
    if (pct >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Teacher Feedback</h2>
          <p className="text-sm text-muted-foreground">Review comments, track action items, and communicate with teachers</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full sm:w-48 border-2 border-foreground"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Feedback</p>
                <p className="text-lg font-black">{feedbackData.length}</p>
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
                <p className="text-xs text-muted-foreground">Unread</p>
                <p className="text-lg font-black">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-500/10 border-2 border-foreground">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Action Items</p>
                <p className="text-lg font-black">{totalActionItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="neo-brutalism-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-500/10 border-2 border-foreground">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Grade</p>
                <p className="text-lg font-black">{avgGrade}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="neo-brutalism-tabs">
        <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
          <TabsTrigger value="all" className="font-bold">All ({feedbackData.length})</TabsTrigger>
          <TabsTrigger value="unread" className="font-bold">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="actions" className="font-bold">Action Items</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {subjects.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filterSubject === s ? "default" : "outline"}
              className={`h-7 text-xs ${filterSubject === s ? "neo-brutalism-button-sm" : "border-2 border-foreground bg-transparent"}`}
              onClick={() => setFilterSubject(s)}
            >
              {s}
            </Button>
          ))}
          <span className="text-muted-foreground">|</span>
          {types.map((t) => {
            const config = t === "All" ? null : typeConfig[t as keyof typeof typeConfig]
            return (
              <Button
                key={t}
                size="sm"
                variant={filterType === t ? "default" : "outline"}
                className={`h-7 text-xs ${filterType === t ? "neo-brutalism-button-sm" : "border-2 border-foreground bg-transparent"}`}
                onClick={() => setFilterType(t)}
              >
                {config ? config.label : "All Types"}
              </Button>
            )
          })}
        </div>

        {/* All Feedback Tab */}
        <TabsContent value="all" className="space-y-3 pt-2">
          {filtered.map((f) => {
            const config = typeConfig[f.type]
            const TypeIcon = config.icon
            const isExpanded = expandedFeedback === f.id
            return (
              <Card key={f.id} className={`neo-brutalism-card ${!f.isRead ? "border-primary" : ""}`}>
                <CardContent className="p-0">
                  {/* Main Feedback */}
                  <div className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <Image
                        src={f.teacherImage || "/placeholder.svg"}
                        width={40}
                        height={40}
                        alt={f.teacher}
                        className="rounded-md border-2 border-foreground flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-black text-sm">{f.assignment}</h3>
                              {!f.isRead && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-bold text-foreground">{f.subject}</span>
                              <span>{f.teacher}</span>
                              <span>{new Date(f.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`rounded-md px-2 py-0.5 text-xs font-bold border ${config.color}`}>
                              <TypeIcon className="inline h-3 w-3 mr-1" />
                              {config.label}
                            </span>
                            <span className={`text-lg font-black ${gradeColor(f.percentage)}`}>{f.grade}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.feedback}</p>

                        {/* Action Items Preview */}
                        {f.actionItems.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {f.actionItems.slice(0, 2).map((item, idx) => (
                              <span key={idx} className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs">
                                <CheckCircle2 className="h-3 w-3 text-muted-foreground" /> {item}
                              </span>
                            ))}
                            {f.actionItems.length > 2 && (
                              <span className="text-xs text-muted-foreground">+{f.actionItems.length - 2} more</span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs gap-1"
                            onClick={() => setExpandedFeedback(isExpanded ? null : f.id)}
                          >
                            <MessageSquare className="h-3 w-3" />
                            Reply {f.replies.length > 0 && `(${f.replies.length})`}
                            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                            <ThumbsUp className="h-3 w-3" /> Thank
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded: Replies & Action Items */}
                  {isExpanded && (
                    <div className="border-t-2 border-foreground bg-muted/30 p-4 space-y-3">
                      {/* Action Items */}
                      {f.actionItems.length > 0 && (
                        <div>
                          <p className="text-xs font-black mb-2">Action Items</p>
                          <div className="space-y-1.5">
                            {f.actionItems.map((item, idx) => (
                              <label key={idx} className="flex items-center gap-2 text-xs cursor-pointer">
                                <input type="checkbox" className="rounded border-2 border-foreground" />
                                <span>{item}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {f.replies.length > 0 && (
                        <div>
                          <p className="text-xs font-black mb-2">Conversation</p>
                          <div className="space-y-2">
                            {f.replies.map((r, idx) => (
                              <div
                                key={idx}
                                className={`rounded-md border-2 border-foreground p-2.5 text-xs ${r.from === "You" ? "bg-primary/10 ml-6" : "bg-background mr-6"}`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold">{r.from}</span>
                                  <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-muted-foreground">{r.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 h-8 text-xs border-2 border-foreground"
                        />
                        <Button size="sm" className="neo-brutalism-button-sm h-8 text-xs gap-1">
                          <Send className="h-3 w-3" /> Send
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Unread Tab */}
        <TabsContent value="unread" className="space-y-3 pt-2">
          {filtered.filter((f) => !f.isRead).length === 0 ? (
            <Card className="neo-brutalism-card">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 mb-3" />
                <h3 className="font-black">All Caught Up!</h3>
                <p className="text-sm text-muted-foreground mt-1">You've read all your feedback. Great job staying on top of things.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.filter((f) => !f.isRead).map((f) => {
              const config = typeConfig[f.type]
              const TypeIcon = config.icon
              return (
                <Card key={f.id} className="neo-brutalism-card border-primary">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <Image
                        src={f.teacherImage || "/placeholder.svg"}
                        width={40}
                        height={40}
                        alt={f.teacher}
                        className="rounded-md border-2 border-foreground flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="font-black text-sm">{f.assignment}</h3>
                            <p className="text-xs text-muted-foreground">{f.subject} - {f.teacher}</p>
                          </div>
                          <span className={`rounded-md px-2 py-0.5 text-xs font-bold border ${config.color}`}>
                            <TypeIcon className="inline h-3 w-3 mr-1" />{config.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{f.feedback}</p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1">
                            <MessageSquare className="h-3 w-3" /> Reply
                          </Button>
                          <Button size="sm" className="neo-brutalism-button-sm h-7 text-xs">Mark as Read</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* Action Items Tab */}
        <TabsContent value="actions" className="space-y-3 pt-2">
          {feedbackData.filter((f) => f.actionItems.length > 0).map((f) => (
            <Card key={f.id} className="neo-brutalism-card">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="font-black text-sm">{f.assignment}</h3>
                    <p className="text-xs text-muted-foreground">{f.subject} - {f.teacher} - {new Date(f.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-sm font-black ${gradeColor(f.percentage)}`}>{f.grade} ({f.percentage}%)</span>
                </div>
                <div className="space-y-2">
                  {f.actionItems.map((item, idx) => (
                    <label key={idx} className="flex items-start gap-2.5 rounded-md border-2 border-foreground p-2.5 cursor-pointer hover:bg-muted/50 transition-colors">
                      <input type="checkbox" className="mt-0.5 rounded border-2 border-foreground" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
