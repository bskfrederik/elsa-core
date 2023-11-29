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

const MultiTextInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onPropertyEditorChanged = (e) => {
      const json = JSON.stringify(e.detail);
      this.inputContext.inputChanged(json, utils.SyntaxNames.Object);
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
    const input = utils.getInputPropertyValue(inputContext);
    const syntax = (_b = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : inputDescriptor.defaultSyntax;
    const json = (_c = input === null || input === void 0 ? void 0 : input.expression) === null || _c === void 0 ? void 0 : _c.value;
    const defaultValue = inputDescriptor.defaultValue;
    let values = utils.getObjectOrParseJson(json);
    if (!values || values.length == 0)
      values = utils.getObjectOrParseJson(defaultValue) || [];
    return (index.h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: json, onExpressionChanged: this.onExpressionChanged }, index.h("elsa-input-tags", { fieldId: fieldId, values: values, onValueChanged: this.onPropertyEditorChanged })));
  }
};

exports.elsa_multi_text_input = MultiTextInput;

//# sourceMappingURL=elsa-multi-text-input.cjs.entry.js.map