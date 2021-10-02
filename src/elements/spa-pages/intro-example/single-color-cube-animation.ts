import {BoxGeometry, Camera, Mesh, MeshBasicMaterial, Scene, WebGLRenderer} from 'three';
import {ThreeJsAnimation} from '../../../shared-interfaces/animation';

// https://github.com/mrdoob/three.js/blob/1396ee243314d73dd918b0789f260d6c85b5b683/docs/manual/en/introduction/Creating-a-scene.html
export class SingleColorCubeAnimation extends ThreeJsAnimation {
    constructor(private readonly cubeColor = 0x00ff00) {
        super();
    }

    private cube: Mesh<BoxGeometry, MeshBasicMaterial> = new Mesh(
        new BoxGeometry(),
        new MeshBasicMaterial({color: this.cubeColor}),
    );

    protected initScene() {
        const scene = new Scene();
        scene.add(this.cube);
        return scene;
    }

    protected animate(
        frameTime: number,
        webGlRenderer: WebGLRenderer,
        camera: Camera,
        scene: Scene,
    ): boolean {
        const diff = ((0.01 * 60) / 1000) * frameTime;

        this.cube.rotation.x += diff;
        this.cube.rotation.y += diff;

        webGlRenderer.render(scene, camera);
        return true;
    }
}
