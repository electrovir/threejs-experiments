import {getEnumTypedValues} from "../../../_snowpack/pkg/augment-vir.js";
import {
  assign,
  defineFunctionalElement,
  ElementEvent,
  eventInit,
  html,
  onDomCreated
} from "../../../_snowpack/pkg/element-vir.js";
import {css} from "../../../_snowpack/pkg/lit.js";
import {
  ExperimentRoute,
  threeJsExperimentsRouter
} from "../../threejs-experiments-router.js";
import {AppRouteLinkElement} from "./app-route-link.element.js";
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
    currentRoutes: void 0,
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
        props.routeListener = threeJsExperimentsRouter.addRouteListener(true, (routes) => {
          const rootRoute = routes[0];
          const currentRoute = props.currentRoutes?.[0];
          if (rootRoute !== currentRoute) {
            props.currentRoutes = routes;
            dispatchEvent(new ElementEvent(events.navUpdate, routes));
          }
        });
      }
    })}
            >
                ${getEnumTypedValues(ExperimentRoute).map((route) => {
      return html`
                    <li>
                        <${AppRouteLinkElement} ${assign(AppRouteLinkElement.props.route, route)}></${AppRouteLinkElement}>
                    </li>
                `;
    })}
            </ul>
        `;
  }
});
