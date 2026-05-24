import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import DeveloperCard from "../components/developers/DeveloperCard";
import { discoverUsers } from "../services/userService";

const DiscoverDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const [filters, setFilters] = useState({ q: "", role: "", lookingFor: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDevelopers = async (params = filters) => {
    setLoading(true);
    setError("");
    try {
      const data = await discoverUsers(params);
      setDevelopers(data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load developers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  const updateField = (event) => setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    loadDevelopers(filters);
  };

  return (
    <div className="grid gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-black text-white">Discover Developers</h1>
          <p className="mt-2 text-slate-400">Find mentors, teammates, and project-ready builders through skill signals.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="glass grid gap-3 rounded-lg p-4 md:grid-cols-[1fr_180px_180px_auto]">
        <input className="field" name="q" placeholder="Search skills, name, or bio" value={filters.q} onChange={updateField} />
        <select className="field" name="role" value={filters.role} onChange={updateField}>
          <option value="">All roles</option>
          <option value="beginner">Beginner</option>
          <option value="professional">Professional</option>
        </select>
        <select className="field" name="lookingFor" value={filters.lookingFor} onChange={updateField}>
          <option value="">Any goal</option>
          <option value="mentor">Mentor</option>
          <option value="teammate">Teammate</option>
          <option value="project">Project</option>
        </select>
        <button className="btn-primary"><Search size={18} />Search</button>
      </form>

      {error && <p className="text-red-300">{error}</p>}
      {loading ? (
        <p className="text-slate-400">Loading developers...</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {developers.length ? developers.map((developer) => <DeveloperCard key={developer._id} developer={developer} />) : (
            <div className="glass rounded-lg p-6 text-slate-400">No developers found. Add more skills to your profile or adjust filters.</div>
          )}
        </section>
      )}
    </div>
  );
};

export default DiscoverDevelopers;
