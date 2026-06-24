"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Target, AlertTriangle, TrendingUp, Edit3, Trash2, X, Check,
} from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import GradientButton from "@/components/shared/GradientButton";
import {
  useStore, addBudget, deleteBudget,
  getThisMonthTransactions, getSpentByCategory, CATEGORY_META,
} from "@/lib/store";

const categoryOptions = Object.keys(CATEGORY_META);

export default function BudgetsPage() {
  const store = useStore();
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ label: "", allocated: "" });
  const [saved, setSaved] = useState(false);

  // Real spending per category
  const monthlyTx = getThisMonthTransactions(store.transactions);
  const spentByCategory = getSpentByCategory(monthlyTx);

  const budgets = store.budgets.map((b) => ({
    ...b,
    spent: spentByCategory[b.label] ?? 0,
  }));

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overallPct = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  const handleSave = () => {
    if (!form.label || !form.allocated) return;
    addBudget(form.label, parseInt(form.allocated));
    setForm({ label: "", allocated: "" });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setAddOpen(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl page-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black">Budget <span className="gradient-text">Bulanan</span></h1>
          <p className="text-sm text-[#A8B4CC] mt-1">Kelola batas pengeluaran dan pantau progresmu</p>
        </div>
        <GradientButton variant="primary" size="md" id="add-budget-btn" onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4" />
          Budget Baru
        </GradientButton>
      </div>

      {/* Overall summary */}
      <div
        className="rounded-3xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124,111,247,0.18) 0%, rgba(34,211,238,0.10) 100%)",
          border: "1px solid rgba(124,111,247,0.22)"
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C6FF7]/12 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-sm text-[#A8B4CC] font-medium">Total Budget Terpakai</p>
              <p className="text-4xl font-black mt-1">
                <span style={{ color: overallPct > 80 ? "#F87171" : "#7C6FF7" }}>{overallPct}%</span>
                <span className="text-lg text-[#6B7A9B] font-normal ml-2">digunakan</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#6B7A9B] mb-1">Total Budget</p>
              <p className="text-xl font-bold text-white">Rp {totalAllocated.toLocaleString("id-ID")}</p>
              <p className="text-xs text-[#A8B4CC] mt-1">Rp {totalSpent.toLocaleString("id-ID")} sudah dipakai</p>
            </div>
          </div>

          <div className="h-3.5 rounded-full bg-white/8 overflow-hidden mb-5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(overallPct, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: overallPct > 80
                  ? "linear-gradient(90deg, #FBBF24, #F87171)"
                  : "linear-gradient(90deg, #7C6FF7, #22D3EE)",
              }}
            >
              <div className="absolute inset-0 shimmer" />
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Budget", val: budgets.length, icon: Target, color: "#7C6FF7" },
              { label: "On Track", val: budgets.filter((b) => b.allocated > 0 && b.spent / b.allocated < 0.8).length, icon: TrendingUp, color: "#34D399" },
              { label: "Perlu Perhatian", val: budgets.filter((b) => b.allocated > 0 && b.spent / b.allocated >= 0.8).length, icon: AlertTriangle, color: "#FBBF24" },
            ].map(({ label, val, icon: Icon, color }) => (
              <div key={label} className="text-center bg-white/5 rounded-2xl py-3 border border-white/8">
                <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color }} />
                <p className="text-2xl font-black" style={{ color }}>{val}</p>
                <p className="text-[10px] text-[#6B7A9B] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget cards */}
      {budgets.length === 0 ? (
        <div className="rounded-3xl p-16 border border-white/8 glass text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#7C6FF7]/12 flex items-center justify-center mx-auto mb-5 text-4xl">
            📊
          </div>
          <p className="text-[#A8B4CC] font-semibold text-lg mb-2">Belum ada budget</p>
          <p className="text-[#6B7A9B] text-sm mb-5">Buat budget untuk mulai melacak dan mengontrol pengeluaranmu</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAddOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] text-sm font-bold text-white shadow-lg shadow-[#7C6FF7]/25"
          >
            + Buat Budget Pertama
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((b) => {
            const pct = b.allocated > 0 ? Math.min(Math.round((b.spent / b.allocated) * 100), 100) : 0;
            const remaining = b.allocated - b.spent;
            const overBudget = b.spent > b.allocated;
            const warning = pct >= 80 && !overBudget;
            const meta = CATEGORY_META[b.label] ?? { icon: "📌", color: b.color };
            const statusColor = overBudget ? "#F87171" : warning ? "#FBBF24" : b.color;

            return (
              <motion.div key={b.id} whileHover={{ y: -4, boxShadow: `0 16px 48px ${b.color}18` }} transition={{ duration: 0.2 }}>
                <div
                  className="rounded-2xl p-5 border group transition-all"
                  style={{ background: `${b.color}08`, borderColor: `${b.color}20` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                        style={{ background: `${b.color}20` }}>
                        {meta.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{b.label}</p>
                        <p className="text-[10px] text-[#6B7A9B]">Budget bulanan</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => deleteBudget(b.id)}
                        className="p-1.5 rounded-lg text-[#6B7A9B] hover:text-[#F87171] hover:bg-[#F87171]/10 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-white">Rp {b.spent.toLocaleString("id-ID")}</span>
                    <span className="text-[#6B7A9B]">/ Rp {b.allocated.toLocaleString("id-ID")}</span>
                  </div>

                  <div className="h-2.5 rounded-full bg-white/8 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: overBudget ? "#F87171" : warning ? "linear-gradient(90deg, #FBBF24, #F97316)" : `linear-gradient(90deg, ${b.color}cc, ${b.color})` }}
                    >
                      {!overBudget && <div className="absolute inset-0 shimmer" />}
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium flex items-center gap-1`} style={{ color: statusColor }}>
                      {(overBudget || warning) && <AlertTriangle className="w-3 h-3" />}
                      {overBudget
                        ? `Lebih Rp ${Math.abs(remaining).toLocaleString("id-ID")}`
                        : warning
                        ? `${pct}% — hampir habis!`
                        : `Sisa Rp ${remaining.toLocaleString("id-ID")}`}
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ color: statusColor, background: `${statusColor}18` }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Budget Modal */}
      <AnimatePresence>
        {addOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setAddOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md glass border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">Budget Baru</h2>
                <button onClick={() => setAddOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-2 block">Kategori</label>
                  <div className="grid grid-cols-4 gap-2">
                    {categoryOptions.map((cat) => {
                      const meta = CATEGORY_META[cat];
                      const shortName = cat === "Food & Drink" ? "Makanan" : cat === "Entertainment" ? "Hiburan" : cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setForm({ ...form, label: cat })}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all ${
                            form.label === cat
                              ? "border-[#7C6FF7]/60 text-white scale-105"
                              : "border-white/8 text-gray-400 hover:border-white/20 hover:text-white"
                          }`}
                          style={form.label === cat ? { background: `${meta.color}18` } : { background: "rgba(255,255,255,0.03)" }}
                        >
                          <span className="text-xl">{meta.icon}</span>
                          <span className="text-[9px] font-semibold truncate w-full text-center leading-tight">{shortName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-2 block">Batas Bulanan</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#7C6FF7]/60 transition-all">
                    <span className="px-4 py-3.5 text-sm font-semibold text-[#6B7A9B] border-r border-white/8 shrink-0 bg-white/3">Rp</span>
                    <input
                      type="number"
                      value={form.allocated}
                      onChange={(e) => setForm({ ...form, allocated: e.target.value })}
                      placeholder="Masukkan jumlah budget"
                      className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[250000, 500000, 1000000, 2000000].map((v) => (
                      <button key={v} onClick={() => setForm({ ...form, allocated: String(v) })}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          form.allocated === String(v)
                            ? "bg-[#7C6FF7]/20 border-[#7C6FF7]/40 text-[#a78bfa]"
                            : "glass border-white/8 text-gray-400 hover:text-white hover:border-[#7C6FF7]/30"
                        }`}>
                        {v >= 1000000 ? `${v / 1000000}Jt` : `${v / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 mt-2 transition-all ${
                    saved
                      ? "bg-[#34D399] shadow-lg shadow-[#34D399]/25"
                      : "bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] shadow-lg shadow-[#7C6FF7]/25"
                  } text-white`}
                >
                  {saved ? <><Check className="w-4 h-4" />Budget Dibuat! 🎉</> : "Buat Budget"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
