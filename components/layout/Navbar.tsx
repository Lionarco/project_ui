"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import GradientButton from "@/components/shared/GradientButton";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Gamification", href: "#gamification" },
  { label: "AI Buddy", href: "#ai-buddy" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0D1225]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30"
            : "bg-[#0D1225]/70 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0" id="nav-logo">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C6FF7] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C6FF7]/30 transition-all duration-300 group-hover:scale-110">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                <span className="gradient-text">X</span>Pense
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-[#A8B4CC] hover:text-white rounded-lg hover:bg-white/8 transition-all duration-200 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="/login"
                className="text-sm text-[#A8B4CC] hover:text-white transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-white/8"
                id="nav-login"
              >
                Masuk
              </Link>
              <Link href="/register">
                <GradientButton variant="primary" size="sm" id="nav-signup">
                  Mulai Gratis
                </GradientButton>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-[#A8B4CC] hover:text-white hover:bg-white/8 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-[#0F1530]/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[#A8B4CC] hover:text-white hover:bg-white/8 rounded-xl transition-all font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[#A8B4CC] hover:text-white rounded-xl transition-all"
                >
                  Masuk
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <GradientButton variant="primary" size="sm" className="w-full">
                    Mulai Gratis
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
