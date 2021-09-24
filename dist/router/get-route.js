export function getRoutes() {
  const path = window.location.pathname;
  const routes = path.split("/");
  return routes.filter((route) => !!route);
}
