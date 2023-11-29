import { h } from "@stencil/core";
import descriptorsStore from "../../../../data/descriptors-store";
import { Container } from "typedi";
import { ModalActionType, ModalDialogService } from "../../../../components/shared/modal-dialog";
import { DeleteIcon, EditIcon } from "../../../../components/icons/tooling";
import { FormEntry } from "../../../../components/shared/forms/form-entry";
import { getLocaleComponentStrings } from "../../../../utils/locale";
export class InputOutputSettings {
  constructor() {
    this.renderInputs = () => {
      const inputs = this.inputsState;
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, this.strings.inputsLabel)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.inputName), h("th", { scope: "col" }, this.strings.inputType), h("th", { scope: "col" }))), h("tbody", null, inputs.map(input => {
        var _a;
        const descriptor = descriptorsStore.variableDescriptors.find(x => x.typeName == input.type);
        const typeDisplayName = (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _a !== void 0 ? _a : input.type;
        return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, input.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
            { text: this.strings.editButton, handler: e => this.onEditInputClick(e, input), icon: h(EditIcon, null) },
            { text: this.strings.deleteButton, handler: e => this.onDeleteInputClick(e, input), icon: h(DeleteIcon, null) },
          ] }))));
      })))), h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddInputClick() }, this.strings.addInputButton)));
    };
    this.renderOutputs = () => {
      const outputs = this.outputsState;
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, this.strings.outputLabel)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.outputName), h("th", { scope: "col" }, this.strings.outputType), h("th", { scope: "col" }))), h("tbody", null, outputs.map(output => {
        var _a;
        const descriptor = descriptorsStore.variableDescriptors.find(x => x.typeName == output.type);
        const typeDisplayName = (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _a !== void 0 ? _a : output.type;
        return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, output.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
            { text: this.strings.editButton, handler: e => this.onEditOutputClick(e, output), icon: h(EditIcon, null) },
            { text: this.strings.deleteButton, handler: e => this.onDeleteOutputClick(e, output), icon: h(DeleteIcon, null) },
          ] }))));
      })))), h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddOutputClick() }, this.strings.addOutputButton)));
    };
    this.renderOutcomes = () => {
      const outcomes = [...this.outcomes];
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, this.strings.labelOutcome)), h(FormEntry, { label: "", fieldId: "WorkflowDefinitionOutcomes", hint: this.strings.outcomeHint }, h("elsa-input-tags", { placeHolder: this.strings.placeholderOutcome, values: outcomes, onValueChanged: e => this.onOutcomesChanged(e.detail) })));
    };
    this.getInputNameExists = (name) => !!this.inputsState.find(x => x.name == name);
    this.getOutputNameExists = (name) => !!this.outputsState.find(x => x.name == name);
    this.updateInputsState = (value) => {
      this.inputsState = value;
      this.inputsChanged.emit(value);
    };
    this.updateOutputsState = (value) => {
      this.outputsState = value;
      this.outputsChanged.emit(value);
    };
    this.generateNewInputName = () => {
      const inputs = this.inputsState;
      let counter = inputs.length;
      while (true) {
        const newName = `Input${++counter}`;
        if (!this.getInputNameExists(newName))
          return newName;
      }
    };
    this.generateNewOutputName = () => {
      const outputs = this.outputsState;
      let counter = outputs.length;
      while (true) {
        const newName = `Output${++counter}`;
        if (!this.getOutputNameExists(newName))
          return newName;
      }
    };
    this.onAddInputClick = async () => {
      const newName = this.generateNewInputName();
      const input = { name: newName, type: 'Object', displayName: newName, isArray: false };
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-activity-input-editor-dialog-content", { input: input }), { actions: [this.inputSaveAction] });
    };
    this.onAddOutputClick = async () => {
      const newName = this.generateNewOutputName();
      const output = { name: newName, type: 'Object', displayName: newName, isArray: false };
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-activity-output-editor-dialog-content", { output: output }), { actions: [this.outputSaveAction] });
    };
    this.onEditInputClick = async (e, input) => {
      e.preventDefault();
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-activity-input-editor-dialog-content", { input: input }), { actions: [this.inputSaveAction] });
    };
    this.onEditOutputClick = async (e, output) => {
      e.preventDefault();
      this.modalDialogInstance = this.modalDialogService.show(() => h("elsa-activity-output-editor-dialog-content", { output: output }), { actions: [this.outputSaveAction] });
    };
    this.onDeleteInputClick = (e, input) => {
      e.preventDefault();
      const inputs = this.inputsState.filter(x => x != input);
      this.updateInputsState(inputs);
    };
    this.onDeleteOutputClick = (e, output) => {
      e.preventDefault();
      const outputs = this.outputsState.filter(x => x != output);
      this.updateOutputsState(outputs);
    };
    this.onInputDefinitionChanged = async (a) => {
      const updatedInput = await a.instance.modalDialogContentRef.getInput();
      let inputs = this.inputsState;
      const inputExists = !!inputs.find(x => x == updatedInput);
      if (inputExists)
        inputs = [...inputs];
      else
        inputs = [...inputs, updatedInput];
      inputs = inputs.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      this.updateInputsState(inputs);
    };
    this.onOutputDefinitionChanged = async (a) => {
      const updatedOutput = await a.instance.modalDialogContentRef.getOutput();
      let outputs = this.outputsState;
      const outputExists = !!outputs.find(x => x == updatedOutput);
      if (outputExists)
        outputs = [...outputs];
      else
        outputs = [...outputs, updatedOutput];
      outputs = outputs.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      this.updateOutputsState(outputs);
    };
    this.onOutcomesChanged = (outcomes) => {
      this.outcomesChanged.emit(outcomes);
    };
    this.inputs = undefined;
    this.outputs = undefined;
    this.outcomes = undefined;
    this.inputsState = [];
    this.outputsState = [];
    this.modalDialogService = Container.get(ModalDialogService);
    this.inputSaveAction = {
      name: 'Save',
      type: ModalActionType.Submit,
      text: 'Save',
      isPrimary: true,
      onClick: this.onInputDefinitionChanged
    };
    this.outputSaveAction = {
      name: 'Save',
      type: ModalActionType.Submit,
      text: 'Save',
      isPrimary: true,
      onClick: this.onOutputDefinitionChanged
    };
  }
  onInputsPropChanged(value) {
    this.inputsState = !!this.inputs ? [...this.inputs] : [];
  }
  onOutputsPropChanged(value) {
    this.outputsState = !!this.outputs ? [...this.outputs] : [];
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    this.onInputsPropChanged(this.inputs);
    this.onOutputsPropChanged(this.outputs);
  }
  render() {
    return (h("div", null, this.renderInputs(), this.renderOutputs(), this.renderOutcomes()));
  }
  static get is() { return "elsa-workflow-definition-input-output-settings"; }
  static get properties() {
    return {
      "inputs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<InputDefinition>",
          "resolved": "InputDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "InputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "outputs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<OutputDefinition>",
          "resolved": "OutputDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "OutputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "outcomes": {
        "type": "unknown",
        "mutable": false,
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
        }
      }
    };
  }
  static get states() {
    return {
      "inputsState": {},
      "outputsState": {}
    };
  }
  static get events() {
    return [{
        "method": "inputsChanged",
        "name": "inputsChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "InputDefinition[]",
          "resolved": "InputDefinition[]",
          "references": {
            "InputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "outputsChanged",
        "name": "outputsChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "OutputDefinition[]",
          "resolved": "OutputDefinition[]",
          "references": {
            "OutputDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "outcomesChanged",
        "name": "outcomesChanged",
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
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "inputs",
        "methodName": "onInputsPropChanged"
      }, {
        "propName": "outputs",
        "methodName": "onOutputsPropChanged"
      }];
  }
}
//# sourceMappingURL=input-output-settings.js.map
