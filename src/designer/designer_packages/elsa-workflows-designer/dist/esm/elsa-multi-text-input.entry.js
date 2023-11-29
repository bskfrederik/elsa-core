import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, l as getInputPropertyValue, i as getObjectOrParseJson } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';

const MultiTextInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onPropertyEditorChanged = (e) => {
      const json = JSON.stringify(e.detail);
      this.inputContext.inputChanged(json, SyntaxNames.Object);
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
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const input = getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const json = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    const defaultValue = inputDescriptor.defaultValue;
    let values = getObjectOrParseJson(json);
    if (!values || values.length == 0)
      values = getObjectOrParseJson(defaultValue) || [];
    return (h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: json, onExpressionChanged: this.onExpressionChanged }, h("elsa-input-tags", { fieldId: fieldId, values: values, onValueChanged: this.onPropertyEditorChanged })));
  }
};

export { MultiTextInput as elsa_multi_text_input };

//# sourceMappingURL=elsa-multi-text-input.entry.js.map