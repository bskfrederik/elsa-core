import { r as registerInstance, h } from './index-08112852.js';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { W as WorkflowDefinitionTunnel } from './state-4c58f716.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

const OutputPicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.onChange = (e) => {
      const inputElement = e.target;
      const outputName = inputElement.value;
      this.inputContext.inputChanged(outputName, SyntaxNames.Literal);
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
    const input = getInputPropertyValue(inputContext);
    const value = (_a = input === null || input === void 0 ? void 0 : input.expression) === null || _a === void 0 ? void 0 : _a.value;
    const syntax = (_c = (_b = input === null || input === void 0 ? void 0 : input.expression) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : inputDescriptor.defaultSyntax;
    return (h(WorkflowDefinitionTunnel.Consumer, null, ({ workflowDefinition }) => {
      var _a;
      let outputs = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.outputs) !== null && _a !== void 0 ? _a : [];
      outputs = [null, ...outputs];
      return h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, outputs.map((output) => {
        var _a;
        const outputName = output === null || output === void 0 ? void 0 : output.name;
        const displayName = (_a = output === null || output === void 0 ? void 0 : output.displayName) !== null && _a !== void 0 ? _a : '';
        const isSelected = outputName == value;
        return h("option", { value: outputName, selected: isSelected }, displayName);
      })));
    }));
  }
};

export { OutputPicker as elsa_output_picker_input };

//# sourceMappingURL=elsa-output-picker-input.entry.js.map