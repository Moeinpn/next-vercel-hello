import OctagonNavigator from "./components/octagon-navigator";

export default function Home() {
  return (
    <main className="page-wrap min-h-screen px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <OctagonNavigator />

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
      </div>
    </main>
  );
}
