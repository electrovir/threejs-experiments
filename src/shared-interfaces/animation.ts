import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Size} from './size';

export class FpsEvent extends CustomEvent<number> {
    static readonly eventName = 'fpsCount';

    constructor(fps: number) {
        super(FpsEvent.eventName, {detail: fps, bubbles: true, composed: true});
    }
}

export abstract class Animation extends EventTarget {
    constructor(
        canvas: HTMLCanvasElement,
        protected animationEnabled = true,
        private readonly fpsEmitDelay = 500,
    ) {
        super();
        this.webGlRenderer = new WebGLRenderer({canvas});
    }

    public addEventListener<EventType extends string>(
        type: EventType,
        callback: EventType extends typeof FpsEvent.eventName
            ? (event: FpsEvent) => void
            : EventListenerOrEventListenerObject,
        options?: AddEventListenerOptions | boolean,
    ): void {
        super.addEventListener(type, callback, options);
    }

    public setAnimationEnabled(value: boolean) {
        if (value && !this.animationEnabled) {
            this.resumeAnimation();
        }
        this.animationEnabled = value;
    }

    protected webGlRenderer: WebGLRenderer;
    protected threeJsScene = new Scene();
    protected camera: PerspectiveCamera | undefined;
    protected starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    protected abstract animate(frameTime: number): boolean;
    protected abstract initScene(): void;
    private lastRenderTime = 0;

    private lastFpsEmitTime = 0;
    private frameCountSinceLastFps = 0;
    private emitFps(newTime: number) {
        const diffTime = newTime - this.lastFpsEmitTime;
        if (diffTime > this.fpsEmitDelay) {
            const fps = (this.frameCountSinceLastFps * 1000) / diffTime;
            this.dispatchEvent(new FpsEvent(fps));
            this.frameCountSinceLastFps = 0;
            this.lastFpsEmitTime = newTime;
        } else {
            ++this.frameCountSinceLastFps;
        }
    }

    private resumeAnimation() {
        requestAnimationFrame((firstTime) => {
            this.lastRenderTime = firstTime;
            this.lastFpsEmitTime = firstTime;
            this.frameCountSinceLastFps = 0;
            requestAnimationFrame((time) => this.animateWrapper(time));
        });
    }

    private animateWrapper(newTime: number) {
        if (this.animationEnabled) {
            const previousLastRenderTime = this.lastRenderTime;
            this.emitFps(newTime);
            // update this before running animate so that animate doesn't mess up our FPS if it's really long
            this.lastRenderTime = newTime;
            const shouldKeepRendering = this.animate(newTime - previousLastRenderTime);
            if (shouldKeepRendering) {
                requestAnimationFrame((newTime) => this.animateWrapper(newTime));
            }
        }
    }

    private initSizes(initSize: Size) {
        this.camera = new PerspectiveCamera(75, initSize.w / initSize.h, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.starterCameraDimensions = {tanFov, canvasHeight: initSize.h};

        this.initScene();
        this.camera.position.z = 3;
        this.resumeAnimation();
    }

    public updateSize(rawNewSize: Size): void {
        const newSize = {w: Math.floor(rawNewSize.w), h: Math.floor(rawNewSize.h)};

        if (!this.starterCameraDimensions) {
            this.initSizes(newSize);
        }

        if (!this.webGlRenderer) {
            throw new Error(`renderer not found.`);
        }
        this.webGlRenderer.setSize(newSize.w, newSize.h);
        if (this.camera) {
            if (!this.starterCameraDimensions) {
                throw new Error(
                    `Camera was defined for updating canvas size but not the initial camera dimensions.`,
                );
            }
            if (!this.threeJsScene) {
                throw new Error(`Camera was defined for updating canvas size but not the scene.`);
            }
            this.camera.aspect = newSize.w / newSize.h;
            this.camera.fov =
                (360 / Math.PI) *
                Math.atan(
                    this.starterCameraDimensions.tanFov *
                        (newSize.h / this.starterCameraDimensions.canvasHeight),
                );
            this.camera.updateProjectionMatrix();
        }
    }
}
