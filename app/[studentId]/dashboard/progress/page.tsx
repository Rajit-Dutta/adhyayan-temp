"use client"

import { useState, useEffect } from "react"
import {
  ArrowDown,
  ArrowUp,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  Minus,
  Target,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart, DonutChart } from "@/components/ui/chart"
import { LoadingWrapper } from "@/components/loading-wrapper"
import {
  DashboardStatsSkeleton,
  DashboardChartSkeleton,
  ProgressCardSkeleton,
} from "@/components/skeletons/dashboard-skeleton"

const monthlyData = [
  { month: "Sep", Mathematics: 62, Physics: 68, English: 55, History: 70, overall: 64 },
  { month: "Oct", Mathematics: 68, Physics: 72, English: 62, History: 66, overall: 67 },
  { month: "Nov", Mathematics: 74, Physics: 70, English: 68, History: 72, overall: 71 },
  { month: "Dec", Mathematics: 78, Physics: 76, English: 72, History: 78, overall: 76 },
  { month: "Jan", Mathematics: 82, Physics: 80, English: 78, History: 82, overall: 81 },
  { month: "Feb", Mathematics: 88, Physics: 84, English: 82, History: 86, overall: 85 },
]

const subjectDetails = [
  {
    name: "Mathematics",
    score: 88,
    change: +6,
    rank: 5,
    totalStudents: 156,
    assignments: { completed: 12, total: 14 },
    tests: { avg: 86, best: 95, worst: 72 },
    attendance: 94,
    teacher: "Dr. Ramesh Sharma",
    strengths: ["Integration", "Algebra", "Geometry"],
    weaknesses: ["Probability", "Statistics"],
  },
  {
    name: "Physics",
    score: 84,
    change: +4,
    rank: 8,
    totalStudents: 132,
    assignments: { completed: 10, total: 12 },
    tests: { avg: 82, best: 91, worst: 68 },
    attendance: 90,
    teacher: "Prof. Anita Desai",
    strengths: ["Mechanics", "Thermodynamics"],
    weaknesses: ["Electromagnetism", "Optics"],
  },
  {
    name: "English",
    score: 82,
    change: +4,
    rank: 3,
    totalStudents: 98,
    assignments: { completed: 8, total: 10 },
    tests: { avg: 80, best: 88, worst: 70 },
    attendance: 96,
    teacher: "Ms. Priya Mehta",
    strengths: ["Creative Writing", "Comprehension"],
    weaknesses: ["Grammar", "Poetry Analysis"],
  },
  {
    name: "History",
    score: 86,
    change: +4,
    rank: 4,
    totalStudents: 87,
    assignments: { completed: 9, total: 10 },
    tests: { avg: 84, best: 92, worst: 74 },
    attendance: 92,
    teacher: "Prof. Suresh Kumar",
    strengths: ["Modern History", "Essay Writing"],
    weaknesses: ["Ancient Civilizations"],
  },
]

const distributionData = [
  { name: "Mathematics", value: 88 },
  { name: "Physics", value: 84 },
  { name: "English", value: 82 },
  { name: "History", value: 86 },
]

const testScores = [
  { test: "Unit Test 1", Mathematics: 72, Physics: 68, English: 65, History: 70 },
  { test: "Mid Term", Mathematics: 78, Physics: 76, English: 72, History: 78 },
  { test: "Unit Test 2", Mathematics: 82, Physics: 80, English: 78, History: 82 },
  { test: "Unit Test 3", Mathematics: 88, Physics: 84, English: 82, History: 86 },
]

const goals = [
  { subject: "Mathematics", current: 88, target: 95, deadline: "March 2026" },
  { subject: "Physics", current: 84, target: 90, deadline: "March 2026" },
  { subject: "English", current: 82, target: 88, deadline: "April 2026" },
  { subject: "Overall GPA", current: 85, target: 90, deadline: "May 2026" },
]

