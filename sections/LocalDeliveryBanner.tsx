export function LocalDeliveryBanner() {
  return (
    <section className="border-y border-rule bg-bg">
      <div className="container-page py-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          <span className="eyebrow mr-3 text-rust">Local</span>
          Free Central Florida delivery on most orders. Same-day for in-stock items.
        </p>
        <a href="/store" className="text-sm underline underline-offset-4">
          Visit the showroom →
        </a>
      </div>
    </section>
  );
}
