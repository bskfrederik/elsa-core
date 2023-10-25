import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { C as Container } from './index-1637bf51.js';
import { _ as SyntaxNames, a3 as WorkflowDefinitionsApi, a4 as WorkflowDefinitionsOrderBy, o as getPropertyValue } from './index-7d63808a.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
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

const VariablePickerInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowDefinitions = [];
    this.onChange = (e) => {
      const inputElement = e.target;
      const definitionId = inputElement.value;
      this.inputContext.inputChanged(definitionId, SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    const apiClient = Container.get(WorkflowDefinitionsApi);
    const response = await apiClient.list({ versionOptions: { isPublished: true }, orderBy: WorkflowDefinitionsOrderBy.Name });
    this.workflowDefinitions = response.items;
  }
  render() {
    var _a;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const workflowDefinitions = this.workflowDefinitions;
    const value = getPropertyValue(inputContext);
    const currentValue = (_a = value === null || value === void 0 ? void 0 : value.expression) === null || _a === void 0 ? void 0 : _a.value;
    return (h(FormEntry, { fieldId: fieldId, label: displayName, hint: description }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, workflowDefinitions.map((definition) => {
      const definitionId = definition.definitionId;
      const isSelected = definitionId == currentValue;
      return h("option", { value: definitionId, selected: isSelected }, definition.name);
    }))));
  }
};

export { VariablePickerInput as elsa_workflow_definition_picker_input };

//# sourceMappingURL=elsa-workflow-definition-picker-input.entry.js.map