import { c as createCommonjsModule, a as commonjsGlobal } from './common/_commonjsHelpers-eb5a497e.js';

var clickEventShouldSetRoutes = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeOnLinkClick = exports.shouldMouseEventTriggerRoutes = void 0;
/** 0 is left click and the default mouse button if none were read. */
const LeftClick = 0;
function shouldMouseEventTriggerRoutes(mouseEvent) {
    /** Don't trigger route updates for anything other than a click event. */
    if (mouseEvent.type !== 'click') {
        return false;
    }
    /**
     * Do not trigger a route if a modifier key was held because the user was intending to do
     * something else, such as open the right click menu or open the link in a new tab.
     */
    if (mouseEvent.metaKey || mouseEvent.altKey || mouseEvent.ctrlKey || mouseEvent.shiftKey) {
        return false;
    }
    /** Only route on left click, or if no click button was read . */
    if (mouseEvent.button !== LeftClick) {
        return false;
    }
    return true;
}
exports.shouldMouseEventTriggerRoutes = shouldMouseEventTriggerRoutes;
function routeOnLinkClick(mouseEvent, routes, router) {
    if (shouldMouseEventTriggerRoutes(mouseEvent)) {
        mouseEvent.preventDefault();
        router.setRoutes(routes);
    }
}
exports.routeOnLinkClick = routeOnLinkClick;
});

var spaRouter_error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaRouterError = void 0;
class SpaRouterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SpaRouterError';
    }
}
exports.SpaRouterError = SpaRouterError;
});

var consolidation_error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowEventConsolidationError = void 0;

class WindowEventConsolidationError extends spaRouter_error.SpaRouterError {
    constructor(message) {
        super(message);
        this.name = 'WindowEventConsolidationError';
    }
}
exports.WindowEventConsolidationError = WindowEventConsolidationError;
});

var consolidateWindowEvents_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.consolidateWindowEvents = exports.RouteChangeEventName = void 0;

exports.RouteChangeEventName = 'locationchange';
// this should only ever be executed once
let consolidatedAlready = false;
const originalPushState = window.history.pushState;
function newPushState(...args) {
    const originalResult = originalPushState.apply(window.history, args);
    window.dispatchEvent(new Event(exports.RouteChangeEventName));
    return originalResult;
}
const originalReplaceState = window.history.replaceState;
function newReplaceState(...args) {
    const originalResult = originalReplaceState.apply(window.history, args);
    window.dispatchEvent(new Event(exports.RouteChangeEventName));
    return originalResult;
}
// consolidate url changes to RouteChangeEventName events
function consolidateWindowEvents() {
    if (consolidatedAlready) {
        return;
    }
    if (window.history.pushState === newPushState) {
        throw new consolidation_error.WindowEventConsolidationError(`The consolidation module thinks that window events have not been consolidated yet but window.history.pushState has already been overridden. Does this module have two copies in your repo?`);
    }
    if (window.history.replaceState === newReplaceState) {
        throw new consolidation_error.WindowEventConsolidationError(`The consolidation module thinks that window events have not been consolidated yet but window.history.replaceState has already been overridden. Does this module have two copies in your repo?`);
    }
    consolidatedAlready = true;
    window.history.pushState = newPushState;
    window.history.replaceState = newReplaceState;
    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event(exports.RouteChangeEventName));
    });
}
exports.consolidateWindowEvents = consolidateWindowEvents;
});

var getRoutes_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = void 0;
function getRoutes(routeBaseRegExp) {
    // remove the relative base if it exists
    const path = routeBaseRegExp
        ? window.location.pathname.replace(routeBaseRegExp, '')
        : window.location.pathname;
    const routes = path.split('/');
    return routes.filter((route) => !!route);
}
exports.getRoutes = getRoutes;
});

var sanitizationDepthMaxed_error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizationDepthMaxed = void 0;

class SanitizationDepthMaxed extends spaRouter_error.SpaRouterError {
    constructor(message) {
        super(message);
        this.name = 'SanitizationDepthMaxed';
    }
}
exports.SanitizationDepthMaxed = SanitizationDepthMaxed;
});

var routeEquality = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.areRoutesEqual = void 0;
function areRoutesEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every((entryA, index) => b[index] === entryA);
}
exports.areRoutesEqual = areRoutesEqual;
});

var routeChangeCallback_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeChangeCallback = void 0;


