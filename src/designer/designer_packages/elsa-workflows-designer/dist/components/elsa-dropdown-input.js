import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import { g as getSelectListItems } from './select-list-items.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const DropdownInput = /*@__PURE__*/ proxyCustomElement(class DropdownInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selectList = { items: [], isFlagsEnum: false };
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    this.selectList = await getSelectListItems(this.inputContext.inputDescriptor);
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
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const defaultValue = inputDescriptor.defaultValue;
    const value = this.getValueOrDefault((_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value, defaultValue);
    const { items } = this.selectList;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, items.map(item => {
      const optionIsObject = typeof (item) == 'object';
      const value = optionIsObject ? item.value : item.toString();
      const text = optionIsObject ? item.text : item.toString();
      return h("option", { value: value, selected: value === currentValue }, text);
    }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
}, [0, "elsa-dropdown-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-dropdown-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-dropdown-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DropdownInput);
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

const ElsaDropdownInput = DropdownInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaDropdownInput, defineCustomElement };

//# sourceMappingURL=elsa-dropdown-input.js.map