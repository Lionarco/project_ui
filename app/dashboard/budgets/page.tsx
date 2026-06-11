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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Budgets</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola batas pengeluaran bulananmu</p>
        </div>
        <GradientButton variant="primary" size="md" id="add-budget-btn" onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4" />
          Budget Baru
        </GradientButton>
      </div>

      {/* Overall summary */}
      <GlassCard
        className="p-6 border border-white/8"
        style={{ background: "linear-gradient(135deg, rgba(108,93,211,0.12) 0%, rgba(6,182,212,0.06) 100%)" }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <p className="text-sm text-gray-400">Total Budget Terpakai</p>
            <p className="text-3xl font-black mt-1">
              <span style={{ color: overallPct > 80 ? "#EF4444" : "#6C5DD3" }}>{overallPct}%</span>
              <span className="text-lg text-gray-500 font-normal"> dipakai</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-0.5">Total Budget</p>
            <p className="text-lg font-bold text-white">Rp {totalAllocated.toLocaleString("id-ID")}</p>
            <p className="text-xs text-gray-500 mt-1">
              Rp {totalSpent.toLocaleString("id-ID")} dipakai
            </p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(overallPct, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background:
                overallPct > 80
                  ? "linear-gradient(90deg, #F59E0B, #EF4444)"
                  : "linear-gradient(90deg, #6C5DD3, #06B6D4)",
            }}
          >
            <div className="absolute inset-0 shimmer" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: "Budgets", val: budgets.length, icon: Target, color: "#6C5DD3" },
            { label: "On Track", val: budgets.filter((b) => b.allocated > 0 && b.spent / b.allocated < 0.8).length, icon: TrendingUp, color: "#22C55E" },
            { label: "Warnings", val: budgets.filter((b) => b.allocated > 0 && b.spent / b.allocated >= 0.8).length, icon: AlertTriangle, color: "#F59E0B" },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="text-center">
              <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
              <p className="text-xl font-black" style={{ color }}>{val}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Budget cards */}
      {budgets.length === 0 ? (
        <GlassCard className="p-12 border border-white/5 text-center">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-gray-400 font-medium">Belum ada budget</p>
          <p className="text-gray-600 text-sm mt-1">Buat budget pertama untuk mulai melacak pengeluaranmu</p>
          <button
            onClick={() => setAddOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-sm font-semibold text-white"
          >
            + Buat Budget
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((b) => {
            const pct = b.allocated > 0 ? Math.min(Math.round((b.spent / b.allocated) * 100), 100) : 0;
            const remaining = b.allocated - b.spent;
            const overBudget = b.spent > b.allocated;
            const warning = pct >= 80 && !overBudget;
            const meta = CATEGORY_META[b.label] ?? { icon: "📌", color: b.color };

            return (
              <motion.div key={b.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <GlassCard className="p-5 border border-white/5 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `${b.color}20` }}>
                        {meta.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{b.label}</p>
                        <p className="text-xs text-gray-500">Budget bulanan</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => deleteBudget(b.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Rp {b.spent.toLocaleString("id-ID")}</span>
                    <span className="text-gray-500">/ Rp {b.allocated.toLocaleString("id-ID")}</span>
                  </div>

                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background: overBudget ? "#EF4444" : warning ? "#F59E0B" : b.color,
                      }}
                    >
                      {!overBudget && <div className="absolute inset-0 shimmer" />}
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold flex items-center gap-1 ${
                      overBudget ? "text-[#EF4444]" : warning ? "text-[#F59E0B]" : "text-gray-400"
                    }`}>
                      {overBudget && <AlertTriangle className="w-3 h-3" />}
                      {warning && <AlertTriangle className="w-3 h-3" />}
                      {overBudget
                        ? `Lebih Rp ${Math.abs(remaining).toLocaleString("id-ID")}`
                        : warning
                        ? `${pct}% — hampir habis!`
                        : `Sisa Rp ${remaining.toLocaleString("id-ID")}`}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ color: overBudget ? "#EF4444" : b.color, background: overBudget ? "#EF444420" : `${b.color}20` }}
                    >
                      {pct}%
                    </span>
                  </div>
                </GlassCard>
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
                      return (
                        <button
                          key={cat}
                          onClick={() => setForm({ ...form, label: cat })}
                          className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-[10px] font-medium transition-all ${
                            form.label === cat
                              ? "border-[#6C5DD3]/60 text-white"
                              : "border-white/8 text-gray-400 hover:border-white/20"
                          }`}
                          style={form.label === cat ? { background: `${meta.color}20` } : {}}
                        >
                          <span className="text-base">{meta.icon}</span>
                          <span className="truncate w-full text-center">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Batas Bulanan (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input
                      type="number"
                      value={form.allocated}
                      onChange={(e) => setForm({ ...form, allocated: e.target.value })}
                      placeholder="500000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/50 transition-all"
                    />
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {[250000, 500000, 1000000, 2000000].map((v) => (
                      <button key={v} onClick={() => setForm({ ...form, allocated: String(v) })}
                        className="px-2.5 py-1 glass rounded-lg border border-white/8 text-xs text-gray-400 hover:text-white hover:border-[#6C5DD3]/40 transition-all">
                        {v >= 1000000 ? `${v / 1000000}Jt` : `${v / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${
                    saved ? "bg-[#22C55E]" : "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED]"
                  } text-white`}
                >
                  {saved ? <><Check className="w-4 h-4" />Budget Dibuat!</> : "Buat Budget"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
