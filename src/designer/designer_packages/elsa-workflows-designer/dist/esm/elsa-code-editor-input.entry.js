import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { F as FormEntry } from './form-entry-1204d05c.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './hint-4a493871.js';

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