import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, IdCard, Camera, Upload } from "lucide-react";
import Logo from "@/components/shared/Logo";
import GlassCard from "@/components/glass/GlassCard";
import GlassInput from "@/components/glass/GlassInput";
import Primary3DButton from "@/components/buttons/Primary3DButton";
import GhostGlassButton from "@/components/buttons/GhostGlassButton";

function Field({ label, required, optional, children }) {
  return (
    <div>
      <label className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground ml-1 mb-1.5 flex items-center gap-1.5">
        {label}
        {required && <span className="text-emergency">*</span>}
        {optional && <span className="text-muted-foreground/70 font-medium normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", driverId: "", license: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/verification"); }, 900);
  };

  return (
    <div className="min-h-full flex flex-col px-6 py-10 safe-top safe-bottom">
      <div className="flex flex-col items-center text-center mb-6 fade-in">
        <Logo size={52} />
        <h1 className="text-2xl font-extrabold tracking-tight mt-4">Profile Setup</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Complete your driver profile to continue.</p>
      </div>

      <form onSubmit={save} className="mx-auto max-w-md w-full flex flex-col gap-3.5 fade-in">
        <div className="flex justify-center mb-1">
          <button type="button" className="icon-3d w-24 h-24 flex-col gap-1 text-muted-foreground">
            <Camera className="w-7 h-7" />
            <span className="text-[10px] font-bold uppercase tracking-wide">Photo</span>
          </button>
        </div>

        <GlassCard level="base" className="flex flex-col gap-3.5">
          <Field label="Full Name" required>
            <GlassInput icon={User} placeholder="Aarav Mehta" value={form.name} onChange={set("name")} />
          </Field>
          <Field label="Phone" required>
            <GlassInput icon={Phone} placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
          </Field>
          <Field label="Email" required>
            <GlassInput type="email" icon={Mail} placeholder="driver@resqbridge.io" value={form.email} onChange={set("email")} />
          </Field>
          <Field label="Driver ID" required>
            <GlassInput icon={IdCard} placeholder="RQD-0000" value={form.driverId} onChange={set("driverId")} />
          </Field>
          <Field label="License Number" required>
            <GlassInput icon={IdCard} placeholder="DL-0000000000" value={form.license} onChange={set("license")} />
          </Field>
        </GlassCard>

        <GlassCard level="base">
          <p className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground mb-2">Credentials</p>
          <button type="button" className="glass-interactive rounded-xl w-full p-4 flex items-center gap-3 text-left">
            <span className="icon-3d w-10 h-10 text-primary"><Upload className="w-5 h-5" /></span>
            <div>
              <p className="text-[14px] font-bold">Upload license document</p>
              <p className="text-[12px] text-muted-foreground">PDF or image · required</p>
            </div>
          </button>
        </GlassCard>

        <Primary3DButton type="submit" loading={loading}>Save & Continue</Primary3DButton>
        <GhostGlassButton type="button" onClick={() => navigate("/verification")}>Skip</GhostGlassButton>
      </form>
    </div>
  );
}