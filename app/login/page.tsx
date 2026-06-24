"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { saveUser } from "@/lib/user";
import { loadDemoData, resetStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Masukkan email dan password.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));
    const isDemo = email === "demo@xpense.app";
    const name = isDemo
      ? "Demo User"
      : email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
    saveUser({
      name,
      email,
      avatar: isDemo ? "🚀" : "😊",
      level: isDemo ? 12 : 1,
      xp: isDemo ? 1360 : 0,
      streak: isDemo ? 14 : 0,
      title: isDemo ? "Financial Warrior ⚔️" : "Financial Newbie 🌱",
    });
    if (isDemo) {
      loadDemoData();
    } else {
      resetStore();
    }
    router.push("/dashboard");
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

  return (
    <div className="min-h-screen bg-[#0D1225] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C6FF7]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#22D3EE]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="w-full max-w-5xl relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* ── Left: Form ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C6FF7]/30 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">
              <span className="gradient-text">X</span>Pense
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Selamat Datang Kembali 👋</h1>
            <p className="text-[#A8B4CC]">Lanjutkan perjalanan finansialmu bersama XPense</p>
          </div>

          {/* Demo Banner */}
          <div className="rounded-2xl p-5 mb-6 border border-[#7C6FF7]/30 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,111,247,0.12) 0%, rgba(139,92,246,0.08) 100%)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C6FF7]/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <p className="text-sm font-bold text-[#FBBF24]">Demo Account — Coba Semua Fitur</p>
            </div>
            <p className="text-xs text-[#A8B4CC] mb-4 leading-relaxed">
              Langsung jelajahi dashboard XPense dengan data sampel tanpa perlu daftar.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-white/6 rounded-xl px-3 py-2.5 border border-white/8">
                <p className="text-[#6B7A9B] mb-1">Email</p>
                <p className="font-mono text-white font-medium">demo@xpense.app</p>
              </div>
              <div className="bg-white/6 rounded-xl px-3 py-2.5 border border-white/8">
                <p className="text-[#6B7A9B] mb-1">Password</p>
                <p className="font-mono text-white font-medium">demo123</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemo}
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] shadow-lg shadow-[#7C6FF7]/25 transition-all"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <><Zap className="w-4 h-4" />Coba Demo Sekarang</>
              )}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-[#6B7A9B] px-2">atau login dengan akun sendiri</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-[#A8B4CC] mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-[#6B7A9B] outline-none focus:border-[#7C6FF7]/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#A8B4CC]">Password</label>
                <button type="button" className="text-xs text-[#7C6FF7] hover:text-[#a78bfa] transition-colors">
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A9B]" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
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
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-[#F87171] bg-[#F87171]/10 border border-[#F87171]/20 rounded-xl px-4 py-3"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center gap-2 shadow-lg shadow-[#7C6FF7]/25 mt-2 transition-all"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>Masuk <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#6B7A9B] mt-6">
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#7C6FF7] hover:text-[#a78bfa] font-semibold transition-colors">
              Daftar Gratis
            </Link>
          </p>
        </motion.div>

        {/* ── Right: Visual ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex flex-col items-center justify-center text-center px-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#7C6FF7]/20 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-8 border border-white/10 space-y-6">
              <h2 className="text-4xl font-black leading-tight">
                Level Up Your<br />
                <span className="gradient-text">Financial Habit</span>
              </h2>
              <p className="text-[#A8B4CC] text-sm leading-relaxed max-w-sm">
                Bergabung dengan 50.000+ pengguna yang membangun kebiasaan finansial lebih baik bersama XPense.
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "50K+", label: "Users", color: "#7C6FF7" },
                  { val: "Rp 1B+", label: "Saved", color: "#34D399" },
                  { val: "4.9★", label: "Rating", color: "#FBBF24" },
                ].map(({ val, label, color }) => (
                  <div key={label} className="bg-white/5 rounded-2xl p-4 border border-white/8">
                    <p className="text-2xl font-black" style={{ color }}>{val}</p>
                    <p className="text-xs text-[#6B7A9B] mt-1">{label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/8 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#34D399] to-[#22D3EE] flex items-center justify-center text-sm font-bold text-white">S</div>
                  <div>
                    <p className="text-sm font-semibold">Siti R.</p>
                    <p className="text-xs text-[#FBBF24]">🔥 Budget Master · 45 day streak</p>
                  </div>
                </div>
                <p className="text-sm text-[#A8B4CC] leading-relaxed italic">
                  &ldquo;XPense bikin nabung jadi seru kayak main game. Udah 3 bulan konsisten!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
