import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import { s as state } from './descriptors-store.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const TypePickerInput = /*@__PURE__*/ proxyCustomElement(class TypePickerInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onChange = (e) => {
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
    const description = inputDescriptor.description;
    const availableTypes = state.variableDescriptors;
    const groupedVariableTypes = lodash.groupBy(availableTypes, x => x.category);
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const value = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, h("option", { value: "", selected: (!currentValue || currentValue == "") }), Object.keys(groupedVariableTypes).map(category => {
      const variableTypes = groupedVariableTypes[category];
      return (h("optgroup", { label: category }, variableTypes.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == currentValue }, descriptor.displayName))));
    }))));
  }
}, [0, "elsa-type-picker-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-type-picker-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-type-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TypePickerInput);
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

const ElsaTypePickerInput = TypePickerInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaTypePickerInput, defineCustomElement };

//# sourceMappingURL=elsa-type-picker-input.js.map