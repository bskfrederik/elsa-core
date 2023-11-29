import { r as registerInstance, h } from './index-08112852.js';
import { l as getInputPropertyValue, R as SyntaxNames } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';

const Checkbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.getSelectedValue = () => {
      var _a, _b;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const defaultValue = inputDescriptor.defaultValue;
      const input = getInputPropertyValue(inputContext);
      const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
      return typeof value == "boolean" ? value : typeof value == "string" ? (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'true' : false;
    };
    this.onPropertyEditorChanged = (e) => {
      const inputElement = e.target;
      this.isChecked = inputElement.checked;
      this.inputContext.inputChanged(inputElement.checked, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
    this.isChecked = undefined;
  }
  async componentWillLoad() {
    this.isChecked = this.getSelectedValue();
  }
  render() {
    var _a, _b, _c, _d;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const defaultValue = inputDescriptor.defaultValue;
    const input = getInputPropertyValue(inputContext);
    const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const isChecked = this.isChecked;
    return (h("elsa-input-control-switch", { label: displayName, hideLabel: true, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("div", { class: "tw-flex tw-space-x-1" }, h("input", { type: "checkbox", name: fieldName, id: fieldId, checked: isChecked, onChange: this.onPropertyEditorChanged }), h("label", { htmlFor: fieldId }, displayName))));
  }
};

export { Checkbox as elsa_checkbox_input };

//# sourceMappingURL=elsa-checkbox-input.entry.js.map