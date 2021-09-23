import {html as litHtml, HTMLTemplateResult} from 'lit';
import {deleteArrayIndexes} from '../augments/array';

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

function transformTemplate(litTemplate: HTMLTemplateResult): HtmlTemplateTransform {
    const newStrings: string[] = [];
    const newRaws: string[] = [];
    const valueDeletions: number[] = [];

    litTemplate.strings.forEach((_, index) => {
        const currentLitString = litTemplate.strings[index]!;
        const lastNewStringsIndex = newStrings.length - 1;
        const lastNewString = newStrings[lastNewStringsIndex];
        let insertedEventName = false;

        if (lastNewString?.endsWith('@') && currentLitString.startsWith('=')) {
            newStrings[lastNewStringsIndex] =
                lastNewString + litTemplate.values[index - 1] + currentLitString;
            valueDeletions.push(index - 1);
            insertedEventName = true;
        } else {
            newStrings.push(currentLitString);
        }

        const currentRawLitString = litTemplate.strings.raw[index]!;
        if (insertedEventName) {
            newRaws[lastNewStringsIndex] =
                newRaws[lastNewStringsIndex]! + litTemplate.values[index - 1] + currentRawLitString;
        } else {
            newRaws.push(currentRawLitString);
        }
    });

    const newTemplateStrings: TemplateStringsArray = Object.assign([], newStrings, {
        raw: newRaws,
    });

    return {templateStrings: newTemplateStrings, valueIndexDeletions: valueDeletions};
}
