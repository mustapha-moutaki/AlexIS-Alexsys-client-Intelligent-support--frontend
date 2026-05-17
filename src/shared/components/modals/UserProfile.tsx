"use client";
import React from "react";
import { 
  User, Mail, Phone, Shield, Settings, 
  MapPin, Activity, Zap, Star, Edit3, 
  Calendar, CheckCircle, Fingerprint
} from "lucide-react";
import ButtonGoBack from "../ui/ButtonGoBack";

interface UserProfileProps {
  user: any;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">
      {/* Top Banner / Cover Image */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600" />

      {/* Main Content Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <ButtonGoBack/>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <User size={60} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
                </div>

                {/* Name & Role */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 capitalize">
                    {user.firstName} {user.lastName}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-sm font-medium text-slate-500">@{user.username}</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-4 pt-6 border-t border-slate-100">
                   <DetailRow icon={<Mail size={18} />} label="Email" value={user.email} />
                   <DetailRow icon={<Phone size={18} />} label="Phone" value={user.phoneNumber} />
                   <DetailRow icon={<Fingerprint size={18} />} label="User ID" value={`#${user.id}`} />
                </div>

                <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all active:scale-[0.98]">
                  <Edit3 size={16} /> Edit Profile
                </button>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-600" /> Account Security
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100">
                  <span className="text-xs font-semibold text-green-700">Status</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-green-700">
                    <CheckCircle size={14} /> Verified
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-600">Two-Factor</span>
                  <span className="text-xs font-bold text-slate-400">Enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Activity */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatBox icon={<Zap className="text-amber-500" />} title="Role Access" value={user.role} desc="Full Admin Privileges" />
              <StatBox icon={<Activity className="text-blue-500" />} title="Status" value="Active" desc="Last login: Today" />
              <StatBox icon={<Calendar className="text-purple-500" />} title="Member Since" value="Jan 2024" desc="Account age: 5 months" />
            </div>

            {/* Main Info Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Professional Information</h3>
                <Settings size={20} className="text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">First Name</label>
                    <p className="text-slate-900 font-medium mt-1 capitalize">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Last Name</label>
                    <p className="text-slate-900 font-medium mt-1 capitalize">{user.lastName}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Official Email</label>
                    <p className="text-slate-900 font-medium mt-1">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phone Number</label>
                    <p className="text-slate-900 font-medium mt-1">{user.phoneNumber}</p>
                  </div>
                </div>

                <div className="mt-10 p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white text-indigo-600 shadow-sm">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-indigo-900 font-bold">Premium Administrator Account</h4>
                      <p className="text-indigo-700/70 text-sm mt-1">
                        You have full access to the management console, user analytics, and system configurations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for additional content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Recent Activity</h4>
                  <p className="text-sm text-slate-500">Updated security settings 2 hours ago.</p>
               </div>
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Login Locations</h4>
                  <p className="text-sm text-slate-500">Detected login from New York, USA.</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 text-left">
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">{label}</p>
        <p className="text-sm font-semibold text-slate-700 leading-none">{value || "N/A"}</p>
      </div>
    </div>
  );
}

function StatBox({ icon, title, value, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-50">
          {icon}
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );
}