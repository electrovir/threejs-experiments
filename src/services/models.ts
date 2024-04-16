export enum AvailableModels {
    Bottle = 'bottle',
    Cube = 'cube',
    Sphere = 'sphere',
}

export type ModelToggle = {showing: boolean; model: AvailableModels};
