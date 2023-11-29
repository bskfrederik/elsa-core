import { h } from "@stencil/core";
import { groupBy } from 'lodash';
import descriptorsStore from '../../../../data/descriptors-store';
import { CheckboxFormEntry, FormEntry } from "../../../../components/shared/forms/form-entry";
import { isNullOrWhitespace } from "../../../../utils";
import { getLocaleComponentStrings } from "../../../../utils/locale";
export class ActivityInputEditorDialogContent {
  constructor() {
    this.onSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const input = this.getInputInternal(form);
      this.inputChanged.emit(input);
    };
    this.getInputInternal = (form) => {
      const formData = new FormData(form);
      const name = formData.get('inputName');
      const displayName = formData.get('inputDisplayName');
      const type = formData.get('inputTypeName');
      const description = formData.get('inputDescription');
      const category = formData.get('inputCategory');
      const uiHint = formData.get('inputUIHint');
      const isArray = formData.get('inputIsArray') === 'true';
      const driverType = formData.get('inputStorageDriverType');
      const input = this.input;
      input.name = name;
      input.type = type;
      input.displayName = displayName;
      input.category = category;
      input.description = description;
      input.uiHint = uiHint;
      input.isArray = isArray;
      input.storageDriverType = isNullOrWhitespace(driverType) ? null : driverType;
      return input;
    };
    this.input = undefined;
  }
  async getInput() {
    return this.getInputInternal(this.formElement);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    console.log(this.strings);
  }
  render() {
    var _a;
    const input = (_a = this.input) !== null && _a !== void 0 ? _a : { name: '', type: 'Object', isArray: false };
    const inputTypeName = input.type;
    const availableTypes = descriptorsStore.variableDescriptors;
    const storageDrivers = descriptorsStore.storageDrivers;
    const groupedTypes = groupBy(availableTypes, x => x.category);
    const selectedUIHint = input.uiHint;
    // TODO: Get this from configuration (API).
    const uiHints = [{
        name: 'Single line',
        value: 'single-line'
      }, {
        name: 'Multi line',
        value: 'multi-line'
      }, {
        name: 'Checkbox',
        value: 'checkbox'
      }, {
        name: 'Check list',
        value: 'check-list'
      }, {
        name: 'Radio list',
        value: 'radio-list'
      }, {
        name: 'Dropdown',
        value: 'dropdown'
      }, {
        name: 'Multi text',
        value: 'multi-text'
      }, {
        name: 'Code editor',
        value: 'code-editor'
      }, {
        name: 'Variable picker',
        value: 'variable-picker'
      }, {
        name: 'Type picker',
        value: 'type-picker'
      }
    ];
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, " ", this.strings.editInputConfiguration), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "inputName", label: this.strings.inputName, hint: this.strings.inputNameHint }, h("input", { type: "text", name: "inputName", id: "inputName", value: input.name })), h(FormEntry, { fieldId: "inputTypeName", label: this.strings.inputType, hint: this.strings.inputTypeHint }, h("select", { id: "inputTypeName", name: "inputTypeName" }, Object.keys(groupedTypes).map(category => {
      const types = groupedTypes[category];
      return (h("optgroup", { label: category }, types.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == inputTypeName }, descriptor.displayName))));
    }))), h(CheckboxFormEntry, { fieldId: "inputIsArray", label: this.strings.arrayInputLabel, hint: this.strings.arrayInputHint }, h("input", { type: "checkbox", name: "inputIsArray", id: "inputIsArray", value: "true", checked: input.isArray })), h(FormEntry, { fieldId: "inputDisplayName", label: this.strings.displayNameLabel, hint: this.strings.displayNameHint }, h("input", { type: "text", name: "inputDisplayName", id: "inputDisplayName", value: input.displayName })), h(FormEntry, { fieldId: "inputDescription", label: this.strings.inputDescriptionLabel, hint: this.strings.inputDescriptionHint }, h("input", { type: "text", name: "inputDescription", id: "inputDescription", value: input.description })), h(FormEntry, { fieldId: "inputCategory", label: this.strings.inputCategoryLabel, hint: this.strings.inputCategoryHint }, h("input", { type: "text", name: "inputCategory", id: "inputCategory", value: input.category })), h(FormEntry, { fieldId: "inputUIHint", label: this.strings.controlLabel, hint: this.strings.controlHint }, h("select", { name: "inputUIHint", id: "inputUIHint" }, uiHints.map(uiHint => {
      const isSelected = uiHint.value == selectedUIHint;
      return h("option", { value: uiHint.value, selected: isSelected }, uiHint.name);
    }))), h(FormEntry, { fieldId: "inputStorageDriverType", label: this.strings.storageLabel, hint: this.strings.storageHint }, h("select", { id: "inputStorageDriverType", name: "inputStorageDriverType" }, storageDrivers.map(driver => {
      const value = driver.typeName;
      const text = driver.displayName;
      const selected = value == input.storageDriverType;
      return h("option", { value: value, selected: selected }, text);
    }))))))));
  }
  static get is() { return "elsa-activity-input-editor-dialog-content"; }
  static get properties() {
    return {
      "input": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "InputDefinition",
          "resolved": "InputDefinition",
          "references": {
            "InputDefinition": {
              "location": "import",
              "path": "../../models/entities"
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
  static get events() {
    return [{
        "method": "inputChanged",
        "name": "inputChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "InputDefinition",
          "resolved": "InputDefinition",
          "references": {
            "InputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "getInput": {
        "complexType": {
          "signature": "() => Promise<InputDefinition>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "InputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          },
          "return": "Promise<InputDefinition>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
}
//# sourceMappingURL=activity-input-editor-dialog-content.js.map
