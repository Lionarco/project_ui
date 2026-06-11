"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Zap,
  Bot,
  Bell,
  ArrowUp,
  ArrowDown,
  Play,
  Flame,
  Star,
  ShoppingBag,
  Coffee,
  Car,
} from "lucide-react";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import GradientButton from "@/components/shared/GradientButton";

/* ─── Mini Dashboard Mockup ─── */
function DashboardMockup() {
  const splineData = [12, 28, 18, 45, 35, 60, 42, 75, 55, 80, 65, 90];
  const maxVal = Math.max(...splineData);
  const points = splineData
    .map((v, i) => `${(i / (splineData.length - 1)) * 260},${80 - (v / maxVal) * 70}`)
    .join(" ");

  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none">
      {/* Main dashboard card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass rounded-3xl p-5 border border-white/10 shadow-2xl shadow-[#6C5DD3]/20"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Balance</p>
            <p className="text-2xl font-bold mt-0.5">
              Rp <span className="gradient-text">5.630.000</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#22C55E] flex items-center gap-1 bg-[#22C55E]/10 px-2 py-1 rounded-full">
              <ArrowUp className="w-3 h-3" /> +12%
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Budget ring + stats */}
        <div className="flex items-center gap-4 mb-5">
          {/* Progress ring */}
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#ring-gradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.72)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6C5DD3" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-bold">72%</span>
              <span className="text-[9px] text-gray-500">Budget</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Budget Used</span>
                <span className="text-white font-medium">Rp 3.240.000</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#6C5DD3] to-[#06B6D4]"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Daily Limit</span>
                <span className="text-white font-medium">Rp 85.000</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#22C55E] to-[#06B6D4]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sparkline chart */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Expense Trend</span>
            <span className="text-xs text-[#22C55E]">This Month</span>
          </div>
          <svg
            viewBox="0 0 260 90"
            className="w-full h-14 overflow-visible"
          >
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6C5DD3" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6C5DD3" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6C5DD3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.polyline
              points={points}
              fill="none"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          {[
            { icon: ShoppingBag, label: "Shopping", val: "-Rp 125.000", color: "#6C5DD3" },
            { icon: Coffee, label: "Kopi Kenangan", val: "-Rp 28.000", color: "#F59E0B" },
            { icon: Car, label: "Transport", val: "-Rp 42.000", color: "#06B6D4" },
          ].map(({ icon: Icon, label, val, color }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}20` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <span className="text-xs text-gray-400">{label}</span>
              </div>
              <span className="text-xs font-medium text-[#FF6B6B]">{val}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating XP card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-6 -right-8 glass rounded-2xl p-3 border border-white/10 shadow-lg shadow-[#F59E0B]/10 w-36"
      >
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs font-semibold">Level 12</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "68%" }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#6C5DD3]"
          />
        </div>
        <div className="text-[9px] text-gray-500">1.360 / 2.000 XP</div>
      </motion.div>

      {/* Floating AI card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-8 -left-8 glass rounded-2xl p-3 border border-[#6C5DD3]/30 shadow-lg shadow-[#6C5DD3]/20 w-52"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center">
            <Bot className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold text-[#a78bfa]">AI Buddy</span>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">
          💡 You&apos;re spending 32% more on food this week. Try cooking at home!
        </p>
      </motion.div>

      {/* Floating streak card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 -right-12 glass rounded-2xl p-3 border border-[#F59E0B]/20 shadow-lg w-28"
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-xs font-bold">14 Days</span>
        </div>
        <p className="text-[9px] text-gray-500">Tracking Streak 🔥</p>
      </motion.div>
    </div>
  );
}

/* ─── Hero Section ─── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-hero"
    >
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground count={80} />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C5DD3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 border border-[#6C5DD3]/30"
            >
              <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-xs font-medium text-gray-300">
                Gamified Finance — Now in Beta
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tight"
            >
              Take Control
              <br />
              of Your{" "}
              <span className="gradient-text">Money.</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300">
                Level Up Your
              </span>
              <br />
              <span className="gradient-text">Financial Habit.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg"
            >
              Track expenses, manage budgets, unlock achievements, and receive
              AI-powered financial insights—all in one platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link href="/register">
                <GradientButton
                  variant="primary"
                  size="lg"
                  id="hero-cta-primary"
                >
                  <Zap className="w-4 h-4" />
                  Start Tracking Free
                </GradientButton>
              </Link>
              <Link href="/dashboard">
                <GradientButton
                  variant="outline"
                  size="lg"
                  id="hero-cta-watch-demo"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Coba Demo
                </GradientButton>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {["#6C5DD3", "#7C3AED", "#06B6D4", "#22C55E", "#F59E0B"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#0A0F1E] flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: color }}
                    >
                      {["A", "B", "C", "D", "E"][i]}
                    </div>
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  <span className="text-white font-semibold">50,000+</span>{" "}
                  users leveling up
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Active Users", value: "50K+", color: "#6C5DD3" },
            { label: "Expenses Tracked", value: "2M+", color: "#22C55E" },
            { label: "Money Saved", value: "Rp 1B+", color: "#F59E0B" },
            { label: "Avg. XP Earned", value: "12K", color: "#06B6D4" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 text-center border border-white/5 hover:border-[#6C5DD3]/30 transition-all duration-300"
            >
              <div
                className="text-2xl font-black mb-1"
                style={{ color }}
              >
                {value}
              </div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
