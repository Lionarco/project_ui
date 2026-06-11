"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2, Star } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import GlassCard from "@/components/shared/GlassCard";
import GradientButton from "@/components/shared/GradientButton";

type BillingCycle = "monthly" | "yearly";

const plans = [
  {
    id: "free",
    name: "Free",
    icon: Zap,
    color: "#6B7280",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect to start building better money habits",
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    features: [
      "Track up to 50 expenses/month",
      "3 budget categories",
      "Basic AI tips (5/month)",
      "Weekly spending summary",
      "Gamification basics (XP + Streak)",
      "Mobile app access",
    ],
    notIncluded: [
      "Unlimited expense tracking",
      "Advanced AI Buddy",
      "Custom challenges",
      "Export reports",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Star,
    color: "#6C5DD3",
    badge: "Most Popular",
    price: { monthly: 49000, yearly: 39000 },
    description: "For serious habit builders who want full power",
    cta: "Start Pro Free",
    ctaVariant: "primary" as const,
    highlight: true,
    features: [
      "Unlimited expense tracking",
      "Unlimited budget categories",
      "Advanced AI Buddy (unlimited)",
      "Daily personalized insights",
      "Full gamification (all badges)",
      "Custom financial challenges",
      "PDF & Excel export",
      "Priority support",
      "Monthly financial report",
      "Multi-account support",
    ],
    notIncluded: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    color: "#F59E0B",
    price: { monthly: -1, yearly: -1 },
    description: "For organizations building financial wellness programs",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "SLA guarantee",
      "Advanced analytics",
      "SSO / SAML integration",
      "Custom challenge programs",
      "Quarterly reviews",
    ],
    notIncluded: [],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section
      id="pricing"
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0F1E 0%, #0B1020 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 border border-[#6C5DD3]/30">
            <Crown className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-xs font-medium text-gray-400">Pricing Plans</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Simple, Transparent
            <br />
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Start free and upgrade anytime. No hidden fees, no surprise charges.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 glass rounded-xl p-1 border border-white/10">
            {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  billing === cycle
                    ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cycle}
                {cycle === "yearly" && (
                  <span className="ml-1 text-[10px] text-[#22C55E] font-bold">-20%</span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const price = plan.price[billing];
            const isHighlight = plan.highlight;

            return (
              <ScrollReveal key={plan.id} delay={i * 0.1} direction="up">
                <div className={`relative rounded-3xl ${isHighlight ? "gradient-border" : ""}`}>
                  <GlassCard
                    className={`p-6 border h-full flex flex-col ${
                      isHighlight
                        ? "pricing-highlight border-[#6C5DD3]/40"
                        : "border-white/5"
                    }`}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] rounded-full px-4 py-1 text-xs font-bold text-white shadow-lg">
                        {plan.badge}
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5 mt-2">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${plan.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: plan.color }} />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{plan.name}</p>
                        <p className="text-xs text-gray-500">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      {price === 0 ? (
                        <div className="text-3xl font-black">Free</div>
                      ) : price === -1 ? (
                        <div className="text-2xl font-black">Custom</div>
                      ) : (
                        <div className="flex items-end gap-1">
                          <div className="text-3xl font-black">
                            Rp {price.toLocaleString("id-ID")}
                          </div>
                          <div className="text-gray-500 text-sm mb-1">/mo</div>
                        </div>
                      )}
                      {billing === "yearly" && price > 0 && (
                        <p className="text-xs text-[#22C55E] mt-1">
                          Rp {(price * 12).toLocaleString("id-ID")}/year — Save 20%
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <GradientButton
                      variant={plan.ctaVariant}
                      size="md"
                      className="w-full mb-6"
                      id={`pricing-${plan.id}-cta`}
                    >
                      {plan.cta}
                    </GradientButton>

                    {/* Features */}
                    <div className="space-y-2.5 flex-1">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: `${plan.color}20` }}
                          >
                            <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                          </div>
                          <span className="text-sm text-gray-300">{f}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((f) => (
                        <div key={f} className="flex items-start gap-2.5 opacity-30">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-white/5">
                            <span className="text-[10px] text-gray-500">—</span>
                          </div>
                          <span className="text-sm text-gray-500 line-through">{f}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Money back */}
        <ScrollReveal className="text-center mt-10">
          <p className="text-sm text-gray-500">
            🔒 30-day money-back guarantee · No credit card required for Free plan · Cancel anytime
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
