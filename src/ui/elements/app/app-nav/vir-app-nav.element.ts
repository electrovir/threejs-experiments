import {getEnumTypedValues} from '@augment-vir/common';
import {css, defineElementEvent, defineElementNoInputs, html} from 'element-vir';
import {isJsonEqual} from 'run-time-assertions';
import {
    ExperimentsFullRoute,
    ExperimentsPage,
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
    stateInitStatic: {
        currentRoute: defaultRoute,
    },
    events: {
        navUpdate: defineElementEvent<ExperimentsFullRoute>(),
    },
    initCallback({updateState, dispatch, state, events}) {
        threeJsExperimentsRouter.listen(true, (newRoute) => {
            if (!isJsonEqual(state.currentRoute, newRoute)) {
                updateState({currentRoute: newRoute});
                dispatch(new events.navUpdate(newRoute));
            }
        });
    },
    renderCallback: () => {
        return html`
            <ul>
                ${getEnumTypedValues(ExperimentsPage).map((page) => {
                    return html`
                        <li>
                            <${VirRouteLink.assign({
                                route: {
                                    ...defaultRoute,
                                    paths: [page],
                                },
                            })}></${VirRouteLink}>
                        </li>
                    `;
                })}
            </ul>
        `;
    },
});
