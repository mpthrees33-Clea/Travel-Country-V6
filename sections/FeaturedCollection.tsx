import { featuredNew } from "@/lib/catalog";
import { ProductCard } from "@/snippets/ProductCard";

export function FeaturedCollection() {
  const products = featuredNew(8);
  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">New &amp; Featured</p>
          <h2 className="font-serif">What just landed.</h2>
        </div>
        <a href="/collections/gear" className="text-sm underline underline-offset-4 hidden md:block">
          See all →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
