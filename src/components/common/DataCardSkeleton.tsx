'use client';

export default function DataCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-[#0b0f19] border border-slate-800/80 p-3.5 sm:p-4 flex flex-col justify-between h-full relative overflow-hidden space-y-3 shadow-md"
        >
          {/* Top Network Logo & Badge Skeleton */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-800/90" />
              <div className="w-12 h-3 rounded bg-slate-800/90" />
            </div>
            <div className="w-16 h-4 rounded-full bg-slate-800/90" />
          </div>

          {/* Data Capacity & Validity Skeleton */}
          <div className="space-y-2 my-1">
            <div className="w-24 h-6 rounded bg-slate-800/90" />
            <div className="w-32 h-3 rounded bg-slate-800/70" />
          </div>

          {/* Price & Action Button Skeleton */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-10 h-3 rounded bg-slate-800/70" />
              <div className="w-16 h-4 rounded bg-slate-800/90" />
            </div>
            <div className="w-full h-9.5 rounded-xl bg-slate-800/90" />
          </div>
        </div>
      ))}
    </div>
  );
}
