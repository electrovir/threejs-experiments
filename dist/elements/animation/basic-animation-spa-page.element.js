import {
  assign,
  assignWithCleanup,
  defineFunctionalElement,
  ElementEvent,
  eventInit,
  html,
  listen
} from "../../../_snowpack/pkg/element-vir.js";
import {css, unsafeCSS} from "../../../_snowpack/pkg/lit.js";
import {AnimationElement} from "./animation.element.js";
export const AnimationSpaPageElement = defineFunctionalElement({
  tagName: "vir-animation-spa-page",
  styles: css`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .slot-wrapper {
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
  events: {
    fps: eventInit()
  },
  props: {
    animation: void 0,
    animationEnabled: true
  },
  renderCallback: ({props, dispatchEvent, events}) => {
    return html`<div class="slot-wrapper">
        <slot></slot>
    </div>
        <${AnimationElement}
            ${assignWithCleanup(AnimationElement.props.animation, props.animation, (oldValue) => {
      oldValue?.destroy();
    })}
            ${assign(AnimationElement.props.animationEnabled, props.animationEnabled)}
            ${listen(AnimationElement.events.fpsUpdate, (event) => {
      dispatchEvent(new ElementEvent(events.fps, event.detail));
    })}
        >
        </${AnimationElement}>
        `;
  }
});
