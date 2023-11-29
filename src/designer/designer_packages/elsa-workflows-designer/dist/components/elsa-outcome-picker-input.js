import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, l as getInputPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { W as WorkflowDefinitionTunnel } from './state4.js';
import { d as defineCustomElement$4 } from './state-tunnel.js';
import { d as defineCustomElement$3 } from './input-control-switch.js';
import { d as defineCustomElement$2 } from './monaco-editor.js';

const OutcomePicker = /*@__PURE__*/ proxyCustomElement(class OutcomePicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onExpressionChanged = (e) => {
      this.inputContext.inputChanged(e.detail.expression, e.detail.syntax);
    };
    this.onChange = (e) => {
      const inputElement = e.target;
      const outcome = inputElement.value;
      this.inputContext.inputChanged(outcome, SyntaxNames.Object);
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
      let outcomes = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.outcomes) !== null && _a !== void 0 ? _a : [];
      outcomes = [null, ...outcomes];
      return h("elsa-input-control-switch", { label: displayName, hint: description, syntax: syntax, expression: value, onExpressionChanged: this.onExpressionChanged }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, outcomes.map((outcome) => {
        const displayName = outcome !== null && outcome !== void 0 ? outcome : '';
        const isSelected = outcome == value;
        return h("option", { value: outcome, selected: isSelected }, displayName);
      })));
    }));
  }
}, [0, "elsa-outcome-picker-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-outcome-picker-input", "context-consumer", "elsa-input-control-switch", "elsa-monaco-editor"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-outcome-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OutcomePicker);
      }
      break;
    case "context-consumer":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-input-control-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-monaco-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaOutcomePickerInput = OutcomePicker;
const defineCustomElement = defineCustomElement$1;

export { ElsaOutcomePickerInput, defineCustomElement };

//# sourceMappingURL=elsa-outcome-picker-input.js.map