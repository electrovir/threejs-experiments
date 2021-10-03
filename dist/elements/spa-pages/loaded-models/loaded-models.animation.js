import {
  AmbientLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PointLight,
  Scene,
  SphereGeometry,
  SpotLight
} from "../../../../_snowpack/pkg/three.js";
import {GLTFLoader} from "../../../../_snowpack/pkg/three/examples/jsm/loaders/GLTFLoader.js";
import {loadModel} from "../../../interfaces/model-loader.js";
import {ThreeJsAnimation} from "../../../interfaces/threejs-animation.js";
export var AvailableModels;
(function(AvailableModels2) {
  AvailableModels2["Bottle"] = "bottle";
  AvailableModels2["Cube"] = "cube";
  AvailableModels2["Sphere"] = "sphere";
})(AvailableModels || (AvailableModels = {}));
function setMorphDirections(mesh) {
  if (mesh.morphTargetInfluences) {
    mesh.morphDirections = mesh.morphTargetInfluences.map(() => 0);
    mesh.morphDirections[0] = 1;
  }
}
export const models = {
  [AvailableModels.Bottle]: {
    sourceUrl: "https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/WaterBottle",
    license: {
      name: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    href: "models/WaterBottle.glb",
    callback: (loadedFile) => {
      const bottle = loadedFile.scene;
      bottle.position.set(3, 3, -5);
      bottle.scale.set(10, 10, 10);
      return bottle;
    }
  },
  [AvailableModels.Cube]: {
    sourceUrl: "https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphCube",
    license: {
      name: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    href: "models/AnimatedMorphCube.glb",
    callback: (loadedFile) => {
      const morphCube = loadedFile.scene.children[0];
      morphCube.traverse((child) => {
        if (child instanceof Mesh) {
          child.material = new MeshStandardMaterial({color: 16750848});
        }
      });
      morphCube.position.set(-4, 2, -2);
      setMorphDirections(morphCube);
      return morphCube;
    }
  },
  [AvailableModels.Sphere]: {
    sourceUrl: "https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphSphere",
    license: {
      name: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    href: "models/AnimatedMorphSphere.glb",
    callback: (loadedFile) => {
      const morphSphere = loadedFile.scene.children[0];
      morphSphere.traverse((object) => {
        if (object instanceof Mesh) {
          object.material = new MeshStandardMaterial({color: 3394815});
        }
      });
      morphSphere.position.setY(-2);
      setMorphDirections(morphSphere);
      return morphSphere;
    }
  }
};
function hasMorphDirections(input) {
  return !!input.morphDirections && input instanceof Mesh;
}
function morphMesh(diff, object) {
  if (!hasMorphDirections(object)) {
    throw new Error(`object was supposed to have morph directions`);
  }
  object.rotation.z += diff * 0.01;
  const morphs = object.morphTargetInfluences;
  const morphDirections = object.morphDirections;
  if (morphs) {
    morphs.forEach((_, index) => {
      morphs[index] += morphDirections[index] * diff * 0.01;
      if (morphs[index] >= 1) {
        morphs[index] = 1;
        morphDirections[index] = -1;
      } else if (morphs[index] <= 0 && morphDirections[index] !== 0) {
        morphs[index] = 0;
        morphDirections[index] = 0;
        if (index + 1 in morphDirections) {
          morphDirections[index + 1] = 1;
        } else {
          morphDirections[0] = 1;
        }
      }
    });
  }
}
const modelAnimations = {
  [AvailableModels.Bottle]: (diff, object) => {
    object.rotation.y += diff * 0.01;
  },
  [AvailableModels.Cube]: morphMesh,
  [AvailableModels.Sphere]: morphMesh
};
function lightWithPosition(color, intensity, distance, decay, position) {
  const pointLight = new PointLight(color, intensity, distance, decay);
  pointLight.position.set(...position);
  return pointLight;
}
const _ModelToggledEvent = class extends CustomEvent {
  constructor(input) {
    super(_ModelToggledEvent.eventName, {detail: input, bubbles: true, composed: true});
  }
};
export let ModelToggledEvent = _ModelToggledEvent;
ModelToggledEvent.eventName = "modelToggled";
export class LoadingModelsAnimation extends ThreeJsAnimation {
  constructor() {
    super(...arguments);
    this.scene = new Scene();
    this.loader = new GLTFLoader();
    this.models = {
      [AvailableModels.Cube]: this.loadModel(AvailableModels.Cube),
      [AvailableModels.Bottle]: this.loadModel(AvailableModels.Bottle),
      [AvailableModels.Sphere]: this.loadModel(AvailableModels.Sphere)
    };
    this.insertedModels = {};
  }
  async addLights(scene, addLightVisualizations = false) {
    const waterBottleSpotlight = new SpotLight("white", 7, 0, Math.PI / 16);
    waterBottleSpotlight.position.set(1, 0.5, 2);
    waterBottleSpotlight.target = await this.models[AvailableModels.Bottle];
    const lights = [
      new AmbientLight(4210752),
      lightWithPosition(16777215, 0.8, 20, 1, [-1, 1, 4]),
      lightWithPosition(16777215, 1, 10, 1, [3, 4, -4]),
      waterBottleSpotlight
    ];
    lights.forEach((light) => scene.add(light));
    if (addLightVisualizations) {
      lights.forEach((light) => {
        if (light instanceof AmbientLight) {
          return;
        }
        const lightSphere = new Mesh(new SphereGeometry(0.05), new MeshBasicMaterial({color: light.color}));
        lightSphere.position.set(light.position.x, light.position.y, light.position.z);
        scene.add(lightSphere);
      });
    }
  }
  async loadModel(modelKey) {
    const modelData = models[modelKey];
    const loadResult = await loadModel(this.loader, modelData.href);
    return modelData.callback(loadResult);
  }
  async showModel(show, modelKey) {
    const model = await this.models[modelKey];
    const keyInserted = modelKey in this.insertedModels;
    this.dispatchEvent(new ModelToggledEvent({model: modelKey, showing: show}));
    if (show && !keyInserted) {
      this.insertedModels[modelKey] = model;
      this.scene.add(model);
    } else if (!show && keyInserted) {
      delete this.insertedModels[modelKey];
      this.scene.remove(model);
    }
  }
  initScene(camera) {
    camera.position.set(0, 0, 6);
    this.showModel(true, AvailableModels.Sphere);
    this.showModel(true, AvailableModels.Bottle);
    this.addLights(this.scene);
    return this.scene;
  }
  animate(frameTime, webGlRenderer, camera, scene) {
    const diff = frameTime * 60 / 1e3;
    Object.keys(this.insertedModels).forEach((key) => {
      modelAnimations[key](diff, this.insertedModels[key]);
    });
    webGlRenderer.render(scene, camera);
    return true;
  }
}
