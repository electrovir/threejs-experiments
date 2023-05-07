import {getEnumTypedValues} from '@augment-vir/common';
import {assign, css, defineElementEvent, defineElementNoInputs, html} from 'element-vir';
import {RouteListener} from 'spa-router-vir';
import {
    ExperimentsFullRoute,
    ExperimentsPage,
    ValidExperimentsPath,
    defaultRoute,
    threeJsExperimentsRouter,
} from '../../../../threejs-experiments-router';
import {VirRouteLink} from './vir-route-link.element';

export const VirAppNav = defineElementNoInputs({
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
    stateInit: {
        currentRoute: undefined as ExperimentsFullRoute | undefined,
        routeListener: undefined as undefined | RouteListener<ValidExperimentsPath>,
    },
    events: {
        navUpdate: defineElementEvent<ExperimentsFullRoute>(),
    },
    initCallback({updateState, dispatch, state, events}) {
        threeJsExperimentsRouter.addRouteListener(true, (route) => {
            const rootRoute = route.paths[0];
            const currentRoute = state.currentRoute?.paths[0];
            if (rootRoute !== currentRoute) {
                updateState({currentRoute: route});
                dispatch(new events.navUpdate(route));
            }
        });
    },
    renderCallback: () => {
        return html`
            <ul>
                ${getEnumTypedValues(ExperimentsPage).map((page) => {
                    return html`
                        <li>
                            <${VirRouteLink}
                                ${assign(VirRouteLink, {
                                    route: {
                                        ...defaultRoute,
                                        paths: [page],
                                    },
                                })}
                            ></${VirRouteLink}>
                        </li>
                    `;
                })}
            </ul>
        `;
    },
});
