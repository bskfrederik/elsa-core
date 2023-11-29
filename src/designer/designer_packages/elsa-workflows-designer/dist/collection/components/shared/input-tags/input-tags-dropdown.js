import { h } from '@stencil/core';
import { uniq } from 'lodash';
export class InputTagsDropdown {
  constructor() {
    this.updateCurrentValues = (newValue) => {
      const dropdownValues = this.dropdownValues || [];
      let values = [];
      if (!!newValue) {
        newValue.forEach(value => {
          const valueKey = typeof (value) == 'string' ? value : value.value;
          const tag = dropdownValues.find(x => x.value == valueKey);
          if (!!tag)
            values.push(tag);
        });
      }
      this.currentValues = values;
    };
    this.fieldName = undefined;
    this.fieldId = undefined;
    this.placeHolder = 'Add tag';
    this.values = [];
    this.dropdownValues = [];
    this.currentValues = [];
  }
  valuesChangedHandler(newValue) {
    this.updateCurrentValues(newValue);
  }
  componentWillLoad() {
    this.updateCurrentValues(this.values);
  }
  async onTagSelected(e) {
    e.preventDefault();
    const input = e.target;
    const currentTag = {
      text: input.options[input.selectedIndex].text.trim(),
      value: input.value
    };
    if (currentTag.value.length == 0)
      return;
    const values = uniq([...this.currentValues, currentTag]);
    input.value = "Add";
    await this.valueChanged.emit(values);
  }
  async onDeleteTagClick(e, currentTag) {
    e.preventDefault();
    this.currentValues = this.currentValues.filter(tag => tag.value !== currentTag.value);
    await this.valueChanged.emit(this.currentValues);
  }
  render() {
    let values = this.currentValues || [];
    let dropdownItems = this.dropdownValues.filter(x => values.findIndex(y => y.value === x.value) < 0);
    if (!Array.isArray(values))
      values = [];
    const valuesJson = JSON.stringify(values.map(tag => tag.value));
    return (h("div", { class: "tw-py-2 tw-px-3 tw-bg-white tw-shadow-sm tw-border tw-border-gray-300 tw-rounded-md" }, values.map(tag => (h("a", { href: "#", onClick: e => this.onDeleteTagClick(e, tag), class: "tw-inline-block tw-text-xs tw-bg-blue-400 tw-text-white tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-rounded" }, h("input", { type: "hidden", value: tag.value }), h("span", null, tag.text), h("span", { class: "tw-text-white hover:tw-text-white tw-ml-1" }, "\u00D7")))), h("select", { id: this.fieldId, class: "tw-inline-block tw-text-xs tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-pr-8 tw-border-gray-300 focus:tw-outline-none focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-rounded", onChange: (e) => this.onTagSelected(e) }, h("option", { value: "Add", disabled: true, selected: true }, this.placeHolder), dropdownItems.map(tag => h("option", { value: tag.value }, tag.text))), h("input", { type: "hidden", name: this.fieldName, value: valuesJson })));
  }
  static get is() { return "elsa-input-tags-dropdown"; }
  static get properties() {
    return {
      "fieldName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "field-name",
        "reflect": false
      },
      "fieldId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "field-id",
        "reflect": false
      },
      "placeHolder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "place-holder",
        "reflect": false,
        "defaultValue": "'Add tag'"
      },
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<string | SelectListItem>",
          "resolved": "(string | SelectListItem)[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "SelectListItem": {
              "location": "import",
              "path": "../../../models"
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
      "dropdownValues": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<SelectListItem>",
          "resolved": "SelectListItem[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "SelectListItem": {
              "location": "import",
              "path": "../../../models"
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
      }
    };
  }
  static get states() {
    return {
      "currentValues": {}
    };
  }
  static get events() {
    return [{
        "method": "valueChanged",
        "name": "valueChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "SelectListItem[]| string[]",
          "resolved": "SelectListItem[] | string[]",
          "references": {
            "SelectListItem": {
              "location": "import",
              "path": "../../../models"
            }
          }
        }
      }];
  }
  static get watchers() {
    return [{
        "propName": "values",
        "methodName": "valuesChangedHandler"
      }];
  }
}
//# sourceMappingURL=input-tags-dropdown.js.map
