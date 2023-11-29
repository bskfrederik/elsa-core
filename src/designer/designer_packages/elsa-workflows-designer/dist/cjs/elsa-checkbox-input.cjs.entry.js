'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const Checkbox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.getSelectedValue = () => {
      var _a, _b;
      const inputContext = this.inputContext;
      const inputDescriptor = inputContext.inputDescriptor;
      const defaultValue = inputDescriptor.defaultValue;
      const input = utils.getInputPropertyValue(inputContext);
      const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
      return typeof value == "boolean" ? value : typeof value == "string" ? (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'true' : false;
    };
    this.onPropertyEditorChanged = (e) => {
      const inputElement = e.target;
      this.isChecked = inputElement.checked;
      this.inputContext.inputChanged(inputElement.checked, utils.SyntaxNames.Literal);
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
    const input = utils.getInputPropertyValue(inputContext);
    const value = (_b = ((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value)) !== null && _b !== void 0 ? _b : defaultValue;
    const syntax = (_d = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : inputDescriptor.defaultSyntax;
    const isChecked = this.isChecked;
    return (index.h("elsa-input-control-switch", { label: displayName, hideLabel: true, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("div", { class: "tw-flex tw-space-x-1" }, index.h("input", { type: "checkbox", name: fieldName, id: fieldId, checked: isChecked, onChange: this.onPropertyEditorChanged }), index.h("label", { htmlFor: fieldId }, displayName))));
  }
};

exports.elsa_checkbox_input = Checkbox;

//# sourceMappingURL=elsa-checkbox-input.cjs.entry.js.map