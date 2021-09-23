import {css, HTMLTemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {VirElement} from '../../render/vir-element';
import {html} from '../../render/vir-html';
import {createPathString, setRoutes} from '../../router/set-route';

@customElement('vir-app-route-link')
export class AppRouteLinkElement extends VirElement {
    public static readonly tagName = 'vir-app-route-link';
    static styles = css``;
    @property() private routes: string[] = [];

    private routesClicked(clickEvent: MouseEvent, routes: string[]) {
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

    protected render(): HTMLTemplateResult {
        const definedRoutes = this.routes.filter((route) => !!route);
        const lastRoute = definedRoutes[definedRoutes.length - 1];
        if (!lastRoute) {
            throw new Error(
                `Last defined route was not defined from ${JSON.stringify(this.routes)}`,
            );
        }
        const label = lastRoute.length ? prettifyRouteName(lastRoute) : 'Home';
        const template = html`
            <a
                href=${createPathString(definedRoutes)}
                @click=${(clickEvent: MouseEvent) => this.routesClicked(clickEvent, definedRoutes)}
            >
                ${label}
            </a>
        `;

        return template;
    }
}

function prettifyRouteName(input: string): string {
    const spaces = input.replace(/-/g, ' ');
    const words = spaces.split(' ');
    return words
        .map((word): Capitalize<string> => `${word[0]?.toLocaleUpperCase()}${word.slice(1)}`)
        .join(' ');
}
