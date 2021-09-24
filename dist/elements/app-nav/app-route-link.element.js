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
import {VirElement} from "../../render/vir-element.js";
import {html} from "../../render/vir-html.js";
import {createPathString, setRoutes} from "../../router/set-route.js";
export let AppRouteLinkElement = class extends VirElement {
  constructor() {
    super(...arguments);
    this.routes = [];
  }
  routesClicked(clickEvent, routes) {
    if (clickEvent.button === 0 && !(clickEvent.metaKey || clickEvent.altKey || clickEvent.ctrlKey || clickEvent.shiftKey)) {
      clickEvent.preventDefault();
      setRoutes(routes);
    }
  }
  render() {
    const definedRoutes = this.routes.filter((route) => !!route);
    const lastRoute = definedRoutes[definedRoutes.length - 1];
    if (!lastRoute) {
      throw new Error(`Last defined route was not defined from ${JSON.stringify(this.routes)}`);
    }
    const label = lastRoute.length ? prettifyRouteName(lastRoute) : "Home";
    const template = html`
            <a
                href=${createPathString(definedRoutes)}
                @click=${(clickEvent) => this.routesClicked(clickEvent, definedRoutes)}
            >
                ${label}
            </a>
        `;
    return template;
  }
};
AppRouteLinkElement.tagName = "vir-app-route-link";
AppRouteLinkElement.styles = css``;
__decorate([
  property()
], AppRouteLinkElement.prototype, "routes", 2);
AppRouteLinkElement = __decorate([
  customElement("vir-app-route-link")
], AppRouteLinkElement);
function prettifyRouteName(input) {
  const spaces = input.replace(/-/g, " ");
  const words = spaces.split(" ");
  return words.map((word) => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`).join(" ");
}
