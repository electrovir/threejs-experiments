import {containsRelativeBase, relativeBase} from './route-relative-base';
export function setRoutes(
    routes: Readonly<string[]>,
    /**
     * Used for a back button or for replacing routes with sanitized routes. In every other case,
     * pass false here or leave it empty (as it defaults to false).
     */
    replace = false,
): void {
    const path = createPathString(routes);
    if (replace) {
        window.history.replaceState(undefined, '', path);
    } else {
        window.history.pushState(undefined, '', path);
    }
}

export function createPathString(routes: Readonly<string[]>): string {
    const pathBase = containsRelativeBase() ? `/${relativeBase}` : '';
    return `${pathBase}/${routes.join('/')}`;
}
