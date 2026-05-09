"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";

// ─── Logic Constants (Unchanged) ─────────────────────────────────────────────
const SpecializationEnum = [
  "TECHNICAL_SUPPORT", "NETWORK", "SECURITY", "SOFTWARE", 
  "DATA", "AI", "AUTOMATION", "OTHER"
] as const;

const AvailabilityEnum = [
  "AVAILABLE", "ONLINE", "BUSY", "OFFLINE", "NOT_SELECTED"
] as const;

const AgentLevelEnum = ["JUNIOR", "MID", "SENIOR", "UNASSIGNED"] as const;

const createAgentSchema = z.object({
  firstName: z.string().min(2, "Too short"),
  lastName: z.string().min(2, "Too short"),
  username: z.string().min(3, "Min 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Min 5 characters"),
  phoneNumber: z.string().min(10, "Invalid number"),
  profilePicture: z.instanceof(File).optional(),
  specialization: z.enum(SpecializationEnum, { required_error: "Required" }),
  averageResolutionTime: z.coerce.number().min(0),
  performanceRating: z.coerce.number().min(1).max(5),
  level: z.enum(AgentLevelEnum, { required_error: "Required" }),
  availabilityStatus: z.enum(AvailabilityEnum, { required_error: "Required" }),
});

type CreateAgentInputs = z.infer<typeof createAgentSchema>;

interface Props {
  onSubmit: (data: CreateAgentInputs) => void;
  isLoading: boolean;
}

