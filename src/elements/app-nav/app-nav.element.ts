import {assign, defineFunctionalElement, ElementEvent, eventInit, html} from 'element-vir';
import {css} from 'lit';
import {getEnumTypedValues, isEnumValue} from 'virmator/dist/augments/object';
import {addRouteListener, removeRouteListener} from '../../router/route-listener';
import {SpaRoute} from '../../router/spa-routes';
import {AppRouteLinkElement} from './app-route-link.element';

export class NavRouteUpdate extends CustomEvent<[SpaRoute]> {
    public static eventName = 'nav-route-update';
    constructor(detail: Readonly<ValidNavRoutes>) {
        super(NavRouteUpdate.eventName, {detail: [...detail], bubbles: true, composed: true});
    }
}

export type ValidNavRoutes = Readonly<[SpaRoute]>;

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

export const AppNavElement = defineFunctionalElement({
    tagName: 'vir-app-nav',
    styles: css`
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
    `,
    props: {
        spaRoute: undefined as SpaRoute | undefined,
        routeListener: undefined as undefined | (() => void),
    },
    events: {
        navUpdate: eventInit<ValidNavRoutes>(),
    },
    connectedCallback: ({props, dispatchEvent, events}) => {
        props.routeListener = addRouteListener<ValidNavRoutes>(
            true,
            sanitizeSpaRoutes,
            (routes) => {
                const rootRoute = routes[0];
                if (rootRoute !== props.spaRoute) {
                    props.spaRoute = rootRoute;
                    dispatchEvent(new ElementEvent(events.navUpdate, routes));
                }
            },
        );
    },
    disconnectedCallback: ({props}) => {
        if (props.routeListener) {
            removeRouteListener(props.routeListener);
        }
    },
    renderCallback: () => {
        return html`
            <ul>
                ${getEnumTypedValues(SpaRoute).map((spaRoute) => {
                    return html`
                    <li>
                        <${AppRouteLinkElement} ${assign(AppRouteLinkElement.props.routes, [
                        spaRoute,
                    ])}></${AppRouteLinkElement}>
                    </li>
                `;
                })}
            </ul>
        `;
    },
});
