import { Code2 } from "lucide-react";

const Logo = () => (
  <div className="flex items-center gap-2 font-black tracking-wide text-white">
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-400 text-ink shadow-glow">
      <Code2 size={20} />
    </span>
    <span>DEVLINK</span>
  </div>
);

export default Logo;
