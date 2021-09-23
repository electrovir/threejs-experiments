import {css, html, HTMLTemplateResult, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {getEnumTypedValues, isEnumValue} from 'virmator/dist/augments/object';
import {addRouteListener} from '../../router/route-listener';
import {SpaRoute} from '../../router/spa-routes';
import './app-route-link.element';

export type ValidNavRoutes = [SpaRoute];

export class NavRouteUpdate extends CustomEvent<[SpaRoute]> {
    public static eventName = 'navrouteupdate';
    constructor(detail: Readonly<ValidNavRoutes>) {
        super(NavRouteUpdate.eventName, {detail: [...detail], bubbles: true, composed: true});
    }
}

@customElement('vir-app-nav')
export class AppNavElement extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        nav ul {
            padding: 16px;
            margin: 0;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        nav ul li {
            padding: 1px 16px;
            margin: 4px 0;
            border: 1px solid grey;
            border-width: 0 1px;
        }
    `;
    @property() private spaRoute: SpaRoute | undefined;

    constructor() {
        super();
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
                        <vir-app-route-link .routes=${[spaRoute]}></vir-app-route-link>
                    </li>
                `;
            })}
        `;
    }

    render() {
        return html`
            <nav>
                <ul>
                    ${this.renderNavElements()}
                </ul>
            </nav>
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
