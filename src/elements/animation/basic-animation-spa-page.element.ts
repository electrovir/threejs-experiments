import {
    assign,
    assignWithCleanup,
    defineElementEvent,
    defineFunctionalElement,
    html,
    listen,
} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {ThreeJsAnimation} from '../../interfaces/threejs-animation';
import {AnimationElement} from './animation.element';

export const AnimationSpaPageElement = defineFunctionalElement({
    tagName: 'vir-animation-spa-page',
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
        fps: defineElementEvent<number>(),
    },
    props: {
        animation: undefined as undefined | ThreeJsAnimation,
        animationEnabled: true,
    },
    renderCallback: ({props, dispatch, events}) => {
        return html`<div class="slot-wrapper">
        <slot></slot>
    </div>
        <${AnimationElement}
            ${assignWithCleanup(AnimationElement.props.animation, props.animation, (oldValue) => {
                oldValue?.destroy();
            })}
            ${assign(AnimationElement.props.animationEnabled, props.animationEnabled)}
            ${listen(AnimationElement.events.fpsUpdate, (event) => {
                dispatch(new events.fps(event.detail));
            })}
        >
        </${AnimationElement}>
        `;
    },
});
