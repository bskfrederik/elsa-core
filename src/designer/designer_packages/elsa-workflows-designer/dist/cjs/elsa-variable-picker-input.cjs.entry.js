'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const formEntry = require('./form-entry-890351d0.js');
const state = require('./state-b887cd17.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');
require('./hint-34535b0d.js');
require('./state-tunnel-df062325.js');

const VariablePickerInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChange = (e) => {
      const inputElement = e.target;
      const variableId = inputElement.value;
      const variable = this.workflowDefinition.variables.find(x => x.id == variableId);
      this.inputContext.inputChanged(variable, utils.SyntaxNames.Literal);
    };
    this.inputContext = undefined;
    this.workflowDefinition = undefined;
  }
  render() {
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    let currentValue = utils.getPropertyValue(inputContext);
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (index.h(state.WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let variables = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.variables) !== null && _a !== void 0 ? _a : [];
      variables = [null, ...variables];
      return index.h(formEntry.FormEntry, { fieldId: fieldId, label: displayName, hint: description }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, variables.map((variable) => {
        const variableName = variable === null || variable === void 0 ? void 0 : variable.name;
        const variableId = variable === null || variable === void 0 ? void 0 : variable.id;
        const isSelected = variableId == (currentValue === null || currentValue === void 0 ? void 0 : currentValue.id);
        return index.h("option", { value: variableId, selected: isSelected }, variableName);
      })));
    }));
  }
};
state.WorkflowDefinitionTunnel.injectProps(VariablePickerInput, ['workflowDefinition']);

exports.elsa_variable_picker_input = VariablePickerInput;

//# sourceMappingURL=elsa-variable-picker-input.cjs.entry.js.map