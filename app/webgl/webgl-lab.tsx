"use client";

import { useEffect, useRef, useState } from "react";

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 pointer = (u_pointer * 2.0) - 1.0;
  float distanceToPointer = length(uv - pointer);

  float swirl = sin((uv.x + u_time * 0.4) * 7.0) * cos((uv.y - u_time * 0.3) * 7.0);
  float halo = 0.16 / (distanceToPointer + 0.12);

  vec3 base = vec3(0.05, 0.08, 0.16);
  vec3 accentA = vec3(0.16, 0.52, 0.98);
  vec3 accentB = vec3(0.18, 0.92, 0.92);
  vec3 color = base + accentA * (0.5 + 0.5 * swirl) + accentB * halo;

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  gl.deleteShader(shader);
  return null;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  }

  gl.deleteProgram(program);
  return null;
}

export default function WebGlLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      setError("WebGL is not available in this browser.");
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
      setError("Could not compile WebGL shader code.");
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      setError("Could not link WebGL program.");
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");

    if (
      positionLocation < 0 ||
      !resolutionLocation ||
      !timeLocation ||
      !pointerLocation
    ) {
      setError("Could not access shader attributes/uniforms.");
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      setError("Could not allocate vertex buffer.");
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ]),
      gl.STATIC_DRAW,
    );

    let pointerX = 0.5;
    let pointerY = 0.5;

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = 1 - (event.clientY - rect.top) / rect.height;
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = Math.floor(canvas.clientWidth * ratio);
      const height = Math.floor(canvas.clientHeight * ratio);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    resize();

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let frameId = 0;
    const start = performance.now();

    const render = () => {
      const elapsed = (performance.now() - start) / 1000;
      resize();
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <section className="glass-panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-white">Live WebGL Shader Surface</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Move your pointer over the canvas to interact with the shader field.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-500/30 bg-slate-950/60">
        <canvas ref={canvasRef} className="h-72 w-full md:h-96" />
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </section>
  );
}
