import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Atom,
  Box,
  Brush,
  GitBranch,
  Layers3,
  ServerCog,
  Sparkles,
} from "lucide-react";

type Topic = {
  title: string;
  href: string;
  description: string;
  accent: string;
  icon: LucideIcon;
};

const topics: Topic[] = [
  {
    title: "Hook in JS",
    href: "/hook-in-js",
    description: "What hooks are, why they exist, and a live custom-hook playground.",
    accent: "from-cyan-500/60 via-sky-500/50 to-indigo-500/60",
    icon: Atom,
  },
  {
    title: "Use Stage",
    href: "/use-stage",
    description: "State updates, transitions, and a practical `useState` interactive lab.",
    accent: "from-emerald-500/60 via-teal-500/50 to-cyan-500/60",
    icon: Layers3,
  },
  {
    title: "Use Effect",
    href: "/use-effect",
    description: "Effect lifecycle, cleanups, dependencies, and live effect behavior.",
    accent: "from-fuchsia-500/60 via-violet-500/50 to-indigo-500/60",
    icon: Sparkles,
  },
  {
    title: "Server Component",
    href: "/server-component",
    description: "How Next.js renders on the server and why it improves delivery.",
    accent: "from-blue-500/60 via-sky-500/50 to-cyan-500/60",
    icon: ServerCog,
  },
  {
    title: "Client Component",
    href: "/client-component",
    description: "Interactivity boundaries and when to use `\"use client\"`.",
    accent: "from-amber-500/60 via-orange-500/50 to-rose-500/60",
    icon: Box,
  },
  {
    title: "Tailwind",
    href: "/tailwind",
    description: "How utility-first styling was used to build this interface.",
    accent: "from-pink-500/60 via-rose-500/50 to-orange-500/60",
    icon: Brush,
  },
  {
    title: "GitHub Terminology",
    href: "/github-terminology",
    description: "A simple workflow for stage, commit, branches, and conflict handling.",
    accent: "from-indigo-500/60 via-violet-500/50 to-cyan-500/60",
    icon: GitBranch,
  },
  {
    title: "WebGL",
    href: "/webgl",
    description: "A live shader demo showing lightweight 3D-style visual effects.",
    accent: "from-sky-500/60 via-cyan-500/50 to-emerald-500/60",
    icon: Sparkles,
  },
];

export default function Home() {
  return (
    <main className="page-wrap min-h-screen px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="glass-panel rounded-3xl p-6 sm:p-8">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-200">
            Premium Learning Deck
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Next.js + Tailwind + TypeScript Workflow Guide
          </h1>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            This project is a compact teaching representation of modern React and Next.js
            development. It uses App Router structure, Tailwind utility styling, and TypeScript
            safety to show both theory and practical implementation in one place.
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            The philosophy is minimal but complete: keep components intentional, place interactivity
            in Client Components, keep static and secure logic on the server, and use package
            managers and versioned dependencies to make builds reproducible from local to Vercel.
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-3">
          <article className="glass-panel rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white">React philosophy</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Build UI as a pure function of state. Reuse behavior through hooks and compose small
              components into larger features.
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white">Next.js rendering model</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              App Router uses Server Components by default, then layers in Client Components for
              interactivity. Static pre-rendering and server rendering both reduce delivery cost.
            </p>
          </article>
          <article className="glass-panel rounded-2xl p-5">
            <h2 className="text-base font-semibold text-white">Packages and workflow</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Dependencies are managed with a package manager (Yarn here), typed with TypeScript,
              styled with Tailwind, and shipped through GitHub + Vercel deployment flow.
            </p>
          </article>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.href}
                href={topic.href}
                className="glass-panel shimmer group rounded-2xl p-5 transition hover:-translate-y-1.5 hover:border-cyan-300/40"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`soft-ring inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-cyan-200" />
                </div>
                <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{topic.description}</p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
