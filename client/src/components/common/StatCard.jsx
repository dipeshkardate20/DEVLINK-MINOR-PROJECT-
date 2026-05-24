const StatCard = ({ label, value, caption }) => (
  <div className="glass rounded-lg p-5">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-black text-white">{value}</p>
    <p className="mt-1 text-sm text-slate-500">{caption}</p>
  </div>
);

export default StatCard;
