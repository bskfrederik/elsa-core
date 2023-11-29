import { h } from '@stencil/core';
import { uniq } from 'lodash';
export class InputTags {
  constructor() {
    this.addItem = async (item) => {
      const values = uniq([...this.values || [], item]);
      this.values = values;
      await this.valueChanged.emit(values);
    };
    this.fieldId = undefined;
    this.placeHolder = 'Add tag';
    this.values = [];
  }
  async onInputKeyDown(e) {
    if (e.key != "Enter")
      return;
    e.preventDefault();
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onInputBlur(e) {
    const input = e.target;
    const value = input.value.trim();
    if (value.length == 0)
      return;
    await this.addItem(value);
    input.value = '';
  }
  async onDeleteTagClick(e, tag) {
    e.preventDefault();
    this.values = this.values.filter(x => x !== tag);
    await this.valueChanged.emit(this.values);
  }
  render() {
    let values = this.values || [];
    if (!Array.isArray(values))
      values = [];
    return (h("div", { class: "tw-py-2 tw-px-3 tw-bg-white tw-shadow-sm tw-border tw-border-gray-300 tw-rounded-md" }, values.map(value => (h("a", { href: "#", onClick: e => this.onDeleteTagClick(e, value), class: "tw-inline-block tw-text-xs tw-bg-blue-400 tw-text-white tw-py-2 tw-px-3 tw-mr-1 tw-mb-1 tw-rounded" }, h("span", null, value), h("span", { class: "tw-text-white hover:tw-text-white tw-ml-1" }, "\u00D7")))), h("input", { type: "text", id: this.fieldId, onKeyDown: e => this.onInputKeyDown(e), onBlur: e => this.onInputBlur(e), class: "tag-input tw-inline-block tw-text-sm tw-outline-none focus:tw-outline-none tw-border-none tw-shadow-none focus:tw-border-none focus:tw-border-transparent focus:tw-shadow-none", placeholder: this.placeHolder })));
  }
  static get is() { return "elsa-input-tags"; }
  static get originalStyleUrls() {
    return {
      "$": ["input-tags.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input-tags.css"]
    };
  }
  static get properties() {
    return {
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
      }
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
          "original": "Array<string>",
          "resolved": "string[]",
          "references": {
            "Array": {
              "location": "global"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=input-tags.js.map
