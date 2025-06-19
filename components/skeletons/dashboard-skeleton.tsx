import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="neo-brutalism-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
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

export function DashboardChartSkeleton() {
  return (
    <Card className="neo-brutalism-card">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[300px] flex items-end justify-between space-x-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="w-full" style={{ height: `${Math.random() * 200 + 50}px` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardFeedbackSkeleton() {
  return (
    <Card className="neo-brutalism-card">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start gap-4 rounded-md border-2 border-foreground p-3">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AssignmentCardSkeleton() {
  return (
    <Card className="neo-brutalism-card">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-3 w-3 rounded-full mr-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardContent>
      <div className="p-4 pt-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </Card>
  )
}

export function ProgressCardSkeleton() {
  return (
    <Card className="neo-brutalism-card">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-2 w-full rounded-full col-span-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md bg-muted p-3 border-2 border-foreground">
          <Skeleton className="h-4 w-24 mb-1" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
