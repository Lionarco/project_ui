"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Flame, Target, Award, Crown, Shield, Zap, TrendingUp, Users, Lock } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { useStore, getXPInfo, getThisMonthTransactions } from "@/lib/store";

// Achievement definitions — unlocked state computed from real store data
function computeAchievements(store: ReturnType<typeof useStore>) {
  const monthlyTx = getThisMonthTransactions(store.transactions);
  const monthlySpend = monthlyTx.reduce((s, tx) => s + tx.amount, 0);
  const txCount = store.transactions.length;
  const budgetCount = store.budgets.length;
  const xpInfo = getXPInfo(store.totalXP);

  return [
    {
      id: 1, icon: "📝", label: "Transaksi Pertama", xp: 50, color: "#7C6FF7",
      desc: "Catat pengeluaran pertamamu",
      unlocked: txCount >= 1,
      hint: "Catat 1 pengeluaran",
    },
    {
      id: 2, icon: "🏆", label: "Budget Creator", xp: 50, color: "#FBBF24",
      desc: "Buat budget pertamamu",
      unlocked: budgetCount >= 1,
      hint: "Buat 1 budget",
    },
    {
      id: 3, icon: "🔥", label: "7-Day Streak", xp: 100, color: "#F87171",
      desc: "Catat pengeluaran 7 hari berturut-turut",
      unlocked: store.streak >= 7,
      hint: `Streak sekarang: ${store.streak}/7 hari`,
    },
    {
      id: 4, icon: "💰", label: "Hemat 500K", xp: 200, color: "#34D399",
      desc: "Hemat Rp 500.000 dalam sebulan",
      unlocked: false, // needs income tracking
      hint: "Butuh fitur income",
    },
    {
      id: 5, icon: "📊", label: "10 Transaksi", xp: 150, color: "#22D3EE",
      desc: "Catat 10 pengeluaran",
      unlocked: txCount >= 10,
      hint: `Transaksi: ${txCount}/10`,
    },
    {
      id: 6, icon: "⚡", label: "Level 3", xp: 300, color: "#A78BFA",
      desc: "Capai Level 3",
      unlocked: xpInfo.level >= 3,
      hint: `Level sekarang: ${xpInfo.level}/3`,
    },
    {
      id: 7, icon: "🎯", label: "5 Budget", xp: 250, color: "#FBBF24",
      desc: "Buat 5 kategori budget",
      unlocked: budgetCount >= 5,
      hint: `Budget: ${budgetCount}/5`,
    },
    {
      id: 8, icon: "👑", label: "Level 10", xp: 1000, color: "#F59E0B",
      desc: "Capai Level 10 — Financial Master!",
      unlocked: xpInfo.level >= 10,
      hint: `Level sekarang: ${xpInfo.level}/10`,
    },
  ];
}

// Challenges computed from real store data
function computeChallenges(store: ReturnType<typeof useStore>) {
  const txCount = store.transactions.length;
  const budgetCount = store.budgets.length;
  const xpInfo = getXPInfo(store.totalXP);

  return [
    {
      id: 1, icon: "📝", title: "Catat 5 Pengeluaran",
      desc: "Tambahkan 5 transaksi untuk memulai kebiasaan mencatat",
      current: Math.min(txCount, 5), target: 5,
      progress: Math.min((txCount / 5) * 100, 100),
      reward: 100, color: "#7C6FF7",
      deadline: txCount >= 5 ? "✅ Selesai!" : `${5 - txCount} lagi`,
      completed: txCount >= 5,
    },
    {
      id: 2, icon: "🎯", title: "Buat 3 Budget",
      desc: "Buat minimal 3 kategori budget untuk kontrol pengeluaran",
      current: Math.min(budgetCount, 3), target: 3,
      progress: Math.min((budgetCount / 3) * 100, 100),
      reward: 150, color: "#34D399",
      deadline: budgetCount >= 3 ? "✅ Selesai!" : `${3 - budgetCount} lagi`,
      completed: budgetCount >= 3,
    },
    {
      id: 3, icon: "🔥", title: "Streak 3 Hari",
      desc: "Login dan catat pengeluaran 3 hari berturut-turut",
      current: Math.min(store.streak, 3), target: 3,
      progress: Math.min((store.streak / 3) * 100, 100),
      reward: 200, color: "#F87171",
      deadline: store.streak >= 3 ? "✅ Selesai!" : `${3 - store.streak} hari lagi`,
      completed: store.streak >= 3,
    },
    {
      id: 4, icon: "⚡", title: "Raih Level 3",
      desc: "Kumpulkan XP hingga mencapai Level 3",
      current: Math.min(xpInfo.level, 3), target: 3,
      progress: Math.min((xpInfo.level / 3) * 100, 100),
      reward: 300, color: "#A78BFA",
      deadline: xpInfo.level >= 3 ? "✅ Selesai!" : `Level ${xpInfo.level} → 3`,
      completed: xpInfo.level >= 3,
    },
  ];
}

