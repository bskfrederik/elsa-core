import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, n as getPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { F as FormEntry } from './form-entry.js';
import { W as WorkflowDefinitionTunnel } from './state4.js';
import { d as defineCustomElement$2 } from './state-tunnel.js';

const VariablePickerInput = /*@__PURE__*/ proxyCustomElement(class VariablePickerInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = (e) => {
      const inputElement = e.target;
      const variableId = inputElement.value;
      const variable = this.workflowDefinition.variables.find(x => x.id == variableId);
      this.inputContext.inputChanged(variable, SyntaxNames.Literal);
    };
    this.inputContext = undefined;
    this.workflowDefinition = undefined;
  }
  render() {
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    let currentValue = getPropertyValue(inputContext);
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h(WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let variables = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.variables) !== null && _a !== void 0 ? _a : [];
      variables = [null, ...variables];
      return h(FormEntry, { fieldId: fieldId, label: displayName, hint: description }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, variables.map((variable) => {
        const variableName = variable === null || variable === void 0 ? void 0 : variable.name;
        const variableId = variable === null || variable === void 0 ? void 0 : variable.id;
        const isSelected = variableId == (currentValue === null || currentValue === void 0 ? void 0 : currentValue.id);
        return h("option", { value: variableId, selected: isSelected }, variableName);
      })));
    }));
  }
}, [0, "elsa-variable-picker-input", {
    "inputContext": [16],
    "workflowDefinition": [16]
  }]);
WorkflowDefinitionTunnel.injectProps(VariablePickerInput, ['workflowDefinition']);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-variable-picker-input", "context-consumer"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-variable-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VariablePickerInput);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaVariablePickerInput = VariablePickerInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaVariablePickerInput, defineCustomElement };

//# sourceMappingURL=elsa-variable-picker-input.js.map