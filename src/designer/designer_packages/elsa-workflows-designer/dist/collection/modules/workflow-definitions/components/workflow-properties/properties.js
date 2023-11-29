import { h } from '@stencil/core';
import { Container } from "typedi";
import { EventBus } from "../../../../services";
import { WorkflowPropertiesEditorEventTypes } from "../../models/ui";
import { CheckboxFormEntry, FormEntry } from "../../../../components/shared/forms/form-entry";
import { isNullOrWhitespace } from "../../../../utils";
import { InfoList } from "../../../../components/shared/forms/info-list";
import { WorkflowDefinitionsApi } from "../../services/api";
import descriptorsStore from "../../../../data/descriptors-store";
import { WorkflowPropertiesEditorTabs } from "../../models/props-editor-tabs";
import { getLocaleComponentStrings } from '../../../../utils/locale';
export class WorkflowDefinitionPropertiesEditor {
  constructor() {
    this.createModel = async () => {
      var _a, _b, _c;
      const model = {
        tabModels: []
      };
      const workflowDefinition = this.workflowDefinition;
      const options = workflowDefinition.options || {};
      const autoUpdateConsumingWorkflows = (_a = options.autoUpdateConsumingWorkflows) !== null && _a !== void 0 ? _a : false;
      const usableAsActivity = (_b = options.usableAsActivity) !== null && _b !== void 0 ? _b : false;
      if (!workflowDefinition) {
        this.model = model;
        return;
      }
      const propertiesTabModel = {
        name: 'properties',
        tab: null,
        Widgets: [{
            name: 'workflowName',
            content: () => {
              const workflow = this.workflowDefinition;
              return h(FormEntry, { label: this.strings.propertiesWorkflowName, fieldId: "workflowName", hint: this.strings.propertiesWorkflowNameHint }, h("input", { type: "text", name: "workflowName", id: "workflowName", value: workflow.name, onChange: e => this.onPropertyEditorChanged(wf => wf.name = e.target.value) }));
            },
            order: 0
          }, {
            name: 'workflowDescription',
            content: () => {
              const workflow = this.workflowDefinition;
              return h(FormEntry, { label: this.strings.propertiesWorkflowDescription, fieldId: "workflowDescription", hint: this.strings.propertiesWorkflowDescriptionHint }, h("textarea", { name: "workflowDescription", id: "workflowDescription", value: workflow.description, rows: 6, onChange: e => this.onPropertyEditorChanged(wf => wf.description = e.target.value) }));
            },
            order: 5
          }, {
            name: 'workflowInfo',
            content: () => {
              const workflow = this.workflowDefinition;
              const workflowDetails = {
                [this.strings.propertiesDefitionId]: isNullOrWhitespace(workflow.definitionId) ? this.strings.propertiesNew : workflow.definitionId,
                [this.strings.propertiesVersionId]: isNullOrWhitespace(workflow.id) ? this.strings.propertiesNew : workflow.id,
                [this.strings.propertiesVersion]: workflow.version.toString(),
                [this.strings.propertiesStatus]: workflow.isPublished ? this.strings.propertiesPublished : this.strings.propertiesDraft,
                [this.strings.propertiesReadOnly]: workflow.isReadonly ? this.strings.propertiesYes : this.strings.propertiesNo
              };
              return h(InfoList, { title: "Information", dictionary: workflowDetails });
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: this.strings.propertiesTab,
        order: 0,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: this.strings.variablesTab,
          order: 5,
          content: () => this.renderVariablesTab()
        }
      };
      const strategies = descriptorsStore.workflowActivationStrategyDescriptors;
      const firstStrategy = strategies.length > 0 ? strategies[0] : null;
      const defaultDescription = (_c = firstStrategy === null || firstStrategy === void 0 ? void 0 : firstStrategy.description) !== null && _c !== void 0 ? _c : '';
      const settingsWidgets = [
        {
          name: 'workflowActivationValidator',
          order: 0,
          content: () => h(FormEntry, { label: this.strings.settingsActivitationStrategy, fieldId: "workflowActivationStrategyType", hint: defaultDescription }, h("select", { name: "workflowActivationStrategyType", onChange: e => this.onPropertyEditorChanged(wf => {
              const selectElement = e.target;
              options.activationStrategyType = selectElement.value;
              wf.options = options;
              const hintElement = selectElement.closest('.form-entry').getElementsByClassName('form-field-hint')[0];
              const strategy = strategies.find(x => x.typeName == selectElement.value);
              hintElement.innerText = strategy.description;
            }) }, strategies.map(strategy => h("option", { value: strategy.typeName, selected: strategy.typeName == options.activationStrategyType }, strategy.displayName))))
        },
        {
          name: 'usableAsActivity',
          order: 0,
          content: () => h(CheckboxFormEntry, { label: this.strings.settingsUsableAsActivity, fieldId: "UsableAsActivity", hint: this.strings.settingsUsableAsActivityHint }, h("input", { type: "checkbox", id: "UsableAsActivity", name: "UsableAsActivity", checked: usableAsActivity, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              wf.options.usableAsActivity = inputElement.checked;
              this.createModel();
            }) }))
        },
        {
          name: 'autoUpdateConsumingWorkflows',
          order: 0,
          content: () => h(CheckboxFormEntry, { fieldId: "UpdateConsumingWorkflows", label: this.strings.settingsAutoUpdateConsumingWorkflows, hint: this.strings.settingsAutoUpdateConsumingWorkflowsHint }, h("input", { type: "checkbox", name: "UpdateConsumingWorkflows", id: "UpdateConsumingWorkflows", checked: autoUpdateConsumingWorkflows, onChange: e => this.onPropertyEditorChanged(wf => {
              const inputElement = e.target;
              options.autoUpdateConsumingWorkflows = inputElement.checked;
              wf.options = options;
            }) }))
        }
      ];
      const settingsTabModel = {
        name: 'settings',
        tab: {
          displayText: this.strings.settingsTab,
          order: 10,
          content: () => h("elsa-widgets", { widgets: settingsWidgets })
        }
      };
      const inputOutputTabModel = {
        name: 'input-output',
        tab: {
          displayText: this.strings.inputOutputTab,
          order: 15,
          content: () => this.renderInputOutputTab()
        }
      };
      const versionHistoryTabModel = {
        name: 'versionHistory',
        tab: {
          displayText: this.strings.versionHistoryTab,
          order: 20,
          content: () => this.renderVersionHistoryTab()
        }
      };
      model.tabModels = [propertiesTabModel, variablesTabModel, settingsTabModel, versionHistoryTabModel, inputOutputTabModel];
      const args = {
        workflowDefinition,
        model,
        notifyWorkflowDefinitionChanged: () => this.onWorkflowDefinitionUpdated()
      };
      await this.eventBus.emit(WorkflowPropertiesEditorEventTypes.Displaying, this, args);
      this.model = model;
    };
    this.renderPropertiesTab = (tabModel) => h("elsa-widgets", { widgets: tabModel.Widgets });
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return h("div", null, h("elsa-variables-editor", { variables: variables, onVariablesChanged: e => this.onVariablesUpdated(e) }));
    };
    this.renderInputOutputTab = () => {
      var _a, _b, _c, _d, _e, _f;
      const inputs = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.inputs) !== null && _b !== void 0 ? _b : [];
      const outputs = (_d = (_c = this.workflowDefinition) === null || _c === void 0 ? void 0 : _c.outputs) !== null && _d !== void 0 ? _d : [];
      const outcomes = (_f = (_e = this.workflowDefinition) === null || _e === void 0 ? void 0 : _e.outcomes) !== null && _f !== void 0 ? _f : [];
      return h("div", null, h("elsa-workflow-definition-input-output-settings", { inputs: inputs, outputs: outputs, outcomes: outcomes, onInputsChanged: e => this.onInputsUpdated(e), onOutputsChanged: e => this.onOutputsUpdated(e), onOutcomesChanged: e => this.onOutcomesUpdated(e) }));
    };
    this.renderVersionHistoryTab = () => {
      return h("div", null, h("elsa-workflow-definition-version-history", { selectedVersion: this.workflowDefinition, workflowVersions: this.workflowVersions }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.onPropertyEditorChanged = (apply) => {
      const workflowDefinition = this.workflowDefinition;
      apply(workflowDefinition);
      this.workflowPropsUpdated.emit({ workflowDefinition: workflowDefinition });
    };
    this.onVariablesUpdated = async (e) => this.onPropsUpdated('variables', e.detail);
    this.onInputsUpdated = async (e) => this.onPropsUpdated('inputs', e.detail);
    this.onOutputsUpdated = async (e) => this.onPropsUpdated('outputs', e.detail);
    this.onOutcomesUpdated = async (e) => this.onPropsUpdated('outcomes', e.detail);
    this.onPropsUpdated = async (propName, propValue) => {
      const workflowDefinition = this.workflowDefinition;
      if (!workflowDefinition || !workflowDefinition.isLatest) {
        console.debug('onPropsUpdated: workflowDefinition is not latest');
        return;
      }
      workflowDefinition[propName] = propValue;
      const updatedTab = this.getPropEditorSectionByPropName(propName);
      this.workflowPropsUpdated.emit({ workflowDefinition, updatedTab });
      await this.createModel();
    };
    this.onWorkflowDefinitionUpdated = () => {
      const workflowDefinition = this.workflowDefinition;
      this.workflowPropsUpdated.emit({ workflowDefinition });
    };
    this.workflowDefinition = undefined;
    this.workflowVersions = undefined;
    this.readonly = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
    this.model = {
      tabModels: [],
    };
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async onWorkflowDefinitionChanged() {
    await this.createModel();
  }
  async onWorkflowVersionsChanged() {
    await this.createModel();
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    await this.createModel();
  }
  render() {
    var _a;
    const workflowDefinition = this.workflowDefinition;
    const title = (_a = workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) !== null && _a !== void 0 ? _a : 'Untitled';
    const subTitle = 'Workflow Definition';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (h("elsa-form-panel", { isReadonly: this.readonly, mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  getPropEditorSectionByPropName(propName) {
    const enumKey = Object.keys(WorkflowPropertiesEditorTabs).find(key => WorkflowPropertiesEditorTabs[key] === propName);
    if (enumKey) {
      return WorkflowPropertiesEditorTabs[enumKey];
    }
    return null;
  }
  static get is() { return "elsa-workflow-definition-properties-editor"; }
  static get properties() {
    return {
      "workflowDefinition": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "workflowVersions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<WorkflowDefinition>",
          "resolved": "WorkflowDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "readonly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "readonly",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "model": {},
      "selectedTabIndex": {}
    };
  }
  static get events() {
    return [{
        "method": "workflowPropsUpdated",
        "name": "workflowPropsUpdated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinitionPropsUpdatedArgs",
          "resolved": "WorkflowDefinitionPropsUpdatedArgs",
          "references": {
            "WorkflowDefinitionPropsUpdatedArgs": {
              "location": "import",
              "path": "../../models/ui"
            }
          }
        }
      }, {
        "method": "versionSelected",
        "name": "versionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "deleteVersionClicked",
        "name": "deleteVersionClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }, {
        "method": "revertVersionClicked",
        "name": "revertVersionClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../models/entities"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "show": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "hide": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "workflowDefinition",
        "methodName": "onWorkflowDefinitionChanged"
      }, {
        "propName": "workflowVersions",
        "methodName": "onWorkflowVersionsChanged"
      }];
  }
}
//# sourceMappingURL=properties.js.map
