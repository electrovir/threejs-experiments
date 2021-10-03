import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

export async function loadModel(loader: GLTFLoader, path: string) {
    return new Promise<GLTF>((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                resolve(gltf);
            },
            undefined,
            (error) => {
                reject(error);
            },
        );
    });
}
