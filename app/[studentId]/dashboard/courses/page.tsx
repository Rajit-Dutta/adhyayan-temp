"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { getCachedSubjectImage } from "@/lib/unsplash";

type ExpandedCourse = any;

type BatchDetails = {
  _id: string;
  pic: string;
  name: string;
  subject: string;
  standard: string;
  students: string[];
  teacher: any;
  status: string;
  syllabus: {
    _id: string;
    chapterName: string;
    topicCovered: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCourse, setExpandedCourse] = useState<ExpandedCourse>(null);
  const [previewCourse, setPreviewCourse] = useState<string | null>(null);
  const [studentBatchDetails, setStudentBatchDetails] = useState<
    BatchDetails[]
  >([]);
  const [allBatchDetails, setAllBatchDetails] = useState<BatchDetails[]>([]);
  const [syllabusModal, setSyllabusModal] = useState<string | null>(null);

  const teacherMap = useRef(new Map());
  const assignmentMap = useRef(new Map());
  const [student] = useAtom(loadableStudentCookieData);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getBatchDetails();
  }, []);

  const categories = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
  ];

  const getBatchDetails = async () => {
    try {
      if (student.state === "hasData") {
        const studentRes = await axios.get(
          `${process.env.NEXT_PUBLIC_DOMAIN}/courses/getStudentDetails`,
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

        const batchIds = studentRes.data.batch;
        const batchRequests = batchIds.map((id: string) =>
          axios.get(
            `${process.env.NEXT_PUBLIC_DOMAIN}/courses/getCoursesWRTStudent`,
            { params: { id } },
          ),
        );

        const batchResponses = await Promise.all(batchRequests);
        const studentBatches = await Promise.all(
          batchResponses.flatMap((res) =>
            res.data.map(async (batch: any) => ({
              ...batch,
              teacher: teacherMap.current.get(batch.teacher),
              pic: await getCachedSubjectImage(batch.subject), // ✅ awaited
            })),
          ),
        );

        const assignmentRequests = studentBatches.map((studentBatch: any) =>
          axios.get(
            `${process.env.NEXT_PUBLIC_DOMAIN}/courses/getQuestionPaperForACourse`,
            {
              params: { id: studentBatch._id },
            },
          ),
        );
        const assignmentResponses = await Promise.all(assignmentRequests);
        assignmentResponses.forEach((res, index) => {
          const batchId = studentBatches[index]._id.toString();
          assignmentMap.current.set(batchId, res.data);
        });

        setStudentBatchDetails(studentBatches);

        const allBatchRequests = batchIds.map(() =>
          axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/courses/getAllCourses`, {
            params: {
              standard: studentRes.data.standard,
            },
          }),
        );
        const alllBatchResponses = await Promise.all(allBatchRequests);
        const allBatches = await Promise.all(
          alllBatchResponses.flatMap((res) =>
            res.data.map(async (batch: any) => ({
              ...batch,
              teacher: teacherMap.current.get(batch.teacher),
              pic: await getCachedSubjectImage(batch.subject), // ✅ awaited
            })),
          ),
        );

        const filteredAllBatches = allBatches.filter(
          (batch) =>
            !studentBatches.some(
              (existing) =>
                existing._id == batch._id &&
                existing.standard == batch.standard,
            ),
        );
        setAllBatchDetails(filteredAllBatches);
      }
    } catch (error) {
      console.error("Error during batch data fetch:", error);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight">My Courses</h2>
          <p className="text-sm text-muted-foreground">
            {studentBatchDetails.length} enrolled courses,{" "}
            {allBatchDetails.length} available to join
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
      <LoadingWrapper
        isLoading={isLoading}
        skeleton={<DashboardStatsSkeleton />}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Card className="neo-brutalism-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                  <p className="text-lg font-black">
                    {studentBatchDetails.length}
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
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-lg font-black">XX</p>
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
                  <p className="text-lg font-black">XX</p>
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
                  <p className="text-lg font-black">XX%</p>
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
            {Array.from({ length: 2 }).map((_, i) => (
              <AssignmentCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Tabs defaultValue="enrolled" className="neo-brutalism-tabs">
          <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
            <TabsTrigger value="enrolled" className="font-bold">
              Enrolled ({studentBatchDetails.length})
            </TabsTrigger>
            <TabsTrigger value="available" className="font-bold">
              Browse Course{allBatchDetails.length > 1 ? "s" : ""} (
              {allBatchDetails.length})
            </TabsTrigger>
          </TabsList>

          {/* Enrolled Courses */}
          <TabsContent
            value="enrolled"
            className="grid gap-4 sm:grid-cols-2 mt-4"
          >
            {studentBatchDetails.map((course) => (
              <Card
                key={course._id}
                className="neo-brutalism-card overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Course Header */}
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                      <Image
                        src={course.pic || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r" />
                      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground border border-primary-foreground/20">
                          {course.subject}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-black">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Teacher: {course.teacher}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />{" "}
                              {/* {course.rating}  */}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />{" "}
                              {course.students.length}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="h-3 w-3" />
                              {course.syllabus.length} lesson
                              {course.syllabus.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-primary">
                            {(course.syllabus.filter(
                              (c: any) => c.topicCovered === true,
                            ).length /
                              course.syllabus.length) *
                              100}
                            %
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {
                              course.syllabus.filter(
                                (c: any) => c.topicCovered === true,
                              ).length
                            }
                            /{course.syllabus.length} done
                          </p>
                        </div>
                      </div>
                      <Progress
                        value={
                          (course.syllabus.filter(
                            (c: any) => c.topicCovered === true,
                          ).length /
                            course.syllabus.length) *
                          100
                        }
                        className="mt-3 neo-brutalism-progress"
                      />
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                          className="w-1/2 neo-brutalism-button-sm text-xs h-10 gap-2"
                          onClick={() => setSyllabusModal(course._id)}
                        >
                          <FileText className="h-4 w-4" />
                          View Syllabus PDF
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                            onClick={() =>
                              setExpandedCourse(
                                expandedCourse === course._id
                                  ? null
                                  : course._id,
                              )
                            }
                          >
                            <ChevronDown
                              className={`h-3 w-3 transition-transform ${expandedCourse === course._id ? "rotate-180" : ""}`}
                            />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedCourse === course._id && (
                    <div className="border-t-2 border-foreground bg-muted/30 p-4">
                      <div className="grid gap-4 md:grid-cols-1">
                        {/* Question Papers */}
                        <div>
                          <h4 className="mb-3 text-sm font-black">
                            Question Papers
                          </h4>
                          <div className="space-y-2">
                            {assignmentMap.current
                              .get(course._id.toString())
                              .map((assignment: any, idx: any) => (
                                <div
                                  key={idx}
                                  onClick={() =>
                                    window.open(assignment.link, "_blank")
                                  }
                                  className="cursor-pointer flex items-center justify-between rounded-md border-2 border-foreground p-2.5 bg-blue-500/10"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <div>
                                      <p className="text-xs font-bold">
                                        {assignment.name}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0"
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            {assignmentMap.current.get(course._id).length ===
                              0 && (
                              <p className="text-xs text-muted-foreground">
                                No question papers available yet
                              </p>
                            )}
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
          <TabsContent value="available" className="space-y-4">
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
            <div className="grid gap-4 sm:grid-cols-3">
              {allBatchDetails
                .filter(
                  (batch: any) =>
                    selectedCategory === "All" ||
                    batch.subject === selectedCategory,
                )
                .map((course) => (
                  <Card
                    key={course._id}
                    className="neo-brutalism-card overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={course.pic || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                          {course.subject}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-black">{course.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {course.teacher}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />{" "}
                          {/* {course.rating} */}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> {course.students.length}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {/* {course.duration} */}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1 neo-brutalism-button-sm text-xs h-8"
                        >
                          Enroll Now
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="neo-brutalism-button-outline-sm text-xs h-8 bg-transparent"
                          onClick={() => setPreviewCourse(course._id)}
                        >
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </LoadingWrapper>

      {/* Course Preview Modal */}
      {previewCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-foreground p-4">
              <h2 className="text-lg font-black">Course Preview</h2>
              <button
                onClick={() => setPreviewCourse(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CardContent className="p-4 space-y-4">
              {allBatchDetails
                .filter((c) => c._id === previewCourse)
                .map((course) => (
                  <div key={course._id} className="space-y-4">
                    {/* Course Image */}
                    <div className="relative h-48 overflow-hidden rounded-md border-2 border-foreground">
                      <Image
                        src={course.pic || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-black">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Instructor: {course.teacher}
                      </p>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">
                            Rating
                          </p>
                          <p className="text-sm font-bold flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {/* {course.rating} */} XX
                          </p>
                        </div>
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">
                            Students
                          </p>
                          <p className="text-sm font-bold">
                            {course.students.length}
                          </p>
                        </div>
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">
                            Lessons
                          </p>
                          <p className="text-sm font-bold">
                            {course.syllabus?.length}
                          </p>
                        </div>
                        <div className="rounded-md border-2 border-foreground p-2">
                          <p className="text-xs text-muted-foreground">
                            Duration
                          </p>
                          <p className="text-sm font-bold">12 months</p>
                        </div>
                      </div>

                      <div className="rounded-md border-2 border-foreground bg-primary/10 p-3">
                        <p className="text-xs font-bold text-muted-foreground mb-1">
                          Course Description
                        </p>
                        <p className="text-sm">
                          This comprehensive course covers all essential topics
                          in {course.subject.toLowerCase()}. Learn from industry
                          experts with interactive lessons, assignments, and
                          practical projects.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button className="flex-1 neo-brutalism-button-sm">
                          Enroll Now
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 neo-brutalism-button-outline-sm"
                          onClick={() => setPreviewCourse(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Syllabus Modal */}
      {syllabusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="neo-brutalism-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-foreground p-4 sticky top-0 bg-background">
              <h2 className="text-lg font-black">Course Syllabus</h2>
              <button
                onClick={() => setSyllabusModal(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <CardContent className="p-4 space-y-4">
              {studentBatchDetails
                .filter((c) => c._id === syllabusModal && c.syllabus)
                .map((course) => {
                  const covered = course.syllabus.filter(
                    (c: any) => c.topicCovered === true,
                  ).length;
                  const total = course.syllabus.length;
                  const percentage = Math.round((covered / total) * 100);

                  return (
                    <div key={course._id} className="space-y-4">
                      {/* Course Title */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-black">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {course.teacher}
                        </p>
                      </div>

                      {/* Overview Cards */}
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <div className="rounded-md border-2 border-foreground p-2 bg-green-500/10">
                          <p className="text-xs text-muted-foreground">
                            Topics Covered
                          </p>
                          <p className="text-lg font-black text-green-600">
                            {covered}
                          </p>
                        </div>

                        <div className="rounded-md border-2 border-foreground p-2 bg-blue-500/10">
                          <p className="text-xs text-muted-foreground">
                            Remaining
                          </p>
                          <p className="text-lg font-black text-blue-600">
                            {total - covered}
                          </p>
                        </div>

                        <div className="rounded-md border-2 border-foreground p-2 bg-primary/10">
                          <p className="text-xs text-muted-foreground">
                            Total Topics
                          </p>
                          <p className="text-lg font-black text-primary">
                            {total}
                          </p>
                        </div>
                      </div>

                      {/* Topics List */}
                      <div className="space-y-2">
                        <h4 className="font-black text-sm">Course Topics</h4>

                        {course.syllabus.map((topic, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 rounded-md border-2 border-foreground p-3 transition-colors ${
                              course.syllabus.filter(
                                (c: any) => c.topicCovered === true,
                              ).length
                                ? "bg-green-500/5"
                                : "bg-muted/30"
                            }`}
                          >
                            {/* Checkbox */}
                            <div
                              className={`h-5 w-5 flex items-center justify-center border-2 border-foreground rounded ${
                                course.syllabus.filter(
                                  (c: any) => c.topicCovered === true,
                                )
                                  ? "bg-green-600"
                                  : ""
                              }`}
                            >
                              {course.syllabus.filter(
                                (c: any) => c.topicCovered === true,
                              ) && (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                              )}
                            </div>

                            {/* Topic Name */}
                            <span
                              className={`text-sm font-medium flex-1 ${
                                course.syllabus.filter(
                                  (c: any) => c.topicCovered === true,
                                )
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {topic.chapterName}
                            </span>

                            {/* Status Badge */}
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded border border-foreground ${
                                course.syllabus.filter(
                                  (c: any) => c.topicCovered === true,
                                )
                                  ? "bg-green-600 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {course.syllabus.filter(
                                (c: any) => c.topicCovered === true,
                              )
                                ? "Covered"
                                : "Pending"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Section */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-bold">Syllabus Progress</p>
                          <p className="text-xs font-bold">{percentage}%</p>
                        </div>

                        <Progress
                          value={percentage}
                          className="h-3 bg-muted border-2 border-foreground rounded"
                        />
                      </div>

                      {/* Close Button */}
                      <Button
                        variant="outline"
                        className="w-full neo-brutalism-button-outline mt-4"
                        onClick={() => setSyllabusModal(null)}
                      >
                        Close
                      </Button>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
