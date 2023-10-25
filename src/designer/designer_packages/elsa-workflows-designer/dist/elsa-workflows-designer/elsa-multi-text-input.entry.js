import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { _ as SyntaxNames, n as getInputPropertyValue, j as getObjectOrParseJson } from './index-7d63808a.js';
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