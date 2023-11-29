import { h, r as registerInstance, c as createEvent, a as getElement } from './index-08112852.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import { F as FormEntry, C as CheckboxFormEntry } from './form-entry-1204d05c.js';
import { o as isNullOrWhitespace, u as generateIdentity, C as Container, ac as ModalDialogService, a4 as ModalActionType, aa as DefaultContents, a3 as ModalType, ab as DefaultModalActions, B as EventBus, Y as WorkflowDefinitionsApi } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import { g as getLocaleComponentStrings } from './locale-9771e9cf.js';
import { E as EditIcon, D as DeleteIcon } from './edit-1213037d.js';
import { h as hooks } from './notification-service-c7fdb37c.js';
import './_commonjsHelpers-7db8bc26.js';
import './index-01748867.js';
import './hint-4a493871.js';

const RevertIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("path", { d: "M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" }));

const PublishedIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-blue-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }));

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
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    console.log(this.strings);
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
  get element() { return getElement(this); }
};

const ActivityOutputEditorDialogContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.outputChanged = createEvent(this, "outputChanged", 7);
    this.onSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const output = this.getOutputInternal(form);
      this.outputChanged.emit(output);
    };
    this.getOutputInternal = (form) => {
      const formData = new FormData(form);
      const name = formData.get('outputName');
      const displayName = formData.get('outputDisplayName');
      const type = formData.get('outputTypeName');
      const description = formData.get('outputDescription');
      const output = this.output;
      output.name = name;
      output.type = type;
      output.displayName = displayName;
      output.description = description;
      return output;
    };
    this.output = undefined;
  }
  async getOutput() {
    return this.getOutputInternal(this.formElement);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    var _a;
    const output = (_a = this.output) !== null && _a !== void 0 ? _a : { name: '', type: 'Object', isArray: false };
    const outputTypeName = output.type;
    const availableTypes = state.variableDescriptors;
    const groupedTypes = lodash.groupBy(availableTypes, x => x.category);
    return (h("div", null, h("form", { ref: el => this.formElement = el, class: "tw-h-full tw-flex tw-flex-col tw-bg-white", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.editOutputDefinition), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h(FormEntry, { fieldId: "outputName", label: this.strings.outputName, hint: this.strings.outputNameHint }, h("input", { type: "text", name: "outputName", id: "outputName", value: output.name })), h(FormEntry, { fieldId: "outputTypeName", label: this.strings.outputType, hint: this.strings.outputTypeHint }, h("select", { id: "outputTypeName", name: "outputTypeName" }, Object.keys(groupedTypes).map(category => {
      const types = groupedTypes[category];
      return (h("optgroup", { label: category }, types.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == outputTypeName }, descriptor.displayName))));
    }))), h(FormEntry, { fieldId: "outputDisplayName", label: this.strings.outputDisplayName, hint: this.strings.outputDisplayNameHint }, h("input", { type: "text", name: "outputDisplayName", id: "outputDisplayName", value: output.displayName })), h(FormEntry, { fieldId: "outputDescription", label: this.strings.outputDescription, hint: this.strings.outputDescriptionHint }, h("input", { type: "text", name: "outputDescription", id: "outputDescription", value: output.description })))))));
  }
  get element() { return getElement(this); }
};

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
  get element() { return getElement(this); }
};

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
  get element() { return getElement(this); }
  static get watchers() { return {
    "variables": ["onVariablesPropChanged"]
  }; }
};

const Widgets = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.widgets = [];
  }
  render() {
    const widgets = this.widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    return h("div", null, widgets.map(widget => widget.content()));
  }
};

const InputOutputSettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputsChanged = createEvent(this, "inputsChanged", 7);
    this.outputsChanged = createEvent(this, "outputsChanged", 7);
    this.outcomesChanged = createEvent(this, "outcomesChanged", 7);
    this.renderInputs = () => {
      const inputs = this.inputsState;
      return h("div", null, h("div", { class: "tw-p-4" }, h("h3", { class: "tw-text-base tw-leading-6 tw-font-medium tw-text-gray-900" }, this.strings.inputsLabel)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", { scope: "col" }, this.strings.inputName), h("th", { scope: "col" }, this.strings.inputType), h("th", { scope: "col" }))), h("tbody", null, inputs.map(input => {
        var _a;
        const descriptor = state.variableDescriptors.find(x => x.typeName == input.type);
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
        const descriptor = state.variableDescriptors.find(x => x.typeName == output.type);
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
  get element() { return getElement(this); }
  static get watchers() { return {
    "inputs": ["onInputsPropChanged"],
    "outputs": ["onOutputsPropChanged"]
  }; }
};

const WorkflowDefinitionVersionHistory = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.versionSelected = createEvent(this, "versionSelected", 7);
    this.deleteVersionClicked = createEvent(this, "deleteVersionClicked", 7);
    this.revertVersionClicked = createEvent(this, "revertVersionClicked", 7);
    this.onViewVersionClick = (e, version) => {
      e.preventDefault();
      this.versionSelected.emit(version);
    };
    this.onDeleteVersionClick = async (e, version) => {
      e.preventDefault();
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete this version?"), {
        modalType: ModalType.Confirmation,
        actions: [DefaultModalActions.Delete(() => this.deleteVersionClicked.emit(version)), DefaultModalActions.Cancel()]
      });
    };
    this.onRevertVersionClick = (e, version) => {
      e.preventDefault();
      this.revertVersionClicked.emit(version);
    };
    this.selectedVersion = undefined;
    this.workflowVersions = undefined;
    this.serverUrl = undefined;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    return (h("div", null, h("table", null, h("thead", null, h("tr", null, h("th", null), h("th", null, this.strings.version), h("th", null, this.strings.created), h("th", null), h("th", null))), h("tbody", null, this.workflowVersions.map(v => {
      let menuItems = [];
      menuItems.push({ text: this.strings.delete, handler: e => this.onDeleteVersionClick(e, v), icon: h(DeleteIcon, null) });
      if (!v.isLatest)
        menuItems.push({ text: this.strings.revert, handler: e => this.onRevertVersionClick(e, v), icon: h(RevertIcon, null) });
      return (h("tr", null, h("td", null, v.isPublished ? h(PublishedIcon, null) : ""), h("td", null, v.version), h("td", null, hooks(v.createdAt).format('DD-MM-YYYY HH:mm:ss')), h("td", null, h("button", { onClick: e => this.onViewVersionClick(e, v), type: "button", disabled: this.selectedVersion.version == v.version, class: this.selectedVersion.version == v.version ? "elsa-btn elsa-btn-primary" : "elsa-btn elsa-btn-secondary" }, this.strings.view)), h("td", null, v.isPublished || v.isPublished ? undefined : h("elsa-context-menu", { menuItems: menuItems }))));
    })))));
  }
  get element() { return getElement(this); }
};

export { ActivityInputEditorDialogContent as elsa_activity_input_editor_dialog_content, ActivityOutputEditorDialogContent as elsa_activity_output_editor_dialog_content, VariableEditorDialogContent as elsa_variable_editor_dialog_content, VariablesEditor as elsa_variables_editor, Widgets as elsa_widgets, InputOutputSettings as elsa_workflow_definition_input_output_settings, WorkflowDefinitionVersionHistory as elsa_workflow_definition_version_history };

//# sourceMappingURL=elsa-activity-input-editor-dialog-content_7.entry.js.map