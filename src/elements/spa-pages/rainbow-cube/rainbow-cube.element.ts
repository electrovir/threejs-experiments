import {assign, defineFunctionalElement, html, listen} from 'element-vir';
import {css} from 'lit';
import {ThreeJsAnimation} from '../../../interfaces/threejs-animation';
import {AnimationSpaPageElement} from '../../animation/basic-animation-spa-page.element';
import {RainbowCubeAnimation} from './rainbow-cube.animation';

export const RainbowCubeElement = defineFunctionalElement({
    tagName: 'vir-rainbow-cube',
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
        animation: undefined as undefined | ThreeJsAnimation,
        animationEnabled: true,
        currentFps: 0,
    },
    renderCallback: ({props}) => {
        if (!props.animation) {
            props.animation = new RainbowCubeAnimation();
        }
        return html`
        <${AnimationSpaPageElement}
            ${assign(AnimationSpaPageElement.props.animationEnabled, props.animationEnabled)}
            ${assign(AnimationSpaPageElement.props.animation, props.animation)}
            ${listen(
                AnimationSpaPageElement.events.fps,
                (event) => (props.currentFps = event.detail),
            )}
        >
            <h1>Rainbow Cube</h1>
            <p>
                Variation on the intro example. Using <a href="https://threejs.org/docs/?q=light#api/en/lights/AmbientLight">AmbientLight</a>, <a href="https://threejs.org/docs/?q=light#api/en/lights/PointLight">PointLight</a>, and <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial">MeshPhysicalMaterial</a> with <a href="https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial.clearcoat">clear coat</a>.
                <br>
                <button @click=${() => (props.animationEnabled = !props.animationEnabled)}>${
            props.animationEnabled ? 'pause' : 'play'
        }</button>
                <br>
                FPS: ${props.currentFps.toFixed(1)}
            </p>
        </${AnimationSpaPageElement}>
        `;
    },
});
