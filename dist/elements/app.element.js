import {defineFunctionalElement, html, listen} from "../../_snowpack/pkg/element-vir.js";
import {css} from "../../_snowpack/pkg/lit.js";
import {SpaRoute} from "../router/spa-routes.js";
import {AppNavElement} from "./app-nav/app-nav.element.js";
import {HomeElement} from "./spa-pages/home/home.element.js";
import {LoadingModelElement} from "./spa-pages/loaded-models/loaded-models.element.js";
import {RainbowCubeElement} from "./spa-pages/rainbow-cube/rainbow-cube.element.js";
import {SingleColorCubeElement} from "./spa-pages/single-color-cube/single-color-cube.element.js";
export const ThreeJsExperimentsAppElement = defineFunctionalElement({
  tagName: "vir-three-js-experiments-app",
  props: {
    spaRoute: void 0
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
  }
});
function getMainPage(spaRoute) {
  switch (spaRoute) {
    case void 0:
    case SpaRoute.Home:
      return html`<${HomeElement}></${HomeElement}>`;
    case SpaRoute.SingleColorCube:
      return html`<${SingleColorCubeElement}></${SingleColorCubeElement}>`;
    case SpaRoute.RainbowCube:
      return html`<${RainbowCubeElement}></${RainbowCubeElement}>`;
    case SpaRoute.LoadedModels:
      return html`<${LoadingModelElement}></${LoadingModelElement}>`;
  }
}
