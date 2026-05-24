import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Compass, FolderKanban, LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Logo from "../components/common/Logo";
import useAuth from "../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings }
];

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-ink/90 p-5 backdrop-blur lg:block">
        <Link to="/dashboard"><Logo /></Link>
        <nav className="mt-10 grid gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-sky-400 text-ink" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="btn-ghost absolute bottom-5 left-5 right-5" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="lg:hidden"><Logo /></div>
            <p className="hidden text-sm text-slate-400 lg:block">Build network. Find mentors. Ship together.</p>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-300 sm:block">{user?.name}</span>
              <button className="btn-ghost px-3 py-2 lg:hidden" onClick={handleLogout} aria-label="Logout">
                <LogOut size={17} />
              </button>
            </div>
          </div>
        </header>
        <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-white/10 bg-ink/95 lg:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `grid place-items-center gap-1 px-2 py-3 text-xs ${isActive ? "text-sky-300" : "text-slate-400"}`}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
        <main className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
