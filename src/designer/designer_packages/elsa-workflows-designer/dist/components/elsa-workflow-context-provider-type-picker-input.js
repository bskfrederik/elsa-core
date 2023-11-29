import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { W as WorkflowDefinitionTunnel } from './state4.js';
import { W as WorkflowContextProviderTypesKey } from './constants.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const ProviderTypePicker = /*@__PURE__*/ proxyCustomElement(class ProviderTypePicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.descriptors = [];
    this.workflowDefinition = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const allProviders = this.descriptors;
    const activatedProviders = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.customProperties[WorkflowContextProviderTypesKey]) !== null && _b !== void 0 ? _b : [];
    const availableProviders = allProviders.filter(x => activatedProviders.includes(x.type));
    const input = getInputPropertyValue(inputContext);
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const value = (_e = input === null || input === void 0 ? void 0 : input.expression) === null || _e === void 0 ? void 0 : _e.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, h("option", { value: "", selected: (!currentValue || currentValue == "") }), availableProviders.map(descriptor => h("option", { value: descriptor.type, selected: descriptor.type == currentValue }, descriptor.name)))));
  }
}, [0, "elsa-workflow-context-provider-type-picker-input", {
    "inputContext": [16],
    "descriptors": [16],
    "workflowDefinition": [16]
  }]);
WorkflowDefinitionTunnel.injectProps(ProviderTypePicker, ['workflowDefinition']);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-context-provider-type-picker-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-context-provider-type-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ProviderTypePicker);
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

const ElsaWorkflowContextProviderTypePickerInput = ProviderTypePicker;
const defineCustomElement = defineCustomElement$1;

export { ElsaWorkflowContextProviderTypePickerInput, defineCustomElement };

//# sourceMappingURL=elsa-workflow-context-provider-type-picker-input.js.map