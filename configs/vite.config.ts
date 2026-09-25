import {defineConfig} from '@virmator/frontend/configs/vite.config.base.js';
import {resolve} from 'node:path';
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig(
    {
        forGitHubPages: true,
        packageDirPath: resolve(import.meta.dirname, '..'),
    },
    (baseConfig) => {
        return {
            ...baseConfig,
            plugins: [
                ...(baseConfig.plugins || []),
                visualizer({
                    filename: 'build-asset-sizes.html',
                }),
            ],
        };
    },
);
