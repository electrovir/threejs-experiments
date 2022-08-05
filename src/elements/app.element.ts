import {defineFunctionalElement, html, listen} from 'element-vir';
import {css, TemplateResult} from 'lit';
import {ExperimentsFullRoute, ExperimentsPage} from '../threejs-experiments-router';
import {AppNavElement} from './app-nav/app-nav.element';
import {HomeElement} from './spa-pages/home/home.element';
import {LoadingModelElement} from './spa-pages/loaded-models/loaded-models.element';
import {RainbowCubeElement} from './spa-pages/rainbow-cube/rainbow-cube.element';
import {SingleColorCubeElement} from './spa-pages/single-color-cube/single-color-cube.element';

export const ThreeJsExperimentsAppElement = defineFunctionalElement({
    tagName: 'vir-three-js-experiments-app',
    props: {
        spaRoute: undefined as ExperimentsFullRoute | undefined,
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
    renderCallback: ({props, setProps}) => {
        const a = 'derp';
        const b = 'another-thing';

        if (a === a) {
            console.log('hello');
        }

        return html`
            hello there
            <nav>
                <${AppNavElement}
                    ${listen(AppNavElement.events.navUpdate, (event) => {
                        setProps({spaRoute: event.detail});
                    })}
                ></${AppNavElement}>
            </nav>
            <main>
                ${getMainPage(props.spaRoute)}
            </main>`;
    },
});

function getMainPage(route?: ExperimentsFullRoute): TemplateResult {
    switch (route?.paths[0]) {
        case undefined:
        // intentionally fall through to home
        case ExperimentsPage.Home:
            return html`<${HomeElement}></${HomeElement}>`;
        case ExperimentsPage.SingleColorCube:
            return html`<${SingleColorCubeElement}></${SingleColorCubeElement}>`;
        case ExperimentsPage.RainbowCube:
            return html`<${RainbowCubeElement}></${RainbowCubeElement}>`;
        case ExperimentsPage.LoadedModels:
            return html`<${LoadingModelElement}></${LoadingModelElement}>`;
    }
}
