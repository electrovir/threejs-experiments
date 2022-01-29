import {isEnumValue} from 'augment-vir';
import {createSpaRouter, SpaRouter} from 'spa-router-vir';
import {FullRoute} from '../node_modules/spa-router-vir/dist/router/full-route';

export enum ExperimentsPage {
    Home = 'home',
    SingleColorCube = 'single-color-cube',
    RainbowCube = 'rainbow-cube',
    LoadedModels = 'loaded-models',
}

export type ValidExperimentsPath = [ExperimentsPage];

export type ExperimentsFullRoute = Required<Readonly<FullRoute<ValidExperimentsPath>>>;

export const defaultRoute: ExperimentsFullRoute = {
    paths: [ExperimentsPage.Home],
    search: undefined,
    hash: undefined,
};

export const threeJsExperimentsRouter: SpaRouter<ValidExperimentsPath> =
    createSpaRouter<ValidExperimentsPath>({
        maxListenerCount: 1,
        routeBase: 'threejs-experiments',
        routeSanitizer: (route): ExperimentsFullRoute => {
            const firstRoute = route.paths[0];

            if (isEnumValue(firstRoute, ExperimentsPage)) {
                return {
                    ...defaultRoute,
                    paths: [firstRoute],
                };
            } else {
                return defaultRoute;
            }
        },
    });
