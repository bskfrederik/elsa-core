import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { _ as SyntaxNames, n as getInputPropertyValue } from './index-7d63808a.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
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
import './hint-ef7d4b14.js';

const CodeEditorInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { CodeEditorInput as elsa_code_editor_input };

//# sourceMappingURL=elsa-code-editor-input.entry.js.map