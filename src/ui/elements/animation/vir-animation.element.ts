import {Debounce, DebounceStyle, type Dimensions} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html, listen, unsafeCSS} from 'element-vir';
import {FpsEvent, type ThreeJsAnimation} from '../../../services/threejs-animation.js';
import {VirResizeCanvas} from './vir-resize-canvas.element.js';

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
    state() {
        return {
            canvas: undefined as undefined | HTMLCanvasElement,
            canvasSize: undefined as undefined | Dimensions,
            resizeDebounce: new Debounce(DebounceStyle.FirstThenLatest, {
                milliseconds: 250,
            }),
        };
    },
    render({state, inputs, dispatch, events, updateState}) {
        if (inputs.animation) {
            if (!inputs.animation.isInitialized() && state.canvas) {
                inputs.animation.init({
                    startAnimating: inputs.animationEnabled,
                    size: state.canvasSize,
                });
                inputs.animation.listen(FpsEvent, (event) => {
                    dispatch(
                        new events.fpsUpdate({
                            detail: event.detail,
                        }),
                    );
                });
            }
            if (inputs.animation.isInitialized()) {
                inputs.animation.enableAnimation(inputs.animationEnabled);
            }
        }

        return html`
            <${VirResizeCanvas}
                ${listen(VirResizeCanvas.events.canvasInit, (event) => {
                    updateState({
                        canvas: event.detail,
                    });
                })}
                ${listen(VirResizeCanvas.events.canvasResize, (event) => {
                    if (inputs.animation?.isDestroyed) {
                        return;
                    }

                    if (inputs.animation?.isInitialized()) {
                        state.resizeDebounce.execute(() => {
                            inputs.animation?.updateSize(event.detail);
                        });
                    }
                    updateState({
                        canvasSize: event.detail,
                    });
                })}
            ></${VirResizeCanvas}>
        `;
    },
});
