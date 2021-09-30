import {defineFunctionalElement} from "../../../../_snowpack/pkg/element-vir.js";
import {css} from "../../../../_snowpack/pkg/lit.js";
import {html} from "../../../../_snowpack/pkg/lit/static-html.js";
import {createThrottle} from "../../../throttle.js";
import {CubeAnimation, elementToSize} from "./cube-animation.js";
export const IntroExampleElement = defineFunctionalElement({
  tagName: "vir-intro-example",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        :host > *:not(.canvas-wrapper) {
            padding: 0 32px;
        }

        .canvas-wrapper {
            position: relative;
            display: flex;
            align-items: stretch;
            flex-grow: 1;
        }
    `,
  props: {
    animationEnabled: true,
    animation: void 0,
    resizeListener: void 0
  },
  firstUpdated: ({element, props}) => {
    const canvas = element.renderRoot.querySelector("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`Could not find canvas element in connected callback.`);
    }
    const canvasWrapper = element.renderRoot.querySelector(".canvas-wrapper");
    if (!canvasWrapper) {
      throw new Error(`Could not find canvas wrapper element in connected callback.`);
    }
    props.animation = new CubeAnimation(canvas);
    props.resizeListener = createThrottle(() => {
      if (props.animation) {
        props.animation.updateSize(elementToSize(canvasWrapper));
      }
    }, 50);
    window.addEventListener("resize", props.resizeListener);
  },
  renderCallback: ({props}) => {
    if (props.animation) {
      props.animation.animationEnabled = props.animationEnabled;
    }
    return html`
            <h1>Intro Example</h1>
            <p>
                From the
                <!-- ignore so there aren't spaces inside of the link -->
                <!-- prettier-ignore -->
                <a
            href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene"
            >Creating a Scene</a>

                (
                <!-- prettier-ignore -->
                <a
                href="https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html"
                >source code</a>
                ) introduction with window
                <!-- prettier-ignore -->
                <a href="https://jsfiddle.net/Q4Jpu/">resize support.</a>
            </p>
            <div class="canvas-wrapper">
                <canvas></canvas>
            </div>
        `;
  }
});
