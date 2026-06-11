"use client";
import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
  glow = false,
  onClick,
  style,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 0 40px rgba(108,93,211,0.25)",
              borderColor: "rgba(108,93,211,0.4)",
            }
          : undefined
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      style={style}
      className={cn(
        "glass rounded-2xl",
        glow && "glow-purple",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
