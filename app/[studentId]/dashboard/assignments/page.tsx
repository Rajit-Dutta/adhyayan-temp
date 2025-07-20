import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload } from "lucide-react"

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Assignments</h2>
        <p className="text-muted-foreground">Manage your assignments, submissions, and grades</p>
      </div>

      <Tabs defaultValue="pending" className="neo-brutalism-tabs">
        <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
          <TabsTrigger value="pending" className="font-bold">
            Pending
          </TabsTrigger>
          <TabsTrigger value="submitted" className="font-bold">
            Submitted
          </TabsTrigger>
          <TabsTrigger value="graded" className="font-bold">
            Graded
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="neo-brutalism-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-bold">Mathematics Assignment #{i}</CardTitle>
                    <div className="rounded-md bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800 border-2 border-yellow-800">
                      Due in {i + 1} days
                    </div>
                  </div>
                  <CardDescription>Algebra and Functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p>Complete problems 1-20 in Chapter {i + 3}. Show all your work and explain your reasoning.</p>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <FileText className="mr-1 h-3 w-3" />
                      <span>PDF Document</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full neo-brutalism-button">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Submission
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((i) => (
              <Card key={i} className="neo-brutalism-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-bold">Science Project #{i}</CardTitle>
                    <div className="rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800 border-2 border-blue-800">
                      Submitted
                    </div>
                  </div>
                  <CardDescription>Biology Research</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p>Research paper on cellular structures and functions. Include diagrams and references.</p>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <FileText className="mr-1 h-3 w-3" />
                      <span>Submitted on {new Date(2023, 5, 15 + i).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full neo-brutalism-button-outline">
                    View Submission
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4 pt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => {
              const score = 85 + i
              return (
                <Card key={i} className="neo-brutalism-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-bold">History Essay #{i}</CardTitle>
                      <div
                        className={`rounded-md px-2 py-1 text-xs font-bold border-2 ${
                          score >= 90
                            ? "bg-green-100 text-green-800 border-green-800"
                            : score >= 80
                              ? "bg-blue-100 text-blue-800 border-blue-800"
                              : "bg-yellow-100 text-yellow-800 border-yellow-800"
                        }`}
                      >
                        {score}%
                      </div>
                    </div>
                    <CardDescription>World War II Analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>Analysis of key events and their impact on global politics and economics.</p>
                      <div className="mt-4 rounded-md bg-muted p-3 border-2 border-foreground">
                        <div className="text-xs font-bold">Teacher's Feedback</div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Excellent analysis of historical events. Your arguments are well-structured and supported by
                          evidence. Consider exploring the economic impacts in more depth.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full neo-brutalism-button-outline">
                      View Submission
                    </Button>
                    <Button variant="outline" className="w-full neo-brutalism-button-outline">
                      View Feedback
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="neo-brutalism-card">
        <CardHeader>
          <CardTitle className="font-black">Upload New Assignment</CardTitle>
          <CardDescription>Submit your completed work for grading</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignment" className="font-bold">
                Select Assignment
              </Label>
              <select
                id="assignment"
                className="flex h-10 w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select an assignment...</option>
                <option value="math1">Mathematics Assignment #1</option>
                <option value="math2">Mathematics Assignment #2</option>
                <option value="math3">Mathematics Assignment #3</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file" className="font-bold">
                Upload File
              </Label>
              <div className="grid w-full gap-1.5">
                <Label
                  htmlFor="file"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-foreground bg-muted/50 px-4 py-5 text-center hover:bg-muted/80 transition-colors"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="mt-2 text-sm font-bold">Drag and drop your file here or click to browse</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Supports PDF, DOCX, and image files up to 10MB
                  </div>
                </Label>
                <Input id="file" type="file" className="hidden" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments" className="font-bold">
                Additional Comments
              </Label>
              <textarea
                id="comments"
                className="flex min-h-[100px] w-full rounded-md border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add any comments or notes for your teacher..."
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto neo-brutalism-button">Submit Assignment</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