// ─── Style Tokens ─────────────────────────────────────────────────────────────
const BRAND      = "#6366f1"; 
const BRAND_T    = "rgba(99, 102, 241, 0.08)";
const BORDER     = "#e2e8f0";
const TEXT       = "#1e293b";
const TEXT_SUB   = "#475569";
const TEXT_MUTED = "#94a3b8";
const WHITE      = "#ffffff";
const DANGER     = "#ef4444";
const DANGER_T   = "rgba(239, 68, 68, 0.08)";

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: TEXT_MUTED,
  marginBottom: "6px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "13px",
  color: TEXT,
  background: WHITE,
  border: `1px solid ${BORDER}`,
  borderRadius: "6px",
  padding: "8px 12px",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "14px",
  cursor: "pointer",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateAgentForm({ onSubmit, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateAgentInputs>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      specialization: undefined,
      level: undefined,
      availabilityStatus: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file, { shouldValidate: true, shouldDirty: true });
    }
  };

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  const getFieldStyle = (name: string) => ({
    ...inputStyle,
    borderColor: focusedField === name ? BRAND : BORDER,
    boxShadow: focusedField === name ? `0 0 0 3px ${BRAND_T}` : "none",
    transition: "all 0.2s",
  });

  const getSelectStyle = (name: string) => ({
    ...selectStyle,
    borderColor: focusedField === name ? BRAND : BORDER,
    boxShadow: focusedField === name ? `0 0 0 3px ${BRAND_T}` : "none",
    transition: "all 0.2s",
  });

  return (
    <div style={{ width: "100%", height: "100%", padding: "24px", display: "flex", flexDirection: "column", overflow: "auto", boxSizing: "border-box", background: "transparent" }}>
      
      {/* Header */}
      <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: BRAND, margin: "0 0 4px" }}>
          Staff Management
        </p>
        <h1 style={{ fontSize: "18px", fontWeight: 700, color: TEXT, margin: "0 0 4px" }}>
          Create Agent Profile
        </h1>
        <p style={{ fontSize: "13px", color: TEXT_MUTED, margin: 0 }}>
          Assign internal credentials and specialization levels for new agents.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "18px", flex: 1 }}>
        
        {/* Avatar Section */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <div style={{ position: "relative", width: 64, height: 64 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              border: `2px solid ${preview ? BRAND : BORDER}`,
              background: "#f8fafc", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {preview 
                ? <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <Camera size={20} color={TEXT_MUTED} />
              }
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 20, height: 20, borderRadius: "50%",
              background: BRAND, border: `2px solid ${WHITE}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            </div>
          </div>
        </div>

        {/* Name Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input {...register("firstName")} style={getFieldStyle("firstName")} onFocus={() => setFocusedField("firstName")} onBlur={() => setFocusedField(null)} />
            {errors.firstName && <ErrorMsg text={errors.firstName.message!} />}
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input {...register("lastName")} style={getFieldStyle("lastName")} onFocus={() => setFocusedField("lastName")} onBlur={() => setFocusedField(null)} />
            {errors.lastName && <ErrorMsg text={errors.lastName.message!} />}
          </div>
        </div>

        {/* Auth Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Username</label>
            <input {...register("username")} style={getFieldStyle("username")} onFocus={() => setFocusedField("username")} onBlur={() => setFocusedField(null)} />
            {errors.username && <ErrorMsg text={errors.username.message!} />}
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input {...register("phoneNumber")} style={getFieldStyle("phoneNumber")} onFocus={() => setFocusedField("phoneNumber")} onBlur={() => setFocusedField(null)} />
            {errors.phoneNumber && <ErrorMsg text={errors.phoneNumber.message!} />}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Email Address</label>
          <input {...register("email")} type="email" style={getFieldStyle("email")} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
          {errors.email && <ErrorMsg text={errors.email.message!} />}
        </div>

        <div>
          <label style={labelStyle}>Initial Password</label>
          <input {...register("password")} type="password" style={getFieldStyle("password")} onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} />
          {errors.password && <ErrorMsg text={errors.password.message!} />}
        </div>

        {/* Specialization & Level - Use Brand Tint for this section background */}
        <div style={{ 
          marginTop: "8px", padding: "20px", background: "#f8fafc", 
          borderRadius: "8px", border: `1px solid ${BORDER}`,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" 
        }}>
          <div>
            <label style={labelStyle}>Specialization</label>
            <select {...register("specialization")} style={getSelectStyle("specialization")} onFocus={() => setFocusedField("specialization")} onBlur={() => setFocusedField(null)}>
              <option value="" disabled>Select Expert Area</option>
              {SpecializationEnum.map(opt => <option key={opt} value={opt}>{opt.replace("_", " ")}</option>)}
            </select>
            {errors.specialization && <ErrorMsg text={errors.specialization.message!} />}
          </div>

          <div>
            <label style={labelStyle}>Agent Level</label>
            <select {...register("level")} style={getSelectStyle("level")} onFocus={() => setFocusedField("level")} onBlur={() => setFocusedField(null)}>
              <option value="" disabled>Select Level</option>
              {AgentLevelEnum.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors.level && <ErrorMsg text={errors.level.message!} />}
          </div>

          <div>
            <label style={labelStyle}>Availability</label>
            <select {...register("availabilityStatus")} style={getSelectStyle("availabilityStatus")} onFocus={() => setFocusedField("availabilityStatus")} onBlur={() => setFocusedField(null)}>
              {AvailabilityEnum.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Resolution (Min)</label>
            <input {...register("averageResolutionTime")} type="number" style={getFieldStyle("averageResolutionTime")} onFocus={() => setFocusedField("averageResolutionTime")} onBlur={() => setFocusedField(null)} />
          </div>

          <div style={{ colSpan: 2 } as any}>
            <label style={labelStyle}>Initial Performance Rating (1.0 - 5.0)</label>
            <input {...register("performanceRating")} type="number" step="0.1" style={getFieldStyle("performanceRating")} onFocus={() => setFocusedField("performanceRating")} onBlur={() => setFocusedField(null)} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%", padding: "12px", borderRadius: "6px", fontSize: "14px", fontWeight: 600,
            background: isLoading ? TEXT_MUTED : BRAND, color: WHITE, border: "none",
            cursor: isLoading ? "default" : "pointer", transition: "all 0.2s", marginTop: "12px"
          }}
          onMouseEnter={e => { if(!isLoading) e.currentTarget.style.filter = "brightness(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
        >
          {isLoading ? "Synchronizing Data..." : "Initialize Agent Profile"}
        </button>
      </form>
    </div>
  );
}

// ─── Helper Components ────────────────────────────────────────────────────────
function ErrorMsg({ text }: { text: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px", marginTop: "6px",
      fontSize: "11px", fontWeight: 600, color: DANGER,
      background: DANGER_T, border: `1px solid rgba(239, 68, 68, 0.1)`,
      borderRadius: "4px", padding: "4px 8px", width: "fit-content"
    }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: DANGER }} />
      {text}
    </div>
  );
}