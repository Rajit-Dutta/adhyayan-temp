"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/ui/chart";
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  DashboardChartSkeleton,
  DashboardFeedbackSkeleton,
} from "@/components/skeletons/dashboard-skeleton";
import { loadableStudentCookieData } from "@/lib/store/student";
import Loader from "@/components/ui/loading";
import axios from "axios";

type Assignment = {
  _id: string;
  title: string;
  subject: string;
  grade: string;
  assignedTo: string[];
  assignedBy: string;
  totalMarks: string;
  questionPaperLink: string;
  isSubmissionInClass: boolean;
  isSubmissionOpen: boolean;
  submitCount: number;
  checkCount: number;
  submitDate: Date;
  createdAt: Date;
  updatedAt?: Date;
};

type AssignmentSubmission = {
  assignment: string;
  assignedBy: string;
  submittedBy: string;
  submissionLink: string;
  marksScored: number;
  studentComment: string;
  teacherFeedback?: string;
  status: "submitted" | "graded" | "pending";
  submissionDate: Date;
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const teacherMap = useRef(new Map());
  const submittedAssignmentMap = useRef(new Map());
  const [pendingAssignments, setPendingAssignments] = useState<Assignment[]>(
    [],
  );
  const [submittedAssignments, setSubmittedAssignments] = useState<
    AssignmentSubmission[]
  >([]);
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

  useEffect(() => {
    getStudentSubjectDetails();
    fetchPendingAssignment();
    fetchSubmittedAssignment();
  }, []);

  const getStudentSubjectDetails = async () => {
    try {
      if (student.state !== "hasData") return;

      const id = student.data.jwtDecoded.id;

      // 1. get subjects
      const subjectRes = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/student/subjects/getSubjectData`,
        { params: { id } },
      );

      const subjectList =
        typeof subjectRes.data === "string"
          ? subjectRes.data.split(",")
          : subjectRes.data;

      // 2. fetch all subjects in parallel
      const results = await Promise.all(
        subjectList.map((subject: string) =>
          axios.get(
            `${process.env.NEXT_PUBLIC_DOMAIN}/student/subjects/getSubjectScoreAndMonthWRTId`,
            {
              params: { id, subjectName: subject },
            },
          ),
        ),
      );

      // 3. build map
      const scoreMap = new Map<string, { stats: any; marks: any[] }>();

      results.forEach((res, i) => {
        if (!res.data) return;

        if (Array.isArray(res.data)) {
          scoreMap.set(subjectList[i], {
            stats: null,
            marks: [],
          });
          return;
        }

        scoreMap.set(subjectList[i], {
          stats: res.data.stats ?? null,
          marks: Array.isArray(res.data.marks) ? res.data.marks : [],
        });
      });
      // 4. transform for charts
      const chartData = buildMonthlyData(scoreMap);
      console.log("ChartData -> ", chartData);
      setMonthlyData(chartData);
    } catch (err) {
      console.error("Failed loading dashboard", err);
    }
  };

  const buildMonthlyData = (map: Map<string, { stats: any; marks: any[] }>) => {
    const monthly: Record<
      string,
      { month: string; total: number; count: number }
    > = {};

    map.forEach((records) => {
      if (!Array.isArray(records.marks)) return;

      records.marks.forEach((r) => {
        if (!r?.submissionDate) return;
        const d = new Date(r.submissionDate);
        if (isNaN(d.getTime())) return;

        const month = d.toLocaleString("default", { month: "short" });

        if (!monthly[month]) {
          monthly[month] = { month, total: 0, count: 0 };
        }

        const score = r.marksScored ?? 0;

        monthly[month].total += score;
        monthly[month].count += 1;
      });
    });

    // Convert to final format
    return Object.values(monthly).map((m) => ({
      name: m.month,
      value: m.count > 0 ? Number((m.total / m.count).toFixed(2)) : 0,
    }));
  };

  const fetchPendingAssignment = async () => {
    try {
      if (student.state === "hasData") {
        console.log("student id: ", student.data.jwtDecoded.id);
        const pendingAssignmentResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/assignments/getAssignmentsWRTStudent`,
          {
            params: { id: student.data.jwtDecoded.id },
          },
        );
        console.log(pendingAssignmentResponse.data);
        const teacherDetailsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/teachers/getTeacherNames`,
        );
        teacherDetailsRes.data.forEach((teacher: any) => {
          teacherMap.current.set(teacher._id, teacher.fullName);
        });
        const enrichedAssignments = pendingAssignmentResponse.data.map(
          (batch: any) => ({
            ...batch,
            assignedBy: teacherMap.current.get(batch.assignedBy?.toString()),
          }),
        );
        console.log(enrichedAssignments);
        setPendingAssignments(enrichedAssignments);
      }
    } catch (error) {
      console.error("Error during pending assignment data fetch:", error);
    }
  };

  const fetchSubmittedAssignment = async () => {
    try {
      if (student.state === "hasData") {
        const submittedAssignmentResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/assignmentSubmission/getSubmissions`,
          {
            params: { id: student.data.jwtDecoded.id },
          },
        );
        const teacherDetailsRes = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/teachers/getTeacherNames`,
        );
        teacherDetailsRes.data.forEach((teacher: any) => {
          teacherMap.current.set(teacher._id, teacher.fullName);
        });
        const enrichedAssignments = await Promise.all(
          submittedAssignmentResponse.data.map(
            async (assignment: AssignmentSubmission) => {
              const submittedAssignmentDetailsResponse = await axios.get(
                `${process.env.NEXT_PUBLIC_DOMAIN}/assignments/getAssignmentsWRTId`,
                {
                  params: { id: assignment.assignment },
                },
              );
              submittedAssignmentDetailsResponse.data.forEach(
                (submittedAssignment: Assignment) => {
                  submittedAssignmentMap.current.set(
                    assignment.assignment,
                    submittedAssignment,
                  );
                },
              );
              return {
                ...assignment,
                assignedBy: teacherMap.current.get(
                  assignment.assignedBy.toString(),
                ),
              };
            },
          ),
        );
        console.log(enrichedAssignments);
        setSubmittedAssignments(enrichedAssignments);
      }
    } catch (error) {
      console.error("Error during pending assignment data fetch:", error);
    }
  };

  if (student.state === "loading") {
    return <Loader />;
  } else if (student.state === "hasError") {
    return <div>Error loading student</div>;
  } else if (student.state === "hasData") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-muted-foreground">
              Welcome back, {student.data.jwtDecoded.name}! Here's an overview
              of your progress.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 items-stretch">
          {/* Performance Chart */}
          <LoadingWrapper
            isLoading={isLoading}
            skeleton={<DashboardChartSkeleton />}
            className="md:col-span-2 lg:col-span-4"
          >
            <Card className="h-[420px] flex flex-col neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Your academic progress over time
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <AreaChart
                  data={monthlyData}
                  index="name"
                  categories={["value"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value}%`}
                  showLegend={false}
                  showGridLines={false}
                  startEndOnly={false}
                  className="h-full"
                />
              </CardContent>
            </Card>
          </LoadingWrapper>

          {/* Recent Feedback */}
          <LoadingWrapper
            isLoading={isLoading}
            skeleton={<DashboardFeedbackSkeleton />}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="h-[420px] flex flex-col neo-brutalism-card">
              <CardHeader>
                <CardTitle className="font-black">Recent Feedback</CardTitle>
                <CardDescription>
                  Latest comments from your teachers
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                  {submittedAssignments.map((assignment: any) => (
                    <div
                      key={assignment._id}
                      className="flex items-start flex-col gap-4 rounded-md border-2 border-foreground p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-center items-center">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=T${assignment._id}`}
                          width={40}
                          height={40}
                          alt={assignment.assignedBy}
                          className="rounded-md"
                        />
                        <div className="flex flex-col ml-3">
                          <p className="text-lg font-bold">
                            {
                              submittedAssignmentMap.current.get(
                                assignment.assignment,
                              )?.title
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              assignment.submissionDate,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="flex flex-col w-full gap-3">
                          {/* Student Message */}
                          <div className="flex justify-end">
                            <div className="bg-[#333333] px-4 py-2 text-white rounded-2xl text-xs rounded-br-none shadow-md max-w-xs">
                              {assignment.studentComment}
                            </div>
                          </div>

                          {/* Teacher Message */}
                          <div className="flex justify-start">
                            <div className="bg-white px-4 py-2 text-gray-700 rounded-2xl text-xs rounded-bl-none shadow-md max-w-xs">
                              {assignment.teacherFeedback}
                            </div>
                          </div>
                        </div>
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
              <Link
                href={`/${student.data.jwtDecoded.id}/dashboard/assignments`}
              >
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
              {pendingAssignments.length > 0 ? (
                <Card className="neo-brutalism-card">
                  <CardContent className="p-0">
                    <div className="divide-y-2 divide-foreground/20 rounded-md border-2 border-foreground">
                      {pendingAssignments.map((assignment) => (
                        <div
                          key={assignment._id}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="grid gap-1">
                            <div className="font-bold">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {Math.ceil(
                                (new Date(assignment.submitDate).setHours(
                                  0,
                                  0,
                                  0,
                                  0,
                                ) -
                                  new Date().setHours(0, 0, 0, 0)) /
                                  86400000,
                              ) < 0
                                ? "Running late"
                                : Math.ceil(
                                      (new Date(assignment.submitDate).setHours(
                                        0,
                                        0,
                                        0,
                                        0,
                                      ) -
                                        new Date().setHours(0, 0, 0, 0)) /
                                        86400000,
                                    ) <= 2
                                  ? "Urgent"
                                  : Math.ceil(
                                        (new Date(
                                          assignment.submitDate,
                                        ).setHours(0, 0, 0, 0) -
                                          new Date().setHours(0, 0, 0, 0)) /
                                          86400000,
                                      ) <= 5
                                    ? "Due Soon"
                                    : "Upcoming"}{" "}
                              -{" "}
                              {Math.abs(
                                Math.ceil(
                                  (new Date(assignment.submitDate).setHours(
                                    0,
                                    0,
                                    0,
                                    0,
                                  ) -
                                    new Date().setHours(0, 0, 0, 0)) /
                                    86400000,
                                ),
                              )}
                              days
                            </div>
                          </div>
                          {/* <Button
                            size="sm"
                            className="neo-brutalism-button-sm"
                            disabled={isLoading}
                          >
                            View
                          </Button> */}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                "No pending assignments"
              )}
            </TabsContent>
            <TabsContent value="recent">
              <Card className="neo-brutalism-card">
                <CardContent className="p-0">
                  <div className="divide-y-2 divide-foreground/20 rounded-md border-2 border-foreground">
                    {submittedAssignments.map((assignment) => (
                      <div
                        key={assignment.assignment}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/50 transition-colors gap-4"
                      >
                        <div className="grid gap-1">
                          <div className="font-bold">
                            {
                              submittedAssignmentMap.current.get(
                                assignment.assignment,
                              )?.title
                            }
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Submitted{" "}
                            {new Date(
                              assignment.submissionDate,
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-bold">
                            Marks:
                            {assignment.marksScored}
                          </div>
                          {/* <Button
                            size="sm"
                            variant="outline"
                            className="neo-brutalism-button-outline-sm"
                            disabled={isLoading}
                          >
                            View Feedback
                          </Button> */}
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
