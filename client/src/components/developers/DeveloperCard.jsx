import { Github, Linkedin, Sparkles } from "lucide-react";

const DeveloperCard = ({ developer }) => (
  <article className="glass rounded-lg p-5 transition hover:-translate-y-1 hover:border-sky-400/50">
    <div className="flex items-start gap-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-slate-800 text-lg font-black text-sky-300">
        {developer.profilePicture ? (
          <img src={developer.profilePicture} alt={developer.name} className="h-full w-full rounded-lg object-cover" />
        ) : (
          developer.name?.slice(0, 1)
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-lg font-bold text-white">{developer.name}</h3>
        <p className="capitalize text-sm text-sky-300">{developer.role}</p>
      </div>
      <div className="ml-auto flex items-center gap-1 rounded-full border border-sky-400/30 px-2 py-1 text-xs text-sky-200">
        <Sparkles size={13} />
        {developer.matchScore || 0}
      </div>
    </div>
    <p className="mt-4 line-clamp-3 min-h-12 text-sm text-slate-300">{developer.bio || "Open to building, mentoring, and collaborating."}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {(developer.skills || []).slice(0, 5).map((skill) => (
        <span key={skill} className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-200">
          {skill}
        </span>
      ))}
    </div>
    <div className="mt-5 flex gap-3 text-slate-400">
      {developer.github && <a href={developer.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>}
      {developer.linkedin && <a href={developer.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>}
    </div>
  </article>
);

export default DeveloperCard;
