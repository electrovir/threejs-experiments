import {type DeclarativeElementDefinition} from 'element-vir';
import {ExperimentsPage} from '../../../threejs-experiments-router.js';
import {VirLoadedModels} from '../main-pages/loaded-models/vir-loaded-models.element.js';
import {VirRainbowCube} from '../main-pages/rainbow-cube/vir-rainbow-cube.element.js';
import {VirSingleColorCube} from '../main-pages/single-color-cube/vir-single-color-cube.element.js';
import {VirHome} from '../main-pages/vir-home.element.js';

export const navElement = {
    [ExperimentsPage.Home]: VirHome,
    [ExperimentsPage.LoadedModels]: VirLoadedModels,
    [ExperimentsPage.RainbowCube]: VirRainbowCube,
    [ExperimentsPage.SingleColorCube]: VirSingleColorCube,
} satisfies Record<ExperimentsPage, DeclarativeElementDefinition>;
