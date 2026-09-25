import {assertWrap} from '@augment-vir/assert';
import {getObjectTypedEntries} from '@augment-vir/common';
import {
    AmbientLight,
    type Camera,
    type ColorRepresentation,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    type Object3D,
    PointLight,
    Scene,
    SphereGeometry,
    SpotLight,
} from 'three';
import {type GLTF, GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {AvailableModels} from '../../../../services/models.js';
import {
    type AnimateParams,
    ModelToggleEvent,
    ThreeJsAnimation,
} from '../../../../services/threejs-animation.js';

function setMorphDirections(mesh: Mesh & {morphDirections?: number[]}) {
    if (mesh.morphTargetInfluences) {
        mesh.morphDirections = mesh.morphTargetInfluences.map(() => 0);
        mesh.morphDirections[0] = 1;
    }
}

type ModelData = {
    sourceUrl: string;
    license: {name: string; url: string};
    href: string;
    callback: (loadResult: GLTF) => Object3D;
};

export const models: Record<AvailableModels, ModelData> = {
    [AvailableModels.Bottle]: {
        sourceUrl:
            'https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/WaterBottle',
        license: {
            name: 'CC0',
            url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        href: 'models/WaterBottle.glb',
        callback(loadedFile) {
            const bottle = loadedFile.scene;
            bottle.position.set(3, 3, -5);
            bottle.scale.set(10, 10, 10);
            return bottle;
        },
    },
    [AvailableModels.Cube]: {
        sourceUrl:
            'https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphCube',
        license: {
            name: 'CC0',
            url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        href: 'models/AnimatedMorphCube.glb',
        callback(loadedFile) {
            const morphCube = assertWrap.isDefined(loadedFile.scene.children[0]) as Mesh & {
                morphDirections?: number[];
            };

            morphCube.traverse((child) => {
                if (child instanceof Mesh) {
                    child.material = new MeshStandardMaterial({
                        color: 0xff_99_00,
                    });
                }
            });
            morphCube.position.set(-4, 2, -2);
            setMorphDirections(morphCube);
            return morphCube;
        },
    },
    [AvailableModels.Sphere]: {
        sourceUrl:
            'https://github.com/KhronosGroup/glTF-Sample-Models/tree/a6cc02ac66d4fe7fbac622f9a9e5e5d9aab011f4/2.0/AnimatedMorphSphere',
        license: {
            name: 'CC0',
            url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
        href: 'models/AnimatedMorphSphere.glb',
        callback(loadedFile) {
            const morphSphere = assertWrap.isDefined(loadedFile.scene.children[0]) as Mesh & {
                morphDirections?: number[];
            };
            morphSphere.traverse((object) => {
                if (object instanceof Mesh) {
                    object.material = new MeshStandardMaterial({
                        color: 0x33_cc_ff,
                    });
                }
            });
            morphSphere.position.setY(-2);
            setMorphDirections(morphSphere);
            return morphSphere;
        },
    },
} as const;

type MeshWithDirections = Mesh & {morphDirections: number[]};

function hasMorphDirections(input: any): input is MeshWithDirections {
    return !!input.morphDirections && input instanceof Mesh;
}

function morphMesh(diff: number, object: Object3D) {
    if (!hasMorphDirections(object)) {
        throw new Error('object was supposed to have morph directions');
    }
    object.rotation.z += diff * 0.01;
    const morphs = object.morphTargetInfluences;
    const morphDirections = object.morphDirections;
    if (morphs) {
        morphs.forEach((morph, index) => {
            const newMorph = morph + (morphDirections[index] ?? 0) * diff * 0.01;
            morphs[index] = newMorph;
            if (newMorph >= 1) {
                morphs[index] = 1;
                morphDirections[index] = -1;
            } else if (newMorph <= 0 && morphDirections[index] !== 0) {
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

const modelAnimations: Record<AvailableModels, (diff: number, input: Object3D) => void> = {
    [AvailableModels.Bottle](diff, object) {
        object.rotation.y += diff * 0.01;
    },
    [AvailableModels.Cube]: morphMesh,
    [AvailableModels.Sphere]: morphMesh,
};

function lightWithPosition({
    color,
    intensity,
    distance,
    position,
}: Readonly<{
    color: ColorRepresentation;
    intensity: number;
    distance: number;
    position: [
        number,
        number,
        number,
    ];
}>) {
    const pointLight = new PointLight(color, intensity, distance);
    pointLight.position.set(...position);
    return pointLight;
}

// https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models

export class LoadedModelsAnimation extends ThreeJsAnimation {
    protected async addLights(
        scene: Scene,
        /** For debugging, set to true. */
        addLightVisualizations = false,
    ) {
        const waterBottleSpotlight = new SpotLight('white', 700, 0, Math.PI / 16);
        waterBottleSpotlight.position.set(1, 0.5, 2);
        waterBottleSpotlight.target = await this.models[AvailableModels.Bottle];
        const lights = [
            new AmbientLight(0x55_55_55),
            lightWithPosition({
                color: 0xff_ff_ff,
                intensity: 50,
                distance: 0,
                position: [
                    -1,
                    1,
                    4,
                ],
            }),
            // lightWithPosition(0xffffff, 1, 20, 1, [1, 0, -3]),
            lightWithPosition({
                color: 0xff_ff_ff,
                intensity: 10,
                distance: 0,
                position: [
                    3,
                    4,
                    -4,
                ],
            }),
            waterBottleSpotlight,
        ];
        lights.forEach((light) => scene.add(light));
        if (addLightVisualizations) {
            lights.forEach((light) => {
                if (light instanceof AmbientLight) {
                    return;
                }
                const lightSphere = new Mesh(
                    new SphereGeometry(0.05),
                    new MeshBasicMaterial({
                        color: light.color,
                    }),
                );
                lightSphere.position.set(light.position.x, light.position.y, light.position.z);
                scene.add(lightSphere);
            });
        }
    }

    protected override scene = new Scene();
    protected loader = new GLTFLoader();

    protected async loadModel(modelKey: AvailableModels) {
        const modelData: ModelData = models[modelKey];
        const loadResult = await this.loader.loadAsync(modelData.href);
        return modelData.callback(loadResult);
    }

    protected models: Readonly<Record<AvailableModels, Promise<Object3D>>> = {
        [AvailableModels.Cube]: this.loadModel(AvailableModels.Cube),
        [AvailableModels.Bottle]: this.loadModel(AvailableModels.Bottle),
        [AvailableModels.Sphere]: this.loadModel(AvailableModels.Sphere),
    };

    public async showModel(show: boolean, modelKey: AvailableModels) {
        const model = await this.models[modelKey];
        const keyInserted = modelKey in this.insertedModels;
        this.dispatch(
            new ModelToggleEvent({
                detail: {
                    model: modelKey,
                    showing: show,
                },
            }),
        );
        if (show && !keyInserted) {
            this.insertedModels[modelKey] = model;
            this.scene.add(model);
        } else if (!show && keyInserted) {
            delete this.insertedModels[modelKey];
            this.scene.remove(model);
        }
    }

    protected insertedModels: Partial<Record<AvailableModels, Object3D>> = {};

    protected override initScene(camera: Camera) {
        camera.position.set(0, 0, 6);

        void this.showModel(true, AvailableModels.Sphere);
        void this.showModel(true, AvailableModels.Bottle);
        void this.addLights(this.scene);
        return this.scene;
    }

    protected override animate({
        frameTime,
        webGlRenderer,
        camera,
        scene,
    }: Readonly<AnimateParams>): boolean {
        const diff = (frameTime * 60) / 1000;
        getObjectTypedEntries(this.insertedModels).forEach(
            ([
                key,
                model,
            ]) => {
                modelAnimations[key](diff, model);
            },
        );
        webGlRenderer.render(scene, camera);
        return true;
    }
}
