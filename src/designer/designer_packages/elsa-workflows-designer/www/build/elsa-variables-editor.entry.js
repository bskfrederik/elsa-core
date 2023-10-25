import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { C as Container, M as ModalDialogService, E as EditIcon, b as DeleteIcon } from './index-1637bf51.js';
import { M as ModalActionType } from './models-09298028.js';
import './index-4ac684d0.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';

const VariablesEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  componentWillLoad() {
    this.onVariablesPropChanged(this.variables);
  }
  render() {
    const variables = this.variables;
    const storageDrivers = state.storageDrivers;
    return (h("div", null, h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddVariableClick() }, "Add variable")), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, "Name"), h("th", { scope: "col" }, "Type"), h("th", { scope: "col" }, "Storage"), h("th", { scope: "col" }))), h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = state.variableDescriptors.find(x => x.typeName == variable.typeName);
      const typeDisplayName = (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _b !== void 0 ? _b : variable.typeName;
      return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, variable.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", null, storageName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
          { text: 'Edit', handler: e => this.onEditClick(e, variable), icon: h(EditIcon, null) },
          { text: 'Delete', handler: e => this.onDeleteClick(e, variable), icon: h(DeleteIcon, null) },
        ] }))));
    }))))));
  }
  static get watchers() { return {
    "variables": ["onVariablesPropChanged"]
  }; }
};

export { VariablesEditor as elsa_variables_editor };

//# sourceMappingURL=elsa-variables-editor.entry.js.map