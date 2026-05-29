import CodePanel from "../components/code-panel";
import LearningShell from "../components/learning-shell";
import WebGlLab from "./webgl-lab";

const webglCode = `const gl = canvas.getContext("webgl");
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

function render(time: number) {
  gl.uniform1f(timeLocation, time);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
}`;

export default function WebGlPage() {
  return (
    <LearningShell
      title="WebGL"
      subtitle="WebGL gives direct GPU rendering in the browser. This demo uses a small shader pipeline for premium visual motion with minimal JavaScript overhead."
    >
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-white">How this demo works</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          A full-screen quad is drawn in WebGL, and a fragment shader computes color for each pixel
          from time and pointer position. This is a clean pattern for reactive backgrounds, hero
          effects, and interactive art surfaces.
        </p>
      </section>

      <WebGlLab />

      <CodePanel code={webglCode} title="Core WebGL Rendering Loop" />
    </LearningShell>
  );
}
