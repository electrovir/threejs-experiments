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
import {customElement, property} from "../../../../_snowpack/pkg/lit/decorators.js";
import {html} from "../../../../_snowpack/pkg/lit/static-html.js";
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "../../../../_snowpack/pkg/three.js";
import {VirElement} from "../../../render/vir-element.js";
export let IntroExampleElement = class extends VirElement {
  constructor() {
    super(...arguments);
    this.animationEnabled = true;
    this.cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({color: 65280}));
    this.threeJsScene = new Scene();
  }
  animateThreeJs() {
    if (!this.webGlRenderer) {
      throw new Error(`Something really brokey cause there's no renderer for animating to!`);
    }
    if (!this.camera) {
      throw new Error(`Something really brokey cause there's no camera for animating to!`);
    }
    requestAnimationFrame(() => this.animateThreeJs());
    if (this.animationEnabled) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.webGlRenderer.render(this.threeJsScene, this.camera);
    }
  }
  updateCanvasSize() {
    if (!this.canvas) {
      throw new Error(`Canvas to update size on was not found.`);
    }
    if (!this.canvasAvailableSizeElement) {
      throw new Error(`Canvas wrapper for updating canvas size on was not found.`);
    }
    if (!this.webGlRenderer) {
      throw new Error(`renderer not found.`);
    }
    const availableCanvasSize = this.canvasAvailableSizeElement.getBoundingClientRect();
    const size = {w: availableCanvasSize.width, h: availableCanvasSize.height};
    this.webGlRenderer.setSize(size.w, size.h);
    if (this.camera) {
      if (!this.starterCameraDimensions) {
        throw new Error(`Camera was defined for updating canvas size but not the initial camera dimensions.`);
      }
      if (!this.threeJsScene) {
        throw new Error(`Camera was defined for updating canvas size but not the scene.`);
      }
      this.camera.aspect = size.w / size.h;
      this.camera.fov = 360 / Math.PI * Math.atan(this.starterCameraDimensions.tanFov * (size.h / this.starterCameraDimensions.canvasHeight));
      this.camera.updateProjectionMatrix();
    }
    return size;
  }
  getCanvas() {
    const queriedCanvas = this.renderRoot?.querySelector("canvas");
    if (!(queriedCanvas instanceof HTMLCanvasElement)) {
      throw new Error(`Could not find canvas inside of ${IntroExampleElement.tagName}!`);
    }
    return queriedCanvas;
  }
  getCanvasWrapper() {
    const queriedCanvasWrapper = this.renderRoot?.querySelector(`.canvas-wrapper`);
    if (!(queriedCanvasWrapper instanceof HTMLDivElement)) {
      throw new Error(`Could not find canvas wrapper inside of ${IntroExampleElement.tagName}!`);
    }
    return queriedCanvasWrapper;
  }
  throttleResizeUpdates() {
    if (!this.timeout) {
      this.updateCanvasSize();
      this.timeout = window.setTimeout(() => {
        this.updateCanvasSize();
        this.timeout = void 0;
      }, 200);
    }
  }
  setupThreeJs() {
    this.canvas = this.getCanvas();
    this.canvasAvailableSizeElement = this.getCanvasWrapper();
    this.webGlRenderer = new WebGLRenderer({canvas: this.canvas});
    const size = this.updateCanvasSize();
    this.camera = new PerspectiveCamera(75, size.w / size.h, 0.1, 1e3);
    const tanFov = Math.tan(Math.PI / 180 * this.camera.fov / 2);
    this.starterCameraDimensions = {tanFov, canvasHeight: size.h};
    this.threeJsScene.add(this.cube);
    this.camera.position.z = 3;
    this.animateThreeJs();
    window.addEventListener("resize", () => {
      this.throttleResizeUpdates();
    });
  }
  firstUpdated() {
    this.setupThreeJs();
  }
  render() {
    return html`
            <h1>Intro Example</h1>
            <p>
                From the
                <!-- ignore so there aren't spaces inside of the link -->
                <!-- prettier-ignore -->
                <a
                href="https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene"
                >Creating a Scene</a>

                (
                <!-- prettier-ignore -->
                <a
                    href="https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html"
                    >source code</a>
                ) introduction with
                <!-- prettier-ignore -->
                <a href="https://jsfiddle.net/Q4Jpu/">resize support.</a>
            </p>
            <div class="canvas-wrapper">
                <canvas></canvas>
            </div>
        `;
  }
};
IntroExampleElement.tagName = "vir-intro-example";
IntroExampleElement.styles = css`
        :host {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        :host > *:not(.canvas-wrapper) {
            padding: 0 32px;
        }

        .canvas-wrapper {
            position: relative;
            display: flex;
            align-items: stretch;
            flex-grow: 1;
        }
    `;
__decorate([
  property()
], IntroExampleElement.prototype, "animationEnabled", 2);
IntroExampleElement = __decorate([
  customElement("vir-intro-example")
], IntroExampleElement);
