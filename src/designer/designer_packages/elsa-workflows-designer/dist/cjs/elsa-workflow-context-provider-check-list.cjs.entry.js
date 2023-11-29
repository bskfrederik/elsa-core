'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const formEntry = require('./form-entry-890351d0.js');
const constants = require('./constants-ca50a211.js');
require('./hint-34535b0d.js');

const ProviderCheckList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowDefinitionChanged = index.createEvent(this, "workflowDefinitionChanged", 7);
    this.onSelectedProvidersChanged = (e) => {
      const selectedProviderTypes = e.detail;
      this.selectList = { items: this.selectList.items.map(x => (Object.assign(Object.assign({}, x), { selected: selectedProviderTypes.includes(x.value) }))) };
      this.workflowDefinition.customProperties[constants.WorkflowContextProviderTypesKey] = selectedProviderTypes;
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
    const selectedProviderTypes = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.customProperties[constants.WorkflowContextProviderTypesKey]) !== null && _a !== void 0 ? _a : [];
    const selectListItems = this.descriptors.map(x => ({ text: x.name, value: x.type }));
    this.selectList = {
      items: selectListItems
    };
    this.selectedProviderTypes = selectedProviderTypes;
  }
  render() {
    const selectList = this.selectList;
    return index.h(formEntry.FormEntry, { label: "Active providers", fieldId: "EnabledProviders", hint: "Select the providers to activate for this workflow." }, index.h("elsa-check-list", { selectList: selectList, selectedValues: this.selectedProviderTypes, onSelectedValuesChanged: this.onSelectedProvidersChanged }));
  }
};

exports.elsa_workflow_context_provider_check_list = ProviderCheckList;

//# sourceMappingURL=elsa-workflow-context-provider-check-list.cjs.entry.js.map