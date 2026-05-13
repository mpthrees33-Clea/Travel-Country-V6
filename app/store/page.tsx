export const metadata = { title: "Visit the Store · Travel Country Outfitters" };

const STAFF = [
  {
    name: "Tom",
    role: "Floor manager & Hobie rep",
    bio: "Has launched more kayaks in Wekiva than he can count. Ask him about pedal-drive tuning."
  },
  {
    name: "Jess",
    role: "Footwear & layering",
    bio: "Will fit you in boots better than the boots fit themselves. Don't argue with her about merino."
  },
  {
    name: "Marco",
    role: "Big Green Egg specialist",
    bio: "If it can be smoked or seared, he's tried it. Free delivery within 30 miles."
  }
];

export default function StorePage() {
  return (
    <div>
      <section className="container-page pt-12 pb-8">
        <p className="eyebrow mb-3">The Showroom</p>
        <h1 className="font-serif mb-4">1101 E Altamonte Drive.</h1>
        <p className="text-lg text-ink-muted max-w-2xl">
          Step inside an actual outfitter. Fit boots on a rock ramp, try a pack loaded with sandbags, fire up a Big
          Green Egg. We&rsquo;ve been doing this since 1978.
        </p>
      </section>

      <section className="container-page">
        <div className="aspect-[16/8] overflow-hidden bg-surface-2">
          <img
            src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=1600&q=80"
            alt="Outdoor gear showroom"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="container-page py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="eyebrow mb-3">Hours</p>
          <table className="text-sm w-full border-t border-rule">
            <tbody>
              {[
                ["Mon–Fri", "10a – 8p"],
                ["Saturday", "10a – 6p"],
                ["Sunday", "11a – 5p"]
              ].map(([d, h]) => (
                <tr key={d} className="border-b border-rule">
                  <td className="py-3">{d}</td>
                  <td className="py-3 text-right">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="eyebrow mt-10 mb-3">Address</p>
          <p className="text-sm leading-relaxed">
            1101 E Altamonte Drive
            <br />
            Altamonte Springs, FL 32701
          </p>

          <p className="eyebrow mt-10 mb-3">Phone</p>
          <p className="text-sm">
            <a href="tel:18006433629" className="block hover:text-rust">
              800.643.3629
            </a>
            <a href="tel:14078310777" className="block hover:text-rust">
              407.831.0777
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow mb-3">In-store services</p>
          <ul className="space-y-4 text-base">
            <li className="border-t border-rule pt-4">
              <p className="font-serif text-lg">Free Big Green Egg delivery</p>
              <p className="text-ink-muted text-sm">Within 30 miles of the showroom. We set it up.</p>
            </li>
            <li className="border-t border-rule pt-4">
              <p className="font-serif text-lg">Hobie kayak rigging &amp; demos</p>
              <p className="text-ink-muted text-sm">
                Orlando&rsquo;s only fully-stocked Hobie dealer. We&rsquo;ll meet you at the water.
              </p>
            </li>
            <li className="border-t border-rule pt-4">
              <p className="font-serif text-lg">Boot fitting &amp; pack fitting</p>
              <p className="text-ink-muted text-sm">No appointment necessary. Bring your socks.</p>
            </li>
            <li className="border-t border-rule pt-4">
              <p className="font-serif text-lg">Free Central FL delivery</p>
              <p className="text-ink-muted text-sm">On most orders. Same-day on in-stock items.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="container-page pb-24">
        <p className="eyebrow mb-3">The people inside</p>
        <h2 className="font-serif mb-8">A few of our outfitters.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STAFF.map((s) => (
            <div key={s.name} className="border-t border-rule pt-5">
              <p className="font-serif text-2xl mb-1">{s.name}</p>
              <p className="eyebrow mb-3">{s.role}</p>
              <p className="text-sm text-ink-muted">{s.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
