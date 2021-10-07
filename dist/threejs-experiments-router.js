import {isEnumValue} from "../_snowpack/pkg/augment-vir.js";
import {createSpaRouter} from "../_snowpack/pkg/spa-router-vir.js";
export var ExperimentRoute;
(function(ExperimentRoute2) {
  ExperimentRoute2["Home"] = "home";
  ExperimentRoute2["SingleColorCube"] = "single-color-cube";
  ExperimentRoute2["RainbowCube"] = "rainbow-cube";
  ExperimentRoute2["LoadedModels"] = "loaded-models";
})(ExperimentRoute || (ExperimentRoute = {}));
export const threeJsExperimentsRouter = createSpaRouter({
  defaultRoute: [ExperimentRoute.Home],
  maxListenerCount: 1,
  routeBase: "threejs-experiments",
  routeSanitizer: (routes) => {
    const firstRoute = routes[0];
    if (!isEnumValue(firstRoute, ExperimentRoute)) {
      return threeJsExperimentsRouter.initParams.defaultRoute;
    } else {
      return [firstRoute];
    }
  }
});
