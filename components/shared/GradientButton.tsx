"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  id?: string;
}

export default function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  id,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white hover:from-[#7C3AED] hover:to-[#6C5DD3]",
    secondary:
      "bg-transparent border border-[#6C5DD3]/50 text-[#a78bfa] hover:bg-[#6C5DD3]/10",
    outline:
      "bg-transparent border border-white/10 text-white hover:border-[#6C5DD3]/50 hover:bg-white/5",
  };

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 overflow-hidden",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        id={id}
        className={base}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      id={id}
      className={base}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {content}
    </motion.button>
  );
}
