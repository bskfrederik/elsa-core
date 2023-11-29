import { h } from '@stencil/core';
import { SyntaxNames } from "../../models";
import { getInputPropertyValue } from "../../utils";
import WorkflowDefinitionTunnel from "../../modules/workflow-definitions/state";
export class OutcomePicker {
  constructor() {
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.onChange = (e) => {
      const inputElement = e.target;
      const outcome = inputElement.value;
      this.inputContext.inputChanged(outcome, SyntaxNames.Object);
    };
    this.inputContext = undefined;
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value;
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (h(WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let outcomes = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.outcomes) !== null && _a !== void 0 ? _a : [];
      outcomes = [null, ...outcomes];
      return h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, outcomes.map((outcome) => {
        const displayName = outcome !== null && outcome !== void 0 ? outcome : '';
        const isSelected = outcome == value;
        return h("option", { value: outcome, selected: isSelected }, displayName);
      })));
    }));
  }
  static get is() { return "elsa-outcome-picker-input"; }
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
      }
    };
  }
}
//# sourceMappingURL=outcome-picker.js.map
