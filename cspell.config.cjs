const {baseConfig} = require('virmator/base-configs/base-cspell.js');

module.exports = {
    ...baseConfig,
    ignorePaths: [
        ...baseConfig.ignorePaths,
        'www-static/models/',
        'build-asset-sizes.html',
    ],
    words: [
        ...baseConfig.words,
        'gltf',
        'clearcoat',
    ],
};
