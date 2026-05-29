import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";

const tailwindCode = `// app/globals.css
@import "tailwindcss";

// Example card classes used in this project
<section className="glass-panel rounded-2xl p-5 sm:p-6">
  <h2 className="text-lg font-semibold text-white">Title</h2>
  <p className="mt-2 text-sm text-slate-300">Description</p>
</section>`;

export default function TailwindPage() {
  return (
    <LearningShell
      title="Tailwind"
      subtitle="Tailwind is used as the main styling system in this project. Utilities handle layout, spacing, typography, and responsive behavior, while a small global CSS layer adds brand-like visual effects."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Tailwind in this project</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The setup uses the Tailwind PostCSS plugin and `@import &quot;tailwindcss&quot;` in
          global CSS. Component styling mostly lives in class names, making design changes fast and
          consistent across pages.
        </p>
      </section>

      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Live Styled Example</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-200">Utility-first styling</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Composable classes</h3>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              Utilities combine like LEGO blocks to build consistent UI quickly.
            </p>
            <button
              type="button"
              className="mt-4 rounded-full border border-cyan-300/50 bg-cyan-300/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Styled with Tailwind
            </button>
          </div>
          <div className="rounded-xl border border-slate-600/40 bg-slate-900/60 p-4 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">Why it fits this workflow</p>
            <ul className="mt-3 space-y-2">
              <li>Fast iteration without leaving JSX/TSX.</li>
              <li>Responsive classes keep desktop/mobile behavior aligned.</li>
              <li>Small custom CSS layer handles premium visual atmosphere.</li>
            </ul>
          </div>
        </div>
      </section>

      <CodePanel code={tailwindCode} title="Tailwind Usage Pattern in This Project" />
    </LearningShell>
  );
}
