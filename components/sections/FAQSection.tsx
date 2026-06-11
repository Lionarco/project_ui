"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";

const faqs = [
  {
    q: "Apakah XPense benar-benar gratis?",
    a: "Ya! Plan Free XPense gratis selamanya. Kamu bisa lacak hingga 50 transaksi per bulan, pakai 3 kategori budget, dan dapat 5 AI tips per bulan. Upgrade ke Pro kapan saja jika butuh fitur lebih lengkap.",
  },
  {
    q: "Data keuangan saya aman?",
    a: "Keamanan data adalah prioritas kami. Semua data dienkripsi dengan AES-256, disimpan di server berstandar ISO 27001, dan tidak pernah dibagikan ke pihak ketiga. Kamu juga bisa export atau hapus data kapan saja.",
  },
  {
    q: "Bagaimana sistem XP dan level bekerja?",
    a: "Kamu mendapatkan XP setiap kali mencatat pengeluaran, mempertahankan streak harian, menyelesaikan challenge, dan tetap dalam budget. Semakin banyak XP, level naik dan badge baru terbuka. Ada 20+ level dan 50+ badge untuk dikumpulkan!",
  },
  {
    q: "Apakah AI Buddy bisa bahasa Indonesia?",
    a: "Tentu! AI Buddy XPense mendukung Bahasa Indonesia sepenuhnya. Tanya apa saja tentang keuanganmu dan kamu akan mendapat insight yang personal, relevan, dan mudah dipahami.",
  },
  {
    q: "Bisa digunakan di HP juga?",
    a: "XPense tersedia di web (mobile-responsive), App Store (iOS), dan Google Play (Android). Semua data tersinkronisasi secara real-time antar perangkat.",
  },
  {
    q: "Bagaimana cara upgrade ke Pro?",
    a: "Klik 'Upgrade to Pro' di dashboard atau halaman Pricing. Pembayaran bisa via transfer bank, GoPay, OVO, Dana, dan kartu kredit/debit. Kamu langsung dapat akses semua fitur Pro setelah pembayaran dikonfirmasi.",
  },
  {
    q: "Apakah ada garansi uang kembali?",
    a: "Iya! Kami memberikan garansi uang kembali 30 hari penuh tanpa pertanyaan. Jika tidak puas dengan XPense Pro dalam 30 hari, refund langsung diproses.",
  },
  {
    q: "Bisa pakai XPense untuk bisnis/tim?",
    a: "Plan Enterprise XPense dirancang khusus untuk kebutuhan bisnis dan tim. Tersedia team dashboard, custom branding, API access, dan dedicated account manager. Hubungi tim sales kami untuk demo.",
  },
];

function FAQItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlassCard
        className={`border transition-all duration-200 overflow-hidden ${
          open ? "border-[#6C5DD3]/40" : "border-white/5"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          id={`faq-${index}`}
        >
          <span className="text-sm font-semibold pr-4">{item.q}</span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown
              className="w-4 h-4"
              style={{ color: open ? "#6C5DD3" : "#6B7280" }}
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="px-5 pb-4 border-t border-white/5">
                <p className="text-sm text-gray-400 leading-relaxed pt-3">
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1020 0%, #0A0F1E 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <Plus className="w-3.5 h-3.5 text-[#6C5DD3]" />
            <span className="text-xs font-medium text-gray-400">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Pertanyaan yang
            <br />
            <span className="gradient-text">Sering Ditanya</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tidak menemukan jawaban yang dicari?{" "}
            <span className="text-[#6C5DD3] cursor-pointer hover:text-[#a78bfa] transition-colors">
              Hubungi kami
            </span>
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollReveal className="mt-10 text-center">
          <div className="glass inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl px-6 py-4 border border-white/8">
            <div className="text-left">
              <p className="text-sm font-semibold">Masih ada pertanyaan?</p>
              <p className="text-xs text-gray-400">
                Tim support kami siap membantu 24/7
              </p>
            </div>
            <button className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Chat Support
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
