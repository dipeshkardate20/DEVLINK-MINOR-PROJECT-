import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "beginner" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-md place-items-center px-4 py-12">
      <form onSubmit={handleSubmit} className="glass w-full rounded-lg p-6 shadow-glow">
        <h1 className="text-3xl font-black text-white">Join DEVLINK</h1>
        <p className="mt-2 text-sm text-slate-400">Create your profile and start finding mentors or teammates.</p>
        <div className="mt-6 grid gap-4">
          <input className="field" name="name" placeholder="Full name" value={form.name} onChange={updateField} required />
          <input className="field" name="email" type="email" placeholder="Email" value={form.email} onChange={updateField} required />
          <input className="field" name="password" type="password" placeholder="Password" minLength={6} value={form.password} onChange={updateField} required />
          <select className="field" name="role" value={form.role} onChange={updateField}>
            <option value="beginner">Beginner</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        <p className="mt-5 text-center text-sm text-slate-400">
          Already joined? <Link className="text-sky-300" to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
