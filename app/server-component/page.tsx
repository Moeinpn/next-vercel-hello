import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";

async function getServerSnapshot() {
  await new Promise((resolve) => setTimeout(resolve, 60));

  return {
    generatedAt: new Date().toISOString(),
    runtime: process.env.NEXT_RUNTIME ?? "nodejs",
    packageManager: process.env.npm_config_user_agent?.split(" ")[0] ?? "unknown",
  };
}

const serverCode = `export default async function ServerComponentPage() {
  const snapshot = await getServerSnapshot();

  return (
    <section>
      <p>{snapshot.generatedAt}</p>
      <p>{snapshot.runtime}</p>
    </section>
  );
}`;

export default async function ServerComponentPage() {
  const snapshot = await getServerSnapshot();

  return (
    <LearningShell
      title="Server Component"
      subtitle="In Next.js App Router, pages are Server Components by default. They run on the server, can fetch data directly, and ship less client-side JavaScript for faster first paint."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Live Server Snapshot</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Generated at</p>
            <p className="mt-2 text-slate-100">{snapshot.generatedAt}</p>
          </div>
          <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Runtime</p>
            <p className="mt-2 text-slate-100">{snapshot.runtime}</p>
          </div>
          <div className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Package manager</p>
            <p className="mt-2 text-slate-100">{snapshot.packageManager}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          This section is rendered by the server component itself. No browser-only APIs are needed
          here, which keeps the client bundle small and helps performance.
        </p>
      </section>

      <CodePanel code={serverCode} title="Server Component Pattern" />
    </LearningShell>
  );
}
