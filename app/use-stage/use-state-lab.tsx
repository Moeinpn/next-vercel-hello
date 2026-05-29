"use client";

import { startTransition, useDeferredValue, useState } from "react";

const lessonItems = [
  "State drives what the user sees",
  "setState schedules a render",
  "Derived UI should come from current state",
  "Multiple state variables can model complex screens",
  "Transitions keep expensive updates responsive",
];

export default function UseStateLab() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = lessonItems.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase().trim()),
  );

  function handleSearchChange(value: string) {
    startTransition(() => {
      setQuery(value);
    });
  }

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Live `useState` + Transition Demo</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Counter updates use `useState`. Search uses `startTransition` + `useDeferredValue` so UI
        stays smooth while filtering.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Counter</p>
          <p className="mt-3 text-4xl font-semibold text-emerald-200">{count}</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setCount((value) => value + 1)}
              className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20"
            >
              +1
            </button>
            <button
              type="button"
              onClick={() => setCount((value) => value - 1)}
              className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-400/20"
            >
              -1
            </button>
            <button
              type="button"
              onClick={() => setCount(0)}
              className="rounded-full border border-slate-400/50 bg-slate-700/30 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700/50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Search Lesson Items
          </label>
          <input
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Type to filter..."
            className="mt-3 w-full rounded-lg border border-slate-500/50 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-300/60"
          />
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li key={item} className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2">
                  {item}
                </li>
              ))
            ) : (
              <li className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-slate-400">
                No matches.
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
