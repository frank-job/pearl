const navItems = [
  "Home",
  "Explore Plaza",
  "Floors",
  "Featured Shops",
  "Become a Seller",
  "About",
];

export default function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
      {navItems.map((item) => (
        <a
          key={item}
          href={item === "Home" ? "#" : "#"}
          className="transition hover:text-white"
        >
          {item}
        </a>
      ))}
    </nav>
  );
}