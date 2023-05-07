import {assign, css, defineElement, defineElementEvent, html, listen, unsafeCSS} from 'element-vir';
import {ThreeJsAnimation} from '../../../interfaces/threejs-animation';
import {VirAnimation} from './vir-animation.element';

export const AnimationPage = defineElement<{
    animation: undefined | ThreeJsAnimation;
    animationEnabled: boolean;
}>()({
    tagName: 'vir-animation-page',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .slot-wrapper {
            padding: 0 32px;
        }

        :host > ${unsafeCSS(VirAnimation.tagName)} {
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
    initCallback({host}) {
        console.log('init vir-animation-page');
    },
    renderCallback: ({inputs, dispatch, events}) => {
        return html`
            <div class="slot-wrapper">
                <slot></slot>
            </div>
            <${VirAnimation}
                ${assign(VirAnimation, {
                    animation: inputs.animation,
                    animationEnabled: inputs.animationEnabled,
                })}
                ${listen(VirAnimation.events.fpsUpdate, (event) => {
                    dispatch(new events.fps(event.detail));
                })}
                ${listen(VirAnimation.events.canvasDestroyed, (event) => {
                    // inputs.animation?.destroy();
                })}
            ></${VirAnimation}>
        `;
    },
});
