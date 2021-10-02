import {defineFunctionalElement} from 'element-vir';
import {css} from 'lit';
import {html} from 'lit/static-html.js';

export const HomeElement = defineFunctionalElement({
    tagName: 'vir-home',
    styles: css`
        :host {
            padding: 0 32px;
        }
    `,
    renderCallback: () => {
        return html`
            <h1>Welcome</h1>
            <p>
                Experiments with Three.js in a SPA. Rendering context is preserved across examples
                to prevent GPU memory leaks. Animations are entirely destroyed upon switching
                examples.
            </p>
            <a href="https://github.com/electrovir/threejs-experiments">Source code</a>
        `;
    },
});
