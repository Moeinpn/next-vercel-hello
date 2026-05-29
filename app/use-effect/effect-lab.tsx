"use client";

import { useEffect, useState } from "react";

export default function UseEffectLab() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [events, setEvents] = useState<string[]>(["Effect lab ready"]);

  function pushEvent(event: string) {
    setEvents((current) => [event, ...current].slice(0, 5));
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000 / speed);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, speed]);

  useEffect(() => {
    document.title = `useEffect demo: ${seconds}s`;
    return () => {
      document.title = "Next Vercel Hello";
    };
  }, [seconds]);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Live `useEffect` Playground</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Start and stop the timer to see setup and cleanup in action. The browser tab title also
        updates through an effect.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Timer</p>
          <p className="mt-3 text-4xl font-semibold text-fuchsia-200">{seconds}s</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setIsRunning(true);
                pushEvent(`Timer started at ${speed}x`);
              }}
              className="rounded-full border border-fuchsia-400/50 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100 transition hover:bg-fuchsia-400/20"
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                pushEvent("Timer paused");
              }}
              className="rounded-full border border-fuchsia-400/50 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100 transition hover:bg-fuchsia-400/20"
            >
              Pause
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSeconds(0);
                pushEvent("Timer reset");
              }}
              className="rounded-full border border-slate-400/50 bg-slate-700/30 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700/50"
            >
              Reset
            </button>
          </div>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Speed: {speed}x
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="mt-2 w-full accent-fuchsia-400"
          />
        </div>

        <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Effect Log</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {events.map((event, index) => (
              <li
                key={`${event}-${index}`}
                className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2"
              >
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
