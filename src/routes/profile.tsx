import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Flame, Star, Calendar, Award, Heart, Edit, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Jamie Rivera | ForgeDial" },
      { name: "description", content: "Your saved listings, reviews, badges, and upcoming events on ForgeDial." },
      { property: "og:title", content: "ForgeDial Profile" },
      { property: "og:description", content: "Your saved gyms, reviews, badges and upcoming events." },
    ],
  }),
  component: Profile,
});

const STATS = [
  { icon: Flame, label: "Workouts", value: 184 },
  { icon: Star, label: "Reviews", value: 27 },
  { icon: Calendar, label: "Events", value: 12 },
  { icon: Award, label: "Badges", value: 8 },
];

const SAVED = [
  { name: "Iron Forge Athletics", city: "New York, NY", rating: 4.8, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" },
  { name: "Pulse Boutique Cycling", city: "Los Angeles, CA", rating: 4.7, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" },
  { name: "Mile High CrossFit", city: "Denver, CO", rating: 4.9, img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80" },
];

const BADGES = ["100LB", "5K", "1Y", "PR", "RX", "VIP", "PRO", "OG"];

const REVIEWS = [
  { gym: "Iron Forge Athletics", stars: 5, body: "Best lifting environment in NYC. Coaches actually coach." },
  { gym: "Mile High CrossFit", stars: 4, body: "Solid programming, friendly community. Parking can be tight on weekends." },
];

const UPCOMING = [
  { title: "NYC Marathon Prep", when: "Sat, Jun 14 · 6:30 AM" },
  { title: "Austin Open Powerlifting Meet", when: "Sat, Jul 12 · 8:00 AM" },
];

function Profile() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header card */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-ember/15 via-sunshine/10 to-card p-8">
        <div className="flex flex-wrap items-start gap-6">
          <span className="grid h-28 w-28 place-items-center rounded-full bg-gradient-ember font-display text-4xl text-white shadow-ember">
            JR
          </span>
          <div className="flex-1">
            <h1 className="font-display text-5xl tracking-wide sm:text-6xl">Jamie Rivera</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-ember" /> Brooklyn, NY{" "}
              <span className="text-border">·</span> Lifter · Trail runner{" "}
              <span className="text-border">·</span> Member since 2024
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Powerlifting", "Trail Running", "Yoga"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ember/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ember"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card">
              <Edit className="h-5 w-5" />
            </button>
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <s.icon className="h-5 w-5 text-ember" />
              <p className="mt-3 font-display text-4xl tracking-wide">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl tracking-wide">Saved Listings</h2>
            <Link
              to="/search"
              className="text-xs font-bold uppercase tracking-[0.18em] text-ember"
            >
              Browse more →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {SAVED.map((l) => (
              <article key={l.name} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={l.img} alt={l.name} className="h-full w-full object-cover" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card text-ember">
                    <Heart className="h-4 w-4 fill-current" />
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-lg tracking-wide">{l.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {l.city} · <span className="text-ember">{l.rating} ★</span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <h2 className="mt-12 font-display text-3xl tracking-wide">Your Reviews</h2>
          <div className="mt-5 space-y-4">
            {REVIEWS.map((r) => (
              <div key={r.gym} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg tracking-wide">{r.gym}</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Side */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="inline-flex items-center gap-2 font-display text-xl tracking-wide">
              <Award className="h-4 w-4 text-ember" /> Badges
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {BADGES.map((b) => (
                <div
                  key={b}
                  className="grid aspect-square place-items-center rounded-xl bg-ember/10 font-display text-lg tracking-wide text-ember"
                >
                  {b}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="inline-flex items-center gap-2 font-display text-xl tracking-wide">
              <Calendar className="h-4 w-4 text-ember" /> Upcoming
            </p>
            <div className="mt-4 space-y-3">
              {UPCOMING.map((u) => (
                <div key={u.title} className="rounded-xl bg-muted/60 p-3">
                  <p className="text-sm font-semibold">{u.title}</p>
                  <p className="text-xs text-muted-foreground">{u.when}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
