import {dirname} from 'path';
import {UserConfig} from 'vite';
import {alwaysReloadPlugin} from './always-reload-plugin';

const viteConfig: UserConfig = {
    root: dirname(dirname(__dirname)),
    plugins: [alwaysReloadPlugin()],
    envDir: process.cwd(),
    clearScreen: false,
};

export default viteConfig;
