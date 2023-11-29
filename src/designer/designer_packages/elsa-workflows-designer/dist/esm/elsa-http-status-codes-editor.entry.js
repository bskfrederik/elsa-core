import { r as registerInstance, h } from './index-08112852.js';
import { F as FormEntry } from './form-entry-1204d05c.js';
import { n as getPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import './hint-4a493871.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';

const HttpStatusCodesEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { HttpStatusCodesEditor as elsa_http_status_codes_editor };

//# sourceMappingURL=elsa-http-status-codes-editor.entry.js.map