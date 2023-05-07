import {defineElement, defineElementEvent, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {Size} from '../../../interfaces/size';
import {DestroyedEvent, FpsEvent, ThreeJsAnimation} from '../../../interfaces/threejs-animation';
import {createThrottle} from '../../../interfaces/throttle';
import {VirResizeCanvas} from './vir-resize-canvas.element';

export const VirAnimation = defineElement<{
    animationEnabled: boolean;
    animation: undefined | ThreeJsAnimation;
}>()({
    tagName: 'vir-animation',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${unsafeCSS(VirResizeCanvas.tagName)} {
            flex-grow: 1;
        }
    `,
    events: {
        fpsUpdate: defineElementEvent<number>(),
        canvasDestroyed: defineElementEvent<void>(),
    },
    stateInit: {
        canvas: undefined as undefined | HTMLCanvasElement,
        canvasSize: undefined as undefined | Size,
        resizeListener: undefined as undefined | ((size: Size) => void),
    },
    initCallback() {
        console.log('init');
    },
    // cleanupCallback({inputs}) {
    //     inputs.animation?.destroy();
    // },
    renderCallback: ({state, inputs, dispatch, events, updateState}) => {
        if (inputs.animation) {
            if (!inputs.animation.isInitialized() && state.canvas) {
                inputs.animation.init(
                    state.canvas,
                    inputs.animationEnabled,
                    undefined,
                    state.canvasSize,
                );
                inputs.animation.addEventListener(FpsEvent.eventName, (event) => {
                    dispatch(new events.fpsUpdate(event.detail));
                });
                updateState({
                    resizeListener: createThrottle((size: Size) => {
                        inputs.animation?.updateSize(size);
                    }, 250),
                });
                inputs.animation.addEventListener(DestroyedEvent.eventName, () => {
                    dispatch(new events.canvasDestroyed());
                });
            }
            if (inputs.animation.isInitialized()) {
                inputs.animation.enableAnimation(inputs.animationEnabled);
            }
        }

        return html`
            <${VirResizeCanvas}
                ${listen(VirResizeCanvas.events.canvasInit, (event) => {
                    updateState({canvas: event.detail});
                })}
                ${listen(VirResizeCanvas.events.canvasResize, (event) => {
                    state.resizeListener?.(event.detail);
                    updateState({canvasSize: event.detail});
                })}
            ></${VirResizeCanvas}>
        `;
    },
});
