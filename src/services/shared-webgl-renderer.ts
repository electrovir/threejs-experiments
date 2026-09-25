import {WebGLRenderer} from 'three';

/**
 * The one renderer, and so the one WebGL context, that every animation draws through. Browsers cap
 * live WebGL contexts (16 in WebKit) and only free one when its canvas is garbage collected, so a
 * renderer per page visit eventually evicts the oldest context and logs warnings.
 */
export const sharedWebGlRenderer = new WebGLRenderer();
