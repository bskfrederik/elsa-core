import { h } from '@stencil/core';
import { SyntaxNames } from "../../models";
import { getInputPropertyValue } from "../../utils";
import { FormEntry } from "../shared/forms/form-entry";
export class CodeEditorInput {
  constructor() {
    this.onChange = (e) => {
      const value = e.detail.value;
      this.inputContext.inputChanged(value, SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  render() {
    var _a;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const options = inputDescriptor.options || {};
    const defaultValue = inputDescriptor.defaultValue;
    const input = getInputPropertyValue(inputContext);
    let value = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
    if (value == undefined)
      value = inputDescriptor.defaultValue;
    return (h(FormEntry, { label: displayName, fieldId: fieldId, hint: hint }, h("elsa-monaco-editor", Object.assign({ value: value }, options, { onValueChanged: this.onChange }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
  static get is() { return "elsa-code-editor-input"; }
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
//# sourceMappingURL=code-editor.js.map
