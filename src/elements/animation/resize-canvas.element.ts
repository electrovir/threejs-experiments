import {
    defineElementEvent,
    defineFunctionalElement,
    html,
    onDomCreated,
    onResize,
} from 'element-vir';
import {css} from 'lit';
import {Size} from '../../interfaces/size';

// store the canvas in a single place so we don't create multiple contexts
let GlobalCanvas: undefined | HTMLCanvasElement = undefined;

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
            background-color: black;
        }
    `,
    events: {
        canvasInit: defineElementEvent<HTMLCanvasElement>(),
        canvasResize: defineElementEvent<Size>(),
    },
    renderCallback: ({dispatch, events}) => {
        if (GlobalCanvas) {
            dispatch(new events.canvasInit(GlobalCanvas));
        }
        return html`
            <div
                ${onResize((updateEntry) => {
                    dispatch(
                        new events.canvasResize({
                            w: updateEntry.contentRect.width,
                            h: updateEntry.contentRect.height,
                        }),
                    );
                })}
                class="canvas-wrapper"
            >
                ${GlobalCanvas
                    ? GlobalCanvas
                    : html`
                          <canvas
                              ${onDomCreated((element) => {
                                  if (element instanceof HTMLCanvasElement) {
                                      GlobalCanvas = element;
                                      dispatch(new events.canvasInit(element));
                                  } else {
                                      throw new Error(
                                          `Canvas DOM was created but didn't send back a canvas element.`,
                                      );
                                  }
                              })}
                          ></canvas>
                      `}
            </div>
        `;
    },
});
