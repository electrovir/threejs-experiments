export function setRoutes(
    routes: Readonly<string[]>,
    /**
     * Used for a back button or for replacing routes with sanitized routes. In every other case,
     * pass false here or leave it empty (as it defaults to false).
     */
    replace = false,
): void {
    // throw new Error('updating route is not triggering the locationchange listener');
    const path = createPathString(routes);
    if (replace) {
        window.history.replaceState(undefined, '', path);
    } else {
        window.history.pushState(undefined, '', path);
    }
}

export function createPathString(routes: Readonly<string[]>): string {
    return `/${routes.join('/')}`;
}
