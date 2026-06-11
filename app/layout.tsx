import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ScrollToTop from "@/components/shared/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XPense — Level Up Your Financial Habit",
  description:
    "Track expenses, manage budgets, unlock achievements, and receive AI-powered financial insights—all in one gamified platform.",
  keywords: [
    "expense tracker",
    "personal finance",
    "budget planner",
    "gamified finance",
    "AI financial insights",
    "XPense",
  ],
  openGraph: {
    title: "XPense — Level Up Your Financial Habit",
    description:
      "Track expenses, manage budgets, unlock achievements, and receive AI-powered financial insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0A0F1E] text-white antialiased font-inter overflow-x-hidden">
        <LoadingScreen />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
