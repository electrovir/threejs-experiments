import {defineFunctionalElement, html} from "../../../_snowpack/pkg/element-vir.js";
import {createPathString, setRoutes} from "../../router/set-route.js";
function routeClicked(clickEvent, routes) {
  if (clickEvent.button === 0 && !(clickEvent.metaKey || clickEvent.altKey || clickEvent.ctrlKey || clickEvent.shiftKey)) {
    clickEvent.preventDefault();
    setRoutes(routes);
  }
}
function prettifyRouteName(input) {
  const spaces = input.replace(/-/g, " ");
  const words = spaces.split(" ");
  return words.map((word) => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`).join(" ");
}
export const AppRouteLinkElement = defineFunctionalElement({
  tagName: "vir-app-route-link",
  props: {
    routes: []
  },
  renderCallback: ({props}) => {
    const definedRoutes = props.routes.filter((route) => !!route);
    const lastRoute = definedRoutes[definedRoutes.length - 1];
    if (!lastRoute) {
      throw new Error(`Last defined route was not defined from ${JSON.stringify(props.routes)}`);
    }
    const label = lastRoute.length ? prettifyRouteName(lastRoute) : "Home";
    const template = html`
            <a
                href=${createPathString(definedRoutes)}
                @click=${(clickEvent) => routeClicked(clickEvent, definedRoutes)}
            >
                ${label}
            </a>
        `;
    return template;
  }
});