const maxSanitizationStackDepth = 2;
function routeChangeCallback(router, specificListenerOnly) {
    const currentRoutes = router.getCurrentRawRoutes();
    if (router.sanitizationDepth > maxSanitizationStackDepth) {
        throw new sanitizationDepthMaxed_error.SanitizationDepthMaxed(`Route sanitization depth has exceed the max of ${maxSanitizationStackDepth} with ${JSON.stringify(currentRoutes)}`);
    }
    const sanitizedCurrentRoutes = router.sanitizeRoutes(currentRoutes);
    if ((0, routeEquality.areRoutesEqual)(sanitizedCurrentRoutes, currentRoutes)) {
        router.sanitizationDepth = 0;
        if (specificListenerOnly) {
            specificListenerOnly(sanitizedCurrentRoutes);
        }
        else {
            router.listeners.forEach((listener) => {
                listener(sanitizedCurrentRoutes);
            });
        }
    }
    else {
        router.sanitizationDepth++;
        // don't fire the callback cause this listener will get fired after updating the routes
        return router.setRoutes(sanitizedCurrentRoutes, true);
    }
}
exports.routeChangeCallback = routeChangeCallback;
});

var invalidRouterInitParams_error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRouterInitParamsError = void 0;

class InvalidRouterInitParamsError extends spaRouter_error.SpaRouterError {
    constructor(message) {
        super(message);
        this.name = 'InvalidRouterInitParamsError';
    }
}
exports.InvalidRouterInitParamsError = InvalidRouterInitParamsError;
});

var routerInitParams = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidRouteInitParams = exports.createRouteInitParams = void 0;

// some actual JavaScript is needed so this file gets picked up in compilation lol
function createRouteInitParams(defaultRoute, routeBase, routeSanitizer, maxListenerCount) {
    const routerInitParams = {
        defaultRoute,
        routeBase,
        maxListenerCount,
        routeSanitizer,
    };
    return routerInitParams;
}
exports.createRouteInitParams = createRouteInitParams;
function assertValidRouteInitParams(input) {
    if ('routeBase' in input &&
        typeof input.routeBase !== 'string' &&
        input.routeBase != undefined) {
        throw new invalidRouterInitParams_error.InvalidRouterInitParamsError(`Invalid type for router init params "routeBase" property. Expected string or undefined but got "${input.routeBase}" with type "${typeof input.routeBase}".`);
    }
    if ('routeSanitizer' in input &&
        typeof input.routeSanitizer !== 'function' &&
        input.routeSanitizer != undefined) {
        throw new invalidRouterInitParams_error.InvalidRouterInitParamsError(`Invalid type for router init params "routeSanitizer" property. Expected a function or undefined but got "${input.routeSanitizer}" with type "${typeof input.routeSanitizer}".`);
    }
    if ('maxListenerCount' in input &&
        (typeof input.maxListenerCount !== 'number' || isNaN(input.maxListenerCount)) &&
        input.maxListenerCount != undefined) {
        throw new invalidRouterInitParams_error.InvalidRouterInitParamsError(`Invalid type for router init params "maxListenerCount" property. Expected a number or undefined but got "${input.maxListenerCount}" with type "${typeof input.maxListenerCount}".`);
    }
    if (!input.defaultRoute ||
        !Array.isArray(input.defaultRoute) ||
        !input.defaultRoute.every((route) => typeof route === 'string')) {
        throw new invalidRouterInitParams_error.InvalidRouterInitParamsError(`Invalid type for router init params "defaultRoute" property. Expected an array of strings but got "${input.defaultRoute}" with type "${typeof input.defaultRoute}".`);
    }
}
exports.assertValidRouteInitParams = assertValidRouteInitParams;
});

var setRoute = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathString = exports.setRoutes = void 0;

function setRoutes(routes, routeBaseRegExp, routeBase, 
/**
 * Used for a back button or for replacing routes with sanitized routes. In every other case,
 * pass false here or leave it empty (as it defaults to false).
 */
replace = false) {
    const path = createPathString(routes, routeBaseRegExp, routeBase);
    if (replace) {
        window.history.replaceState(undefined, '', path);
    }
    else {
        window.history.pushState(undefined, '', path);
    }
}
exports.setRoutes = setRoutes;
function createPathString(routes, routeBaseRegExp, routeBase = '') {
    if (!routeBase && routeBaseRegExp != undefined) {
        throw new spaRouter_error.SpaRouterError(`Route base regexp was defined but routeBase string was not provided.`);
    }
    const pathBase = containsRelativeBase(routeBaseRegExp) ? `/${routeBase}` : '';
    return `${pathBase}/${routes.join('/')}`;
}
exports.createPathString = createPathString;
function containsRelativeBase(routeBaseRegExp) {
    return !!(routeBaseRegExp && window.location.pathname.match(routeBaseRegExp));
}
});

