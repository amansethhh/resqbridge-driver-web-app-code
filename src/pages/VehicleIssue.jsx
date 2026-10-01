import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Wrench, Fuel, MapPinOff, Cog, CircleAlert, CheckCircle2 } from "lucide-react";
import ScreenLayout from "@/components/shared/ScreenLayout";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";
import { cn } from "@/lib/utils";

const categories = [
  { id: "vehicle", label: "Vehicle Problem", icon: Car, tone: "text-primary" },
  { id: "equipment", label: "Equipment Issue", icon: Wrench, tone: "text-warning" },
  { id: "fuel", label: "Fuel / Battery", icon: Fuel, tone: "text-driver" },
  { id: "gps", label: "GPS Issue", icon: MapPinOff, tone: "text-emergency" },
  { id: "mechanical", label: "Mechanical Issue", icon: Cog, tone: "text-primary" },
  { id: "other", label: "Other", icon: CircleAlert, tone: "text-muted-foreground" },
];

export default function VehicleIssue() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 800);
  };

  return (
    <ScreenLayout title="Report Issue" back showNav={false}>
      <GlassCard level="priority">
        <p className="text-[14px] font-semibold">Report an issue to dispatch. Operational status changes require backend authorization.</p>
      </GlassCard>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-2">Category</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={cn("glass-interactive rounded-xl p-3 flex flex-col items-center gap-2 text-center", selected === c.id && "ring-2 ring-primary")}>
              <span className={`icon-3d w-10 h-10 ${c.tone}`}><c.icon className="w-5 h-5" /></span>
              <span className="text-[12px] font-bold">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <GlassCard level="base">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">Description</p>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Describe the issue..." className="glass-input w-full min-h-24 p-3 text-[14px] font-medium resize-none" />
      </GlassCard>

      {done ? (
        <GlassCard level="priority" className="text-center">
          <span className="icon-3d w-16 h-16 mx-auto text-driver"><CheckCircle2 className="w-8 h-8" /></span>
          <p className="text-[15px] font-extrabold mt-3">Issue Reported</p>
          <p className="text-[13px] text-muted-foreground mt-1">Dispatch has been notified.</p>
          <div className="mt-4"><GhostGlassButton onClick={() => navigate("/home")}>Return to Home</GhostGlassButton></div>
        </GlassCard>
      ) : (
        <Primary3DButton onClick={submit} loading={loading} disabled={!selected}>Submit Report</Primary3DButton>
      )}
    </ScreenLayout>
  );
}