"use client"; // if you're using Next.js 13+ with app directory

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubscribe = async () => {
    if (!email) return;

    setStatus("loading");

    try {
      const res: any = await fetch("http://localhost:4000/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Subscription failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-amber-800 italic text-center text-lg mb-4 font-light">
        Stay inspired: Receive the latest in furniture design and interior styling, delivered to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-400 text-amber-900"
        />
        <button
          type="button"
          onClick={handleSubscribe}
          disabled={status === "loading"}
          className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_12px_#b45309] whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-600 mt-2 text-sm text-center">Thanks for subscribing! We've sent a confirmation email—please check your inbox and verify your address to complete your subscription.</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2 text-sm text-center">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
