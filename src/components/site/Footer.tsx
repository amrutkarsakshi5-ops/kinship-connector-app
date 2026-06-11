import { Logo } from "./Logo";

const COLS = [
  {
    title: "Explore",
    links: ["Browse Gyms", "Find Trainers", "Yoga Studios", "Martial Arts", "Events"],
  },
  {
    title: "For Business",
    links: ["List Your Business", "Business Dashboard", "Pricing", "Success Stories", "Resources"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Help Center"],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            America&apos;s directory for serious athletes — gyms, coaches, clubs,
            and events from coast to coast.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm tracking-[0.2em] text-foreground">
              {col.title.toUpperCase()}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} ForgeDial. Built for athletes.</span>
          <span className="font-bold uppercase tracking-[0.18em] text-ember">
            Find your edge.
          </span>
        </div>
      </div>
    </footer>
  );
}
