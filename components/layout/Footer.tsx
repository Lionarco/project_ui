"use client";
import { Zap, Globe, Link2, MessageCircle, Camera } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  Support: ["Help Center", "Contact", "Status", "Community"],
};

const socials = [
  { icon: MessageCircle, href: "#", label: "Twitter / X" },
  { icon: Globe, href: "#", label: "GitHub" },
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="gradient-text">X</span>Pense
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              The gamified personal finance platform that makes managing money
              rewarding and fun.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-[#6C5DD3] hover:border-[#6C5DD3]/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 XPense. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Made with</span>
            <span className="text-[#6C5DD3]">♥</span>
            <span>for better financial habits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
