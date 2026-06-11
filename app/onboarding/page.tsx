"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Zap, User, DollarSign, Target, TrendingUp,
  ArrowRight, ArrowLeft, Check,
  Utensils, Car, ShoppingBag, Wifi, Coffee, Heart,
} from "lucide-react";
import { saveUser } from "@/lib/user";

const STEPS = [
  { id: 1, label: "Profil", icon: User },
  { id: 2, label: "Pendapatan", icon: DollarSign },
  { id: 3, label: "Kategori", icon: ShoppingBag },
  { id: 4, label: "Target", icon: Target },
];

const categoryOptions = [
  { id: "food", icon: Utensils, label: "Makanan & Minuman", color: "#6C5DD3" },
  { id: "transport", icon: Car, label: "Transportasi", color: "#06B6D4" },
  { id: "shopping", icon: ShoppingBag, label: "Belanja", color: "#22C55E" },
  { id: "entertainment", icon: Wifi, label: "Hiburan", color: "#7C3AED" },
  { id: "coffee", icon: Coffee, label: "Kopi & Cafe", color: "#F59E0B" },
  { id: "health", icon: Heart, label: "Kesehatan", color: "#EF4444" },
  { id: "education", icon: TrendingUp, label: "Pendidikan", color: "#06B6D4" },
  { id: "other", icon: Zap, label: "Lainnya", color: "#6B7280" },
];

const incomeOptions = [
  "< Rp 3.000.000",
  "Rp 3.000.000 – 5.000.000",
  "Rp 5.000.000 – 10.000.000",
  "Rp 10.000.000 – 20.000.000",
  "> Rp 20.000.000",
];

