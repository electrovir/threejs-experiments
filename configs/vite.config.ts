import {resolve} from 'path';
import {visualizer} from 'rollup-plugin-visualizer';
import {basePlugins, defineConfig} from 'virmator/dist/compiled-base-configs/base-vite';

export default defineConfig(
    {
        forGitHubPages: true,
        packageDirPath: resolve(__dirname, '..'),
    },
    (baseConfig) => {
        return {
            ...baseConfig,
            plugins: [
                ...basePlugins,
                visualizer({filename: 'build-asset-sizes.html'}),
            ],
        };
    },
);
