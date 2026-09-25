import {type Dimensions} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html, onDomCreated, onResize} from 'element-vir';

export const VirResizeCanvas = defineElement()({
    tagName: 'vir-resize-canvas',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            align-items: stretch;
            box-sizing: border-box;
            overflow: hidden;
        }

        .canvas-wrapper {
            position: relative;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;

            & canvas {
                /*
                    Don't let the canvas take up space. That way canvas-wrapper isn't stretched to
                    fit the canvas when it's really big (when animating, threeJS manually resizes
                    the canvas to set pixel values).
                */
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                background-color: black;
            }
        }
    `,
    events: {
        canvasInit: defineElementEvent<HTMLCanvasElement>(),
        canvasResize: defineElementEvent<Dimensions>(),
    },
    render({dispatch, events}) {
        return html`
            <div
                ${onResize((updateEntry) => {
                    dispatch(
                        new events.canvasResize({
                            detail: {
                                width: updateEntry.contentRect.width,
                                height: updateEntry.contentRect.height,
                            },
                        }),
                    );
                })}
                class="canvas-wrapper"
            >
                <canvas
                    ${onDomCreated((element) => {
                        if (element instanceof HTMLCanvasElement) {
                            dispatch(
                                new events.canvasInit({
                                    detail: element,
                                }),
                            );
                        } else {
                            throw new TypeError(
                                'Canvas DOM was created but is not a canvas element.',
                            );
                        }
                    })}
                ></canvas>
            </div>
        `;
    },
});
