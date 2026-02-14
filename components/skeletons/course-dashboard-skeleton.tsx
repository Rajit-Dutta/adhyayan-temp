import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CourseDashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="neo-brutalism-card">
          {/* <CardContent className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border-2 border-foreground">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardContent> */}
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-2 w-full mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}