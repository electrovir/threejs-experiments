import {css, HTMLTemplateResult} from 'lit';
import {customElement} from 'lit/decorators.js';
import {VirElement} from '../../../render/vir-element';
import {html} from '../../../render/vir-html';

@customElement('vir-intro-example')
export class IntroExampleElement extends VirElement {
    public static readonly tagName = 'vir-intro-example';
    static styles = css`
        :host {
            padding: 0 64px;
        }
    `;
    protected render(): HTMLTemplateResult {
        return html`
            Intro Example
        `;
    }
}
