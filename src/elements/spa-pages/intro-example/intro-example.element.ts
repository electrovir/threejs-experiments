import {assign, defineFunctionalElement, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {AnimationElement} from '../../animation/animation.element';
import {SingleColorCubeAnimation} from './single-color-cube-animation';

// https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html
// https://jsfiddle.net/Q4Jpu/

export const IntroExampleElement = defineFunctionalElement({
    tagName: 'vir-intro-example',
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
        animation: new SingleColorCubeAnimation(0x00ff00),
        animationEnabled: true,
        currentFps: 0,
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
    },
});
