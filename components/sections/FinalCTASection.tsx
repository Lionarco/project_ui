"use client";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import ParticlesBackground from "@/components/shared/ParticlesBackground";
import GradientButton from "@/components/shared/GradientButton";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FinalCTASection() {
  return (
    <section
      id="cta"
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0B1020 0%, #0A0F1E 100%)",
      }}
    >
      {/* Animated gradient bg */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,93,211,0.25) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.2) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,93,211,0.25) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Particles */}
      <div className="absolute inset-0">
        <ParticlesBackground count={40} />
      </div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#6C5DD3]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#6C5DD3]/15 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 border border-[#6C5DD3]/30">
            <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-xs font-medium text-gray-300">
              Join 50,000+ Financial Warriors
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.05]">
            Ready to{" "}
            <span className="gradient-text">Level Up</span>
            <br />
            Your Financial
            <br />
            <span className="gradient-text">Habit?</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Start for free. No credit card required. Track your first expense
            in under 60 seconds and start earning XP today.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <GradientButton
              variant="primary"
              size="lg"
              id="final-cta-primary"
              className="text-base px-10 py-4 shadow-lg shadow-[#6C5DD3]/30"
            >
              <Zap className="w-5 h-5" />
              Get Started Free
            </GradientButton>
            <GradientButton
              variant="outline"
              size="lg"
              id="final-cta-demo"
              className="text-base"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </div>

          {/* Mini features */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {[
              "✅ Free forever plan",
              "✅ No credit card",
              "✅ iOS & Android",
              "✅ 30-day Pro trial",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
