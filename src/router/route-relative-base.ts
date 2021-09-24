/** This is used for GitHub pages */
export const relativeBase = 'threejs-experiments';
export const startingBaseRegExp = new RegExp(`^\\/${relativeBase}`);

export function containsRelativeBase(): boolean {
    return !!window.location.pathname.match(startingBaseRegExp);
}
