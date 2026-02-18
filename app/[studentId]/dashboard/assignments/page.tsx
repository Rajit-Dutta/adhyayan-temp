"use client";

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  DashboardStatsSkeleton,
  AssignmentCardSkeleton,
} from "@/components/skeletons/dashboard-skeleton";
import axios from "axios";
import { loadableStudentCookieData } from "@/lib/store/student";
import { useAtom } from "jotai";

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
  checkedBy?: string;
  submissionDate: Date;
  submissionLink: string;
  marksScored: number;
  feedback?: string;
  isLate: boolean;
  status: "submitted" | "graded" | "pending";
  createdAt: Date;
  updatedAt: Date;
};

export default function AssignmentsPage() {
  const [student] = useAtom(loadableStudentCookieData);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewModal, setViewModal] = useState<number | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [filterSubject, setFilterSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingAssignments, setPendingAssignments] = useState<Assignment[]>(
    [],
  );
  const [submittedAssignments, setSubmittedAssignments] = useState<
    AssignmentSubmission[]
  >([]);
  const [gradedAssignments, setGradedAssignments] = useState<
    AssignmentSubmission[]
  >([]);
  const teacherMap = useRef(new Map());
  const submittedAssignmentMap = useRef(new Map());

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchPendingAssignment();
    fetchSubmittedAssignment();
  }, []);

  const subjects = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
  ];

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

  const urgencyColor = (days: number) => {
    if (days <= 2)
      return "bg-red-100 text-red-800 border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500";
    if (days <= 5)
      return "bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500";
    return "bg-green-100 text-green-800 border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500";
  };

  const gradeColor = (pct: number) => {
    if (pct >= 90)
      return "bg-green-100 text-green-800 border-green-800 dark:bg-green-900/30 dark:text-green-400 dark:border-green-500";
    if (pct >= 80)
      return "bg-blue-100 text-blue-800 border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500";
    if (pct >= 70)
      return "bg-yellow-100 text-yellow-800 border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-500";
    return "bg-red-100 text-red-800 border-red-800 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Assignments</h2>
          <p className="text-sm text-muted-foreground">
            Manage submissions, view grades, and download question papers
          </p>
        </div>
        <Button
          className="neo-brutalism-button gap-1"
          onClick={() => setShowUploadModal(true)}
        >
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
                  <p className="text-lg font-black">
                    {pendingAssignments.length}
                  </p>
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
                  <p className="text-lg font-black">
                    {submittedAssignments.length}
                  </p>
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
                  <p className="text-lg font-black">
                    {gradedAssignments.length}
                  </p>
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
                    {/* {Math.round(
                      gradedAssignments.reduce((a, b) => a + b.percentage, 0) /
                        gradedAssignments.length,
                    )} */}
                    XX%
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
          <TabsList
            className="w-full sm:w-auto neo-brutalism-tabslist"
            onClick={() => {
              setFilterSubject("All");
            }}
          >
            <TabsTrigger value="pending" className="font-bold">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted" className="font-bold">
              Submitted (
              {
                submittedAssignments.filter(
                  (assignment) => assignment.status === "submitted",
                ).length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="graded" className="font-bold">
              Graded (
              {
                submittedAssignments.filter(
                  (assignment) => assignment.status === "graded",
                ).length
              }
              )
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-5">
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

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-4 pt-4 w-full">
            <div className="w-full grid lg:grid-cols-3 grid-cols-2 gap-6">
              {pendingAssignments
                .filter(
                  (assignment: any) =>
                    filterSubject === "All" ||
                    assignment.subject === filterSubject,
                )
                .map((a: Assignment) => (
                  <Card key={a._id} className="neo-brutalism-card">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-black">{a.title}</h3>
                            <span
                              className={`rounded-md px-2 py-0.5 text-xs font-bold border ${urgencyColor(Math.ceil((new Date(a.submitDate).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000))}`}
                            >
                              {Math.ceil(
                                (new Date(a.submitDate).setHours(0, 0, 0, 0) -
                                  new Date().setHours(0, 0, 0, 0)) /
                                  86400000,
                              ) <= 2
                                ? "Urgent"
                                : Math.ceil(
                                      (new Date(a.submitDate).setHours(
                                        0,
                                        0,
                                        0,
                                        0,
                                      ) -
                                        new Date().setHours(0, 0, 0, 0)) /
                                        86400000,
                                    ) <= 5
                                  ? "Due Soon"
                                  : "Upcoming"}{" "}
                              -{" "}
                              {Math.ceil(
                                (new Date(a.submitDate).setHours(0, 0, 0, 0) -
                                  new Date().setHours(0, 0, 0, 0)) /
                                  86400000,
                              )}{" "}
                              days
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-bold text-foreground">
                              {a.subject}
                            </span>
                            <span>{a.assignedBy}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> Due:{" "}
                              {new Date(a.submitDate).toLocaleDateString()}
                            </span>
                            <span>Marks: {a.totalMarks}</span>
                          </div>
                          <div className="w-full flex justify-between">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  window.open(a.questionPaperLink, "_blank")
                                }
                                className="flex items-center gap-1.5 rounded-md border-2 border-foreground bg-muted/50 px-2.5 py-1.5 text-xs font-bold hover:bg-muted transition-colors"
                              >
                                <Download className="h-3 w-3" />
                                {a.title}
                              </button>
                            </div>
                            <div className="flex gap-2 sm:flex-col">
                              <Button
                                size="sm"
                                className="neo-brutalism-button-sm text-xs h-8 flex-1 sm:flex-none"
                                onClick={() => {
                                  setSelectedAssignment(a.title);
                                  setShowUploadModal(true);
                                }}
                              >
                                <Upload className="mr-1 h-3 w-3" /> Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Submitted Tab */}
          <TabsContent value="submitted" className="space-y-4 pt-4">
            <div className="grid lg:grid-cols-3 grid-cols-2 w-full gap-4">
              {submittedAssignments
                .filter(
                  (assignment: any) =>
                    (filterSubject === "All" ||
                      submittedAssignmentMap.current.get(assignment.assignment)
                        .subject === filterSubject) &&
                    assignment.status == "submitted",
                )
                .map((a) => (
                  <Card key={a.assignment} className="neo-brutalism-card">
                    <CardContent className="p-4">
                      <div className="">
                        <div className="space-y-1">
                          <div className="flex flex-wrap justify-between items-center gap-2 flex-row">
                            <h3 className="font-black">
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  ?.title
                              }
                            </h3>
                            <span className="rounded-md bg-blue-100 text-blue-800 border border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500 px-2 py-0.5 text-xs font-bold">
                              Under Review
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-center flex-row mt-2 w-2/3">
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-bold text-foreground">
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  ?.subject
                              }
                            </span>
                            <span>{a.assignedBy}</span>
                            <span>
                              Submitted:{" "}
                              {new Date(a.submissionDate).toLocaleDateString()}
                            </span>
                            <span>
                              Marks:
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  ?.totalMarks
                              }
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            <span>
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  ?.title
                              }
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                            onClick={() => setViewModal(parseInt(a.assignment))}
                          >
                            View Submission
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Graded Tab */}
          <TabsContent value="graded" className="space-y-4 pt-4">
            {/* Filter Row */}
            <div className="grid lg:grid-cols-3 grid-cols-2 w-full gap-4">
              {submittedAssignments
                .filter(
                  (assignment: any) =>
                    (filterSubject === "All" ||
                      submittedAssignmentMap.current.get(assignment.assignment)
                        .subject === filterSubject) &&
                    assignment.status == "graded",
                )
                .map((a) => (
                  <Card key={a.assignment} className="neo-brutalism-card">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-black">
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  .title
                              }
                            </h3>
                            <span
                              className={`rounded-md px-2 py-0.5 text-xs font-bold border ${gradeColor(
                                (a.marksScored /
                                  submittedAssignmentMap.current.get(
                                    a.assignment,
                                  ).totalMarks) *
                                  100,
                              )}`}
                            >
                              {(a.marksScored /
                                submittedAssignmentMap.current.get(a.assignment)
                                  .totalMarks) *
                                100}
                              %
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-bold text-foreground">
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  .subject
                              }
                            </span>
                            <span>{a.assignedBy}</span>
                            <span>
                              Marks: {a.marksScored}/
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  .totalMarks
                              }
                            </span>
                          </div>
                          <div className="rounded-md border-2 border-foreground bg-muted/50 p-3">
                            <p className="text-xs font-bold mb-1">
                              Teacher Feedback:
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {a.feedback}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-center">
                            <p className="text-3xl font-black text-primary">
                              {a.marksScored}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              out of{" "}
                              {
                                submittedAssignmentMap.current.get(a.assignment)
                                  .totalMarks
                              }
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                            onClick={() => setViewModal(parseInt(a.assignment))}
                          >
                            <Eye className="h-3 w-3" /> View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="neo-brutalism-card w-full max-w-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b-2 border-foreground pb-3">
                <CardTitle className="font-black text-lg">
                  Upload Assignment
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowUploadModal(false)}
                  className="h-8 w-8 p-0"
                >
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
                    <option value="">{selectedAssignment}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Upload File</Label>
                  <label
                    htmlFor="file-upload"
                    className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-foreground bg-muted/50 hover:bg-muted/80 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="mt-1 text-xs font-bold">
                      Click or drag file here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOCX, Images (max 10MB)
                    </p>
                  </label>
                  <Input id="file-upload" type="file" className="hidden" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">
                    Comments (optional)
                  </Label>
                  <textarea
                    className="flex min-h-[70px] w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
                    placeholder="Any notes for your teacher..."
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 neo-brutalism-button text-sm">
                    Submit Assignment
                  </Button>
                  <Button
                    variant="outline"
                    className="neo-brutalism-button-outline text-sm bg-transparent"
                    onClick={() => setShowUploadModal(false)}
                  >
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
                  .filter((a) => parseInt(a.assignment) === viewModal)
                  .map((assignment) => (
                    <div key={assignment.assignment} className="space-y-4">
                      {/* Header */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-black">
                          {
                            submittedAssignmentMap.current.get(
                              assignment.assignment,
                            ).title
                          }
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          <div className="rounded-md border-2 border-foreground p-2">
                            <p className="text-xs text-muted-foreground">
                              Subject
                            </p>
                            <p className="text-sm font-bold">
                              {
                                submittedAssignmentMap.current.get(
                                  assignment.assignment,
                                ).subject
                              }
                            </p>
                          </div>
                          <div className="rounded-md border-2 border-foreground p-2">
                            <p className="text-xs text-muted-foreground">
                              Teacher
                            </p>
                            <p className="text-sm font-bold">
                              {assignment.assignedBy}
                            </p>
                          </div>
                          <div className="rounded-md border-2 border-foreground p-2">
                            <p className="text-xs text-muted-foreground">
                              Total Marks
                            </p>
                            <p className="text-sm font-bold">
                              {
                                submittedAssignmentMap.current.get(
                                  assignment.assignment,
                                ).totalMarks
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Grade Info (if graded) */}
                      {"percentage" in assignment && (
                        <div className="rounded-md border-2 border-foreground bg-green-500/10 p-3 space-y-2">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                              <p className="text-2xl font-black text-primary">
                                {assignment.marksScored}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Obtained
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-black text-green-600">
                                {/* {assignment.percentage}% */} XX%
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Percentage
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-black text-blue-600">
                                {/* {assignment.grade} */} X+
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Grade
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Feedback */}
                      {"feedback" in assignment && (
                        <div className="rounded-md border-2 border-foreground bg-muted/50 p-3">
                          <p className="text-xs font-bold mb-2">
                            Teacher Feedback:
                          </p>
                          <p className="text-sm">{assignment.feedback}</p>
                        </div>
                      )}

                      {/* Submitted Date or Due Date */}
                      <div className="rounded-md border-2 border-foreground p-3 bg-primary/10">
                        <p className="text-xs text-muted-foreground mb-1">
                          {"submittedDate" in assignment
                            ? "Submitted On"
                            : "Due Date"}
                        </p>
                        <p className="font-bold">
                          {("submittedDate" in assignment
                            ? new Date(assignment.submissionDate)
                            : new Date((assignment as any)?.dueDate)
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* File Section */}
                      {"fileName" in assignment && (
                        <div className="rounded-md border-2 border-foreground p-3">
                          <p className="text-xs font-bold mb-2">
                            Submitted File:
                          </p>
                          <div className="flex items-center gap-3 rounded-md border-2 border-foreground p-2 bg-muted/30">
                            <File className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="text-sm font-bold">
                                {
                                  submittedAssignmentMap.current.get(
                                    assignment.assignment,
                                  ).questionPaperLink
                                }
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                            >
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
  );
}
