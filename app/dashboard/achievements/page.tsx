"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Flame, Target, Award, Crown, Shield, Zap, TrendingUp, Users } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const achievements = [
  { id: 1, icon: "🏆", label: "First Budget Created", xp: 50, unlocked: true, color: "#F59E0B", desc: "Set up your first budget category" },
  { id: 2, icon: "🔥", label: "7-Day Tracking Streak", xp: 100, unlocked: true, color: "#EF4444", desc: "Track expenses 7 days in a row" },
  { id: 3, icon: "💰", label: "Save Rp 500.000", xp: 200, unlocked: true, color: "#22C55E", desc: "Accumulate Rp 500K in savings" },
  { id: 4, icon: "⚔️", label: "Financial Warrior", xp: 500, unlocked: true, color: "#6C5DD3", desc: "Complete all beginner challenges" },
  { id: 5, icon: "💎", label: "Diamond Saver", xp: 1000, unlocked: false, color: "#06B6D4", desc: "Save Rp 5.000.000 total" },
  { id: 6, icon: "🚀", label: "Budget Master", xp: 300, unlocked: false, color: "#7C3AED", desc: "Stay under budget for 3 months" },
  { id: 7, icon: "🌟", label: "Consistency King", xp: 750, unlocked: false, color: "#F59E0B", desc: "30-day tracking streak" },
  { id: 8, icon: "🦋", label: "Habit Transformer", xp: 400, unlocked: false, color: "#22C55E", desc: "Complete 5 financial challenges" },
];

const challenges = [
  { id: 1, title: "Zero Coffee Week", desc: "Don't buy coffee for 7 days", progress: 60, target: 7, current: 4, reward: 150, deadline: "3 days", color: "#F59E0B", icon: "☕" },
  { id: 2, title: "Save Rp 1.000.000", desc: "Save one million rupiah this month", progress: 45, target: 1000000, current: 450000, reward: 300, deadline: "15 days", color: "#22C55E", icon: "💰" },
  { id: 3, title: "No Impulse Buys", desc: "Avoid unplanned purchases for a week", progress: 80, target: 7, current: 6, reward: 200, deadline: "1 day", color: "#06B6D4", icon: "🛍️" },
  { id: 4, title: "Daily Log Streak", desc: "Log at least one expense every day", progress: 100, target: 14, current: 14, reward: 100, deadline: "Completed!", color: "#6C5DD3", icon: "✅", completed: true },
];

const leaderboard = [
  { rank: 1, name: "Sarah K.", level: 18, xp: 12450, streak: 45, badge: "🏆" },
  { rank: 2, name: "Budi R.", level: 16, xp: 10820, streak: 32, badge: "🥈" },
  { rank: 3, name: "Citra M.", level: 15, xp: 9340, streak: 28, badge: "🥉" },
  { rank: 4, name: "You", level: 12, xp: 8450, streak: 14, badge: "⚔️", isUser: true },
  { rank: 5, name: "Deni F.", level: 11, xp: 7200, streak: 10, badge: "🎯" },
];

type Tab = "achievements" | "challenges" | "leaderboard";

