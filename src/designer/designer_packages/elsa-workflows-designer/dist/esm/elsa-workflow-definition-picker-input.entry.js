import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, C as Container, Y as WorkflowDefinitionsApi, Z as WorkflowDefinitionsOrderBy, n as getPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { F as FormEntry } from './form-entry-1204d05c.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './hint-4a493871.js';

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