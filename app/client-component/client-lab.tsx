"use client";

import { useState } from "react";

const examples = [
  {
    title: "State",
    detail: "Client Components can store and update UI state with hooks like useState.",
  },
  {
    title: "Events",
    detail: "User interactions such as onClick or onChange are handled in the browser.",
  },
  {
    title: "Browser APIs",
    detail: "Only Client Components can safely access window, localStorage, and DOM APIs.",
  },
];

export default function ClientLab() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Live Client Interaction</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        This block is interactive because it is a Client Component with `&quot;use client&quot;`.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {examples.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeIndex === index
                ? "border-amber-300/60 bg-amber-300/20 text-amber-100"
                : "border-slate-500/50 bg-slate-800/40 text-slate-200 hover:border-amber-300/60"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
        <h3 className="text-base font-semibold text-white">{examples[activeIndex].title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-300">{examples[activeIndex].detail}</p>
      </div>
    </section>
  );
}
