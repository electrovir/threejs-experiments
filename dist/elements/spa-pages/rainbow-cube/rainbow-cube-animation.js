import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PointLight,
  Scene
} from "../../../../_snowpack/pkg/three.js";
import {ThreeJsAnimation} from "../../../shared-interfaces/animation.js";
export class RainbowCubeAnimation extends ThreeJsAnimation {
  constructor(cubeColor = 16711680, cubeSize = 1) {
    super();
    this.cubeColor = cubeColor;
    this.cubeSize = cubeSize;
    this.cube = new Mesh(new BoxGeometry(this.cubeSize), new MeshPhysicalMaterial({color: this.cubeColor}));
    this.frameCount = 0;
  }
  addLights(scene) {
    const pointLightRight = new PointLight(16777215, 1, 10);
    pointLightRight.position.set(1, 0, 1);
    const pointLightAbove = new PointLight(16777215, 1, 10);
    pointLightAbove.position.set(-0.5, 1, 1);
    const lights = [new AmbientLight(4210752), pointLightAbove, pointLightRight];
    lights.forEach((light) => scene.add(light));
  }
  initScene() {
    const scene = new Scene();
    this.cube.material.clearcoat = 0.5;
    scene.add(this.cube);
    this.addLights(scene);
    return scene;
  }
  animate(frameTime, webGlRenderer, camera, scene) {
    const diff = frameTime * 60 / 1e3;
    ++this.frameCount;
    if (this.frameCount > 100) {
      this.frameCount = 0;
    }
    this.cube.rotation.x += diff * 0.01;
    this.cube.rotation.y += diff * 0.01;
    const currentHsl = this.cube.material.color.getHSL({});
    this.cube.material.color.setHSL(currentHsl.h + diff * 3e-3, currentHsl.s, currentHsl.l);
    webGlRenderer.render(scene, camera);
    return true;
  }
}
