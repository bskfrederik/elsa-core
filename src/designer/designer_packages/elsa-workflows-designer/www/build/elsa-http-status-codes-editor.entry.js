import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
import { o as getPropertyValue } from './index-7d63808a.js';
import './hint-ef7d4b14.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

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