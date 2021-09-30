import {defineFunctionalElement, html} from 'element-vir';
import {createPathString, setRoutes} from '../../router/set-route';

function routeClicked(clickEvent: MouseEvent, routes: string[]) {
    // only activate routing if the user was trying to
    if (
        // only route on left click
        clickEvent.button === 0 &&
        // only route without modifier keys pressed
        !(clickEvent.metaKey || clickEvent.altKey || clickEvent.ctrlKey || clickEvent.shiftKey)
    ) {
        clickEvent.preventDefault();
        setRoutes(routes);
    }
}

function prettifyRouteName(input: string): string {
    const spaces = input.replace(/-/g, ' ');
    const words = spaces.split(' ');
    return words
        .map((word): Capitalize<string> => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`)
        .join(' ');
}

export const AppRouteLinkElement = defineFunctionalElement({
    tagName: 'vir-app-route-link',
    props: {
        routes: [] as string[],
    },
    renderCallback: ({props}) => {
        const definedRoutes = props.routes.filter((route) => !!route);
        const lastRoute = definedRoutes[definedRoutes.length - 1];
        if (!lastRoute) {
            throw new Error(
                `Last defined route was not defined from ${JSON.stringify(props.routes)}`,
            );
        }

        const label = lastRoute.length ? prettifyRouteName(lastRoute) : 'Home';

        const template = html`
            <a
                href=${createPathString(definedRoutes)}
                @click=${(clickEvent: MouseEvent) => routeClicked(clickEvent, definedRoutes)}
            >
                ${label}
            </a>
        `;

        return template;
    },
});
