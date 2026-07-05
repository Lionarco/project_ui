/**
 * XPense Global Store — localStorage-based state management
 * NEW users start from ZERO. Demo users get sample data.
 */
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  label: string;
  category: string;
  amount: number;
  color: string;
  date: string;
  dateLabel: string;
  icon: string;
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
  lastActiveDate: string;
  title: string;
  initialized: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORE_KEY = "xpense_store";
const XP_PER_TRANSACTION = 50;

export const CATEGORY_META: Record<string, { color: string; icon: string }> = {
  "Food & Drink":   { color: "#7C6FF7", icon: "🍜" },
  "Transport":      { color: "#22D3EE", icon: "🚗" },
  "Shopping":       { color: "#34D399", icon: "🛍️" },
  "Entertainment":  { color: "#A78BFA", icon: "🎬" },
  "Coffee":         { color: "#FBBF24", icon: "☕" },
  "Bills":          { color: "#F87171", icon: "⚡" },
  "Health":         { color: "#F472B6", icon: "❤️" },
  "Other":          { color: "#94A3B8", icon: "📌" },
};

const LEVEL_TITLES: Record<number, string> = {
  1:  "Financial Newbie 🌱",
  2:  "Budget Rookie 📊",
  3:  "Savings Starter 💰",
  4:  "Expense Tracker ✅",
  5:  "Money Manager 💼",
  6:  "Budget Pro ⚡",
  7:  "Finance Expert 🎯",
  8:  "Wealth Builder 🏗️",
  9:  "Money Sage 🧠",
  10: "Financial Master 👑",
};

function XP_TO_NEXT(level: number): number {
  if (level <= 2) return 500;
  if (level <= 4) return 750;
  if (level <= 6) return 1000;
  if (level <= 8) return 1250;
  return 1500;
}

export function getTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, 10)] ?? "Financial Legend 🏆";
}

// ─── Empty store for NEW users ────────────────────────────────────────────────

export const EMPTY_STORE: StoreData = {
  transactions: [],
  budgets: [],
  totalXP: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  title: "Financial Newbie 🌱",
  initialized: true,
};

// ─── Demo data ────────────────────────────────────────────────────────────────

function buildDemoTransactions(): Transaction[] {
  const now = Date.now();
  return [
    { id: "d1",  label: "Indomaret",        category: "Shopping",      amount: 45000,  color: "#34D399", icon: "🛍️", date: new Date(now - 2*3600000).toISOString(),   dateLabel: "Hari ini, 10:32" },
    { id: "d2",  label: "Kopi Kenangan",    category: "Coffee",        amount: 28000,  color: "#FBBF24", icon: "☕", date: new Date(now - 4*3600000).toISOString(),   dateLabel: "Hari ini, 09:15" },
    { id: "d3",  label: "Grab Car",         category: "Transport",     amount: 35000,  color: "#22D3EE", icon: "🚗", date: new Date(now - 5*3600000).toISOString(),   dateLabel: "Hari ini, 08:45" },
    { id: "d4",  label: "Netflix",          category: "Entertainment", amount: 54000,  color: "#A78BFA", icon: "🎬", date: new Date(now - 26*3600000).toISOString(),  dateLabel: "Kemarin" },
    { id: "d5",  label: "Warteg Bu Dewi",  category: "Food & Drink",  amount: 15000,  color: "#7C6FF7", icon: "🍜", date: new Date(now - 28*3600000).toISOString(),  dateLabel: "Kemarin" },
    { id: "d6",  label: "Listrik PLN",     category: "Bills",         amount: 120000, color: "#F87171", icon: "⚡", date: new Date(now - 50*3600000).toISOString(),  dateLabel: "2 hari lalu" },
    { id: "d7",  label: "Tokopedia",        category: "Shopping",     amount: 250000, color: "#34D399", icon: "🛍️", date: new Date(now - 74*3600000).toISOString(),  dateLabel: "3 hari lalu" },
    { id: "d8",  label: "Starbucks",        category: "Coffee",       amount: 65000,  color: "#FBBF24", icon: "☕", date: new Date(now - 76*3600000).toISOString(),  dateLabel: "3 hari lalu" },
    { id: "d9",  label: "Apotek K24",      category: "Health",        amount: 85000,  color: "#F472B6", icon: "❤️", date: new Date(now - 100*3600000).toISOString(), dateLabel: "4 hari lalu" },
    { id: "d10", label: "Mie Ayam Pak Eko", category: "Food & Drink", amount: 18000,  color: "#7C6FF7", icon: "🍜", date: new Date(now - 102*3600000).toISOString(), dateLabel: "4 hari lalu" },
    { id: "d11", label: "Spotify Premium",  category: "Entertainment", amount: 49000,  color: "#A78BFA", icon: "🎬", date: new Date(now - 130*3600000).toISOString(), dateLabel: "5 hari lalu" },
    { id: "d12", label: "Ojol ke Kantor",  category: "Transport",     amount: 22000,  color: "#22D3EE", icon: "🚗", date: new Date(now - 145*3600000).toISOString(), dateLabel: "6 hari lalu" },
  ];
}

