import {
  assign,
  defineFunctionalElement,
  ElementEvent,
  eventInit,
  html,
  onDomCreated
} from "../../../_snowpack/pkg/element-vir.js";
import {css} from "../../../_snowpack/pkg/lit.js";
import {getEnumTypedValues, isEnumValue} from "../../../_snowpack/pkg/virmator/dist/augments/object.js";
import {addRouteListener} from "../../router/route-listener.js";
import {SpaRoute} from "../../router/spa-routes.js";
import {AppRouteLinkElement} from "./app-route-link.element.js";
const _NavRouteUpdate = class extends CustomEvent {
  constructor(detail) {
    super(_NavRouteUpdate.eventName, {detail: [...detail], bubbles: true, composed: true});
  }
};
export let NavRouteUpdate = _NavRouteUpdate;
NavRouteUpdate.eventName = "nav-route-update";
const defaultRoute = [SpaRoute.Home];
function sanitizeSpaRoutes(routes) {
  if (routes.length !== 1) {
    return defaultRoute;
  }
  const firstRoute = routes[0];
  if (isEnumValue(firstRoute, SpaRoute)) {
    return [firstRoute];
  } else {
    return defaultRoute;
  }
}
export const AppNavElement = defineFunctionalElement({
  tagName: "vir-app-nav",
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
  props: {
    spaRoute: void 0,
    routeListener: void 0
  },
  events: {
    navUpdate: eventInit()
  },
  renderCallback: ({props, events, dispatchEvent}) => {
    return html`
            <ul
                ${onDomCreated(() => {
      if (!props.routeListener) {
        props.routeListener = addRouteListener(true, sanitizeSpaRoutes, (routes) => {
          const rootRoute = routes[0];
          if (rootRoute !== props.spaRoute) {
            props.spaRoute = rootRoute;
            dispatchEvent(new ElementEvent(events.navUpdate, routes));
          }
        });
      }
    })}
            >
                ${getEnumTypedValues(SpaRoute).map((spaRoute) => {
      return html`
                    <li>
                        <${AppRouteLinkElement} ${assign(AppRouteLinkElement.props.routes, [
        spaRoute
      ])}></${AppRouteLinkElement}>
                    </li>
                `;
    })}
            </ul>
        `;
  }
});
