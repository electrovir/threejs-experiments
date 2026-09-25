const {baseConfig} = require('@virmator/spellcheck/configs/cspell.config.base.cjs');

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
