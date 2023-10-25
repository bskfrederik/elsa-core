import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { _ as SyntaxNames, o as getPropertyValue } from './index-7d63808a.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
import { W as WorkflowDefinitionTunnel } from './state-4cd043fd.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';
import './hint-ef7d4b14.js';
import './index-c5813c2e.js';

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