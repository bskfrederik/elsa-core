import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { _ as SyntaxNames, g as getSelectListItems, n as getInputPropertyValue } from './index-7d63808a.js';
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

const DropdownInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectList = { items: [], isFlagsEnum: false };
    this.onChange = (e) => {
      const inputElement = e.target;
      this.inputContext.inputChanged(inputElement.value, SyntaxNames.Literal);
    };
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    this.selectList = await getSelectListItems(this.inputContext.inputDescriptor);
  }
  render() {
    var _a, _b, _c;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const defaultValue = inputDescriptor.defaultValue;
    const value = this.getValueOrDefault((_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value, defaultValue);
    const { items } = this.selectList;
    let currentValue = value;
    if (currentValue == undefined) {
      const defaultValue = inputDescriptor.defaultValue;
      currentValue = defaultValue ? defaultValue.toString() : undefined;
    }
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, items.map(item => {
      const optionIsObject = typeof (item) == 'object';
      const value = optionIsObject ? item.value : item.toString();
      const text = optionIsObject ? item.text : item.toString();
      return h("option", { value: value, selected: value === currentValue }, text);
    }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
};

export { DropdownInput as elsa_dropdown_input };

//# sourceMappingURL=elsa-dropdown-input.entry.js.map