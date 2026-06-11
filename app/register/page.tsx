"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, User, ArrowRight, Check } from "lucide-react";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import { saveUser } from "@/lib/user";

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
    // Simpan data user ke localStorage
    saveUser({
      name: form.name,
      email: form.email,
      avatar: "😊",
      level: 1,
      xp: 0,
      streak: 0,
      title: "Financial Newbie",
    });
    setStep("success");
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/onboarding");
  };

  const handleDemo = async () => {
    setLoading(true);
    // Simpan user demo
    saveUser({
      name: "Demo User",
      email: "demo@xpense.app",
      avatar: "🚀",
      level: 12,
      xp: 1360,
      streak: 14,
      title: "Financial Warrior",
    });
    await new Promise((r) => setTimeout(r, 800));
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

  const strengthColor = ["", "#EF4444", "#F59E0B", "#06B6D4", "#22C55E"][passwordStrength];
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][passwordStrength];

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex overflow-hidden">
      {/* Left — Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1020 0%, #0A0F1E 100%)" }}>
        <ParticlesBackground count={40} />
        <div className="absolute inset-0 flex flex-col justify-center p-16 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 max-w-md"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 border border-[#6C5DD3]/30">
              <Zap className="w-3.5 h-3.5 text-[#6C5DD3]" />
              <span className="text-xs text-gray-300 font-medium">Gratis untuk selamanya</span>
            </div>

            <h2 className="text-4xl font-black leading-tight mb-6">
              Mulai Perjalanan<br />
              <span className="gradient-text">Finansialmu</span><br />
              Hari Ini
            </h2>

            <div className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#22C55E]" />
                  </div>
                  <span className="text-sm text-gray-300">{f}</span>
                </motion.div>
              ))}
            </div>

            {/* Level preview */}
            <div className="glass rounded-2xl p-5 border border-white/8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-lg font-black">
                  1
                </div>
                <div>
                  <p className="text-sm font-bold">Financial Newbie</p>
                  <p className="text-xs text-gray-400">Level awalmu setelah daftar</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "5%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#6C5DD3] to-[#F59E0B]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">0 / 500 XP · Mulai kumpulkan XP sekarang!</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap style={{ width: 18, height: 18 }} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">X</span>Pense
              </span>
            </Link>
          </motion.div>

          {step === "success" ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-[#22C55E]" />
              </motion.div>
              <h2 className="text-2xl font-black mb-2">Akun Dibuat! 🎉</h2>
              <p className="text-gray-400 text-sm">Mengarahkan ke onboarding...</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <h1 className="text-3xl font-black mb-2">Buat Akun Gratis ✨</h1>
                <p className="text-gray-400 text-sm">Bergabung dengan 50.000+ Financial Warriors</p>
              </motion.div>

              {/* Demo shortcut */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDemo}
                disabled={loading}
                className="w-full py-3 rounded-xl border border-[#6C5DD3]/40 text-sm font-semibold text-[#a78bfa] glass mb-5 flex items-center justify-center gap-2 hover:border-[#6C5DD3]/70 transition-all"
              >
                <Zap className="w-4 h-4" />
                Langsung Coba Demo (Tanpa Daftar)
              </motion.button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-gray-500">atau daftar dengan email</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nama kamu"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 8 karakter"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{
                              background: i <= passwordStrength ? strengthColor : "rgba(255,255,255,0.1)",
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-[10px]" style={{ color: strengthColor }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center gap-2 shadow-lg shadow-[#6C5DD3]/20"
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

                <p className="text-xs text-gray-500 text-center">
                  Dengan mendaftar, kamu setuju dengan{" "}
                  <span className="text-[#6C5DD3]">Terms of Service</span> dan{" "}
                  <span className="text-[#6C5DD3]">Privacy Policy</span>
                </p>
              </motion.form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-[#6C5DD3] hover:text-[#a78bfa] font-semibold transition-colors">
                  Login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
