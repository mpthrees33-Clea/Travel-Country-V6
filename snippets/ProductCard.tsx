import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/trip-schema";

export function ProductCard({ product, size = "md" }: { product: Product; size?: "sm" | "md" | "lg" }) {
  const aspect = size === "lg" ? "aspect-[4/5]" : "aspect-square";
  return (
    <Link href="#" className="product-card group">
      <div className={`${aspect} relative overflow-hidden bg-surface-2`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="eyebrow mb-1">{product.brand}</p>
        <h3 className="font-serif text-lg leading-snug mb-2">{product.name}</h3>
        <p className="text-sm text-ink">${product.price}</p>
      </div>
    </Link>
  );
}