const savingsTargets = [
  { label: "10% dari income", icon: "💰", desc: "Konservatif — cocok untuk pemula" },
  { label: "20% dari income", icon: "🎯", desc: "Standar — rekomendasi umum" },
  { label: "30% dari income", icon: "🚀", desc: "Ambisius — untuk yang serius" },
  { label: "Custom target saya", icon: "✏️", desc: "Set target sendiri" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    avatar: "😊",
    income: "",
    categories: [] as string[],
    savingsTarget: "",
  });
  const [completing, setCompleting] = useState(false);

  const avatarOptions = ["😊", "🦁", "🐯", "🦊", "🐼", "🦋", "🚀", "⚡"];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setCompleting(true);
    // Update nama & avatar dari onboarding ke localStorage
    saveUser({
      name: data.name || "Financial Warrior",
      avatar: data.avatar,
      level: 1,
      xp: 0,
      streak: 0,
      title: "Financial Newbie",
    });
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/dashboard");
  };

  const toggleCategory = (id: string) => {
    setData((d) => ({
      ...d,
      categories: d.categories.includes(id)
        ? d.categories.filter((c) => c !== id)
        : [...d.categories, id],
    }));
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center">
            <Zap style={{ width: 16, height: 16 }} className="text-white" />
          </div>
          <span className="font-bold"><span className="gradient-text">X</span>Pense</span>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Lewati →
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6 max-w-2xl mx-auto w-full mb-8">
        <div className="flex items-center gap-2 mb-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = s.id < step;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-1.5 shrink-0`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDone
                        ? "bg-[#22C55E]"
                        : isActive
                        ? "bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED]"
                        : "bg-white/10"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Icon className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? "text-white" : "text-gray-500"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 rounded-full bg-white/10 mx-1">
                    <div
                      className="h-full rounded-full bg-[#22C55E] transition-all duration-500"
                      style={{ width: isDone ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-[#6C5DD3] to-[#22C55E]"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1.5">Step {step} dari 4</p>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-6 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* Step 1 — Profile */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2">Hai, siapa namamu? 👋</h2>
              <p className="text-gray-400 text-sm mb-8">Pilih avatar dan perkenalkan dirimu</p>

              {/* Avatar */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Pilih avatar</p>
                <div className="flex gap-3 flex-wrap">
                  {avatarOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => setData({ ...data, avatar: a })}
                      className={`w-14 h-14 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all ${
                        data.avatar === a
                          ? "border-[#6C5DD3] bg-[#6C5DD3]/20 scale-110"
                          : "border-white/10 glass hover:border-white/30"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="glass rounded-2xl p-5 border border-[#6C5DD3]/20 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C5DD3]/30 to-[#7C3AED]/20 flex items-center justify-center text-3xl">
                    {data.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{data.name || "Nama Kamu"}</p>
                    <p className="text-xs text-[#F59E0B]">⚡ Financial Newbie · Level 1</p>
                    <p className="text-xs text-gray-500 mt-0.5">0 XP · Baru bergabung</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Nama Lengkap</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Masukkan namamu"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2 — Income */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2">Berapa penghasilanmu? 💰</h2>
              <p className="text-gray-400 text-sm mb-8">
                Ini membantu AI Buddy memberikan saran yang lebih personal dan akurat
              </p>

              <div className="space-y-3">
                {incomeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setData({ ...data, income: opt })}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-sm font-medium transition-all ${
                      data.income === opt
                        ? "border-[#6C5DD3]/60 bg-[#6C5DD3]/15 text-white"
                        : "border-white/8 glass text-gray-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {opt}
                    {data.income === opt && (
                      <div className="w-5 h-5 rounded-full bg-[#6C5DD3] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="glass rounded-2xl p-4 border border-[#06B6D4]/20 mt-6" style={{ background: "rgba(6,182,212,0.04)" }}>
                <p className="text-xs text-gray-400">
                  🔒 Data ini bersifat privat dan hanya digunakan untuk kalkulasi budget & saran AI. Tidak dibagikan ke siapapun.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Categories */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2">Kategori pengeluaranmu 🗂️</h2>
              <p className="text-gray-400 text-sm mb-8">
                Pilih kategori yang biasa kamu keluarkan (bisa lebih dari satu)
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {categoryOptions.map((cat) => {
                  const Icon = cat.icon;
                  const selected = data.categories.includes(cat.id);
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleCategory(cat.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        selected
                          ? "border-[#6C5DD3]/50 text-white"
                          : "border-white/8 glass text-gray-400 hover:border-white/20"
                      }`}
                      style={selected ? { background: `${cat.color}12` } : {}}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${cat.color}25` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                      </div>
                      <span className="text-xs font-semibold">{cat.label}</span>
                      {selected && (
                        <div className="ml-auto w-4 h-4 rounded-full bg-[#6C5DD3] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {data.categories.length > 0 && (
                <p className="text-xs text-[#22C55E] text-center">
                  ✅ {data.categories.length} kategori dipilih
                </p>
              )}
            </motion.div>
          )}

          {/* Step 4 — Savings Target */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-black mb-2">Target tabunganmu 🎯</h2>
              <p className="text-gray-400 text-sm mb-8">
                AI Buddy akan membantu kamu mencapai target ini setiap bulan
              </p>

              <div className="space-y-3 mb-8">
                {savingsTargets.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setData({ ...data, savingsTarget: t.label })}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all ${
                      data.savingsTarget === t.label
                        ? "border-[#6C5DD3]/60 bg-[#6C5DD3]/15 text-white"
                        : "border-white/8 glass text-gray-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{t.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                    </div>
                    {data.savingsTarget === t.label && (
                      <div className="w-5 h-5 rounded-full bg-[#6C5DD3] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Completion summary */}
              {completing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-[#0A0F1E]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: 1 }}
                    className="text-6xl mb-6"
                  >
                    🚀
                  </motion.div>
                  <h2 className="text-3xl font-black mb-2 gradient-text">Setup Selesai!</h2>
                  <p className="text-gray-400 text-center max-w-xs">
                    Selamat datang, {data.name || "Financial Warrior"}!<br />
                    Perjalanan finansialmu dimulai sekarang 🎉
                  </p>
                  <div className="mt-6 flex gap-2">
                    {[0, 0.1, 0.2].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                        className="w-2 h-2 rounded-full bg-[#6C5DD3]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-6 py-6 max-w-2xl mx-auto w-full">
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl glass border border-white/10 text-sm font-medium text-gray-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
          )}

          {step < 4 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#6C5DD3]/20"
            >
              Lanjut <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinish}
              disabled={completing}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#22C55E] to-[#06B6D4] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4" />
              Mulai XPense! 🚀
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
