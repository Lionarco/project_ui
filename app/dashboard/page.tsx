"use client";
import { motion } from "framer-motion";
import {
  ArrowUp, ArrowDown, Zap, Flame, Star, Bot, Eye, EyeOff, TrendingUp,
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

// Build last-7-days spending chart data
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

function StatCard({ label, value, prefix, suffix, change, positive, color, delay }: {
  label: string; value: number; prefix?: string; suffix?: string;
  change: string; positive: boolean; color: string; delay: number;
}) {
  return (
    <ScrollReveal delay={delay}>
      <GlassCard hover className="p-5 border border-white/5">
        <p className="text-xs text-gray-500 mb-3 font-medium">{label}</p>
        <p className="text-2xl font-black mb-2" style={{ color }}>
          {prefix}<AnimatedCounter end={value} />{suffix}
        </p>
        <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
          {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change}
        </div>
      </GlassCard>
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

  // Derived stats from real store data
  const monthlyTx = getThisMonthTransactions(store.transactions);
  const todayTx = getTodayTransactions(store.transactions);
  const monthlySpend = monthlyTx.reduce((s, tx) => s + tx.amount, 0);
  const todaySpend = todayTx.reduce((s, tx) => s + tx.amount, 0);
  const spentByCategory = getSpentByCategory(monthlyTx);
  const xpInfo = getXPInfo(store.totalXP);
  const weeklyChart = buildWeeklyChart(store.transactions);
  const recentTx = store.transactions.slice(0, 6);

  // Budget usage
  const budgetItems = store.budgets.slice(0, 4).map((b) => ({
    ...b,
    spent: spentByCategory[b.label] ?? 0,
  }));
  const totalBudget = store.budgets.reduce((s, b) => s + b.allocated, 0);
  const budgetUsedPct = totalBudget > 0 ? Math.round((monthlySpend / totalBudget) * 100) : 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning ☀️" : hour < 17 ? "Good afternoon 👋" : "Good evening 🌙";

  return (
    <div className="space-y-6 max-w-7xl page-fade">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <p className="text-gray-400 text-sm">{greeting}</p>
          <h1 className="text-2xl font-black mt-0.5">{userName}&apos;s Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 border border-[#F59E0B]/20">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-sm font-semibold text-[#F59E0B]">{store.streak}</span>
          <span className="text-xs text-gray-500">day streak</span>
        </div>
      </div>

      {/* Balance Hero Card */}
      <ScrollReveal>
        <GlassCard
          className="p-6 border border-white/8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(108,93,211,0.15) 0%, rgba(6,182,212,0.08) 100%)" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C5DD3]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 font-medium">Total Pengeluaran Bulan Ini</p>
            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
              {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-end gap-4 mb-4">
            <div>
              <p className="text-4xl font-black tracking-tight">
                {balanceVisible ? (
                  <>
                    <span className="text-2xl font-semibold text-gray-300 mr-1">Rp</span>
                    <AnimatedCounter end={monthlySpend} />
                  </>
                ) : (
                  <span className="tracking-widest text-gray-400">••••••••</span>
                )}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs text-gray-400 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
                  {monthlyTx.length} transaksi bulan ini
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-32 ml-auto">
              <ResponsiveContainer width="100%" height={56}>
                <AreaChart data={weeklyChart}>
                  <defs>
                    <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C5DD3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6C5DD3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="amount" stroke="#6C5DD3" strokeWidth={2} fill="url(#balanceGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
            {[
              { label: "Hari Ini", val: balanceVisible ? `Rp ${todaySpend.toLocaleString("id-ID")}` : "••••", color: "#EF4444" },
              { label: "Transaksi", val: `${store.transactions.length}`, color: "#6C5DD3" },
              { label: "Budget Tersisa", val: balanceVisible ? `${Math.max(0, 100 - budgetUsedPct)}%` : "••", color: "#22C55E" },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-bold" style={{ color }}>{val}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pengeluaran Hari Ini" value={todaySpend} prefix="Rp " change={`${todayTx.length} transaksi`} positive={false} color="#EF4444" delay={0} />
        <StatCard label="Budget Terpakai" value={budgetUsedPct} suffix="%" change={`dari total budget`} positive={budgetUsedPct < 80} color={budgetUsedPct > 80 ? "#EF4444" : "#F59E0B"} delay={0.05} />
        <StatCard label="XP Earned" value={store.totalXP} suffix=" XP" change={`Level ${xpInfo.level}`} positive={true} color="#6C5DD3" delay={0.1} />
        <StatCard label="Days Streak" value={store.streak} suffix=" 🔥" change="Keep it up!" positive={true} color="#F59E0B" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <ScrollReveal direction="left" className="lg:col-span-2">
          <GlassCard className="p-5 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg">Transaksi Terbaru</h2>
              <Link href="/dashboard/expenses" className="text-xs text-[#6C5DD3] hover:text-[#a78bfa] transition-colors">
                Lihat semua →
              </Link>
            </div>

            <div className="space-y-1">
              {recentTx.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 text-sm">Belum ada transaksi</p>
                  <p className="text-gray-600 text-xs mt-1">Klik tombol + untuk tambah pengeluaran</p>
                </div>
              ) : (
                recentTx.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg"
                      style={{ background: `${tx.color}20` }}>
                      {tx.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tx.label}</p>
                      <p className="text-xs text-gray-500">{tx.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[#EF4444]">
                        Rp {tx.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-500">{tx.dateLabel}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Right column */}
        <div className="space-y-4">
          {/* Budget Overview */}
          <ScrollReveal direction="right">
            <GlassCard className="p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Budget Bulan Ini</h2>
                <TrendingUp className="w-4 h-4 text-[#6C5DD3]" />
              </div>
              <div className="space-y-3">
                {budgetItems.map((b) => {
                  const pct = b.allocated > 0 ? Math.min(Math.round((b.spent / b.allocated) * 100), 100) : 0;
                  return (
                    <div key={b.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 truncate pr-2">{b.label}</span>
                        <span className="font-medium shrink-0" style={{ color: pct > 80 ? "#EF4444" : b.color }}>
                          {pct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ background: pct > 80 ? "#EF4444" : b.color }}
                        />
                      </div>
                    </div>
                  );
                })}
                {budgetItems.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">Belum ada budget</p>
                )}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* AI Buddy Card */}
          <ScrollReveal direction="right" delay={0.1}>
            <GlassCard className="p-5 border border-[#06B6D4]/20" style={{ background: "rgba(6,182,212,0.04)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#06B6D4]">AI Buddy</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[10px] text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                {store.transactions.length > 0
                  ? `💡 Kamu sudah catat ${store.transactions.length} transaksi. Pengeluaran terbesar bulan ini: ${Object.entries(getSpentByCategory(monthlyTx)).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "belum ada"}.`
                  : "👋 Halo! Mulai catat pengeluaran pertamamu dengan tombol + di bawah!"}
              </p>
              <Link href="/dashboard/ai-buddy" className="text-xs text-[#06B6D4] hover:text-[#a78bfa] transition-colors font-medium">
                Chat dengan AI Buddy →
              </Link>
            </GlassCard>
          </ScrollReveal>

          {/* Level Progress */}
          <ScrollReveal direction="right" delay={0.2}>
            <GlassCard className="p-5 border border-[#F59E0B]/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-sm font-bold">Level {xpInfo.level}</span>
                </div>
                <span className="text-xs text-gray-500">{xpInfo.xpInLevel.toLocaleString()} / {xpInfo.xpNeeded.toLocaleString()} XP</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpInfo.pct}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ background: "linear-gradient(90deg, #F59E0B, #6C5DD3)" }}
                >
                  <div className="absolute inset-0 shimmer" />
                </motion.div>
              </div>
              <p className="text-xs text-gray-500">
                {(xpInfo.xpNeeded - xpInfo.xpInLevel).toLocaleString()} XP lagi ke Level {xpInfo.level + 1} ·{" "}
                <span className="text-[#F59E0B]">{xpInfo.title}</span>
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
