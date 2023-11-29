import { h } from '@stencil/core';
import { uniq } from 'lodash';
export class CheckList {
  constructor() {
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
          newValue = uniq([...newValue, value]);
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
    return (h("div", { class: "tw-max-w-lg tw-space-y-4 tw-my-4" }, selectList.items.map((item, index) => {
      const inputId = `${fieldName}_check-list_${index}`;
      const optionIsString = typeof item == 'string';
      const value = optionIsString ? item : item.value;
      const text = optionIsString ? item : item.text;
      const isSelected = selectList.isFlagsEnum
        ? (this.selectedValue & (parseInt(value))) == parseInt(value)
        : this.selectedValues.findIndex(x => x == value) >= 0;
      return (h("div", { class: "tw-relative tw-flex tw-items-start" }, h("div", { class: "tw-flex tw-items-center tw-h-5" }, h("input", { id: inputId, type: "checkbox", name: fieldName, checked: isSelected, value: value, onChange: e => this.onCheckChanged(e), class: "focus:tw-ring-blue-500 tw-h-4 tw-w-4 tw-text-blue-600 tw-border-gray-300 tw-rounded" })), h("div", { class: "tw-ml-3 tw-text-sm" }, h("label", { htmlFor: inputId, class: "tw-font-medium tw-text-gray-700" }, text))));
    })));
  }
  static get is() { return "elsa-check-list"; }
  static get properties() {
    return {
      "selectList": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SelectList",
          "resolved": "SelectList",
          "references": {
            "SelectList": {
              "location": "import",
              "path": "../../../models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{items: [], isFlagsEnum: false}"
      },
      "selectedValues": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "Array<string>",
          "resolved": "string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "selectedValue": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selected-value",
        "reflect": false
      },
      "fieldName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "field-name",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "selectedValuesChanged",
        "name": "selectedValuesChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Array<string> | number",
          "resolved": "number | string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=check-list.js.map
