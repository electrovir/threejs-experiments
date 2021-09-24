import {css, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {html} from 'lit/static-html.js';
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {VirElement} from '../../../render/vir-element';

// https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html
// https://jsfiddle.net/Q4Jpu/

@customElement('vir-intro-example')
export class IntroExampleElement extends VirElement {
    public static readonly tagName = 'vir-intro-example';
    static styles = css`
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

    @property() animationEnabled = true;

    private cube: Mesh<BoxGeometry, MeshBasicMaterial> = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({color: 0x00ff00}),
    );

    private canvas: HTMLCanvasElement | undefined;
    private canvasAvailableSizeElement: HTMLDivElement | undefined;
    private webGlRenderer: WebGLRenderer | undefined;
    private threeJsScene = new Scene();
    private camera: PerspectiveCamera | undefined;
    private starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    private animateThreeJs() {
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

    private updateCanvasSize(): {w: number; h: number} {
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
                throw new Error(
                    `Camera was defined for updating canvas size but not the initial camera dimensions.`,
                );
            }
            if (!this.threeJsScene) {
                throw new Error(`Camera was defined for updating canvas size but not the scene.`);
            }
            this.camera.aspect = size.w / size.h;
            this.camera.fov =
                (360 / Math.PI) *
                Math.atan(
                    this.starterCameraDimensions.tanFov *
                        (size.h / this.starterCameraDimensions.canvasHeight),
                );

            this.camera.updateProjectionMatrix();
        }

        return size;
    }

    private getCanvas(): HTMLCanvasElement {
        const queriedCanvas = this.renderRoot?.querySelector('canvas');

        if (!(queriedCanvas instanceof HTMLCanvasElement)) {
            throw new Error(`Could not find canvas inside of ${IntroExampleElement.tagName}!`);
        }

        return queriedCanvas;
    }

    private getCanvasWrapper(): HTMLDivElement {
        const queriedCanvasWrapper = this.renderRoot?.querySelector(`.canvas-wrapper`);

        if (!(queriedCanvasWrapper instanceof HTMLDivElement)) {
            throw new Error(
                `Could not find canvas wrapper inside of ${IntroExampleElement.tagName}!`,
            );
        }

        return queriedCanvasWrapper;
    }

    private timeout: number | undefined;

    private throttleResizeUpdates() {
        if (!this.timeout) {
            this.updateCanvasSize();
            this.timeout = window.setTimeout(() => {
                this.updateCanvasSize();
                this.timeout = undefined;
            }, 200);
        }
    }

    private setupThreeJs() {
        this.canvas = this.getCanvas();
        this.canvasAvailableSizeElement = this.getCanvasWrapper();

        this.webGlRenderer = new WebGLRenderer({canvas: this.canvas});

        const size = this.updateCanvasSize();

        this.camera = new PerspectiveCamera(75, size.w / size.h, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.starterCameraDimensions = {tanFov, canvasHeight: size.h};

        this.threeJsScene.add(this.cube);
        this.camera.position.z = 3;

        this.animateThreeJs();
        window.addEventListener('resize', () => {
            this.throttleResizeUpdates();
        });
    }

    public firstUpdated() {
        this.setupThreeJs();
    }

    protected render(): TemplateResult {
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
}
