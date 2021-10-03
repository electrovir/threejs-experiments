import {defineFunctionalElement} from "../../../../_snowpack/pkg/element-vir.js";
import {css} from "../../../../_snowpack/pkg/lit.js";
import {html} from "../../../../_snowpack/pkg/lit/static-html.js";
export const HomeElement = defineFunctionalElement({
  tagName: "vir-home",
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
                Uses my own custom web component library
                <!-- prettier-ignore -->
                <a href="https://www.npmjs.com/package/element-vir">element-vir.</a>
            </p>
            <a href="https://github.com/electrovir/threejs-experiments">Source code</a>
        `;
  }
});
