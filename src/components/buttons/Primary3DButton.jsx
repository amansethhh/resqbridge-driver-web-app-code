import React from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "btn-primary-3d",
  secondary: "btn-secondary-3d",
  success: "btn-success-3d",
  danger: "btn-danger-3d",
  ghost: "btn-ghost-glass",
};

export default function Primary3DButton({
  children, className, variant = "primary", loading, success, icon: Icon, size = "lg", ...props
}) {
  const sizes = { sm: "h-10 px-4 text-sm", md: "h-12 px-5 text-[15px]", lg: "h-14 px-6 text-base" };
  return (
    <button
      className={cn("btn-3d inline-flex items-center justify-center gap-2 w-full", sizes[size], variants[variant], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 spin-slow" /> : success ? <Check className="w-5 h-5" /> : Icon && <Icon className="w-5 h-5" />}
      <span>{success ? "Done" : children}</span>
    </button>
  );
}