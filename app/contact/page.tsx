"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:info@travelcountry.com?subject=Website%20contact&body=${body}`;
  }

  return (
    <div className="container-page py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 max-w-5xl">
        <div className="md:col-span-5">
          <p className="eyebrow mb-3">Get in touch</p>
          <h1 className="font-serif mb-5">Talk to a real human.</h1>
          <p className="text-ink-muted mb-10 max-w-md">
            Questions on a product? Need a trip dialed in? The phone is the fastest path. Or send us a note and
            we&rsquo;ll write back.
          </p>

          <p className="eyebrow mb-2">Phone</p>
          <p className="mb-6">
            <a href="tel:18006433629" className="block hover:text-rust">
              800.643.3629
            </a>
            <a href="tel:14078310777" className="block hover:text-rust">
              407.831.0777
            </a>
          </p>

          <p className="eyebrow mb-2">Email</p>
          <p className="mb-6">
            <a href="mailto:info@travelcountry.com" className="hover:text-rust">
              info@travelcountry.com
            </a>
          </p>

          <p className="eyebrow mb-2">Visit</p>
          <p className="text-sm leading-relaxed">
            1101 E Altamonte Drive
            <br />
            Altamonte Springs, FL 32701
          </p>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={submit} className="bg-surface border border-rule p-8 space-y-5">
            <div>
              <label className="eyebrow block mb-2">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg border border-rule px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="eyebrow block mb-2">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg border border-rule px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="eyebrow block mb-2">Message</label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-bg border border-rule px-4 py-3 text-sm resize-none"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
