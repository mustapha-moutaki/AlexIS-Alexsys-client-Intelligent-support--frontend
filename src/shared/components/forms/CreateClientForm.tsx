"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";

const createUserSchema = z.object({
  firstName:      z.string().min(2, "Too short"),
  lastName:       z.string().min(2, "Too short"),
  username:       z.string().min(3, "Min 3 characters"),
  email:          z.string().email("Invalid email"),
  password:       z.string().min(8, "Min 8 characters"),
  phoneNumber:    z.string().min(10, "Invalid number"),
  profilePicture: z.instanceof(File).optional(),
});

type CreateUserInputs = z.infer<typeof createUserSchema>;

interface Props {
  onSubmit: (data: CreateUserInputs) => void;
  isLoading: boolean;
}

const BRAND      = "#4f6ef7";
const BRAND_T    = "rgba(79,110,247,0.08)";
const BORDER     = "#e8eaed";
const TEXT       = "#111827";
const TEXT_SUB   = "#6b7280";
const TEXT_MUTED = "#9ca3af";
const BG         = "#f5f6f8";
const WHITE      = "#ffffff";
const DANGER     = "#dc2626";
const DANGER_T   = "rgba(220,38,38,0.08)";

const labelStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: TEXT_MUTED,
  marginBottom: "4px",
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: "12px",
  color: TEXT,
  background: WHITE,
  border: `1px solid ${BORDER}`,
  borderRadius: "6px",
  padding: "7px 10px",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};

export default function CreateClientForm({ onSubmit, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateUserInputs>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { profilePicture: undefined },
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

  const field = (name: string) => ({
    ...inputStyle,
    borderColor: focusedField === name ? BRAND : BORDER,
    boxShadow: focusedField === name ? `0 0 0 3px ${BRAND_T}` : "none",
  });

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px 22px", display: "flex", flexDirection: "column", overflow: "auto", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: `1px solid ${BORDER}` }}>
        <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND, margin: "0 0 4px" }}>
          New Account
        </p>
        <h1 style={{ fontSize: "15px", fontWeight: 700, color: TEXT, margin: "0 0 2px", letterSpacing: "-0.01em" }}>
          Create Client
        </h1>
        <p style={{ fontSize: "11px", color: TEXT_MUTED, margin: 0 }}>
          Fill in all fields to register a new client account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>

        {/* Avatar upload */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>
          <div style={{ position: "relative", width: 56, height: 56 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: `2px solid ${preview ? BRAND : BORDER}`,
              background: BG, overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.15s",
            }}>
              {preview
                ? <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <Camera size={18} color={TEXT_MUTED} />
              }
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
            />
            {/* Edit badge */}
            <div style={{
              position: "absolute", bottom: 0, right: 0,
              width: 18, height: 18, borderRadius: "50%",
              background: BRAND, border: `2px solid ${WHITE}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Name row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input
              {...register("firstName")}
              placeholder="John"
              style={field("firstName")}
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.firstName && <ErrorMsg text={errors.firstName.message!} />}
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input
              {...register("lastName")}
              placeholder="Doe"
              style={field("lastName")}
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.lastName && <ErrorMsg text={errors.lastName.message!} />}
          </div>
        </div>

        {/* Username + Phone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              {...register("username")}
              placeholder="johndoe"
              style={field("username")}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.username && <ErrorMsg text={errors.username.message!} />}
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              {...register("phoneNumber")}
              placeholder="+1 234 567 890"
              style={field("phoneNumber")}
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.phoneNumber && <ErrorMsg text={errors.phoneNumber.message!} />}
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            style={field("email")}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
          {errors.email && <ErrorMsg text={errors.email.message!} />}
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Min. 8 characters"
            style={field("password")}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
          {errors.password && <ErrorMsg text={errors.password.message!} />}
        </div>

        {/* Submit */}
        <div style={{ marginTop: "auto", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "8px 0",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: isLoading ? "default" : "pointer",
              border: "none",
              background: isLoading ? BORDER : BRAND,
              color: isLoading ? TEXT_MUTED : WHITE,
              transition: "opacity 0.15s",
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={e => { if (!isLoading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {isLoading ? "Creating account…" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
}

function ErrorMsg({ text }: { text: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "4px",
      marginTop: "4px",
      fontSize: "10px", fontWeight: 500,
      color: DANGER,
      background: DANGER_T,
      border: `1px solid rgba(220,38,38,0.15)`,
      borderRadius: "4px",
      padding: "3px 7px",
    }}>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      {text}
    </div>
  );
}