var createSpaRouter_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpaRouter = void 0;







function createSpaRouter(init) {
    (0, routerInitParams.assertValidRouteInitParams)(init);
    (0, consolidateWindowEvents_1.consolidateWindowEvents)();
    const startsWithRouteBaseRegExp = init.routeBase
        ? new RegExp(`^\\/${init.routeBase}`)
        : undefined;
    /** Only add one listener to the window event but only add it once addRouteListener has been called. */
    let windowListenerAdded = false;
    const router = {
        listeners: new Set(),
        initParams: init,
        sanitizeRoutes: (routes) => {
            return init.routeSanitizer
                ? init.routeSanitizer(routes)
                : routes;
        },
        setRoutes: (routes, replace = false, force = false) => {
            const sanitizedRoutes = router.sanitizeRoutes(routes);
            if (!force && (0, routeEquality.areRoutesEqual)(router.getCurrentRawRoutes(), sanitizedRoutes)) {
                return;
            }
            return (0, setRoute.setRoutes)(sanitizedRoutes, startsWithRouteBaseRegExp, init.routeBase, replace);
        },
        createRoutesUrl: (routes) => {
            return (0, setRoute.createPathString)(routes, startsWithRouteBaseRegExp, init.routeBase);
        },
        getCurrentRawRoutes: () => {
            const rawRoutes = (0, getRoutes_1.getRoutes)(startsWithRouteBaseRegExp);
            return rawRoutes;
        },
        addRouteListener: (fireImmediately, listener) => {
            if (init.maxListenerCount && router.listeners.size >= init.maxListenerCount) {
                throw new spaRouter_error.SpaRouterError(`Tried to exceed route listener max of ${init.maxListenerCount}.`);
            }
            router.listeners.add(listener);
            if (!windowListenerAdded) {
                window.addEventListener(consolidateWindowEvents_1.RouteChangeEventName, () => (0, routeChangeCallback_1.routeChangeCallback)(router));
                windowListenerAdded = true;
            }
            if (fireImmediately) {
                (0, routeChangeCallback_1.routeChangeCallback)(router, listener);
            }
            return listener;
        },
        removeRouteListener: (listener) => {
            return router.listeners.delete(listener);
        },
        sanitizationDepth: 0,
    };
    return router;
}
exports.createSpaRouter = createSpaRouter;
});

var invalidRoute_error = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRouteError = void 0;

class InvalidRouteError extends spaRouter_error.SpaRouterError {
    constructor(message) {
        super(message);
        this.name = 'InvalidRouteError';
    }
}
exports.InvalidRouteError = InvalidRouteError;
});

var spaRouter = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpaRouter = void 0;
// some actual JavaScript is needed so this file gets picked up in compilation lol
function isSpaRouter(rawInput) {
    if (typeof rawInput !== 'object' || !rawInput) {
        return false;
    }
    const propsToCheck = {
        setRoutes: 'function',
        createRoutesUrl: 'function',
        addRouteListener: 'function',
        getCurrentRawRoutes: 'function',
        listeners: 'object',
        sanitizationDepth: 'number',
        sanitizeRoutes: 'function',
        removeRouteListener: 'function',
        initParams: 'object',
    };
    const input = rawInput;
    const missingProperties = Object.keys(propsToCheck).filter((key) => {
        if (!input.hasOwnProperty(key) || !(typeof input[key] !== propsToCheck[key])) {
            return true;
        }
        return false;
    });
    return !missingProperties.length;
}
exports.isSpaRouter = isSpaRouter;
});

var dist = createCommonjsModule(function (module, exports) {
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
__exportStar(clickEventShouldSetRoutes, exports);
__exportStar(createSpaRouter_1, exports);
__exportStar(consolidation_error, exports);
__exportStar(invalidRoute_error, exports);
__exportStar(invalidRouterInitParams_error, exports);
__exportStar(sanitizationDepthMaxed_error, exports);
__exportStar(spaRouter_error, exports);
__exportStar(routeEquality, exports);
__exportStar(routerInitParams, exports);
__exportStar(spaRouter, exports);
});

var createSpaRouter = dist.createSpaRouter;
var routeOnLinkClick = dist.routeOnLinkClick;
export { createSpaRouter, routeOnLinkClick };
