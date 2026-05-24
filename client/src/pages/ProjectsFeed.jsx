import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import ProjectCard from "../components/projects/ProjectCard";
import { getProjects, joinProject } from "../services/projectService";

const ProjectsFeed = () => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ q: "", status: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async (params = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await getProjects(params);
      setProjects(data.projects);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const updateField = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    loadProjects(filters);
  };

  const handleCreated = (project) => setProjects((current) => [project, ...current]);

  const handleJoin = async (id) => {
    try {
      const data = await joinProject(id);
      setProjects((current) => current.map((project) => (project._id === id ? data.project : project)));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to join project");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside>
        <CreateProjectForm onCreated={handleCreated} />
      </aside>
      <section className="grid gap-5">
        <div>
          <h1 className="text-4xl font-black text-white">Projects Feed</h1>
          <p className="mt-2 text-slate-400">Post project ideas, recruit teammates, and join builds that match your skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass grid gap-3 rounded-lg p-4 md:grid-cols-[1fr_180px_auto]">
          <input className="field" name="q" placeholder="Search projects or skills" value={filters.q} onChange={updateField} />
          <select className="field" name="status" value={filters.status} onChange={updateField}>
            <option value="">Any status</option>
            <option value="open">Open</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn-primary"><Search size={18} />Search</button>
        </form>

        {error && <p className="text-red-300">{error}</p>}
        {loading ? (
          <p className="text-slate-400">Loading projects...</p>
        ) : (
          <div className="grid gap-4">
            {projects.length ? projects.map((project) => <ProjectCard key={project._id} project={project} onJoin={handleJoin} />) : (
              <div className="glass rounded-lg p-6 text-slate-400">No projects found. Create the first one.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsFeed;
