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
import {css} from "../../../../_snowpack/pkg/lit.js";
import {customElement} from "../../../../_snowpack/pkg/lit/decorators.js";
import {VirElement} from "../../../render/vir-element.js";
import {html} from "../../../render/vir-html.js";
export let HomeElement = class extends VirElement {
  render() {
    return html`
            <h1>Welcome</h1>
        `;
  }
};
HomeElement.tagName = "vir-home";
HomeElement.styles = css`
        :host {
            padding: 0 32px;
        }
    `;
HomeElement = __decorate([
  customElement("vir-home")
], HomeElement);
