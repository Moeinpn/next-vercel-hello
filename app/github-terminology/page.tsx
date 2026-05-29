import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";

const gitFlowCode = `git status
git add app/page.tsx
git commit -m "Create premium learning homepage"
git switch -c feature/learning-guide
git push -u origin feature/learning-guide`;

const conflictCode = `# 1) Pull latest changes
git fetch origin
git rebase origin/main

# 2) If conflict appears, edit conflicted files
# 3) Stage resolved files
git add <resolved-file>

# 4) Continue rebase
git rebase --continue`;

const steps = [
  {
    title: "Command",
    detail:
      "A command is an instruction you run in your terminal, like `git status` or `git log`. Commands are how you ask Git to inspect or change repository state.",
  },
  {
    title: "Stage",
    detail:
      "Staging (`git add`) chooses exactly which file changes go into the next commit. Think of it as preparing a precise snapshot.",
  },
  {
    title: "Commit",
    detail:
      "A commit is a saved checkpoint with message + metadata. Good commits are focused and explain intent, not just file names.",
  },
  {
    title: "Source Management",
    detail:
      "Branches isolate work. Pull requests are review gates. Merging combines approved work into main in a controlled way.",
  },
  {
    title: "Conflict Resolve",
    detail:
      "Conflicts happen when two histories touch the same lines differently. Resolve by choosing the correct final code, then stage and continue rebase/merge.",
  },
];

export default function GitHubTerminologyPage() {
  return (
    <LearningShell
      title="GitHub Terminology"
      subtitle="This page gives a practical step-by-step workflow: command -> stage -> commit -> branch -> review -> merge, plus how to resolve conflicts without panic."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Step-by-step flow</h2>
        <div className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-slate-600/40 bg-slate-900/50 p-4"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">Step {index + 1}</p>
              <h3 className="mt-1 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <CodePanel code={gitFlowCode} language="bash" title="Common Command -> Stage -> Commit Flow" />
      <CodePanel code={conflictCode} language="bash" title="Conflict Resolution Flow" />
    </LearningShell>
  );
}
