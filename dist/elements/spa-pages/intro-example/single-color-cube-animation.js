import {BoxGeometry, Mesh, MeshBasicMaterial, Scene} from "../../../../_snowpack/pkg/three.js";
import {Animation} from "../../../shared-interfaces/animation.js";
export class SingleColorCubeAnimation extends Animation {
  constructor(cubeColor = 65280) {
    super();
    this.cubeColor = cubeColor;
    this.cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({color: this.cubeColor}));
  }
  initScene() {
    const scene = new Scene();
    scene.add(this.cube);
    return scene;
  }
  animate(frameTime, webGlRenderer, camera, scene) {
    const diff = 0.01 * 60 / 1e3 * frameTime;
    this.cube.rotation.x += diff;
    this.cube.rotation.y += diff;
    webGlRenderer.render(scene, camera);
    return true;
  }
}
