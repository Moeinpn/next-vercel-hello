"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Atom,
  Box,
  Brush,
  GitBranch,
  Layers3,
  ServerCog,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type Topic = {
  title: string;
  href: string;
  description: string;
  accent: string;
  icon: LucideIcon;
};

const topics: Topic[] = [
  {
    title: "Hook in JS",
    href: "/hook-in-js",
    description: "What hooks are, why they exist, and a live custom-hook playground.",
    accent: "from-cyan-500/60 via-sky-500/50 to-indigo-500/60",
    icon: Atom,
  },
  {
    title: "Use Stage",
    href: "/use-stage",
    description: "State updates, transitions, and a practical useState interactive lab.",
    accent: "from-emerald-500/60 via-teal-500/50 to-cyan-500/60",
    icon: Layers3,
  },
  {
    title: "Use Effect",
    href: "/use-effect",
    description: "Effect lifecycle, cleanups, dependencies, and live effect behavior.",
    accent: "from-fuchsia-500/60 via-violet-500/50 to-indigo-500/60",
    icon: Sparkles,
  },
  {
    title: "Server Component",
    href: "/server-component",
    description: "How Next.js renders on the server and why it improves delivery.",
    accent: "from-blue-500/60 via-sky-500/50 to-cyan-500/60",
    icon: ServerCog,
  },
  {
    title: "Client Component",
    href: "/client-component",
    description: "Interactivity boundaries and when to use use client.",
    accent: "from-amber-500/60 via-orange-500/50 to-rose-500/60",
    icon: Box,
  },
  {
    title: "Tailwind",
    href: "/tailwind",
    description: "How utility-first styling was used to build this interface.",
    accent: "from-pink-500/60 via-rose-500/50 to-orange-500/60",
    icon: Brush,
  },
  {
    title: "GitHub Terminology",
    href: "/github-terminology",
    description: "A simple workflow for stage, commit, branches, and conflict handling.",
    accent: "from-indigo-500/60 via-violet-500/50 to-cyan-500/60",
    icon: GitBranch,
  },
  {
    title: "WebGL",
    href: "/webgl",
    description: "A pointer-driven shader demo for lightweight GPU visuals.",
    accent: "from-sky-500/60 via-cyan-500/50 to-emerald-500/60",
    icon: Sparkles,
  },
];

const surpriseVectors = [
  { x: -980, y: -620, z: 540, rz: -35 },
  { x: -340, y: -860, z: 540, rz: -20 },
  { x: 300, y: -900, z: 540, rz: 14 },
  { x: 980, y: -620, z: 540, rz: 32 },
  { x: 1040, y: 560, z: 540, rz: 38 },
  { x: 360, y: 860, z: 540, rz: 18 },
  { x: -320, y: 860, z: 540, rz: -20 },
  { x: -1020, y: 560, z: 540, rz: -36 },
] as const;

type DragState = {
  active: boolean;
  pointerId: number;
  startX: number;
  startRotation: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
  dragDistance: number;
};

const initialDrag: DragState = {
  active: false,
  pointerId: -1,
  startX: 0,
  startRotation: 0,
  lastX: 0,
  lastTime: 0,
  velocity: 0,
  moved: false,
  dragDistance: 0,
};

