import { h } from '@stencil/core';
import { SyntaxNames } from "../../models";
import { getInputPropertyValue, getObjectOrParseJson } from "../../utils";
export class MultiTextInput {
  constructor() {
    this.onPropertyEditorChanged = (e) => {
      const json = JSON.stringify(e.detail);
      this.inputContext.inputChanged(json, SyntaxNames.Object);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const json = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    const defaultValue = inputDescriptor.defaultValue;
    let values = getObjectOrParseJson(json);
    if (!values || values.length == 0)
      values = getObjectOrParseJson(defaultValue) || [];
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: json, onExpressionChanged: this.onExpressionChanged }, h("elsa-input-tags", { fieldId: fieldId, values: values, onValueChanged: this.onPropertyEditorChanged })));
  }
  static get is() { return "elsa-multi-text-input"; }
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
//# sourceMappingURL=multi-text.js.map
