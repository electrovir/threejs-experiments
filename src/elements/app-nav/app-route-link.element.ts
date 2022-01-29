import {defineFunctionalElement, html} from 'element-vir';
import {routeOnLinkClick} from 'spa-router-vir';
import {
    defaultRoute,
    ExperimentsFullRoute,
    threeJsExperimentsRouter,
} from '../../threejs-experiments-router';

function prettifyRouteName(input: ExperimentsFullRoute): string {
    const spaces = input.paths[0].replace(/-/g, ' ');
    const words = spaces.split(' ');
    return words
        .map((word): Capitalize<string> => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`)
        .join(' ');
}

export const AppRouteLinkElement = defineFunctionalElement({
    tagName: 'vir-app-route-link',
    props: {
        route: defaultRoute,
    },
    renderCallback: ({props}) => {
        const label = prettifyRouteName(props.route);

        const template = html`
            <a
                href=${threeJsExperimentsRouter.createRoutesUrl(props.route)}
                @click=${(clickEvent: MouseEvent) => {
                    routeOnLinkClick(clickEvent, props.route, threeJsExperimentsRouter);
                }}
            >
                ${label}
            </a>
        `;

        return template;
    },
});
