import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { W as WorkflowDefinitionTunnel } from './state4.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const OutputPicker = /*@__PURE__*/ proxyCustomElement(class OutputPicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.onChange = (e) => {
      const inputElement = e.target;
      const outputName = inputElement.value;
      this.inputContext.inputChanged(outputName, SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value;
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (h(WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let outputs = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.outputs) !== null && _a !== void 0 ? _a : [];
      outputs = [null, ...outputs];
      return h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, outputs.map((output) => {
        var _a;
        const outputName = output === null || output === void 0 ? void 0 : output.name;
        const displayName = (_a = output === null || output === void 0 ? void 0 : output.displayName) !== null && _a !== void 0 ? _a : '';
        const isSelected = outputName == value;
        return h("option", { value: outputName, selected: isSelected }, displayName);
      })));
    }));
  }
}, [0, "elsa-output-picker-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-output-picker-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-output-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OutputPicker);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-input-control-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-monaco-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaOutputPickerInput = OutputPicker;
const defineCustomElement = defineCustomElement$1;

export { ElsaOutputPickerInput, defineCustomElement };

//# sourceMappingURL=elsa-output-picker-input.js.map