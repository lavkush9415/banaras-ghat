export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card animate-pulse">
      <div className="h-52 shimmer-bg" />
      <div className="p-5 space-y-3">
        <div className="h-4 shimmer-bg rounded-full w-3/4" />
        <div className="h-3 shimmer-bg rounded-full w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 shimmer-bg rounded-full w-20" />
          <div className="h-6 shimmer-bg rounded-full w-16" />
        </div>
        <div className="h-10 shimmer-bg rounded-2xl mt-4" />
      </div>
    </div>
  )
}
