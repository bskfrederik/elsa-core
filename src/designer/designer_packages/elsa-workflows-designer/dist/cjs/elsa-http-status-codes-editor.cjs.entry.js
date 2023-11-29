'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const formEntry = require('./form-entry-890351d0.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./hint-34535b0d.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const HttpStatusCodesEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    const expectedStatusCodes = (_a = utils.getPropertyValue(inputContext)) !== null && _a !== void 0 ? _a : [];
    const statusCodeTags = expectedStatusCodes.map(x => x.statusCode.toString());
    return (index.h(formEntry.FormEntry, { fieldId: fieldId, label: displayName, hint: hint }, index.h("elsa-input-tags", { fieldId: fieldId, values: statusCodeTags, onValueChanged: this.onPropertyEditorChanged, placeHolder: "Add status code" })));
  }
};

exports.elsa_http_status_codes_editor = HttpStatusCodesEditor;

//# sourceMappingURL=elsa-http-status-codes-editor.cjs.entry.js.map