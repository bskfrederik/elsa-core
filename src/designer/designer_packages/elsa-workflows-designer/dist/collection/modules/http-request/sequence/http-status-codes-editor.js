import { h } from "@stencil/core";
import { FormEntry } from "../../../components/shared/forms/form-entry";
import { getPropertyValue } from "../../../utils";
export class HttpStatusCodesEditor {
  constructor() {
    this.onPropertyEditorChanged = (e) => {
      var _a;
      const statusCodes = e.detail;
      const activity = this.inputContext.activity;
      const expectedStatusCodes = (_a = activity.expectedStatusCodes) !== null && _a !== void 0 ? _a : [];
      // Push new status codes.
      for (const statusCode of statusCodes) {
        if (expectedStatusCodes.findIndex(x => x.statusCode.toString() == statusCode) == -1)
          expectedStatusCodes.push({ statusCode: parseInt(statusCode) });
      }
      // Remove status codes that are no longer present.
      for (let i = expectedStatusCodes.length - 1; i >= 0; i--) {
        const statusCode = expectedStatusCodes[i].statusCode.toString();
        if (statusCodes.findIndex(x => x == statusCode) == -1)
          expectedStatusCodes.splice(i, 1);
      }
      activity.expectedStatusCodes = expectedStatusCodes;
      this.inputContext.notifyInputChanged();
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
    const expectedStatusCodes = (_a = getPropertyValue(inputContext)) !== null && _a !== void 0 ? _a : [];
    const statusCodeTags = expectedStatusCodes.map(x => x.statusCode.toString());
    return (h(FormEntry, { fieldId: fieldId, label: displayName, hint: hint }, h("elsa-input-tags", { fieldId: fieldId, values: statusCodeTags, onValueChanged: this.onPropertyEditorChanged, placeHolder: "Add status code" })));
  }
  static get is() { return "elsa-http-status-codes-editor"; }
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
      }
    };
  }
}
//# sourceMappingURL=http-status-codes-editor.js.map
