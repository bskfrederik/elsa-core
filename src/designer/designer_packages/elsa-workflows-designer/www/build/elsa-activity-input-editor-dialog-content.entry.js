import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { l as lodash } from './lodash-cadbac1e.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry-c5af3e68.js';
import { q as isNullOrWhitespace } from './index-7d63808a.js';
import './_commonjsHelpers-a4f66ccd.js';
import './index-4ac684d0.js';
import './hint-ef7d4b14.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './state-450cc93e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const ActivityInputEditorDialogContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputChanged = createEvent(this, "inputChanged", 7);
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
  render() {
    var _a;
    const input = (_a = this.input) !== null && _a !== void 0 ? _a : { name: '', type: 'Object', isArray: false };
    const inputTypeName = input.type;
    const availableTypes = state.variableDescriptors;
    const storageDrivers = state.storageDrivers;
    const groupedTypes = lodash.groupBy(availableTypes, x => x.category);
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
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, "Edit input definition"), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "inputName", label: "Name", hint: "The technical name of the input." }, h("input", { type: "text", name: "inputName", id: "inputName", value: input.name })), h(FormEntry, { fieldId: "inputTypeName", label: "Type", hint: "The type of the input." }, h("select", { id: "inputTypeName", name: "inputTypeName" }, Object.keys(groupedTypes).map(category => {
      const types = groupedTypes[category];
      return (h("optgroup", { label: category }, types.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == inputTypeName }, descriptor.displayName))));
    }))), h(CheckboxFormEntry, { fieldId: "inputIsArray", label: "This input is an array", hint: "Check if the input holds an array of the selected type." }, h("input", { type: "checkbox", name: "inputIsArray", id: "inputIsArray", value: "true", checked: input.isArray })), h(FormEntry, { fieldId: "inputDisplayName", label: "Display name", hint: "The user friendly display name of the input." }, h("input", { type: "text", name: "inputDisplayName", id: "inputDisplayName", value: input.displayName })), h(FormEntry, { fieldId: "inputDescription", label: "Description", hint: "A description of the input." }, h("input", { type: "text", name: "inputDescription", id: "inputDescription", value: input.description })), h(FormEntry, { fieldId: "inputCategory", label: "Category", hint: "A custom category." }, h("input", { type: "text", name: "inputCategory", id: "inputCategory", value: input.category })), h(FormEntry, { fieldId: "inputUIHint", label: "Control", hint: "The control to use for this input." }, h("select", { name: "inputUIHint", id: "inputUIHint" }, uiHints.map(uiHint => {
      const isSelected = uiHint.value == selectedUIHint;
      return h("option", { value: uiHint.value, selected: isSelected }, uiHint.name);
    }))), h(FormEntry, { fieldId: "inputStorageDriverType", label: "Storage", hint: "The storage to use when persisting the input." }, h("select", { id: "inputStorageDriverType", name: "inputStorageDriverType" }, storageDrivers.map(driver => {
      const value = driver.typeName;
      const text = driver.displayName;
      const selected = value == input.storageDriverType;
      return h("option", { value: value, selected: selected }, text);
    }))))))));
  }
};

export { ActivityInputEditorDialogContent as elsa_activity_input_editor_dialog_content };

//# sourceMappingURL=elsa-activity-input-editor-dialog-content.entry.js.map