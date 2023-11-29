import { h } from '@stencil/core';
import { InfoList } from "../../../components/shared/forms/info-list";
import { formatTimestamp, isNullOrWhitespace } from "../../../utils";
import { WorkflowInstancePropertiesEventTypes } from "../models";
import { Container } from "typedi";
import { EventBus } from "../../../services";
import { getLocaleComponentStrings } from '../../../utils/locale';
export class WorkflowDefinitionPropertiesEditor {
  constructor() {
    this.createModel = async () => {
      const model = {
        tabModels: [],
      };
      const workflowDefinition = this.workflowDefinition;
      const workflowInstance = this.workflowInstance;
      if (!workflowDefinition || !workflowInstance) {
        this.model = model;
        return;
      }
      const propertiesTabModel = {
        name: 'properties',
        tab: null,
        Widgets: [{
            name: 'workflowInstanceInfo',
            content: () => {
              const identityDetails = {
                [this.strings.propertiesTabInstanceId]: isNullOrWhitespace(workflowInstance.id) ? this.strings.propertiesNew : workflowInstance.id,
                [this.strings.propertiesTabDefinitionId]: isNullOrWhitespace(workflowDefinition.definitionId) ? this.strings.propertiesNew : workflowDefinition.definitionId,
                [this.strings.propertiesTabVersion]: workflowDefinition.version.toString(),
              };
              const statusDetails = {
                [this.strings.propertiesTabStatus]: workflowInstance.status,
                [this.strings.propertiesTabSubStatus]: workflowInstance.subStatus
              };
              const timestampDetails = {
                [this.strings.propertiesTabCreated]: formatTimestamp(workflowInstance.createdAt),
                [this.strings.propertiesTabLastExecution]: formatTimestamp(workflowInstance.updatedAt),
                [this.strings.propertiesTabFinished]: formatTimestamp(workflowInstance.finishedAt),
              };
              return h("div", null, h(InfoList, { title: this.strings.propertiesTab, dictionary: identityDetails }), h(InfoList, { title: this.strings.propertiesTabStatus, dictionary: statusDetails }), h(InfoList, { title: this.strings.propertiesTabTimeStamps, dictionary: timestampDetails, hideEmptyValues: true }));
            },
            order: 10
          }]
      };
      propertiesTabModel.tab = {
        displayText: this.strings.propertiesTab,
        content: () => this.renderPropertiesTab(propertiesTabModel)
      };
      const variablesTabModel = {
        name: 'variables',
        tab: {
          displayText: this.strings.variablesTab,
          content: () => this.renderVariablesTab()
        }
      };
      model.tabModels = [propertiesTabModel, variablesTabModel];
      const args = { model };
      await this.eventBus.emit(WorkflowInstancePropertiesEventTypes.Displaying, this, args);
      this.model = model;
    };
    this.renderPropertiesTab = (tabModel) => {
      const widgets = tabModel.Widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
      return h("div", null, widgets.map(widget => widget.content()));
    };
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return h("div", null, h("elsa-variables-viewer", { variables: variables, workflowDefinition: this.workflowDefinition, workflowInstance: this.workflowInstance }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.changeHandle = {};
    this.eventBus = Container.get(EventBus);
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
  async onWorkflowInstanceChanged() {
    await this.createModel();
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    await this.createModel();
  }
  render() {
    const workflowDefinition = this.workflowDefinition;
    const title = !isNullOrWhitespace(workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) ? workflowDefinition.name : '-';
    const subTitle = 'Workflow Instance';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (h("elsa-form-panel", { mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  static get is() { return "elsa-workflow-instance-properties"; }
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
              "path": "../../workflow-definitions/models/entities"
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
      "workflowInstance": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowInstance",
          "resolved": "WorkflowInstance",
          "references": {
            "WorkflowInstance": {
              "location": "import",
              "path": "../../../models"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "model": {},
      "selectedTabIndex": {},
      "changeHandle": {}
    };
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
        "propName": "workflowInstance",
        "methodName": "onWorkflowInstanceChanged"
      }];
  }
}
//# sourceMappingURL=properties.js.map
