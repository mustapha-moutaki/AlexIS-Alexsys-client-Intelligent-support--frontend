"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid, Wallet, BarChart3, ArrowLeftRight, Users, Settings, 
  LogOut, Zap, Sun, Moon
} from "lucide-react";

// Updated navItems with path field
const navItems = [
  { id: "dash",      label: "Dashboard",  icon: LayoutGrid,     path: "/dashboard" },
  { id: "wallet",    label: "My Balance", icon: Wallet,         path: "/balance"   },
  { id: "stats",     label: "Statistics", icon: BarChart3,      path: "/stats"     },
  { id: "trade",     label: "Exchange",   icon: ArrowLeftRight, path: "/exchange"  },
  { id: "Manage Users", label: "Users",  icon: Users,          path: "/dashboard/users"},
  { id: "settings",  label: "Settings",   icon: Settings,       path: "/settings"  },
];

export default function FloatingSidebar({ isExpanded, setIsExpanded }:any) {
  const router = useRouter();
  const pathname = usePathname(); // 2. Hook to get current URL
  const [isDarkMode, setIsDarkMode] = useState(true);

  const sidebarVariants = {
    expanded: { width: 160 },
    collapsed: { width: 40 }
  };

  return (
    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 cursor-pointer">
      
      {/* Top Section: Theme Toggle */}
      <motion.aside
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative flex flex-col items-start p-1 rounded-[20px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(55,20,80,0.55) 0%, rgba(13,13,16,0.75) 60%, rgba(81,194,222,0.08) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(81,194,222,0.18)",
          boxShadow: "0 8px 40px rgba(55,20,80,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",

        }}
      >
        <div className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }}
        />
        
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative z-10 flex items-center w-full h-8 rounded-lg transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
        >
          <div 
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-transform"
            style={{
              background: "linear-gradient(135deg, #371450 0%, #51C2DE 100%)",
              boxShadow: "0 4px 12px rgba(81,194,222,0.3)",
            }}
          >
            {isDarkMode ? (
              <Moon size={16} className="text-white fill-white/20" />
            ) : (
              <Sun size={16} className="text-white fill-white/20" />
            )}
          </div>
          
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                className="ml-2 text-[11px] font-medium text-white/70 whitespace-nowrap"
              >
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.aside>

      {/* Bottom Section: Navigation */}
      <motion.aside
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative flex flex-col items-start p-1 rounded-[20px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(55,20,80,0.55) 0%, rgba(13,13,16,0.75) 60%, rgba(81,194,222,0.08) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(81,194,222,0.18)",
          boxShadow: "0 8px 40px rgba(55,20,80,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.07) 0%, transparent 50%)" }}
        />

        {/* Toggle Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative z-10 mb-4 self-center flex items-center justify-center w-8 h-8 rounded-lg transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #371450 0%, #51C2DE 100%)",
            boxShadow: "0 4px 12px rgba(81,194,222,0.3)",
          }}
        >
          <Zap size={16} fill="white" className="text-white" />
        </button>

        {/* Nav Items */}
        <div className="relative z-10 flex-1 w-full space-y-1">
          {navItems.map(({ id, label, icon: Icon, path }) => {
            // 3. isActive is true if the current URL matches the item's path
            const isActive = pathname === path;

            return (
              <button
                key={id}
                onClick={() => router.push(path)} 
                className="relative w-full h-8 flex items-center rounded-lg transition-colors group cursor-pointer"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.35)" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, rgba(81,194,222,0.12) 0%, rgba(55,20,80,0.20) 100%)",
                      border: "1px solid rgba(81,194,222,0.2)",
                    }}
                  />
                )}

                {isActive && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute -left-1 w-0.5 h-3 rounded-r-full"
                    style={{
                      background: "#51C2DE",
                      boxShadow: "0 0 6px #51C2DE",
                    }}
                  />
                )}
                
                <span className="flex-shrink-0 w-8 flex items-center justify-center z-10">
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.6} />
                </span>

                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      className="text-[11px] font-medium whitespace-nowrap z-10 tracking-tight"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button className="relative z-10 mt-4 self-center w-8 h-8 flex items-center justify-center rounded-lg text-rose-500/70 hover:bg-rose-500/10 hover:text-rose-500 transition-colors">
          <LogOut size={15} />
        </button>
      </motion.aside>
    </div>
  );
}