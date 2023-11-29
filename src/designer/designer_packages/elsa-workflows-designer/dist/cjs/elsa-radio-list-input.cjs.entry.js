'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
const selectListItems = require('./select-list-items-14e79374.js');
require('./toolbar-component-store-27cb56e9.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./descriptors-store-815ac006.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const RadioList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectList = { items: [], isFlagsEnum: false };
    this.getSelectedValue = () => {
      var _a, _b;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const defaultValue = inputDescriptor.defaultValue;
      const input = utils.getInputPropertyValue(inputContext);
      return (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
    };
    this.onCheckChanged = (e) => {
      const checkbox = e.target;
      const value = checkbox.value;
      this.inputContext.inputChanged(value, utils.SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.selectedValue = undefined;
  }
  async componentWillLoad() {
    this.selectList = await selectListItems.getSelectListItems(this.inputContext.inputDescriptor);
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
    const input = utils.getInputPropertyValue(inputContext);
    const value = this.getSelectedValue();
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const selectList = this.selectList;
    return (index.h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index$1) => {
      const inputId = `${fieldId}_${index$1}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = this.selectedValue === value;
      return (index.h("div", { class: "tw-relative tw-flex tw-items-start" }, index.h("div", { class: "tw-flex tw-items-center tw-h-5" }, index.h("input", { id: inputId, type: "radio", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300" })), index.h("div", { class: "tw-ml-3 tw-text-sm" }, index.h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    }))));
  }
};

exports.elsa_radio_list_input = RadioList;

//# sourceMappingURL=elsa-radio-list-input.cjs.entry.js.map