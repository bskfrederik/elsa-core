import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { s as state } from './descriptors-store.js';
import { a as ModalActionType } from './modal-type.js';
import { C as Container, aN as ModalDialogService } from './utils.js';
import { D as DeleteIcon } from './delete.js';
import { E as EditIcon } from './edit.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$2 } from './context-menu.js';
import { d as defineCustomElement$1 } from './variable-editor-dialog-content.js';

const VariablesEditor = /*@__PURE__*/ proxyCustomElement(class VariablesEditor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.variablesChanged = createEvent(this, "variablesChanged", 7);
    this.getVariableNameExists = (name) => !!this.variables.find(x => x.name == name);
    this.updateVariablesState = (value) => {
      this.variablesState = value;
      this.variablesChanged.emit(value);
    };
    this.generateNewVariableName = () => {
      const variables = this.variables;
      let counter = variables.length;
      while (true) {
        const newVariableName = `Variable${++counter}`;
        if (!this.getVariableNameExists(newVariableName))
          return newVariableName;
      }
    };
    this.onAddVariableClick = async () => {
      const newVariableName = this.generateNewVariableName();
      const variable = { id: '', name: newVariableName, typeName: 'Object', value: null, isArray: false };
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-variable-editor-dialog-content", { variable: variable }), { actions: [this.saveAction] });
    };
    this.onEditClick = async (e, variable) => {
      e.preventDefault();
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-variable-editor-dialog-content", { variable: variable }), { actions: [this.saveAction] });
    };
    this.onDeleteClick = (e, variable) => {
      e.preventDefault();
      const variables = this.variables.filter(x => x != variable);
      this.updateVariablesState(variables);
    };
    this.onVariableChanged = async (a) => {
      const updatedVariable = await a.instance.modalDialogContentRef.getVariable();
      let variables = this.variables;
      const variableExists = !!variables.find(x => x == updatedVariable);
      if (variableExists)
        variables = [...variables];
      else
        variables = [...variables, updatedVariable];
      variables = variables.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      this.updateVariablesState(variables);
    };
    this.variables = undefined;
    this.variablesState = [];
    this.modalDialogService = Container.get(ModalDialogService);
    this.saveAction = {
      name: 'Save',
      type: ModalActionType.Submit,
      text: 'Save',
      isPrimary: true,
      onClick: this.onVariableChanged
    };
  }
  onVariablesPropChanged(value) {
    this.variablesState = !!this.variables ? [...this.variables] : [];
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    this.onVariablesPropChanged(this.variables);
  }
  render() {
    const variables = this.variables;
    const storageDrivers = state.storageDrivers;
    return (h("div", null, h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddVariableClick() }, "Add variable")), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.columName), h("th", { scope: "col" }, this.strings.columnType), h("th", { scope: "col" }, this.strings.columStorage), h("th", { scope: "col" }))), h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = state.variableDescriptors.find(x => x.typeName == variable.typeName);
      const typeDisplayName = (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _b !== void 0 ? _b : variable.typeName;
      return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, variable.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", null, storageName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
          { text: this.strings.variableEditButton, handler: e => this.onEditClick(e, variable), icon: h(EditIcon, null) },
          { text: this.strings.variableDeleteButton, handler: e => this.onDeleteClick(e, variable), icon: h(DeleteIcon, null) },
        ] }))));
    }))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "variables": ["onVariablesPropChanged"]
  }; }
}, [0, "elsa-variables-editor", {
    "variables": [16],
    "variablesState": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-variables-editor", "elsa-context-menu", "elsa-variable-editor-dialog-content"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-variables-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VariablesEditor);
      }
      break;
    case "elsa-context-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-variable-editor-dialog-content":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { VariablesEditor as V, defineCustomElement as d };

//# sourceMappingURL=variables-editor.js.map