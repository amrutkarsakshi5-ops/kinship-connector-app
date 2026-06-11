import { createFileRoute } from "@tanstack/react-router";
import {
  Eye,
  Phone,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Bell,
  Plus,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Business Dashboard — Iron Forge Athletics | ForgeDial" },
      { name: "description", content: "Track profile views, leads, reviews and revenue for your gym or studio." },
      { property: "og:title", content: "ForgeDial Business" },
      { property: "og:description", content: "Track profile views, leads, reviews and revenue." },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { icon: Eye, label: "Profile Views", value: "12,486", delta: "+18.2%", up: true },
  { icon: Phone, label: "Leads", value: "284", delta: "+12.4%", up: true },
  { icon: Star, label: "Avg Rating", value: "4.8", delta: "+0.1", up: true },
  { icon: DollarSign, label: "Revenue (est)", value: "$24.8K", delta: "-3.1%", up: false },
];

const LEADS = [
  { name: "Tyler N.", info: "Called · 12m ago", initial: "T" },
  { name: "Sasha K.", info: "Messaged · 44m ago", initial: "S" },
  { name: "Devon W.", info: "Booked tour · 2h ago", initial: "D" },
  { name: "Imani G.", info: "Saved listing · 5h ago", initial: "I" },
  { name: "Rohan P.", info: "Called · yesterday", initial: "R" },
];

const REVIEWS = [
  { name: "Renee K.", time: "1d ago", stars: 4, body: "Phenomenal facility — only knock is peak hours can get crowded around 6pm." },
  { name: "Marcus T.", time: "3d ago", stars: 5, body: "Best lifting environment in NYC. Coaches actually coach." },
];

// Sparkline points
const SPARK = [40, 52, 48, 64, 60, 78, 72, 85, 82, 96, 94, 110];

function Dashboard() {
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Business Dashboard</p>
          <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Iron Forge Athletics</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            212 Bowery, New York, NY · <span className="font-semibold text-foreground">Verified</span> · Plan:{" "}
            <span className="font-semibold text-ember">Pro</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card">
            <Bell className="h-5 w-5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-ember px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-ember">
            <Plus className="h-4 w-4" /> Promote Listing
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ember/10 text-ember">
                <s.icon className="h-5 w-5" />
              </span>
              <span
                className={
                  "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold " +
                  (s.up ? "bg-lime/15 text-lime" : "bg-destructive/15 text-destructive")
                }
              >
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {s.delta}
              </span>
            </div>
            <p className="mt-6 font-display text-4xl tracking-wide">{s.value}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Performance + Leads */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="inline-flex items-center gap-2 font-display text-xl tracking-wide">
                <TrendingUp className="h-4 w-4 text-ember" /> Performance
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Profile views, last 12 weeks</p>
            </div>
            <select className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold">
              <option>Last 12 weeks</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-6 h-64 w-full">
            <defs>
              <linearGradient id="ember-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,100 ${pts} 100,100`} fill="url(#ember-grad)" />
            <polyline
              points={pts}
              fill="none"
              stroke="var(--ember)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div className="mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span>W1</span>
            <span>W4</span>
            <span>W8</span>
            <span>W12</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="inline-flex items-center gap-2 font-display text-xl tracking-wide">
            <MessageSquare className="h-4 w-4 text-ember" /> Recent Leads
          </p>
          <div className="mt-4 space-y-3">
            {LEADS.map((l) => (
              <div key={l.name} className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-ember font-display text-sm text-white">
                  {l.initial}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.info}</p>
                </div>
                <button className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] hover:border-ember hover:text-ember">
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews + Upgrade */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-2 font-display text-xl tracking-wide">
              <MessageSquare className="h-4 w-4 text-ember" /> Reviews to Respond
            </p>
            <span className="rounded-full bg-ember/10 px-2.5 py-0.5 text-xs font-bold text-ember">
              {REVIEWS.length} new
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-xl border border-border bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-ember font-display text-sm text-white">
                      {r.name[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.time}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          "h-4 w-4 " +
                          (i < r.stars ? "fill-ember text-ember" : "text-muted-foreground/40")
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
                <button className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-ember">
                  Respond →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-ember p-6 text-white shadow-ember">
          <Sparkles className="absolute right-4 top-4 h-16 w-16 opacity-20" />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">Upgrade</p>
          <h3 className="mt-2 font-display text-4xl tracking-wide">Go Elite</h3>
          <p className="mt-3 text-sm text-white/90">
            Top-of-search placement, priority leads, advanced analytics, and a dedicated success
            manager.
          </p>
          <button className="mt-6 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ember">
            See plans
          </button>
        </div>
      </div>
    </div>
  );
}
