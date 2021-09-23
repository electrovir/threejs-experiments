import {css, html, HTMLTemplateResult, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('vir-intro-example')
export class IntroExampleElement extends LitElement {
    static styles = css``;
    protected render(): HTMLTemplateResult {
        return html`
            Intro Example
        `;
    }
}
