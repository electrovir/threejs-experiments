import { n as n$1, r as r$2 } from './common/lit-element-989d7d0e.js';
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

class FunctionalElementBaseClass extends n$1 {
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
        },
        _a.tagName = functionalElementInit.tagName,
        _a.styles = functionalElementInit.styles || r$2 ``,
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
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=o=>void 0===o.strings;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=(i,t)=>{var s,o;const n=i._$AN;if(void 0===n)return !1;for(const i of n)null===(o=(s=i)._$AO)||void 0===o||o.call(s,t,!1),e$2(i,t);return !0},o=i=>{let t,s;do{if(void 0===(t=i._$AM))break;s=t._$AN,s.delete(i),i=t;}while(0===(null==s?void 0:s.size))},n=i=>{for(let t;t=i._$AM;i=t){let s=t._$AN;if(void 0===s)t._$AN=s=new Set;else if(s.has(i))break;s.add(i),l(t);}};function r$1(i){void 0!==this._$AN?(o(this),this._$AM=i,n(this)):this._$AM=i;}function h(i,t=!1,s=0){const n=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(n))for(let i=s;i<n.length;i++)e$2(n[i],!1),o(n[i]);else null!=n&&(e$2(n,!1),o(n));else e$2(this,i);}const l=i=>{var t$1,e,o,n;i.type==t.CHILD&&(null!==(t$1=(o=i)._$AP)&&void 0!==t$1||(o._$AP=h),null!==(e=(n=i)._$AQ)&&void 0!==e||(n._$AQ=r$1));};class d extends i$1{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,s){super._$AT(i,t,s),n(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var s,n;i!==this.isConnected&&(this.isConnected=i,i?null===(s=this.reconnected)||void 0===s||s.call(this):null===(n=this.disconnected)||void 0===n||n.call(this)),t&&(e$2(this,i),o(this));}setValue(t){if(r(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

function extractFunctionalElement(partInfo, directiveName) {
    assertsIsElementPartInfo(partInfo, directiveName);
    const element = partInfo.element;
    if (!(element instanceof FunctionalElementBaseClass)) {
        throw new Error(`${directiveName} directive only works when attached to functional elements`);
    }
    return element;
}
function assertsIsElementPartInfo(partInfo, directiveName) {
    if (partInfo.type !== t.ELEMENT) {
        throw new Error(`${directiveName} directive can only be attached directly to an element.`);
    }
    if (!partInfo.element) {
        throw new Error(`${directiveName} directive found no element`);
    }
}

/**
 * The directive generics (in listenDirective) are not strong enough to maintain their values. Thus,
 * the directive call is wrapped in this function.
 */
function assignWithCleanup(propertyDescriptor, value, cleanupCallback) {
    return assignWithCleanupDirective(propertyDescriptor.propName, value, cleanupCallback);
}
class AssignWithCleanupDirectiveClass extends d {
    constructor(partInfo) {
        super(partInfo);
        this.element = extractFunctionalElement(partInfo, 'assign');
    }
    disconnected() {
        if (this.lastValue != undefined && this.lastCallback != undefined) {
            this.lastCallback(this.lastValue);
        }
    }
    render(propName, value, cleanupCallback, equalityCheck = (a, b) => a === b) {
        if (!(propName in this.element.instanceProps)) {
            throw new Error(`${this.element.tagName} element has no property of name "${propName}"`);
        }
        // reference equality check!
        if (!equalityCheck(this.lastValue, value)) {
            cleanupCallback(this.lastValue);
        }
        this.element.instanceProps[propName] = value;
        this.lastValue = value;
        this.lastCallback = cleanupCallback;
        return T;
    }
}
const assignWithCleanupDirective = e$1(AssignWithCleanupDirectiveClass);

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
        this.element = extractFunctionalElement(partInfo, 'assign');
    }
    render(propName, value) {
        if (!(propName in this.element.instanceProps)) {
            throw new Error(`${this.element.tagName} element has no property of name "${propName}"`);
        }
        this.element.instanceProps[propName] = value;
        return T;
    }
});

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
        this.element = extractFunctionalElement(partInfo, 'listen');
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

const directiveName = 'onDomCreated';
/** Only fires once, when the element has been created. */
const onDomCreated = e$1(class extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        assertsIsElementPartInfo(partInfo, directiveName);
    }
    update(partInfo, [callback]) {
        assertsIsElementPartInfo(partInfo, directiveName);
        const newElement = partInfo.element;
        if (newElement !== this.element) {
            callback(newElement);
            this.element = newElement;
        }
        return this.render(callback);
    }
    render(callback) {
        return undefined;
    }
});

const directiveName$1 = 'onResize';
const onResize = e$1(class extends i$1 {
    constructor(partInfo) {
        super(partInfo);
        this.resizeObserver = new ResizeObserver((entries) => this.fireCallback(entries));
        assertsIsElementPartInfo(partInfo, directiveName$1);
    }
    fireCallback(entries) {
        var _a;
        const resizeEntry = entries[0];
        if (!resizeEntry) {
            console.error(entries);
            throw new Error(`${directiveName$1} observation triggered but the first entry was empty.`);
        }
        (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, { target: resizeEntry.target, contentRect: resizeEntry.contentRect });
    }
    update(partInfo, [callback]) {
        assertsIsElementPartInfo(partInfo, directiveName$1);
        this.callback = callback;
        const newElement = partInfo.element;
        // if the element changes we need to observe the new one
        if (newElement !== this.element) {
            if (this.element) {
                this.resizeObserver.unobserve(this.element);
            }
            this.resizeObserver.observe(newElement);
            this.element = newElement;
        }
        return this.render(callback);
    }
    render(callback) {
        return undefined;
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

export { ElementEvent, assign, assignWithCleanup, defineFunctionalElement, eventInit, html, listen, onDomCreated, onResize };
