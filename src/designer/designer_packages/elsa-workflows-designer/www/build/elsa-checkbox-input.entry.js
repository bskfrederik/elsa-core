import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { n as getInputPropertyValue, _ as SyntaxNames } from './index-7d63808a.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

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