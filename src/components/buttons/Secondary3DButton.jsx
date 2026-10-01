import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Secondary3DButton({ children, className, loading, icon: Icon, size = "md", ...props }) {
  const sizes = { sm: "h-10 px-4 text-sm", md: "h-12 px-5 text-[15px]", lg: "h-14 px-6 text-base" };
  return (
    <button className={cn("btn-3d btn-secondary-3d inline-flex items-center justify-center gap-2 w-full", sizes[size], className)} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="w-5 h-5 spin-slow" /> : Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
}