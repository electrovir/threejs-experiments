import {join} from 'path';
import {alwaysReloadPlugin} from './always-reload-plugin';

const viteConfig = {
    rootDir: join(__dirname, '../'),
    target: 'chrome',
    libraryMode: false,
    plugins: [alwaysReloadPlugin()],
    sourceMap: true,
    // root: rootDir,
    envDir: process.cwd(),
    clearScreen: false,
};

export default viteConfig;
