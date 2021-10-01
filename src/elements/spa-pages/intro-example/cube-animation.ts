import {BoxGeometry, Mesh, MeshBasicMaterial} from 'three';
import {Animation} from '../../../shared-interfaces/animation';

export class CubeAnimation extends Animation {
    constructor(
        canvas: HTMLCanvasElement,
        protected animationEnabled = true,
        private readonly cubeColor = 0x00ff00,
    ) {
        super(canvas, animationEnabled);
    }

    private cube: Mesh<BoxGeometry, MeshBasicMaterial> = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({color: this.cubeColor}),
    );

    protected initScene() {
        this.threeJsScene.add(this.cube);
    }

    protected animate(): boolean {
        if (!this.camera) {
            throw new Error(`Animation started but camera was not found.`);
        }

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.webGlRenderer.render(this.threeJsScene, this.camera);
        return true;
    }
}
