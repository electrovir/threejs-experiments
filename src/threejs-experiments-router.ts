import {isEnumValue} from 'augment-vir';
import {createSpaRouter, SpaRouter} from 'spa-router-vir';

export enum ExperimentRoute {
    Home = 'home',
    SingleColorCube = 'single-color-cube',
    RainbowCube = 'rainbow-cube',
    LoadedModels = 'loaded-models',
}

export type ValidThreeJsRoutes = [ExperimentRoute];

export const threeJsExperimentsRouter: SpaRouter<ValidThreeJsRoutes> =
    createSpaRouter<ValidThreeJsRoutes>({
        defaultRoute: [ExperimentRoute.Home],
        maxListenerCount: 1,
        routeBase: 'threejs-experiments',
        routeSanitizer: (routes) => {
            const firstRoute = routes[0];

            if (!isEnumValue(firstRoute, ExperimentRoute)) {
                return threeJsExperimentsRouter.initParams.defaultRoute;
            } else {
                return [firstRoute];
            }
        },
    });
