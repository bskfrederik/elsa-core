import { h } from '@stencil/core';
import { SyntaxNames } from "../../../models";
import { getInputPropertyValue } from "../../../utils";
import WorkflowDefinitionTunnel from "../../workflow-definitions/state";
import { WorkflowContextProviderTypesKey } from "../constants";
export class ProviderTypePicker {
  constructor() {
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.descriptors = [];
    this.workflowDefinition = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const allProviders = this.descriptors;
    const activatedProviders = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.customProperties[WorkflowContextProviderTypesKey]) !== null && _b !== void 0 ? _b : [];
    const availableProviders = allProviders.filter(x => activatedProviders.includes(x.type));
    const input = getInputPropertyValue(inputContext);
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const value = (_e = input === null || input === void 0 ? void 0 : input.expression) === null || _e === void 0 ? void 0 : _e.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, h("option", { value: "", selected: (!currentValue || currentValue == "") }), availableProviders.map(descriptor => h("option", { value: descriptor.type, selected: descriptor.type == currentValue }, descriptor.name)))));
  }
  static get is() { return "elsa-workflow-context-provider-type-picker-input"; }
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
              "path": "../../../services/activity-input-driver"
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
}
WorkflowDefinitionTunnel.injectProps(ProviderTypePicker, ['workflowDefinition']);
//# sourceMappingURL=provider-type-picker.js.map
