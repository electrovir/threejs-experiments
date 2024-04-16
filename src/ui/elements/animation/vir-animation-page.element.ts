import {css, defineElement, defineElementEvent, html, listen, unsafeCSS} from 'element-vir';
import {ThreeJsAnimation} from '../../../services/threejs-animation';
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
    stateInitStatic: {
        lastAnimation: undefined as undefined | ThreeJsAnimation,
    },
    cleanupCallback({inputs}) {
        inputs.animation?.destroy();
    },
    renderCallback: ({inputs, state, updateState, dispatch, events}) => {
        if (state.lastAnimation !== inputs.animation) {
            state.lastAnimation?.destroy();
            updateState({lastAnimation: inputs.animation});
        }

        return html`
            <div class="slot-wrapper">
                <slot></slot>
            </div>
            <${VirAnimation.assign({
                animation: inputs.animation,
                animationEnabled: inputs.animationEnabled,
            })}
                ${listen(VirAnimation.events.fpsUpdate, (event) => {
                    dispatch(new events.fps(event.detail));
                })}
            ></${VirAnimation}>
        `;
    },
});
