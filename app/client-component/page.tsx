import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import ClientLab from "./client-lab";

const clientCode = `'use client'

import { useState } from 'react'

export default function ClientLab() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <button onClick={() => setActiveIndex(1)}>
      Interactive UI
    </button>
  )
}`;

export default function ClientComponentPage() {
  return (
    <LearningShell
      title="Client Component"
      subtitle="Client Components add browser interactivity inside the App Router model. Use them for local state, event handlers, and browser APIs, while leaving static-heavy logic on the server."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">When to use `&quot;use client&quot;`</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Add the directive at the top of a file when that component needs to run in the browser.
          Keep the boundary focused, so only truly interactive parts are shipped as client-side
          JavaScript.
        </p>
      </section>

      <ClientLab />

      <CodePanel code={clientCode} title="Client Entry Pattern" />
    </LearningShell>
  );
}
