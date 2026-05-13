import Link from "next/link";

export function Hero() {
  return (
    <section className="relative">
      <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-14 md:py-24">
        <div className="md:col-span-6">
          <p className="eyebrow mb-4">Outfitters · Est. 1978</p>
          <h1 className="font-serif mb-6">
            Outfitting Florida&rsquo;s adventurers, head to toe.
          </h1>
          <p className="text-lg text-ink-muted max-w-lg mb-8">
            Tell us where you&rsquo;re going. Our system will dress you for it — boots, layers, pack, and the brands we
            actually stand behind.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/plan-trip" className="btn btn-primary">
              Plan your trip →
            </Link>
            <Link href="/collections/gear" className="btn btn-ghost">
              Shop new arrivals
            </Link>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="aspect-[4/5] bg-surface-2 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80"
              alt="Backpacker at sunrise"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
