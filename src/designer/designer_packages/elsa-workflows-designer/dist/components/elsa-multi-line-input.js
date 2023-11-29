import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const MultiLineInput = /*@__PURE__*/ proxyCustomElement(class MultiLineInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.getEditorHeight = (options) => {
      const editorHeightName = options.editorHeight || 'Default';
      switch (editorHeightName) {
        case 'Large':
          return { propertyEditor: '20em', textArea: 10 };
        default:
          return { propertyEditor: '15em', textArea: 6 };
      }
    };
    this.onPropertyEditorChanged = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
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
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const options = inputDescriptor.options || {};
    const editorHeight = this.getEditorHeight(options);
    const defaultValue = inputDescriptor.defaultValue;
    const value = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("textarea", { name: fieldName, id: fieldId, value: value, rows: editorHeight.textArea, onChange: this.onPropertyEditorChanged })));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
}, [0, "elsa-multi-line-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-multi-line-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-multi-line-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MultiLineInput);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-input-control-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-monaco-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaMultiLineInput = MultiLineInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaMultiLineInput, defineCustomElement };

//# sourceMappingURL=elsa-multi-line-input.js.map