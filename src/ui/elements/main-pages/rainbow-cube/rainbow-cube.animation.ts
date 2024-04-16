import {
    AmbientLight,
    BoxGeometry,
    Camera,
    HSL,
    Mesh,
    MeshPhysicalMaterial,
    PointLight,
    Scene,
    WebGLRenderer,
} from 'three';
import {ThreeJsAnimation} from '../../../../services/threejs-animation';

export class RainbowCubeAnimation extends ThreeJsAnimation {
    private cubeColor = 0xff0000;
    private cubeSize = 1;

    private cube: Mesh<BoxGeometry, MeshPhysicalMaterial> = new Mesh(
        new BoxGeometry(this.cubeSize),
        new MeshPhysicalMaterial({color: this.cubeColor}),
    );

    constructor() {
        super();
    }

    private addLights(scene: Scene) {
        const pointLightRight = new PointLight(0xffffff, 2, 0);
        pointLightRight.position.set(1, 0, 1);

        const pointLightAbove = new PointLight(0xffffff, 2, 0);
        pointLightAbove.position.set(-0.5, 1, 1);

        const lights = [
            new AmbientLight(0x555555),
            pointLightAbove,
            pointLightRight,
        ];
        lights.forEach((light) => scene.add(light));
    }

    protected override initScene() {
        const scene = new Scene();
        // this.cube.position.set(this.cubeSize + 1, this.cubeSize / 2, 0);
        this.cube.material.clearcoat = 0.5;
        scene.add(this.cube);
        this.addLights(scene);
        return scene;
    }
    private frameCount = 0;

    protected override animate(
        frameTime: number,
        webGlRenderer: WebGLRenderer,
        camera: Camera,
        scene: Scene,
    ): boolean {
        const diff = (frameTime * 60) / 1000;
        ++this.frameCount;
        if (this.frameCount > 100) {
            this.frameCount = 0;
        }

        this.cube.rotation.x += diff * 0.01;
        this.cube.rotation.y += diff * 0.01;
        const currentHsl = this.cube.material.color.getHSL({} as HSL);
        this.cube.material.color.setHSL(currentHsl.h + diff * 0.003, currentHsl.s, currentHsl.l);

        webGlRenderer.render(scene, camera);
        return true;
    }
}
