import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';

type Size = {
    w: number;
    h: number;
};

export function elementToSize(element: Element): Size {
    const elementRect = element.getBoundingClientRect();
    return {
        w: elementRect.width,
        h: elementRect.height,
    };
}

export class CubeAnimation {
    constructor(
        canvas: HTMLCanvasElement,
        private readonly cubeColor = 0x00ff00,
        public animationEnabled = true,
    ) {
        this.webGlRenderer = new WebGLRenderer({canvas});

        const initSize = elementToSize(canvas);
        this.updateSize(initSize);

        this.camera = new PerspectiveCamera(75, initSize.w / initSize.h, 0.1, 1000);
        const tanFov = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.starterCameraDimensions = {tanFov, canvasHeight: initSize.h};

        this.threeJsScene.add(this.cube);
        this.camera.position.z = 3;

        this.animate();
    }

    private cube: Mesh<BoxGeometry, MeshBasicMaterial> = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({color: this.cubeColor}),
    );

    private webGlRenderer: WebGLRenderer;
    private threeJsScene = new Scene();
    private camera: PerspectiveCamera;
    private starterCameraDimensions: {tanFov: number; canvasHeight: number} | undefined;

    private animate() {
        requestAnimationFrame(() => this.animate());
        if (this.animationEnabled) {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

            this.webGlRenderer.render(this.threeJsScene, this.camera);
        }
    }

    public updateSize(newSize: {w: number; h: number}): void {
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
