"use client";
import { motion } from "framer-motion";
import { Flame, Star, Trophy, Zap, Shield, Target, Award, Crown } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const achievements = [
  { icon: "🏆", label: "First Budget Created", xp: "+50 XP", unlocked: true, color: "#F59E0B" },
  { icon: "🔥", label: "7-Day Tracking Streak", xp: "+100 XP", unlocked: true, color: "#EF4444" },
  { icon: "💰", label: "Save Rp 500.000", xp: "+200 XP", unlocked: true, color: "#22C55E" },
  { icon: "⚔️", label: "Financial Warrior", xp: "+500 XP", unlocked: true, color: "#6C5DD3" },
  { icon: "💎", label: "Diamond Saver", xp: "+1000 XP", unlocked: false, color: "#06B6D4" },
  { icon: "🚀", label: "Budget Master", xp: "+300 XP", unlocked: false, color: "#7C3AED" },
];

const challenges = [
  { title: "Zero Coffee Week", progress: 60, reward: "+150 XP", deadline: "3 days left", color: "#F59E0B" },
  { title: "Save Rp 1.000.000", progress: 45, reward: "+300 XP", deadline: "15 days left", color: "#22C55E" },
  { title: "No Impulse Buys", progress: 80, reward: "+200 XP", deadline: "1 day left", color: "#06B6D4" },
];

export default function GamificationSection() {
  return (
    <section
      id="gamification"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1020 0%, #0A0F1E 100%)" }}
    >
      {/* Bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6C5DD3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#F59E0B]/30">
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-xs font-medium text-[#F59E0B]">Gamification</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Finance Meets <span className="gradient-text-gold">Gaming</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Turn every financial habit into an adventure. Earn XP, unlock badges,
            and level up your money game.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Level & XP */}
          <div className="space-y-6">
            {/* Player card */}
            <ScrollReveal direction="left">
              <GlassCard className="p-6 border border-white/8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-2xl font-black">
                      A
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center">
                      <Crown className="w-3 h-3 text-[#0A0F1E]" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Ardiansyah</p>
                    <p className="text-sm text-[#F59E0B] font-medium">⚔️ Financial Warrior</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-3xl font-black gradient-text">12</p>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                </div>

                {/* XP bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 font-medium">XP Progress</span>
                    <span className="text-[#F59E0B] font-semibold">
                      <AnimatedCounter end={1360} suffix=" / 2,000 XP" />
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "68%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background: "linear-gradient(90deg, #F59E0B, #6C5DD3)",
                      }}
                    >
                      <div className="absolute inset-0 shimmer" />
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">640 XP to Level 13</p>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Streak */}
            <ScrollReveal direction="left" delay={0.1}>
              <GlassCard className="p-5 border border-white/8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EF4444]/20 to-[#F59E0B]/20 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="font-bold">Current Streak</p>
                      <p className="text-xs text-gray-500">Keep it going!</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-[#F59E0B]">
                      <AnimatedCounter end={14} />
                    </p>
                    <p className="text-xs text-gray-500">Days 🔥</p>
                  </div>
                </div>

                {/* Streak days */}
                <div className="flex gap-1.5 mt-4">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="flex-1 h-6 rounded-md flex items-center justify-center text-[8px]"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}
                    >
                      🔥
                    </motion.div>
                  ))}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex-1 h-6 rounded-md bg-white/5"
                    />
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Challenges */}
            <ScrollReveal direction="left" delay={0.2}>
              <GlassCard className="p-5 border border-white/8">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-[#6C5DD3]" />
                  <h3 className="font-bold">Active Challenges</h3>
                </div>
                <div className="space-y-4">
                  {challenges.map((c) => (
                    <div key={c.title}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{c.title}</span>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            color: c.color,
                            background: `${c.color}20`,
                          }}
                        >
                          {c.reward}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: c.color }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{c.progress}% done</span>
                        <span>{c.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Right — Achievements */}
          <ScrollReveal direction="right">
            <GlassCard className="p-6 border border-white/8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-bold text-lg">Achievement Badges</h3>
                <span className="ml-auto text-xs text-gray-500">
                  4 / 6 Unlocked
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      type: "spring",
                      bounce: 0.4,
                    }}
                    whileHover={a.unlocked ? { scale: 1.05 } : undefined}
                    className={`relative glass rounded-2xl p-4 border text-center transition-all duration-300 ${
                      a.unlocked
                        ? "border-white/10 hover:border-[#6C5DD3]/40"
                        : "opacity-40 border-white/5 grayscale"
                    }`}
                  >
                    {a.unlocked && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            `0 0 0px ${a.color}00`,
                            `0 0 20px ${a.color}30`,
                            `0 0 0px ${a.color}00`,
                          ],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    )}
                    <div className="text-3xl mb-2">{a.icon}</div>
                    <p className="text-xs font-semibold leading-tight mb-1">{a.label}</p>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        color: a.unlocked ? a.color : "#6B7280",
                        background: a.unlocked ? `${a.color}20` : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {a.xp}
                    </span>
                    {!a.unlocked && (
                      <div className="absolute top-2 right-2">
                        <Shield className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* XP summary */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: "Total XP", value: "8,450", icon: Star, color: "#F59E0B" },
                  { label: "Badges", value: "4", icon: Award, color: "#6C5DD3" },
                  { label: "Rank", value: "#142", icon: Trophy, color: "#22C55E" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="rounded-xl p-3 text-center border border-white/5"
                    style={{ background: `${color}10` }}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                    <p className="text-sm font-bold">{value}</p>
                    <p className="text-[10px] text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
