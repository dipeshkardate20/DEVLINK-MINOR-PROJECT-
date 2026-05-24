import { useState } from "react";
import { Plus } from "lucide-react";
import { createProject } from "../../services/projectService";

const initialState = {
  title: "",
  description: "",
  requiredSkills: "",
  teamRequirements: ""
};

const CreateProjectForm = ({ onCreated }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await createProject(form);
      onCreated(data.project);
      setForm(initialState);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-5">
      <h2 className="text-xl font-black text-white">Create Project</h2>
      <div className="mt-4 grid gap-3">
        <input className="field" name="title" placeholder="Project title" value={form.title} onChange={updateField} required />
        <textarea className="field min-h-28" name="description" placeholder="What are you building?" value={form.description} onChange={updateField} required />
        <input className="field" name="requiredSkills" placeholder="Required skills: React, Node, MongoDB" value={form.requiredSkills} onChange={updateField} />
        <input className="field" name="teamRequirements" placeholder="Team requirements" value={form.teamRequirements} onChange={updateField} />
      </div>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <button className="btn-primary mt-4 w-full" disabled={submitting}>
        <Plus size={18} />
        {submitting ? "Creating..." : "Post Project"}
      </button>
    </form>
  );
};

export default CreateProjectForm;
