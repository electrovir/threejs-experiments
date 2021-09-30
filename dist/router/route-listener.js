import {getRoutes} from "./get-route.js";
import {areRoutesEqual} from "./route-equality.js";
import {setRoutes} from "./set-route.js";
let sanitizationStackDepth = 0;
const maxSanitizationStackDepth = 2;
let listenerCount = 0;
export function addRouteListener(fireOnCreation, sanitizeRoutes, callback) {
  listenerCount++;
  if (listenerCount > 1) {
    throw new Error(`Too many listeners to the route, should only have one!`);
  }
  const locationChangeCallback = () => {
    const currentRoutes = getRoutes();
    if (sanitizationStackDepth > maxSanitizationStackDepth) {
      throw new Error(`Route sanitization depth has exceed the max of ${maxSanitizationStackDepth} with ${JSON.stringify(currentRoutes)}`);
    }
    const sanitizedRoutes = sanitizeRoutes(currentRoutes);
    if (areRoutesEqual(sanitizedRoutes, currentRoutes)) {
      sanitizationStackDepth = 0;
      callback(sanitizedRoutes);
    } else {
      sanitizationStackDepth++;
      return setRoutes(sanitizedRoutes, true);
    }
  };
  window.addEventListener("locationchange", locationChangeCallback);
  if (fireOnCreation) {
    locationChangeCallback();
  }
  return locationChangeCallback;
}
export function removeRouteListener(listener) {
  window.removeEventListener("locationchange", listener);
}
