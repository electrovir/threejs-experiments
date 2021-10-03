import {assign, assignWithCleanup, defineFunctionalElement, html, listen} from 'element-vir';
import {css, unsafeCSS} from 'lit';
import {getEnumTypedValues} from 'virmator/dist/augments/object';
import {AnimationElement} from '../../animation/animation.element';
import {
    AvailableModels,
    LoadingModelsAnimation,
    models,
    ModelToggledEvent,
} from './loaded-models.animation';

// https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models

export const LoadingModelElement = defineFunctionalElement({
    tagName: 'vir-loading-model',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }

        :host > * {
            padding: 0 32px;
        }

        :host > ${unsafeCSS(AnimationElement.tagName)} {
            /*
                this padding is used to manually verify that the canvas size is not overflowing
            */
            padding: 8px;
            flex-grow: 1;
        }

        button {
            width: 100px;
            padding: 6px;
        }

        label {
            cursor: pointer;
        }
    `,
    props: {
        animation: undefined as undefined | LoadingModelsAnimation,
        animationEnabled: true,
        currentFps: 0,
        modelsShowing: {} as Partial<Record<AvailableModels, boolean>>,
    },
    renderCallback: ({props}) => {
        if (!props.animation) {
            props.animation = new LoadingModelsAnimation();
            props.animation.addEventListener(
                ModelToggledEvent.eventName,
                (event: ModelToggledEvent) => {
                    props.modelsShowing = {
                        ...props.modelsShowing,
                        [event.detail.model]: event.detail.showing,
                    };
                },
            );
        }
        return html`
        <h1>Loaded Models</h1>
        <p>
            Example of loading various glb files, per <a href="https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models">the guide.</a>
            <br>
            <br>
            ${getEnumTypedValues(AvailableModels).map((modelName) => {
                const inputId = `${modelName}-checkbox`;
                const modelData = models[modelName];
                return html`<label for=${inputId}>
                    <input id=${inputId} ?checked=${!!props.modelsShowing[modelName]} @change=${(
                    event: Event & {target: HTMLInputElement},
                ) => {
                    const checked = event.target.checked;
                    props.animation?.showModel(checked, modelName);
                }} type="checkbox"></input>
                        ${modelName[0]?.toUpperCase()}${modelName.slice(1)}</label>
                    <span>
                        (<a href=${modelData.sourceUrl}>source</a>) license: <a href=${
                    modelData.license.url
                }>${modelData.license.name}</a>
                    </span>
                <br>
            `;
            })}
            <br>
            FPS: ${props.currentFps.toFixed(1)}
        </p>
        <${AnimationElement}
            ${assignWithCleanup(AnimationElement.props.animation, props.animation, (oldValue) => {
                oldValue?.destroy();
            })}
            ${assign(AnimationElement.props.animationEnabled, props.animationEnabled)}
            ${listen(AnimationElement.events.fpsUpdate, (event) => {
                props.currentFps = event.detail;
            })}
        >
        </${AnimationElement}>
        `;
    },
});
