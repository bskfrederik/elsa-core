import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { o as isNullOrWhitespace, u as generateIdentity } from './utils.js';
import './toolbar-component-store.js';
import { s as state } from './descriptors-store.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry.js';
import { g as getLocaleComponentStrings } from './locale.js';

const VariableEditorDialogContent = /*@__PURE__*/ proxyCustomElement(class VariableEditorDialogContent extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    console.log(this.strings);
  }
  render() {
    var _a;
    const variable = (_a = this.variable) !== null && _a !== void 0 ? _a : { id: '', name: '', typeName: 'Object', isArray: false };
    const variableTypeName = variable.typeName;
    const availableTypes = state.variableDescriptors;
    const groupedVariableTypes = lodash.groupBy(availableTypes, x => x.category);
    const storageDrivers = state.storageDrivers;
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.editVariable), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "variableName", label: this.strings.labelName, hint: this.strings.nameHint }, h("input", { type: "text", name: "variableName", id: "variableName", value: variable.name })), h(FormEntry, { fieldId: "variableTypeName", label: this.strings.labelType, hint: this.strings.typeHint }, h("select", { id: "variableTypeName", name: "variableTypeName" }, Object.keys(groupedVariableTypes).map(category => {
      const variableTypes = groupedVariableTypes[category];
      return (h("optgroup", { label: category }, variableTypes.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == variableTypeName }, descriptor.displayName))));
    }))), h(CheckboxFormEntry, { fieldId: "variableIsArray", label: this.strings.labelArray, hint: this.strings.arrayHint }, h("input", { type: "checkbox", name: "variableIsArray", id: "variableIsArray", value: "true", checked: variable.isArray })), h(FormEntry, { fieldId: "variableValue", label: this.strings.labelValue, hint: this.strings.valueHint }, h("input", { type: "text", name: "variableValue", id: "variableValue", value: variable.value })), h(FormEntry, { fieldId: "variableStorageDriverId", label: this.strings.labelStorage, hint: this.strings.storageHint }, h("select", { id: "variableStorageDriverTypeName", name: "variableStorageDriverTypeName" }, storageDrivers.map(driver => {
      const value = driver.typeName;
      const text = driver.displayName;
      const selected = value == variable.storageDriverTypeName;
      return h("option", { value: value, selected: selected }, text);
    }))))))));
  }
  get element() { return this; }
}, [0, "elsa-variable-editor-dialog-content", {
    "variable": [16],
    "getVariable": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-variable-editor-dialog-content"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-variable-editor-dialog-content":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VariableEditorDialogContent);
      }
      break;
  } });
}

export { VariableEditorDialogContent as V, defineCustomElement as d };

//# sourceMappingURL=variable-editor-dialog-content.js.map