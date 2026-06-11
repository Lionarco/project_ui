"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Mic, Paperclip, RefreshCw, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";

type Message = {
  id: number;
  from: "user" | "ai";
  text: string;
  time: string;
  typing?: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "Halo Ardiansyah! 👋 Saya AI Buddy kamu. Saya udah analisis keuangan kamu bulan ini dan punya beberapa insight menarik. Mau tanya apa dulu?",
    time: "10:00",
  },
  {
    id: 2,
    from: "user",
    text: "Kenapa pengeluaran makanan saya tinggi banget bulan ini?",
    time: "10:02",
  },
  {
    id: 3,
    from: "ai",
    text: "📊 Berdasarkan data transaksi kamu, ada beberapa temuan:\n\n• Pengeluaran makanan bulan ini: **Rp 680.000** dari budget **Rp 1.000.000** (68%)\n• Rata-rata per hari: **Rp 22.667**\n• Hari paling boros: **Sabtu & Minggu** (weekend dining out)\n\n🔍 Pola yang saya temukan: Kamu cenderung order GrabFood di hari kerja saat jam makan siang (11-13.00). Ini menyumbang ~40% dari total food expense!",
    time: "10:02",
  },
  {
    id: 4,
    from: "ai",
    text: "💡 **Rekomendasi saya:**\n1. Meal prep di hari Minggu untuk 3 hari ke depan\n2. Limit GrabFood maksimal 2x seminggu\n3. Manfaatkan kantin/warteg untuk makan siang\n\nEstimasi penghematan: **Rp 250.000 - 350.000/bulan!** Mau saya buatkan challenge-nya?",
    time: "10:02",
  },
];

const quickReplies = [
  "Analisis budget saya",
  "Tips hemat bulan ini",
  "Lihat streak saya",
  "Prediksi pengeluaran",
];

const aiCapabilities = [
  { icon: "📊", label: "Spending Analysis", desc: "Analisis pola pengeluaran harian/bulanan" },
  { icon: "⚠️", label: "Budget Alerts", desc: "Peringatan sebelum budget habis" },
  { icon: "💡", label: "Saving Tips", desc: "Saran tabungan personal" },
  { icon: "📈", label: "Financial Reports", desc: "Laporan keuangan otomatis" },
  { icon: "🎯", label: "Goal Setting", desc: "Bantu capai target keuangan" },
  { icon: "🔮", label: "Predictions", desc: "Prediksi pengeluaran bulan depan" },
];

function formatText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function AIBuddyPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponses: Record<string, string> = {
        "Analisis budget saya":
          "📊 **Budget Analysis bulan Juni:**\n\n✅ Food & Drink: 68% (aman)\n⚠️ Shopping: 82% (hampir habis!)\n✅ Transport: 64% (aman)\n✅ Entertainment: 18% (sangat baik)\n\nOverall budget health: **Baik** 🟡\n\nKamu masih punya sisa Rp 1.820.000 untuk sisa bulan ini!",
        "Tips hemat bulan ini":
          "💡 **3 Tips Hemat Prioritas untuk Kamu:**\n\n1. **Kurangi weekend dining** → hemat Rp 150K\n2. **Batalkan langganan yang jarang dipakai** → hemat Rp 80K\n3. **Pakai transportasi umum 3x seminggu** → hemat Rp 120K\n\n**Total potensi hemat: Rp 350.000/bulan!** 🎯",
        "Lihat streak saya":
          "🔥 **Streak Update:**\n\nCurrent streak: **14 hari** berturut-turut!\n\nKamu butuh 16 hari lagi untuk unlock achievement **30-Day Streak** dan dapat **+750 XP**!\n\n📅 Jangan lupa catat pengeluaran hari ini ya~",
        "Prediksi pengeluaran":
          "🔮 **Prediksi Pengeluaran Bulan Depan:**\n\nBerdasarkan pola 3 bulan terakhir:\n• Food: ~Rp 750.000\n• Transport: ~Rp 380.000\n• Shopping: ~Rp 520.000\n• Bills: ~Rp 174.000\n\n**Total estimasi: Rp 1.824.000**\n\nAku sarankan naikkan budget shopping jadi Rp 600K bulan depan. Setuju?",
      };

      const response = aiResponses[text] ||
        `🤔 Pertanyaan bagus! Berdasarkan data keuangan kamu, saya sedang menganalisis... \n\nSecara umum, keuangan kamu bulan ini cukup sehat dengan tabungan **Rp 2.570.000** (51% income). Terus pertahankan! 💪\n\nAda hal spesifik yang ingin kamu tanyakan lebih lanjut?`;

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: "ai",
          text: response,
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex gap-6 max-w-6xl" style={{ height: "calc(100vh - 10rem)" }}>
      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <GlassCard className="border border-white/5 mb-4 shrink-0">
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-[#0A0F1E]" />
            </div>
            <div>
              <p className="font-bold">XPense AI Buddy</p>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"
                />
                <span className="text-xs text-[#22C55E]">Online · Analyzing your data</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "ai" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className={`max-w-[75%] group`}>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white rounded-br-sm"
                      : "glass border border-white/8 text-gray-200 rounded-bl-sm"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                  />
                </div>
                <div className={`flex items-center gap-2 mt-1 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] text-gray-600">{msg.time}</span>
                  {msg.from === "ai" && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-0.5 text-gray-600 hover:text-[#22C55E]"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="p-0.5 text-gray-600 hover:text-[#EF4444]"><ThumbsDown className="w-3 h-3" /></button>
                      <button className="p-0.5 text-gray-600 hover:text-gray-300"><Copy className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>

              {msg.from === "user" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                  A
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-3 items-start"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#6C5DD3] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="glass border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: d }}
                      className="w-2 h-2 rounded-full bg-[#06B6D4]"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 shrink-0">
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="shrink-0 px-3 py-1.5 glass rounded-xl border border-white/10 text-xs text-gray-300 hover:text-white hover:border-[#6C5DD3]/40 transition-all whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <GlassCard className="border border-white/8 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3">
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Tanya AI Buddy apa saja tentang keuanganmu…"
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                input.trim()
                  ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED]"
                  : "bg-white/5 opacity-50 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </GlassCard>
      </div>

      {/* Sidebar capabilities */}
      <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
        <GlassCard className="p-4 border border-white/5">
          <h3 className="text-sm font-bold mb-3">AI Capabilities</h3>
          <div className="space-y-2">
            {aiCapabilities.map((cap) => (
              <button
                key={cap.label}
                onClick={() => sendMessage(cap.label)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
              >
                <span className="text-lg">{cap.icon}</span>
                <div>
                  <p className="text-xs font-semibold group-hover:text-[#6C5DD3] transition-colors">{cap.label}</p>
                  <p className="text-[10px] text-gray-500">{cap.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-4 border border-[#06B6D4]/20" style={{ background: "rgba(6,182,212,0.04)" }}>
          <h3 className="text-sm font-bold mb-2">This Month Stats</h3>
          <div className="space-y-2">
            {[
              { label: "Insights sent", val: "47", color: "#6C5DD3" },
              { label: "Money saved", val: "Rp 320K", color: "#22C55E" },
              { label: "Alerts issued", val: "3", color: "#F59E0B" },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-xs font-bold" style={{ color }}>{val}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
