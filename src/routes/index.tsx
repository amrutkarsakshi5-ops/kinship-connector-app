import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Flame,
  Search,
  MapPin,
  Star,
  Dumbbell,
  User,
  Flower2,
  Swords,
  Trophy,
  Apple,
  Activity,
  Sparkles,
  ArrowRight,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ForgeDial — Find your edge. Anywhere in America." },
      {
        name: "description",
        content:
          "The directory built for athletes. 12,400+ vetted gyms, coaches, dojos, clubs and events.",
      },
      { property: "og:title", content: "ForgeDial — Find your edge" },
      {
        property: "og:description",
        content: "Gyms, coaches, dojos, clubs and events — all vetted, all in one place.",
      },
    ],
  }),
  component: Home,
});

const CATEGORIES = [
  { name: "Gyms", slug: "Gym", count: "4,200 listings", desc: "Strength, conditioning & full fitness floors.", icon: Dumbbell, bg: "bg-violet-100", fg: "text-violet-600", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
  { name: "Personal Trainers", slug: "Personal Trainer", count: "1,850 listings", desc: "1-on-1 coaches for every goal and level.", icon: User, bg: "bg-amber-100", fg: "text-amber-600", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80" },
  { name: "Yoga & Pilates", slug: "Yoga & Pilates", count: "920 listings", desc: "Mat, reformer, vinyasa and restorative.", icon: Flower2, bg: "bg-emerald-100", fg: "text-emerald-600", img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80" },
  { name: "Sports Clubs", slug: "Sports Club", count: "1,340 listings", desc: "Leagues, teams and pick-up across sports.", icon: Trophy, bg: "bg-sky-100", fg: "text-sky-600", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80" },
  { name: "Zumba", slug: "Zumba", count: "320 listings", desc: "Dance fitness and cardio classes.", icon: Flame, bg: "bg-pink-100", fg: "text-pink-500", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80" },
  { name: "Nutritionists", slug: "Nutritionist", count: "410 listings", desc: "Dietitians and performance nutrition.", icon: Apple, bg: "bg-green-100", fg: "text-green-600", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80" },
  { name: "Physiotherapy", slug: "Sports Physio", count: "620 listings", desc: "Recovery, rehab and injury prevention.", icon: Activity, bg: "bg-blue-100", fg: "text-blue-600", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80" },
  { name: "Events", slug: "Events", count: "180 listings", desc: "Races, meets and community events.", icon: Calendar, bg: "bg-orange-100", fg: "text-orange-500", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80" },
];

const LISTINGS = [
  {
    name: "Iron Forge Athletics",
    city: "New York, NY",
    rating: 4.8,
    reviews: 1284,
    tag: "Gym",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pulse Boutique Cycling",
    city: "Los Angeles, CA",
    rating: 4.7,
    reviews: 642,
    tag: "Studio",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mile High CrossFit",
    city: "Denver, CO",
    rating: 4.9,
    reviews: 980,
    tag: "CrossFit",
    img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Brooklyn Mat Co.",
    city: "Brooklyn, NY",
    rating: 4.8,
    reviews: 410,
    tag: "BJJ",
    img: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=80",
  },
];

const EVENTS = [
  { date: "Jun 14", title: "NYC Marathon Prep — Long Run Series", city: "New York, NY", sport: "Running", attending: 240, price: "Free" },
  { date: "Jun 22", title: "Venice Beach Throwdown", city: "Los Angeles, CA", sport: "CrossFit", attending: 180, price: "$45" },
  { date: "Jul 5", title: "Front Range Trail Summit", city: "Denver, CO", sport: "Trail Running", attending: 320, price: "$25" },
  { date: "Jul 12", title: "Austin Open Powerlifting Meet", city: "Austin, TX", sport: "Powerlifting", attending: 96, price: "$75" },
];

const CITIES = [
  { name: "New York", count: "2,140 pros", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80" },
  { name: "Los Angeles", count: "1,820 pros", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80" },
  { name: "Chicago", count: "1,140 pros", img: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=600&q=80" },
  { name: "Austin", count: "860 pros", img: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=600&q=80" },
  { name: "Denver", count: "740 pros", img: "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?auto=format&fit=crop&w=600&q=80" },
  { name: "Miami", count: "920 pros", img: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&q=80" },
];

type DbGym = {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  category: string | null;
  image_url: string | null;
  featured: boolean;
  website: string | null;
};

function Home() {
  const [dbGyms, setDbGyms] = useState<DbGym[]>([]);
  const [previewGym, setPreviewGym] = useState<{ name: string; url: string } | null>(null);
  useEffect(() => {
    supabase
      .from("gyms")
      .select("id,name,city,state,category,image_url,featured,website")
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => setDbGyms((data as DbGym[]) ?? []));

    const ch = supabase
      .channel("gyms-home")
      .on("postgres_changes", { event: "*", schema: "public", table: "gyms" }, async () => {
        const { data } = await supabase
          .from("gyms")
          .select("id,name,city,state,category,image_url,featured,website")
          .eq("status", "active")
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(8);
        setDbGyms((data as DbGym[]) ?? []);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-mesh">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, oklch(0.78 0.20 145 / 0.35), transparent 45%),radial-gradient(circle at 85% 20%, oklch(0.65 0.18 240 / 0.30), transparent 50%),radial-gradient(circle at 50% 100%, oklch(0.66 0.22 35 / 0.30), transparent 55%)",
          }}
        />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-violet/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-80 w-80 rounded-full bg-sunshine/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <form className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm">
            <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search gyms, trainers, sports, events…"
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
        </div>

      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex items-end justify-between gap-4">
          <div />

          <Link
            to="/search"
            className="hidden items-center gap-1 text-sm font-bold uppercase tracking-[0.18em] text-ember sm:inline-flex"
          >
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/search"
              search={{ category: c.slug }}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <div className={`grid aspect-square w-full place-items-center rounded-2xl ${c.bg} shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-ember`}>
                <c.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${c.fg}`} strokeWidth={2} />
              </div>
              <p className="font-poppins text-xs font-semibold leading-tight sm:text-sm">
                {c.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Featured</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
                Top-rated near you
              </h2>
            </div>
            <Link
              to="/search"
              className="hidden items-center gap-1 text-sm font-bold uppercase tracking-[0.18em] text-ember sm:inline-flex"
            >
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(dbGyms.length > 0
              ? dbGyms.map((g) => ({
                  name: g.name,
                  city: [g.city, g.state].filter(Boolean).join(", ") || "—",
                  tag: g.category ?? "Gym",
                  img:
                    g.image_url ??
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
                  featured: g.featured,
                  website: g.website,
                }))
              : LISTINGS.map((l) => ({ ...l, featured: false, website: null as string | null }))
            ).map((l) => (
              <button
                type="button"
                key={l.name}
                onClick={() => {
                  if (!l.website) return;
                  const url = /^https?:\/\//i.test(l.website) ? l.website : `https://${l.website}`;
                  setPreviewGym({ name: l.name, url });
                }}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-transform hover:-translate-y-1 disabled:cursor-not-allowed"
                disabled={!l.website}
                title={l.website ? `Open ${l.name}` : "No website available"}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur">
                    {l.tag}
                  </span>
                  {l.featured && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-display text-lg tracking-wide">{l.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {l.city}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Events</p>
            <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
              Compete. Connect. Conquer.
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Marathons, meets, festivals, and tournaments — coast to coast.
            </p>
          </div>
          <Link
            to="/events"
            className="hidden items-center gap-1 text-sm font-bold uppercase tracking-[0.18em] text-ember sm:inline-flex"
          >
            Browse events <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EVENTS.map((e) => (
            <Link
              to="/events"
              key={e.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ember/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                <Calendar className="h-3 w-3" /> {e.date}
              </span>
              <p className="mt-4 font-display text-lg leading-snug tracking-wide">{e.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {e.city} · {e.sport}
              </p>
              <p className="mt-auto pt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{e.attending}</span> attending ·{" "}
                <span className="font-semibold text-ember">{e.price}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
            Popular this week
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
            Where America trains
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <Link
                to="/search"
                key={c.name}
                className="group relative overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-2xl tracking-wide">{c.name}</p>
                  <p className="text-xs opacity-90">{c.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-ember p-10 text-white shadow-ember sm:p-14">
          <Sparkles className="absolute right-8 top-8 h-20 w-20 opacity-20" />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">For business</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight tracking-wide sm:text-5xl">
            Own a gym or coach athletes?
          </h2>
          <p className="mt-4 max-w-xl text-white/90">
            List your business free. Get discovered by thousands of athletes in your city this
            month.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-ember"
          >
            Claim Your Listing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* WEBSITE PREVIEW MODAL */}
      {previewGym && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2 sm:p-6"
          onClick={() => setPreviewGym(null)}
        >
          <div
            className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl sm:h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-display text-base tracking-wide">{previewGym.name}</p>
                <p className="truncate text-xs text-muted-foreground">{previewGym.url}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={previewGym.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] hover:bg-muted"
                >
                  Open ↗
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewGym(null)}
                  className="rounded-lg bg-ember px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={previewGym.url}
              title={previewGym.name}
              className="h-full w-full flex-1 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </>
  );
}
