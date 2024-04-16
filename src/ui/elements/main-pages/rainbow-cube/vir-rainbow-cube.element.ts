import {css, defineElementNoInputs, html, listen, perInstance} from 'element-vir';
import {AnimationPage} from '../../animation/vir-animation-page.element';
import {RainbowCubeAnimation} from './rainbow-cube.animation';

export const VirRainbowCube = defineElementNoInputs({
    tagName: 'vir-rainbow-cube',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        button {
            width: 100px;
            padding: 6px;
        }
    `,
    stateInitStatic: {
        animation: perInstance(() => new RainbowCubeAnimation()),
        animationEnabled: true,
        currentFps: 0,
    },
    renderCallback: ({state, updateState}) => {
        const links = [
            {
                url: 'https://threejs.org/docs/?q=light#api/en/lights/AmbientLight',
                label: 'AmbientLight',
            },
            {
                url: 'https://threejs.org/docs/?q=light#api/en/lights/PointLight',
                label: 'PointLight',
            },
            {
                url: 'https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial',
                label: 'AmbientLight',
            },
            {
                url: 'https://threejs.org/docs/?q=mesh#api/en/materials/MeshPhysicalMaterial.clearcoat',
                label: 'clear coat',
            },
        ];

        const linksTemplate = links.map((link, index, array) => {
            // ignore so html whitespace isn't affected
            // prettier-ignore
            return html`<a href=${link.url}>${link.label}</a>${index === array.length - 2 ? ', and ' : index < array.length - 1 ? ', ' : ''}`;
        });

        return html`
            <${AnimationPage.assign({
                animation: state.animation,
                animationEnabled: state.animationEnabled,
            })}
                ${listen(AnimationPage.events.fps, (event) =>
                    updateState({currentFps: event.detail}),
                )}
            >
                <h1>Rainbow Cube</h1>
                <p>
                    Variation on the intro example using ${linksTemplate}.
                    <br />
                    <button
                        ${listen('click', () =>
                            updateState({animationEnabled: !state.animationEnabled}),
                        )}
                    >
                        ${state.animationEnabled ? 'pause' : 'play'}
                    </button>
                    <br />
                    FPS: ${state.currentFps.toFixed(1)}
                </p>
            </${AnimationPage}>
        `;
    },
});
