import {defineElement, html} from 'element-vir';
import {
    threeJsExperimentsRouter,
    type ExperimentsFullRoute,
} from '../../../../threejs-experiments-router.js';

function prettifyRouteName(input: Readonly<ExperimentsFullRoute>) {
    return input.paths[0]
        .split('-')
        .map((word) => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`)
        .join(' ');
}

export const VirRouteLink = defineElement<{
    route: ExperimentsFullRoute;
}>()({
    tagName: 'vir-route-link',
    render({inputs}) {
        return html`
            <a
                href=${threeJsExperimentsRouter.createRouteUrl(inputs.route).url}
                @click=${(clickEvent: MouseEvent) => {
                    threeJsExperimentsRouter.setRouteOnDirectNavigation(inputs.route, clickEvent);
                }}
            >
                ${prettifyRouteName(inputs.route)}
            </a>
        `;
    },
});
