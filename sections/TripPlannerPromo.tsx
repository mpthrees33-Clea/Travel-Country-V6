import Link from "next/link";

export function TripPlannerPromo() {
  return (
    <section className="container-page py-12">
      <Link
        href="/plan-trip"
        className="block bg-ink text-bg p-8 md:p-14 hover:bg-rust transition-colors"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-3 flex justify-center">
            <PromoAvatar />
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow text-bg/70 mb-3">The Plan Your Trip Tool</p>
            <h2 className="font-serif text-bg mb-3">Describe your trip. We&rsquo;ll dress the avatar.</h2>
            <p className="text-bg/80 max-w-xl">
              Type a sentence. Click a few chips. Get a head-to-toe loadout in seconds, with real products from our
              shelves and a checklist you can print or add to cart.
            </p>
          </div>
          <div className="md:col-span-2 md:text-right">
            <span className="btn bg-bg text-ink hover:bg-bg/90">Try it →</span>
          </div>
        </div>
      </Link>
    </section>
  );
}

function PromoAvatar() {
  return (
    <svg viewBox="0 0 160 240" className="w-32">
      <circle cx="80" cy="58" r="22" fill="#e8c9a8" />
      <rect x="62" y="78" width="36" height="60" rx="8" fill="#b85c38" />
      <rect x="52" y="88" width="14" height="50" rx="4" fill="#b85c38" />
      <rect x="94" y="88" width="14" height="50" rx="4" fill="#b85c38" />
      <rect x="66" y="138" width="12" height="56" fill="#3a342f" />
      <rect x="82" y="138" width="12" height="56" fill="#3a342f" />
      <rect x="62" y="194" width="18" height="10" rx="2" fill="#3a2a1a" />
      <rect x="82" y="194" width="18" height="10" rx="2" fill="#3a2a1a" />
      <rect x="52" y="86" width="10" height="58" rx="4" fill="#3f5447" />
      <rect x="98" y="86" width="10" height="58" rx="4" fill="#3f5447" />
    </svg>
  );
}