const DEMO_BUDGETS: Budget[] = [
  { id: "db1", label: "Food & Drink",   allocated: 1000000, color: "#7C6FF7" },
  { id: "db2", label: "Transport",      allocated: 500000,  color: "#22D3EE" },
  { id: "db3", label: "Shopping",       allocated: 600000,  color: "#34D399" },
  { id: "db4", label: "Entertainment",  allocated: 300000,  color: "#A78BFA" },
  { id: "db5", label: "Coffee",         allocated: 200000,  color: "#FBBF24" },
  { id: "db6", label: "Bills",          allocated: 500000,  color: "#F87171" },
];

export function loadDemoData() {
  // XP breakdown: Level 1(500) + Level 2(750) + Level 3(750) + Level 4(750) = 2750 XP consumed = Level 5
  // Then 450 more in Level 5 → total 3200 XP
  const demoStore: StoreData = {
    transactions: buildDemoTransactions(),
    budgets: DEMO_BUDGETS,
    totalXP: 3200,
    level: 5,
    streak: 14,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    title: "Money Manager 💼",
    initialized: true,
  };
  saveStore(demoStore);
  return demoStore;
}

// ─── Core CRUD ────────────────────────────────────────────────────────────────

export function getStore(): StoreData {
  if (typeof window === "undefined") return EMPTY_STORE;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...EMPTY_STORE };
    const parsed = JSON.parse(raw) as StoreData;
    if (!parsed.initialized) return { ...EMPTY_STORE };
    return {
      ...EMPTY_STORE,
      ...parsed,
      transactions: parsed.transactions ?? [],
      budgets: parsed.budgets ?? [],
    };
  } catch {
    return { ...EMPTY_STORE };
  }
}

export function saveStore(data: StoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...data, initialized: true }));
  window.dispatchEvent(new CustomEvent("xpense-store-update"));
}

export function resetStore() {
  if (typeof window === "undefined") return;
  const fresh = { ...EMPTY_STORE, lastActiveDate: new Date().toISOString().slice(0, 10) };
  localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
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
  const newTx: Transaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    label,
    category,
    amount,
    color: meta.color,
    icon: meta.icon,
    date: now.toISOString(),
    dateLabel: formatDateLabel(now),
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
  syncUserFromStore(updatedStore);

  return { xpGained: XP_PER_TRANSACTION, newLevel, levelUp: newLevel > oldLevel };
}

export function deleteTransaction(id: string) {
  const store = getStore();
  saveStore({ ...store, transactions: store.transactions.filter((t) => t.id !== id) });
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
  }
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function syncUserFromStore(store: StoreData) {
  try {
    const USER_KEY = "xpense_user";
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return;
    const user = JSON.parse(raw);
    localStorage.setItem(USER_KEY, JSON.stringify({
      ...user,
      xp: store.totalXP,
      level: store.level,
      streak: store.streak,
      title: store.title,
    }));
  } catch { /* silent */ }
}

// ─── React Hook ───────────────────────────────────────────────────────────────

export function useStore() {
  const [data, setData] = useState<StoreData>(EMPTY_STORE);

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
