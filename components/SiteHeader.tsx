import Link from "next/link";

const NAV = [
  { label: "Clothing", href: "/collections/clothing" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Footwear", href: "/collections/footwear" },
  { label: "Gear", href: "/collections/gear" },
  { label: "Paddle", href: "/collections/paddle" },
  { label: "Brands", href: "/brands/patagonia" },
  { label: "Store", href: "/store" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-bg/80 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-4 md:py-5">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-[22px] md:text-[26px] tracking-tight">
            Travel Country
          </span>
          <span className="eyebrow">Outfitters · Est. 1978</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-[13px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-rust transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/plan-trip" className="btn btn-primary hidden md:inline-flex">
            Plan Your Trip
          </Link>
          <Link
            href="/plan-trip"
            className="md:hidden text-[13px] underline underline-offset-4 text-rust"
          >
            Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
