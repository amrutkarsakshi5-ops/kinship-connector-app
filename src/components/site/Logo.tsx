import { Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-ember shadow-ember">
        <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      <span className="font-logo text-2xl font-bold tracking-tight">
        Forge<span className="text-gradient-ember">Dial</span>
      </span>
    </Link>
  );
}
