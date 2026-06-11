// Utility untuk simpan & ambil data user dari localStorage

export const USER_KEY = "xpense_user";

export interface XPenseUser {
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  title: string;
}

const DEFAULT_USER: XPenseUser = {
  name: "User",
  email: "",
  avatar: "😊",
  level: 1,
  xp: 0,
  streak: 0,
  title: "Financial Newbie",
};

export function saveUser(data: Partial<XPenseUser>) {
  if (typeof window === "undefined") return;
  const existing = getUser();
  const merged = { ...existing, ...data };
  localStorage.setItem(USER_KEY, JSON.stringify(merged));
}

export function getUser(): XPenseUser {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return DEFAULT_USER;
    return { ...DEFAULT_USER, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_USER;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

// Nama singkat (first name saja)
export function getFirstName(name: string): string {
  return name.split(" ")[0] || name;
}

// Inisial untuk avatar
export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase() || "U";
}
