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
uniform vec2 u_pointer;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 pointer = vec2(u_pointer.x, 1.0 - u_pointer.y);
  vec2 delta = uv - pointer;
  delta.x *= u_resolution.x / u_resolution.y;
  float dist = length(delta);

  float glow = smoothstep(0.46, 0.02, dist);
  float core = smoothstep(0.10, 0.0, dist);

  vec3 base = vec3(0.03, 0.06, 0.12);
  vec3 halo = vec3(0.12, 0.42, 0.86) * glow;
  vec3 dot = vec3(0.40, 0.95, 0.95) * core;
  vec3 color = base + halo + dot;

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
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");

    if (positionLocation < 0 || !resolutionLocation || !pointerLocation) {
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

    const drawScene = () => {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointerY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      drawScene();
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
      drawScene();
    };

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    canvas.addEventListener("pointerdown", handlePointer);
    canvas.addEventListener("pointermove", handlePointer);
    window.addEventListener("resize", resize);
    resize();
    drawScene();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", handlePointer);
      canvas.removeEventListener("pointermove", handlePointer);
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
        Move your pointer over the canvas to track a static glow with no background animation.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-500/30 bg-slate-950/60">
        <canvas ref={canvasRef} className="h-72 w-full md:h-96" />
      </div>
      {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
    </section>
  );
}
