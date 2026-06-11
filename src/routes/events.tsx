import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Users, Calendar, Ticket } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Compete this season | ForgeDial" },
      { name: "description", content: "Marathons, throwdowns, opens, and festivals — from coast to coast." },
      { property: "og:title", content: "ForgeDial Events" },
      { property: "og:description", content: "Marathons, throwdowns, opens, and festivals — coast to coast." },
    ],
  }),
  component: EventsPage,
});

const SPORTS = ["All", "Running", "CrossFit", "Powerlifting", "BJJ", "Yoga", "Trail Running"];

const FEATURED = {
  title: "NYC Marathon Prep — Long Run Series",
  date: "Sat, Jun 14 · 6:30 AM",
  city: "New York, NY",
  attending: 240,
  host: "Iron Forge Athletics",
  img: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1600&q=80",
};

const EVENTS = [
  { day: "SUN", num: "22", mon: "JUN", title: "Venice Beach Throwdown", city: "Los Angeles, CA", sport: "CrossFit", attending: 180, price: "$45", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80" },
  { day: "SAT", num: "5", mon: "JUL", title: "Front Range Trail Summit", city: "Denver, CO", sport: "Trail Running", attending: 320, price: "$25", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80" },
  { day: "SAT", num: "12", mon: "JUL", title: "Austin Open Powerlifting Meet", city: "Austin, TX", sport: "Powerlifting", attending: 96, price: "$75", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80" },
  { day: "SUN", num: "20", mon: "JUL", title: "Brooklyn No-Gi Open", city: "Brooklyn, NY", sport: "BJJ", attending: 140, price: "$60", img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80" },
  { day: "SAT", num: "2", mon: "AUG", title: "Lake Tahoe Sunrise Yoga Fest", city: "Tahoe, CA", sport: "Yoga", attending: 210, price: "$35", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80" },
  { day: "SUN", num: "17", mon: "AUG", title: "Chicago Lakefront 10K", city: "Chicago, IL", sport: "Running", attending: 410, price: "$30", img: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80" },
];

function EventsPage() {
  const [sport, setSport] = useState("All");
  const list = sport === "All" ? EVENTS : EVENTS.filter((e) => e.sport === sport);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Events</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Compete this season</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Marathons, throwdowns, opens, and festivals — from coast to coast.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {SPORTS.map((s) => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] " +
              (sport === s
                ? "bg-gradient-ember text-white shadow-ember"
                : "border border-border bg-card text-muted-foreground hover:text-foreground")
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* Featured */}
      <article className="relative mt-10 overflow-hidden rounded-3xl border border-border">
        <img src={FEATURED.img} alt={FEATURED.title} className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-12">
          <span className="w-fit rounded-full bg-gradient-ember px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-ember">
            Featured Event
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-wide sm:text-5xl">
            {FEATURED.title}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-ember-glow" /> {FEATURED.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-ember-glow" /> {FEATURED.city}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-ember-glow" /> {FEATURED.attending} going
            </span>
          </div>
          <p className="mt-3 text-sm opacity-90">Hosted by <span className="font-semibold">{FEATURED.host}</span></p>
          <div className="mt-6 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-ember px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] shadow-ember">
              <Ticket className="h-4 w-4" /> Register · Free
            </button>
            <button className="rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              Save
            </button>
          </div>
        </div>
      </article>

      {/* Grid */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <article key={e.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img src={e.img} alt={e.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 rounded-xl bg-card px-3 py-2 text-center shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {e.day}
                </p>
                <p className="font-display text-2xl leading-none">{e.num}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ember">{e.mon}</p>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-gradient-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-ember">
                {e.sport}
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-xl tracking-wide">{e.title}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {e.city}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3 w-3" /> {e.attending}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-2xl text-ember">{e.price}</span>
                <button className="rounded-full bg-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                  Register
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