export default function OctagonNavigator() {
  const [rotation, setRotation] = useState(-18);
  const [surpriseActive, setSurpriseActive] = useState(false);
  const rotationRef = useRef(-18);
  const dragRef = useRef<DragState>(initialDrag);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const blockClickRef = useRef(false);

  const panelWidth = 250;
  const panelHeight = 260;
  const radius = panelWidth / (2 * Math.tan(Math.PI / 8));
  const surpriseDurationMs = 950;

  const updateRotation = (nextRotation: number) => {
    rotationRef.current = nextRotation;
    setRotation(nextRotation);
  };

  const stopInertia = () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  const startInertia = (startVelocity: number) => {
    stopInertia();
    let velocity = startVelocity;
    let previousTime: number | null = null;

    const step = (time: number) => {
      if (previousTime === null) {
        previousTime = time;
      }
      const dt = time - previousTime;
      previousTime = time;

      if (Math.abs(velocity) < 0.012) {
        stopInertia();
        return;
      }

      updateRotation(rotationRef.current + velocity * dt);
      velocity *= Math.pow(0.996, dt);
      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!surpriseActive) {
      return;
    }

    const handleGlobalClick = () => {
      setSurpriseActive(false);
    };

    window.addEventListener("pointerdown", handleGlobalClick, true);
    return () => {
      window.removeEventListener("pointerdown", handleGlobalClick, true);
    };
  }, [surpriseActive]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (surpriseActive) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      blockClickRef.current = false;
      return;
    }

    stopInertia();
    blockClickRef.current = false;
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotationRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false,
      dragDistance: 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (surpriseActive) {
      return;
    }
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - drag.startX;
    if (Math.abs(deltaX) > 6) {
      dragRef.current.moved = true;
    }

    const dt = Math.max(1, event.timeStamp - drag.lastTime);
    const dx = event.clientX - drag.lastX;
    const velocity = dx / dt;
    const dragDistance = drag.dragDistance + Math.abs(dx);

    dragRef.current.lastX = event.clientX;
    dragRef.current.lastTime = event.timeStamp;
    dragRef.current.velocity = velocity;
    dragRef.current.dragDistance = dragDistance;
    dragRef.current.moved = dragDistance > 6;

    updateRotation(drag.startRotation + deltaX * 0.56);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) {
      return;
    }
    dragRef.current.active = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    blockClickRef.current = drag.dragDistance > 6;

    const flingVelocity = drag.velocity * 1.1;
    if (Math.abs(flingVelocity) > 0.02) {
      startInertia(flingVelocity);
    }
  };

  return (
    <section className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-slate-200">
            Drag left or right to rotate the 3D octagon.
          </p>
          <button
            type="button"
            onClick={() => setSurpriseActive(true)}
            className="rounded-full border border-amber-300/50 bg-amber-300/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-100 transition hover:bg-amber-300/25"
          >
            Surprise
          </button>
        </div>
        <p className="text-xs text-slate-400">Tap or click any panel to open its page.</p>
      </div>

      <div
        ref={sphereRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        className="relative z-10 mx-auto h-[640px] w-full max-w-[1100px] touch-pan-y cursor-grab select-none rounded-3xl border border-slate-500/30 bg-slate-950/30 active:cursor-grabbing sm:h-[700px]"
      >
        {surpriseActive ? (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center px-4 text-center">
            <p className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-6 py-4 text-xl font-semibold text-amber-100 sm:text-3xl">
              I&apos;ve hit 1000 chess ELO before you!
            </p>
          </div>
        ) : null}

        <div className="absolute inset-0 grid place-items-center [perspective:1700px]">
          <div
            className="relative transform-3d [will-change:transform]"
            style={{
              width: `${panelWidth}px`,
              height: `${panelHeight}px`,
              transform: `rotateX(-11deg) rotateY(${rotation}deg)`,
              transformOrigin: "50% 50%",
            }}
          >
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const angle = index * 45;
              const vector = surpriseVectors[index];
              const baseTransform = `rotateY(${angle}deg) translateZ(${radius}px)`;
              const surpriseTransform = `${baseTransform} translate3d(${vector.x}px, ${vector.y}px, ${vector.z}px) rotateZ(${vector.rz}deg) scale(0.66)`;
              return (
                <Link
                  key={topic.href}
                  href={topic.href}
                  onClick={(event) => {
                    if (surpriseActive || blockClickRef.current) {
                      event.preventDefault();
                      blockClickRef.current = false;
                    }
                  }}
                  className={`glass-panel absolute left-0 top-0 block rounded-2xl p-4 transition-all ease-[cubic-bezier(.2,.9,.2,1)] hover:border-cyan-300/50 ${
                    surpriseActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                  style={{
                    width: `${panelWidth}px`,
                    height: `${panelHeight}px`,
                    transform: surpriseActive ? surpriseTransform : baseTransform,
                    transitionDuration: `${surpriseDurationMs}ms`,
                  }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className={`soft-ring inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{topic.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
