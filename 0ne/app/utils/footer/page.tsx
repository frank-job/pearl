import { ArrowRight, ArrowUpRight, Store } from "lucide-react";
import Link from "next/link";

const exploreLinks = [
  { label: "Popular finds", href: "/#discover" },
  { label: "Browse shops", href: "/#shops" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr] lg:py-16">
          <div className="max-w-md">
            <Link href="/" aria-label="Xness Plaza home" className="inline-flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-xl bg-white text-lg font-bold text-black">
                X
              </span>
              <span className="text-xl font-semibold tracking-[-0.07em]">Xness</span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/65">
              A place to discover independent businesses, find new favorites, and give every shop an address worth sharing.
            </p>
            <Link
              href="/#discover"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/70"
            >
              Explore the plaza <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>

          <nav aria-label="Explore Xness">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rounded-2xl border border-white/15 p-5">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Store aria-hidden="true" size={16} />
              Have a business?
            </div>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Give your business a shop profile customers can find and share.
            </p>
            <Link
              href="/#sell"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 transition hover:text-white/70"
            >
              Become a seller <ArrowUpRight aria-hidden="true" size={14} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© Xness Plaza. All rights reserved.</p>
          <Link href="/login" className="transition hover:text-white">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </footer>
  );
}