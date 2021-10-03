import {PerspectiveCamera, Scene, WebGLRenderer} from "../../_snowpack/pkg/three.js";
const _FpsEvent = class extends CustomEvent {
  constructor(fps) {
    super(_FpsEvent.eventName, {detail: fps, bubbles: true, composed: true});
  }
};
export let FpsEvent = _FpsEvent;
FpsEvent.eventName = "fpsCount";
const _DestroyedEvent = class extends CustomEvent {
  constructor() {
    super(_DestroyedEvent.eventName, {bubbles: true, composed: true});
  }
};
export let DestroyedEvent = _DestroyedEvent;
DestroyedEvent.eventName = "animationDestroyed";
export class ThreeJsAnimation extends EventTarget {
  constructor() {
    super(...arguments);
    this.lastRenderTime = 0;
    this.lastFpsEmitTime = 0;
    this.frameCountSinceLastFps = 0;
    this.animationEnabled = false;
    this.fpsEmitDelay = 500;
    this.isDestroyed = false;
  }
  animate(frameTime, webGlRenderer, camera, scene) {
    return false;
  }
  initScene(camera) {
    return new Scene();
  }
  destroyWebGlRenderer() {
    if (this.webGlRenderer) {
      this.webGlRenderer.renderLists.dispose();
      this.webGlRenderer?.clear();
      this.webGlRenderer.state.reset();
      delete this.webGlRenderer.context;
      this.webGlRenderer.dispose();
    }
    this.webGlRenderer = void 0;
  }
  destroyScene() {
    this.scene?.clear();
    this.scene = void 0;
  }
  destroy() {
    this.dispatchEvent(new DestroyedEvent());
    this.animationEnabled = false;
    this.isDestroyed = true;
    this.animate = () => false;
    this.destroyScene();
    this.destroyWebGlRenderer();
    this.camera = void 0;
    this.canvas = void 0;
    this.starterCameraDimensions = void 0;
    this.lastRenderTime = 0;
    this.lastFpsEmitTime = 0;
  }
  init(canvas, startAnimating, fpsEmitDelay = 500, size) {
    if (this.isDestroyed) {
      console.error(this);
      throw new Error(`Cannot initialize a destroyed animation.`);
    }
    this.canvas = canvas;
    this.animationEnabled = startAnimating;
    this.fpsEmitDelay = fpsEmitDelay || 500;
    this.webGlRenderer = new WebGLRenderer({canvas});
    if (size) {
      this.updateSize(size);
    }
  }
  isInitialized() {
    return !!(this.canvas && this.camera && this.scene && this.webGlRenderer);
  }
  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options);
    return callback;
  }
  enableAnimation(value) {
    if (value && !this.animationEnabled) {
      this.resumeAnimation();
    }
    this.animationEnabled = value;
  }
  emitFps(newTime) {
    const diffTime = newTime - this.lastFpsEmitTime;
    if (diffTime > this.fpsEmitDelay) {
      const fps = this.frameCountSinceLastFps * 1e3 / diffTime;
      this.dispatchEvent(new FpsEvent(fps));
      this.frameCountSinceLastFps = 0;
      this.lastFpsEmitTime = newTime;
    } else {
      ++this.frameCountSinceLastFps;
    }
  }
  resumeAnimation() {
    requestAnimationFrame((firstTime) => {
      this.lastRenderTime = firstTime;
      this.lastFpsEmitTime = firstTime;
      this.frameCountSinceLastFps = 0;
      requestAnimationFrame((time) => this.animateWrapper(time));
    });
  }
  animateWrapper(newTime) {
    if (this.animationEnabled) {
      if (this.isInitialized()) {
        const previousLastRenderTime = this.lastRenderTime;
        this.emitFps(newTime);
        this.lastRenderTime = newTime;
        const shouldKeepRendering = this.animate(newTime - previousLastRenderTime, this.webGlRenderer, this.camera, this.scene);
        if (shouldKeepRendering) {
          requestAnimationFrame((newTime2) => this.animateWrapper(newTime2));
        }
      } else {
        requestAnimationFrame((newTime2) => this.animateWrapper(newTime2));
      }
    }
  }
  initSizes(initSize) {
    this.camera = new PerspectiveCamera(75, initSize.w / initSize.h, 0.1, 1e3);
    const tanFov = Math.tan(Math.PI / 180 * this.camera.fov / 2);
    this.camera.position.z = 3;
    this.scene = this.initScene(this.camera);
    this.starterCameraDimensions = {tanFov, canvasHeight: initSize.h};
    this.resumeAnimation();
  }
  updateSize(rawNewSize) {
    const newSize = {w: Math.floor(rawNewSize.w), h: Math.floor(rawNewSize.h)};
    if (!this.starterCameraDimensions) {
      this.initSizes(newSize);
    }
    if (!(this.canvas && this.webGlRenderer && this.camera)) {
      return;
    }
    this.webGlRenderer?.setSize(newSize.w, newSize.h);
    if (this.camera) {
      if (!this.starterCameraDimensions) {
        throw new Error(`Camera was defined for updating canvas size but not the initial camera dimensions.`);
      }
      if (!this.scene) {
        throw new Error(`Camera is defined already but the scene isn't.`);
      }
      this.camera.aspect = newSize.w / newSize.h;
      this.camera.fov = 360 / Math.PI * Math.atan(this.starterCameraDimensions.tanFov * (newSize.h / this.starterCameraDimensions.canvasHeight));
      this.camera.updateProjectionMatrix();
    }
  }
}