// Leaderboard always shows user's real data + simulated others
function buildLeaderboard(store: ReturnType<typeof useStore>, xpInfo: ReturnType<typeof getXPInfo>) {
  const others = [
    { rank: 1, name: "Sarah K.", level: 18, xp: 12450, streak: 45, badge: "🏆", isUser: false },
    { rank: 2, name: "Budi R.", level: 16, xp: 10820, streak: 32, badge: "🥈", isUser: false },
    { rank: 3, name: "Citra M.", level: 15, xp: 9340, streak: 28, badge: "🥉", isUser: false },
  ];

  // Find where user ranks
  const userXP = store.totalXP;
  const userRank = userXP === 0 ? "—" : userXP < 9340 ? "5+" : "4";

  const userEntry = {
    rank: typeof userRank === "number" ? userRank : 4,
    name: "Kamu",
    level: xpInfo.level,
    xp: userXP,
    streak: store.streak,
    badge: userXP === 0 ? "🌱" : userXP > 9340 ? "🥉" : "⚔️",
    isUser: true,
  };

  const extra = [
    { rank: 5, name: "Deni F.", level: 11, xp: 7200, streak: 10, badge: "🎯", isUser: false },
  ];

  return [...others, userEntry, ...extra].sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));
}

type Tab = "achievements" | "challenges" | "leaderboard";

