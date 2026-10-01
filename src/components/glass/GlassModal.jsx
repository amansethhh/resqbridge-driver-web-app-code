import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GlassModal({ open, onClose, title, children, footer, tone = "priority" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const toneClass = tone === "emergency" ? "glass-emergency" : "glass-priority";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative w-full max-w-md rounded-[1.5rem] p-5 scale-in", toneClass)}>
        <div className="flex items-start justify-between gap-3 mb-3">
          {title && <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>}
          <button onClick={onClose} className="icon-3d w-9 h-9 shrink-0" aria-label="Close">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
        <div className="text-[15px] leading-relaxed">{children}</div>
        {footer && <div className="mt-5 flex flex-col gap-2.5">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}