import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Search", to: "/search" },
  { label: "Events", to: "/events" },
  { label: "Business", to: "/dashboard" },
  { label: "Profile", to: "/profile" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active =
              item.to === "/"
                ? pathname === "/"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors " +
                  (active
                    ? "bg-ember/10 text-ember"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full border border-border bg-input px-4 py-2 text-sm text-muted-foreground sm:flex">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search gyms, trainers…"
              className="w-52 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
          <button className="rounded-full bg-gradient-ember px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-ember transition-transform hover:-translate-y-0.5">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
