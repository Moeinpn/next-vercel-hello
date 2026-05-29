"use client";

import { useState } from "react";

function useStepCounter(initialValue: number) {
  const [count, setCount] = useState(initialValue);

  function increase(step: number) {
    setCount((current) => current + step);
  }

  function decrease(step: number) {
    setCount((current) => current - step);
  }

  function reset() {
    setCount(initialValue);
  }

  return { count, increase, decrease, reset };
}

export default function HookPlayground() {
  const [step, setStep] = useState(1);
  const counter = useStepCounter(0);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Live Hook Playground</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        This uses a custom hook (`useStepCounter`) to share counter state logic and keep UI
        components clean.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Step Size
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
            className="mt-3 w-full accent-cyan-400"
          />
          <p className="mt-2 text-sm text-slate-200">Current step: {step}</p>
        </div>

        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Counter Value</p>
          <p className="mt-3 text-4xl font-semibold text-cyan-200">{counter.count}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => counter.increase(step)}
          className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20"
        >
          Increase
        </button>
        <button
          type="button"
          onClick={() => counter.decrease(step)}
          className="rounded-full border border-indigo-400/50 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-400/20"
        >
          Decrease
        </button>
        <button
          type="button"
          onClick={counter.reset}
          className="rounded-full border border-slate-400/50 bg-slate-700/30 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700/50"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
