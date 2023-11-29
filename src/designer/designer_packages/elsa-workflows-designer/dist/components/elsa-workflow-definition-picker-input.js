import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { R as SyntaxNames, C as Container, Y as WorkflowDefinitionsApi, Z as WorkflowDefinitionsOrderBy, n as getPropertyValue } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { F as FormEntry } from './form-entry.js';

const VariablePickerInput = /*@__PURE__*/ proxyCustomElement(class VariablePickerInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.workflowDefinitions = [];
    this.onChange = (e) => {
      const inputElement = e.target;
      const definitionId = inputElement.value;
      this.inputContext.inputChanged(definitionId, SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    const apiClient = Container.get(WorkflowDefinitionsApi);
    const response = await apiClient.list({ versionOptions: { isPublished: true }, orderBy: WorkflowDefinitionsOrderBy.Name });
    this.workflowDefinitions = response.items;
  }
  render() {
    var _a;
    const inputContext = this.inputContext;
    const inputDescriptor = inputContext.inputDescriptor;
    const fieldName = inputDescriptor.name;
    const fieldId = inputDescriptor.name;
    const displayName = inputDescriptor.displayName;
    const description = inputDescriptor.description;
    const workflowDefinitions = this.workflowDefinitions;
    const value = getPropertyValue(inputContext);
    const currentValue = (_a = value === null || value === void 0 ? void 0 : value.expression) === null || _a === void 0 ? void 0 : _a.value;
    return (h(FormEntry, { fieldId: fieldId, label: displayName, hint: description }, h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, workflowDefinitions.map((definition) => {
      const definitionId = definition.definitionId;
      const isSelected = definitionId == currentValue;
      return h("option", { value: definitionId, selected: isSelected }, definition.name);
    }))));
  }
}, [0, "elsa-workflow-definition-picker-input", {
    "inputContext": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-picker-input"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-picker-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, VariablePickerInput);
      }
      break;
  } });
}

const ElsaWorkflowDefinitionPickerInput = VariablePickerInput;
const defineCustomElement = defineCustomElement$1;

export { ElsaWorkflowDefinitionPickerInput, defineCustomElement };

//# sourceMappingURL=elsa-workflow-definition-picker-input.js.map