import { notFound } from "next/navigation";
import Link from "next/link";
import { BRANDS, productsByBrand } from "@/lib/catalog";
import { ProductCard } from "@/snippets/ProductCard";

export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = BRANDS.find((b) => b.slug === params.slug);
  if (!brand) notFound();
  const products = productsByBrand(params.slug);

  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={brand.hero} alt={brand.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-page pb-14 text-bg">
            <p className="eyebrow text-bg/70 mb-3">Brand spotlight</p>
            <h1 className="font-serif text-bg mb-3">{brand.name}</h1>
            <p className="text-bg/85 text-lg max-w-xl">{brand.tagline}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 max-w-3xl">
        <p className="eyebrow mb-3">Why we carry it</p>
        <p className="font-serif text-2xl leading-snug">{brand.blurb}</p>
      </section>

      <section className="container-page pb-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif">Featured pieces</h2>
          <Link href="/collections/gear" className="text-sm underline underline-offset-4">
            All gear →
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">Stocked on the floor. Catalog sync in progress.</p>
        )}
      </section>
    </div>
  );
}
