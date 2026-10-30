"use client";

import { ArrowRight, ChevronRight, Search, ShoppingBag, Store, Tag, Users, Activity, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "./utils/footer/page";
import productsData from "./data/products.json";
import shopsData from "./data/shops.json";

type Product = { name: string; shop: string; price: string; category: string; image: string };
type Shop = { address: string; name: string; seller: string; category: string; type: string; initials: string; description: string; image: string; live: boolean; rating: number; sales: number };
type Stats = { shopsOpen: number; activeBuyers: number; productsListed: number; updatedAt: string };

const products = productsData as Product[];
const shops = shopsData as Shop[];
const categories = ["All", "Fashion", "Electronics", "Home"];

export default function Welcome() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [stats, setStats] = useState<Stats | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/plaza", { cache: "no-store" });
        const data = (await res.json()) as Stats;
        if (alive) { setStats(data); setPulse(true); setTimeout(() => setPulse(false), 600); }
      } catch {}
    };
    load();
    const id = setInterval(load, 5000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const matchingProducts = products.filter((p) =>
    `${p.name} ${p.shop} ${p.category}`.toLowerCase().includes(normalizedQuery) &&
    (activeCategory === "All" || p.category === activeCategory),
  );
  const matchingShops = shops.filter((s) =>
    `${s.address} ${s.name} ${s.category}`.toLowerCase().includes(normalizedQuery) &&
    (activeCategory === "All" || s.type === activeCategory),
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#" aria-label="Xness home" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-700 text-lg font-bold text-white shadow-lg shadow-blue-700/30">
              X
            </span>
            <span className="text-xl font-semibold tracking-[-0.07em]">Xness</span>
          </a>

          <label className="order-3 flex w-full items-center gap-3 rounded-full border border-black/15 bg-white px-4 py-3 transition focus-within:border-blue-700 sm:order-none sm:max-w-md">
            <Search aria-hidden="true" size={18} className="text-blue-700" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shops, products, or shop number"
              aria-label="Search shops, products, or shop number"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/45"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="text-xs font-medium underline underline-offset-4">
                Clear
              </button>
            )}
          </label>

          <a href="/login" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800">
            Log in <ArrowRight aria-hidden="true" size={15} />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Hero */}
        <section className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:py-24 animate-fade-in">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              Your next stop is online
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.08em] sm:text-7xl">
              Welcome to
              <br />
              <span className="text-blue-700">Xness Plaza.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/65 sm:text-lg">
              Find a shop, meet the people behind it, and discover something worth taking home.
              Every business has its own address in the plaza.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#discover" className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-700/30">
                Start exploring <ArrowRight aria-hidden="true" size={16} />
              </a>
              <a href="#sell" className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4">
                Have a business? <span>Open a shop</span>
              </a>
            </div>
          </div>

          <div
            role="img"
            aria-label="Xness Plaza storefront"
            className="group relative min-h-64 overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-950 via-blue-900 to-black text-white shadow-2xl shadow-blue-950/20 sm:min-h-80 animate-slide-up"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.4),transparent_58%)]" />
            <div className="absolute -right-16 top-10 size-44 rounded-full border border-blue-300/20 animate-orbit" />
            <div className="absolute -right-5 top-20 size-2 rounded-full bg-blue-300 shadow-[0_0_18px_6px_rgba(147,197,253,0.55)] animate-pulse" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-scanline" />
            <div className="relative flex h-full min-h-52 flex-col justify-between p-6 sm:min-h-64">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm text-white/70">
                  <Store size={16} /> Xness Plaza
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs text-white/75 transition ${pulse ? "bg-blue-500/40" : ""}`}>
                  <span className="size-1.5 rounded-full bg-blue-300 shadow-[0_0_10px_3px_rgba(147,197,253,0.7)]" /> Live
                </span>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-sm text-blue-200/80">
                  <span className="h-px w-6 bg-blue-300/60" /> A memorable address for every business
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                  Xness Plaza <span className="text-white/40">/</span> Shop 001N
                </p>
                <p className="mt-2 text-sm text-white/60">Frank Shop · Easy to find, easy to share.</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-400/10 px-3 py-1.5 text-xs text-blue-100 backdrop-blur-sm animate-glow">
                  <Zap size={13} className="text-blue-300" /> Something new just opened
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time stats */}
        <section className="grid gap-4 sm:grid-cols-3 mb-4 animate-fade-in">
          {[
            { label: "Shops open", value: stats?.shopsOpen, icon: Store },
            { label: "Buyers active", value: stats?.activeBuyers, icon: Users },
            { label: "Products listed", value: stats?.productsListed, icon: ShoppingBag },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-5 transition hover:border-blue-700/40 hover:shadow-md">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-700 text-white">
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{s.value ?? "—"}</p>
                <p className="text-xs uppercase tracking-wider text-black/50">{s.label}</p>
              </div>
              <Activity size={14} className="ml-auto text-blue-700 animate-pulse" />
            </div>
          ))}
        </section>

        {/* Products marquee */}
        <section id="discover" aria-labelledby="products-heading" className="border-y border-black/10 py-8 sm:py-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                <Tag size={14} /> Fresh from the plaza
              </p>
              <h2 id="products-heading" className="mt-2 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Popular finds
              </h2>
            </div>
            <div className="hidden items-center gap-2 text-xs text-black/50 sm:flex">
              <Zap size={15} className="text-blue-700" /> Live inventory
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-black/15 bg-white text-black hover:border-blue-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="overflow-hidden">
            {matchingProducts.length > 0 ? (
              <div className="xness-marquee-track flex w-max gap-4 py-2 hover:[animation-play-state:paused]">
                {[...matchingProducts, ...matchingProducts].map((product, index) => (
                  <article
                    key={`${product.name}-${index}`}
                    aria-hidden={index >= matchingProducts.length}
                    tabIndex={index >= matchingProducts.length ? -1 : undefined}
                    className="group w-56 shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/10 sm:w-64"
                  >
                    <div
                      role="img"
                      aria-label={product.name}
                      className="relative flex h-36 items-end overflow-hidden bg-cover bg-center transition duration-500 group-hover:scale-105 sm:h-44"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="relative rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-medium">{product.name}</p>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-black/55">{product.shop}</span>
                        <span className="font-semibold text-blue-700">{product.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-black/10 p-6 text-sm text-black/60">
                No products match “{query}”. Try a shop name or another search.
              </p>
            )}
          </div>
          <p className="mt-3 text-xs text-black/45 sm:hidden">Swipe to explore products</p>
        </section>

        {/* Shops */}
        <section id="shops" className="py-14 sm:py-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Explore the community</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Meet the shops behind the finds.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-black/55">
              Browse independent businesses and find your new favorites.
            </p>
          </div>

          {matchingShops.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {matchingShops.map((shop, i) => (
                <article
                  key={shop.address}
                  className="rounded-[24px] border border-black/15 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-700/10 animate-fade-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    role="img"
                    aria-label={`${shop.name} storefront`}
                    className="mb-5 h-40 rounded-[18px] bg-cover bg-center transition duration-500 hover:scale-105"
                    style={{ backgroundImage: `url('${shop.image}')` }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-14 place-items-center rounded-2xl bg-blue-700 text-sm font-semibold text-white">
                      {shop.initials}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-700/30 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      <Store aria-hidden="true" size={14} />
                      {shop.live ? "Live" : "Opening soon"}
                    </span>
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-black/50">Xness Plaza · {shop.address}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">{shop.name}</h3>
                  <p className="mt-2 text-sm text-black/60">{shop.category}</p>
                  <p className="mt-4 text-sm text-black/70">{shop.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="text-xs text-black/55">{shop.type}</span>
                    <a href="#discover" className="inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                      Browse shop <ArrowRight aria-hidden="true" size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-black/10 p-6 text-sm text-black/60">
              No shops match “{query}”. Try searching by shop number, name, or category.
            </p>
          )}
        </section>

        {/* Top shops */}
        <section className="py-10 sm:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Top shops</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">Best sellers this week</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...shops].sort((a, b) => b.sales - a.sales).map((shop, i) => (
              <article key={shop.address} className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 transition hover:border-blue-700/40">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-700 text-sm font-bold text-white">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{shop.name}</p>
                  <p className="truncate text-xs text-black/55">by {shop.seller} · {shop.address}</p>
                  <p className="mt-1 text-xs text-black/45">⭐ {shop.rating} · {shop.sales} sales</p>
                </div>
                <a href="#shops" className="shrink-0 text-sm font-medium text-blue-700">Visit</a>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-heading" className="border-t border-black/10 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Shopping made straightforward</p>
              <h2 id="how-heading" className="mt-3 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                Find it. Meet the shop. Make it yours.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { number: "01", title: "Discover", text: "Search products and explore businesses." },
                { number: "02", title: "Visit", text: "Get to know the shop behind the listing." },
                { number: "03", title: "Connect", text: "Reach out to the seller to make your purchase." },
              ].map((step) => (
                <article key={step.number} className="rounded-2xl border border-black/10 p-4 transition hover:border-blue-700/40">
                  <p className="text-xs font-semibold tracking-[0.16em] text-blue-700">{step.number}</p>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-black/60">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sell CTA */}
        <section id="sell" className="mb-12 rounded-[28px] bg-gradient-to-br from-blue-900 to-black px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                <Users size={15} /> For business owners
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">
                Give your business a place of its own.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                Create a shop profile, share a memorable Xness address, and help new customers find you.
              </p>
            </div>
            <a
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-100"
            >
              Open your shop <ChevronRight aria-hidden="true" size={16} />
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
