import {containsRelativeBase, relativeBase} from "./route-relative-base.js";
export function setRoutes(routes, replace = false) {
  const path = createPathString(routes);
  if (replace) {
    window.history.replaceState(void 0, "", path);
  } else {
    window.history.pushState(void 0, "", path);
  }
}
export function createPathString(routes) {
  const pathBase = containsRelativeBase() ? `/${relativeBase}` : "";
  return `${pathBase}/${routes.join("/")}`;
}
