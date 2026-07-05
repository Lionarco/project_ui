"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area,
} from "recharts";
import { BarChart2, TrendingUp, ShoppingBag, AlertCircle } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useStore, getThisMonthTransactions, getTodayTransactions, getSpentByCategory, CATEGORY_META } from "@/lib/store";
import Link from "next/link";

// ─── Data builders from real store ──────────────────────────────────────────

function buildMonthlyExpenseChart(transactions: ReturnType<typeof useStore>["transactions"]) {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];
  const now = new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthTx = transactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return txDate.getMonth() === d.getMonth() && txDate.getFullYear() === d.getFullYear();
    });
    result.push({
      month: months[d.getMonth()],
      expense: Math.round(monthTx.reduce((s, tx) => s + tx.amount, 0) / 1000),
    });
  }
  return result;
}

function buildWeeklyChart(transactions: ReturnType<typeof useStore>["transactions"]) {
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const result = [];
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

function buildCategoryChart(transactions: ReturnType<typeof useStore>["transactions"]) {
  const spent = getSpentByCategory(transactions);
  const total = Object.values(spent).reduce((s, v) => s + v, 0);
  const COLORS = ["#7C6FF7", "#22D3EE", "#34D399", "#FBBF24", "#F87171", "#A78BFA", "#F472B6", "#94A3B8"];
  return Object.entries(spent)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, amount], i) => ({
      name,
      value: total > 0 ? Math.round((amount / total) * 100) : 0,
      amount,
      color: CATEGORY_META[name]?.color ?? COLORS[i],
    }));
}

const CustomTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-white/10 text-xs shadow-xl">
        <p className="text-[#A8B4CC] mb-2 font-semibold">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="font-semibold" style={{ color: p.color }}>
            {p.name}: Rp {p.value.toLocaleString()}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyAnalytics() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5">
      <div className="w-24 h-24 rounded-3xl bg-[#7C6FF7]/12 flex items-center justify-center text-5xl">
        📊
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-white mb-2">Belum ada data analitik</p>
        <p className="text-sm text-[#A8B4CC] max-w-xs">
          Tambahkan beberapa pengeluaran terlebih dahulu untuk melihat analisis mendalam keuanganmu.
        </p>
      </div>
      <Link href="/dashboard/expenses">
        <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] text-sm font-bold text-white shadow-lg shadow-[#7C6FF7]/25 cursor-pointer hover:opacity-90 transition-opacity">
          + Tambah Pengeluaran Pertama
        </div>
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const store = useStore();

  const monthlyTx = getThisMonthTransactions(store.transactions);
  const todayTx = getTodayTransactions(store.transactions);
  const monthlySpend = monthlyTx.reduce((s, tx) => s + tx.amount, 0);
  const todaySpend = todayTx.reduce((s, tx) => s + tx.amount, 0);

  // Charts from real data
  const monthlyChart = buildMonthlyExpenseChart(store.transactions);
  const weeklyChart = buildWeeklyChart(store.transactions);
  const categoryChart = buildCategoryChart(monthlyTx.length > 0 ? monthlyTx : store.transactions);

  // Derived stats
  const dailyAvg = monthlyTx.length > 0
    ? Math.round(monthlySpend / new Date().getDate())
    : 0;
  const biggestCategory = categoryChart[0];
  const totalBudget = store.budgets.reduce((s, b) => s + b.allocated, 0);
  const budgetLeft = Math.max(0, totalBudget - monthlySpend);

  const hasData = store.transactions.length > 0;

  return (
    <div className="space-y-6 max-w-6xl page-fade">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">
            <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-sm text-[#A8B4CC] mt-1">Analisis mendalam pola pengeluaranmu</p>
        </div>
      </div>

      {/* Empty state */}
      {!hasData ? (
        <GlassCard className="border border-white/8">
          <EmptyAnalytics />
        </GlassCard>
      ) : (
        <>
          {/* KPI Cards — from real store */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Pengeluaran",
                val: Math.round(monthlySpend / 1000),
                prefix: "Rp ", suffix: "K",
                color: "#F87171",
                sub: `${monthlyTx.length} transaksi bulan ini`,
              },
              {
                label: "Pengeluaran Hari Ini",
                val: Math.round(todaySpend / 1000),
                prefix: "Rp ", suffix: "K",
                color: "#FBBF24",
                sub: `${todayTx.length} transaksi`,
              },
              {
                label: "Rata-rata/Hari",
                val: Math.round(dailyAvg / 1000),
                prefix: "Rp ", suffix: "K",
                color: "#7C6FF7",
                sub: "Bulan berjalan",
              },
              {
                label: "Sisa Budget",
                val: Math.round(budgetLeft / 1000),
                prefix: "Rp ", suffix: "K",
                color: budgetLeft > 0 ? "#34D399" : "#F87171",
                sub: totalBudget > 0 ? `dari Rp ${Math.round(totalBudget/1000)}K` : "Belum ada budget",
              },
            ].map(({ label, val, prefix = "", suffix = "", color, sub }) => (
              <div
                key={label}
                className="glass rounded-2xl p-4 border border-white/8 transition-all hover:-translate-y-0.5"
                style={{ borderColor: `${color}18` }}
              >
                <p className="text-xs text-[#6B7A9B] mb-2 font-medium">{label}</p>
                <p className="text-xl font-black mb-1" style={{ color }}>
                  {prefix}<AnimatedCounter end={val} />{suffix}
                </p>
                <p className="text-[10px] text-[#6B7A9B]">{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly expense trend */}
            <GlassCard className="p-5 border border-white/8 lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-white">Tren Pengeluaran</h3>
                  <p className="text-xs text-[#6B7A9B]">6 bulan terakhir (dalam ribuan)</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyChart} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: "#6B7A9B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7A9B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="expense" fill="#7C6FF7" radius={[6, 6, 0, 0]} maxBarSize={36} name="Pengeluaran">
                    {monthlyChart.map((entry, i) => (
                      <Cell key={i} fill={i === monthlyChart.length - 1 ? "#FBBF24" : "#7C6FF7"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Category Donut */}
            <GlassCard className="p-5 border border-white/8">
              <h3 className="font-bold text-white mb-1">Per Kategori</h3>
              <p className="text-xs text-[#6B7A9B] mb-3">
                {monthlyTx.length > 0 ? "Bulan ini" : "Semua waktu"}
              </p>

              {categoryChart.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={categoryChart}
                        cx="50%" cy="50%"
                        innerRadius={45} outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryChart.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v) => [`${v}%`, "Porsi"]}
                        contentStyle={{ background: "rgba(11,16,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-1">
                    {categoryChart.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                          <span className="text-[#A8B4CC] truncate">{item.name}</span>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <span className="font-bold" style={{ color: item.color }}>{item.value}%</span>
                          <span className="text-[#6B7A9B] ml-1">· Rp {Math.round(item.amount / 1000)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-sm text-[#6B7A9B]">
                  Belum ada data kategori
                </div>
              )}
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly area chart */}
            <GlassCard className="p-5 border border-white/8">
              <h3 className="font-bold text-white mb-1">7 Hari Terakhir</h3>
              <p className="text-xs text-[#6B7A9B] mb-4">Pengeluaran harian (ribuan)</p>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={weeklyChart}>
                  <defs>
                    <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C6FF7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#7C6FF7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="day" tick={{ fill: "#6B7A9B", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v) => [`Rp ${Number(v ?? 0)}K`, "Pengeluaran"]}
                    contentStyle={{ background: "rgba(11,16,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#7C6FF7" strokeWidth={2.5} fill="url(#weekGrad)" dot={{ fill: "#7C6FF7", r: 3 }} name="Pengeluaran" />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Daily breakdown bars */}
            <GlassCard className="p-5 border border-white/8">
              <h3 className="font-bold text-white mb-1">Pengeluaran Per Hari</h3>
              <p className="text-xs text-[#6B7A9B] mb-4">Minggu ini</p>
              <div className="space-y-2.5">
                {weeklyChart.map((d) => {
                  const maxVal = Math.max(...weeklyChart.map((x) => x.amount), 1);
                  const pct = (d.amount / maxVal) * 100;
                  return (
                    <div key={d.day} className="flex items-center gap-3">
                      <span className="text-xs text-[#6B7A9B] w-7 shrink-0">{d.day}</span>
                      <div className="flex-1 h-5 bg-white/5 rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: pct === 100
                              ? "linear-gradient(90deg, #F87171, #FBBF24)"
                              : "linear-gradient(90deg, #7C6FF7, #22D3EE)",
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white w-12 text-right shrink-0">
                        {d.amount > 0 ? `${d.amount}K` : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* AI Insights — dynamic based on real data */}
          <div
            className="rounded-3xl p-5 border border-[#7C6FF7]/20 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,111,247,0.08) 0%, rgba(34,211,238,0.05) 100%)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-[#7C6FF7]" />
              <h3 className="font-bold text-white">Insights Keuanganmu</h3>
              <span className="text-[10px] text-[#A8B4CC] ml-1 bg-[#7C6FF7]/15 px-2 py-0.5 rounded-full">Auto</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: biggestCategory ? CATEGORY_META[biggestCategory.name]?.icon ?? "📊" : "📊",
                  title: "Kategori Terbesar",
                  desc: biggestCategory
                    ? `${biggestCategory.name} menyumbang ${biggestCategory.value}% pengeluaran (Rp ${Math.round(biggestCategory.amount / 1000)}K)`
                    : "Belum ada cukup data",
                  color: biggestCategory?.color ?? "#7C6FF7",
                },
                {
                  icon: "📅",
                  title: "Rata-rata Harian",
                  desc: dailyAvg > 0
                    ? `Kamu rata-rata menghabiskan Rp ${dailyAvg.toLocaleString("id-ID")} per hari bulan ini`
                    : "Belum ada transaksi bulan ini",
                  color: "#FBBF24",
                },
                {
                  icon: store.streak > 0 ? "🔥" : "💡",
                  title: store.streak > 0 ? `${store.streak} Hari Streak!` : "Tips Mencatat",
                  desc: store.streak >= 7
                    ? `Luar biasa! Kamu sudah catat ${store.streak} hari berturut-turut. Pertahankan!`
                    : store.streak > 0
                    ? `${store.streak} hari streak! Terus catat setiap hari untuk dapat XP bonus.`
                    : "Catat pengeluaran setiap hari untuk membangun kebiasaan dan dapat XP streak!",
                  color: "#34D399",
                },
              ].map(({ icon, title, desc, color }) => (
                <div key={title} className="flex gap-3">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color }}>{title}</p>
                    <p className="text-xs text-[#A8B4CC] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
