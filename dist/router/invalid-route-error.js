export class InvalidRouteError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidRouteError";
  }
}
