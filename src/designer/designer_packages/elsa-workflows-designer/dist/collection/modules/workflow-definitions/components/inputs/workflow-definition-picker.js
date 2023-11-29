import { h } from '@stencil/core';
import { Container } from "typedi";
import { getPropertyValue } from "../../../../utils";
import { SyntaxNames } from "../../../../models";
import { FormEntry } from "../../../../components/shared/forms/form-entry";
import { WorkflowDefinitionsApi, WorkflowDefinitionsOrderBy } from "../../services/api";
export class VariablePickerInput {
  constructor() {
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
  static get is() { return "elsa-workflow-definition-picker-input"; }
  static get properties() {
    return {
      "inputContext": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActivityInputContext",
          "resolved": "ActivityInputContext",
          "references": {
            "ActivityInputContext": {
              "location": "import",
              "path": "../../../../services/activity-input-driver"
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
}
//# sourceMappingURL=workflow-definition-picker.js.map
