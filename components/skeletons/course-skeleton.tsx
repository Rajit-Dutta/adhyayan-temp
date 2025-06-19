import { Skeleton, SkeletonButton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CourseSkeleton() {
  return (
    <Card className="h-full neo-brutalism-card bg-background">
      <div className="relative overflow-hidden">
        {/* Image skeleton */}
        <Skeleton className="aspect-video w-full" />

        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>

        {/* Level badge skeleton */}
        <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Rating skeleton */}
        <div className="absolute bottom-3 right-3">
          <Skeleton className="h-8 w-12 rounded-md" />
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Instructor skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Stats and price skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
          <Skeleton className="h-5 w-12" />
        </div>

        {/* Buttons skeleton */}
        <div className="pt-2 space-y-2">
          <SkeletonButton className="w-full h-8" />
          <SkeletonButton className="w-full h-8" />
        </div>
      </CardContent>
    </Card>
  )
}

export function CourseCarouselSkeleton({ visibleItems = 3 }: { visibleItems?: number }) {
  return (
    <div className="relative overflow-hidden neo-brutalism-card bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="p-4 md:p-6">
        <div className="flex">
          {Array.from({ length: visibleItems }).map((_, index) => (
            <div key={index} className="px-2 md:px-3" style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}>
              <CourseSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons skeleton */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>

      {/* Pagination dots skeleton */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-1.5 w-6 rounded-full" />
        ))}
      </div>
    </div>
  )
}
