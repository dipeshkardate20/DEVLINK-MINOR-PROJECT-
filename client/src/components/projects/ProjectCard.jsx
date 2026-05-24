import { Users } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const ProjectCard = ({ project, onJoin }) => {
  const { user } = useAuth();
  const isMember = project.members?.some((member) => (member._id || member) === user?._id);

  return (
    <article className="glass rounded-lg p-5 transition hover:-translate-y-1 hover:border-sky-400/50">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-slate-400">By {project.owner?.name || "DEVLINK member"}</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 px-3 py-1 text-xs capitalize text-emerald-200">
          {project.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
      {project.teamRequirements && <p className="mt-3 text-sm text-slate-400">{project.teamRequirements}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.requiredSkills || []).map((skill) => (
          <span key={skill} className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Users size={16} />
          {project.members?.length || 0} members
        </div>
        <button className={isMember ? "btn-ghost opacity-70" : "btn-primary"} disabled={isMember} onClick={() => onJoin(project._id)}>
          {isMember ? "Joined" : "Join Project"}
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
