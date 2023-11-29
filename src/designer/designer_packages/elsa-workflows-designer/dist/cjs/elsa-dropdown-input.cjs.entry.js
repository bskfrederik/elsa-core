'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
const selectListItems = require('./select-list-items-14e79374.js');
require('./toolbar-component-store-27cb56e9.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./descriptors-store-815ac006.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const DropdownInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.selectList = { items: [], isFlagsEnum: false };
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, utils.SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    this.selectList = await selectListItems.getSelectListItems(this.inputContext.inputDescriptor);
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = utils.getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const defaultValue = inputDescriptor.defaultValue;
    const value = this.getValueOrDefault((_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value, defaultValue);
    const { items } = this.selectList;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (index.h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, items.map(item => {
      const optionIsObject = typeof (item) == 'object';
      const value = optionIsObject ? item.value : item.toString();
      const text = optionIsObject ? item.text : item.toString();
      return index.h("option", { value: value, selected: value === currentValue }, text);
    }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
};

exports.elsa_dropdown_input = DropdownInput;

//# sourceMappingURL=elsa-dropdown-input.cjs.entry.js.map