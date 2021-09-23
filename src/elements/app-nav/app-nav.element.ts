import {css, HTMLTemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {getEnumTypedValues, isEnumValue} from 'virmator/dist/augments/object';
import {VirElement} from '../../render/vir-element';
import {html} from '../../render/vir-html';
import {addRouteListener} from '../../router/route-listener';
import {SpaRoute} from '../../router/spa-routes';
import './app-route-link.element';
import {AppRouteLinkElement} from './app-route-link.element';

export type ValidNavRoutes = [SpaRoute];

export class NavRouteUpdate extends CustomEvent<[SpaRoute]> {
    public static eventName = 'nav-route-update';
    constructor(detail: Readonly<ValidNavRoutes>) {
        super(NavRouteUpdate.eventName, {detail: [...detail], bubbles: true, composed: true});
    }
}

@customElement('vir-app-nav')
export class AppNavElement extends VirElement {
    public static readonly tagName = 'vir-app-nav';
    public static styles = css`
        :host {
            display: block;
        }
        ul {
            padding: 16px;
            margin: 0;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        ul li {
            padding: 1px 16px;
            margin: 4px 0;
            border: 1px solid grey;
            border-width: 0 1px;
        }
    `;
    @property() private spaRoute: SpaRoute | undefined;

    public connectedCallback() {
        super.connectedCallback();
        addRouteListener<ValidNavRoutes>(true, sanitizeSpaRoutes, (routes) => {
            const rootRoute = routes[0];
            if (rootRoute !== this.spaRoute) {
                this.spaRoute = rootRoute;
                const event = new NavRouteUpdate(routes);
                this.dispatchEvent(event);
            }
        });
    }

    private renderNavElements(): HTMLTemplateResult {
        return html`
            ${getEnumTypedValues(SpaRoute).map((spaRoute) => {
                return html`
                    <li>
                        <${AppRouteLinkElement} .routes=${[spaRoute]}></${AppRouteLinkElement}>
                    </li>
                `;
            })}
        `;
    }

    render() {
        return html`
            <ul>
                ${this.renderNavElements()}
            </ul>
        `;
    }
}

const defaultRoute: ValidNavRoutes = [SpaRoute.Home];

function sanitizeSpaRoutes(routes: Readonly<string[]>): Readonly<ValidNavRoutes> {
    if (routes.length !== 1) {
        return defaultRoute;
    }
    const firstRoute = routes[0];

    if (isEnumValue(firstRoute, SpaRoute)) {
        return [firstRoute];
    } else {
        return defaultRoute;
    }
}
