import {DeclarativeElementDefinition} from 'element-vir';
import {ExperimentsPage} from '../../../threejs-experiments-router';
import {VirLoadingModel} from '../main-pages/loaded-models/loaded-models.element';
import {VirSingleColorCube} from '../main-pages/single-color-cube/vir-single-color-cube.element';
import {VirHome} from '../main-pages/vir-home.element';

export const navElement = {
    [ExperimentsPage.Home]: VirHome,
    [ExperimentsPage.LoadedModels]: VirLoadingModel,
    [ExperimentsPage.RainbowCube]: VirSingleColorCube,
    [ExperimentsPage.SingleColorCube]: VirSingleColorCube,
} satisfies Record<ExperimentsPage, DeclarativeElementDefinition>;
