import {css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from '../render/vir-html';
import {SpaRoute} from '../router/spa-routes';
import {AppNavElement, NavRouteUpdate} from './app-nav/app-nav.element';
import {HomeElement} from './spa-pages/home/home.element';
import {IntroExampleElement} from './spa-pages/intro-example/intro-example.element';

@customElement('vir-three-js-experiments-app')
export class ThreeJsExperimentsAppElement extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    `;

    @property() spaRoute: SpaRoute | undefined;

    render() {
        const template = html`
            <nav>
                <${AppNavElement}
                    @${NavRouteUpdate.eventName}=${(event: NavRouteUpdate) => {
            this.spaRoute = event.detail[0];
            console.log(`route changed to ${this.spaRoute}`);
        }}
                ></${AppNavElement}>
            </nav>
            <main>
                ${this.spaRoute === SpaRoute.Home ? html`<${HomeElement}></${HomeElement}>` : ''}
                ${
                    this.spaRoute === SpaRoute.IntroExample
                        ? html`<${IntroExampleElement}></${IntroExampleElement}>`
                        : ''
                }
            </main>
        `;

        return template;
    }
}
