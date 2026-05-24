import { Link } from "react-router-dom";
import { Github, Linkedin, Pencil } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="grid gap-6">
      <section className="glass rounded-lg p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid h-24 w-24 place-items-center rounded-lg bg-slate-800 text-3xl font-black text-sky-300">
            {user?.profilePicture ? <img src={user.profilePicture} alt={user.name} className="h-full w-full rounded-lg object-cover" /> : user?.name?.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-white">{user?.name}</h1>
                <p className="mt-1 capitalize text-sky-300">{user?.role}</p>
              </div>
              <Link className="btn-primary" to="/profile/edit"><Pencil size={18} />Edit</Link>
            </div>
            <p className="mt-5 max-w-3xl text-slate-300">{user?.bio || "No bio yet. Add what you are learning, building, or mentoring."}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-lg p-5">
          <h2 className="text-xl font-black text-white">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {user?.skills?.length ? user.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-sky-400/10 px-3 py-1 text-sm text-sky-200">{skill}</span>
            )) : <p className="text-sm text-slate-400">No skills added.</p>}
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="text-xl font-black text-white">Links</h2>
          <div className="mt-4 grid gap-3">
            {user?.github && <a className="btn-ghost justify-start" href={user.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub</a>}
            {user?.linkedin && <a className="btn-ghost justify-start" href={user.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn</a>}
            {!user?.github && !user?.linkedin && <p className="text-sm text-slate-400">No public links added.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
