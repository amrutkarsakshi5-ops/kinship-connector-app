import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Star, SlidersHorizontal, Check } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search the Directory — ForgeDial" },
      { name: "description", content: "Find verified gyms, coaches and studios across the United States." },
      { property: "og:title", content: "Search ForgeDial" },
      { property: "og:description", content: "Find verified pros across the United States." },
    ],
  }),
  component: SearchPage,
});

const CATS = [
  "All",
  "Gym",
  "Personal Trainer",
  "Yoga Studio",
  "CrossFit",
  "Martial Arts",
  "Sports Club",
  "Nutritionist",
  "Physio",
] as const;

const RESULTS = [
  { name: "Iron Forge Athletics", city: "New York, NY", rating: 4.8, reviews: 1284, tag: "Gym", price: "$$", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" },
  { name: "Pulse Boutique Cycling", city: "Los Angeles, CA", rating: 4.7, reviews: 642, tag: "Studio", price: "$$$", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" },
  { name: "Mile High CrossFit", city: "Denver, CO", rating: 4.9, reviews: 980, tag: "CrossFit", price: "$$", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80" },
  { name: "Brooklyn Mat Co.", city: "Brooklyn, NY", rating: 4.8, reviews: 410, tag: "Martial Arts", price: "$$", img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80" },
  { name: "Lakeside Yoga House", city: "Chicago, IL", rating: 4.6, reviews: 318, tag: "Yoga Studio", price: "$$", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80" },
  { name: "Coach Maya Reyes", city: "Austin, TX", rating: 5.0, reviews: 142, tag: "Personal Trainer", price: "$$$", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80" },
];

function SearchPage() {
  const [cat, setCat] = useState<string>("All");

  const filtered = cat === "All" ? RESULTS : RESULTS.filter((r) => r.tag === cat);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl tracking-wide sm:text-6xl">Search the directory</h1>
      <p className="mt-2 text-muted-foreground">Find verified pros across the United States.</p>

      <form className="mt-8 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row">
        <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Gym, trainer, sport…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </label>
        <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 sm:border-l sm:border-border">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="City, state or ZIP"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-gradient-ember px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-ember"
        >
          Search
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors " +
              (cat === c
                ? "bg-gradient-ember text-white shadow-ember"
                : "border border-border bg-card text-muted-foreground hover:text-foreground")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-xl tracking-wide">
              <SlidersHorizontal className="h-4 w-4 text-ember" /> Filters
            </p>
            <button className="text-xs font-semibold text-ember">Reset</button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Price</p>
            <div className="mt-2 flex gap-2">
              {["$", "$$", "$$$"].map((p) => (
                <button key={p} className="flex-1 rounded-lg border border-border bg-muted py-2 text-sm font-semibold hover:border-ember hover:text-ember">
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Rating</p>
            <div className="mt-2 space-y-2 text-sm">
              {["4.5+ stars", "4+ stars", "3.5+ stars", "3+ stars"].map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <span className="grid h-4 w-4 place-items-center rounded border border-border bg-muted text-transparent peer-checked:bg-ember peer-checked:text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <input type="checkbox" className="peer hidden" />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Verified only
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Open now
            </label>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Amenities</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["24/7", "Sauna", "Showers", "Parking", "Kids", "Classes"].map((a) => (
                <button key={a} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold hover:border-ember hover:text-ember">
                  {a}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> results
            </p>
            <select className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]">
              <option>Recommended</option>
              <option>Top Rated</option>
              <option>Most Reviews</option>
              <option>Nearest</option>
            </select>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {filtered.map((r) => (
              <article key={r.name} className="overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img src={r.img} alt={r.name} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                    {r.tag}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-ember/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    {r.price}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-lg tracking-wide">{r.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {r.city}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-ember text-ember" />
                    <span className="font-semibold">{r.rating}</span>
                    <span className="text-muted-foreground">({r.reviews} reviews)</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
