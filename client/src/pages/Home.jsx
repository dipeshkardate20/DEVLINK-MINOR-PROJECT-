import { Link } from "react-router-dom";
import { ArrowRight, GitBranch, Handshake, Rocket, Search } from "lucide-react";

const features = [
  { icon: Handshake, title: "Mentor matching", text: "Beginners discover professionals by skill overlap and learning goals." },
  { icon: GitBranch, title: "Project teams", text: "Create collaboration posts, list required skills, and build public momentum." },
  { icon: Search, title: "Developer discovery", text: "Find teammates, mentors, and opportunity-ready profiles in one focused network." }
];

const Home = () => (
  <>
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-200">
            <Rocket size={16} />
            Developer networking rebuilt for builders
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Connect. Build. Grow.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
            Where developers meet opportunities. DEVLINK helps beginners, professionals, mentors, and teams find each other through skills and real projects.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" to="/signup">
              Start Building
              <ArrowRight size={18} />
            </Link>
            <Link className="btn-ghost" to="/login">Login</Link>
          </div>
        </div>

        <div className="glass relative rounded-lg p-5 shadow-glow">
          <div className="rounded-lg border border-white/10 bg-slate-950/80 p-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-6 space-y-4 font-mono text-sm">
              <p><span className="text-sky-300">const</span> network = <span className="text-emerald-300">DEVLINK</span>.match(user.skills)</p>
              <p><span className="text-slate-500">{"// suggested collaborators"}</span></p>
              {["React mentor", "Node teammate", "MongoDB project"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-slate-200">
                  {item}
                </div>
              ))}
              <p><span className="text-sky-300">ship</span>(project, team)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-white/10 bg-white/[0.02] py-16">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass rounded-lg p-6">
            <Icon className="text-sky-300" size={28} />
            <h2 className="mt-5 text-xl font-black text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <span>DEVLINK</span>
      <span>Built for developers who learn by shipping.</span>
    </footer>
  </>
);

export default Home;
