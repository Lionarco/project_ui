"use client";
import { motion } from "framer-motion";
import {
  Zap,
  PieChart,
  Bot,
  Trophy,
  BarChart2,
  Target,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";

const features = [
  {
    icon: Zap,
    title: "Quick Expense Tracking",
    description:
      "Log any expense in under 3 seconds. Smart category detection saves time on every transaction.",
    color: "#6C5DD3",
    gradient: "from-[#6C5DD3]/20 to-[#7C3AED]/5",
  },
  {
    icon: Target,
    title: "Smart Budget Planner",
    description:
      "Set monthly budgets per category and get real-time alerts before you overspend.",
    color: "#22C55E",
    gradient: "from-[#22C55E]/20 to-[#22C55E]/5",
  },
  {
    icon: Bot,
    title: "AI Financial Buddy",
    description:
      "Your personal AI advisor that analyzes spending patterns and delivers personalized tips daily.",
    color: "#06B6D4",
    gradient: "from-[#06B6D4]/20 to-[#06B6D4]/5",
  },
  {
    icon: Trophy,
    title: "Gamification System",
    description:
      "Earn XP for every entry, unlock achievements, maintain streaks, and climb the leaderboard.",
    color: "#F59E0B",
    gradient: "from-[#F59E0B]/20 to-[#F59E0B]/5",
  },
  {
    icon: BarChart2,
    title: "Insight Dashboard",
    description:
      "Beautiful charts, spending breakdowns, and monthly trend reports that turn data into clarity.",
    color: "#7C3AED",
    gradient: "from-[#7C3AED]/20 to-[#7C3AED]/5",
  },
  {
    icon: PieChart,
    title: "Financial Challenges",
    description:
      "Join weekly saving missions, complete habit challenges, and build long-term financial discipline.",
    color: "#F59E0B",
    gradient: "from-[#F59E0B]/20 to-[#22C55E]/5",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0A0F1E 0%, #0B1020 50%, #0A0F1E 100%)",
      }}
    >
      {/* Grid dot bg */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <Zap className="w-3.5 h-3.5 text-[#6C5DD3]" />
            <span className="text-xs font-medium text-gray-400">
              Everything You Need
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Powerful Features,
            <br />
            <span className="gradient-text">Built for Habit</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every feature is designed to make managing money effortless,
            insightful, and actually enjoyable.
          </p>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08} direction="up">
                <GlassCard
                  hover
                  className={`p-6 h-full bg-gradient-to-br ${feature.gradient} border border-white/5`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${feature.color}20` }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: feature.color }}
                    />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    className="mt-5 h-0.5 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                    }}
                    whileHover={{ opacity: 1 }}
                  />
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
