import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import WebGlLab from "./webgl-lab";

const webglCode = `const gl = canvas.getContext("webgl");
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

function drawScene() {
  gl.uniform2f(pointerLocation, pointerX, pointerY);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

canvas.addEventListener("pointermove", handlePointer);
window.addEventListener("resize", resize);`;

export default function WebGlPage() {
  return (
    <LearningShell
      title="WebGL"
      subtitle="WebGL gives direct GPU rendering in the browser. This demo now uses a static background and only updates when pointer position changes."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">How this demo works</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          A full-screen quad is drawn in WebGL, and a fragment shader computes color from pointer
          distance only. There is no time-based animation, so the only motion comes from your mouse
          or touch position.
        </p>
      </section>

      <WebGlLab />

      <CodePanel code={webglCode} title="Core WebGL Pointer Render Pattern" />
    </LearningShell>
  );
}
