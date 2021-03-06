import {defineElementEvent, defineFunctionalElement, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {Size} from '../../interfaces/size';
import {DestroyedEvent, FpsEvent, ThreeJsAnimation} from '../../interfaces/threejs-animation';
import {createThrottle} from '../../interfaces/throttle';
import {ResizeCanvasElement} from './resize-canvas.element';

export const AnimationElement = defineFunctionalElement({
    tagName: 'vir-animation',
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
        fpsUpdate: defineElementEvent<number>(),
    },
    props: {
        animationEnabled: true,
        animation: undefined as undefined | ThreeJsAnimation,
        canvas: undefined as undefined | HTMLCanvasElement,
        canvasSize: undefined as undefined | Size,
        resizeListener: undefined as undefined | ((size: Size) => void),
    },
    renderCallback: ({props, dispatch, events, setProps}) => {
        if (props.animation) {
            if (!props.animation.isInitialized() && props.canvas) {
                props.animation.init(
                    props.canvas,
                    props.animationEnabled,
                    undefined,
                    props.canvasSize,
                );
                props.animation.addEventListener(FpsEvent.eventName, (event) => {
                    dispatch(new events.fpsUpdate(event.detail));
                });
                setProps({
                    resizeListener: createThrottle((size: Size) => {
                        props.animation?.updateSize(size);
                    }, 250),
                });
                props.animation.addEventListener(DestroyedEvent.eventName, () =>
                    setProps({animation: undefined}),
                );
            }
            if (props.animation.isInitialized()) {
                props.animation.enableAnimation(props.animationEnabled);
            }
        }

        return html`
            <${ResizeCanvasElement}
                    ${listen(ResizeCanvasElement.events.canvasInit, (event) => {
                        setProps({canvas: event.detail});
                    })}
                    ${listen(ResizeCanvasElement.events.canvasResize, (event) => {
                        props.resizeListener?.(event.detail);
                        setProps({canvasSize: event.detail});
                    })}
            ></${ResizeCanvasElement}>
        `;
    },
});
