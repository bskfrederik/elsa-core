import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { l as lodash } from './lodash-cadbac1e.js';
import { q as isNullOrWhitespace, v as generateIdentity } from './index-7d63808a.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry-c5af3e68.js';
import './_commonjsHelpers-a4f66ccd.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';
import './hint-ef7d4b14.js';

const VariableEditorDialogContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variableChanged = createEvent(this, "variableChanged", 7);
    this.onSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const variable = this.getVariableInternal(form);
      this.variableChanged.emit(variable);
    };
    this.getVariableInternal = (form) => {
      const formData = new FormData(form);
      const name = formData.get('variableName');
      const value = formData.get('variableValue');
      const type = formData.get('variableTypeName');
      const isArray = formData.get('variableIsArray') == 'true';
      const driverTypeName = formData.get('variableStorageDriverTypeName');
      const variable = this.variable;
      if (isNullOrWhitespace(variable.id))
        variable.id = generateIdentity();
      variable.name = name;
      variable.typeName = type;
      variable.value = value;
      variable.isArray = isArray;
      variable.storageDriverTypeName = isNullOrWhitespace(driverTypeName) ? null : driverTypeName;
      return variable;
    };
    this.variable = undefined;
  }
  async getVariable() {
    return this.getVariableInternal(this.formElement);
  }
  render() {
    var _a;
    const variable = (_a = this.variable) !== null && _a !== void 0 ? _a : { id: '', name: '', typeName: 'Object', isArray: false };
    const variableTypeName = variable.typeName;
    const availableTypes = state.variableDescriptors;
    const groupedVariableTypes = lodash.groupBy(availableTypes, x => x.category);
    const storageDrivers = state.storageDrivers;
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, "Edit Variable"), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "variableName", label: "Name", hint: "The technical name of the variable." }, h("input", { type: "text", name: "variableName", id: "variableName", value: variable.name })), h(FormEntry, { fieldId: "variableTypeName", label: "Type", hint: "The type of the variable." }, h("select", { id: "variableTypeName", name: "variableTypeName" }, Object.keys(groupedVariableTypes).map(category => {
      const variableTypes = groupedVariableTypes[category];
      return (h("optgroup", { label: category }, variableTypes.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == variableTypeName }, descriptor.displayName))));
    }))), h(CheckboxFormEntry, { fieldId: "variableIsArray", label: "This variable is an array", hint: "Check if the variable holds an array of the selected type." }, h("input", { type: "checkbox", name: "variableIsArray", id: "variableIsArray", value: "true", checked: variable.isArray })), h(FormEntry, { fieldId: "variableValue", label: "Value", hint: "The value of the variable." }, h("input", { type: "text", name: "variableValue", id: "variableValue", value: variable.value })), h(FormEntry, { fieldId: "variableStorageDriverId", label: "Storage", hint: "The storage to use when persisting the variable." }, h("select", { id: "variableStorageDriverTypeName", name: "variableStorageDriverTypeName" }, storageDrivers.map(driver => {
      const value = driver.typeName;
      const text = driver.displayName;
      const selected = value == variable.storageDriverTypeName;
      return h("option", { value: value, selected: selected }, text);
    }))))))));
  }
};

export { VariableEditorDialogContent as elsa_variable_editor_dialog_content };

//# sourceMappingURL=elsa-variable-editor-dialog-content.entry.js.map