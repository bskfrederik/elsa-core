import { h } from '@stencil/core';
import { Container } from "typedi";
import { PanelPosition } from '../../../components/panel/models';
import { ActivityDriverRegistry, EventBus } from '../../../services';
import { MonacoEditorSettings } from "../../../services";
import { WorkflowEditorEventTypes } from "../../workflow-definitions/models/ui";
import { JournalApi } from "../services/journal-api";
export class WorkflowInstanceViewer {
  constructor() {
    this.isJournalSelecting = false;
    this.renderSelectedObject = () => {
      const activity = this.selectedActivity;
      if (!!activity) {
        const selectedRecord = this.selectedExecutionLogRecord;
        return h("elsa-activity-properties", { activity: activity, activityExecutionLog: selectedRecord });
      }
    };
    this.getWorkflowInternal = async () => {
      const root = await this.flowchartElement.export();
      const workflowDefinition = this.mainWorkflowDefinitionState;
      workflowDefinition.root = root;
      return workflowDefinition;
    };
    this.updateLayout = async () => {
      await this.flowchartElement.updateLayout();
    };
    this.updateContainerLayout = async (panelClassName, panelExpanded) => {
      if (panelExpanded)
        this.container.classList.remove(panelClassName);
      else
        this.container.classList.toggle(panelClassName, true);
      await this.updateLayout();
    };
    this.onActivityPickerPanelStateChanged = async (e) => await this.updateContainerLayout('activity-picker-closed', e.expanded);
    this.onActivityEditorPanelStateChanged = async (e) => await this.updateContainerLayout('object-editor-closed', e.expanded);
    this.monacoLibPath = undefined;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
    this.mainWorkflowDefinitionState = undefined;
    this.targetWorkflowDefinitionState = undefined;
    this.workflowInstanceState = undefined;
    this.selectedActivity = undefined;
    this.selectedExecutionLogRecord = undefined;
    this.flowchartRootActivity = undefined;
    this.eventBus = Container.get(EventBus);
    this.journalApi = Container.get(JournalApi);
  }
  handleMonacoLibPath(value) {
    const settings = Container.get(MonacoEditorSettings);
    settings.monacoLibPath = value;
  }
  async onWorkflowDefinitionChanged(value) {
    await this.importWorkflow(value, this.workflowInstanceState);
  }
  async onWorkflowInstanceChanged(value) {
    await this.importWorkflow(this.mainWorkflowDefinitionState, this.workflowInstance);
  }
  async handleResize() {
    await this.updateLayout();
  }
  async handlePanelCollapsed() {
    this.selectedActivity = null;
  }
  async handleContainerSelected(e) {
    //this.selectedActivity = this.getCurrentContainer();
  }
  async handleActivitySelected(e) {
    if (this.isJournalSelecting)
      return;
    this.selectedActivity = e.detail.activity;
    const workflowInstanceId = this.workflowInstance.id;
    const activityId = this.selectedActivity.id;
    this.selectedExecutionLogRecord = await this.journalApi.getLastEntry({ workflowInstanceId, activityId });
  }
  async handleJournalItemSelected(e) {
    const activityId = e.detail.activity.id;
    const activityNode = e.detail.activityNode;
    const graph = await this.flowchartElement.getGraph();
    const graphNode = graph.getNodes().find(n => n.id == activityId);
    const executionEventBlock = e.detail.executionEventBlock;
    this.selectedExecutionLogRecord = executionEventBlock.faulted ? executionEventBlock.faultedRecord : executionEventBlock.completed ? executionEventBlock.completedRecord : executionEventBlock.startedRecord;
    this.isJournalSelecting = true;
    if (graphNode == null) {
      await this.importSelectedItemsWorkflow(activityNode);
      this.selectedActivity = e.detail.activity;
      graph.resetSelection();
    }
    else {
      this.selectedActivity = graphNode.data;
      graph.resetSelection(graphNode);
    }
    this.isJournalSelecting = false;
  }
  async importSelectedItemsWorkflow(activityNode) {
    const consumingWorkflowNode = this.findConsumingWorkflowRecursive(activityNode);
    this.flowchartRootActivity = await this.getFlowchartByActivityNode(consumingWorkflowNode);
    window.requestAnimationFrame(async () => {
      await this.flowchartElement.updateGraph();
    });
  }
  findConsumingWorkflowRecursive(activityNode) {
    const parent = activityNode.parents[0];
    if (parent == null) {
      return activityNode;
    }
    else {
      const type = parent.activity.type;
      if (type == "Elsa.Workflow" || type == "Elsa.Flowchart") {
        return this.findConsumingWorkflowRecursive(parent);
      }
      else {
        return parent;
      }
    }
  }
  async getFlowchartByActivityNode(consumingWorkflowNode) {
    const isConsumingWorkflowSameAsMain = consumingWorkflowNode.parents[0] == null;
    return isConsumingWorkflowSameAsMain ? this.workflowDefinition.root : this.findFlowchartOfActivityRecursive(consumingWorkflowNode.activity);
  }
  findFlowchartOfActivityRecursive(activity) {
    if (activity.type == "Elsa.Flowchart") {
      return activity;
    }
    else if (activity.root == null && activity.body.type == "Elsa.Flowchart") {
      return activity.body;
    }
    else {
      return this.findFlowchartOfActivityRecursive(activity.root);
    }
  }
  async getCanvas() {
    return this.flowchartElement;
  }
  async registerActivityDrivers(register) {
    const registry = Container.get(ActivityDriverRegistry);
    register(registry);
  }
  getWorkflow() {
    return this.getWorkflowInternal();
  }
  async importWorkflow(workflowDefinition, workflowInstance) {
    this.workflowInstanceState = workflowInstance;
    await this.updateWorkflowDefinition(workflowDefinition);
    // Update the flowchart after state is updated.
    window.requestAnimationFrame(async () => {
      await this.flowchartElement.updateGraph();
    });
    await this.eventBus.emit(WorkflowEditorEventTypes.WorkflowDefinition.Imported, this, { workflowDefinition });
  }
  // Updates the workflow definition without importing it into the designer.
  async updateWorkflowDefinition(workflowDefinition) {
    this.mainWorkflowDefinitionState = workflowDefinition;
  }
  async componentWillLoad() {
    this.workflowInstanceState = this.workflowInstance;
    await this.updateWorkflowDefinition(this.workflowDefinition);
  }
  async componentDidLoad() {
    if (!!this.mainWorkflowDefinitionState && !!this.workflowInstanceState)
      await this.importWorkflow(this.workflowDefinition, this.workflowInstance);
    await this.eventBus.emit(WorkflowEditorEventTypes.WorkflowEditor.Ready, this, { workflowEditor: this });
  }
  render() {
    var _a;
    const workflowDefinition = this.mainWorkflowDefinitionState;
    const workflowInstance = this.workflowInstanceState;
    const workflowJournalModel = {
      workflowInstance,
      workflowDefinition
    };
    this.flowchartRootActivity = (_a = this.flowchartRootActivity) !== null && _a !== void 0 ? _a : this.mainWorkflowDefinitionState.root;
    return (h("div", { class: "tw-absolute tw-inset-0", ref: el => this.container = el }, h("elsa-panel", { class: "elsa-activity-picker-container tw-z-30", position: PanelPosition.Left, onExpandedStateChanged: e => this.onActivityPickerPanelStateChanged(e.detail) }, h("elsa-workflow-journal", { model: workflowJournalModel })), h("elsa-flowchart", { ref: el => this.flowchartElement = el, rootActivity: this.flowchartRootActivity, interactiveMode: false }), h("elsa-panel", { class: "elsa-workflow-editor-container tw-z-30", position: PanelPosition.Right, onExpandedStateChanged: e => this.onActivityEditorPanelStateChanged(e.detail) }, h("div", { class: "object-editor-container" }, h("elsa-workflow-instance-properties", { workflowDefinition: workflowDefinition, workflowInstance: this.workflowInstanceState }))), h("elsa-panel", { class: "elsa-activity-editor-container", position: PanelPosition.Bottom }, h("div", { class: "activity-editor-container" }, this.renderSelectedObject()))));
  }
  static get is() { return "elsa-workflow-instance-viewer"; }
  static get originalStyleUrls() {
    return {
      "$": ["viewer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["viewer.css"]
    };
  }
  static get properties() {
    return {
      "monacoLibPath": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "monaco-lib-path",
        "reflect": false
      },
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
        "optional": false,
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
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "mainWorkflowDefinitionState": {},
      "targetWorkflowDefinitionState": {},
      "workflowInstanceState": {},
      "selectedActivity": {},
      "selectedExecutionLogRecord": {},
      "flowchartRootActivity": {}
    };
  }
  static get methods() {
    return {
      "getCanvas": {
        "complexType": {
          "signature": "() => Promise<HTMLElsaFlowchartElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "HTMLElsaFlowchartElement": {
              "location": "global"
            }
          },
          "return": "Promise<HTMLElsaFlowchartElement>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "registerActivityDrivers": {
        "complexType": {
          "signature": "(register: (registry: ActivityDriverRegistry) => void) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "ActivityDriverRegistry": {
              "location": "import",
              "path": "../../../services"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "getWorkflow": {
        "complexType": {
          "signature": "() => Promise<WorkflowDefinition>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
            }
          },
          "return": "Promise<WorkflowDefinition>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "importWorkflow": {
        "complexType": {
          "signature": "(workflowDefinition: WorkflowDefinition, workflowInstance: WorkflowInstance) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
            },
            "WorkflowInstance": {
              "location": "import",
              "path": "../../../models"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "updateWorkflowDefinition": {
        "complexType": {
          "signature": "(workflowDefinition: WorkflowDefinition) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
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
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "monacoLibPath",
        "methodName": "handleMonacoLibPath"
      }, {
        "propName": "workflowDefinition",
        "methodName": "onWorkflowDefinitionChanged"
      }, {
        "propName": "workflowInstance",
        "methodName": "onWorkflowInstanceChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "resize",
        "method": "handleResize",
        "target": "window",
        "capture": false,
        "passive": true
      }, {
        "name": "collapsed",
        "method": "handlePanelCollapsed",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "containerSelected",
        "method": "handleContainerSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "activitySelected",
        "method": "handleActivitySelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "journalItemSelected",
        "method": "handleJournalItemSelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=viewer.js.map
