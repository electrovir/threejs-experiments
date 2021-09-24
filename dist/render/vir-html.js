import {html as litHtml} from "../../_snowpack/pkg/lit.js";
import {deleteArrayIndexes} from "../augments/array.js";
import {VirElement} from "./vir-element.js";
const transformedTemplateStrings = new WeakMap();
export function html(inputTemplateStrings, ...inputValues) {
  const litTemplate = litHtml(inputTemplateStrings, ...inputValues);
  const alreadyTransformedTemplateStrings = transformedTemplateStrings.get(inputTemplateStrings);
  const templateTransform = alreadyTransformedTemplateStrings ?? transformTemplate(litTemplate);
  if (!alreadyTransformedTemplateStrings) {
    transformedTemplateStrings.set(inputTemplateStrings, templateTransform);
  }
  const transformedValuesArray = deleteArrayIndexes(litTemplate.values, templateTransform.valueIndexDeletions);
  const htmlTemplate = {
    ...litTemplate,
    strings: templateTransform.templateStrings,
    values: transformedValuesArray
  };
  return htmlTemplate;
}
const identityTransform = (input) => input;
function currentValueInstanceOf(currentValue, constructor) {
  return currentValue instanceof constructor || currentValue.prototype instanceof constructor;
}
const checksAndTransforms = [
  {
    check: ({lastNewString, currentLitString, currentValue}) => {
      const shouldHaveTagNameHere = lastNewString.trim().endsWith("<") && !!currentLitString.match(/^[\s\n>]/) || lastNewString?.trim().endsWith("</") && currentLitString.trim().startsWith(">");
      const extendsCorrectElement = currentValueInstanceOf(currentValue, VirElement);
      if (shouldHaveTagNameHere && !extendsCorrectElement) {
        console.error({
          lastNewString,
          currentLitString,
          currentValue
        });
        throw new Error(`Got interpolated tag name but it wasn't of type VirElement: ${currentValue.prototype.constructor.name}`);
      }
      if (extendsCorrectElement && currentValue.tagName === VirElement.tagName) {
        throw new Error(`${currentValue.constructor.name} class must override the 'tagName' property.`);
      }
      return shouldHaveTagNameHere && extendsCorrectElement;
    },
    transform: (input) => input.tagName
  },
  {
    check: ({lastNewString, currentLitString}) => {
      return !!(lastNewString.endsWith("@") && currentLitString.startsWith("="));
    },
    transform: identityTransform
  }
];
function isCustomElementTag(input) {
  if (input.includes("</") && !input.trim().endsWith("</")) {
    const customTagName = !!input.trim().match(/<\/[\n\s]*(?:[^\s\n-]-)+[\s\n]/);
    return customTagName;
  }
  return false;
}
function stringValidator(input) {
  if (isCustomElementTag(input)) {
    throw new Error(`Tags must be interpolated from their element class: ${input}`);
  }
}
function transformTemplate(litTemplate) {
  const newStrings = [];
  const newRaws = [];
  const valueDeletions = [];
  litTemplate.strings.forEach((currentLitString, index) => {
    const lastNewStringsIndex = newStrings.length - 1;
    const lastNewString = newStrings[lastNewStringsIndex];
    const currentValueIndex = index - 1;
    const currentValue = litTemplate.values[currentValueIndex];
    let validTransform;
    stringValidator(currentLitString);
    if (typeof lastNewString === "string") {
      validTransform = checksAndTransforms.find((checkAndTransform) => {
        return checkAndTransform.check({lastNewString, currentLitString, currentValue});
      })?.transform;
      if (validTransform) {
        newStrings[lastNewStringsIndex] = lastNewString + validTransform(currentValue) + currentLitString;
        valueDeletions.push(currentValueIndex);
      }
    }
    if (!validTransform) {
      newStrings.push(currentLitString);
    }
    const currentRawLitString = litTemplate.strings.raw[index];
    if (validTransform) {
      newRaws[lastNewStringsIndex] = newRaws[lastNewStringsIndex] + validTransform(currentValue) + currentRawLitString;
    } else {
      newRaws.push(currentRawLitString);
    }
  });
  const newTemplateStrings = Object.assign([], newStrings, {
    raw: newRaws
  });
  return {
    templateStrings: newTemplateStrings,
    valueIndexDeletions: valueDeletions
  };
}
