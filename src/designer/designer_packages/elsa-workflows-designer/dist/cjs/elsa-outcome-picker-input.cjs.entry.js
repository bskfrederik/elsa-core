'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const state = require('./state-b887cd17.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');
require('./state-tunnel-df062325.js');

const OutcomePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.onChange = (e) => {
      const inputElement = e.target;
      const outcome = inputElement.value;
      this.inputContext.inputChanged(outcome, utils.SyntaxNames.Object);
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
    const description = inputDescriptor.description;
    const input = utils.getInputPropertyValue(inputContext);
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value;
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (index.h(state.WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let outcomes = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.outcomes) !== null && _a !== void 0 ? _a : [];
      outcomes = [null, ...outcomes];
      return index.h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, outcomes.map((outcome) => {
        const displayName = outcome !== null && outcome !== void 0 ? outcome : '';
        const isSelected = outcome == value;
        return index.h("option", { value: outcome, selected: isSelected }, displayName);
      })));
    }));
  }
};

exports.elsa_outcome_picker_input = OutcomePicker;

//# sourceMappingURL=elsa-outcome-picker-input.cjs.entry.js.map