import {
    defineFunctionalElement,
    ElementEvent,
    eventInit,
    onDomCreated,
    onResize,
} from 'element-vir';
import {css} from 'lit';
import {html} from 'lit/static-html.js';
import {Size} from '../shared-interfaces/size';

export const ResizeCanvasElement = defineFunctionalElement({
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
        }
        canvas {
            /*
                Don't let the canvas take up space. That way canvas-wrapper isn't stretched to fit
                the canvas when it's really big (when animating, threeJS manually resizes the canvas
                to set pixel values).
            */
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
        }
    `,
    events: {
        canvasInit: eventInit<HTMLCanvasElement>(),
        canvasResize: eventInit<Size>(),
    },
    renderCallback: ({dispatchEvent, events}) => {
        return html`
            <div
                ${onResize((updateEntry) => {
                    dispatchEvent(
                        new ElementEvent(events.canvasResize, {
                            w: updateEntry.contentRect.width,
                            h: updateEntry.contentRect.height,
                        }),
                    );
                })}
                class="canvas-wrapper"
            >
                <canvas
                    ${onDomCreated((element) => {
                        if (element instanceof HTMLCanvasElement) {
                            dispatchEvent(new ElementEvent(events.canvasInit, element));
                        } else {
                            throw new Error(
                                `Canvas DOM was created but didn't send back a canvas element.`,
                            );
                        }
                    })}
                ></canvas>
            </div>
        `;
    },
});