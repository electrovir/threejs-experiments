function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

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

var getEnumTypedValues = object.getEnumTypedValues;
var isEnumValue = object.isEnumValue;
export { getEnumTypedValues, isEnumValue };
