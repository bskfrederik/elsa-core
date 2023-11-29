'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const formEntry = require('./form-entry-890351d0.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');
require('./hint-34535b0d.js');

const CodeEditorInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onChange = (e) => {
      const value = e.detail.value;
      this.inputContext.inputChanged(value, utils.SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  render() {
    var _a;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const hint = inputDescriptor.description;
    const options = inputDescriptor.options || {};
    const defaultValue = inputDescriptor.defaultValue;
    const input = utils.getInputPropertyValue(inputContext);
    let value = this.getValueOrDefault((_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value, defaultValue);
    if (value == undefined)
      value = inputDescriptor.defaultValue;
    return (index.h(formEntry.FormEntry, { label: displayName, fieldId: fieldId, hint: hint }, index.h("elsa-monaco-editor", Object.assign({ value: value }, options, { onValueChanged: this.onChange }))));
  }
  getValueOrDefault(value, defaultValue) {
    var _a;
    return (_a = value !== null && value !== void 0 ? value : defaultValue) !== null && _a !== void 0 ? _a : '';
  }
};

exports.elsa_code_editor_input = CodeEditorInput;

//# sourceMappingURL=elsa-code-editor-input.cjs.entry.js.map