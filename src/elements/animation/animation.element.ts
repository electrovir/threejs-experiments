import {defineFunctionalElement, ElementEvent, eventInit, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {Animation, FpsEvent} from '../../shared-interfaces/animation';
import {Size} from '../../shared-interfaces/size';
import {createThrottle} from '../../throttle';
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
        fpsUpdate: eventInit<number>(),
    },
    props: {
        animationEnabled: true,
        animation: undefined as undefined | Animation,
        lastAnimation: undefined as undefined | Animation,
        canvas: undefined as undefined | HTMLCanvasElement,
        canvasSize: undefined as undefined | Size,
        resizeListener: undefined as undefined | ((size: Size) => void),
    },
    renderCallback: ({props, dispatchEvent, events}) => {
        if (props.animation && props.animation !== props.lastAnimation && props.canvas) {
            if (props.lastAnimation) {
                props.lastAnimation.destroy();
            }
            props.lastAnimation = props.animation;
            props.animation.init(props.canvas, props.animationEnabled, undefined, props.canvasSize);
            props.animation.addEventListener(FpsEvent.eventName, (event) => {
                dispatchEvent(new ElementEvent(events.fpsUpdate, event.detail));
            });
            props.resizeListener = createThrottle((size: Size) => {
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
    },
});
