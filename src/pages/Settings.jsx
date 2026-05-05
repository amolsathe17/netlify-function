import { useState } from "react";
import { User, Bell, Shield, Moon, Globe, Trash2, Save } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    emailUpdates: false,
    language: "English",
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className=" relative flex items-center justify-center p-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-4">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="./m1.jpg"
          alt="bg"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-7xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 mt-20">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-6">
          Settings
        </h1>

        <p className="text-slate-300 mb-8">
          Manage your account preferences and app experience
        </p>

        {/* Grid Sections */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Account */}
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h2 className="flex items-center gap-2 text-white font-semibold mb-4">
              <User size={18} /> Account
            </h2>

            <button className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200">
              Edit Profile
            </button>

            <button className="w-full mt-3 text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200">
              Change Password
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h2 className="flex items-center gap-2 text-white font-semibold mb-4">
              <Bell size={18} /> Notifications
            </h2>

            <Toggle
              label="Push Notifications"
              enabled={settings.notifications}
              onChange={() => toggle("notifications")}
            />

            <Toggle
              label="Email Updates"
              enabled={settings.emailUpdates}
              onChange={() => toggle("emailUpdates")}
            />
          </div>

          {/* Appearance */}
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h2 className="flex items-center gap-2 text-white font-semibold mb-4">
              <Moon size={18} /> Appearance
            </h2>

            <Toggle
              label="Dark Mode"
              enabled={settings.darkMode}
              onChange={() => toggle("darkMode")}
            />
          </div>

          {/* Language */}
          <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
            <h2 className="flex items-center gap-2 text-white font-semibold mb-4">
              <Globe size={18} /> Language
            </h2>

            <select
              className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20"
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
            </select>
          </div>

        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-red-500/10 border border-red-500/30 p-5 rounded-2xl">
          <h2 className="flex items-center gap-2 text-red-400 font-semibold mb-3">
            <Trash2 size={18} /> Danger Zone
          </h2>

          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white">
            Delete Account
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl">
            <Save size={18} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

/* Toggle Component */
function Toggle({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-slate-200">{label}</span>

      <button
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-indigo-500" : "bg-slate-600"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transform transition ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}