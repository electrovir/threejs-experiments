import {css, defineElement, html, listen} from 'element-vir';
import {type ExperimentsFullRoute} from '../../../threejs-experiments-router.js';
import {VirHome} from '../main-pages/vir-home.element.js';
import {VirAppNav} from './app-nav/vir-app-nav.element.js';
import {navElement} from './nav-elements.js';

export const VirThreeJsExperimentsApp = defineElement()({
    tagName: 'vir-three-js-experiments-app',
    state() {
        return {
            fullRoute: undefined as ExperimentsFullRoute | undefined,
        };
    },
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }

        main {
            flex-grow: 1;
            overflow: hidden;
            display: flex;
            align-items: stretch;

            & > * {
                flex-grow: 1;
            }
        }
    `,
    render({state, updateState}) {
        const currentPage = state.fullRoute?.paths[0];
        const currentElement = currentPage ? navElement[currentPage] : VirHome;

        return html`
            <nav>
                <${VirAppNav}
                    ${listen(VirAppNav.events.navUpdate, (event) => {
                        updateState({
                            fullRoute: event.detail,
                        });
                    })}
                ></${VirAppNav}>
            </nav>
            <main>
                <${currentElement}></${currentElement}>
            </main>
        `;
    },
});
