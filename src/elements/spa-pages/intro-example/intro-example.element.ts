import {defineFunctionalElement, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {Size} from '../../../shared-interfaces/size';
import {createThrottle} from '../../../throttle';
import {ResizeCanvasElement} from '../../resize-canvas.element';
import {CubeAnimation} from './cube-animation';

// https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html
// https://jsfiddle.net/Q4Jpu/

export const IntroExampleElement = defineFunctionalElement({
    tagName: 'vir-intro-example',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        :host > *:not(${unsafeCSS(ResizeCanvasElement.tagName)}) {
            padding: 0 32px;
        }

        ${unsafeCSS(ResizeCanvasElement.tagName)} {
            /*
                this padding is used to manually verify that the canvas size is not overflowing
            */
            padding: 8px;
            flex-grow: 1;
        }
    `,
    props: {
        animationEnabled: true,
        animation: undefined as undefined | CubeAnimation,
        resizeListener: undefined as undefined | ((size: Size) => void),
        thing: 5,
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
            </p>
            <${ResizeCanvasElement}
                    ${listen(ResizeCanvasElement.events.canvasInit, (event) => {
                        props.animation = new CubeAnimation(
                            event.detail,
                            props.animationEnabled,
                            undefined,
                        );
                        props.resizeListener = createThrottle((size: Size) => {
                            if (props.animation) {
                                props.animation.updateSize(size);
                            }
                        });
                    })}
                    ${listen(ResizeCanvasElement.events.canvasResize, (event) => {
                        props.resizeListener?.(event.detail);
                    })}
            ></${ResizeCanvasElement}>
        `;
    },
});
