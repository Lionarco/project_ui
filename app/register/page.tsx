"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, Sparkles } from "lucide-react";
import { saveUser } from "@/lib/user";
import { resetStore, loadDemoData } from "@/lib/store";

const features = [
  "Lacak pengeluaran tanpa batas",
  "AI Buddy personal 24/7",
  "Gamifikasi: XP, badge & streak",
  "Analitik keuangan visual",
  "Gratis selamanya (plan dasar)",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    saveUser({
      name: form.name,
      email: form.email,
      avatar: "😊",
      level: 1,
      xp: 0,
      streak: 0,
      title: "Financial Newbie 🌱",
    });
    resetStore();
    setStep("success");
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/onboarding");
  };

  const handleDemo = async () => {
    setLoading(true);
    saveUser({
      name: "Demo User",
      email: "demo@xpense.app",
      avatar: "🚀",
      level: 12,
      xp: 1360,
      streak: 14,
      title: "Financial Warrior ⚔️",
    });
    loadDemoData();
    await new Promise((r) => setTimeout(r, 700));
    router.push("/dashboard");
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthColor = ["", "#F87171", "#FBBF24", "#22D3EE", "#34D399"][passwordStrength];
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][passwordStrength];

  return (
    <div className="min-h-screen bg-[#0D1225] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C6FF7]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#22D3EE]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="w-full max-w-5xl relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* ── Left: Features visual ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#7C6FF7]/15 rounded-full px-4 py-2 mb-6 border border-[#7C6FF7]/25 w-fit">
            <Zap className="w-3.5 h-3.5 text-[#7C6FF7]" />
            <span className="text-xs text-[#A8B4CC] font-medium">Gratis untuk selamanya</span>
          </div>

          <h2 className="text-4xl font-black leading-tight mb-6 text-white">
            Mulai Perjalanan<br />
            <span className="gradient-text">Finansialmu</span><br />
            Hari Ini
          </h2>

          <div className="space-y-3 mb-8">
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#34D399]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#34D399]" />
                </div>
                <span className="text-sm text-[#A8B4CC]">{f}</span>
              </motion.div>
            ))}
          </div>

          {/* Level preview card */}
          <div className="glass rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center text-lg font-black text-white shadow-lg shadow-[#7C6FF7]/30">
                1
              </div>
              <div>
                <p className="text-sm font-bold text-white">Financial Newbie 🌱</p>
                <p className="text-xs text-[#A8B4CC]">Level awalmu setelah daftar</p>
              </div>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "5%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#7C6FF7] to-[#FBBF24]"
              />
            </div>
            <p className="text-xs text-[#6B7A9B]">0 / 500 XP · Mulai kumpulkan XP sekarang!</p>
          </div>
        </motion.div>

        {/* ── Right: Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C6FF7]/30 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              <span className="gradient-text">X</span>Pense
            </span>
          </Link>

          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 rounded-full bg-[#34D399]/20 flex items-center justify-center mx-auto mb-6 border-2 border-[#34D399]/30"
                >
                  <Check className="w-12 h-12 text-[#34D399]" />
                </motion.div>
                <h2 className="text-3xl font-black mb-3 text-white">Akun Dibuat! 🎉</h2>
                <p className="text-[#A8B4CC]">Mengarahkan ke onboarding...</p>
              </motion.div>
            ) : (
              <motion.div key="form">
                <div className="mb-7">
                  <h1 className="text-3xl font-black text-white mb-2">Buat Akun Gratis ✨</h1>
                  <p className="text-[#A8B4CC] text-sm">Bergabung dengan 50.000+ Financial Warriors</p>
                </div>

                {/* Demo shortcut */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemo}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl border border-[#7C6FF7]/40 text-sm font-semibold text-[#a78bfa] bg-[#7C6FF7]/8 mb-5 flex items-center justify-center gap-2 hover:border-[#7C6FF7]/70 hover:bg-[#7C6FF7]/12 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Langsung Coba Demo (Tanpa Daftar)
                </motion.button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-[#6B7A9B] px-2">atau daftar dengan email</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-[#A8B4CC] mb-2 block">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nama kamu"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none focus:border-[#7C6FF7]/60 focus:bg-white/8 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-[#A8B4CC] mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none focus:border-[#7C6FF7]/60 focus:bg-white/8 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-semibold text-[#A8B4CC] mb-2 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
                      <input
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Min. 8 karakter"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none focus:border-[#7C6FF7]/60 focus:bg-white/8 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7A9B] hover:text-white transition-colors"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {form.password && (
                      <div className="mt-2.5">
                        <div className="flex gap-1 mb-1.5">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="flex-1 h-1.5 rounded-full transition-all duration-300"
                              style={{ background: i <= passwordStrength ? strengthColor : "rgba(255,255,255,0.08)" }}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center gap-2 shadow-lg shadow-[#7C6FF7]/25 transition-all mt-2"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>Daftar Gratis <ArrowRight className="w-4 h-4" /></>
                    )}
                  </motion.button>

                  <p className="text-xs text-[#6B7A9B] text-center leading-relaxed">
                    Dengan mendaftar, kamu setuju dengan{" "}
                    <span className="text-[#7C6FF7]">Terms of Service</span> dan{" "}
                    <span className="text-[#7C6FF7]">Privacy Policy</span>
                  </p>
                </form>

                <p className="text-center text-sm text-[#6B7A9B] mt-6">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="text-[#7C6FF7] hover:text-[#a78bfa] font-semibold transition-colors">
                    Masuk
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
