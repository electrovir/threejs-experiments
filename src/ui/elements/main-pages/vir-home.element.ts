import {css, defineElementNoInputs} from 'element-vir';
import {html} from 'lit/static-html.js';

export const VirHome = defineElementNoInputs({
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
                <br />
                Uses my own simple web component library
                <!-- prettier-ignore -->
                <a href="https://www.npmjs.com/package/element-vir">element-vir</a>
                and my own simple router for single page applications
                <!-- prettier-ignore -->
                <a href="https://www.npmjs.com/package/spa-router-vir">spa-router-vir.</a>
            </p>
            <a href="https://github.com/electrovir/threejs-experiments">Source code</a>
        `;
    },
});
