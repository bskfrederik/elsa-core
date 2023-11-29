import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { l as getInputPropertyValue, i as getObjectOrParseJson, R as SyntaxNames } from './utils.js';
import { g as getSelectListItems } from './select-list-items.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const CheckList = /*@__PURE__*/ proxyCustomElement(class CheckList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selectList = { items: [], isFlagsEnum: false };
    this.getSelectedValues = (selectList) => {
      var _a;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const input = getInputPropertyValue(this.inputContext);
      const defaultValue = inputDescriptor.defaultValue;
      const json = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
      let parsedValue = selectList.isFlagsEnum ? parseInt(json) : getObjectOrParseJson(json) || [];
      if (parsedValue.length == 0)
        parsedValue = getObjectOrParseJson(defaultValue) || [];
      return parsedValue;
    };
    this.onCheckChanged = (e) => {
      const checkbox = e.target;
      const checked = checkbox.checked;
      const value = checkbox.value;
      const isFlags = this.selectList.isFlagsEnum;
      let json = '[]';
      if (isFlags) {
        let newValue = this.selectedValue;
        if (checked)
          newValue = newValue | parseInt(value);
        else
          newValue = newValue & ~parseInt(value);
        this.selectedValue = newValue;
        json = newValue.toString();
      }
      else {
        let newValue = this.selectedValues;
        if (checked)
          newValue = lodash.uniq([...newValue, value]);
        else
          newValue = newValue.filter(x => x !== value);
        this.selectedValues = newValue;
        json = JSON.stringify(newValue);
      }
      this.inputContext.inputChanged(json, SyntaxNames.Object);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.selectedValues = [];
    this.selectedValue = undefined;
  }
  async componentWillLoad() {
    this.selectList = await getSelectListItems(this.inputContext.inputDescriptor);
    const selectedValues = this.getSelectedValues(this.selectList);
    if (Array.isArray(selectedValues))
      this.selectedValues = selectedValues;
    else if (typeof (selectedValues) == 'number')
      this.selectedValue = selectedValues;
    else if (typeof selectedValues == 'string')
      this.selectedValues = JSON.parse(selectedValues);
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
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value; // TODO: The "value" field is currently hardcoded, but we should be able to be more flexible and potentially have different fields for a given syntax.
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    const selectList = this.selectList;
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index) => {
      const inputId = `${fieldId}_${index}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = selectList.isFlagsEnum
        ? (this.selectedValue & (parseInt(value))) == parseInt(value)
        : this.selectedValues.findIndex(x => x == value) >= 0;
      return (h("div", { class: "tw-relative tw-flex tw-items-start" }, h("div", { class: "tw-flex tw-items-center tw-h-5" }, h("input", { id: inputId, type: "checkbox", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300 tw-rounded" })), h("div", { class: "tw-ml-3 tw-text-sm" }, h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
}, [0, "elsa-check-list-input", {
    "inputContext": [16],
    "selectedValues": [32],
    "selectedValue": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-check-list-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-check-list-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, CheckList);
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

const ElsaCheckListInput = CheckList;
const defineCustomElement = defineCustomElement$1;

export { ElsaCheckListInput, defineCustomElement };

//# sourceMappingURL=elsa-check-list-input.js.map