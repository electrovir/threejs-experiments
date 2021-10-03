export async function loadModel(loader, path) {
  return new Promise((resolve, reject) => {
    loader.load(path, (gltf) => {
      resolve(gltf);
    }, void 0, (error) => {
      reject(error);
    });
  });
}
