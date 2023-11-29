import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { W as WorkflowDefinitionTunnel } from './state-4c58f716.js';
import { W as WorkflowContextProviderTypesKey } from './constants-b8e44532.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

const ProviderTypePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
WorkflowDefinitionTunnel.injectProps(ProviderTypePicker, ['workflowDefinition']);

export { ProviderTypePicker as elsa_workflow_context_provider_type_picker_input };

//# sourceMappingURL=elsa-workflow-context-provider-type-picker-input.entry.js.map