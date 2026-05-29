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

type DragState = {
  active: boolean;
  pointerId: number;
  startX: number;
  startRotation: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
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
};

export default function OctagonNavigator() {
  const [rotation, setRotation] = useState(-18);
  const rotationRef = useRef(-18);
  const dragRef = useRef<DragState>(initialDrag);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const radius = 320;

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
      velocity *= Math.pow(0.992, dt);
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

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    stopInertia();
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: rotationRef.current,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
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

    dragRef.current.lastX = event.clientX;
    dragRef.current.lastTime = event.timeStamp;
    dragRef.current.velocity = velocity;

    updateRotation(drag.startRotation + deltaX * 0.26);
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

    const flingVelocity = drag.velocity * 0.42;
    if (Math.abs(flingVelocity) > 0.02) {
      startInertia(flingVelocity);
    }

    window.setTimeout(() => {
      dragRef.current.moved = false;
    }, 0);
  };

  return (
    <section className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="shared-highlight" />
      </div>

      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2 px-2">
        <p className="text-sm font-medium text-slate-200">
          Drag left or right to rotate the 3D octagon.
        </p>
        <p className="text-xs text-slate-400">Tap or click any panel to open its page.</p>
      </div>

      <div
        ref={sphereRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative z-10 mx-auto h-[640px] w-full max-w-[1100px] touch-pan-y cursor-grab select-none rounded-3xl border border-slate-500/30 bg-slate-950/30 active:cursor-grabbing sm:h-[700px]"
      >
        <div className="absolute inset-0 grid place-items-center [perspective:1700px]">
          <div
            className="relative h-[420px] w-[260px] transform-3d transition-transform duration-75 ease-out sm:h-[460px] sm:w-[300px]"
            style={{
              transform: `rotateX(-11deg) rotateY(${rotation}deg)`,
            }}
          >
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const angle = index * 45;
              return (
                <Link
                  key={topic.href}
                  href={topic.href}
                  onClick={(event) => {
                    if (dragRef.current.moved) {
                      event.preventDefault();
                    }
                  }}
                  className="glass-panel absolute left-0 top-0 block h-[260px] w-[260px] rounded-2xl p-4 transition hover:border-cyan-300/50 sm:h-[280px] sm:w-[300px] sm:p-5"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
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
