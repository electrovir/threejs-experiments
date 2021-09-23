export function getRoutes(): Readonly<string[]> {
    const path = window.location.pathname;
    const routes = path.split('/');
    return routes.filter((route) => !!route);
}
