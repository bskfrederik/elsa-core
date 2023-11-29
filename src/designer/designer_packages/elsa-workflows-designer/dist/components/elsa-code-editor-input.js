import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { F as FormEntry } from './form-entry.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const CodeEditorInput = /*@__PURE__*/ proxyCustomElement(class CodeEditorInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
}, [0, "elsa-code-editor-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-code-editor-input", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-code-editor-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CodeEditorInput);
      }
      break;
    case "elsa-monaco-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaCodeEditorInput = CodeEditorInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaCodeEditorInput, defineCustomElement };

//# sourceMappingURL=elsa-code-editor-input.js.map