import { Link, Outlet } from "react-router-dom";
import Logo from "../components/common/Logo";

const PublicLayout = () => (
  <div className="min-h-screen">
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="DEVLINK home">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <Link className="btn-ghost px-4 py-2" to="/login">Login</Link>
          <Link className="btn-primary px-4 py-2" to="/signup">Join</Link>
        </div>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;
