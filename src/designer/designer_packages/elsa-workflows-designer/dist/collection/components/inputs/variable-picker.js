import { h } from '@stencil/core';
import { SyntaxNames } from "../../models";
import { getPropertyValue } from "../../utils";
import { FormEntry } from "../shared/forms/form-entry";
import WorkflowDefinitionTunnel from "../../modules/workflow-definitions/state";
export class VariablePickerInput {
  constructor() {
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
  static get is() { return "elsa-variable-picker-input"; }
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
              "path": "../../services/activity-input-driver"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
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
              "path": "../../modules/workflow-definitions/models/entities"
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
WorkflowDefinitionTunnel.injectProps(VariablePickerInput, ['workflowDefinition']);
//# sourceMappingURL=variable-picker.js.map
