import {BoxGeometry, Mesh, MeshBasicMaterial} from "../../../../_snowpack/pkg/three.js";
import {Animation} from "../../../shared-interfaces/animation.js";
export class CubeAnimation extends Animation {
  constructor(canvas, animationEnabled = true, cubeColor = 65280) {
    super(canvas, animationEnabled);
    this.animationEnabled = animationEnabled;
    this.cubeColor = cubeColor;
    this.cube = new Mesh(new BoxGeometry(), new MeshBasicMaterial({color: this.cubeColor}));
  }
  initScene() {
    this.threeJsScene.add(this.cube);
  }
  animate() {
    if (!this.camera) {
      throw new Error(`Animation started but camera was not found.`);
    }
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.webGlRenderer.render(this.threeJsScene, this.camera);
    return true;
  }
}
