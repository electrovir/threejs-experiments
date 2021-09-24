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
import {css, LitElement} from "../../_snowpack/pkg/lit.js";
import {customElement, property} from "../../_snowpack/pkg/lit/decorators.js";
import {html} from "../render/vir-html.js";
import {SpaRoute} from "../router/spa-routes.js";
import {AppNavElement, NavRouteUpdate} from "./app-nav/app-nav.element.js";
import {HomeElement} from "./spa-pages/home/home.element.js";
import {IntroExampleElement} from "./spa-pages/intro-example/intro-example.element.js";
export let ThreeJsExperimentsAppElement = class extends LitElement {
  routeUpdated(newRoute) {
    this.spaRoute = newRoute;
  }
  render() {
    const template = html`
            <nav>
                <${AppNavElement}
                    @${NavRouteUpdate.eventName}=${(event) => this.routeUpdated(event.detail[0])}
                ></${AppNavElement}>
            </nav>
            <main>
                ${this.spaRoute === SpaRoute.Home ? html`<${HomeElement}></${HomeElement}>` : ""}
                ${this.spaRoute === SpaRoute.IntroExample ? html`<${IntroExampleElement}></${IntroExampleElement}>` : ""}
            </main>
        `;
    return template;
  }
};
ThreeJsExperimentsAppElement.styles = css`
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
    `;
__decorate([
  property()
], ThreeJsExperimentsAppElement.prototype, "spaRoute", 2);
ThreeJsExperimentsAppElement = __decorate([
  customElement("vir-three-js-experiments-app")
], ThreeJsExperimentsAppElement);
