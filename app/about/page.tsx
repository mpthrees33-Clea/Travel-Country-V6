export const metadata = { title: "Our Story · Travel Country Outfitters" };

export default function AboutPage() {
  return (
    <div>
      <section className="container-page pt-16 pb-10 max-w-3xl">
        <p className="eyebrow mb-3">Our Story</p>
        <h1 className="font-serif mb-6">A Central Florida outfitter, since 1978.</h1>
        <p className="text-lg text-ink-muted leading-relaxed">
          We started on Altamonte Drive with a small footprint and a big idea: outdoor people deserve outdoor people
          behind the counter. Forty-plus years later, the door is the same, the staff still does the trips themselves,
          and we still pick every brand on the floor on purpose.
        </p>
      </section>

      <section className="container-page py-12">
        <div className="aspect-[16/9] overflow-hidden bg-surface-2">
          <img
            src="https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=1600&q=80"
            alt="Florida wetlands at sunrise"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="container-page py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <Pillar
          eyebrow="Curated"
          title="We carry what we&rsquo;d wear."
          body="No me-too house brands. No volume buys we can&rsquo;t stand behind. If it&rsquo;s on the floor, it earned the spot."
        />
        <Pillar
          eyebrow="Local"
          title="Made for Florida."
          body="A 90°F summer paddle is a different sport than an October backpack. We outfit both — and everyone who lives between them."
        />
        <Pillar
          eyebrow="Honest"
          title="We&rsquo;ll tell you no."
          body="If you don&rsquo;t need it, we won&rsquo;t sell it. We&rsquo;d rather have a customer for life than a sale today."
        />
      </section>
    </div>
  );
}

function Pillar({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-rule pt-5">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h3 className="font-serif text-2xl mb-3" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-ink-muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
