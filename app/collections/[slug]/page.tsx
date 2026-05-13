import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/snippets/ProductCard";
import { productsByCategory } from "@/lib/catalog";

const CATEGORIES = [
  { slug: "clothing", label: "Clothing" },
  { slug: "outerwear", label: "Outerwear" },
  { slug: "footwear", label: "Footwear" },
  { slug: "gear", label: "Gear" },
  { slug: "paddle", label: "Paddle" },
  { slug: "cooking", label: "Cooking" },
  { slug: "clearance", label: "Clearance" }
];

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const products = productsByCategory(params.slug);

  return (
    <div className="container-page py-12">
      <p className="eyebrow mb-3">Shop · {cat.label}</p>
      <div className="flex items-end justify-between mb-10">
        <h1 className="font-serif">{cat.label}</h1>
        <p className="text-ink-muted text-sm">{products.length} products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <aside className="md:col-span-3">
          <p className="eyebrow mb-3">Categories</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className={c.slug === params.slug ? "text-rust font-medium" : "hover:text-rust"}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 border border-rule bg-surface">
            <p className="eyebrow mb-2">Need a hand?</p>
            <p className="text-sm text-ink-muted mb-3">Let us build a head-to-toe loadout for your trip.</p>
            <Link href="/plan-trip" className="btn btn-primary text-[11px]">
              Plan Your Trip →
            </Link>
          </div>
        </aside>

        <div className="md:col-span-9">
          {products.length === 0 ? (
            <p className="text-ink-muted">No products yet in this collection.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
