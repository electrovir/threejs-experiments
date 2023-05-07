import {css, defineElementNoInputs, html, listen} from 'element-vir';
import {ExperimentsFullRoute} from '../../../threejs-experiments-router';
import {VirHome} from '../main-pages/vir-home.element';
import {VirAppNav} from './app-nav/vir-app-nav.element';
import {navElement} from './nav-elements';

export const ThreeJsExperimentsAppElement = defineElementNoInputs({
    tagName: 'vir-three-js-experiments-app',
    stateInit: {
        fullRoute: undefined as ExperimentsFullRoute | undefined,
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
        }

        main > * {
            flex-grow: 1;
        }

        .github-banner {
            position: absolute;
            top: 0;
            right: 0;
        }
    `,
    renderCallback: ({state, updateState}) => {
        const currentElement = state.fullRoute?.paths?.[0]
            ? navElement[state.fullRoute?.paths?.[0]]
            : VirHome;

        const currentElementTemplate = html`
            <${currentElement}></${currentElement}>
        `;

        console.log({currentElement: currentElement.tagName});

        return html`
            <nav>
                <${VirAppNav}
                    ${listen(VirAppNav.events.navUpdate, (event) => {
                        updateState({fullRoute: event.detail});
                    })}
                ></${VirAppNav}>
            </nav>
            <main>${currentElementTemplate}</main>
        `;
    },
});
