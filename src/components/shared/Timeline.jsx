import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Timeline({ events, className }) {
  return (
    <ol className={cn("relative pl-6", className)}>
      <span className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />
      {events.map((e, i) => (
        <li key={i} className="relative pb-4 last:pb-0">
          <span
            className={cn(
              "absolute -left-[18px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-background",
              e.done ? "bg-driver" : "bg-muted-foreground/40"
            )}
          >
            {e.done && <Check className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />}
          </span>
          <div className="flex items-center justify-between gap-3">
            <p className={cn("text-[14px] font-semibold", e.done ? "text-foreground" : "text-muted-foreground")}>{e.label}</p>
            <span className="text-[12px] font-semibold text-muted-foreground tabular-nums">{e.time}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}