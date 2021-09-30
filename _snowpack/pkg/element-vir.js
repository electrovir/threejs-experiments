import { n, r } from './common/lit-element-71006d11.js';
import { T, y } from './common/lit-html-7e28c940.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i(e,n)}

function eventInit() {
    const customEventElement = class extends ElementEvent {
    };
    return customEventElement;
}
class ElementEvent extends CustomEvent {
    constructor(eventInitInfo, initDetail) {
        super(String(eventInitInfo.eventName), { detail: initDetail, bubbles: true, composed: true });
        this.eventInitInfo = eventInitInfo;
        this.eventName = String(this.eventInitInfo.eventName);
    }
}
function createEventDescriptorMap(eventsInit) {
    if (!eventsInit) {
        return {};
    }
    return Object.keys(eventsInit)
        .filter((currentKey) => {
        if (typeof currentKey !== 'string') {
            throw new Error(`Expected event key of type string but got type "${typeof currentKey}" for key ${currentKey}`);
        }
        return true;
    })
        .reduce((accum, currentKey) => {
        const eventObject = {
            eventName: currentKey,
            eventConstructor: eventsInit[currentKey],
        };
        accum[currentKey] = eventObject;
        return accum;
    }, {});
}

function assertValidPropertyName(propertyName, propsInitMap, elementTagName) {
    if (typeof propertyName !== 'string') {
        throw new Error(`Property name must be a string, got type "${typeof propertyName}" from: "${String(propertyName)}" for ${elementTagName}`);
    }
    if (!(propertyName in propsInitMap)) {
        throw new Error(`Property name "${propertyName}" does not exist on ${elementTagName}.`);
    }
}
function createPropertyProxy(propsInitMap, element) {
    if (!propsInitMap) {
        return {};
    }
    const props = Object.keys(propsInitMap).reduce((accum, propertyName) => {
        accum[propertyName] = element[propertyName];
        return accum;
    }, {});
    const propsProxy = new Proxy(props, {
        get: (_target, propertyName) => {
            assertValidPropertyName(propertyName, propsInitMap, element.tagName);
            return element[propertyName];
        },
        set: (_target, propertyName, value) => {
            assertValidPropertyName(propertyName, propsInitMap, element.tagName);
            element[propertyName] = value;
            return true;
        },
    });
    return propsProxy;
}
function createPropertyDescriptorMap(propertyInit) {
    if (!propertyInit) {
        return {};
    }
    return Object.keys(propertyInit)
        .filter((key) => {
        if (typeof key === 'string') {
            return true;
        }
        else {
            throw new Error(`Property init cannot have non string keys: "${key}"`);
        }
    })
        .reduce((accum, currentKey) => {
        accum[currentKey] = {
            propName: currentKey,
            initValue: propertyInit[currentKey],
        };
        return accum;
    }, {});
}

class FunctionalElementBaseClass extends n {
}

function createRenderParams(element, eventsMap) {
    const renderParams = {
        dispatchEvent: (event) => element.dispatchEvent(event),
        defaultDispatchEvent: element.dispatchEvent,
        props: element.instanceProps,
        events: eventsMap,
    };
    return renderParams;
}

function defineFunctionalElement(functionalElementInit) {
    var _a;
    const eventsMap = createEventDescriptorMap(functionalElementInit.events);
    const anonymousClass = (_a = class extends FunctionalElementBaseClass {
            constructor() {
                super();
                this.instanceProps = createPropertyProxy(functionalElementInit.props, this);
                const initProps = functionalElementInit.props || {};
                Object.keys(initProps).forEach((propName) => {
                    const functionalElementInstance = this;
                    e()(functionalElementInstance, propName);
                    functionalElementInstance[propName] = initProps[propName];
                });
            }
            createRenderParams() {
                return createRenderParams(this, eventsMap);
            }
            render() {
                return functionalElementInit.renderCallback(this.createRenderParams());
            }
            connectedCallback() {
                var _a;
                super.connectedCallback();
                (_a = functionalElementInit.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(functionalElementInit, {
                    element: this,
                    ...this.createRenderParams(),
                });
            }
            disconnectedCallback() {
                var _a;
                super.disconnectedCallback();
                (_a = functionalElementInit.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(functionalElementInit, {
                    element: this,
                    ...this.createRenderParams(),
                });
            }
            firstUpdated() {
                var _a;
                (_a = functionalElementInit.firstUpdated) === null || _a === void 0 ? void 0 : _a.call(functionalElementInit, {
                    element: this,
                    ...this.createRenderParams(),
                });
            }
        },
        _a.tagName = functionalElementInit.tagName,
        _a.styles = functionalElementInit.styles || r ``,
        _a.propNames = Object.keys(functionalElementInit.props || {}),
        _a.events = eventsMap,
        _a.renderCallback = functionalElementInit.renderCallback,
        _a.props = createPropertyDescriptorMap(functionalElementInit.props),
        _a);
    window.customElements.define(functionalElementInit.tagName, anonymousClass);
    return anonymousClass;
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

function extractFunctionalElement(partInfo) {
    if (partInfo.type !== t.ELEMENT) {
        throw new Error(`assign directive can only be attached directly to an element.`);
    }
    const element = partInfo.element;
    if (!(element instanceof FunctionalElementBaseClass)) {
        throw new Error(`assign directive only works when attached to functional elements`);
    }
    return element;
}

/**
 * The directive generics (in listenDirective) are not strong enough to maintain their values. Thus,
 * the directive call is wrapped in this function.
 */
function listen(eventType, listener) {
    return listenDirective(eventType, listener);
}
const listenDirective = e$1(class extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        this.element = extractFunctionalElement(partInfo);
    }
    resetListener(listenerMetaData) {
        if (this.lastListenerMetaData) {
            this.element.removeEventListener(this.lastListenerMetaData.eventType, this.lastListenerMetaData.listener);
        }
        this.element.addEventListener(listenerMetaData.eventType, listenerMetaData.listener);
        this.lastListenerMetaData = listenerMetaData;
    }
    createListenerMetaData(eventType, callback) {
        return {
            eventType,
            callback,
            listener: (event) => { var _a; return (_a = this.lastListenerMetaData) === null || _a === void 0 ? void 0 : _a.callback(event); },
        };
    }
    render(eventObject, callback) {
        const eventType = eventObject.eventName;
        if (typeof eventType !== 'string') {
            throw new Error(`Cannot listen to an event with a name that is not a string. Given event name: "${eventType}"`);
        }
        if (this.lastListenerMetaData && this.lastListenerMetaData.eventType === eventType) {
            /**
             * Store the callback here so we don't have to update the attached listener every
             * time the callback is updated.
             */
            this.lastListenerMetaData.callback = callback;
        }
        else {
            this.resetListener(this.createListenerMetaData(eventType, callback));
        }
        return T;
    }
});

/**
 * The directive generics (in listenDirective) are not strong enough to maintain their values. Thus,
 * the directive call is wrapped in this function.
 */
function assign(propertyDescriptor, value) {
    return assignDirective(propertyDescriptor.propName, value);
}
const assignDirective = e$1(class extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        this.element = extractFunctionalElement(partInfo);
    }
    render(propName, value) {
        if (!(propName in this.element.instanceProps)) {
            throw new Error(`${this.element.tagName} element has no property of name "${propName}"`);
        }
        this.element.instanceProps[propName] = value;
        return T;
    }
});

