import {PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Size} from './size';

export abstract class Animation {
    constructor(canvas: HTMLCanvasElement, protected animationEnabled = true) {
        this.webGlRenderer = new WebGLRenderer({canvas});
    }

    public setAnimationEnabled(value: boolean) {
        if (value && !this.animationEnabled) {
            this.animateWrapper();
        }
        this.animationEnabled = value;
    }

    protected webGlRenderer: WebGLRenderer;
    protected threeJsScene = new Scene();
    protected camera: PerspectiveCamera | undefined;
    protected starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    protected abstract animate(): boolean;
    protected abstract initScene(): void;

    private animateWrapper() {
        if (this.animationEnabled) {
            const shouldKeepRendering = this.animate();
            if (shouldKeepRendering) {
                requestAnimationFrame(() => this.animateWrapper());
            }
        }
    }

    private initSizes(initSize: Size) {
        this.camera = new PerspectiveCamera(75, initSize.w / initSize.h, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.starterCameraDimensions = {tanFov, canvasHeight: initSize.h};

        this.initScene();
        this.camera.position.z = 3;
        this.animateWrapper();
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
