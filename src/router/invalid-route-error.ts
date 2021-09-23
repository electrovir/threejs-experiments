export class InvalidRouteError extends Error {
    public name = 'InvalidRouteError';
    constructor(message: string) {
        super(message);
    }
}
