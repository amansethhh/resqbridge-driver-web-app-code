import React from "react";
import { cn } from "@/lib/utils";

export default function GlassInput({ className, icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon className="w-5 h-5" />
        </span>
      )}
      <input
        className={cn(
          "glass-input w-full h-12 px-4 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/70",
          Icon && "pl-11",
          className
        )}
        {...props}
      />
    </div>
  );
}