export default function AchievementsPage() {
  const [tab, setTab] = useState<Tab>("achievements");
  const store = useStore();
  const xpInfo = getXPInfo(store.totalXP);
  const achievements = computeAchievements(store);
  const challenges = computeChallenges(store);
  const leaderboard = buildLeaderboard(store, xpInfo);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const monthlyXP = store.transactions
    .filter((tx) => {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      return new Date(tx.date) >= startOfMonth;
    })
    .length * 50; // 50 XP per transaction

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "leaderboard", label: "Leaderboard", icon: Users },
  ];

  return (
    <div className="space-y-6 max-w-5xl page-fade">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black">
          <span className="gradient-text">Achievements</span>
        </h1>
        <p className="text-sm text-[#A8B4CC] mt-1">Level up your financial game 🎮</p>
      </div>

      {/* Player stats — ALL FROM REAL STORE */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Level Saat Ini", val: xpInfo.level, icon: Crown, color: "#FBBF24", suffix: "" },
          { label: "Total XP", val: store.totalXP, icon: Star, color: "#7C6FF7", suffix: " XP" },
          { label: "Day Streak", val: store.streak, icon: Flame, color: "#F87171", suffix: "🔥" },
          { label: "Badges Earned", val: unlockedCount, icon: Award, color: "#34D399", suffix: ` / ${achievements.length}` },
        ].map(({ label, val, icon: Icon, color, suffix }) => (
          <motion.div
            key={label}
            whileHover={{ y: -2 }}
            className="glass rounded-2xl p-5 border border-white/8 text-center transition-all"
            style={{ borderColor: `${color}20` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${color}18` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <p className="text-2xl font-black" style={{ color }}>
              <AnimatedCounter end={val} suffix={suffix} />
            </p>
            <p className="text-xs text-[#6B7A9B] mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* XP Level bar — FROM REAL STORE */}
      <motion.div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(124,111,247,0.10) 100%)",
          border: "1px solid rgba(251,191,36,0.22)"
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBF24]/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FBBF24] to-[#7C6FF7] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#FBBF24]/20">
                {xpInfo.level}
              </div>
              <div>
                <p className="font-bold text-white">{xpInfo.title}</p>
                <p className="text-xs text-[#A8B4CC]">
                  {monthlyXP > 0 ? `+${monthlyXP} XP bulan ini` : "Belum ada XP bulan ini"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#FBBF24]">Level {xpInfo.level + 1} →</p>
              <p className="text-xs text-[#6B7A9B]">{(xpInfo.xpNeeded - xpInfo.xpInLevel).toLocaleString()} XP lagi</p>
            </div>
          </div>

          <div className="h-3 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpInfo.pct}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: "linear-gradient(90deg, #FBBF24, #7C6FF7)" }}
            >
              <div className="absolute inset-0 shimmer" />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-[#6B7A9B] mt-1.5">
            <span>{xpInfo.xpInLevel.toLocaleString()} XP</span>
            <span>{xpInfo.xpNeeded.toLocaleString()} XP</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 glass rounded-xl p-1 border border-white/8 w-full sm:w-fit overflow-x-auto no-scrollbar">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === id
                ? "bg-gradient-to-r from-[#7C6FF7] to-[#8B5CF6] text-white shadow-lg"
                : "text-[#A8B4CC] hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {/* ── Achievements ── */}
        {tab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: "spring", bounce: 0.4 }}
                whileHover={a.unlocked ? { scale: 1.04, y: -4 } : undefined}
                className={`relative rounded-2xl p-4 border text-center transition-all ${
                  a.unlocked
                    ? "border-white/12 cursor-pointer"
                    : "opacity-50 border-white/5 grayscale"
                }`}
                style={a.unlocked
                  ? { background: `${a.color}10`, borderColor: `${a.color}25` }
                  : { background: "rgba(255,255,255,0.03)" }
                }
              >
                {/* Glow pulse for unlocked */}
                {a.unlocked && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        `0 0 0px ${a.color}00`,
                        `0 0 20px ${a.color}28`,
                        `0 0 0px ${a.color}00`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}

                <div className="text-4xl mb-2">{a.icon}</div>
                <p className="text-xs font-bold leading-tight mb-2 text-white">{a.label}</p>
                <p className="text-[10px] text-[#6B7A9B] mb-2 leading-snug">{a.unlocked ? a.desc : a.hint}</p>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: a.unlocked ? a.color : "#6B7280",
                    background: a.unlocked ? `${a.color}20` : "rgba(255,255,255,0.05)",
                  }}
                >
                  +{a.xp} XP
                </span>

                {!a.unlocked && (
                  <div className="absolute top-2.5 right-2.5">
                    <Lock className="w-3 h-3 text-[#6B7A9B]" />
                  </div>
                )}
                {a.unlocked && (
                  <div className="absolute top-2.5 right-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#34D399]/20 flex items-center justify-center">
                      <span className="text-[8px] text-[#34D399] font-bold">✓</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Challenges ── */}
        {tab === "challenges" && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {challenges.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div
                  className={`glass rounded-2xl p-5 border transition-all ${
                    c.completed ? "border-[#34D399]/30" : "border-white/8"
                  }`}
                  style={c.completed ? { background: "rgba(52,211,153,0.06)" } : {}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                        style={{ background: `${c.color}18` }}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{c.title}</p>
                        <p className="text-xs text-[#6B7A9B] mt-0.5">{c.desc}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2"
                      style={{ color: c.color, background: `${c.color}18` }}
                    >
                      +{c.reward} XP
                    </span>
                  </div>

                  <div className="h-2.5 rounded-full bg-white/8 overflow-hidden mb-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: `linear-gradient(90deg, ${c.color}cc, ${c.color})` }}
                    >
                      {c.completed && <div className="absolute inset-0 shimmer" />}
                    </motion.div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-[#A8B4CC]">
                      {c.current} / {c.target} {c.completed ? "✅" : ""}
                    </span>
                    <span style={{ color: c.completed ? "#34D399" : c.color }} className="font-semibold">
                      {c.deadline}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Leaderboard ── */}
        {tab === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="glass rounded-2xl border border-white/8 overflow-hidden">
              <div className="px-5 py-4 border-b border-white/8 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#7C6FF7]" />
                <h3 className="font-bold">Global Rankings</h3>
                <span className="ml-auto text-xs text-[#6B7A9B]">Bulan ini</span>
              </div>

              <div className="divide-y divide-white/5">
                {leaderboard.map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center gap-4 px-5 py-4 ${
                      user.isUser
                        ? "bg-[#7C6FF7]/10 border-l-2 border-[#7C6FF7]"
                        : "hover:bg-white/2"
                    }`}
                  >
                    <div className="text-xl w-8 text-center">{user.badge}</div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        background: user.isUser
                          ? "linear-gradient(135deg, #7C6FF7, #8B5CF6)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {user.name}
                        {user.isUser && (
                          <span className="ml-2 text-[10px] text-[#7C6FF7] font-normal">(Kamu)</span>
                        )}
                      </p>
                      <p className="text-xs text-[#6B7A9B]">
                        Level {user.level} · {user.streak}🔥 streak
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#7C6FF7]">
                        {user.xp.toLocaleString()} XP
                      </p>
                      <p className="text-xs text-[#6B7A9B]">#{user.rank}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-white/8 text-center">
                {store.totalXP === 0 ? (
                  <p className="text-xs text-[#6B7A9B]">
                    Mulai catat pengeluaran untuk masuk ke leaderboard! 🚀
                  </p>
                ) : (
                  <p className="text-xs text-[#6B7A9B]">
                    Kamu punya <span className="text-[#7C6FF7] font-semibold">{store.totalXP.toLocaleString()} XP</span> — terus tingkatkan! 💪
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
