import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { _ as SyntaxNames, n as getInputPropertyValue } from './index-7d63808a.js';
import { W as WorkflowDefinitionTunnel } from './state-4cd043fd.js';
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
import './index-c5813c2e.js';

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