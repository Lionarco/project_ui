"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Filter, Trash2, ArrowDown, X, Check,
} from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import GradientButton from "@/components/shared/GradientButton";
import { useStore, addTransaction, deleteTransaction, getThisMonthTransactions, getTodayTransactions, CATEGORY_META } from "@/lib/store";

const categories = Object.keys(CATEGORY_META);
const filters = ["Semua", ...categories];

export default function ExpensesPage() {
  const store = useStore();
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [form, setForm] = useState({ label: "", amount: "", category: "", note: "" });
  const [saved, setSaved] = useState(false);
  const [xpPopup, setXpPopup] = useState<string | null>(null);

  const filtered = store.transactions.filter((tx) => {
    const matchSearch = tx.label.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "Semua" || tx.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const monthlyTx = getThisMonthTransactions(store.transactions);
  const todayTx = getTodayTransactions(store.transactions);
  const monthlyTotal = monthlyTx.reduce((s, tx) => s + tx.amount, 0);
  const todayTotal = todayTx.reduce((s, tx) => s + tx.amount, 0);
  const dailyAvg = monthlyTx.length > 0
    ? Math.round(monthlyTotal / new Date().getDate())
    : 0;

  const handleSave = () => {
    if (!form.label || !form.amount || !form.category) return;
    const result = addTransaction(form.label, form.category, parseInt(form.amount), form.note || undefined);
    setForm({ label: "", amount: "", category: "", note: "" });
    setSaved(true);
    setXpPopup(`+${result.xpGained} XP${result.levelUp ? " 🆙 Level Up!" : " 🎉"}`);
    setTimeout(() => {
      setSaved(false);
      setAddOpen(false);
      setTimeout(() => setXpPopup(null), 2000);
    }, 1200);
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  const totalFiltered = filtered.reduce((s, tx) => s + tx.amount, 0);

  return (
    <div className="space-y-6 max-w-5xl page-fade">
      {/* XP Popup */}
      <AnimatePresence>
        {xpPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-[#F59E0B] text-black text-sm font-bold shadow-xl"
          >
            {xpPopup}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black">Catatan <span className="gradient-text">Pengeluaran</span></h1>
          <p className="text-sm text-[#A8B4CC] mt-1">Lacak setiap rupiah yang kamu keluarkan</p>
        </div>
        <GradientButton variant="primary" size="md" id="add-expense-btn" onClick={() => setAddOpen(true)}>
          <Plus className="w-4 h-4" />
          Tambah Pengeluaran
        </GradientButton>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Bulan Ini", val: `Rp ${monthlyTotal.toLocaleString("id-ID")}`, color: "#F87171", icon: "📅" },
          { label: "Hari Ini", val: `Rp ${todayTotal.toLocaleString("id-ID")}`, color: "#FBBF24", icon: "🕐" },
          { label: "Rata-rata/Hari", val: `Rp ${dailyAvg.toLocaleString("id-ID")}`, color: "#7C6FF7", icon: "📊" },
        ].map(({ label, val, color, icon }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className="glass rounded-2xl p-4 border border-white/8 text-center transition-all"
            style={{ borderColor: `${color}18` }}
          >
            <p className="text-base mb-1">{icon}</p>
            <p className="text-[10px] text-[#6B7A9B] mb-1 font-medium">{label}</p>
            <p className="text-sm font-black truncate" style={{ color }}>{val}</p>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="glass rounded-2xl p-4 border border-white/8">
        <div className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari transaksi…"
              className="w-full bg-white/5 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#6B7A9B] outline-none focus:border-[#7C6FF7]/50 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl border border-white/8 text-sm text-[#A8B4CC] hover:text-white hover:border-[#7C6FF7]/30 transition-all">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeFilter === f
                  ? "bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] text-white shadow-lg shadow-[#7C6FF7]/20"
                  : "glass border border-white/8 text-[#A8B4CC] hover:text-white hover:border-[#7C6FF7]/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <p className="text-sm font-semibold text-[#A8B4CC]">
            {filtered.length} transaksi {activeFilter !== "Semua" ? `· ${activeFilter}` : ""}
          </p>
          <p className="text-sm font-bold text-[#F87171]">
            -Rp {totalFiltered.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="divide-y divide-white/5">
          <AnimatePresence initial={false}>
            {filtered.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className="flex items-center gap-4 px-5 py-3.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ background: `${tx.color}20` }}>
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{tx.label}</p>
                  <p className="text-xs text-gray-500">{tx.category} · {tx.dateLabel}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#EF4444]">
                      Rp {tx.amount.toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <ArrowDown className="w-2.5 h-2.5 text-[#EF4444]" />
                      <span className="text-[10px] text-gray-500">keluar</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-600 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-400 text-sm font-medium">Tidak ada transaksi ditemukan</p>
              <p className="text-gray-600 text-xs mt-1">
                {search ? `Tidak ada hasil untuk "${search}"` : "Klik tombol + untuk mulai mencatat"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {addOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setAddOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[480px] glass border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">Tambah Pengeluaran</h2>
                <button onClick={() => setAddOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Keterangan</label>
                  <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    placeholder="contoh: Kopi Kenangan"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/50 transition-all"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-2 block">Jumlah</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#7C6FF7]/60 transition-all">
                    <span className="px-4 py-3.5 text-sm font-semibold text-[#6B7A9B] border-r border-white/8 shrink-0 bg-white/3">Rp</span>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      placeholder="Masukkan nominal"
                      className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[10000, 25000, 50000, 100000, 200000].map((v) => (
                      <button key={v} onClick={() => setForm({ ...form, amount: String(v) })}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          form.amount === String(v)
                            ? "bg-[#7C6FF7]/20 border-[#7C6FF7]/40 text-[#a78bfa]"
                            : "glass border-white/8 text-gray-400 hover:text-white hover:border-[#7C6FF7]/30"
                        }`}>
                        {v / 1000}K
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-2 block">Kategori</label>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => {
                      const meta = CATEGORY_META[cat];
                      const shortName = cat === "Food & Drink" ? "Makanan" : cat === "Entertainment" ? "Hiburan" : cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setForm({ ...form, category: cat })}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all ${
                            form.category === cat
                              ? "border-[#7C6FF7]/60 text-white scale-105"
                              : "border-white/8 text-gray-400 hover:border-white/20 hover:text-white"
                          }`}
                          style={form.category === cat ? { background: `${meta.color}18` } : { background: "rgba(255,255,255,0.03)" }}
                        >
                          <span className="text-xl">{meta.icon}</span>
                          <span className="text-[9px] font-semibold truncate w-full text-center leading-tight">{shortName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Catatan (opsional)</label>
                  <input
                    type="text"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Tambah catatan…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/50 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    saved
                      ? "bg-[#22C55E] text-white"
                      : "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white"
                  }`}
                >
                  {saved ? (
                    <><Check className="w-4 h-4" />Tersimpan! +50 XP</>
                  ) : (
                    "Simpan Pengeluaran"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
