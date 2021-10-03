import {assign, assignWithCleanup, defineFunctionalElement, html, listen} from "../../../../_snowpack/pkg/element-vir.js";
import {css, unsafeCSS} from "../../../../_snowpack/pkg/lit.js";
import {getEnumTypedValues} from "../../../../_snowpack/pkg/virmator/dist/augments/object.js";
import {AnimationElement} from "../../animation/animation.element.js";
import {
  AvailableModels,
  LoadingModelsAnimation,
  models,
  ModelToggledEvent
} from "./loaded-models.animation.js";
export const LoadingModelElement = defineFunctionalElement({
  tagName: "vir-loading-model",
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

        label input {
            cursor: pointer;
        }
    `,
  props: {
    animation: void 0,
    animationEnabled: true,
    currentFps: 0,
    modelsShowing: {}
  },
  renderCallback: ({props}) => {
    if (!props.animation) {
      props.animation = new LoadingModelsAnimation();
      props.animation.addEventListener(ModelToggledEvent.eventName, (event) => {
        props.modelsShowing = {
          ...props.modelsShowing,
          [event.detail.model]: event.detail.showing
        };
      });
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
                    <input id=${inputId} ?checked=${!!props.modelsShowing[modelName]} @change=${(event) => {
        const checked = event.target.checked;
        props.animation?.showModel(checked, modelName);
      }} type="checkbox"></input>
                        ${modelName[0]?.toUpperCase()}${modelName.slice(1)}</label>
                    <span>
                        (<a href=${modelData.sourceUrl}>source</a>) license: <a href=${modelData.license.url}>${modelData.license.name}</a>
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
  }
});
