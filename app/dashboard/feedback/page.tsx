import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp } from "lucide-react"

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Teacher Feedback</h2>
        <p className="text-muted-foreground">Review comments and suggestions from your teachers</p>
      </div>

      <Tabs defaultValue="recent" className="neo-brutalism-tabs">
        <TabsList className="w-full sm:w-auto neo-brutalism-tabslist">
          <TabsTrigger value="recent" className="font-bold">
            Recent Feedback
          </TabsTrigger>
          <TabsTrigger value="subjects" className="font-bold">
            By Subject
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 pt-4">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="neo-brutalism-card">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={`/placeholder.svg?height=48&width=48&text=T${i}`}
                        width={48}
                        height={48}
                        alt={`Teacher ${i}`}
                        className="rounded-md border-2 border-foreground"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-bold">
                            {i % 3 === 0 ? "Mathematics" : i % 3 === 1 ? "Science" : "English"} Assignment #
                            {Math.ceil(i / 2)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            From: Dr. {["Smith", "Johnson", "Williams", "Brown", "Jones"][i - 1]}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(2023, 5, 20 - i).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="rounded-md bg-muted p-4 border-2 border-foreground">
                        <p className="text-sm">
                          {i % 3 === 0
                            ? "Your problem-solving approach shows good understanding of the concepts. I particularly liked how you explained your reasoning in questions 3 and 5. For future assignments, try to be more detailed in showing your work for complex problems."
                            : i % 3 === 1
                              ? "Excellent lab report! Your methodology was clear and your analysis of the results was thorough. Consider adding more visual representations of your data in future reports to enhance clarity."
                              : "Your essay demonstrates strong critical thinking and analysis. Your arguments are well-structured and supported by evidence. Work on varying your sentence structure to improve flow and readability."}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1 neo-brutalism-button-sm">
                            <MessageSquare className="h-4 w-4" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 neo-brutalism-button-sm">
                            <ThumbsUp className="h-4 w-4" />
                            Thank
                          </Button>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary border-2 border-primary">
                          <span>Grade: {75 + i * 3}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {["Mathematics", "Science", "English", "History"].map((subject) => (
              <Card key={subject} className="neo-brutalism-card">
                <CardHeader>
                  <CardTitle className="font-black">{subject}</CardTitle>
                  <CardDescription>Feedback from your {subject} teacher</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-md border-2 border-foreground p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/placeholder.svg?height=32&width=32&text=T${i}`}
                          width={32}
                          height={32}
                          alt={`Teacher ${i}`}
                          className="rounded-md border-2 border-foreground"
                        />
                        <div>
                          <h4 className="text-sm font-bold">Dr. {["Smith", "Johnson"][i - 1]}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(2023, 5, 15 - i * 5).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">
                        {subject === "Mathematics"
                          ? "Your problem-solving skills have improved significantly. Continue practicing complex problems and showing your work clearly."
                          : subject === "Science"
                            ? "Great job on your lab reports. Your methodology is clear and your analysis is thorough."
                            : subject === "English"
                              ? "Your writing demonstrates strong critical thinking. Work on varying your sentence structure."
                              : "Excellent understanding of historical events. Try to connect themes across different time periods."}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                        <div className="text-xs text-muted-foreground">
                          Assignment: {subject} {i === 1 ? "Project" : "Homework"} #{i}
                        </div>
                        <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary border-2 border-primary">
                          Grade: {80 + i * 5}%
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full neo-brutalism-button-outline">
                    View All Feedback
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
