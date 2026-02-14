"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Upload,
  X,
  File,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingWrapper } from "@/components/loading-wrapper"
import {
  DashboardStatsSkeleton,
  AssignmentCardSkeleton,
} from "@/components/skeletons/dashboard-skeleton"

const pendingAssignments = [
  {
    id: 1,
    title: "Calculus - Integration Problems",
    subject: "Mathematics",
    teacher: "Dr. Ramesh Sharma",
    dueDate: "2026-02-15",
    daysLeft: 7,
    totalMarks: 50,
    type: "Problem Set",
    description: "Solve problems 1-15 from Chapter 7. Show complete working for each problem.",
    attachments: [
      { name: "Chapter7_Problems.pdf", size: "1.2 MB" },
      { name: "Formula_Sheet.pdf", size: "0.3 MB" },
    ],
  },
  {
    id: 2,
    title: "Newton's Laws Lab Report",
    subject: "Physics",
    teacher: "Prof. Anita Desai",
    dueDate: "2026-02-12",
    daysLeft: 4,
    totalMarks: 30,
    type: "Lab Report",
    description: "Write a detailed lab report on the experiment conducted in class. Include observations, calculations, and conclusion.",
    attachments: [{ name: "Lab_Template.docx", size: "0.5 MB" }],
  },
  {
    id: 3,
    title: "Essay: Modern Indian Literature",
    subject: "English",
    teacher: "Ms. Priya Mehta",
    dueDate: "2026-02-10",
    daysLeft: 2,
    totalMarks: 40,
    type: "Essay",
    description: "Write a 1500-word analytical essay on any two works of modern Indian literature. Include proper citations.",
    attachments: [{ name: "Essay_Guidelines.pdf", size: "0.4 MB" }],
  },
]

const submittedAssignments = [
  {
    id: 4,
    title: "Algebra - Quadratic Equations",
    subject: "Mathematics",
    teacher: "Dr. Ramesh Sharma",
    submittedDate: "2026-02-01",
    totalMarks: 40,
    status: "under-review",
    fileName: "Algebra_Solutions.pdf",
  },
  {
    id: 5,
    title: "Thermodynamics Worksheet",
    subject: "Physics",
    teacher: "Prof. Anita Desai",
    submittedDate: "2026-01-28",
    totalMarks: 35,
    status: "under-review",
    fileName: "Thermo_Worksheet.pdf",
  },
]

const gradedAssignments = [
  {
    id: 6,
    title: "Trigonometry Test",
    subject: "Mathematics",
    teacher: "Dr. Ramesh Sharma",
    submittedDate: "2026-01-20",
    totalMarks: 50,
    obtainedMarks: 43,
    percentage: 86,
    grade: "A",
    feedback: "Excellent work on identities. Minor calculation errors in Q7 and Q12. Review double angle formulas.",
  },
  {
    id: 7,
    title: "Wave Optics Assignment",
    subject: "Physics",
    teacher: "Prof. Anita Desai",
    submittedDate: "2026-01-18",
    totalMarks: 40,
    obtainedMarks: 35,
    percentage: 88,
    grade: "A",
    feedback: "Very thorough analysis. Diagrams are well-drawn and labeled. Could improve on the derivation of Young's experiment formula.",
  },
  {
    id: 8,
    title: "Poetry Analysis",
    subject: "English",
    teacher: "Ms. Priya Mehta",
    submittedDate: "2026-01-15",
    totalMarks: 30,
    obtainedMarks: 24,
    percentage: 80,
    grade: "B+",
    feedback: "Good interpretation of themes. Your vocabulary usage is strong. Work on connecting literary devices to the overall meaning of the poem.",
  },
  {
    id: 9,
    title: "French Revolution Essay",
    subject: "History",
    teacher: "Prof. Suresh Kumar",
    submittedDate: "2026-01-12",
    totalMarks: 50,
    obtainedMarks: 46,
    percentage: 92,
    grade: "A+",
    feedback: "Outstanding essay. Your analysis of the socio-economic causes is particularly insightful. Well-researched and beautifully written.",
  },
]

