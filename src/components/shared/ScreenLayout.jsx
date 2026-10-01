import React from "react";
import { cn } from "@/lib/utils";
import DriverHeader from "@/components/shared/DriverHeader";
import BottomNavigation from "@/components/shared/BottomNavigation";

// Phone-first screen shell. When a sticky action and the bottom nav coexist,
// the action is lifted clear above the nav so nothing overlaps or bleeds.
export default function ScreenLayout({ children, title, back, showNav = true, stickyAction, headerExtra, contentClassName }) {
  return (
    <div className="min-h-full flex flex-col">
      <DriverHeader title={title} back={back} />
      {headerExtra}
      <main className={cn("flex-1 px-4 pt-4", showNav ? (stickyAction ? "pb-44" : "pb-32") : "pb-8", contentClassName)}>
        <div className="mx-auto max-w-md w-full flex flex-col gap-3.5 fade-in">{children}</div>
      </main>
      {stickyAction && (
        <div className={cn(
          "fixed inset-x-0 z-20 px-4 pointer-events-none",
          showNav ? "bottom-[5rem]" : "bottom-0 pb-[max(1rem,env(safe-area-inset-bottom))]"
        )}>
          <div className="mx-auto max-w-md pointer-events-auto">{stickyAction}</div>
        </div>
      )}
      {showNav && <BottomNavigation />}
    </div>
  );
}