"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Star, Flame } from "lucide-react";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import { saveUser } from "@/lib/user";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@xpense.app");
  const [password, setPassword] = useState("demo123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1500));
    if (email && password) {
      // Simpan user berdasarkan email yang login
      const name = email === "demo@xpense.app" ? "Demo User" : email.split("@")[0];
      saveUser({
        name,
        email,
        avatar: email === "demo@xpense.app" ? "🚀" : "😊",
        level: email === "demo@xpense.app" ? 12 : 1,
        xp: email === "demo@xpense.app" ? 1360 : 0,
        streak: email === "demo@xpense.app" ? 14 : 0,
        title: email === "demo@xpense.app" ? "Financial Warrior" : "Financial Newbie",
      });
      router.push("/dashboard");
    } else {
      setError("Email atau password salah.");
      setLoading(false);
    }
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
      title: "Financial Warrior",
    });
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex overflow-hidden">
      {/* Left — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center glow-purple group-hover:scale-110 transition-transform">
                <Zap className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">X</span>Pense
              </span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-black mb-2">Selamat Datang Kembali 👋</h1>
            <p className="text-gray-400">Lanjutkan perjalanan finansialmu</p>
          </motion.div>

          {/* Demo Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass rounded-2xl p-4 border border-[#6C5DD3]/30 mb-6"
            style={{ background: "rgba(108,93,211,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-[#F59E0B]" />
              <p className="text-sm font-semibold text-[#F59E0B]">Demo Account</p>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Gunakan akun demo untuk langsung menjelajahi semua fitur XPense tanpa registrasi.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="glass rounded-lg px-3 py-2 border border-white/5">
                <p className="text-gray-500">Email</p>
                <p className="font-mono text-gray-200">demo@xpense.app</p>
              </div>
              <div className="glass rounded-lg px-3 py-2 border border-white/5">
                <p className="text-gray-500">Password</p>
                <p className="font-mono text-gray-200">demo123</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemo}
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED]"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Coba Demo Sekarang
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-gray-500">atau login dengan akun sendiri</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs text-gray-400 font-medium">Password</label>
                <button type="button" className="text-xs text-[#6C5DD3] hover:text-[#a78bfa] transition-colors">
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-3 py-2">
                ⚠️ {error}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#6C5DD3]/20"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Masuk <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#6C5DD3] hover:text-[#a78bfa] font-semibold transition-colors">
              Daftar Gratis
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right — Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0B1020 0%, #0A0F1E 100%)" }}>
        <ParticlesBackground count={40} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
          {/* Glow orb */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#6C5DD3]/20 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative z-10 text-center"
          >
            <h2 className="text-4xl font-black mb-4 leading-tight">
              Level Up Your<br />
              <span className="gradient-text">Financial Habit</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm">
              Bergabung dengan 50.000+ pengguna yang sudah membangun kebiasaan finansial lebih baik bersama XPense.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { val: "50K+", label: "Users", color: "#6C5DD3" },
                { val: "Rp 1B+", label: "Saved", color: "#22C55E" },
                { val: "4.9★", label: "Rating", color: "#F59E0B" },
              ].map(({ val, label, color }) => (
                <div key={label} className="glass rounded-2xl p-3 border border-white/5">
                  <p className="text-xl font-black" style={{ color }}>{val}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="glass rounded-2xl p-4 border border-white/8 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#22C55E] to-[#06B6D4] flex items-center justify-center text-sm font-bold">S</div>
                <div>
                  <p className="text-xs font-semibold">Siti R.</p>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#F59E0B]" />
                    <span className="text-[10px] text-[#F59E0B]">Budget Master</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                &ldquo;XPense bikin nabung jadi seru kayak main game. Udah 3 bulan konsisten!&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
