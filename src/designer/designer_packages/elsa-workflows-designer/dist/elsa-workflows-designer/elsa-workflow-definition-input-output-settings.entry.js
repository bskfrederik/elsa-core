import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { s as state } from './descriptors-store-02a4f91c.js';
import { E as EditIcon, b as DeleteIcon, C as Container, M as ModalDialogService } from './index-1637bf51.js';
import { F as FormEntry } from './form-entry-c5af3e68.js';
import { M as ModalActionType } from './models-09298028.js';
import './index-4ac684d0.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './hint-ef7d4b14.js';

const InputOutputSettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputsChanged = createEvent(this, "inputsChanged", 7);
    this.outputsChanged = createEvent(this, "outputsChanged", 7);
    this.outcomesChanged = createEvent(this, "outcomesChanged", 7);
    this.renderInputs = () => {
      const inputs = this.inputsState;
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, "Inputs")), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, "Name"), h("th", { scope: "col" }, "Type"), h("th", { scope: "col" }))), h("tbody", null, inputs.map(input => {
        var _a;
        const descriptor = state.variableDescriptors.find(x => x.typeName == input.type);
        const typeDisplayName = (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _a !== void 0 ? _a : input.type;
        return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, input.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
            { text: 'Edit', handler: e => this.onEditInputClick(e, input), icon: h(EditIcon, null) },
            { text: 'Delete', handler: e => this.onDeleteInputClick(e, input), icon: h(DeleteIcon, null) },
          ] }))));
      })))), h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddInputClick() }, "Add input parameter")));
    };
    this.renderOutputs = () => {
      const outputs = this.outputsState;
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, "Outputs")), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, "Name"), h("th", { scope: "col" }, "Type"), h("th", { scope: "col" }))), h("tbody", null, outputs.map(output => {
        var _a;
        const descriptor = state.variableDescriptors.find(x => x.typeName == output.type);
        const typeDisplayName = (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.displayName) !== null && _a !== void 0 ? _a : output.type;
        return (h("tr", null, h("td", { class: "tw-whitespace-nowrap" }, output.name), h("td", { class: "tw-whitespace-nowrap" }, typeDisplayName), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
            { text: 'Edit', handler: e => this.onEditOutputClick(e, output), icon: h(EditIcon, null) },
            { text: 'Delete', handler: e => this.onDeleteOutputClick(e, output), icon: h(DeleteIcon, null) },
          ] }))));
      })))), h("div", { class: "tw-flex tw-justify-end tw-m-4" }, h("button", { class: "elsa-btn elsa-btn-primary", onClick: e => this.onAddOutputClick() }, "Add output parameter")));
    };
    this.renderOutcomes = () => {
      const outcomes = [...this.outcomes];
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, "Outcomes")), h(FormEntry, { label: "", fieldId: "WorkflowDefinitionOutcomes", hint: "Enter a list of possible outcomes for this workflow." }, h("elsa-input-tags", { placeHolder: "Add outcome", values: outcomes, onValueChanged: e => this.onOutcomesChanged(e.detail) })));
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
  componentWillLoad() {
    this.onInputsPropChanged(this.inputs);
    this.onOutputsPropChanged(this.outputs);
  }
  render() {
    return (h("div", null, this.renderInputs(), this.renderOutputs(), this.renderOutcomes()));
  }
  static get watchers() { return {
    "inputs": ["onInputsPropChanged"],
    "outputs": ["onOutputsPropChanged"]
  }; }
};

export { InputOutputSettings as elsa_workflow_definition_input_output_settings };

//# sourceMappingURL=elsa-workflow-definition-input-output-settings.entry.js.map