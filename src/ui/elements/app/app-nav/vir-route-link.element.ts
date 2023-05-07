import {defineElement, html} from 'element-vir';
import {routeOnLinkClick} from 'spa-router-vir';
import {
    ExperimentsFullRoute,
    threeJsExperimentsRouter,
} from '../../../../threejs-experiments-router';

function prettifyRouteName(input: ExperimentsFullRoute): string {
    const spaces = input.paths[0].replace(/-/g, ' ');
    const words = spaces.split(' ');
    return words.map((word) => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`).join(' ');
}

export const VirRouteLink = defineElement<{
    route: ExperimentsFullRoute;
}>()({
    tagName: 'vir-route-link',
    renderCallback: ({inputs}) => {
        const label = prettifyRouteName(inputs.route);

        const template = html`
            <a
                href=${threeJsExperimentsRouter.createRoutesUrl(inputs.route)}
                @click=${(clickEvent: MouseEvent) => {
                    routeOnLinkClick(clickEvent, inputs.route, threeJsExperimentsRouter);
                }}
            >
                ${label}
            </a>
        `;

        return template;
    },
});
