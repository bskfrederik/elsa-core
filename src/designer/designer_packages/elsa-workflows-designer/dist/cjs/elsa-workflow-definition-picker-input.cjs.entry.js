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

const VariablePickerInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowDefinitions = [];
    this.onChange = (e) => {
      const inputElement = e.target;
      const definitionId = inputElement.value;
      this.inputContext.inputChanged(definitionId, utils.SyntaxNames.Literal);
    };
    this.inputContext = undefined;
  }
  async componentWillLoad() {
    const apiClient = utils.Container.get(utils.WorkflowDefinitionsApi);
    const response = await apiClient.list({ versionOptions: { isPublished: true }, orderBy: utils.WorkflowDefinitionsOrderBy.Name });
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
    const value = utils.getPropertyValue(inputContext);
    const currentValue = (_a = value === null || value === void 0 ? void 0 : value.expression) === null || _a === void 0 ? void 0 : _a.value;
    return (index.h(formEntry.FormEntry, { fieldId: fieldId, label: displayName, hint: description }, index.h("select", { id: fieldId, name: fieldName, onChange: e => this.onChange(e) }, workflowDefinitions.map((definition) => {
      const definitionId = definition.definitionId;
      const isSelected = definitionId == currentValue;
      return index.h("option", { value: definitionId, selected: isSelected }, definition.name);
    }))));
  }
};

exports.elsa_workflow_definition_picker_input = VariablePickerInput;

//# sourceMappingURL=elsa-workflow-definition-picker-input.cjs.entry.js.map