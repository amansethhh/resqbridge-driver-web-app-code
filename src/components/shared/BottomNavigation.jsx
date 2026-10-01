import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Bell, User } from "lucide-react";
import Driver3DIcon from "@/components/shared/Driver3DIcon";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))]">
      <div className="glass-nav rounded-[1.4rem] mx-auto max-w-md flex items-stretch justify-between px-1.5 py-1.5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/assignments" && pathname.startsWith("/assignment"));
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-1.5 rounded-[1rem] transition-all",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Driver3DIcon
                icon={Icon}
                size="sm"
                accent={active ? "primary" : "muted"}
                className={cn("transition-all", active && "ring-2 ring-primary/40 scale-105")}
              />
              <span className={cn("text-[10px] font-bold tracking-wide", active ? "text-primary" : "text-muted-foreground")}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}