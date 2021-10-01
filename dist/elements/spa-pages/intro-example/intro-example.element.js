import {assign, defineFunctionalElement, html, listen} from "../../../../_snowpack/pkg/element-vir.js";
import {css, unsafeCSS} from "../../../../_snowpack/pkg/lit.js";
import {AnimationElement} from "../../animation/animation.element.js";
import {SingleColorCubeAnimation} from "./single-color-cube-animation.js";
export const IntroExampleElement = defineFunctionalElement({
  tagName: "vir-intro-example",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        :host > * {
            padding: 0 32px;
        }

        :host > ${unsafeCSS(AnimationElement.tagName)} {
            /*
                this padding is used to manually verify that the canvas size is not overflowing
            */
            padding: 8px;
            flex-grow: 1;
        }
    `,
  props: {
    animation: new SingleColorCubeAnimation(65280),
    animationEnabled: true,
    currentFps: 0
  },
  renderCallback: ({props}) => {
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
            <br>
            FPS: ${props.currentFps.toFixed(1)}
        </p>
        <${AnimationElement}
            ${assign(AnimationElement.props.animation, props.animation)}
            ${assign(AnimationElement.props.animationEnabled, props.animationEnabled)}
            ${listen(AnimationElement.events.fpsUpdate, (event) => {
      props.currentFps = event.detail;
    })}
        >
        </${AnimationElement}>
        `;
  }
});
