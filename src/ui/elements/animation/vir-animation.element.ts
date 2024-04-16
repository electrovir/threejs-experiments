import {Dimensions} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html, listen, unsafeCSS} from 'element-vir';
import {FpsEvent, ThreeJsAnimation} from '../../../services/threejs-animation';
import {createThrottle} from '../../../services/throttle';
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
    },
    stateInitStatic: {
        canvas: undefined as undefined | HTMLCanvasElement,
        canvasSize: undefined as undefined | Dimensions,
        resizeListener: undefined as undefined | ((size: Dimensions) => void),
    },
    renderCallback: ({state, inputs, dispatch, events, updateState}) => {
        if (inputs.animation) {
            if (!inputs.animation.isInitialized() && state.canvas) {
                inputs.animation.init(
                    state.canvas,
                    inputs.animationEnabled,
                    undefined,
                    state.canvasSize,
                );
                inputs.animation.listen(FpsEvent, (event) => {
                    dispatch(new events.fpsUpdate(event.detail));
                });
                updateState({
                    resizeListener: createThrottle((size: Dimensions) => {
                        inputs.animation?.updateSize(size);
                    }, 250),
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
                    if (inputs.animation?.isDestroyed) {
                        return;
                    }

                    state.resizeListener?.(event.detail);
                    updateState({canvasSize: event.detail});
                })}
            ></${VirResizeCanvas}>
        `;
    },
});
