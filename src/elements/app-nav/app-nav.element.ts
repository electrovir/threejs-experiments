import {getEnumTypedValues} from 'augment-vir';
import {
    assign,
    defineFunctionalElement,
    ElementEvent,
    eventInit,
    html,
    onDomCreated,
} from 'element-vir';
import {css} from 'lit';
import {RouteListener} from 'spa-router-vir';
import {
    ExperimentRoute,
    threeJsExperimentsRouter,
    ValidThreeJsRoutes,
} from '../../threejs-experiments-router';
import {AppRouteLinkElement} from './app-route-link.element';

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
        currentRoutes: undefined as Readonly<ValidThreeJsRoutes> | undefined,
        routeListener: undefined as undefined | RouteListener<ValidThreeJsRoutes>,
    },
    events: {
        navUpdate: eventInit<Readonly<ValidThreeJsRoutes>>(),
    },
    renderCallback: ({props, events, dispatchEvent}) => {
        return html`
            <ul
                ${onDomCreated(() => {
                    if (!props.routeListener) {
                        props.routeListener = threeJsExperimentsRouter.addRouteListener(
                            true,
                            (routes) => {
                                const rootRoute = routes[0];
                                const currentRoute = props.currentRoutes?.[0];
                                if (rootRoute !== currentRoute) {
                                    props.currentRoutes = routes;
                                    dispatchEvent(new ElementEvent(events.navUpdate, routes));
                                }
                            },
                        );
                    }
                })}
            >
                ${getEnumTypedValues(ExperimentRoute).map((route) => {
                    return html`
                    <li>
                        <${AppRouteLinkElement} ${assign(
                        AppRouteLinkElement.props.route,
                        route,
                    )}></${AppRouteLinkElement}>
                    </li>
                `;
                })}
            </ul>
        `;
    },
});
