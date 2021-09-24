import {startingBaseRegExp} from "./route-relative-base.js";
export function getRoutes() {
  const path = window.location.pathname.replace(startingBaseRegExp, "");
  const routes = path.split("/");
  return routes.filter((route) => !!route);
}
