import { r as registerInstance, c as createEvent, h } from './index-08112852.js';
import { F as FormEntry } from './form-entry-1204d05c.js';
import { W as WorkflowContextProviderTypesKey } from './constants-b8e44532.js';
import './hint-4a493871.js';

const ProviderCheckList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowDefinitionChanged = createEvent(this, "workflowDefinitionChanged", 7);
    this.onSelectedProvidersChanged = (e) => {
      const selectedProviderTypes = e.detail;
      this.selectList = { items: this.selectList.items.map(x => (Object.assign(Object.assign({}, x), { selected: selectedProviderTypes.includes(x.value) }))) };
      this.workflowDefinition.customProperties[WorkflowContextProviderTypesKey] = selectedProviderTypes;
      this.workflowDefinitionChanged.emit(this.workflowDefinition);
    };
    this.descriptors = [];
    this.workflowDefinition = undefined;
    this.selectList = { items: [] };
    this.selectedProviderTypes = [];
  }
  async componentWillLoad() {
    var _a;
    const workflowDefinition = this.workflowDefinition;
    const selectedProviderTypes = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.customProperties[WorkflowContextProviderTypesKey]) !== null && _a !== void 0 ? _a : [];
    const selectListItems = this.descriptors.map(x => ({ text: x.name, value: x.type }));
    this.selectList = {
      items: selectListItems
    };
    this.selectedProviderTypes = selectedProviderTypes;
  }
  render() {
    const selectList = this.selectList;
    return h(FormEntry, { label: "Active providers", fieldId: "EnabledProviders", hint: "Select the providers to activate for this workflow." }, h("elsa-check-list", { selectList: selectList, selectedValues: this.selectedProviderTypes, onSelectedValuesChanged: this.onSelectedProvidersChanged }));
  }
};

export { ProviderCheckList as elsa_workflow_context_provider_check_list };

//# sourceMappingURL=elsa-workflow-context-provider-check-list.entry.js.map