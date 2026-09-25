import {getEnumValues} from '@augment-vir/common';
import {css, defineElement, html, listen} from 'element-vir';
import {ViraCheckbox} from 'vira';
import {AvailableModels} from '../../../../services/models.js';
import {ModelToggleEvent} from '../../../../services/threejs-animation.js';
import {AnimationPage} from '../../animation/vir-animation-page.element.js';
import {LoadedModelsAnimation, models} from './loaded-models.animation.js';

// https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models

export const VirLoadedModels = defineElement()({
    tagName: 'vir-loaded-models',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        ${ViraCheckbox} {
            margin-right: 24px;
        }
    `,
    state() {
        return {
            animation: undefined as undefined | LoadedModelsAnimation,
            animationEnabled: true,
            currentFps: 0,
            modelsShowing: {} as Partial<Record<AvailableModels, boolean>>,
        };
    },
    init({state, updateState}) {
        const animation = new LoadedModelsAnimation();
        animation.listen(ModelToggleEvent, (event) => {
            updateState({
                modelsShowing: {
                    ...state.modelsShowing,
                    [event.detail.model]: event.detail.showing,
                },
            });
        });
        updateState({
            animation,
        });
    },
    render({state, updateState}) {
        return html`
            <${AnimationPage.assign({
                animationEnabled: state.animationEnabled,
                animation: state.animation,
            })}
                ${listen(AnimationPage.events.fps, (event) => {
                    updateState({
                        currentFps: event.detail,
                    });
                })}
            >
                <h1>Loaded Models</h1>
                <p>
                    Example of loading various glb files, per
                    <a
                        href="https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models"
                    >
                        the guide.
                    </a>
                    <br />
                    <br />
                    ${getEnumValues(AvailableModels).map((modelName) => {
                        const modelData = models[modelName];
                        return html`
                            <${ViraCheckbox.assign({
                                value: !!state.modelsShowing[modelName],
                                label: `${modelName[0]?.toUpperCase()}${modelName.slice(1)}`,
                                useHorizontalLabel: true,
                            })}
                                ${listen(ViraCheckbox.events.valueChange, async (event) => {
                                    await state.animation?.showModel(event.detail, modelName);
                                })}
                            ></${ViraCheckbox}>
                            <span>
                                (
                                <a href=${modelData.sourceUrl}>source</a>
                                ) license:
                                <a href=${modelData.license.url}>${modelData.license.name}</a>
                            </span>
                            <br />
                        `;
                    })}
                    <br />
                    FPS: ${state.currentFps.toFixed(1)}
                </p>
            </${AnimationPage}>
        `;
    },
});
