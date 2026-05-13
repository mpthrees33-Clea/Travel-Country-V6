import Link from "next/link";
import { BRANDS } from "@/lib/catalog";

export function BrandGrid() {
  return (
    <section className="container-page py-16">
      <div className="mb-8">
        <p className="eyebrow mb-2">The brands we stock</p>
        <h2 className="font-serif">Curated, not categorized.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BRANDS.map((b) => (
          <Link
            key={b.slug}
            href={`/brands/${b.slug}`}
            className="group block relative overflow-hidden aspect-[4/5] bg-surface-2"
          >
            <img
              src={b.hero}
              alt={b.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-bg">
              <p className="eyebrow text-bg/70 mb-1">Brand</p>
              <h3 className="font-serif text-2xl mb-2">{b.name}</h3>
              <p className="text-sm text-bg/85">{b.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
