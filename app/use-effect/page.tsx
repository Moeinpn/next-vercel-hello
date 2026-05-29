import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import UseEffectLab from "./effect-lab";

const useEffectCode = `useEffect(() => {
  if (!isRunning) return;

  const intervalId = window.setInterval(() => {
    setSeconds((current) => current + 1);
  }, 1000 / speed);

  return () => {
    window.clearInterval(intervalId);
  };
}, [isRunning, speed]);`;

export default function UseEffectPage() {
  return (
    <LearningShell
      title="Use Effect"
      subtitle="`useEffect` connects React components with systems outside rendering: timers, subscriptions, browser APIs, and network requests. Its cleanup function prevents leaks and stale behavior."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Concept</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Render should stay pure; effects handle side effects after render commits. Dependency
          arrays control when effects rerun, and cleanup runs before rerun or unmount.
        </p>
      </section>

      <UseEffectLab />

      <CodePanel code={useEffectCode} title="Effect and Cleanup Pattern Used" />
    </LearningShell>
  );
}
