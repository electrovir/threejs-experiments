import {css, HTMLTemplateResult, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {html} from '../../../render/vir-html';

@customElement('vir-intro-example')
export class IntroExampleElement extends LitElement {
    static styles = css``;
    protected render(): HTMLTemplateResult {
        return html`
            Intro Example
        `;
    }
}
