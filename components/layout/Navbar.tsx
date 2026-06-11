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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group" id="nav-logo">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center glow-purple transition-all duration-300 group-hover:scale-110">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">X</span>Pense
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs text-[#6C5DD3] hover:text-[#a78bfa] transition-colors font-medium border border-[#6C5DD3]/30 px-3 py-1.5 rounded-lg hover:bg-[#6C5DD3]/10"
                id="nav-demo"
              >
                Coba Demo
              </Link>
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                id="nav-login"
              >
                Log in
              </Link>
              <Link href="/register">
                <GradientButton variant="primary" size="sm" id="nav-signup">
                  Start Free
                </GradientButton>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
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
            className="fixed top-16 inset-x-0 z-40 glass border-b border-white/5 px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/5 mt-2 flex flex-col gap-2">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-[#6C5DD3] font-medium">
                  🚀 Coba Demo
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm text-gray-400 hover:text-white">
                  Log in
                </Link>
                <Link href="/register">
                  <GradientButton variant="primary" size="sm" className="w-full">
                    Start Free
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
