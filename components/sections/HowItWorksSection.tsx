"use client";
import { motion } from "framer-motion";
import { Zap, Wallet, BarChart2, Bot, TrendingUp, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const steps = [
  {
    step: "01",
    icon: Wallet,
    title: "Track Expenses",
    description:
      "Log any expense in seconds with smart category detection. Never lose track of where your money goes.",
    color: "#6C5DD3",
  },
  {
    step: "02",
    icon: BarChart2,
    title: "Create Budgets",
    description:
      "Set realistic monthly budgets per category. Get proactive alerts before you overspend.",
    color: "#22C55E",
  },
  {
    step: "03",
    icon: Zap,
    title: "Earn XP",
    description:
      "Every expense you log, every budget you stick to earns XP. Level up your financial character.",
    color: "#F59E0B",
  },
  {
    step: "04",
    icon: Bot,
    title: "Get AI Insights",
    description:
      "Your AI Buddy analyzes patterns and delivers personalized saving tips and budget recommendations.",
    color: "#06B6D4",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Improve Financial Habits",
    description:
      "Watch your savings grow, maintain streaks, complete challenges, and become a Financial Warrior.",
    color: "#7C3AED",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0B1020 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <ChevronRight className="w-3.5 h-3.5 text-[#6C5DD3]" />
            <span className="text-xs font-medium text-gray-400">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Simple Steps to
            <br />
            <span className="gradient-text">Financial Freedom</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Getting started takes less than 2 minutes. Then let XPense guide
            you every step of the way.
          </p>
        </ScrollReveal>

        {/* Timeline — desktop horizontal, mobile vertical */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#6C5DD3]/0 via-[#6C5DD3]/30 to-[#7C3AED]/0 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.step} delay={i * 0.1} direction="up">
                  <div className="flex flex-col items-center text-center group">
                    {/* Icon circle */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                        boxShadow: `0 0 30px ${step.color}15`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} />
                      {/* Step number badge */}
                      <div
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center text-white"
                        style={{ background: step.color }}
                      >
                        {step.step.replace("0", "")}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-base font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Mobile connector arrow (not last) */}
                    {i < steps.length - 1 && (
                      <div className="lg:hidden mt-6 mb-2">
                        <motion.div
                          animate={{ y: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight
                            className="w-5 h-5 text-[#6C5DD3]/40 rotate-90"
                          />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-16">
          <div className="glass inline-flex items-center gap-3 rounded-2xl px-6 py-4 border border-[#6C5DD3]/30">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-300 font-medium">
              Average user sees improvement in{" "}
              <span className="text-[#22C55E] font-bold">2 weeks</span> of
              consistent tracking
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