export default function AchievementsPage() {
  const [tab, setTab] = useState<Tab>("achievements");

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "leaderboard", label: "Leaderboard", icon: Users },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black">Achievements</h1>
        <p className="text-sm text-gray-400 mt-0.5">Level up your financial game</p>
      </div>

      {/* Player stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Current Level", val: 12, icon: Crown, color: "#F59E0B", suffix: "" },
          { label: "Total XP", val: 8450, icon: Star, color: "#6C5DD3", suffix: " XP" },
          { label: "Day Streak", val: 14, icon: Flame, color: "#EF4444", suffix: "🔥" },
          { label: "Badges Earned", val: 4, icon: Award, color: "#22C55E", suffix: " / 8" },
        ].map(({ label, val, icon: Icon, color, suffix }) => (
          <GlassCard key={label} className="p-4 border border-white/5 text-center">
            <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
            <p className="text-xl font-black" style={{ color }}>
              <AnimatedCounter end={val} suffix={suffix} />
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </GlassCard>
        ))}
      </div>

      {/* XP Level bar */}
      <GlassCard className="p-5 border border-[#F59E0B]/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#6C5DD3] flex items-center justify-center font-black text-lg">
              12
            </div>
            <div>
              <p className="font-bold">Financial Warrior</p>
              <p className="text-xs text-gray-400">1,360 XP earned this month</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#F59E0B]">Level 13 →</p>
            <p className="text-xs text-gray-500">640 XP to go</p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full relative overflow-hidden"
            style={{ background: "linear-gradient(90deg, #F59E0B, #6C5DD3)" }}
          >
            <div className="absolute inset-0 shimmer" />
          </motion.div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1,360 XP</span>
          <span>2,000 XP</span>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-xl p-1 border border-white/8 w-full sm:w-fit overflow-x-auto no-scrollbar">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id
                ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {tab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring", bounce: 0.4 }}
                whileHover={a.unlocked ? { scale: 1.05, y: -4 } : undefined}
                className={`relative glass rounded-2xl p-4 border text-center transition-all ${
                  a.unlocked
                    ? "border-white/10 hover:border-[#6C5DD3]/40 cursor-pointer"
                    : "opacity-40 border-white/5 grayscale"
                }`}
              >
                {a.unlocked && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        `0 0 0px ${a.color}00`,
                        `0 0 24px ${a.color}30`,
                        `0 0 0px ${a.color}00`,
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                )}
                <div className="text-4xl mb-2">{a.icon}</div>
                <p className="text-xs font-semibold leading-tight mb-2">{a.label}</p>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: a.unlocked ? a.color : "#6B7280",
                    background: a.unlocked ? `${a.color}20` : "rgba(255,255,255,0.05)",
                  }}
                >
                  +{a.xp} XP
                </span>
                {!a.unlocked && (
                  <div className="absolute top-2 right-2">
                    <Shield className="w-3 h-3 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "challenges" && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {challenges.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard
                  className={`p-5 border ${c.completed ? "border-[#22C55E]/30" : "border-white/5"}`}
                  style={c.completed ? { background: "rgba(34,197,94,0.05)" } : undefined}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{c.title}</p>
                        <p className="text-xs text-gray-500">{c.desc}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full shrink-0"
                      style={{ color: c.color, background: `${c.color}20` }}
                    >
                      +{c.reward} XP
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                    />
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{c.progress}% complete</span>
                    <span style={{ color: c.color }} className="font-medium">
                      {c.deadline}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="border border-white/5 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#6C5DD3]" />
                <h3 className="font-bold">Global Rankings</h3>
                <span className="ml-auto text-xs text-gray-500">This month</span>
              </div>

              <div className="divide-y divide-white/5">
                {leaderboard.map((user, i) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center gap-4 px-5 py-4 ${
                      user.isUser
                        ? "bg-[#6C5DD3]/10 border-l-2 border-[#6C5DD3]"
                        : "hover:bg-white/2"
                    }`}
                  >
                    <div className="text-xl w-8 text-center">{user.badge}</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: user.isUser
                          ? "linear-gradient(135deg, #6C5DD3, #7C3AED)"
                          : "rgba(255,255,255,0.1)",
                      }}
                    >
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {user.name}
                        {user.isUser && (
                          <span className="ml-2 text-[10px] text-[#6C5DD3] font-normal">(You)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">Level {user.level} · {user.streak}🔥 streak</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#6C5DD3]">
                        {user.xp.toLocaleString()} XP
                      </p>
                      <p className="text-xs text-gray-500">#{user.rank}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-white/5 text-center">
                <p className="text-xs text-gray-500">You&apos;re in the <span className="text-[#6C5DD3] font-semibold">top 15%</span> of all users this month 🎉</p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
