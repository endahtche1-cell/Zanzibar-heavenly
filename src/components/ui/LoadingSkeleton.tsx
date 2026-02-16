export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-sand">
      <div className="aspect-[3/4] bg-border/40" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded-full bg-border/40" />
        <div className="h-5 w-2/3 rounded-full bg-border/40" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-border/30" />
          <div className="h-5 w-20 rounded-full bg-border/30" />
        </div>
        <div className="flex items-center justify-between border-t border-border/30 pt-4">
          <div className="h-6 w-16 rounded-full bg-border/40" />
          <div className="h-8 w-24 rounded-full bg-border/30" />
        </div>
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[21/9] rounded-2xl bg-border/40" />
      <div className="mt-8 space-y-4">
        <div className="h-8 w-2/3 rounded-full bg-border/40" />
        <div className="h-4 w-1/2 rounded-full bg-border/40" />
        <div className="h-4 w-full rounded-full bg-border/30" />
        <div className="h-4 w-full rounded-full bg-border/30" />
        <div className="h-4 w-3/4 rounded-full bg-border/30" />
      </div>
    </div>
  )
}
