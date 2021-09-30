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
        `;
    },
});
