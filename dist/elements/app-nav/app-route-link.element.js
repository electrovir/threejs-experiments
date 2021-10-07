import {defineFunctionalElement, html} from "../../../_snowpack/pkg/element-vir.js";
import {routeOnLinkClick} from "../../../_snowpack/pkg/spa-router-vir.js";
import {ExperimentRoute, threeJsExperimentsRouter} from "../../threejs-experiments-router.js";
function prettifyRouteName(input) {
  const spaces = input.replace(/-/g, " ");
  const words = spaces.split(" ");
  return words.map((word) => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`).join(" ");
}
export const AppRouteLinkElement = defineFunctionalElement({
  tagName: "vir-app-route-link",
  props: {
    route: ExperimentRoute.Home
  },
  renderCallback: ({props}) => {
    const label = prettifyRouteName(props.route);
    const template = html`
            <a
                href=${threeJsExperimentsRouter.createRoutesUrl([props.route])}
                @click=${(clickEvent) => {
      routeOnLinkClick(clickEvent, [props.route], threeJsExperimentsRouter);
    }}
            >
                ${label}
            </a>
        `;
    return template;
  }
});
