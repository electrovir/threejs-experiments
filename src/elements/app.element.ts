import {defineFunctionalElement, html, listen} from 'element-vir';
import {css} from 'lit';
import {SpaRoute} from '../router/spa-routes';
import {AppNavElement} from './app-nav/app-nav.element';
import {HomeElement} from './spa-pages/home/home.element';
import {IntroExampleElement} from './spa-pages/intro-example/intro-example.element';
import {RainbowCubeElement} from './spa-pages/rainbow-cube/rainbow-cube.element';

export const ThreeJsExperimentsAppElement = defineFunctionalElement({
    tagName: 'vir-three-js-experiments-app',
    props: {
        spaRoute: undefined as SpaRoute | undefined,
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
                <a class="github-banner" href="https://github.com/electrovir/threejs-experiments"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a>
            </nav>
            <main>
                ${getMainPage(props.spaRoute)}
            </main>`;
    },
});

function getMainPage(spaRoute?: SpaRoute) {
    switch (spaRoute) {
        case undefined:
        case SpaRoute.Home:
            return html`<${HomeElement}></${HomeElement}>`;
        case SpaRoute.IntroExample:
            return html`<${IntroExampleElement}></${IntroExampleElement}>`;
        case SpaRoute.RainbowCube:
            return html`<${RainbowCubeElement}></${RainbowCubeElement}>`;
    }
}
