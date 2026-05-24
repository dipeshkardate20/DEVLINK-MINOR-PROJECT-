import { Link } from "react-router-dom";
import { Compass, FolderKanban, UserRoundPen } from "lucide-react";
import StatCard from "../components/common/StatCard";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="grid gap-8">
      <section className="glass rounded-lg p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.25em] text-sky-300">DEVLINK workspace</p>
        <h1 className="mt-3 text-4xl font-black text-white">Welcome, {user?.name}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Your developer profile is the center of your network. Add skills, discover people with matching goals, and join projects that need your stack.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/discover"><Compass size={18} />Find Developers</Link>
          <Link className="btn-ghost" to="/projects"><FolderKanban size={18} />Browse Projects</Link>
          <Link className="btn-ghost" to="/profile/edit"><UserRoundPen size={18} />Edit Profile</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Role" value={user?.role || "Beginner"} caption="Used for matchmaking priority" />
        <StatCard label="Skills" value={user?.skills?.length || 0} caption="Add more skills to improve matches" />
        <StatCard label="Looking for" value={user?.lookingFor || "Open"} caption="Mentor, teammate, or project" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-lg p-5">
          <h2 className="text-xl font-black text-white">Next best actions</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link className="rounded-lg border border-white/10 p-4 hover:border-sky-400/50" to="/profile/edit">Complete your bio and links</Link>
            <Link className="rounded-lg border border-white/10 p-4 hover:border-sky-400/50" to="/discover">Find mentors and teammates by shared skills</Link>
            <Link className="rounded-lg border border-white/10 p-4 hover:border-sky-400/50" to="/projects">Post or join a collaboration project</Link>
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="text-xl font-black text-white">Profile signal</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Strong DEVLINK profiles have focused skills, a clear learning or building goal, and public GitHub or LinkedIn links. This improves discovery and project trust.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
