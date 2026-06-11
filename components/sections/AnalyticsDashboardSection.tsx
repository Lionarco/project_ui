"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { BarChart2, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const monthlyData = [
  { month: "Jan", income: 5000, expense: 3200 },
  { month: "Feb", income: 5000, expense: 2800 },
  { month: "Mar", income: 5500, expense: 3600 },
  { month: "Apr", income: 5000, expense: 3100 },
  { month: "May", income: 6000, expense: 3900 },
  { month: "Jun", income: 5000, expense: 2430 },
];

const categoryData = [
  { name: "Food", value: 45, color: "#6C5DD3" },
  { name: "Transport", value: 25, color: "#06B6D4" },
  { name: "Shopping", value: 20, color: "#22C55E" },
  { name: "Bills", value: 7, color: "#F59E0B" },
  { name: "Other", value: 3, color: "#7C3AED" },
];

const trendData = [
  { week: "W1", amount: 420 },
  { week: "W2", amount: 580 },
  { week: "W3", amount: 380 },
  { week: "W4", amount: 650 },
  { week: "W5", amount: 430 },
  { week: "W6", amount: 760 },
  { week: "W7", amount: 520 },
  { week: "W8", amount: 490 },
];

const budgets = [
  { cat: "Food & Drinks", spent: 1260, total: 1500, color: "#6C5DD3" },
  { cat: "Transport", spent: 680, total: 800, color: "#06B6D4" },
  { cat: "Shopping", spent: 490, total: 600, color: "#22C55E" },
  { cat: "Entertainment", spent: 120, total: 300, color: "#F59E0B" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-white/10 text-xs">
        <p className="text-gray-400 mb-1 font-medium">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="font-semibold" style={{ color: p.name === "expense" ? "#EF4444" : "#22C55E" }}>
            {p.name}: Rp {p.value.toLocaleString()}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsDashboardSection() {
  return (
    <section
      id="analytics"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1020 0%, #0A0F1E 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <BarChart2 className="w-3.5 h-3.5 text-[#6C5DD3]" />
            <span className="text-xs font-medium text-gray-400">Analytics Dashboard</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Your Money,
            <br />
            <span className="gradient-text">Visualized</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Beautiful, interactive charts that transform complex financial data
            into actionable clarity.
          </p>
        </ScrollReveal>

        {/* Top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Income", value: 5000, prefix: "Rp ", suffix: "K", color: "#22C55E", trend: "+12%" },
            { label: "Total Expense", value: 2430, prefix: "Rp ", suffix: "K", color: "#EF4444", trend: "-8%" },
            { label: "Net Savings", value: 2570, prefix: "Rp ", suffix: "K", color: "#6C5DD3", trend: "+35%" },
            { label: "Budget Used", value: 72, suffix: "%", color: "#F59E0B", trend: "28% left" },
          ].map(({ label, value, prefix = "", suffix = "", color, trend }) => (
            <ScrollReveal key={label}>
              <GlassCard className="p-4 border border-white/5 hover:border-[#6C5DD3]/20 transition-all">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-xl font-black" style={{ color }}>
                  <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{trend}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar chart — income vs expense */}
          <ScrollReveal direction="up" className="lg:col-span-2">
            <GlassCard className="p-5 border border-white/5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold">Income vs Expense</h3>
                  <p className="text-xs text-gray-500">Last 6 months</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    <span className="text-gray-400">Income</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="text-gray-400">Expense</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="expense" fill="#6C5DD3" radius={[6, 6, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </ScrollReveal>

          {/* Donut chart — categories */}
          <ScrollReveal direction="right">
            <GlassCard className="p-5 border border-white/5">
              <h3 className="font-bold mb-1">Spending by Category</h3>
              <p className="text-xs text-gray-500 mb-4">June 2024</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Share"]}
                    contentStyle={{ background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-gray-400">{item.name}</span>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Area chart — weekly trend */}
          <ScrollReveal direction="left">
            <GlassCard className="p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#06B6D4]" />
                <h3 className="font-bold">Weekly Spending Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C5DD3" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6C5DD3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="week" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v) => [`Rp ${v}K`, "Spending"]}
                    contentStyle={{ background: "rgba(11,16,32,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#6C5DD3" strokeWidth={2} fill="url(#trendGrad)" dot={{ fill: "#6C5DD3", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </ScrollReveal>

          {/* Budget progress */}
          <ScrollReveal direction="up" className="lg:col-span-2">
            <GlassCard className="p-5 border border-white/5">
              <h3 className="font-bold mb-5">Budget Progress</h3>
              <div className="space-y-4">
                {budgets.map((b) => {
                  const pct = Math.round((b.spent / b.total) * 100);
                  return (
                    <div key={b.cat}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-gray-300">{b.cat}</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold" style={{ color: b.color }}>
                            Rp {b.spent.toLocaleString()}K
                          </span>
                          <span className="text-xs text-gray-500"> / Rp {b.total.toLocaleString()}K</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: b.color }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{pct}% of budget used</div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
