import { createFileRoute, Link } from "@tanstack/react-router";
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
  { name: "Gyms", count: "4,200 listings", icon: Dumbbell, tint: "from-ember/20 to-sunshine/10" },
  { name: "Personal Trainers", count: "1,850 listings", icon: User, tint: "from-azure/20 to-violet/10" },
  { name: "Yoga & Pilates", count: "920 listings", icon: Flower2, tint: "from-lime/20 to-sunshine/10" },
  { name: "CrossFit Boxes", count: "480 listings", icon: Flame, tint: "from-violet/20 to-ember/10" },
  { name: "Martial Arts", count: "760 listings", icon: Swords, tint: "from-ember/20 to-violet/10" },
  { name: "Sports Clubs", count: "1,340 listings", icon: Trophy, tint: "from-sunshine/25 to-ember/10" },
  { name: "Nutritionists", count: "410 listings", icon: Apple, tint: "from-lime/25 to-azure/10" },
  { name: "Sports Physio", count: "620 listings", icon: Activity, tint: "from-azure/25 to-lime/10" },
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

function Home() {
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

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-gradient-to-r from-ember/20 via-sunshine/20 to-lime/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ember">
              <Flame className="h-3.5 w-3.5" /> 12,400+ verified pros
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl md:text-[5.5rem]">
              Find your <span className="text-gradient-rainbow">edge.</span>
              <br />
              Anywhere in <span className="text-gradient-ember">America.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              The directory built for athletes. Gyms, coaches, dojos, clubs, and events —
              all vetted, all in one place.
            </p>

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
                  defaultValue="New York, NY"
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

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Trending:</span>
              {["#24/7Gyms", "#BJJ", "#MarathonCoach", "#ReformerPilates", "#CrossFit"].map(
                (t) => (
                  <Link
                    key={t}
                    to="/search"
                    className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground hover:bg-ember/10 hover:text-ember"
                  >
                    {t}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1100&q=80"
                alt="Athlete training"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex items-center gap-3 p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ember/10 text-ember">
                  <Star className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="font-display tracking-wide">Iron Forge Athletics</p>
                  <p className="text-xs text-muted-foreground">
                    4.8 · 1,284 reviews · New York, NY
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 rotate-3 rounded-2xl bg-gradient-ember px-4 py-3 text-center text-white shadow-ember">
              <p className="font-display text-2xl leading-none">+248</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">joined today</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
              Browse by category
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
              What are you training for?
            </h2>
          </div>
          <Link
            to="/search"
            className="hidden items-center gap-1 text-sm font-bold uppercase tracking-[0.18em] text-ember sm:inline-flex"
          >
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/search"
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.tint} p-5 transition-transform hover:-translate-y-1`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-card shadow-sm">
                <c.icon className="h-5 w-5 text-ember" />
              </span>
              <p className="mt-6 font-display text-2xl tracking-wide">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.count}</p>
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
            {LISTINGS.map((l) => (
              <article
                key={l.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform hover:-translate-y-1"
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
                </div>
                <div className="p-4">
                  <p className="font-display text-lg tracking-wide">{l.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {l.city}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-ember text-ember" />
                    <span className="font-semibold">{l.rating}</span>
                    <span className="text-muted-foreground">({l.reviews})</span>
                  </div>
                </div>
              </article>
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
    </>
  );
}
