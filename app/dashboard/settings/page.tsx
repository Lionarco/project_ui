"use client";
import { useState, useEffect } from "react";
import { Bell, Shield, Palette, Globe, Smartphone, CreditCard, User, Check } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { getUser, saveUser } from "@/lib/user";

type Tab = "profile" | "notifications" | "privacy" | "appearance";

const tabs = [
  { id: "profile" as Tab, label: "Profile", icon: User },
  { id: "notifications" as Tab, label: "Notifikasi", icon: Bell },
  { id: "privacy" as Tab, label: "Privasi", icon: Shield },
  { id: "appearance" as Tab, label: "Tampilan", icon: Palette },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative shrink-0 w-10 rounded-full transition-all duration-300 ${on ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED]" : "bg-white/10"}`}
      style={{ height: "22px" }}
    >
      <span
        className={`absolute top-0.5 bg-white rounded-full shadow transition-transform duration-300 ${on ? "translate-x-5" : "translate-x-0.5"}`}
        style={{ width: "18px", height: "18px" }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    expenseAlerts: true,
    budgetWarnings: true,
    aiInsights: true,
    streakReminders: true,
    weeklyReport: false,
    achievementAlerts: true,
    darkMode: true,
    compactView: false,
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currency: "IDR",
    language: "Bahasa Indonesia",
  });

  // Load user from localStorage
  useEffect(() => {
    const user = getUser();
    setProfile((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }));
  }, []);

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleSave = () => {
    // Save profile changes to localStorage
    saveUser({ name: profile.name, email: profile.email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Tab buttons — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:hidden">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === id
                ? "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white"
                : "glass border border-white/8 text-gray-400"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar — hidden on mobile */}
        <div className="w-44 shrink-0 space-y-1 hidden sm:block">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                activeTab === id
                  ? "bg-gradient-to-r from-[#6C5DD3]/20 to-[#7C3AED]/10 text-white border border-[#6C5DD3]/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {activeTab === "profile" && (
            <GlassCard className="p-6 border border-white/5">
              <h2 className="font-bold mb-5">Informasi Profil</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C5DD3] to-[#7C3AED] flex items-center justify-center text-2xl font-black shrink-0">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <button className="text-sm text-[#6C5DD3] hover:text-[#a78bfa] font-medium">Ganti avatar</button>
                  <p className="text-xs text-gray-500 mt-0.5">JPG, PNG max 2MB</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Nama Lengkap", key: "name", type: "text", placeholder: "Nama kamu" },
                  { label: "Email", key: "email", type: "email", placeholder: "nama@email.com" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs text-gray-400 font-medium mb-1.5 block">{label}</label>
                    <input
                      type={type}
                      value={profile[key as keyof typeof profile]}
                      onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[#6C5DD3]/50 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Mata Uang</label>
                  <select
                    className="w-full bg-[#0B1020] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6C5DD3]/50 transition-all"
                    value={profile.currency}
                    onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                  >
                    <option value="IDR">IDR — Indonesian Rupiah</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="SGD">SGD — Singapore Dollar</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === "notifications" && (
            <GlassCard className="p-6 border border-white/5">
              <h2 className="font-bold mb-5">Pengaturan Notifikasi</h2>
              <div className="space-y-1">
                {[
                  { key: "expenseAlerts", icon: CreditCard, label: "Expense Alerts", desc: "Notif saat kamu tambah pengeluaran" },
                  { key: "budgetWarnings", icon: Bell, label: "Budget Warnings", desc: "Alert saat budget 80% terpakai" },
                  { key: "aiInsights", icon: Globe, label: "AI Insights", desc: "Tips finansial harian yang personal" },
                  { key: "streakReminders", icon: Smartphone, label: "Streak Reminders", desc: "Pengingat untuk jaga streak harian" },
                  { key: "weeklyReport", icon: Bell, label: "Weekly Report", desc: "Ringkasan keuangan mingguan via email" },
                  { key: "achievementAlerts", icon: Bell, label: "Achievement Alerts", desc: "Saat kamu unlock badge baru" },
                ].map(({ key, icon: Icon, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3 min-w-0 pr-4">
                      <div className="w-8 h-8 rounded-xl bg-[#6C5DD3]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#6C5DD3]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-gray-500 truncate">{desc}</p>
                      </div>
                    </div>
                    <Toggle
                      on={settings[key as keyof typeof settings] as boolean}
                      onToggle={() => toggle(key as keyof typeof settings)}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {activeTab === "privacy" && (
            <GlassCard className="p-6 border border-white/5">
              <h2 className="font-bold mb-5">Privasi & Keamanan</h2>
              <div className="space-y-1">
                {[
                  { title: "Ganti Password", desc: "Update password akun kamu" },
                  { title: "Two-Factor Authentication", desc: "Tambah lapisan keamanan ekstra" },
                  { title: "Active Sessions", desc: "Kelola perangkat yang masuk akunmu" },
                  { title: "Export Data", desc: "Download semua data keuanganmu" },
                  { title: "Hapus Akun", desc: "Hapus akun dan semua data secara permanen", danger: true },
                ].map(({ title, desc, danger }) => (
                  <div key={title} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 gap-4">
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${danger ? "text-[#EF4444]" : ""}`}>{title}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                    <button className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      danger
                        ? "border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10"
                        : "border-white/10 text-gray-400 hover:text-white hover:border-[#6C5DD3]/30"
                    }`}>
                      {danger ? "Hapus" : "Kelola"}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {activeTab === "appearance" && (
            <GlassCard className="p-6 border border-white/5">
              <h2 className="font-bold mb-5">Tampilan</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Tema</p>
                  <div className="flex gap-3">
                    {["Dark", "System"].map((t) => (
                      <button
                        key={t}
                        className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                          t === "Dark"
                            ? "border-[#6C5DD3]/50 bg-[#6C5DD3]/10 text-white"
                            : "border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">Compact View</p>
                    <p className="text-xs text-gray-500">Tampilkan lebih banyak item dalam ruang lebih kecil</p>
                  </div>
                  <Toggle on={settings.compactView} onToggle={() => toggle("compactView")} />
                </div>
              </div>
            </GlassCard>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              saved
                ? "bg-[#22C55E] text-white"
                : "bg-gradient-to-r from-[#6C5DD3] to-[#7C3AED] text-white hover:opacity-90"
            }`}
          >
            {saved && <Check className="w-4 h-4" />}
            {saved ? "Tersimpan!" : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}
