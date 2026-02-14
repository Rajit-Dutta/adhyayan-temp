"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  LineChart,
  Upload,
} from "lucide-react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/ui/chart";
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  DashboardStatsSkeleton,
  DashboardChartSkeleton,
  DashboardFeedbackSkeleton,
} from "@/components/skeletons/dashboard-skeleton";
import { loadableStudentCookieData } from "@/lib/store/student";
import Loader from "@/components/ui/loading";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [student] = useAtom(loadableStudentCookieData);
  // Simulate loading dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const data = {
        stats: {
          overallProgress: 78,
          coursesEnrolled: 5,
          pendingAssignments: 3,
          averageScore: 85,
        },
        chartData: [
          { name: "Jan", value: 60 },
          { name: "Feb", value: 65 },
          { name: "Mar", value: 58 },
          { name: "Apr", value: 72 },
          { name: "May", value: 80 },
          { name: "Jun", value: 85 },
          { name: "Jul", value: 90 },
        ],
        recentFeedback: [
          {
            id: 1,
            subject: "Mathematics Assignment #1",
            teacher: "Dr. Smith",
            feedback:
              "Good work on the problem-solving section. Focus more on showing your work clearly.",
            date: "2 days ago",
          },
          {
            id: 2,
            subject: "Science Project #1",
            teacher: "Prof. Johnson",
            feedback:
              "Excellent lab work. Your methodology is clear and your analysis is thorough.",
            date: "3 days ago",
          },
          {
            id: 3,
            subject: "English Essay #2",
            teacher: "Ms. Williams",
            feedback:
              "Your writing demonstrates strong critical thinking. Work on varying your sentence structure.",
            date: "5 days ago",
          },
        ],
      };

      setDashboardData(data);
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);


    if (student.state === "loading") {
    return <Loader/>;
  } else if (student.state === "hasError") {
    return <div>Error loading student</div>;
  } else if (student.state === "hasData"){
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-muted-foreground">
              Welcome back, {student.data.jwtDecoded.name}! Here's an overview of your progress.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <LoadingWrapper
          isLoading={isLoading}
          skeleton={<DashboardStatsSkeleton />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="neo-brutalism-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">
                  Overall Progress
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">
                  {dashboardData?.stats.overallProgress}%
                </div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
                <Progress
                  value={dashboardData?.stats.overallProgress}
                  className="mt-2 neo-brutalism-progress"
                />
              </CardContent>
            </Card>
            <Card className="neo-brutalism-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">
                  Courses Enrolled
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">
                  {dashboardData?.stats.coursesEnrolled}
                </div>
                <p className="text-xs text-muted-foreground">
                  3 in progress, 2 completed
                </p>
              </CardContent>
            </Card>
            <Card className="neo-brutalism-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">
                  Pending Assignments
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">
                  {dashboardData?.stats.pendingAssignments}
                </div>
                <p className="text-xs text-muted-foreground">2 due this week</p>
              </CardContent>
            </Card>
            <Card className="neo-brutalism-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">Average Score</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">
                  {dashboardData?.stats.averageScore}%
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% from last semester
                </p>
              </CardContent>
            </Card>
          </div>
        </LoadingWrapper>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Performance Chart */}
          <LoadingWrapper
            isLoading={isLoading}
            skeleton={<DashboardChartSkeleton />}
            className="md:col-span-2 lg:col-span-4"
          >
            <Card className="md:col-span-2 lg:col-span-4 neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">Performance Overview</CardTitle>
                <CardDescription>
                  Your academic progress over time
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <div className="h-[300px]">
                  <AreaChart
                    data={dashboardData?.chartData || []}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={false}
                    showGridLines={false}
                    startEndOnly={false}
                    className="h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>
          </LoadingWrapper>

          {/* Recent Feedback */}
          <LoadingWrapper
            isLoading={isLoading}
            skeleton={<DashboardFeedbackSkeleton />}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="md:col-span-2 lg:col-span-3 neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">Recent Feedback</CardTitle>
                <CardDescription>
                  Latest comments from your teachers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentFeedback.map((feedback: any) => (
                    <div
                      key={feedback.id}
                      className="flex items-start gap-4 rounded-md border-2 border-foreground p-3 hover:bg-muted/50 transition-colors"
                    >
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=T${feedback.id}`}
                        width={40}
                        height={40}
                        alt={feedback.teacher}
                        className="rounded-md"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{feedback.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {feedback.feedback}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {feedback.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </LoadingWrapper>
        </div>

        {/* Assignments Tabs */}
        <div>
          <Tabs defaultValue="upcoming" className="neo-brutalism-tabs">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="neo-brutalism-tabslist">
                <TabsTrigger value="upcoming" className="font-bold">
                  Upcoming Assignments
                </TabsTrigger>
                <TabsTrigger value="recent" className="font-bold">
                  Recent Submissions
                </TabsTrigger>
              </TabsList>
              <Link href="/dashboard/assignments">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 neo-brutalism-button-outline"
                  disabled={isLoading}
                >
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <TabsContent value="upcoming">
              <Card className="neo-brutalism-card">
                <CardContent className="p-0">
                  <div className="divide-y-2 divide-foreground/20 rounded-md border-2 border-foreground">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="grid gap-1">
                          <div className="font-bold">
                            Mathematics Assignment #{i}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Due in {i + 1} days
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="neo-brutalism-button-sm"
                          disabled={isLoading}
                        >
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent">
              <Card className="neo-brutalism-card">
                <CardContent className="p-0">
                  <div className="divide-y-2 divide-foreground/20 rounded-md border-2 border-foreground">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/50 transition-colors gap-4"
                      >
                        <div className="grid gap-1">
                          <div className="font-bold">Science Project #{i}</div>
                          <div className="text-sm text-muted-foreground">
                            Submitted {i} days ago
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-bold">
                            Grade: {85 + i}%
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="neo-brutalism-button-outline-sm"
                            disabled={isLoading}
                          >
                            View Feedback
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }  
}
