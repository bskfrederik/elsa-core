'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
require('./_commonjsHelpers-dcc4cf71.js');

const CheckList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectedValuesChanged = index.createEvent(this, "selectedValuesChanged", 7);
    this.getSelectedValues = (selectList) => {
      return selectList.isFlagsEnum ? this.selectedValue : this.selectedValues || [];
    };
    this.onCheckChanged = (e) => {
      const checkbox = e.target;
      const checked = checkbox.checked;
      const value = checkbox.value;
      const isFlags = this.selectList.isFlagsEnum;
      if (isFlags) {
        let newValue = this.selectedValue;
        if (checked)
          newValue = newValue | parseInt(value);
        else
          newValue = newValue & ~parseInt(value);
        this.selectedValue = newValue;
        this.selectedValuesChanged.emit(newValue);
      }
      else {
        let newValue = this.selectedValues;
        if (checked)
          newValue = lodash.lodash.uniq([...newValue, value]);
        else
          newValue = newValue.filter(x => x !== value);
        this.selectedValues = newValue;
        this.selectedValuesChanged.emit(newValue);
      }
    };
    this.selectList = { items: [], isFlagsEnum: false };
    this.selectedValues = [];
    this.selectedValue = undefined;
    this.fieldName = undefined;
  }
  render() {
    const selectList = this.selectList;
    const fieldName = this.fieldName;
    return (index.h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index$1) => {
      const inputId = `${fieldName}_check-list_${index$1}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = selectList.isFlagsEnum
        ? (this.selectedValue & (parseInt(value))) == parseInt(value)
        : this.selectedValues.findIndex(x => x == value) >= 0;
      return (index.h("div", { class: "tw-relative tw-flex tw-items-start" }, index.h("div", { class: "tw-flex tw-items-center tw-h-5" }, index.h("input", { id: inputId, type: "checkbox", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300 tw-rounded" })), index.h("div", { class: "tw-ml-3 tw-text-sm" }, index.h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    })));
  }
};

exports.elsa_check_list = CheckList;

//# sourceMappingURL=elsa-check-list.cjs.entry.js.map