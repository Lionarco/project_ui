"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, Bell, Plus, CheckCheck } from "lucide-react";
import GradientButton from "@/components/shared/GradientButton";
import { getUser, getInitial } from "@/lib/user";

const notifications = [
  { id: 1, type: "warning", icon: "⚠️", title: "Budget Alert", desc: "Food budget is 85% used", time: "5m ago", read: false },
  { id: 2, type: "achievement", icon: "🏆", title: "Achievement Unlocked!", desc: "7-Day Tracking Streak earned", time: "1h ago", read: false },
  { id: 3, type: "insight", icon: "💡", title: "AI Insight", desc: "You saved Rp 120K this week", time: "3h ago", read: true },
  { id: 4, type: "tip", icon: "🎯", title: "Challenge Update", desc: "Zero Coffee Week: 60% done", time: "1d ago", read: true },
];

interface TopbarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [notiOpen, setNotiOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [avatar, setAvatar] = useState("😊");
  const [initial, setInitial] = useState("U");
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const user = getUser();
    setAvatar(user.avatar || "😊");
    setInitial(getInitial(user.name || "User"));
  }, []);

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center gap-3 px-4 sm:px-6 shrink-0 relative z-20">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all lg:hidden shrink-0"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search expenses, budgets…"
            className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/50 focus:bg-white/8 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto shrink-0">
        {/* Quick Add Button */}
        <GradientButton variant="primary" size="sm" id="topbar-quick-add" className="hidden sm:flex">
          <Plus className="w-3.5 h-3.5" />
          Add Expense
        </GradientButton>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotiOpen(!notiOpen)}
            className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            id="topbar-notifications"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border border-[#0A0F1E]" />
            )}
          </button>

          <AnimatePresence>
            {notiOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotiOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-80 glass rounded-2xl border border-white/10 shadow-2xl z-40 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      {unread > 0 && (
                        <span className="bg-[#EF4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unread}
                        </span>
                      )}
                    </div>
                    <button className="flex items-center gap-1 text-xs text-[#6C5DD3] hover:text-[#a78bfa]">
                      <CheckCheck className="w-3 h-3" />
                      Mark all read
                    </button>
                  </div>

                  <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex gap-3 px-4 py-3 hover:bg-white/5 transition-all cursor-pointer ${!n.read ? "bg-[#6C5DD3]/5" : ""}`}
                      >
                        <span className="text-lg shrink-0">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold truncate">{n.title}</p>
                            <span className="text-[10px] text-gray-500 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{n.desc}</p>
                        </div>
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-[#6C5DD3] shrink-0 mt-1" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-white/5 text-center">
                    <button className="text-xs text-[#6C5DD3] hover:text-[#a78bfa] transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar — dynamic from localStorage */}
        <button
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-[#6C5DD3]/50 transition-all shrink-0"
          title="Profile"
        >
          {avatar.length <= 2 && avatar !== initial ? avatar : initial}
        </button>
      </div>
    </header>
  );
}
