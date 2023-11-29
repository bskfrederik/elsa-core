'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const utils = require('./utils-c73bd981.js');
const selectListItems = require('./select-list-items-14e79374.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./toolbar-component-store-27cb56e9.js');
require('./index-d016c735.js');
require('./descriptors-store-815ac006.js');
require('./notification-service-99c155e7.js');

const CheckList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectList = { items: [], isFlagsEnum: false };
    this.getSelectedValues = (selectList) => {
      var _a;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const input = utils.getInputPropertyValue(this.inputContext);
      const defaultValue = inputDescriptor.defaultValue;
      const json = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
      let parsedValue = selectList.isFlagsEnum ? parseInt(json) : utils.getObjectOrParseJson(json) || [];
      if (parsedValue.length == 0)
        parsedValue = utils.getObjectOrParseJson(defaultValue) || [];
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
          newValue = lodash.lodash.uniq([...newValue, value]);
        else
          newValue = newValue.filter(x => x !== value);
        this.selectedValues = newValue;
        json = JSON.stringify(newValue);
      }
      this.inputContext.inputChanged(json, utils.SyntaxNames.Object);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.selectedValues = [];
    this.selectedValue = undefined;
  }
  async componentWillLoad() {
    this.selectList = await selectListItems.getSelectListItems(this.inputContext.inputDescriptor);
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
    const input = utils.getInputPropertyValue(inputContext);
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value; // TODO: The "value" field is currently hardcoded, but we should be able to be more flexible and potentially have different fields for a given syntax.
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    const selectList = this.selectList;
    return (index.h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index$1) => {
      const inputId = `${fieldId}_${index$1}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = selectList.isFlagsEnum
        ? (this.selectedValue & (parseInt(value))) == parseInt(value)
        : this.selectedValues.findIndex(x => x == value) >= 0;
      return (index.h("div", { class: "tw-relative tw-flex tw-items-start" }, index.h("div", { class: "tw-flex tw-items-center tw-h-5" }, index.h("input", { id: inputId, type: "checkbox", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300 tw-rounded" })), index.h("div", { class: "tw-ml-3 tw-text-sm" }, index.h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
};

exports.elsa_check_list_input = CheckList;

//# sourceMappingURL=elsa-check-list-input.cjs.entry.js.map