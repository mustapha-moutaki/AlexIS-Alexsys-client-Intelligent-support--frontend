"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Users, BarChart3, Settings,
  LogOut, ChevronRight, Tags, Ticket
} from "lucide-react";
import LogoAlexIs from "../ui/LogoAlexIs";
import { useLogout } from "@/src/hooks/useAuth";
import toast from "react-hot-toast";
import useAuthStore from "@/src/store/authStore";

// 1. Added 'roles' property to define who can see what
const navItems = [
  { id: "dash", label: "Dashboard", icon: LayoutGrid, path: "/dashboard", roles: ["ADMIN"] },
  { id: "dash-agent", label: "Dashboard", icon: LayoutGrid, path: "/dashboard/agent/overview", roles: ["AGENT"] },
    { id: "dash-client", label: "Dashboard", icon: LayoutGrid, path: "/dashboard/client/overview", roles: ["CLIENT"] },
  { id: "users", label: "Users", icon: Users, path: "/dashboard/users", roles: ["ADMIN"] },
  { id: "tickets", label: "Manage Tickets", icon: Ticket, path: "/dashboard/admin/tickets", roles: ["ADMIN"] },
  { id: "user-tickets", label: "My Tickets", icon: Ticket, path: "/dashboard/agent/tickets", roles: ["AGENT"] },
    { id: "client-tickets", label: "My Tickets", icon: Ticket, path: "/dashboard/client/tickets", roles: ["CLIENT"] },
  { id: "categories", label: "Categories", icon: Tags, path: "/dashboard/categories", roles: ["ADMIN"] },
  { id: "stats", label: "Statistics", icon: BarChart3, path: "/stats", roles: ["ADMIN"] },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

const BRAND = "#51C2DE";
const BRAND_TINT = "rgba(81,194,222,0.09)";
const BRAND_BORDER = "rgba(81,194,222,0.22)";

export default function FloatingSidebar({ isExpanded, setIsExpanded }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  // 2. Filter the nav items based on the logged-in user's role
  const filteredNavItems = navItems.filter((item) => {
    // If no roles are defined for the item, it's public for all logged-in users
    if (!item.roles) return true;
    // Check if user's role matches one of the allowed roles
return user?.role !== undefined && item.roles.includes(user.role);
  });

  // handle logout
  const { mutate, isPending, error } = useLogout();
  if (error) {
    toast.error(error.message);
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300"
      style={{
        width: isExpanded ? 200 : 56,
        background: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        boxShadow: "1px 0 0 0 #E5E7EB",
      }}
    >
      {/* Logo / toggle row */}
      <div
        className="flex items-center h-14 px-3 flex-shrink-0"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-md"
          style={{ width: 30, height: 30, background: BRAND_TINT, border: `1px solid transparent` }}
        >
          <LogoAlexIs />
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="ml-2.5 font-semibold tracking-tight whitespace-nowrap"
              style={{ fontSize: 14, color: "#111827" }}
            >
              AlexIS
            </motion.span>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto flex items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          style={{ width: 26, height: 26, flexShrink: 0 }}
          aria-label="Toggle sidebar"
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronRight size={14} style={{ color: "#9CA3AF" }} />
          </motion.div>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 flex-1 p-2 overflow-y-auto hide-scrollbar">
        {/* 3. Map over the filteredNavItems instead of original navItems */}
        {filteredNavItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = pathname === path || (path !== "/dashboard" && pathname.startsWith(path));
          return (
            <button
              key={id}
              onClick={() => router.push(path)}
              className="relative flex items-center rounded-md transition-colors cursor-pointer group"
              style={{
                height: 36,
                padding: "0 8px",
                background: isActive ? BRAND_TINT : "transparent",
                border: isActive ? `1px solid ${BRAND_BORDER}` : "1px solid transparent",
                color: isActive ? "#0E7B96" : "#6B7280",
                width: "100%",
                textAlign: "left",
              }}
              title={!isExpanded ? label : undefined}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                  style={{ width: 3, height: 18, background: BRAND }}
                />
              )}

              <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 20 }}>
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  style={{ color: isActive ? BRAND : "#9CA3AF" }}
                />
              </span>

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="ml-2.5 whitespace-nowrap font-medium"
                    style={{ fontSize: 13 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Logout footer */}
      <div className="p-2 flex-shrink-0" style={{ borderTop: "1px solid #E5E7EB" }}>
        <button
          className="flex items-center rounded-md transition-colors hover:bg-red-50 cursor-pointer"
          style={{ height: 36, padding: "0 8px", width: "100%", color: "#EF4444" }}
          title={!isExpanded ? "Logout" : undefined}
          onClick={() => mutate()}
        >
          <span className="flex-shrink-0 flex items-center justify-center" style={{ width: 20 }}>
            <LogOut size={15} strokeWidth={1.7} />
          </span>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.15 }}
                className="ml-2.5 font-medium whitespace-nowrap"
                style={{ fontSize: 13 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </aside>
  );
}