'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');

const TypePickerInput = class {
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
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const availableTypes = descriptorsStore.state.variableDescriptors;
    const groupedVariableTypes = lodash.lodash.groupBy(availableTypes, x => x.category);
    const input = utils.getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const value = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (index.h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, index.h("option", { value: "", selected: (!currentValue || currentValue == "") }), Object.keys(groupedVariableTypes).map(category => {
      const variableTypes = groupedVariableTypes[category];
      return (index.h("optgroup", { label: category }, variableTypes.map(descriptor => index.h("option", { value: descriptor.typeName, selected: descriptor.typeName == currentValue }, descriptor.displayName))));
    }))));
  }
};

exports.elsa_type_picker_input = TypePickerInput;

//# sourceMappingURL=elsa-type-picker-input.cjs.entry.js.map