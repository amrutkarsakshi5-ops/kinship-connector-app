import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search the Directory — ForgeDial" },
      { name: "description", content: "Find verified gyms, coaches and studios across the United States." },
    ],
  }),
  component: SearchPage,
});

const CATS = [
  "All",
  "Gym",
  "Personal Trainer",
  "Yoga & Pilates",
  "CrossFit Box",
  "Martial Arts",
  "Sports Club",
  "Nutritionist",
  "Sports Physio",
] as const;

type DbGym = {
  id: string;
  name: string;
  description: string | null;
  city: string | null;
  state: string | null;
  category: string | null;
  image_url: string | null;
  featured: boolean;
  website: string | null;
  membership_price: number | null;
};

function SearchPage() {
  const { category, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [gyms, setGyms] = useState<DbGym[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(q ?? "");
  const [preview, setPreview] = useState<{ name: string; url: string } | null>(null);

  const activeCat = category ?? "All";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    supabase
      .from("gyms")
      .select("id,name,description,city,state,category,image_url,featured,website,membership_price")
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (cancelled) return;
        setGyms((data as DbGym[]) ?? []);
        setLoading(false);
      });

    const ch = supabase
      .channel("gyms-search")
      .on("postgres_changes", { event: "*", schema: "public", table: "gyms" }, async () => {
        const { data } = await supabase
          .from("gyms")
          .select("id,name,description,city,state,category,image_url,featured,website,membership_price")
          .eq("status", "active")
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });
        if (!cancelled) setGyms((data as DbGym[]) ?? []);
      })
      .subscribe();
    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, []);

  const filtered = useMemo(() => {
    const ql = query.trim().toLowerCase();
    return gyms.filter((g) => {
      if (activeCat !== "All" && (g.category ?? "") !== activeCat) return false;
      if (ql) {
        const hay = `${g.name} ${g.city ?? ""} ${g.state ?? ""} ${g.category ?? ""}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [gyms, activeCat, query]);

  const setCat = (c: string) => {
    navigate({ search: (prev) => ({ ...prev, category: c === "All" ? undefined : c }) });
  };

  const openPreview = (g: DbGym) => {
    if (!g.website) return;
    const url = /^https?:\/\//i.test(g.website) ? g.website : `https://${g.website}`;
    setPreview({ name: g.name, url });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide sm:text-6xl">
        {activeCat === "All" ? "Search the directory" : activeCat}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {activeCat === "All"
          ? "Find verified pros across the United States."
          : `Browse all ${activeCat} listings.`}
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm sm:flex-row"
      >
        <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Gym name, city, sport…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </label>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors " +
              (activeCat === c
                ? "bg-gradient-ember text-white shadow-ember"
                : "border border-border bg-card text-muted-foreground hover:text-foreground")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "result" : "results"}
            {activeCat !== "All" && <> in <span className="font-semibold text-foreground">{activeCat}</span></>}
          </p>
          <Link to="/" className="text-xs font-bold uppercase tracking-[0.18em] text-ember">
            ← Home
          </Link>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Loading listings…</p>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-4 font-display text-xl tracking-wide">No listings yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeCat === "All"
                ? "No gyms have been added yet."
                : `No listings in "${activeCat}" yet. Add one from the admin panel.`}
            </p>
            <Link
              to="/admin"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-ember px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-ember"
            >
              Go to Admin
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <button
                type="button"
                key={g.id}
                onClick={() => openPreview(g)}
                disabled={!g.website}
                title={g.website ? `Open ${g.name}` : "No website available"}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-transform hover:-translate-y-1 disabled:cursor-not-allowed"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={
                      g.image_url ??
                      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
                    }
                    alt={g.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {g.category && (
                    <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                      {g.category}
                    </span>
                  )}
                  {g.featured && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-ember px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      <Star className="h-3 w-3 fill-white" /> Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-display text-lg tracking-wide">{g.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {[g.city, g.state].filter(Boolean).join(", ") || "—"}
                  </p>
                  {g.description && (
                    <p className="mt-2 line-clamp-2 font-poppins text-xs text-muted-foreground">
                      {g.description}
                    </p>
                  )}
                  {g.membership_price != null && (
                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-ember">
                      From ${g.membership_price}/mo
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2 sm:p-6"
          onClick={() => setPreview(null)}
        >
          <div
            className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl sm:h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-display text-base tracking-wide">{preview.name}</p>
                <p className="truncate text-xs text-muted-foreground">{preview.url}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={preview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] hover:bg-muted"
                >
                  Open ↗
                </a>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="rounded-lg bg-ember px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={preview.url}
              title={preview.name}
              className="h-full w-full flex-1 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
