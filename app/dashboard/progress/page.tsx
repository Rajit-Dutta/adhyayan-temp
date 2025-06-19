"use server"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AreaChart, BarChart, DonutChart } from "@/components/ui/chart"

export default function ProgressPage() {
  // Sample data for charts
  const monthlyData = [
    { name: "Jan", Mathematics: 65, Science: 75, English: 60, History: 70 },
    { name: "Feb", Mathematics: 70, Science: 65, English: 75, History: 65 },
    { name: "Mar", Mathematics: 75, Science: 70, English: 80, History: 60 },
    { name: "Apr", Mathematics: 80, Science: 80, English: 70, History: 75 },
    { name: "May", Mathematics: 85, Science: 75, English: 75, History: 80 },
    { name: "Jun", Mathematics: 90, Science: 85, English: 80, History: 85 },
  ]

  const subjectData = [
    { name: "Mathematics", value: 85 },
    { name: "Science", value: 78 },
    { name: "English", value: 72 },
    { name: "History", value: 80 },
  ]

  const assignmentData = [
    { name: "Assignment 1", score: 85 },
    { name: "Assignment 2", score: 92 },
    { name: "Assignment 3", score: 78 },
    { name: "Assignment 4", score: 88 },
    { name: "Assignment 5", score: 95 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Academic Progress</h2>
        <p className="text-muted-foreground">Track your performance and growth across all subjects</p>
      </div>

      <Tabs defaultValue="overview" className="neo-brutalism-tabs">
        <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
          <TabsTrigger value="overview" className="font-bold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="subjects" className="font-bold">
            Subjects
          </TabsTrigger>
          <TabsTrigger value="assignments" className="font-bold">
            Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card className="neo-brutalism-card">
            <CardHeader>
              <CardTitle className="font-black">Performance Trend</CardTitle>
              <CardDescription>Your progress over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-[350px]">
                <AreaChart
                  data={monthlyData}
                  index="name"
                  categories={["Mathematics", "Science", "English", "History"]}
                  colors={["primary", "secondary", "yellow", "green"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={true}
                  showGridLines={true}
                  startEndOnly={false}
                  className="h-[350px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">Subject Performance</CardTitle>
                <CardDescription>Current scores by subject</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="h-[300px]">
                  <DonutChart
                    data={subjectData}
                    index="name"
                    category="value"
                    valueFormatter={(value) => `${value}%`}
                    colors={["primary", "secondary", "yellow", "green"]}
                    className="h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">Recent Assignments</CardTitle>
                <CardDescription>Your last 5 assignment scores</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="h-[300px]">
                  <BarChart
                    data={assignmentData}
                    index="name"
                    categories={["score"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={false}
                    showGridLines={true}
                    className="h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {subjectData.map((subject) => (
              <Card key={subject.name} className="neo-brutalism-card">
                <CardHeader>
                  <CardTitle className="font-black">{subject.name}</CardTitle>
                  <CardDescription>Current progress and performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold">Overall Score</div>
                      <div className="text-sm font-bold">{subject.value}%</div>
                    </div>
                    <Progress value={subject.value} className="neo-brutalism-progress" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-bold">Breakdown</div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-xs font-bold">Assignments</div>
                        <Progress
                          value={Math.floor(Math.random() * 20) + 80}
                          className="col-span-2 neo-brutalism-progress"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-xs font-bold">Tests</div>
                        <Progress
                          value={Math.floor(Math.random() * 20) + 75}
                          className="col-span-2 neo-brutalism-progress"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-2">
                        <div className="text-xs font-bold">Participation</div>
                        <Progress
                          value={Math.floor(Math.random() * 20) + 70}
                          className="col-span-2 neo-brutalism-progress"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md bg-muted p-3 border-2 border-foreground">
                    <div className="text-sm font-bold">Teacher's Note</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {subject.name === "Mathematics"
                        ? "Good progress in problem-solving. Focus more on showing your work clearly."
                        : subject.name === "Science"
                          ? "Excellent lab work. Continue to develop your theoretical understanding."
                          : subject.name === "English"
                            ? "Your writing has improved significantly. Work on critical analysis skills."
                            : "Great understanding of historical events. Work on connecting themes across time periods."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4 pt-4">
          <Card className="neo-brutalism-card">
            <CardHeader>
              <CardTitle className="font-black">Assignment History</CardTitle>
              <CardDescription>Your performance on all assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {["Mathematics", "Science", "English", "History"].map((subject) => (
                  <div key={subject} className="space-y-2">
                    <h3 className="font-bold">{subject}</h3>
                    <div className="rounded-md border-2 border-foreground overflow-hidden">
                      <div className="grid grid-cols-12 gap-2 p-3 text-xs font-bold bg-muted">
                        <div className="col-span-5">Assignment</div>
                        <div className="col-span-2 text-center">Score</div>
                        <div className="col-span-3 text-center">Submitted</div>
                        <div className="col-span-2 text-center">Status</div>
                      </div>
                      <div className="divide-y-2 divide-foreground/20">
                        {[1, 2, 3].map((i) => {
                          const score = Math.floor(Math.random() * 20) + 75
                          return (
                            <div
                              key={i}
                              className="grid grid-cols-12 gap-2 p-3 text-sm hover:bg-muted/50 transition-colors"
                            >
                              <div className="col-span-5 font-bold">
                                {subject} Assignment #{i}
                              </div>
                              <div className="col-span-2 text-center font-bold">{score}%</div>
                              <div className="col-span-3 text-center text-xs text-muted-foreground">
                                {new Date(2023, 5 + i, 10 + i).toLocaleDateString()}
                              </div>
                              <div className="col-span-2 text-center">
                                <span
                                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold border-2 ${
                                    score >= 90
                                      ? "bg-green-100 text-green-800 border-green-800"
                                      : score >= 80
                                        ? "bg-blue-100 text-blue-800 border-blue-800"
                                        : score >= 70
                                          ? "bg-yellow-100 text-yellow-800 border-yellow-800"
                                          : "bg-red-100 text-red-800 border-red-800"
                                  }`}
                                >
                                  {score >= 90
                                    ? "Excellent"
                                    : score >= 80
                                      ? "Good"
                                      : score >= 70
                                        ? "Average"
                                        : "Needs Work"}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
