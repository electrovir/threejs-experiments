import {defineFunctionalElement, ElementEvent, eventInit, html, listen} from "../../../_snowpack/pkg/element-vir.js";
import {css, unsafeCSS} from "../../../_snowpack/pkg/lit.js";
import {FpsEvent} from "../../shared-interfaces/animation.js";
import {createThrottle} from "../../throttle.js";
import {ResizeCanvasElement} from "./resize-canvas.element.js";
export const AnimationElement = defineFunctionalElement({
  tagName: "vir-animation",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${unsafeCSS(ResizeCanvasElement.tagName)} {
            flex-grow: 1;
        }
    `,
  events: {
    fpsUpdate: eventInit()
  },
  props: {
    animationEnabled: true,
    animation: void 0,
    lastAnimation: void 0,
    canvas: void 0,
    canvasSize: void 0,
    resizeListener: void 0
  },
  renderCallback: ({props, dispatchEvent, events}) => {
    if (props.animation && props.animation !== props.lastAnimation && props.canvas) {
      if (props.lastAnimation) {
        props.lastAnimation.destroy();
      }
      props.lastAnimation = props.animation;
      props.animation.init(props.canvas, props.animationEnabled, void 0, props.canvasSize);
      props.animation.addEventListener(FpsEvent.eventName, (event) => {
        dispatchEvent(new ElementEvent(events.fpsUpdate, event.detail));
      });
      props.resizeListener = createThrottle((size) => {
        props.animation?.updateSize(size);
      }, 250);
    }
    return html`
            <${ResizeCanvasElement}
                    ${listen(ResizeCanvasElement.events.canvasInit, (event) => {
      props.canvas = event.detail;
    })}
                    ${listen(ResizeCanvasElement.events.canvasResize, (event) => {
      props.resizeListener?.(event.detail);
      props.canvasSize = event.detail;
    })}
            ></${ResizeCanvasElement}>
        `;
  }
});
