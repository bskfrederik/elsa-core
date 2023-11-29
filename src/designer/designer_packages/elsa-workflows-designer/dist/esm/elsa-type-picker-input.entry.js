import { r as registerInstance, h } from './index-08112852.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import './_commonjsHelpers-7db8bc26.js';
import './index-01748867.js';
import './notification-service-c7fdb37c.js';

const TypePickerInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
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
    const availableTypes = state.variableDescriptors;
    const groupedVariableTypes = lodash.groupBy(availableTypes, x => x.category);
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const value = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, h("option", { value: "", selected: (!currentValue || currentValue == "") }), Object.keys(groupedVariableTypes).map(category => {
      const variableTypes = groupedVariableTypes[category];
      return (h("optgroup", { label: category }, variableTypes.map(descriptor => h("option", { value: descriptor.typeName, selected: descriptor.typeName == currentValue }, descriptor.displayName))));
    }))));
  }
};

export { TypePickerInput as elsa_type_picker_input };

//# sourceMappingURL=elsa-type-picker-input.entry.js.map