import { h } from '@stencil/core';
import { FormEntry } from "../../../components/shared/forms/form-entry";
import { WorkflowContextProviderTypesKey } from "../constants";
export class ProviderCheckList {
  constructor() {
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
  static get is() { return "elsa-workflow-context-provider-check-list"; }
  static get properties() {
    return {
      "descriptors": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<WorkflowContextProviderDescriptor>",
          "resolved": "WorkflowContextProviderDescriptor[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "WorkflowContextProviderDescriptor": {
              "location": "import",
              "path": "../services/api"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "workflowDefinition": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "selectList": {},
      "selectedProviderTypes": {}
    };
  }
  static get events() {
    return [{
        "method": "workflowDefinitionChanged",
        "name": "workflowDefinitionChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=provider-check-list.js.map
