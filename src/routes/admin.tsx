import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Star,
  LogOut,
  Loader2,
  Upload,
  X,
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Store,
} from "lucide-react";
import { DashboardView } from "@/components/admin/DashboardView";

const ADMIN_PASSWORD = "Apex2026";

function AdminPasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-ember/10 text-ember">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-display text-3xl tracking-wide">Admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === ADMIN_PASSWORD) {
              sessionStorage.setItem("admin_pw_ok", "1");
              onUnlock();
            } else {
              setErr("Incorrect password");
            }
          }}
          className="mt-6 space-y-3"
        >
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setErr("");
            }}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-ember focus:outline-none"
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-ember px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-ember"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Manage Gyms — Admin" }] }),
  component: AdminPage,
});

type Gym = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  category: string | null;
  membership_price: number | null;
  opening_hours: string | null;
  facilities: string[] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  map_location: string | null;
  featured: boolean;
  status: string;
  created_at: string;
};

const CATEGORIES = [
  "Gym",
  "Personal Trainer",
  "Yoga & Pilates",
  "CrossFit Box",
  "Martial Arts",
  "Sports Club",
  "Nutritionist",
  "Sports Physio",
];

const FACILITY_OPTIONS = [
  "Free Weights",
  "Cardio Machines",
  "Pool",
  "Sauna",
  "Group Classes",
  "Personal Training",
  "Locker Rooms",
  "Showers",
  "Parking",
  "24/7 Access",
  "Childcare",
  "Wi-Fi",
];

