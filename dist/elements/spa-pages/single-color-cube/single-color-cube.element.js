import {assign, defineFunctionalElement, html, listen} from "../../../../_snowpack/pkg/element-vir.js";
import {css} from "../../../../_snowpack/pkg/lit.js";
import {AnimationSpaPageElement} from "../../animation/basic-animation-spa-page.element.js";
import {SingleColorCubeAnimation} from "./single-color-cube.animation.js";
export const SingleColorCubeElement = defineFunctionalElement({
  tagName: "vir-single-color-cube",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        button {
            width: 100px;
            padding: 6px;
        }
    `,
  props: {
    animation: void 0,
    animationEnabled: true,
    currentFps: 0
  },
  renderCallback: ({props}) => {
    if (!props.animation) {
      props.animation = new SingleColorCubeAnimation(65280);
    }
    return html`
        <${AnimationSpaPageElement}
            ${assign(AnimationSpaPageElement.props.animationEnabled, props.animationEnabled)}
            ${assign(AnimationSpaPageElement.props.animation, props.animation)}
            ${listen(AnimationSpaPageElement.events.fps, (event) => props.currentFps = event.detail)}
        >
            <h1>Single Color Cube</h1>
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
                <button @click=${() => {
      props.animation = new SingleColorCubeAnimation(65280);
    }}>reset</button>
                <br>
                FPS: ${props.currentFps.toFixed(1)}
            </p>
        </${AnimationSpaPageElement}>
        `;
  }
});