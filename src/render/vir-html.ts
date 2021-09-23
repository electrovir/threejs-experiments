import {html as litHtml, HTMLTemplateResult} from 'lit';
import {deleteArrayIndexes} from '../augments/array';
import {VirElement} from './vir-element';

type HtmlTemplateTransform = {
    templateStrings: TemplateStringsArray;
    valueIndexDeletions: number[];
};

/**
 * The transformed templates are written to a map so that we can preserve reference equality between
 * calls. Without maintaining referenced equality between html`` calls, lit-element reconstructs all
 * of its children on every render.
 *
 * This is a WeakMap because we only care about the transformed array value as long as the original
 * template array key exists.
 */
const transformedTemplateStrings = new WeakMap<TemplateStringsArray, HtmlTemplateTransform>();

/** Enables interpolation of events names */
export function html(
    inputTemplateStrings: TemplateStringsArray,
    ...inputValues: unknown[]
): HTMLTemplateResult {
    const litTemplate = litHtml(inputTemplateStrings, ...inputValues);
    const alreadyTransformedTemplateStrings = transformedTemplateStrings.get(inputTemplateStrings);
    const templateTransform: HtmlTemplateTransform =
        alreadyTransformedTemplateStrings ?? transformTemplate(litTemplate);

    if (!alreadyTransformedTemplateStrings) {
        transformedTemplateStrings.set(inputTemplateStrings, templateTransform);
    }

    const transformedValuesArray = deleteArrayIndexes(
        litTemplate.values,
        templateTransform.valueIndexDeletions,
    );

    const htmlTemplate: HTMLTemplateResult = {
        ...litTemplate,
        strings: templateTransform.templateStrings,
        values: transformedValuesArray,
    };

    return htmlTemplate;
}

type ValueTransform = (value: unknown) => unknown;
const identityTransform: ValueTransform = <T>(input: T): T => input;
type CheckInput = {lastNewString: string; currentLitString: string; currentValue: unknown};

function currentValueInstanceOf<T extends Function>(
    currentValue: unknown,
    constructor: T,
): currentValue is T {
    return (
        currentValue instanceof constructor ||
        (currentValue as any).prototype instanceof constructor
    );
}

const checksAndTransforms: {
    check: (checkInput: CheckInput) => boolean;
    transform: (value: unknown) => unknown;
}[] = [
    {
        check: ({lastNewString, currentLitString, currentValue}): boolean => {
            const shouldHaveTagNameHere: boolean =
                (lastNewString.trim().endsWith('<') && !!currentLitString.match(/^[\s\n>]/)) ||
                (lastNewString?.trim().endsWith('</') && currentLitString.trim().startsWith('>'));
            const extendsCorrectElement = currentValueInstanceOf(currentValue, VirElement);

            if (shouldHaveTagNameHere && !extendsCorrectElement) {
                console.error({
                    lastNewString,
                    currentLitString,
                    currentValue,
                });
                throw new Error(
                    `Got interpolated tag name but it wasn't of type VirElement: ${
                        (currentValue as any).prototype.constructor.name
                    }`,
                );
            }
            if (extendsCorrectElement && currentValue.tagName === VirElement.tagName) {
                throw new Error(
                    `${currentValue.constructor.name} class must override the 'tagName' property.`,
                );
            }

            return shouldHaveTagNameHere && extendsCorrectElement;
        },
        transform: (input: unknown) =>
            // cast is safe because the check method above verifies that this value is a VirElement
            (input as VirElement).tagName,
    },
    {
        check: ({lastNewString, currentLitString}): boolean => {
            return !!(lastNewString.endsWith('@') && currentLitString.startsWith('='));
        },
        transform: identityTransform,
    },
];

function isCustomElementTag(input: string): boolean {
    if (input.includes('</') && !input.trim().endsWith('</')) {
        const customTagName: boolean = !!input.trim().match(/<\/[\n\s]*(?:[^\s\n-]-)+[\s\n]/);
        return customTagName;
    }
    return false;
}

function stringValidator(input: string): void {
    if (isCustomElementTag(input)) {
        throw new Error(`Tags must be interpolated from their element class: ${input}`);
    }
}

function transformTemplate(litTemplate: HTMLTemplateResult): HtmlTemplateTransform {
    const newStrings: string[] = [];
    const newRaws: string[] = [];
    const valueDeletions: number[] = [];

    litTemplate.strings.forEach((currentLitString, index) => {
        const lastNewStringsIndex = newStrings.length - 1;
        const lastNewString = newStrings[lastNewStringsIndex];
        const currentValueIndex = index - 1;
        const currentValue = litTemplate.values[currentValueIndex];
        let validTransform: ValueTransform | undefined;

        stringValidator(currentLitString);

        if (typeof lastNewString === 'string') {
            validTransform = checksAndTransforms.find((checkAndTransform) => {
                return checkAndTransform.check({lastNewString, currentLitString, currentValue});
            })?.transform;

            if (validTransform) {
                newStrings[lastNewStringsIndex] =
                    lastNewString + validTransform(currentValue) + currentLitString;
                valueDeletions.push(currentValueIndex);
            }
        }
        if (!validTransform) {
            newStrings.push(currentLitString);
        }

        const currentRawLitString = litTemplate.strings.raw[index]!;
        if (validTransform) {
            newRaws[lastNewStringsIndex] =
                newRaws[lastNewStringsIndex]! + validTransform(currentValue) + currentRawLitString;
        } else {
            newRaws.push(currentRawLitString);
        }
    });

    const newTemplateStrings: TemplateStringsArray = Object.assign([], newStrings, {
        raw: newRaws,
    });

    return {
        templateStrings: newTemplateStrings,
        valueIndexDeletions: valueDeletions,
    };
}
