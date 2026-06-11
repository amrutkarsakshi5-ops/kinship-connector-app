import { Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-ember shadow-ember">
        <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      <span className="font-display text-2xl tracking-wide">
        FORGE<span className="text-gradient-ember">DIAL</span>
      </span>
    </Link>
  );
}
