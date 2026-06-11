"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, LineChart, Line, Legend,
} from "recharts";
import { BarChart2, Calendar } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";

const monthlyData = [
  { month: "Jan", income: 5000, expense: 3200, saving: 1800 },
  { month: "Feb", income: 5000, expense: 2800, saving: 2200 },
  { month: "Mar", income: 5500, expense: 3600, saving: 1900 },
  { month: "Apr", income: 5000, expense: 3100, saving: 1900 },
  { month: "May", income: 6000, expense: 3900, saving: 2100 },
  { month: "Jun", income: 5000, expense: 2430, saving: 2570 },
];

const categoryData = [
  { name: "Food", value: 45, color: "#6C5DD3", amount: 1093500 },
  { name: "Transport", value: 25, color: "#06B6D4", amount: 607500 },
  { name: "Shopping", value: 20, color: "#22C55E", amount: 486000 },
  { name: "Bills", value: 7, color: "#F59E0B", amount: 170100 },
  { name: "Other", value: 3, color: "#7C3AED", amount: 72900 },
];

const weeklyTrend = [
  { week: "W1", amount: 420, prev: 380 },
  { week: "W2", amount: 580, prev: 520 },
  { week: "W3", amount: 380, prev: 450 },
  { week: "W4", amount: 650, prev: 490 },
];

const dailyData = [
  { day: "Mon", amount: 85 },
  { day: "Tue", amount: 145 },
  { day: "Wed", amount: 65 },
  { day: "Thu", amount: 195 },
  { day: "Fri", amount: 110 },
  { day: "Sat", amount: 225 },
  { day: "Sun", amount: 75 },
];

type Period = "weekly" | "monthly" | "yearly";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-white/10 text-xs shadow-xl">
        <p className="text-gray-400 mb-2 font-semibold">{label}</p>
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

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Analytics</h1>
          <p className="text-sm text-gray-400 mt-0.5">Deep insights into your spending patterns</p>
        </div>
        <div className="flex items-center gap-1 glass rounded-xl p-1 border border-white/8 w-fit">
          {(["weekly", "monthly", "yearly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                period === p
                  ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Income", val: 5000, prefix: "Rp ", suffix: "K", color: "#22C55E", change: "+12%" },
          { label: "Total Expense", val: 2430, prefix: "Rp ", suffix: "K", color: "#EF4444", change: "-8%" },
          { label: "Net Savings", val: 2570, prefix: "Rp ", suffix: "K", color: "#6C5DD3", change: "+35%" },
          { label: "Savings Rate", val: 51, suffix: "%", color: "#F59E0B", change: "+6pts" },
        ].map(({ label, val, prefix = "", suffix = "", color, change }) => (
          <GlassCard key={label} className="p-4 border border-white/5">
            <p className="text-xs text-gray-500 mb-2">{label}</p>
            <p className="text-xl font-black mb-1" style={{ color }}>
              {prefix}<AnimatedCounter end={val} />{suffix}
            </p>
            <p className="text-xs text-gray-500">{change} vs last month</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main bar chart */}
        <GlassCard className="p-5 border border-white/5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold">Income vs Expense</h3>
              <p className="text-xs text-gray-500">Last 6 months (in thousands)</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                <span className="text-gray-400">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6C5DD3]" />
                <span className="text-gray-400">Expense</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} maxBarSize={28} name="Income" />
              <Bar dataKey="expense" fill="#6C5DD3" radius={[6, 6, 0, 0]} maxBarSize={28} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Donut chart */}
        <GlassCard className="p-5 border border-white/5">
          <h3 className="font-bold mb-1">By Category</h3>
          <p className="text-xs text-gray-500 mb-3">June 2024 breakdown</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`, "Share"]}
                contentStyle={{ background: "rgba(11,16,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
                  <span className="text-gray-600 ml-1">· Rp {(item.amount / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Area trend */}
        <GlassCard className="p-5 border border-white/5">
          <h3 className="font-bold mb-1">Savings Trend</h3>
          <p className="text-xs text-gray-500 mb-4">Income minus expense over time</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`Rp ${v}K`, "Savings"]}
                contentStyle={{ background: "rgba(11,16,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
              />
              <Area type="monotone" dataKey="saving" stroke="#22C55E" strokeWidth={2} fill="url(#savingsGrad)" dot={{ fill: "#22C55E", r: 3 }} name="Savings" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Weekly comparison */}
        <GlassCard className="p-5 border border-white/5">
          <h3 className="font-bold mb-1">Weekly Comparison</h3>
          <p className="text-xs text-gray-500 mb-4">This month vs last month</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`Rp ${v}K`, ""]}
                contentStyle={{ background: "rgba(11,16,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: 11 }}
              />
              <Line type="monotone" dataKey="amount" stroke="#6C5DD3" strokeWidth={2} dot={{ fill: "#6C5DD3", r: 3 }} name="This month" />
              <Line type="monotone" dataKey="prev" stroke="#374151" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Last month" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Daily heatmap-style */}
        <GlassCard className="p-5 border border-white/5">
          <h3 className="font-bold mb-1">Daily Spending</h3>
          <p className="text-xs text-gray-500 mb-4">This week breakdown</p>
          <div className="space-y-2">
            {dailyData.map((d) => {
              const maxVal = Math.max(...dailyData.map((x) => x.amount));
              const pct = (d.amount / maxVal) * 100;
              return (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-7">{d.day}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-lg overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, #6C5DD3, #06B6D4)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-300 w-14 text-right">
                    Rp {d.amount}K
                  </span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Insights panel */}
      <GlassCard className="p-5 border border-[#6C5DD3]/20" style={{ background: "rgba(108,93,211,0.05)" }}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-[#6C5DD3]" />
          <h3 className="font-bold">Key Insights</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📉", title: "Biggest Drop", desc: "Food spending down 15% vs last month. Great discipline!", color: "#22C55E" },
            { icon: "📈", title: "Highest Day", desc: "Saturday is your most expensive day (Rp 225K avg)", color: "#F59E0B" },
            { icon: "💡", title: "Saving Opportunity", desc: "Reduce coffee budget by 30% = Rp 60K/month extra savings", color: "#06B6D4" },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="flex gap-3">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color }}>{title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
