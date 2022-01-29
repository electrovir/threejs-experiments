import {UserConfig} from 'vite';
import devConfig from './vite-dev-config';

const viteConfig: UserConfig = {
    ...devConfig,
    base: '/threejs-experiments/',
};

export default viteConfig;
