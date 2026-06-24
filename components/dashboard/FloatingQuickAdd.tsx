"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Utensils, Car, ShoppingBag, Wifi, Coffee, Zap, Check, Heart } from "lucide-react";
import { addTransaction, CATEGORY_META } from "@/lib/store";

const categories = [
  { id: "Food & Drink",   icon: Utensils,   label: "Makanan",  color: "#6C5DD3" },
  { id: "Transport",      icon: Car,        label: "Transport", color: "#06B6D4" },
  { id: "Shopping",       icon: ShoppingBag, label: "Belanja",  color: "#22C55E" },
  { id: "Entertainment",  icon: Wifi,       label: "Hiburan",  color: "#7C3AED" },
  { id: "Coffee",         icon: Coffee,     label: "Kopi",     color: "#F59E0B" },
  { id: "Bills",          icon: Zap,        label: "Tagihan",  color: "#EF4444" },
  { id: "Health",         icon: Heart,      label: "Kesehatan", color: "#EC4899" },
];

type Step = "category" | "amount" | "done";

export default function FloatingQuickAdd() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("category");
  const [selectedCat, setSelectedCat] = useState<(typeof categories)[0] | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [xpGained, setXpGained] = useState(0);
  const [levelUp, setLevelUp] = useState(false);

  const handleCategorySelect = (cat: (typeof categories)[0]) => {
    setSelectedCat(cat);
    setStep("amount");
  };

  const handleSave = () => {
    if (!amount || !selectedCat) return;
    const result = addTransaction(
      note || selectedCat.label,
      selectedCat.id,
      parseInt(amount),
      note || undefined
    );
    setXpGained(result.xpGained);
    setLevelUp(result.levelUp);
    setStep("done");

    setTimeout(() => {
      setOpen(false);
      setTimeout(() => {
        setStep("category");
        setSelectedCat(null);
        setAmount("");
        setNote("");
        setXpGained(0);
        setLevelUp(false);
      }, 300);
    }, 1600);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("category");
      setSelectedCat(null);
      setAmount("");
      setNote("");
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="fixed bottom-24 right-6 w-80 glass border border-white/10 rounded-3xl p-5 z-50 shadow-2xl shadow-[#6C5DD3]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {step === "amount" && (
                  <button
                    onClick={() => setStep("category")}
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    ←
                  </button>
                )}
                <h3 className="font-bold text-sm">
                  {step === "category" && "Pilih Kategori"}
                  {step === "amount" && `Nominal — ${selectedCat?.label}`}
                  {step === "done" && "Tersimpan! 🎉"}
                </h3>
              </div>
              {step !== "done" && (
                <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Category */}
              {step === "category" && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-3 gap-2"
                >
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCategorySelect(cat)}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/8 hover:border-white/20 transition-all"
                        style={{ background: `${cat.color}10` }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background: `${cat.color}25` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: cat.color }} />
                        </div>
                        <span className="text-[10px] font-medium text-gray-300">{cat.label}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}

              {/* Step 2: Amount */}
              {step === "amount" && selectedCat && (
                <motion.div
                  key="amount"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {/* Amount input */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#7C6FF7]/60 transition-all">
                    <span className="px-3 py-3 text-sm font-semibold text-[#6B7A9B] border-r border-white/8 shrink-0 bg-white/3">Rp</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Masukkan nominal"
                      autoFocus
                      className="flex-1 bg-transparent px-3 py-3 text-lg font-bold text-white placeholder-[#6B7A9B] outline-none"
                    />
                  </div>

                  {/* Quick amounts */}
                  <div className="flex gap-2 flex-wrap">
                    {[10000, 25000, 50000, 100000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(String(v))}
                        className="px-3 py-1 glass rounded-lg border border-white/8 text-xs font-medium text-gray-400 hover:text-white hover:border-[#6C5DD3]/40 transition-all"
                      >
                        {(v / 1000).toFixed(0)}K
                      </button>
                    ))}
                  </div>

                  {/* Note */}
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Keterangan (opsional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 transition-all"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={!amount}
                    className={`w-full py-3 rounded-xl font-semibold text-sm text-white transition-all ${
                      amount
                        ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] shadow-lg shadow-[#6C5DD3]/20"
                        : "bg-white/10 cursor-not-allowed opacity-60"
                    }`}
                  >
                    Simpan Pengeluaran
                  </motion.button>
                </motion.div>
              )}

              {/* Step 3: Done */}
              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-14 h-14 rounded-full bg-[#22C55E]/20 flex items-center justify-center mb-3"
                  >
                    <Check className="w-7 h-7 text-[#22C55E]" />
                  </motion.div>
                  <p className="font-bold text-sm mb-1">Pengeluaran Dicatat! ✅</p>
                  <p className="text-xs text-gray-400">
                    Rp {parseInt(amount).toLocaleString("id-ID")} · {selectedCat?.label}
                  </p>
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <div className="px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold">
                      +{xpGained} XP 🎉
                    </div>
                    {levelUp && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 rounded-full bg-[#6C5DD3]/20 text-[#a78bfa] text-xs font-bold"
                      >
                        🆙 Level Up!
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] shadow-lg shadow-[#6C5DD3]/40 flex items-center justify-center z-50"
        id="fab-quick-add"
        aria-label="Quick add expense"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="w-6 h-6 text-white" />
        </motion.div>

        {/* Pulse ring */}
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-[#6C5DD3]/50"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}
