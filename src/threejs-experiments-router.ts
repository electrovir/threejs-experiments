import {check} from '@augment-vir/assert';
import {type FullSpaRoute, SpaRouter} from 'spa-router-vir';

export enum ExperimentsPage {
    Home = 'home',
    SingleColorCube = 'single-color-cube',
    RainbowCube = 'rainbow-cube',
    LoadedModels = 'loaded-models',
}

export type ValidExperimentsPath = [ExperimentsPage];

export type ExperimentsFullRoute = Readonly<
    FullSpaRoute<ValidExperimentsPath, undefined, undefined>
>;

export const defaultRoute: ExperimentsFullRoute = {
    paths: [
        ExperimentsPage.Home,
    ],
    search: undefined,
    hash: undefined,
};

export const threeJsExperimentsRouter = new SpaRouter<ValidExperimentsPath, undefined, undefined>({
    basePath: 'threejs-experiments',
    sanitizeRoute(route) {
        const firstRoute = route.paths[0];

        if (check.isEnumValue(firstRoute, ExperimentsPage)) {
            return {
                ...defaultRoute,
                paths: [
                    firstRoute,
                ],
            };
        } else {
            return defaultRoute;
        }
    },
});
