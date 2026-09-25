import {type Dimensions, ensureArray, type PartialWithUndefined} from '@augment-vir/common';
import {type Camera, Mesh, PerspectiveCamera, type Scene, type WebGLRenderer} from 'three';
import {defineTypedCustomEvent, ListenTarget} from 'typed-event-target';
import {type ModelToggle} from './models.js';
import {sharedWebGlRenderer} from './shared-webgl-renderer.js';

// resize help from https://jsfiddle.net/Q4Jpu/

export class FpsEvent extends defineTypedCustomEvent<number>()('fps-count') {}

export class ModelToggleEvent extends defineTypedCustomEvent<ModelToggle>()('model-toggle') {}

export type AnimateParams = {
    frameTime: number;
    webGlRenderer: WebGLRenderer;
    camera: Camera;
    scene: Scene;
};

export abstract class ThreeJsAnimation extends ListenTarget<FpsEvent | ModelToggleEvent> {
    // ==============================================
    //                override these
    // ==============================================
    /** Method that is called each frame to run the animation. */
    protected abstract animate(params: Readonly<AnimateParams>): boolean;
    /** Method that is called once to initialize the ThreeJS scene. */
    protected abstract initScene(camera: Camera): Scene;
    // ==============================================

    protected camera: PerspectiveCamera | undefined;
    protected scene: Scene | undefined;
    protected webGlRenderer: WebGLRenderer | undefined;

    protected starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    protected lastRenderTime = 0;
    protected lastFpsEmitTime = 0;
    protected frameCountSinceLastFps = 0;

    protected animationEnabled = false;
    protected fpsEmitDelay = 500;
    public isDestroyed = false;

    protected destroyScene() {
        if (this.scene) {
            /** The shared renderer outlives this scene, so its GPU buffers must be freed here. */
            this.scene.traverse((object) => {
                if (object instanceof Mesh) {
                    object.geometry.dispose();
                    ensureArray(object.material).forEach((material) => material.dispose());
                }
            });
            // wipe out the rendered scene to just black pixels
            this.scene.clear();
            this.scene.removeFromParent();
            this.scene = undefined;
        }
    }

    /** Leaves {@link sharedWebGlRenderer} intact for the next animation. */
    public override destroy() {
        this.animationEnabled = false;
        this.isDestroyed = true;
        this.animate = () => false;
        this.destroyScene();
        this.webGlRenderer = undefined;
        this.camera = undefined;
        this.starterCameraDimensions = undefined;
        this.lastRenderTime = 0;
        this.lastFpsEmitTime = 0;
        super.destroy();
    }

    public init({
        startAnimating,
        fpsEmitDelay,
        size,
    }: Readonly<
        {
            startAnimating: boolean;
        } & PartialWithUndefined<{
            fpsEmitDelay: number;
            size: Dimensions;
        }>
    >) {
        if (this.isDestroyed) {
            console.error(this);
            throw new Error('Cannot initialize a destroyed animation.');
        }
        this.animationEnabled = startAnimating;
        this.fpsEmitDelay = fpsEmitDelay || 500;
        this.webGlRenderer = sharedWebGlRenderer;
        if (size) {
            this.updateSize(size);
        }
    }

    public isInitialized() {
        return !!(this.camera && this.scene && this.webGlRenderer);
    }

    public enableAnimation(value: boolean) {
        if (value && !this.animationEnabled) {
            this.resumeAnimation();
        }
        this.animationEnabled = value;
    }
    protected emitFps(newTime: number) {
        const diffTime = newTime - this.lastFpsEmitTime;
        if (diffTime > this.fpsEmitDelay) {
            const fps = (this.frameCountSinceLastFps * 1000) / diffTime;
            this.dispatch(
                new FpsEvent({
                    detail: fps,
                }),
            );
            this.frameCountSinceLastFps = 0;
            this.lastFpsEmitTime = newTime;
        } else {
            ++this.frameCountSinceLastFps;
        }
    }

    protected resumeAnimation() {
        requestAnimationFrame((firstTime) => {
            this.lastRenderTime = firstTime;
            this.lastFpsEmitTime = firstTime;
            this.frameCountSinceLastFps = 0;
            requestAnimationFrame((time) => this.animateWrapper(time));
        });
    }

    protected animateWrapper(newTime: number) {
        if (this.animationEnabled) {
            if (this.webGlRenderer && this.camera && this.scene) {
                const previousLastRenderTime = this.lastRenderTime;
                this.emitFps(newTime);
                // update this before running animate so that animate doesn't mess up our FPS if it's really long
                this.lastRenderTime = newTime;
                const shouldKeepRendering = this.animate({
                    frameTime: newTime - previousLastRenderTime,
                    webGlRenderer: this.webGlRenderer,
                    camera: this.camera,
                    scene: this.scene,
                });
                if (shouldKeepRendering) {
                    requestAnimationFrame((newTime) => this.animateWrapper(newTime));
                }
            } else {
                requestAnimationFrame((newTime) => this.animateWrapper(newTime));
            }
        }
    }

    protected initSizes(initSize: Dimensions): void {
        this.camera = new PerspectiveCamera(75, initSize.width / initSize.height, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);

        this.camera.position.z = 3;
        this.scene = this.initScene(this.camera);
        this.starterCameraDimensions = {
            tanFov,
            canvasHeight: initSize.height,
        };
        this.resumeAnimation();
    }

    public updateSize(rawNewSize: Dimensions): void {
        const newSize: Dimensions = {
            width: Math.floor(rawNewSize.width),
            height: Math.floor(rawNewSize.height),
        };

        if (!this.starterCameraDimensions) {
            this.initSizes(newSize);
        }

        if (!(this.webGlRenderer && this.camera)) {
            return;
        }

        this.webGlRenderer.setSize(newSize.width, newSize.height);
        if (!this.starterCameraDimensions) {
            throw new Error(
                'Camera was defined for updating canvas size but not the initial camera dimensions.',
            );
        } else if (!this.scene) {
            throw new Error("Camera is defined already but the scene isn't.");
        }
        this.camera.aspect = newSize.width / newSize.height;
        this.camera.fov =
            (360 / Math.PI) *
            Math.atan(
                this.starterCameraDimensions.tanFov *
                    (newSize.height / this.starterCameraDimensions.canvasHeight),
            );
        this.camera.updateProjectionMatrix();
    }
}
