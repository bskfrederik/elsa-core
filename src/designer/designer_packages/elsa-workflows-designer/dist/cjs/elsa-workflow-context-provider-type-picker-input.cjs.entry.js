'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const state = require('./state-b887cd17.js');
const constants = require('./constants-ca50a211.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');
require('./state-tunnel-df062325.js');

const ProviderTypePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, utils.SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.descriptors = [];
    this.workflowDefinition = undefined;
  }
  render() {
    var _a, _b, _c, _d, _e;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const allProviders = this.descriptors;
    const activatedProviders = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.customProperties[constants.WorkflowContextProviderTypesKey]) !== null && _b !== void 0 ? _b : [];
    const availableProviders = allProviders.filter(x => activatedProviders.includes(x.type));
    const input = utils.getInputPropertyValue(inputContext);
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const value = (_e = input === null || input === void 0 ? void 0 : input.expression) === null || _e === void 0 ? void 0 : _e.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (index.h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, index.h("option", { value: "", selected: (!currentValue || currentValue == "") }), availableProviders.map(descriptor => index.h("option", { value: descriptor.type, selected: descriptor.type == currentValue }, descriptor.name)))));
  }
};
state.WorkflowDefinitionTunnel.injectProps(ProviderTypePicker, ['workflowDefinition']);

exports.elsa_workflow_context_provider_type_picker_input = ProviderTypePicker;

//# sourceMappingURL=elsa-workflow-context-provider-type-picker-input.cjs.entry.js.map