import { h } from "@stencil/core";
import descriptorsStore from "../../../../data/descriptors-store";
import { Container } from "typedi";
import { ModalActionType, ModalDialogService } from "../../../../components/shared/modal-dialog";
import { DeleteIcon, EditIcon } from "../../../../components/icons/tooling";
import { getLocaleComponentStrings } from "../../../../utils/locale";
export class VariablesEditor {
  constructor() {
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
    const storageDrivers = descriptorsStore.storageDrivers;
    return (h("div", null, h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddVariableClick() }, "Add variable")), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.columName), h("th", { scope: "col" }, this.strings.columnType), h("th", { scope: "col" }, this.strings.columStorage), h("th", { scope: "col" }))), h("tbody", null, variables.map(variable => {
      var _a, _b;
      const storage = storageDrivers.find(x => x.typeName == variable.storageDriverTypeName);
      const storageName = (_a = storage === null || storage === void 0 ? void 0 : storage.displayName) !== null && _a !== void 0 ? _a : '-';
      const descriptor = descriptorsStore.variableDescriptors.find(x => x.typeName == variable.typeName);
      const typeDisplayName = (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _b !== void 0 ? _b : variable.typeName;
      return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, variable.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", null, storageName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
          { text: this.strings.variableEditButton, handler: e => this.onEditClick(e, variable), icon: h(EditIcon, null) },
          { text: this.strings.variableDeleteButton, handler: e => this.onDeleteClick(e, variable), icon: h(DeleteIcon, null) },
        ] }))));
    }))))));
  }
  static get is() { return "elsa-variables-editor"; }
  static get properties() {
    return {
      "variables": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<Variable>",
          "resolved": "Variable[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "Variable": {
              "location": "import",
              "path": "../../../../models"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "variablesState": {}
    };
  }
  static get events() {
    return [{
        "method": "variablesChanged",
        "name": "variablesChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Variable[]",
          "resolved": "Variable[]",
          "references": {
            "Variable": {
              "location": "import",
              "path": "../../../../models"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "variables",
        "methodName": "onVariablesPropChanged"
      }];
  }
}
//# sourceMappingURL=variables-editor.js.map
