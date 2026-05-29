import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import HookPlayground from "./hook-playground";

const hookCode = `function useStepCounter(initialValue: number) {
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
}`;

export default function HookInJsPage() {
  return (
    <LearningShell
      title="Hook in JS"
      subtitle="Hooks are reusable functions that let React components share behavior without repeating logic. In practice, a hook keeps stateful and side-effect logic in one place, while components focus on rendering."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Why this matters</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          React&apos;s philosophy is composability. Instead of inheritance-heavy structures, hooks
          let you compose logic. This keeps features easier to test, evolve, and move across
          projects.
        </p>
      </section>

      <HookPlayground />

      <CodePanel code={hookCode} title="Hook Source Used in Demo" />
    </LearningShell>
  );
}