function emptyGym(): Partial<Gym> {
  return {
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    website: "",
    category: "",
    membership_price: null,
    opening_hours: "",
    facilities: [],
    image_url: "",
    gallery_urls: [],
    map_location: "",
    featured: false,
    status: "active",
  };
}

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [pwOk, setPwOk] = useState(false);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Gym | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Gym | null>(null);
  const [claimingAdmin, setClaimingAdmin] = useState(false);
  const [tab, setTab] = useState<"business" | "admin">("business");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_pw_ok") === "1") {
      setPwOk(true);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/auth" });
  }, [user, authLoading, navigate]);

  async function loadGyms() {
    setLoading(true);
    const { data, error } = await supabase
      .from("gyms")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setGyms((data as Gym[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (isAdmin) loadGyms();
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const ch = supabase
      .channel("gyms-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "gyms" }, () => loadGyms())
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [isAdmin]);

  async function claimAdmin() {
    setClaimingAdmin(true);
    const { data, error } = await supabase.rpc("claim_first_admin");
    setClaimingAdmin(false);
    if (error) {
      toast.error(error.message);
    } else if (data) {
      toast.success("You're now the admin. Reloading...");
      setTimeout(() => window.location.reload(), 800);
    } else {
      toast.error("An admin already exists. Ask them to grant you access.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  const filtered = useMemo(() => {
    return gyms.filter((g) => {
      if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCity && g.city !== filterCity) return false;
      if (filterCategory && g.category !== filterCategory) return false;
      if (filterStatus && g.status !== filterStatus) return false;
      return true;
    });
  }, [gyms, search, filterCity, filterCategory, filterStatus]);

  const cities = useMemo(() => [...new Set(gyms.map((g) => g.city).filter(Boolean))] as string[], [gyms]);

  const stats = useMemo(
    () => ({
      total: gyms.length,
      active: gyms.filter((g) => g.status === "active").length,
      featured: gyms.filter((g) => g.featured).length,
      pending: gyms.filter((g) => g.status === "pending").length,
    }),
    [gyms],
  );

  if (!pwOk) {
    return <AdminPasswordGate onUnlock={() => setPwOk(true)} />;
  }

  if (authLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-ember" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-ember" />
        <h1 className="mt-4 font-display text-3xl tracking-wide">Admin access required</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You're signed in as <strong>{user.email}</strong> but don't have admin rights.
        </p>
        <button
          onClick={claimAdmin}
          disabled={claimingAdmin}
          className="mt-6 w-full rounded-lg bg-gradient-ember px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-ember disabled:opacity-60"
        >
          {claimingAdmin ? "..." : "Claim admin (first user only)"}
        </button>
        <button onClick={signOut} className="mt-3 text-sm text-muted-foreground hover:text-foreground">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Tabs */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          <button
            onClick={() => setTab("business")}
            className={
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors " +
              (tab === "business" ? "bg-gradient-ember text-white shadow-ember" : "text-muted-foreground hover:text-foreground")
            }
          >
            <LayoutDashboard className="h-4 w-4" /> Business
          </button>
          <button
            onClick={() => setTab("admin")}
            className={
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors " +
              (tab === "admin" ? "bg-gradient-ember text-white shadow-ember" : "text-muted-foreground hover:text-foreground")
            }
          >
            <Store className="h-4 w-4" /> Admin
          </button>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      {tab === "business" ? <DashboardView /> : (
      <>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Admin</p>
          <h1 className="mt-1 font-display text-4xl tracking-wide sm:text-5xl">Manage Gyms</h1>
          <p className="mt-1 text-sm text-muted-foreground">Add, edit, and delete gym listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-ember px-5 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-ember"
          >
            <Plus className="h-4 w-4" /> Add Gym
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Gyms", value: stats.total, tint: "from-ember/20 to-sunshine/10" },
          { label: "Active", value: stats.active, tint: "from-lime/25 to-azure/10" },
          { label: "Featured", value: stats.featured, tint: "from-violet/20 to-ember/10" },
          { label: "Pending", value: stats.pending, tint: "from-azure/20 to-violet/10" },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border border-border bg-gradient-to-br ${s.tint} p-4 sm:p-5`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 font-display text-3xl tracking-wide sm:text-4xl">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <label className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </label>
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="grid place-items-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-ember" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-2xl tracking-wide">No gyms yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Click "Add Gym" to create your first listing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      {g.image_url ? (
                        <img
                          src={g.image_url}
                          alt={g.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-muted" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      <div className="flex items-center gap-2">
                        {g.name}
                        {g.featured && <Star className="h-3.5 w-3.5 fill-ember text-ember" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{g.city ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{g.category ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] " +
                          (g.status === "active"
                            ? "bg-lime/20 text-lime"
                            : g.status === "pending"
                              ? "bg-sunshine/20 text-ember"
                              : "bg-muted text-muted-foreground")
                        }
                      >
                        {g.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(g.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => {
                            setEditing(g);
                            setShowForm(true);
                          }}
                          className="rounded-lg border border-border p-2 hover:bg-muted"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(g)}
                          className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-ember">
          ← Back to site
        </Link>
      </p>

      {showForm && (
        <GymForm
          initial={editing}
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            loadGyms();
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDelete
          gym={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onDone={() => {
            setConfirmDelete(null);
            loadGyms();
          }}
        />
      )}
      </>
      )}
    </div>
  );
}

function ConfirmDelete({
  gym,
  onCancel,
  onDone,
}: {
  gym: Gym;
  onCancel: () => void;
  onDone: () => void;
}) {
  const [busy, setBusy] = useState(false);
  async function handleDelete() {
    setBusy(true);
    const { error } = await supabase.from("gyms").delete().eq("id", gym.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Gym deleted.");
      onDone();
    }
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl tracking-wide">Delete gym?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This permanently removes <strong>{gym.name}</strong>.
        </p>
        <div className="mt-6 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={busy}
            className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            {busy ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GymForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: Gym | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<Gym>>(initial ?? emptyGym());
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  function set<K extends keyof Gym>(key: K, value: Gym[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleFacility(name: string) {
    const cur = form.facilities ?? [];
    set("facilities", cur.includes(name) ? cur.filter((f) => f !== name) : [...cur, name]);
  }

  async function uploadFile(file: File): Promise<string | null> {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("gym-images").upload(path, file);
    if (error) {
      toast.error(error.message);
      return null;
    }
    const { data } = supabase.storage.from("gym-images").createSignedUrl
      ? await supabase.storage.from("gym-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10)
      : { data: null };
    return data?.signedUrl ?? null;
  }

  async function onMainImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const url = await uploadFile(file);
    setUploadingImage(false);
    if (url) set("image_url", url);
  }

  async function onGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadingGallery(true);
    const urls: string[] = [];
    for (const f of files) {
      const u = await uploadFile(f);
      if (u) urls.push(u);
    }
    setUploadingGallery(false);
    set("gallery_urls", [...(form.gallery_urls ?? []), ...urls]);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name?.trim()) {
      toast.error("Gym name is required.");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      membership_price: form.membership_price ? Number(form.membership_price) : null,
    };
    const { error } = initial
      ? await supabase.from("gyms").update(payload).eq("id", initial.id)
      : await supabase.from("gyms").insert(payload as any);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(initial ? "Gym updated." : "Gym created.");
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4">
      <div className="mx-auto my-8 max-w-3xl rounded-2xl border border-border bg-card">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="font-display text-2xl tracking-wide">
            {initial ? "Edit Gym" : "Add New Gym"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5 p-6">
          <Field label="Gym Name *">
            <input
              required
              value={form.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              className={inputCls}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Address">
              <input
                value={form.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="City">
              <input
                value={form.city ?? ""}
                onChange={(e) => set("city", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="State">
              <input
                value={form.state ?? ""}
                onChange={(e) => set("state", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Phone">
              <input
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Website URL">
              <input
                value={form.website ?? ""}
                onChange={(e) => set("website", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category ?? ""}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                <option value="">Select…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Membership Price ($)">
              <input
                type="number"
                step="0.01"
                value={form.membership_price ?? ""}
                onChange={(e) =>
                  set("membership_price", e.target.value ? (Number(e.target.value) as any) : null)
                }
                className={inputCls}
              />
            </Field>
            <Field label="Opening Hours">
              <input
                placeholder="Mon-Fri 6am–10pm"
                value={form.opening_hours ?? ""}
                onChange={(e) => set("opening_hours", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Google Maps URL or Coords">
              <input
                value={form.map_location ?? ""}
                onChange={(e) => set("map_location", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Facilities">
            <div className="flex flex-wrap gap-2">
              {FACILITY_OPTIONS.map((f) => {
                const on = (form.facilities ?? []).includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => toggleFacility(f)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors " +
                      (on
                        ? "border-ember bg-ember text-white"
                        : "border-border bg-background hover:border-ember")
                    }
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Gym Image">
            <div className="flex items-start gap-4">
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt=""
                  className="h-24 w-24 rounded-lg object-cover"
                />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-muted">
                <Upload className="h-4 w-4" />
                {uploadingImage ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={onMainImage} />
              </label>
            </div>
          </Field>

          <Field label="Gallery Images">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(form.gallery_urls ?? []).map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "gallery_urls",
                          (form.gallery_urls ?? []).filter((_, idx) => idx !== i),
                        )
                      }
                      className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm hover:bg-muted">
                <Upload className="h-4 w-4" />
                {uploadingGallery ? "Uploading…" : "Add gallery images"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onGalleryUpload}
                />
              </label>
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">
              <select
                value={form.status ?? "active"}
                onChange={(e) => set("status", e.target.value)}
                className={inputCls}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </Field>
            <Field label="Featured">
              <label className="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm">Show as featured gym</span>
              </label>
            </Field>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 flex gap-2 border-t border-border bg-card px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-gradient-ember px-4 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-ember disabled:opacity-60"
            >
              {saving ? "Saving…" : initial ? "Update Gym" : "Save Gym"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-ember focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
