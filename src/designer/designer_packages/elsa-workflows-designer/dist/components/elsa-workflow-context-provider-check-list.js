import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { F as FormEntry } from './form-entry.js';
import { W as WorkflowContextProviderTypesKey } from './constants.js';
import { d as defineCustomElement$2 } from './check-list.js';

const ProviderCheckList = /*@__PURE__*/ proxyCustomElement(class ProviderCheckList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "elsa-workflow-context-provider-check-list", {
    "descriptors": [16],
    "workflowDefinition": [16],
    "selectList": [32],
    "selectedProviderTypes": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-context-provider-check-list", "elsa-check-list"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-context-provider-check-list":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ProviderCheckList);
      }
      break;
    case "elsa-check-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaWorkflowContextProviderCheckList = ProviderCheckList;
const defineCustomElement = defineCustomElement$1;

export { ElsaWorkflowContextProviderCheckList, defineCustomElement };

//# sourceMappingURL=elsa-workflow-context-provider-check-list.js.map