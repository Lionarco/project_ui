/**
 * XPense Global Store — localStorage-based state management
 * Manages: transactions, budgets, XP, streak, level
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  label: string;
  category: string;
  amount: number;
  color: string;
  date: string;           // ISO string
  dateLabel: string;      // human readable
  icon: string;           // emoji
  note?: string;
}

export interface Budget {
  id: string;
  label: string;
  allocated: number;
  color: string;
}

export interface StoreData {
  transactions: Transaction[];
  budgets: Budget[];
  totalXP: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  title: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORE_KEY = "xpense_store";
const XP_PER_TRANSACTION = 50;
const XP_PER_LEVEL: Record<number, number> = {
  1: 500, 2: 500, 3: 750, 4: 750, 5: 1000,
  6: 1000, 7: 1250, 8: 1250, 9: 1500, 10: 1500,
};
const XP_TO_NEXT = (level: number) => XP_PER_LEVEL[Math.min(level, 10)] ?? 2000;

const LEVEL_TITLES: Record<number, string> = {
  1: "Financial Newbie 🌱",
  2: "Budget Rookie 📊",
  3: "Savings Starter 💰",
  4: "Expense Tracker ✅",
  5: "Money Manager 💼",
  6: "Budget Pro ⚡",
  7: "Finance Expert 🎯",
  8: "Wealth Builder 🏗️",
  9: "Money Sage 🧠",
  10: "Financial Master 👑",
};
const getTitle = (level: number) => LEVEL_TITLES[Math.min(level, 10)] ?? "Financial Legend 🏆";

export const CATEGORY_META: Record<string, { color: string; icon: string }> = {
  "Food & Drink":   { color: "#6C5DD3", icon: "🍜" },
  "Transport":      { color: "#06B6D4", icon: "🚗" },
  "Shopping":       { color: "#22C55E", icon: "🛍️" },
  "Entertainment":  { color: "#7C3AED", icon: "🎬" },
  "Coffee":         { color: "#F59E0B", icon: "☕" },
  "Bills":          { color: "#EF4444", icon: "⚡" },
  "Health":         { color: "#EC4899", icon: "❤️" },
  "Other":          { color: "#9CA3AF", icon: "📌" },
};

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: "t1", label: "Indomaret", category: "Shopping",     amount: 45000,  color: "#22C55E", icon: "🛍️", date: new Date(Date.now() - 2*60*60*1000).toISOString(), dateLabel: "Hari ini, 10:32" },
  { id: "t2", label: "Kopi Kenangan", category: "Coffee",   amount: 28000,  color: "#F59E0B", icon: "☕", date: new Date(Date.now() - 4*60*60*1000).toISOString(), dateLabel: "Hari ini, 09:15" },
  { id: "t3", label: "Grab Car",   category: "Transport",   amount: 35000,  color: "#06B6D4", icon: "🚗", date: new Date(Date.now() - 5*60*60*1000).toISOString(), dateLabel: "Hari ini, 08:45" },
  { id: "t4", label: "Netflix",    category: "Entertainment", amount: 54000, color: "#7C3AED", icon: "🎬", date: new Date(Date.now() - 26*60*60*1000).toISOString(), dateLabel: "Kemarin" },
  { id: "t5", label: "Warteg Bu Dewi", category: "Food & Drink", amount: 15000, color: "#6C5DD3", icon: "🍜", date: new Date(Date.now() - 28*60*60*1000).toISOString(), dateLabel: "Kemarin" },
  { id: "t6", label: "Listrik PLN", category: "Bills",      amount: 120000, color: "#EF4444", icon: "⚡", date: new Date(Date.now() - 50*60*60*1000).toISOString(), dateLabel: "2 hari lalu" },
  { id: "t7", label: "Tokopedia",  category: "Shopping",    amount: 250000, color: "#22C55E", icon: "🛍️", date: new Date(Date.now() - 74*60*60*1000).toISOString(), dateLabel: "3 hari lalu" },
  { id: "t8", label: "Starbucks",  category: "Coffee",      amount: 65000,  color: "#F59E0B", icon: "☕", date: new Date(Date.now() - 76*60*60*1000).toISOString(), dateLabel: "3 hari lalu" },
];

const DEFAULT_BUDGETS: Budget[] = [
  { id: "b1", label: "Food & Drink",   allocated: 1000000, color: "#6C5DD3" },
  { id: "b2", label: "Transport",      allocated: 500000,  color: "#06B6D4" },
  { id: "b3", label: "Shopping",       allocated: 600000,  color: "#22C55E" },
  { id: "b4", label: "Entertainment",  allocated: 300000,  color: "#7C3AED" },
  { id: "b5", label: "Coffee",         allocated: 200000,  color: "#F59E0B" },
  { id: "b6", label: "Bills",          allocated: 500000,  color: "#EF4444" },
];

const DEFAULT_STORE: StoreData = {
  transactions: DEFAULT_TRANSACTIONS,
  budgets: DEFAULT_BUDGETS,
  totalXP: 400,
  level: 1,
  streak: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  title: "Financial Newbie 🌱",
};

// ─── Core CRUD ────────────────────────────────────────────────────────────────

export function getStore(): StoreData {
  if (typeof window === "undefined") return DEFAULT_STORE;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...DEFAULT_STORE };
    const parsed = JSON.parse(raw) as StoreData;
    return {
      ...DEFAULT_STORE,
      ...parsed,
      transactions: parsed.transactions ?? DEFAULT_TRANSACTIONS,
      budgets: parsed.budgets ?? DEFAULT_BUDGETS,
    };
  } catch {
    return { ...DEFAULT_STORE };
  }
}

function saveStore(data: StoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
  // Dispatch custom event so all listeners update
  window.dispatchEvent(new CustomEvent("xpense-store-update"));
}

export function resetStore() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORE_KEY);
  window.dispatchEvent(new CustomEvent("xpense-store-update"));
}

// ─── XP & Level System ────────────────────────────────────────────────────────

function computeLevel(totalXP: number): { level: number; xpInLevel: number; xpNeeded: number } {
  let level = 1;
  let remaining = totalXP;
  while (remaining >= XP_TO_NEXT(level) && level < 20) {
    remaining -= XP_TO_NEXT(level);
    level++;
  }
  return { level, xpInLevel: remaining, xpNeeded: XP_TO_NEXT(level) };
}

// ─── Streak System ────────────────────────────────────────────────────────────

export function updateStreak(store: StoreData): StoreData {
  const today = new Date().toISOString().slice(0, 10);
  const last = store.lastActiveDate;
  if (last === today) return store;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = last === yesterday ? store.streak + 1 : 1;

  return { ...store, streak: newStreak, lastActiveDate: today };
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export function addTransaction(
  label: string,
  category: string,
  amount: number,
  note?: string
): { xpGained: number; newLevel: number; levelUp: boolean } {
  const store = getStore();
  const meta = CATEGORY_META[category] ?? CATEGORY_META["Other"];

  const now = new Date();
  const dateLabel = formatDateLabel(now);

  const newTx: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    label,
    category,
    amount,
    color: meta.color,
    icon: meta.icon,
    date: now.toISOString(),
    dateLabel,
    note,
  };

  const newTotalXP = store.totalXP + XP_PER_TRANSACTION;
  const oldLevel = store.level;
  const { level: newLevel } = computeLevel(newTotalXP);

  const updatedStore = updateStreak({
    ...store,
    transactions: [newTx, ...store.transactions],
    totalXP: newTotalXP,
    level: newLevel,
    title: getTitle(newLevel),
  });

  saveStore(updatedStore);

  // Sync to user profile
  syncUserFromStore(updatedStore);

  return {
    xpGained: XP_PER_TRANSACTION,
    newLevel,
    levelUp: newLevel > oldLevel,
  };
}

export function deleteTransaction(id: string) {
  const store = getStore();
  const updated = {
    ...store,
    transactions: store.transactions.filter((t) => t.id !== id),
  };
  saveStore(updated);
}

// ─── Budgets ──────────────────────────────────────────────────────────────────

export function addBudget(label: string, allocated: number) {
  const store = getStore();
  const meta = CATEGORY_META[label] ?? CATEGORY_META["Other"];
  const newBudget: Budget = {
    id: `b_${Date.now()}`,
    label,
    allocated,
    color: meta.color,
  };
  saveStore({ ...store, budgets: [...store.budgets, newBudget] });
}

export function deleteBudget(id: string) {
  const store = getStore();
  saveStore({ ...store, budgets: store.budgets.filter((b) => b.id !== id) });
}

// ─── Derived stats ────────────────────────────────────────────────────────────

export function getSpentByCategory(transactions: Transaction[]): Record<string, number> {
  return transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);
}

export function getThisMonthTransactions(transactions: Transaction[]): Transaction[] {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return transactions.filter((tx) => new Date(tx.date) >= startOfMonth);
}

export function getTodayTransactions(transactions: Transaction[]): Transaction[] {
  const today = new Date().toISOString().slice(0, 10);
  return transactions.filter((tx) => tx.date.slice(0, 10) === today);
}

export function getXPInfo(totalXP: number) {
  const { level, xpInLevel, xpNeeded } = computeLevel(totalXP);
  return {
    level,
    xpInLevel,
    xpNeeded,
    pct: Math.min((xpInLevel / xpNeeded) * 100, 100),
    title: getTitle(level),
    totalXP,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateLabel(date: Date): string {
  const today = new Date();
  const yesterday = new Date(Date.now() - 86400000);

  if (date.toDateString() === today.toDateString()) {
    return `Hari ini, ${date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Kemarin";
  } else {
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  }
}

function syncUserFromStore(store: StoreData) {
  try {
    const USER_KEY = "xpense_user";
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return;
    const user = JSON.parse(raw);
    const updated = {
      ...user,
      xp: store.totalXP,
      level: store.level,
      streak: store.streak,
      title: store.title,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
  } catch {
    // silent
  }
}

// ─── React Hook ───────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

export function useStore() {
  const [data, setData] = useState<StoreData>(DEFAULT_STORE);

  useEffect(() => {
    setData(getStore());
    const handler = () => setData(getStore());
    window.addEventListener("xpense-store-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("xpense-store-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return data;
}
