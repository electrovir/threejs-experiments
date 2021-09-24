var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {css} from "../../../_snowpack/pkg/lit.js";
import {customElement, property} from "../../../_snowpack/pkg/lit/decorators.js";
import {getEnumTypedValues, isEnumValue} from "../../../_snowpack/pkg/virmator/dist/augments/object.js";
import {VirElement} from "../../render/vir-element.js";
import {html} from "../../render/vir-html.js";
import {addRouteListener} from "../../router/route-listener.js";
import {SpaRoute} from "../../router/spa-routes.js";
import "./app-route-link.element.js";
import {AppRouteLinkElement} from "./app-route-link.element.js";
const _NavRouteUpdate = class extends CustomEvent {
  constructor(detail) {
    super(_NavRouteUpdate.eventName, {detail: [...detail], bubbles: true, composed: true});
  }
};
export let NavRouteUpdate = _NavRouteUpdate;
NavRouteUpdate.eventName = "nav-route-update";
export let AppNavElement = class extends VirElement {
  connectedCallback() {
    super.connectedCallback();
    addRouteListener(true, sanitizeSpaRoutes, (routes) => {
      const rootRoute = routes[0];
      if (rootRoute !== this.spaRoute) {
        this.spaRoute = rootRoute;
        const event = new NavRouteUpdate(routes);
        this.dispatchEvent(event);
      }
    });
  }
  renderNavElements() {
    return html`
            ${getEnumTypedValues(SpaRoute).map((spaRoute) => {
      return html`
                    <li>
                        <${AppRouteLinkElement} .routes=${[spaRoute]}></${AppRouteLinkElement}>
                    </li>
                `;
    })}
        `;
  }
  render() {
    return html`
            <ul>
                ${this.renderNavElements()}
            </ul>
        `;
  }
};
AppNavElement.tagName = "vir-app-nav";
AppNavElement.styles = css`
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
    `;
__decorate([
  property()
], AppNavElement.prototype, "spaRoute", 2);
AppNavElement = __decorate([
  customElement("vir-app-nav")
], AppNavElement);
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
