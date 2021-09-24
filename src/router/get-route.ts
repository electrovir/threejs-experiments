import {startingBaseRegExp} from './route-relative-base';

export function getRoutes(): Readonly<string[]> {
    // remove the relative base if it exists
    const path = window.location.pathname.replace(startingBaseRegExp, '');
    const routes = path.split('/');
    return routes.filter((route) => !!route);
}
