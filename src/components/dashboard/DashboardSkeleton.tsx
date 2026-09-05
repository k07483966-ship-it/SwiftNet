'use client';

export default function DashboardSkeleton() {
  const shimmer = "animate-pulse bg-[var(--surface-2)] rounded-[14px]";
  const shimmerBlock = "animate-pulse bg-[var(--border)] rounded-[10px]";

  return (
    <div className="pt-[12px] flex flex-col lg:grid lg:grid-cols-12 gap-[12px] lg:gap-[16px]">
      {/* Hero Skeleton */}
      <div className="lg:col-span-12">
        <div className="h-[188px] w-full bg-white border border-[var(--border)] rounded-[16px] p-[16px] flex flex-col">
          <div className="flex justify-between">
            <div>
              <div className={`${shimmerBlock} h-[22px] w-[150px] mb-[8px]`} />
              <div className={`${shimmerBlock} h-[14px] w-[220px] mb-[12px]`} />
              <div className={`${shimmerBlock} h-[20px] w-[140px] rounded-full mb-[12px]`} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 min-[360px]:grid-cols-3 gap-[8px] mt-auto">
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
            <div className={`${shimmerBlock} h-[34px] w-full rounded-[9px]`} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-12">
        <div className={`${shimmer} h-[74px] w-full`} />
      </div>
      
      {/* Left Column Stack */}
      <div className="lg:col-span-7 flex flex-col gap-[16px]">
        <div className="h-[148px] w-full bg-white border border-[var(--border)] rounded-[14px] p-[12px]">
           <div className={`${shimmerBlock} h-[16px] w-[120px] mb-[16px]`} />
           <div className="grid grid-cols-4 gap-[8px]">
             <div className={`${shimmerBlock} h-[72px] w-full rounded-[10px]`} />
             <div className={`${shimmerBlock} h-[72px] w-full rounded-[10px]`} />
             <div className={`${shimmerBlock} h-[72px] w-full rounded-[10px]`} />
             <div className={`${shimmerBlock} h-[72px] w-full rounded-[10px]`} />
           </div>
        </div>
      </div>

      {/* Right Column Stack */}
      <div className="lg:col-span-5 flex flex-col gap-[16px]">
        <div className="h-[240px] w-full bg-white border border-[var(--border)] rounded-[14px] p-[14px]">
           <div className={`${shimmerBlock} h-[16px] w-[120px] mb-[24px]`} />
           <div className="flex flex-col gap-[12px]">
             <div className={`${shimmerBlock} h-[40px] w-full`} />
             <div className={`${shimmerBlock} h-[40px] w-full`} />
             <div className={`${shimmerBlock} h-[40px] w-full`} />
           </div>
        </div>
      </div>
    </div>
  );
}
