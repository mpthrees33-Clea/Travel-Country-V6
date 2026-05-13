import Link from "next/link";

export function EditorialBlock() {
  return (
    <section className="bg-surface-2 py-16 my-12">
      <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 order-2 md:order-1">
          <p className="eyebrow mb-3">From the floor</p>
          <h2 className="font-serif mb-5">Orlando&rsquo;s only fully-stocked Hobie dealer.</h2>
          <p className="text-ink-muted text-lg mb-4 max-w-xl">
            We rig every Mirage we sell, run free demos at Wekiva, and meet you at the launch when it&rsquo;s time to
            deliver. Pedal-driven kayaking isn&rsquo;t a category — it&rsquo;s a different sport.
          </p>
          <Link href="/brands/hobie" className="btn btn-ghost mt-2">
            Meet the Hobie lineup →
          </Link>
        </div>
        <div className="md:col-span-6 order-1 md:order-2">
          <div className="aspect-[5/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1502920514313-52581002a659?w=1200&q=80"
              alt="Hobie kayak on Florida waters"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
