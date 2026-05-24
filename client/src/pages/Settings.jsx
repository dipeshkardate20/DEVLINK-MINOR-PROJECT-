import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

const Settings = () => {
  const { theme, setTheme, toggleTheme, isDark } = useTheme();

  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-4xl font-black text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Control the look and feel of your DEVLINK workspace.</p>
      </section>

      <section className="glass rounded-lg p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black text-white">Theme</h2>
            <p className="mt-1 text-sm text-slate-400">Switch between dark and light modes.</p>
          </div>
          <button className="btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {isDark ? "Switch To Light" : "Switch To Dark"}
          </button>
        </div>

        <div className="mt-5 inline-flex rounded-lg border border-white/10 bg-black/10 p-1">
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${theme === "dark" ? "bg-sky-400 text-slate-950" : "text-slate-300"}`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${theme === "light" ? "bg-sky-400 text-slate-950" : "text-slate-300"}`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
