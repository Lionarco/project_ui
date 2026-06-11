"use client";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";

const testimonials = [
  {
    name: "Ardiansyah P.",
    role: "Software Engineer",
    avatar: "A",
    avatarColor: "#6C5DD3",
    badge: "Financial Warrior 🏆",
    rating: 5,
    text: "XPense completely changed how I think about money. The gamification makes it genuinely fun — I actually look forward to logging my expenses to keep my streak alive. Saved Rp 3 juta in my first month!",
    highlight: "Saved Rp 3 juta in first month",
  },
  {
    name: "Siti Rahmawati",
    role: "UX Designer",
    avatar: "S",
    avatarColor: "#22C55E",
    badge: "Budget Master 🎯",
    rating: 5,
    text: "The AI Buddy is unreal. It noticed I was spending 40% more on food delivery and suggested meal prep. Now I'm Level 15 and have an emergency fund for the first time in my life. 10/10 would recommend!",
    highlight: "Built first emergency fund",
  },
  {
    name: "Reza Mahendra",
    role: "College Student",
    avatar: "R",
    avatarColor: "#F59E0B",
    badge: "Streak Legend 🔥",
    rating: 5,
    text: "I tried 5 finance apps before XPense. None of them stuck. The streak system and XP keep me coming back daily. I've tracked expenses for 47 days straight — my longest ever financial habit!",
    highlight: "47-day tracking streak",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1020 0%, #0A0F1E 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#22C55E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#22C55E]/30">
            <Star className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]" />
            <span className="text-xs font-medium text-[#22C55E]">Testimonials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Loved by
            <br />
            <span className="gradient-text">50,000+ Users</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real people. Real results. See how XPense transformed their
            financial habits.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12} direction="up">
              <GlassCard
                hover
                className="p-6 border border-white/5 h-full flex flex-col"
              >
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-6 h-6 text-[#6C5DD3]/40" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Highlight */}
                <div
                  className="rounded-xl px-3 py-2 mb-5 text-xs font-semibold"
                  style={{
                    background: `${t.avatarColor}15`,
                    color: t.avatarColor,
                  }}
                >
                  ✨ {t.highlight}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.avatarColor}, ${t.avatarColor}80)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                  <span
                    className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: t.avatarColor,
                      background: `${t.avatarColor}20`,
                    }}
                  >
                    {t.badge}
                  </span>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Social proof strip */}
        <ScrollReveal className="mt-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span>⭐ 4.9/5 on App Store</span>
            <span className="text-white/10">|</span>
            <span>⭐ 4.8/5 on Google Play</span>
            <span className="text-white/10">|</span>
            <span>🏆 Product Hunt #1 Finance App</span>
            <span className="text-white/10">|</span>
            <span>📰 Featured on TechCrunch</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
