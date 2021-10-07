import { c as createCommonjsModule, a as commonjsGlobal } from './common/_commonjsHelpers-eb5a497e.js';

var array = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArrayIndexes = void 0;
function deleteArrayIndexes(array, indexes) {
    return array.filter((_, index) => !indexes.includes(index));
}
exports.deleteArrayIndexes = deleteArrayIndexes;
});

var error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineErrors = void 0;
function combineErrors(errors) {
    if (!errors || errors.length === 0) {
        return undefined;
    }
    const firstError = errors[0];
    if (errors.length === 1 && firstError) {
        return firstError;
    }
    return new Error(errors.map((error) => error.message.trim()).join('\n'));
}
exports.combineErrors = combineErrors;
});

var object = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectTypedValues = exports.getObjectTypedKeys = exports.filterToEnumValues = exports.isEnumValue = exports.getEnumTypedValues = exports.getEnumTypedKeys = void 0;
function getEnumTypedKeys(input) {
    // keys are always strings
    return getObjectTypedKeys(input).filter((key) => isNaN(Number(key)));
}
exports.getEnumTypedKeys = getEnumTypedKeys;
function getEnumTypedValues(input) {
    const keys = getEnumTypedKeys(input);
    return keys.map((key) => input[key]);
}
exports.getEnumTypedValues = getEnumTypedValues;
function isEnumValue(input, checkEnum) {
    return getEnumTypedValues(checkEnum).includes(input);
}
exports.isEnumValue = isEnumValue;
function filterToEnumValues(inputs, checkEnum, caseInsensitive = false) {
    if (caseInsensitive) {
        return inputs.reduce((accum, currentInput) => {
            const matchedEnumValue = getEnumTypedValues(checkEnum).find((actualEnumValue) => {
                return String(actualEnumValue).toUpperCase() === String(currentInput).toUpperCase();
            });
            if (matchedEnumValue) {
                return accum.concat(matchedEnumValue);
            }
            else {
                return accum;
            }
        }, []);
    }
    else {
        return inputs.filter((input) => isEnumValue(input, checkEnum));
    }
}
exports.filterToEnumValues = filterToEnumValues;
function getObjectTypedKeys(input) {
    return Object.keys(input);
}
exports.getObjectTypedKeys = getObjectTypedKeys;
function getObjectTypedValues(input) {
    return Object.values(input);
}
exports.getObjectTypedValues = getObjectTypedValues;
});

var string = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWithFinalConjunction = exports.interpolationSafeWindowsPath = exports.toPosixPath = void 0;
function toPosixPath(maybeWindowsPath) {
    return maybeWindowsPath
        .replace(/^(.+?)\:\\+/, (match, captureGroup) => {
        return `/${captureGroup.toLowerCase()}/`;
    })
        .replace(/\\+/g, '/');
}
exports.toPosixPath = toPosixPath;
function interpolationSafeWindowsPath(input) {
    return input.replace(/\\/g, '\\\\\\\\');
}
exports.interpolationSafeWindowsPath = interpolationSafeWindowsPath;
function joinWithFinalConjunction(list, word = 'and ') {
    if (list.length < 2) {
        /**
         * If there are not multiple things in the list to join, just turn the list into a string
         * for an empty list, this will be '', for a single item list, this will just be the first
         * item as a string.
         */
        return list.join('');
    }
    /** When there are only two items in the list, we don't want any commas. */
    const commaSep = list.length > 2 ? ', ' : ' ';
    const commaJoined = list.slice(0, -1).join(commaSep);
    const fullyJoined = `${commaJoined}${commaSep}${word}${list[list.length - 1]}`;
    return fullyJoined;
}
exports.joinWithFinalConjunction = joinWithFinalConjunction;
});

var type = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

var webIndex = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Excludes all Node.js-only augments. Suitable for web imports. */
__exportStar(array, exports);
__exportStar(error, exports);
__exportStar(object, exports);
__exportStar(string, exports);
__exportStar(type, exports);
});

var getEnumTypedValues = webIndex.getEnumTypedValues;
var isEnumValue = webIndex.isEnumValue;
export { getEnumTypedValues, isEnumValue };