export default function AssignmentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [viewModal, setViewModal] = useState<number | null>(null)
  const [selectedAssignment, setSelectedAssignment] = useState<string>("")
  const [filterSubject, setFilterSubject] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const subjects = ["All", "Mathematics", "Physics", "English", "History"]

  const filteredGraded = gradedAssignments.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchSubject = filterSubject === "All" || a.subject === filterSubject
    return matchSearch && matchSubject
  })

  const urgencyColor = (days: number) => {
    if (days <= 2) return "bg-red-100 text-red-800 border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500"
    if (days <= 5) return "bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500"
    return "bg-green-100 text-green-800 border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500"
  }

  const gradeColor = (pct: number) => {
    if (pct >= 90) return "bg-green-100 text-green-800 border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500"
    if (pct >= 80) return "bg-blue-100 text-blue-800 border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500"
    if (pct >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500"
    return "bg-red-100 text-red-800 border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Assignments</h2>
          <p className="text-sm text-muted-foreground">Manage submissions, view grades, and download question papers</p>
        </div>
        <Button className="neo-brutalism-button gap-1" onClick={() => setShowUploadModal(true)}>
          <Upload className="h-4 w-4" /> Upload Submission
        </Button>
      </div>

      {/* Quick Stats */}
      <LoadingWrapper
        isLoading={isLoading}
        skeleton={<DashboardStatsSkeleton />}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500/10 border-2 border-foreground">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-lg font-black">{pendingAssignments.length}</p>
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
                  <p className="text-xs text-muted-foreground">Under Review</p>
                  <p className="text-lg font-black">{submittedAssignments.length}</p>
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
                  <p className="text-xs text-muted-foreground">Graded</p>
                  <p className="text-lg font-black">{gradedAssignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg. Score</p>
                  <p className="text-lg font-black">
                    {Math.round(gradedAssignments.reduce((a, b) => a + b.percentage, 0) / gradedAssignments.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </LoadingWrapper>

      <LoadingWrapper
        isLoading={isLoading}
        skeleton={
          <div className="space-y-4 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <AssignmentCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Tabs defaultValue="pending" className="neo-brutalism-tabs">
          <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
            <TabsTrigger value="pending" className="font-bold">Pending ({pendingAssignments.length})</TabsTrigger>
            <TabsTrigger value="submitted" className="font-bold">Submitted ({submittedAssignments.length})</TabsTrigger>
            <TabsTrigger value="graded" className="font-bold">Graded ({gradedAssignments.length})</TabsTrigger>
          </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending" className="space-y-4 pt-4">
          {pendingAssignments.map((a) => (
            <Card key={a.id} className="neo-brutalism-card">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{a.title}</h3>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-bold border ${urgencyColor(a.daysLeft)}`}>
                        {a.daysLeft <= 2 ? "Urgent" : a.daysLeft <= 5 ? "Due Soon" : "Upcoming"} - {a.daysLeft} days
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{a.subject}</span>
                      <span>{a.teacher}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Due: {new Date(a.dueDate).toLocaleDateString()}</span>
                      <span>Marks: {a.totalMarks}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{a.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{a.description}</p>

                    {/* Attachments */}
                    <div className="flex flex-wrap gap-2">
                      {a.attachments.map((att, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-1.5 rounded-md border-2 border-foreground bg-muted/50 px-2.5 py-1.5 text-xs font-bold hover:bg-muted transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          {att.name}
                          <span className="text-muted-foreground font-normal">({att.size})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    <Button
                      size="sm"
                      className="neo-brutalism-button-sm text-xs h-8 flex-1 sm:flex-none"
                      onClick={() => { setSelectedAssignment(a.title); setShowUploadModal(true) }}
                    >
                      <Upload className="mr-1 h-3 w-3" /> Submit
                    </Button>
                    <Button size="sm" variant="outline" className="neo-brutalism-button-outline-sm text-xs h-8 flex-1 sm:flex-none bg-transparent">
                      <Eye className="mr-1 h-3 w-3" /> View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Submitted Tab */}
        <TabsContent value="submitted" className="space-y-4 pt-4">
          {submittedAssignments.map((a) => (
            <Card key={a.id} className="neo-brutalism-card">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{a.title}</h3>
                      <span className="rounded-md bg-blue-100 text-blue-800 border border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500 px-2 py-0.5 text-xs font-bold">
                        Under Review
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{a.subject}</span>
                      <span>{a.teacher}</span>
                      <span>Submitted: {new Date(a.submittedDate).toLocaleDateString()}</span>
                      <span>Marks: {a.totalMarks}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>{a.fileName}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                    onClick={() => setViewModal(a.id)}
                  >
                    View Submission
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Graded Tab */}
        <TabsContent value="graded" className="space-y-4 pt-4">
          {/* Filter Row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
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
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8 text-xs w-full sm:w-40 border-2 border-foreground"
              />
            </div>
          </div>

          {filteredGraded.map((a) => (
            <Card key={a.id} className="neo-brutalism-card">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black">{a.title}</h3>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-bold border ${gradeColor(a.percentage)}`}>
                        {a.grade} - {a.percentage}%
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">{a.subject}</span>
                      <span>{a.teacher}</span>
                      <span>Marks: {a.obtainedMarks}/{a.totalMarks}</span>
                    </div>
                    <div className="rounded-md border-2 border-foreground bg-muted/50 p-3">
                      <p className="text-xs font-bold mb-1">Teacher Feedback:</p>
                      <p className="text-xs text-muted-foreground">{a.feedback}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary">{a.obtainedMarks}</p>
                      <p className="text-xs text-muted-foreground">out of {a.totalMarks}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                      onClick={() => setViewModal(a.id)}
                    >
                      <Eye className="h-3 w-3" /> View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b-2 border-foreground pb-3">
              <CardTitle className="font-black text-lg">Upload Assignment</CardTitle>
              <Button size="sm" variant="ghost" onClick={() => setShowUploadModal(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Select Assignment</Label>
                <select
                  value={selectedAssignment}
                  onChange={(e) => setSelectedAssignment(e.target.value)}
                  className="flex h-9 w-full rounded-md border-2 border-foreground bg-background px-3 text-sm"
                >
                  <option value="">Choose assignment...</option>
                  {pendingAssignments.map((a) => (
                    <option key={a.id} value={a.title}>{a.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Upload File</Label>
                <label
                  htmlFor="file-upload"
                  className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-foreground bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <p className="mt-1 text-xs font-bold">Click or drag file here</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, Images (max 10MB)</p>
                </label>
                <Input id="file-upload" type="file" className="hidden" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Comments (optional)</Label>
                <textarea
                  className="flex min-h-[70px] w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                  placeholder="Any notes for your teacher..."
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 neo-brutalism-button text-sm">Submit Assignment</Button>
                <Button variant="outline" className="neo-brutalism-button-outline text-sm bg-transparent" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View Assignment Modal */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Assignment Details</h2>
              <button 
                onClick={() => setViewModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CardContent className="p-4 space-y-4">
              {[...gradedAssignments, ...submittedAssignments]
                .filter((a) => a.id === viewModal)
                .map((assignment) => (
                  <div key={assignment.id} className="space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-black">{assignment.title}</h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">Subject</p>
                          <p className="text-sm font-bold">{assignment.subject}</p>
                        </div>
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">Teacher</p>
                          <p className="text-sm font-bold">{assignment.teacher}</p>
                        </div>
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">Total Marks</p>
                          <p className="text-sm font-bold">{assignment.totalMarks}</p>
                        </div>
                      </div>
                    </div>

                    {/* Grade Info (if graded) */}
                    {'percentage' in assignment && (
                      <div className="rounded-md border-2 border-foreground bg-green-500/10 p-3 space-y-2">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <p className="text-2xl font-black text-primary">{assignment.obtainedMarks}</p>
                            <p className="text-xs text-muted-foreground">Obtained</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-black text-green-600">{assignment.percentage}%</p>
                            <p className="text-xs text-muted-foreground">Percentage</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-black text-blue-600">{assignment.grade}</p>
                            <p className="text-xs text-muted-foreground">Grade</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feedback */}
                    {'feedback' in assignment && (
                      <div className="rounded-md border-2 border-foreground bg-muted/50 p-3">
                        <p className="text-xs font-bold mb-2">Teacher Feedback:</p>
                        <p className="text-sm">{assignment.feedback}</p>
                      </div>
                    )}

                    {/* Submitted Date or Due Date */}
                    <div className="rounded-md border-2 border-foreground p-3 bg-primary/10">
                      <p className="text-xs text-muted-foreground mb-1">
                        {'submittedDate' in assignment ? 'Submitted On' : 'Due Date'}
                      </p>
                      <p className="font-bold">
                        {('submittedDate' in assignment ? new Date(assignment.submittedDate) : new Date(assignment?.dueDate)).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* File Section */}
                    {'fileName' in assignment && (
                      <div className="rounded-md border-2 border-foreground p-3">
                        <p className="text-xs font-bold mb-2">Submitted File:</p>
                        <div className="flex items-center gap-3 rounded-md border-2 border-foreground p-2 bg-muted/30">
                          <File className="h-5 w-5 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm font-bold">{assignment.fileName}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Close Button */}
                    <Button 
                      variant="outline" 
                      className="w-full neo-brutalism-button-outline"
                      onClick={() => setViewModal(null)}
                    >
                      Close
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}
      </LoadingWrapper>
    </div>
  )
}
