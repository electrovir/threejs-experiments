import {check} from '@augment-vir/assert';
import {getEnumValues} from '@augment-vir/common';
import {css, defineElement, defineElementEvent, html} from 'element-vir';
import {
    defaultRoute,
    ExperimentsPage,
    threeJsExperimentsRouter,
    type ExperimentsFullRoute,
} from '../../../../threejs-experiments-router.js';
import {VirRouteLink} from './vir-route-link.element.js';

export const VirAppNav = defineElement()({
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

            & li {
                padding: 1px 16px;
                margin: 4px 0;
                border: 1px solid grey;
                border-width: 0 1px;
            }
        }
    `,
    state() {
        return {
            currentRoute: defaultRoute,
            removeRouteListener: undefined as undefined | (() => void),
        };
    },
    events: {
        navUpdate: defineElementEvent<ExperimentsFullRoute>(),
    },
    init({updateState, dispatch, state, events}) {
        const removeRouteListener = threeJsExperimentsRouter.listen(true, (newRoute) => {
            if (!check.jsonEquals(state.currentRoute, newRoute)) {
                updateState({
                    currentRoute: newRoute,
                });
                dispatch(
                    new events.navUpdate({
                        detail: newRoute,
                    }),
                );
            }
        });
        updateState({
            removeRouteListener,
        });
    },
    cleanup({state}) {
        state.removeRouteListener?.();
    },
    render() {
        return html`
            <ul>
                ${getEnumValues(ExperimentsPage).map((page) => {
                    return html`
                        <li>
                            <${VirRouteLink.assign({
                                route: {
                                    ...defaultRoute,
                                    paths: [
                                        page,
                                    ],
                                },
                            })}></${VirRouteLink}>
                        </li>
                    `;
                })}
            </ul>
        `;
    },
});
