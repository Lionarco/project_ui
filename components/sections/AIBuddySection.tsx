"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, TrendingDown, AlertTriangle, PiggyBank, FileText, Zap } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";

const chatMessages = [
  {
    from: "user",
    text: "Kenapa pengeluaran saya bulan ini tinggi?",
    time: "10:42",
  },
  {
    from: "ai",
    text: "📊 Saya menganalisis pengeluaran kamu. Terlihat bahwa kamu menghabiskan 32% lebih banyak untuk kategori Makanan dibandingkan bulan lalu. Terutama pada hari kerja di atas jam makan siang.",
    time: "10:42",
  },
  {
    from: "ai",
    text: "💡 Saran: Coba meal-prep di akhir pekan! Bisa hemat hingga Rp 500.000/bulan. Mau saya buat challenge-nya?",
    time: "10:43",
  },
  {
    from: "user",
    text: "Oke, buat challenge-nya!",
    time: "10:43",
  },
];

const aiFeatures = [
  {
    icon: TrendingDown,
    title: "Spending Analysis",
    desc: "Deep-dive into your patterns and anomalies",
    color: "#6C5DD3",
  },
  {
    icon: AlertTriangle,
    title: "Budget Warnings",
    desc: "Proactive alerts before you overspend",
    color: "#F59E0B",
  },
  {
    icon: PiggyBank,
    title: "Saving Recommendations",
    desc: "Personalized tips to grow your savings",
    color: "#22C55E",
  },
  {
    icon: FileText,
    title: "Monthly Reports",
    desc: "Auto-generated financial summaries",
    color: "#06B6D4",
  },
];

export default function AIBuddySection() {
  const [inputVal, setInputVal] = useState("");

  return (
    <section
      id="ai-buddy"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0B1020 100%)" }}
    >
      {/* Bg glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#06B6D4]/30">
            <Bot className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span className="text-xs font-medium text-[#06B6D4]">AI Financial Buddy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Your Smart
            <br />
            <span className="gradient-text">Financial Advisor</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            An AI that knows your spending, understands your goals, and guides
            you to financial freedom — 24/7.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Chatbot UI */}
          <ScrollReveal direction="left">
            <GlassCard
              className="overflow-hidden border border-[#06B6D4]/20"
              style={{ boxShadow: "0 0 60px rgba(6,182,212,0.1)" }}
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#0B1020]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">XPense AI Buddy</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-xs text-[#22C55E]">Online • Analyzing your data</span>
                  </div>
                </div>
                <div className="ml-auto flex gap-1">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                </div>
              </div>

              {/* Messages */}
              <div className="px-5 py-4 space-y-4 min-h-72">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.from === "ai" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center shrink-0 mr-2 mt-0.5">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white rounded-br-sm"
                          : "glass border border-white/8 text-gray-200 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      <p className="text-[10px] opacity-50 mt-1 text-right">{msg.time}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="glass border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.div
                        key={delay}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay }}
                        className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 glass rounded-xl p-3 border border-white/10">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask AI Buddy anything..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Features grid */}
          <div className="space-y-4">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-4">
                {aiFeatures.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <motion.div
                      key={feat.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="glass rounded-2xl p-4 border border-white/5 hover:border-[#06B6D4]/30 transition-all duration-300 flex items-start gap-4"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${feat.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: feat.color }} />
                      </div>
                      <div>
                        <p className="font-semibold mb-0.5">{feat.title}</p>
                        <p className="text-sm text-gray-400">{feat.desc}</p>
                      </div>
                      <div
                        className="ml-auto w-1 self-stretch rounded-full opacity-60"
                        style={{ background: feat.color }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="right" delay={0.3}>
              <GlassCard className="p-5 border border-white/8">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-sm font-semibold">AI Insights This Month</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { val: "47", label: "Insights sent", color: "#6C5DD3" },
                    { val: "Rp 320K", label: "Saved", color: "#22C55E" },
                    { val: "3", label: "Warnings issued", color: "#F59E0B" },
                  ].map(({ val, label, color }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3"
                      style={{ background: `${color}10` }}
                    >
                      <p className="text-lg font-black" style={{ color }}>{val}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
