import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface-2">
      <div className="container-page grid grid-cols-1 md:grid-cols-4 gap-10 py-14">
        <div>
          <h3 className="font-serif text-2xl mb-2">Travel Country</h3>
          <p className="eyebrow mb-4">Outfitters · Est. 1978</p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Curated outdoor gear from the brands we trust.
            <br />
            Orlando&rsquo;s only fully-stocked Hobie dealer.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Visit</p>
          <p className="text-sm leading-relaxed">
            1101 E Altamonte Drive
            <br />
            Altamonte Springs, FL 32701
            <br />
            <Link href="/store" className="underline underline-offset-4 mt-2 inline-block">
              Hours &amp; directions
            </Link>
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Talk to us</p>
          <p className="text-sm leading-relaxed">
            <a href="tel:18006433629" className="block hover:text-rust">
              800.643.3629
            </a>
            <a href="tel:14078310777" className="block hover:text-rust">
              407.831.0777
            </a>
            <a href="mailto:info@travelcountry.com" className="block hover:text-rust">
              info@travelcountry.com
            </a>
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Explore</p>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/plan-trip" className="hover:text-rust">
                Plan Your Trip
              </Link>
            </li>
            <li>
              <Link href="/collections/clearance" className="hover:text-rust">
                Clearance
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-rust">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-rust">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="container-page py-6 flex items-center justify-between text-[11px] text-ink-muted">
          <p>&copy; {new Date().getFullYear()} Travel Country Outfitters</p>
          <p>Free local delivery throughout Central Florida.</p>
        </div>
      </div>
    </footer>
  );
}
