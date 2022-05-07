import {getEnumTypedValues} from 'augment-vir';
import {assign, defineElementEvent, defineFunctionalElement, html, onDomCreated} from 'element-vir';
import {css} from 'lit';
import {RouteListener} from 'spa-router-vir';
import {
    defaultRoute,
    ExperimentsFullRoute,
    ExperimentsPage,
    threeJsExperimentsRouter,
    ValidExperimentsPath,
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
        currentRoute: undefined as ExperimentsFullRoute | undefined,
        routeListener: undefined as undefined | RouteListener<ValidExperimentsPath>,
    },
    events: {
        navUpdate: defineElementEvent<ExperimentsFullRoute>(),
    },
    renderCallback: ({props, events, dispatch, setProps}) => {
        return html`
            <ul
                ${onDomCreated(() => {
                    if (!props.routeListener) {
                        setProps({
                            routeListener: threeJsExperimentsRouter.addRouteListener(
                                true,
                                (route) => {
                                    const rootRoute = route.paths[0];
                                    const currentRoute = props.currentRoute?.paths[0];
                                    if (rootRoute !== currentRoute) {
                                        setProps({currentRoute: route});
                                        dispatch(new events.navUpdate(route));
                                    }
                                },
                            ),
                        });
                    }
                })}
            >
                ${getEnumTypedValues(ExperimentsPage).map((page) => {
                    return html`
                    <li>
                        <${AppRouteLinkElement} ${assign(AppRouteLinkElement.props.route, {
                        ...defaultRoute,
                        paths: [page],
                    })}></${AppRouteLinkElement}>
                    </li>
                `;
                })}
            </ul>
        `;
    },
});
