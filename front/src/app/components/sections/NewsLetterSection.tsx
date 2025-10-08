// components/sections/NewsletterSection.tsx

export default function NewsletterSection() {
  return (
    <div className="max-w-md mx-auto p-6">
      <p className="text-amber-800 italic text-center text-lg mb-4 font-light">
        Stay inspired: Receive the latest in furniture design and interior styling, delivered to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-amber-400 text-amber-900"
        />
        <button
          type="button"
          className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-[0_0_12px_#b45309] whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}