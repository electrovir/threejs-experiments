import {getEnumTypedValues} from '@augment-vir/common';
import {assign, defineElementNoInputs, html, listen} from 'element-vir';
import {css} from 'lit';
import {AnimationPage} from '../../animation/vir-animation-page.element';
import {
    AvailableModels,
    LoadingModelsAnimation,
    ModelToggledEvent,
    models,
} from './loaded-models.animation';

// https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models

export const VirLoadingModel = defineElementNoInputs({
    tagName: 'vir-loading-model',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        label {
            cursor: pointer;
            margin-right: 24px;
        }

        label input {
            cursor: pointer;
        }
    `,
    stateInit: {
        animation: undefined as undefined | LoadingModelsAnimation,
        animationEnabled: true,
        currentFps: 0,
        modelsShowing: {} as Partial<Record<AvailableModels, boolean>>,
    },
    renderCallback: ({state, updateState}) => {
        if (!state.animation) {
            const newAnimation = new LoadingModelsAnimation();
            updateState({animation: newAnimation});
            newAnimation.addEventListener(
                ModelToggledEvent.eventName,
                (event: ModelToggledEvent) => {
                    updateState({
                        modelsShowing: {
                            ...state.modelsShowing,
                            [event.detail.model]: event.detail.showing,
                        },
                    });
                },
            );
        }
        return html`
            <${AnimationPage}
                ${assign(AnimationPage, {
                    animationEnabled: state.animationEnabled,
                    animation: state.animation,
                })}
                ${listen(AnimationPage.events.fps, (event) =>
                    updateState({currentFps: event.detail}),
                )}
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
                    ${getEnumTypedValues(AvailableModels).map((modelName) => {
                        const inputId = `${modelName}-checkbox`;
                        const modelData = models[modelName];
                        return html`
                            <label for=${inputId}>
                                <input
                                    id=${inputId}
                                    ?checked=${!!state.modelsShowing[modelName]}
                                    @change=${(event: Event & {target: HTMLInputElement}) => {
                                        const checked = event.target.checked;
                                        state.animation?.showModel(checked, modelName);
                                    }}
                                    type="checkbox"
                                />
                                ${modelName[0]?.toUpperCase()}${modelName.slice(1)}
                            </label>
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
