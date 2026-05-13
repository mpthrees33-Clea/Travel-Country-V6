"use client";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="container-page py-20 text-center max-w-2xl">
      <p className="eyebrow mb-3">Stay in the loop</p>
      <h2 className="font-serif mb-4">Gear drops, trip dispatches, store events.</h2>
      <p className="text-ink-muted mb-6">No spam. Unsubscribe whenever.</p>
      {done ? (
        <p className="text-rust">Thanks — we&rsquo;ll be in touch.</p>
      ) : (
        <form
          className="flex flex-col sm:flex-row gap-3 justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="bg-surface border border-rule px-4 py-3 text-sm w-full sm:w-80"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
