import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type LearningShellProps = {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
};

export default function LearningShell({
  title,
  subtitle,
  badge = "Learning Route",
  children,
}: LearningShellProps) {
  return (
    <main className="page-wrap min-h-screen px-6 py-10 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 transition hover:border-cyan-300/60 hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Front Page
        </Link>

        <header className="glass-panel rounded-3xl p-6 sm:p-8">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-200">
            {badge}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{subtitle}</p>
        </header>

        <section className="space-y-6">{children}</section>
      </div>
    </main>
  );
}
