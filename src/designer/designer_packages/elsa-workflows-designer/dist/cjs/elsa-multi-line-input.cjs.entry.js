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

const MultiLineInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.getEditorHeight = (options) => {
      const editorHeightName = options.editorHeight || 'Default';
      switch (editorHeightName) {
        case 'Large':
          return { propertyEditor: '20em', textArea: 10 };
        default:
          return { propertyEditor: '15em', textArea: 6 };
      }
    };
    this.onPropertyEditorChanged = (e) => {
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
    const hint = inputDescriptor.description;
    const input = utils.getInputPropertyValue(inputContext);
    const options = inputDescriptor.options || {};
    const editorHeight = this.getEditorHeight(options);
    const defaultValue = inputDescriptor.defaultValue;
    const value = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (index.h("elsa-input-control-switch", { label: displayName, hint: hint, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("textarea", { name: fieldName, id: fieldId, value: value, rows: editorHeight.textArea, onChange: this.onPropertyEditorChanged })));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
};

exports.elsa_multi_line_input = MultiLineInput;

//# sourceMappingURL=elsa-multi-line-input.cjs.entry.js.map