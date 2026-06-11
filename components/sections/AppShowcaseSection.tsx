"use client";
import { motion } from "framer-motion";
import {
  Home,
  Plus,
  List,
  BarChart2,
  User,
  ArrowDown,
  ArrowUp,
  ShoppingBag,
  Coffee,
  Car,
  Wifi,
  Smartphone,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ─── Phone frame component ─── */
function PhoneFrame({
  title,
  delay,
  children,
  accent = "#6C5DD3",
}: {
  title: string;
  delay: number;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="shrink-0 w-56"
    >
      {/* Phone shell */}
      <div
        className="relative rounded-[36px] border-[3px] overflow-hidden shadow-2xl"
        style={{
          borderColor: `${accent}40`,
          background: "#0B1020",
          boxShadow: `0 20px 60px ${accent}20`,
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-5 pt-4 pb-2">
          <span className="text-[9px] text-gray-500">9:41</span>
          <div
            className="w-16 h-4 rounded-full"
            style={{ background: "#0B1020" }}
          />
          <div className="flex gap-1 items-center">
            <Wifi className="w-2.5 h-2.5 text-gray-500" />
            <Smartphone className="w-2.5 h-2.5 text-gray-500" />
          </div>
        </div>

        {/* Content */}
        <div className="px-3 pb-4 min-h-[440px]">{children}</div>

        {/* Bottom nav */}
        <div className="px-3 pb-4 flex justify-around border-t border-white/5 pt-2">
          {[Home, Plus, BarChart2, User].map((Icon, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl ${i === 1 ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED]" : ""}`}
            >
              <Icon
                className={`w-4 h-4 ${i === 1 ? "text-white" : "text-gray-600"}`}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-3">{title}</p>
    </motion.div>
  );
}

/* ─── Screen contents ─── */
function HomeScreen() {
  return (
    <div>
      <div className="mb-3">
        <p className="text-[10px] text-gray-500">Hello, Ardi! 👋</p>
        <p className="text-sm font-bold">Total Saldo</p>
        <p className="text-xl font-black gradient-text">Rp 5.630.000</p>
      </div>
      <div className="glass rounded-2xl p-3 mb-3 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-gray-400">Budget Bulan Ini</span>
          <span className="text-[10px] text-[#22C55E]">72%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#6C5DD3] to-[#06B6D4]" />
        </div>
      </div>
      {[
        { icon: ShoppingBag, label: "Belanja", val: "-Rp 125K", color: "#6C5DD3" },
        { icon: Coffee, label: "Kopi", val: "-Rp 28K", color: "#F59E0B" },
        { icon: Car, label: "Transport", val: "-Rp 42K", color: "#06B6D4" },
      ].map(({ icon: Icon, label, val, color }) => (
        <div key={label} className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
              <Icon className="w-3 h-3" style={{ color }} />
            </div>
            <span className="text-[10px] text-gray-400">{label}</span>
          </div>
          <span className="text-[10px] text-red-400">{val}</span>
        </div>
      ))}
    </div>
  );
}

function AddExpenseScreen() {
  return (
    <div>
      <p className="text-sm font-bold mb-4">Catat Pengeluaran</p>
      <p className="text-[10px] text-gray-500 mb-2">Pilih Kategori</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: ShoppingBag, label: "Makanan", color: "#6C5DD3" },
          { icon: Car, label: "Transport", color: "#06B6D4" },
          { icon: Coffee, label: "Belanja", color: "#22C55E" },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="glass rounded-xl p-2 flex flex-col items-center gap-1 border border-white/5"
          >
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
              <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <span className="text-[9px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-500 mb-1">Nominal</p>
      <div className="glass rounded-xl p-2 mb-1 border border-[#6C5DD3]/30 text-center">
        <span className="text-lg font-bold">Rp 25.000</span>
      </div>
      <div className="mt-4 rounded-xl py-2 text-center text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #6C5DD3, #7C3AED)" }}>
        Simpan
      </div>
    </div>
  );
}

function TransactionScreen() {
  const txns = [
    { icon: Coffee, label: "Kopi Kenangan", date: "Hari ini", val: "-Rp 28.000", color: "#F59E0B", neg: true },
    { icon: ArrowUp, label: "Gaji", date: "1 Mar 2024", val: "+Rp 5.000.000", color: "#22C55E", neg: false },
    { icon: ShoppingBag, label: "Alfamart", date: "Jan, 18:46", val: "-Rp 42.000", color: "#6C5DD3", neg: true },
    { icon: Wifi, label: "Netflix", date: "30 Apr 2024", val: "-Rp 54.000", color: "#7C3AED", neg: true },
  ];
  return (
    <div>
      <p className="text-sm font-bold mb-3">Transaksi</p>
      <div className="glass rounded-xl p-2 mb-3 border border-white/5 text-[10px] text-gray-400 text-center">🔍 Cari transaksi...</div>
      <div className="space-y-2">
        {txns.map(({ icon: Icon, label, date, val, color, neg }) => (
          <div key={label} className="flex items-center gap-2 py-1">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
              <Icon className="w-3 h-3" style={{ color }} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium">{label}</p>
              <p className="text-[9px] text-gray-500">{date}</p>
            </div>
            <span className={`text-[10px] font-bold ${neg ? "text-red-400" : "text-[#22C55E]"}`}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightScreen() {
  const bars = [65, 80, 45, 90, 55, 70];
  return (
    <div>
      <p className="text-sm font-bold mb-1">Insight</p>
      <p className="text-[10px] text-gray-500 mb-3">Total Pengeluaran</p>
      <p className="text-xl font-black mb-0.5">Rp 2.430.000</p>
      <p className="text-[10px] text-red-400 mb-3">+12% dari bulan lalu</p>
      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-14 mb-3">
        {bars.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${v}%`,
              background: i === 3
                ? "linear-gradient(to top, #6C5DD3, #06B6D4)"
                : "rgba(108,93,211,0.3)",
            }}
          />
        ))}
      </div>
      {/* Categories */}
      {[
        { label: "Makanan", pct: 45, color: "#6C5DD3" },
        { label: "Transport", pct: 25, color: "#06B6D4" },
        { label: "Belanja", pct: 20, color: "#22C55E" },
        { label: "Lainnya", pct: 10, color: "#F59E0B" },
      ].map(({ label, pct, color }) => (
        <div key={label} className="flex items-center gap-2 py-0.5">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          <div className="flex-1 h-1.5 rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
          </div>
          <span className="text-[9px] text-gray-500">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen() {
  return (
    <div>
      <div className="flex flex-col items-center mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-lg font-bold mb-2">
          A
        </div>
        <p className="text-sm font-bold">Ardiansyah</p>
        <p className="text-[10px] text-[#6C5DD3]">Financial Warrior</p>
      </div>
      {/* Level */}
      <div className="glass rounded-xl p-2 mb-3 border border-white/5">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-gray-400">Level 12</span>
          <span className="text-gray-500">1.360 / 2.000 XP</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#F59E0B] to-[#6C5DD3]" />
        </div>
      </div>
      {/* Badges */}
      <p className="text-[10px] text-gray-500 mb-2">Achievements</p>
      <div className="grid grid-cols-4 gap-1.5">
        {["🏆","🔥","💰","⚡","🎯","🌟","💎","🚀"].map((em, i) => (
          <div
            key={i}
            className={`aspect-square rounded-xl flex items-center justify-center text-base ${i < 5 ? "glass border border-[#6C5DD3]/30" : "bg-white/5 opacity-40"}`}
          >
            {em}
          </div>
        ))}
      </div>
    </div>
  );
}

const screens = [
  { title: "Home Dashboard", Component: HomeScreen, delay: 0, accent: "#6C5DD3" },
  { title: "Quick Add Expense", Component: AddExpenseScreen, delay: 0.5, accent: "#22C55E" },
  { title: "Transaction History", Component: TransactionScreen, delay: 1, accent: "#F59E0B" },
  { title: "Insights Analytics", Component: InsightScreen, delay: 1.5, accent: "#06B6D4" },
  { title: "Profile & Achievements", Component: ProfileScreen, delay: 2, accent: "#7C3AED" },
];

export default function AppShowcaseSection() {
  return (
    <section
      id="app-showcase"
      className="section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0B1020 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <Smartphone className="w-3.5 h-3.5 text-[#6C5DD3]" />
            <span className="text-xs font-medium text-gray-400">App Screens</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Beautiful on Every
            <br />
            <span className="gradient-text">Screen</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Designed for iOS and Android. Clean, intuitive, and blazingly fast.
          </p>
        </ScrollReveal>

        {/* Horizontal scroll */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0A0F1E] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0A0F1E] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 px-4">
            <div className="flex gap-6 mx-auto">
              {screens.map(({ title, Component, delay, accent }) => (
                <PhoneFrame key={title} title={title} delay={delay} accent={accent}>
                  <Component />
                </PhoneFrame>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
