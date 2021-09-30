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
        `;
  }
});
