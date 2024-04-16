import {css, defineElementNoInputs, html, listen, perInstance} from 'element-vir';
import {AnimationPage} from '../../animation/vir-animation-page.element';
import {SingleColorCubeAnimation} from './single-color-cube.animation';

// https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html
// https://jsfiddle.net/Q4Jpu/

export const VirSingleColorCube = defineElementNoInputs({
    tagName: 'vir-single-color-cube',
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
    stateInitStatic: {
        animation: perInstance(() => new SingleColorCubeAnimation(0x00ff00)),
        animationEnabled: true,
        currentFps: 0,
    },
    renderCallback({state, updateState}) {
        return html`
            <${AnimationPage.assign({
                animationEnabled: state.animationEnabled,
                animation: state.animation,
            })}
                ${listen(AnimationPage.events.fps, (event) => {
                    updateState({currentFps: event.detail});
                })}
            >
                <h1>Single Color Cube</h1>
                <p>
                    From threejs
                    <a
                        href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene"
                    >
                        Creating a Scene
                    </a>
                    (
                    <a
                        href="https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html"
                    >
                        source code
                    </a>
                    ) introduction with window
                    <a href="https://jsfiddle.net/Q4Jpu/">resize support.</a>
                    <br />
                    <button
                        @click=${() => {
                            updateState({animation: new SingleColorCubeAnimation(0x00ff00)});
                        }}
                    >
                        reset
                    </button>
                    <br />
                    FPS: ${state.currentFps.toFixed(1)}
                </p>
            </${AnimationPage}>
        `;
    },
});
