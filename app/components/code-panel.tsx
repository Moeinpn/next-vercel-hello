type CodePanelProps = {
  code: string;
  language?: string;
  title?: string;
};

export default function CodePanel({
  code,
  language = "tsx",
  title = "Code",
}: CodePanelProps) {
  return (
    <section className="code-surface rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide text-slate-100">{title}</h3>
        <span className="rounded-full border border-slate-500/40 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
          {language}
        </span>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-slate-700/60 bg-slate-950/70 p-4 text-xs leading-relaxed text-cyan-100 sm:text-sm">
        <code>{code}</code>
      </pre>
    </section>
  );
}
