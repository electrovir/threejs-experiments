import {css, HTMLTemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VirElement} from '../../../render/vir-element';
import {html} from '../../../render/vir-html';

@customElement('vir-home')
export class HomeElement extends VirElement {
    public static readonly tagName = 'vir-home';
    static styles = css`
        :host {
            padding: 0 32px;
        }
    `;
    protected render(): HTMLTemplateResult {
        return html`
            <h1>Welcome</h1>
        `;
    }
}
