import {getRoutes} from './get-route';
import {areRoutesEqual} from './route-equality';
import {setRoutes} from './set-route';

let sanitizationStackDepth = 0;
const maxSanitizationStackDepth = 2;
let listenerCount = 0;

export function addRouteListener<ValidRoutes extends string[]>(
    fireOnCreation: boolean,
    /**
     * Returns sanitized routes. If they differ from the current routes, the current routes are
     * replaced with the sanitized routes output of this callback.
     */
    sanitizeRoutes: (routes: Readonly<string[]>) => Readonly<ValidRoutes>,
    callback: (routes: Readonly<ValidRoutes>) => void,
) {
    listenerCount++;
    if (listenerCount > 1) {
        throw new Error(`Too many listeners to the route, should only have one!`);
    }

    const locationChangeCallback = () => {
        const currentRoutes = getRoutes();
        if (sanitizationStackDepth > maxSanitizationStackDepth) {
            throw new Error(
                `Route sanitization depth has exceed the max of ${maxSanitizationStackDepth} with ${JSON.stringify(
                    currentRoutes,
                )}`,
            );
        }

        const sanitizedRoutes = sanitizeRoutes(currentRoutes);

        if (areRoutesEqual(sanitizedRoutes, currentRoutes)) {
            sanitizationStackDepth = 0;
            callback(sanitizedRoutes);
        } else {
            sanitizationStackDepth++;
            // don't fire the callback cause this listener will get fired after updating the routes
            return setRoutes(sanitizedRoutes, true);
        }
    };
    window.addEventListener(
        // this event is consolidated from static/spa.js
        'locationchange',
        locationChangeCallback,
    );

    if (fireOnCreation) {
        locationChangeCallback();
    }
}
