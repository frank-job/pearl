const navItems = [
  "Home",
  "Explore Plaza",
  "Floors",
  "Featured Shops",
  "Become a Seller",
  "About",
];

export default function MobileNav() {
  return (
    <div className="flex items-center justify-between gap-3 md:hidden">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-[#d9f47a] text-sm font-black text-[#102126]">
          X
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="h-9 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-white">
          Search
        </button>
        <button className="h-9 rounded-full bg-[#d9f47a] px-3 text-xs font-semibold text-[#102128]">
          Open shop
        </button>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-200">
        {navItems.map((item) => (
          <a key={item} href="#" className="rounded-lg px-2 py-1.5 hover:bg-white/5">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}