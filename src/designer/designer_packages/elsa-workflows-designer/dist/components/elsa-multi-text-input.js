import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue, i as getObjectOrParseJson } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { d as defineCustomElement$5 } from './state-tunnel.js';
import { d as defineCustomElement$4 } from './input-control-switch.js';
import { d as defineCustomElement$3 } from './input-tags.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const MultiTextInput = /*@__PURE__*/ proxyCustomElement(class MultiTextInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onPropertyEditorChanged = (e) => {
      const json = JSON.stringify(e.detail);
      this.inputContext.inputChanged(json, SyntaxNames.Object);
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
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const json = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    const defaultValue = inputDescriptor.defaultValue;
    let values = getObjectOrParseJson(json);
    if (!values || values.length == 0)
      values = getObjectOrParseJson(defaultValue) || [];
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: json, onExpressionChanged: this.onExpressionChanged }, h("elsa-input-tags", { fieldId: fieldId, values: values, onValueChanged: this.onPropertyEditorChanged })));
  }
}, [0, "elsa-multi-text-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-multi-text-input", "context-consumer", "elsa-input-control-switch", "elsa-input-tags", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-multi-text-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MultiTextInput);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "elsa-input-control-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-input-tags":
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

const ElsaMultiTextInput = MultiTextInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaMultiTextInput, defineCustomElement };

//# sourceMappingURL=elsa-multi-text-input.js.map