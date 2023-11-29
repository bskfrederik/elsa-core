import { h } from '@stencil/core';
import { SyntaxNames } from "../../models";
import { getSelectListItems, getInputPropertyValue } from "../../utils";
export class RadioList {
  constructor() {
    this.selectList = { items: [], isFlagsEnum: false };
    this.getSelectedValue = () => {
      var _a, _b;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const defaultValue = inputDescriptor.defaultValue;
      const input = getInputPropertyValue(inputContext);
      return (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
    };
    this.onCheckChanged = (e) => {
      const checkbox = e.target;
      const value = checkbox.value;
      this.inputContext.inputChanged(value, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.selectedValue = undefined;
  }
  async componentWillLoad() {
    this.selectList = await getSelectListItems(this.inputContext.inputDescriptor);
    this.selectedValue = this.getSelectedValue();
  }
  render() {
    var _a, _b;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const value = this.getSelectedValue();
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const selectList = this.selectList;
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index) => {
      const inputId = `${fieldId}_${index}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = this.selectedValue === value;
      return (h("div", { class: "tw-relative tw-flex tw-items-start" }, h("div", { class: "tw-flex tw-items-center tw-h-5" }, h("input", { id: inputId, type: "radio", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300" })), h("div", { class: "tw-ml-3 tw-text-sm" }, h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    }))));
  }
  static get is() { return "elsa-radio-list-input"; }
  static get properties() {
    return {
      "inputContext": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActivityInputContext",
          "resolved": "ActivityInputContext",
          "references": {
            "ActivityInputContext": {
              "location": "import",
              "path": "../../services/activity-input-driver"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "selectedValue": {}
    };
  }
}
//# sourceMappingURL=radio-list.js.map
