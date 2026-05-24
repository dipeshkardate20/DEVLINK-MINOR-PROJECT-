import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateProfile, uploadProfileAsset } from "../services/userService";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "",
    role: user?.role || "beginner",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    profilePicture: user?.profilePicture || "",
    resume: user?.resume || "",
    lookingFor: user?.lookingFor || ""
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const data = await updateProfile(form);
      setUser(data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (event, field) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(field);
    try {
      const data = await uploadProfileAsset(file);
      setForm((current) => ({ ...current, [field]: data.url }));
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass mx-auto max-w-3xl rounded-lg p-6">
      <h1 className="text-3xl font-black text-white">Edit Profile</h1>
      <div className="mt-6 grid gap-4">
        <input className="field" name="name" placeholder="Name" value={form.name} onChange={updateField} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <select className="field" name="role" value={form.role} onChange={updateField}>
            <option value="beginner">Beginner</option>
            <option value="professional">Professional</option>
          </select>
          <select className="field" name="lookingFor" value={form.lookingFor} onChange={updateField}>
            <option value="">Open</option>
            <option value="mentor">Mentor</option>
            <option value="teammate">Teammate</option>
            <option value="project">Project</option>
          </select>
        </div>
        <textarea className="field min-h-32" name="bio" placeholder="Bio" value={form.bio} onChange={updateField} />
        <input className="field" name="skills" placeholder="Skills: React, Node, MongoDB" value={form.skills} onChange={updateField} />
        <input className="field" name="github" placeholder="GitHub URL" value={form.github} onChange={updateField} />
        <input className="field" name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={updateField} />
        <input className="field" name="profilePicture" placeholder="Profile image URL or Cloudinary URL" value={form.profilePicture} onChange={updateField} />
        <label className="grid gap-2 text-sm text-slate-400">
          Upload profile image
          <input className="field" type="file" accept="image/*" onChange={(event) => handleUpload(event, "profilePicture")} />
          {uploading === "profilePicture" && <span className="text-sky-300">Uploading image...</span>}
        </label>
        <input className="field" name="resume" placeholder="Resume URL or Cloudinary URL" value={form.resume} onChange={updateField} />
        <label className="grid gap-2 text-sm text-slate-400">
          Upload resume
          <input className="field" type="file" accept=".pdf,.doc,.docx" onChange={(event) => handleUpload(event, "resume")} />
          {uploading === "resume" && <span className="text-sky-300">Uploading resume...</span>}
        </label>
      </div>
      {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
      <button className="btn-primary mt-6 w-full" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</button>
    </form>
  );
};

export default EditProfile;
