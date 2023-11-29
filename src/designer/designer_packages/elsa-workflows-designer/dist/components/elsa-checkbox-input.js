import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as getInputPropertyValue, R as SyntaxNames } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const Checkbox = /*@__PURE__*/ proxyCustomElement(class Checkbox extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.getSelectedValue = () => {
      var _a, _b;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const defaultValue = inputDescriptor.defaultValue;
      const input = getInputPropertyValue(inputContext);
      const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
      return typeof value == "boolean" ? value : typeof value == "string" ? (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'true' : false;
    };
    this.onPropertyEditorChanged = (e) => {
      const inputElement = e.target;
      this.isChecked = inputElement.checked;
      this.inputContext.inputChanged(inputElement.checked, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.isChecked = undefined;
  }
  async componentWillLoad() {
    this.isChecked = this.getSelectedValue();
  }
  render() {
    var _a, _b, _c, _d;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const defaultValue = inputDescriptor.defaultValue;
    const input = getInputPropertyValue(inputContext);
    const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const isChecked = this.isChecked;
    return (h("elsa-input-control-switch", { label: displayName, hideLabel: true, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("div", { class: "tw-flex tw-space-x-1" }, h("input", { type: "checkbox", name: fieldName, id: fieldId, checked: isChecked, onChange: this.onPropertyEditorChanged }), h("label", { htmlFor: fieldId }, displayName))));
  }
}, [0, "elsa-checkbox-input", {
    "inputContext": [16],
    "isChecked": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-checkbox-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-checkbox-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Checkbox);
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

const ElsaCheckboxInput = Checkbox;
const defineCustomElement = defineCustomElement$1;

export { ElsaCheckboxInput, defineCustomElement };

//# sourceMappingURL=elsa-checkbox-input.js.map