export default function ProgressPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timePeriod, setTimePeriod] = useState("6months")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const overallScore = Math.round(subjectDetails.reduce((a, b) => a + b.score, 0) / subjectDetails.length)
  const overallChange = Math.round(subjectDetails.reduce((a, b) => a + b.change, 0) / subjectDetails.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Academic Progress</h2>
          <p className="text-sm text-muted-foreground">Track performance, set goals, and monitor growth</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="h-9 rounded-md border-2 border-foreground bg-background px-3 text-sm font-bold"
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">This Year</option>
          </select>
          <Button variant="outline" size="sm" className="neo-brutalism-button-outline-sm text-xs h-9 gap-1 bg-transparent">
            <Download className="h-3 w-3" /> Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <LoadingWrapper
        isLoading={isLoading}
        skeleton={<DashboardStatsSkeleton />}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Overall</p>
                  <div className="flex items-center gap-1">
                    <p className="text-lg font-black">{overallScore}%</p>
                    <span className="flex items-center text-xs font-bold text-green-600">
                      <ArrowUp className="h-3 w-3" />{overallChange}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-500/10 border-2 border-foreground">
                  <Award className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Class Rank</p>
                  <p className="text-lg font-black">#5 <span className="text-xs font-normal text-muted-foreground">/ 156</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-500/10 border-2 border-foreground">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assignments</p>
                  <p className="text-lg font-black">39/46</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-500/10 border-2 border-foreground">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className="text-lg font-black">93%</p>
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
            <DashboardChartSkeleton />
            <ProgressCardSkeleton />
          </div>
        }
      >
        <Tabs defaultValue="overview" className="neo-brutalism-tabs">
          <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
            <TabsTrigger value="overview" className="font-bold">Overview</TabsTrigger>
            <TabsTrigger value="subjects" className="font-bold">Subjects</TabsTrigger>
            <TabsTrigger value="tests" className="font-bold">Test Scores</TabsTrigger>
            <TabsTrigger value="goals" className="font-bold">Goals</TabsTrigger>
          </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 lg:grid-cols-5">
            <Card className="neo-brutalism-card lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black">Performance Trend</CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="h-[280px]">
                  <AreaChart
                    data={monthlyData}
                    index="month"
                    categories={["Mathematics", "Physics", "English", "History"]}
                    colors={["primary", "blue", "yellow", "green"]}
                    valueFormatter={(v) => `${v}%`}
                    showLegend={true}
                    showGridLines={true}
                    className="h-[280px]"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="neo-brutalism-card lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="h-[280px]">
                  <DonutChart
                    data={distributionData}
                    index="name"
                    category="value"
                    valueFormatter={(v) => `${v}%`}
                    colors={["primary", "blue", "yellow", "green"]}
                    className="h-[280px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject Quick View */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {subjectDetails.map((s) => (
              <Card key={s.name} className="neo-brutalism-card">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black">{s.name}</h3>
                    <span className={`flex items-center text-xs font-bold ${s.change > 0 ? "text-green-600" : s.change < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                      {s.change > 0 ? <ArrowUp className="h-3 w-3" /> : s.change < 0 ? <ArrowDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                      {Math.abs(s.change)}%
                    </span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black">{s.score}%</span>
                    <span className="mb-1 text-xs text-muted-foreground">Rank #{s.rank}</span>
                  </div>
                  <Progress value={s.score} className="neo-brutalism-progress" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Assignments: {s.assignments.completed}/{s.assignments.total}</span>
                    <span>Attend: {s.attendance}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4 pt-4">
          {subjectDetails.map((s) => (
            <Card key={s.name} className="neo-brutalism-card">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row">
                  {/* Left: Score & Info */}
                  <div className="flex items-start gap-4 lg:w-1/3">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-primary/10">
                      <span className="text-xl font-black text-primary">{s.score}</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black">{s.name}</h3>
                      <p className="text-xs text-muted-foreground">{s.teacher}</p>
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center text-xs font-bold ${s.change > 0 ? "text-green-600" : "text-red-600"}`}>
                          {s.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(s.change)}% from last month
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rank #{s.rank} of {s.totalStudents}</p>
                    </div>
                  </div>

                  {/* Middle: Breakdown */}
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-md border-2 border-foreground p-2">
                        <p className="text-lg font-black">{s.tests.avg}%</p>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                      <div className="rounded-md border-2 border-foreground p-2">
                        <p className="text-lg font-black text-green-600">{s.tests.best}%</p>
                        <p className="text-xs text-muted-foreground">Best</p>
                      </div>
                      <div className="rounded-md border-2 border-foreground p-2">
                        <p className="text-lg font-black text-red-600">{s.tests.worst}%</p>
                        <p className="text-xs text-muted-foreground">Lowest</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold">Assignments</span>
                        <span>{s.assignments.completed}/{s.assignments.total}</span>
                      </div>
                      <Progress value={(s.assignments.completed / s.assignments.total) * 100} className="neo-brutalism-progress" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold">Attendance</span>
                        <span>{s.attendance}%</span>
                      </div>
                      <Progress value={s.attendance} className="neo-brutalism-progress" />
                    </div>
                  </div>

                  {/* Right: Strengths/Weaknesses */}
                  <div className="lg:w-1/4 space-y-2">
                    <div>
                      <p className="text-xs font-black mb-1">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {s.strengths.map((st) => (
                          <span key={st} className="rounded-md bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-800 dark:text-green-400 border border-green-800 dark:border-green-500">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black mb-1">Needs Improvement</p>
                      <div className="flex flex-wrap gap-1">
                        {s.weaknesses.map((w) => (
                          <span key={w} className="rounded-md bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 text-xs font-bold text-yellow-800 dark:text-yellow-400 border border-yellow-800 dark:border-yellow-500">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Tests Tab */}
        <TabsContent value="tests" className="space-y-4 pt-4">
          <Card className="neo-brutalism-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Test Comparison</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[300px]">
                <BarChart
                  data={testScores}
                  index="test"
                  categories={["Mathematics", "Physics", "English", "History"]}
                  colors={["primary", "blue", "yellow", "green"]}
                  valueFormatter={(v) => `${v}%`}
                  showLegend={true}
                  className="h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Test History Table */}
          <Card className="neo-brutalism-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Detailed Test History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border-2 border-foreground overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted text-xs font-bold">
                      <th className="p-3 text-left">Test</th>
                      <th className="p-3 text-center">Math</th>
                      <th className="p-3 text-center">Physics</th>
                      <th className="p-3 text-center">English</th>
                      <th className="p-3 text-center">History</th>
                      <th className="p-3 text-center">Overall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-foreground/20">
                    {testScores.map((t) => {
                      const avg = Math.round((t.Mathematics + t.Physics + t.English + t.History) / 4)
                      return (
                        <tr key={t.test} className="hover:bg-muted/50 transition-colors">
                          <td className="p-3 font-bold">{t.test}</td>
                          <td className="p-3 text-center">{t.Mathematics}%</td>
                          <td className="p-3 text-center">{t.Physics}%</td>
                          <td className="p-3 text-center">{t.English}%</td>
                          <td className="p-3 text-center">{t.History}%</td>
                          <td className="p-3 text-center font-black">{avg}%</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((g) => {
              const progressPct = Math.round((g.current / g.target) * 100)
              const remaining = g.target - g.current
              return (
                <Card key={g.subject} className="neo-brutalism-card">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <h3 className="font-black text-sm">{g.subject}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground">By {g.deadline}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-black">{g.current}%</span>
                        <span className="text-sm text-muted-foreground"> / {g.target}%</span>
                      </div>
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary border border-primary">
                        {remaining}% to go
                      </span>
                    </div>
                    <Progress value={progressPct} className="neo-brutalism-progress" />
                    <p className="text-xs text-muted-foreground">
                      {progressPct >= 90
                        ? "Almost there! Keep pushing."
                        : progressPct >= 75
                          ? "Good progress. Stay consistent."
                          : "Needs more effort. Focus on weak areas."}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
      </LoadingWrapper>
    </div>
  )
}
