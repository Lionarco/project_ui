"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Receipt,
  PieChart,
  Trophy,
  Bot,
  Wallet,
  Settings,
  ChevronLeft,
  Star,
  Flame,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUser, getInitial, type XPenseUser } from "@/lib/user";
import { useStore, getXPInfo } from "@/lib/store";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Expenses", icon: Receipt, href: "/dashboard/expenses" },
  { label: "Budgets", icon: Wallet, href: "/dashboard/budgets" },
  { label: "Analytics", icon: PieChart, href: "/dashboard/analytics" },
  { label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { label: "AI Buddy", icon: Bot, href: "/dashboard/ai-buddy" },
];

interface SidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onToggle: () => void;
}

function NavItem({
  item,
  collapsed,
  active,
}: {
  item: (typeof navItems)[0];
  collapsed: boolean;
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: collapsed ? 0 : 3 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
          active
            ? "bg-gradient-to-r from-[#6C5DD3]/20 to-[#7C3AED]/10 text-white border border-[#6C5DD3]/30"
            : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center w-5 h-5 shrink-0",
            active && "text-[#6C5DD3]"
          )}
        >
          <Icon className="w-5 h-5" />
          {active && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -left-3 w-1 h-6 rounded-r-full bg-gradient-to-b from-[#6C5DD3] to-[#7C3AED]"
            />
          )}
        </div>

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 glass rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 border border-white/10">
            {item.label}
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default function Sidebar({
  isOpen,
  mobileOpen,
  onMobileClose,
  onToggle,
}: SidebarProps) {
  const pathname = usePathname();
  const collapsed = !isOpen;
  const [user, setUser] = useState<XPenseUser | null>(null);
  const storeData = useStore(); // reactive XP/level/streak

  useEffect(() => {
    setUser(getUser());
    const handleStorage = () => setUser(getUser());
    window.addEventListener("storage", handleStorage);
    window.addEventListener("xpense-store-update", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("xpense-store-update", handleStorage);
    };
  }, []);

  const displayName = user?.name || "User";
  const displayTitle = user?.title || "Financial Newbie";
  const displayInitial = getInitial(displayName);
  const displayAvatar = user?.avatar || "😊";
  // Use store for real-time XP/level/streak
  const xpInfo = getXPInfo(storeData.totalXP);
  const displayLevel = xpInfo.level;
  const displayXP = xpInfo.xpInLevel;
  const xpMax = xpInfo.xpNeeded;
  const xpPct = xpInfo.pct;
  const displayStreak = storeData.streak;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 shrink-0", collapsed ? "justify-center" : "justify-between")}>
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center glow-purple group-hover:scale-110 transition-transform duration-200 shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold whitespace-nowrap overflow-hidden"
              >
                <span className="gradient-text">X</span>Pense
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all hidden lg:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="p-1 rounded-lg text-gray-500 hover:text-white lg:hidden ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Toggle button when collapsed */}
      {collapsed && (
        <div className="flex justify-center mb-2">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all hidden lg:flex"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}

      {/* User card */}
      <div className={cn("mx-3 mb-4 glass rounded-xl border border-white/5 shrink-0", collapsed ? "p-2" : "p-3")}>
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-sm font-bold">
              {displayAvatar.length === 2 ? displayAvatar : displayInitial}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-base font-bold shrink-0">
                {displayAvatar}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                <p className="text-xs text-[#F59E0B] truncate">{displayTitle}</p>
              </div>
            </div>
            {/* XP bar */}
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="flex items-center gap-1 text-gray-400">
                  <Star className="w-2.5 h-2.5 text-[#F59E0B]" /> Level {displayLevel}
                </span>
                <span className="text-gray-500">{displayXP.toLocaleString()} / {xpMax.toLocaleString()} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#6C5DD3] transition-all duration-700"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            collapsed={collapsed}
            active={
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      {/* Bottom — streak + settings */}
      <div className="px-3 pb-4 space-y-1 shrink-0">
        {!collapsed && (
          <div className="glass rounded-xl p-3 border border-[#F59E0B]/20 mb-2 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#F59E0B] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-[#F59E0B]">{displayStreak} Day Streak 🔥</p>
              <p className="text-[10px] text-gray-500">Keep tracking daily!</p>
            </div>
          </div>
        )}
        <Link href="/dashboard/settings">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-200 hover:bg-white/5 transition-all cursor-pointer",
            collapsed && "justify-center"
          )}>
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col glass border-r border-white/5 overflow-hidden shrink-0 relative z-20"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 bottom-0 w-64 flex flex-col bg-[#0B1020] border-r border-white/5 z-40 lg:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
