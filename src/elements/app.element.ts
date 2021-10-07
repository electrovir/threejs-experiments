import {defineFunctionalElement, html, listen} from 'element-vir';
import {css, TemplateResult} from 'lit';
import {ExperimentRoute} from '../threejs-experiments-router';
import {AppNavElement} from './app-nav/app-nav.element';
import {HomeElement} from './spa-pages/home/home.element';
import {LoadingModelElement} from './spa-pages/loaded-models/loaded-models.element';
import {RainbowCubeElement} from './spa-pages/rainbow-cube/rainbow-cube.element';
import {SingleColorCubeElement} from './spa-pages/single-color-cube/single-color-cube.element';

export const ThreeJsExperimentsAppElement = defineFunctionalElement({
    tagName: 'vir-three-js-experiments-app',
    props: {
        spaRoute: undefined as ExperimentRoute | undefined,
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
    renderCallback: ({props}) => {
        return html`
            <nav>
                <${AppNavElement}
                    ${listen(AppNavElement.events.navUpdate, (event) => {
                        props.spaRoute = event.detail[0];
                    })}
                ></${AppNavElement}>
            </nav>
            <main>
                ${getMainPage(props.spaRoute)}
            </main>`;
    },
});

function getMainPage(route?: ExperimentRoute): TemplateResult {
    switch (route) {
        case undefined:
        case ExperimentRoute.Home:
            return html`<${HomeElement}></${HomeElement}>`;
        case ExperimentRoute.SingleColorCube:
            return html`<${SingleColorCubeElement}></${SingleColorCubeElement}>`;
        case ExperimentRoute.RainbowCube:
            return html`<${RainbowCubeElement}></${RainbowCubeElement}>`;
        case ExperimentRoute.LoadedModels:
            return html`<${LoadingModelElement}></${LoadingModelElement}>`;
    }
}
