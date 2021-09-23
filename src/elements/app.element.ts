import {css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from '../render/vir-html';
import {SpaRoute} from '../router/spa-routes';
import './app-nav/app-nav.element';
import {NavRouteUpdate} from './app-nav/app-nav.element';
import './spa-pages/intro-example/intro-example.element';

@customElement('vir-three-js-experiments-app')
export class ThreeJsExperimentsAppElement extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    `;

    @property() spaRoute: SpaRoute = SpaRoute.Home;

    render() {
        const template = html`
            <vir-app-nav
                @${NavRouteUpdate.eventName}=${(event: NavRouteUpdate) => {
                    this.spaRoute = event.detail[0];
                    console.log(`route changed to ${this.spaRoute}`);
                }}
            ></vir-app-nav>
            <main></main>
        `;

        console.dir(template);

        return template;
    }
}
