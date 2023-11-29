import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { F as FormEntry } from './form-entry.js';
import { n as getPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { d as defineCustomElement$2 } from './input-tags.js';

const HttpStatusCodesEditor = /*@__PURE__*/ proxyCustomElement(class HttpStatusCodesEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "elsa-http-status-codes-editor", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-http-status-codes-editor", "elsa-input-tags"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-http-status-codes-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, HttpStatusCodesEditor);
      }
      break;
    case "elsa-input-tags":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaHttpStatusCodesEditor = HttpStatusCodesEditor;
const defineCustomElement = defineCustomElement$1;

export { ElsaHttpStatusCodesEditor, defineCustomElement };

//# sourceMappingURL=elsa-http-status-codes-editor.js.map