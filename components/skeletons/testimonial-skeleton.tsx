import { Skeleton, SkeletonAvatar } from "@/components/ui/skeleton"

export function TestimonialSkeleton() {
  return (
    <div className="h-full flex flex-col items-center text-center p-4 border-2 border-foreground rounded-md bg-background/50">
      {/* Avatar skeleton */}
      <div className="mb-3">
        <SkeletonAvatar className="h-15 w-15" />
      </div>

      {/* Quote skeleton */}
      <div className="mb-3 space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Name and role skeleton */}
      <div className="mt-auto space-y-1">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-3 w-20 mx-auto" />
      </div>
    </div>
  )
}

export function TestimonialCarouselSkeleton({ visibleItems = 3 }: { visibleItems?: number }) {
  return (
    <div className="relative overflow-hidden neo-brutalism-card">
      <div className="p-4">
        <div className="flex">
          {Array.from({ length: visibleItems }).map((_, index) => (
            <div key={index} className="px-2" style={{ width: `${100 / visibleItems}%`, flexShrink: 0 }}>
              <TestimonialSkeleton />
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
