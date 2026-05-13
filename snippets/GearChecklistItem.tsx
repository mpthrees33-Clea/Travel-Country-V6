import Image from "next/image";
import type { Product } from "@/lib/trip-schema";

export function GearChecklistItem({
  label,
  product
}: {
  label: string;
  product: Product | null;
}) {
  return (
    <div className="flex items-start gap-4 py-4 border-t border-rule">
      <div className="w-16 h-16 relative shrink-0 bg-surface-2 overflow-hidden">
        {product?.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
        ) : null}
      </div>
      <div className="flex-1">
        <p className="eyebrow">{label}</p>
        {product ? (
          <>
            <p className="font-serif text-lg leading-tight">{product.name}</p>
            <p className="text-sm text-ink-muted">
              {product.brand} · ${product.price}
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-muted italic">No match in catalog yet — ask staff.</p>
        )}
      </div>
    </div>
  );
}
