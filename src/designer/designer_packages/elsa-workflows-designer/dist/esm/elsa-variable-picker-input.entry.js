import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, n as getPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { F as FormEntry } from './form-entry-1204d05c.js';
import { W as WorkflowDefinitionTunnel } from './state-4c58f716.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './hint-4a493871.js';
import './state-tunnel-464fcd1b.js';

const VariablePickerInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
WorkflowDefinitionTunnel.injectProps(VariablePickerInput, ['workflowDefinition']);

export { VariablePickerInput as elsa_variable_picker_input };

//# sourceMappingURL=elsa-variable-picker-input.entry.js.map