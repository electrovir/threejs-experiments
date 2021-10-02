import {Camera, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Size} from './size';

// resize help from https://jsfiddle.net/Q4Jpu/

export class FpsEvent extends CustomEvent<number> {
    static readonly eventName = 'fpsCount';

    constructor(fps: number) {
        super(FpsEvent.eventName, {detail: fps, bubbles: true, composed: true});
    }
}

export class ThreeJsAnimation extends EventTarget {
    // ==============================================
    //                override these
    // ==============================================
    /** Method that is called each frame to run the animation. */
    protected animate(
        frameTime: number,
        webGlRenderer: WebGLRenderer,
        camera: Camera,
        scene: Scene,
    ): boolean {
        return false;
    }
    /** Method that is called once to initialize the ThreeJS scene. */
    protected initScene(): Scene {
        return new Scene();
    }
    // ==============================================

    private camera: PerspectiveCamera | undefined;
    private canvas: HTMLCanvasElement | undefined;
    private scene: Scene | undefined;
    private webGlRenderer: WebGLRenderer | undefined;

    protected starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    private lastRenderTime = 0;
    private lastFpsEmitTime = 0;
    private frameCountSinceLastFps = 0;

    private animationEnabled = false;
    private fpsEmitDelay = 500;

    public destroy() {
        this.animationEnabled = false;
        this.webGlRenderer = undefined;
        this.camera = undefined;
        this.scene = undefined;
        this.canvas = undefined;
        this.starterCameraDimensions = undefined;
        this.lastRenderTime = 0;
        this.lastFpsEmitTime = 0;
        this.animate = () => false;
    }

    public init(
        canvas: HTMLCanvasElement,
        startAnimating: boolean,
        fpsEmitDelay = 500,
        size?: Size,
    ) {
        this.canvas = canvas;
        this.animationEnabled = startAnimating;
        this.fpsEmitDelay = fpsEmitDelay || 500;
        this.webGlRenderer = new WebGLRenderer({canvas});
        if (size) {
            this.updateSize(size);
        }
    }

    public isInitialized() {
        return !!(this.canvas && this.camera && this.scene && this.webGlRenderer);
    }

    public addEventListener<EventType extends string>(
        type: EventType,
        callback: EventType extends typeof FpsEvent.eventName
            ? (event: FpsEvent) => void
            : EventListenerOrEventListenerObject,
        options?: AddEventListenerOptions | boolean,
    ): typeof callback {
        super.addEventListener(type, callback, options);

        return callback;
    }

    public enableAnimation(value: boolean) {
        if (value && !this.animationEnabled) {
            this.resumeAnimation();
        }
        this.animationEnabled = value;
    }
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
            if (this.isInitialized()) {
                const previousLastRenderTime = this.lastRenderTime;
                this.emitFps(newTime);
                // update this before running animate so that animate doesn't mess up our FPS if it's really long
                this.lastRenderTime = newTime;
                const shouldKeepRendering = this.animate(
                    newTime - previousLastRenderTime,
                    this.webGlRenderer!,
                    this.camera!,
                    this.scene!,
                );
                if (shouldKeepRendering) {
                    requestAnimationFrame((newTime) => this.animateWrapper(newTime));
                }
            } else {
                requestAnimationFrame((newTime) => this.animateWrapper(newTime));
            }
        }
    }

    private initSizes(initSize: Size) {
        this.camera = new PerspectiveCamera(75, initSize.w / initSize.h, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.starterCameraDimensions = {tanFov, canvasHeight: initSize.h};

        this.scene = this.initScene();
        this.camera.position.z = 3;
        this.resumeAnimation();
    }

    public updateSize(rawNewSize: Size): void {
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
                throw new Error(
                    `Camera was defined for updating canvas size but not the initial camera dimensions.`,
                );
            }
            if (!this.scene) {
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