function deleteArrayIndexes(array, indexes) {
    return array.filter((_, index) => !indexes.includes(index));
}

function hasStaticTagName(currentValue) {
    return typeof currentValue == 'function' && currentValue.hasOwnProperty('tagName');
}
function makeCheckTransform(name, check, transform) {
    return {
        name,
        check,
        transform,
    };
}
const checksAndTransforms = [
    makeCheckTransform('tag name interpolation', (lastNewString, currentLitString, currentValue) => {
        const shouldHaveTagNameHere = (lastNewString.trim().endsWith('<') && !!currentLitString.match(/^[\s\n>]/)) ||
            ((lastNewString === null || lastNewString === void 0 ? void 0 : lastNewString.trim().endsWith('</')) && currentLitString.trim().startsWith('>'));
        const staticTagName = hasStaticTagName(currentValue);
        if (shouldHaveTagNameHere && !staticTagName) {
            console.error({
                lastNewString,
                currentLitString,
                currentValue,
            });
            throw new Error(`Got interpolated tag name but it wasn't of type VirElement: ${currentValue.prototype.constructor.name}`);
        }
        return shouldHaveTagNameHere && staticTagName;
    }, (input) => 
    // cast is safe because the check method above verifies that this value is a VirElement
    input.tagName),
];
function isCustomElementTag(input) {
    if (input.includes('</') && !input.trim().endsWith('</')) {
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
        var _a;
        const lastNewStringsIndex = newStrings.length - 1;
        const lastNewString = newStrings[lastNewStringsIndex];
        const currentValueIndex = index - 1;
        const currentValue = litTemplate.values[currentValueIndex];
        let validTransform;
        stringValidator(currentLitString);
        if (typeof lastNewString === 'string') {
            validTransform = (_a = checksAndTransforms.find((checkAndTransform) => {
                return checkAndTransform.check(lastNewString, currentLitString, currentValue);
            })) === null || _a === void 0 ? void 0 : _a.transform;
            if (validTransform) {
                newStrings[lastNewStringsIndex] =
                    lastNewString + validTransform(currentValue) + currentLitString;
                valueDeletions.push(currentValueIndex);
            }
        }
        if (!validTransform) {
            newStrings.push(currentLitString);
        }
        const currentRawLitString = litTemplate.strings.raw[index];
        if (validTransform) {
            newRaws[lastNewStringsIndex] =
                newRaws[lastNewStringsIndex] + validTransform(currentValue) + currentRawLitString;
        }
        else {
            newRaws.push(currentRawLitString);
        }
    });
    const newTemplateStrings = Object.assign([], newStrings, {
        raw: newRaws,
    });
    return {
        templateStrings: newTemplateStrings,
        valueIndexDeletions: valueDeletions,
    };
}

/**
 * The transformed templates are written to a map so that we can preserve reference equality between
 * calls. Without maintaining referenced equality between html`` calls, lit-element reconstructs all
 * of its children on every render.
 *
 * This is a WeakMap because we only care about the transformed array value as long as the original
 * template array key exists.
 */
const transformedTemplateStrings = new WeakMap();
/** Enables interpolation of events names */
function html(inputTemplateStrings, ...inputValues) {
    const litTemplate = y(inputTemplateStrings, ...inputValues);
    const alreadyTransformedTemplateStrings = transformedTemplateStrings.get(inputTemplateStrings);
    const templateTransform = alreadyTransformedTemplateStrings !== null && alreadyTransformedTemplateStrings !== void 0 ? alreadyTransformedTemplateStrings : transformTemplate(litTemplate);
    if (!alreadyTransformedTemplateStrings) {
        transformedTemplateStrings.set(inputTemplateStrings, templateTransform);
    }
    const transformedValuesArray = deleteArrayIndexes(litTemplate.values, templateTransform.valueIndexDeletions);
    const htmlTemplate = {
        ...litTemplate,
        strings: templateTransform.templateStrings,
        values: transformedValuesArray,
    };
    return htmlTemplate;
}

export { ElementEvent, assign, defineFunctionalElement, eventInit, html, listen };
