import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import UseStateLab from "./use-state-lab";

const useStateCode = `const [count, setCount] = useState(0);
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

function handleSearchChange(value: string) {
  startTransition(() => {
    setQuery(value);
  });
}`;

export default function UseStagePage() {
  return (
    <LearningShell
      title="Use Stage (`useState`)"
      subtitle="You requested a 'use stage' section, implemented here as `useState`. State is React's core UI memory model: when state changes, the component rerenders with a new UI snapshot."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">Concept</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          `useState` keeps values across renders. It powers forms, counters, toggles, and user
          inputs. This page also demonstrates React transitions to prevent heavier updates from
          blocking urgent interactions.
        </p>
      </section>

      <UseStateLab />

      <CodePanel code={useStateCode} title="Core State Pattern Used" />
    </LearningShell>
  );
}
