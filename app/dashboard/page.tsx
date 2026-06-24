"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, ArrowDown, Zap, Flame, Star, Bot, Eye, EyeOff, TrendingUp,
  Plus, ArrowRight, Sparkles, Target, ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis,
} from "recharts";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { getUser, getFirstName } from "@/lib/user";
import {
  useStore,
  getThisMonthTransactions,
  getTodayTransactions,
  getSpentByCategory,
  getXPInfo,
} from "@/lib/store";
import Link from "next/link";

function buildWeeklyChart(transactions: ReturnType<typeof useStore>["transactions"]) {
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const result: { day: string; amount: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const dateStr = d.toISOString().slice(0, 10);
    const total = transactions
      .filter((tx) => tx.date.slice(0, 10) === dateStr)
      .reduce((s, tx) => s + tx.amount, 0);
    result.push({ day: days[d.getDay()], amount: Math.round(total / 1000) });
  }
  return result;
}

function StatCard({
  label, value, prefix, suffix, change, positive, color, icon, delay,
}: {
  label: string; value: number; prefix?: string; suffix?: string;
  change: string; positive: boolean; color: string; icon: string; delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -3, boxShadow: `0 12px 40px ${color}18` }}
        className="glass rounded-2xl p-5 border border-white/8 cursor-default transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${color}18` }}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-[#34D399]/12 text-[#34D399]" : "bg-[#F87171]/12 text-[#F87171]"}`}>
            {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <p className="text-xs text-[#6B7A9B] mb-1 font-medium">{label}</p>
        <p className="text-2xl font-black" style={{ color }}>
          {prefix}<AnimatedCounter end={value} />{suffix}
        </p>
      </motion.div>
    </ScrollReveal>
  );
}

export default function OverviewPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [userName, setUserName] = useState("User");
  const store = useStore();

  useEffect(() => {
    const user = getUser();
    setUserName(getFirstName(user.name || "User"));
  }, []);

  const monthlyTx = getThisMonthTransactions(store.transactions);
  const todayTx = getTodayTransactions(store.transactions);
  const monthlySpend = monthlyTx.reduce((s, tx) => s + tx.amount, 0);
  const todaySpend = todayTx.reduce((s, tx) => s + tx.amount, 0);
  const spentByCategory = getSpentByCategory(monthlyTx);
  const xpInfo = getXPInfo(store.totalXP);
  const weeklyChart = buildWeeklyChart(store.transactions);
  const recentTx = store.transactions.slice(0, 6);

  const budgetItems = store.budgets.slice(0, 4).map((b) => ({
    ...b,
    spent: spentByCategory[b.label] ?? 0,
  }));
  const totalBudget = store.budgets.reduce((s, b) => s + b.allocated, 0);
  const budgetUsedPct = totalBudget > 0 ? Math.round((monthlySpend / totalBudget) * 100) : 0;

  // Category pie data
  const categoryData = Object.entries(spentByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value], i) => ({
      name: name === "Food & Drink" ? "Makanan" : name,
      value,
      color: ["#7C6FF7", "#22D3EE", "#34D399", "#FBBF24", "#F87171"][i],
    }));

  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Selamat malam 🌙" : hour < 12 ? "Selamat pagi ☀️" : hour < 17 ? "Selamat siang 👋" : "Selamat malam 🌙";

  return (
    <div className="space-y-6 max-w-7xl page-fade">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm text-[#6B7A9B] font-medium">{greeting}</p>
          <h1 className="text-3xl font-black mt-1">
            Halo, <span className="gradient-text">{userName}</span> 👋
          </h1>
          <p className="text-sm text-[#A8B4CC] mt-1">
            {store.transactions.length === 0
              ? "Ayo mulai catat pengeluaran pertamamu!"
              : `Kamu punya ${store.transactions.length} transaksi tercatat`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {store.streak > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#FBBF24]/25 bg-[#FBBF24]/8"
            >
              <Flame className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-sm font-bold text-[#FBBF24]">{store.streak}</span>
              <span className="text-xs text-[#6B7A9B]">hari streak</span>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#7C6FF7]/25 bg-[#7C6FF7]/8"
          >
            <Star className="w-4 h-4 text-[#7C6FF7]" />
            <span className="text-sm font-bold text-[#7C6FF7]">Lvl {xpInfo.level}</span>
          </motion.div>
        </div>
      </div>

      {/* ── Hero Balance Card ── */}
      <ScrollReveal>
        <motion.div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,111,247,0.20) 0%, rgba(34,211,238,0.10) 60%, rgba(124,111,247,0.05) 100%)",
            border: "1px solid rgba(124,111,247,0.25)"
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#7C6FF7]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#22D3EE]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Left: amount */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm text-[#A8B4CC] font-medium">Total Pengeluaran Bulan Ini</p>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="p-1.5 rounded-lg text-[#6B7A9B] hover:text-white hover:bg-white/8 transition-all"
                >
                  {balanceVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {balanceVisible ? (
                  <motion.p
                    key="visible"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-5xl font-black tracking-tight text-white"
                  >
                    <span className="text-2xl font-semibold text-[#A8B4CC] mr-2">Rp</span>
                    <AnimatedCounter end={monthlySpend} />
                  </motion.p>
                ) : (
                  <motion.p
                    key="hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-4xl font-black tracking-widest text-[#6B7A9B]"
                  >
                    ••••••••
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                {[
                  { label: "Hari ini", val: balanceVisible ? `Rp ${todaySpend.toLocaleString("id-ID")}` : "••••", color: "#F87171", icon: "📅" },
                  { label: "Transaksi", val: monthlyTx.length.toString(), color: "#7C6FF7", icon: "📝" },
                  { label: "Budget sisa", val: balanceVisible ? `${Math.max(0, 100 - budgetUsedPct)}%` : "••", color: "#34D399", icon: "🎯" },
                ].map(({ label, val, color, icon }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/6 rounded-xl px-3 py-2 border border-white/8">
                    <span className="text-sm">{icon}</span>
                    <div>
                      <p className="text-[10px] text-[#6B7A9B]">{label}</p>
                      <p className="text-xs font-bold" style={{ color }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mini chart */}
            <div className="w-full sm:w-48 h-20">
              <p className="text-[10px] text-[#6B7A9B] mb-1 text-right">7 hari terakhir</p>
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={weeklyChart}>
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C6FF7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7C6FF7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" hide />
                  <Tooltip
                    contentStyle={{ background: "#141B35", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
                    formatter={(v) => [`${Number(v ?? 0)}K`, "Pengeluaran"]}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#7C6FF7" strokeWidth={2.5} fill="url(#heroGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pengeluaran Hari Ini" value={todaySpend} prefix="Rp " change={`${todayTx.length} transaksi`} positive={false} color="#F87171" icon="💸" delay={0} />
        <StatCard label="Budget Terpakai" value={budgetUsedPct} suffix="%" change={budgetUsedPct < 80 ? "Aman" : "Waspada!"} positive={budgetUsedPct < 80} color={budgetUsedPct > 80 ? "#F87171" : "#FBBF24"} icon="📊" delay={0.05} />
        <StatCard label="Total XP" value={store.totalXP} suffix=" XP" change={`Level ${xpInfo.level}`} positive={true} color="#7C6FF7" icon="⚡" delay={0.1} />
        <StatCard label="Streak" value={store.streak} suffix=" 🔥" change="Keep it up!" positive={true} color="#FBBF24" icon="🏆" delay={0.15} />
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Transactions */}
        <ScrollReveal direction="left" className="lg:col-span-2">
          <GlassCard className="p-5 border border-white/8 h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#7C6FF7]/15 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#7C6FF7]" />
                </div>
                <h2 className="font-bold text-base">Transaksi Terbaru</h2>
              </div>
              <Link href="/dashboard/expenses" className="text-xs text-[#7C6FF7] hover:text-[#a78bfa] transition-colors flex items-center gap-1 font-medium">
                Lihat semua <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-1">
              {recentTx.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#7C6FF7]/10 flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-[#7C6FF7]/60" />
                  </div>
                  <p className="text-[#A8B4CC] text-sm font-medium">Belum ada transaksi</p>
                  <p className="text-[#6B7A9B] text-xs mt-1">Klik tombol + untuk mulai mencatat pengeluaranmu</p>
                </div>
              ) : (
                recentTx.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg transition-transform group-hover:scale-105"
                      style={{ background: `${tx.color}20` }}
                    >
                      {tx.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-white">{tx.label}</p>
                      <p className="text-xs text-[#6B7A9B]">{tx.category} · {tx.dateLabel}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#F87171]">
                        -Rp {tx.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {recentTx.length > 0 && (
              <Link href="/dashboard/expenses">
                <motion.div
                  whileHover={{ backgroundColor: "rgba(124,111,247,0.08)" }}
                  className="mt-3 py-2.5 text-center text-xs text-[#7C6FF7] font-medium rounded-xl border border-[#7C6FF7]/15 cursor-pointer transition-all"
                >
                  Lihat semua {store.transactions.length} transaksi →
                </motion.div>
              </Link>
            )}
          </GlassCard>
        </ScrollReveal>

        {/* Right Column */}
        <div className="space-y-4">

          {/* XP Level Card */}
          <ScrollReveal direction="right">
            <motion.div
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(124,111,247,0.10) 100%)",
                border: "1px solid rgba(251,191,36,0.20)"
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FBBF24]/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FBBF24] to-[#F97316] flex items-center justify-center shadow-lg shadow-[#FBBF24]/20 text-base font-black text-white">
                      {xpInfo.level}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Level {xpInfo.level}</p>
                      <p className="text-[10px] text-[#FBBF24]">{xpInfo.title}</p>
                    </div>
                  </div>
                  <Star className="w-4 h-4 text-[#FBBF24]" />
                </div>

                <div className="mb-2">
                  <div className="flex justify-between text-[10px] text-[#6B7A9B] mb-1.5">
                    <span>{xpInfo.xpInLevel.toLocaleString()} XP</span>
                    <span>{xpInfo.xpNeeded.toLocaleString()} XP</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpInfo.pct}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: "linear-gradient(90deg, #FBBF24, #7C6FF7)" }}
                    >
                      <div className="absolute inset-0 shimmer" />
                    </motion.div>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7A9B]">
                  {(xpInfo.xpNeeded - xpInfo.xpInLevel).toLocaleString()} XP lagi ke Level {xpInfo.level + 1}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Budget Overview */}
          <ScrollReveal direction="right" delay={0.05}>
            <GlassCard className="p-5 border border-white/8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#34D399]/15 flex items-center justify-center">
                    <Target className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <h2 className="font-bold text-sm">Budget Bulan Ini</h2>
                </div>
                <Link href="/dashboard/budgets" className="text-[10px] text-[#7C6FF7] hover:text-[#a78bfa]">Kelola →</Link>
              </div>

              {budgetItems.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-xs text-[#6B7A9B]">Belum ada budget</p>
                  <Link href="/dashboard/budgets" className="text-xs text-[#7C6FF7] font-medium">+ Buat budget sekarang</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {budgetItems.map((b) => {
                    const pct = b.allocated > 0 ? Math.min(Math.round((b.spent / b.allocated) * 100), 100) : 0;
                    const over = pct > 80;
                    return (
                      <div key={b.id}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#A8B4CC] truncate pr-2 font-medium">{b.label}</span>
                          <span className="font-bold shrink-0" style={{ color: over ? "#F87171" : b.color }}>
                            {pct}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: over ? "#F87171" : `linear-gradient(90deg, ${b.color}cc, ${b.color})` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </GlassCard>
          </ScrollReveal>

          {/* Category Breakdown */}
          {categoryData.length > 0 && (
            <ScrollReveal direction="right" delay={0.1}>
              <GlassCard className="p-5 border border-white/8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#22D3EE]/15 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <h2 className="font-bold text-sm">Kategori Terbesar</h2>
                </div>
                <div className="space-y-2">
                  {categoryData.map(({ name, value, color }) => {
                    const total = categoryData.reduce((s, c) => s + c.value, 0);
                    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                    return (
                      <div key={name} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-xs text-[#A8B4CC] truncate flex-1">{name}</span>
                        <span className="text-xs font-bold text-white shrink-0">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </ScrollReveal>
          )}

          {/* AI Buddy */}
          <ScrollReveal direction="right" delay={0.15}>
            <motion.div
              whileHover={{ borderColor: "rgba(34,211,238,0.3)" }}
              className="rounded-2xl p-5 border border-[#22D3EE]/15 transition-all cursor-pointer"
              style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(124,111,247,0.06) 100%)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#7C6FF7] flex items-center justify-center shadow-lg shadow-[#22D3EE]/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#22D3EE]">AI Buddy</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                    <span className="text-[10px] text-[#6B7A9B]">Online & siap membantu</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#A8B4CC] leading-relaxed mb-3">
                {store.transactions.length > 0
                  ? `💡 Kamu sudah catat ${store.transactions.length} transaksi. Pengeluaran terbesar: ${Object.entries(getSpentByCategory(monthlyTx)).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—"}.`
                  : "👋 Hai! Mulai catat pengeluaran pertamamu dengan tombol + di bawah!"}
              </p>
              <Link href="/dashboard/ai-buddy" className="flex items-center gap-1 text-xs text-[#22D3EE] hover:text-[#a78bfa] font-medium transition-colors">
                <Sparkles className="w-3 h-3" />
                Chat dengan AI Buddy →
              </Link>
            </motion.div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
