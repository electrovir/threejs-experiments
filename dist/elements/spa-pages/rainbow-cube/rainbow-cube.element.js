import {assign, assignWithCleanup, defineFunctionalElement, html, listen} from "../../../../_snowpack/pkg/element-vir.js";
import {css, unsafeCSS} from "../../../../_snowpack/pkg/lit.js";
import {AnimationElement} from "../../animation/animation.element.js";
import {RainbowCubeAnimation} from "./rainbow-cube-animation.js";
export const RainbowCubeElement = defineFunctionalElement({
  tagName: "vir-rainbow-cube",
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
      props.animation = new RainbowCubeAnimation();
    }
    return html`
        <h1>Rainbow Cube</h1>
        <p>
            Variation on the intro example. Using <a href="https://threejs.org/docs/?q=light#api/en/lights/AmbientLight">AmbientLight</a>, <a href="https://threejs.org/docs/?q=light#api/en/lights/PointLight">PointLight</a>, and <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial">MeshPhysicalMaterial</a> with <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial.clearcoat">clear coat</a>.
            <br>
            <button @click=${() => props.animationEnabled = !props.animationEnabled}>${props.animationEnabled ? "pause" : "play"}</button>
            <br>
            FPS: ${props.currentFps.toFixed(1)}
        </p>
        <${AnimationElement}
            ${assignWithCleanup(AnimationElement.props.animation, props.animation, (oldValue) => {
      oldValue?.destroy();
    })}
            ${assign(AnimationElement.props.animationEnabled, props.animationEnabled)}
            ${listen(AnimationElement.events.fpsUpdate, (event) => {
      props.currentFps = event.detail;
    })}
        >
        </${AnimationElement}>
        `;
  }
});
