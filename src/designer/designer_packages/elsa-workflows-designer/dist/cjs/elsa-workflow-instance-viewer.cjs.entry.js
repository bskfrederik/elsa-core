'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const models = require('./models-30c62239.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let JournalApi = class JournalApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async list(request) {
    let queryString = {
      page: request.page,
      pageSize: request.pageSize
    };
    const queryStringText = utils.serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.workflowInstanceId}/journal${queryStringText}`);
    return response.data;
  }
  async getLastEntry(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.workflowInstanceId}/journal/${request.activityId}`);
    return response.data;
  }
};
JournalApi = __decorate([
  utils.Service(),
  __metadata("design:paramtypes", [utils.ElsaClientProvider])
], JournalApi);

const viewerCss = ":root{--workflow-editor-width:580px;--activity-picker-width:300px;--activity-editor-height:200px}elsa-flowchart{position:absolute;left:var(--activity-picker-width);top:0;right:var(--workflow-editor-width);bottom:var(--activity-editor-height)}.elsa-panel-toolbar{left:var(--activity-picker-width);right:var(--workflow-editor-width)}elsa-panel.panel-state-expanded.elsa-activity-picker-container{width:var(--activity-picker-width)}elsa-panel.panel-state-expanded.elsa-workflow-editor-container{width:var(--workflow-editor-width);right:0;left:unset}elsa-panel.panel-state-expanded.elsa-activity-editor-container{height:var(--activity-editor-height);right:var(--workflow-editor-width);left:var(--activity-picker-width);bottom:0}.activity-picker-closed .activity-list{display:none}.activity-picker-closed elsa-flowchart{left:0}.object-editor-closed .object-editor-container{display:none}.object-editor-closed elsa-flowchart{right:0}.activity-editor-closed .activity-editor-container{display:none}.activity-editor-closed elsa-flowchart{bottom:0}";

const WorkflowInstanceViewer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isJournalSelecting = false;
    this.renderSelectedObject = () => {
      const activity = this.selectedActivity;
      if (!!activity) {
        const selectedRecord = this.selectedExecutionLogRecord;
        return index.h("elsa-activity-properties", { activity: activity, activityExecutionLog: selectedRecord });
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
    this.eventBus = utils.Container.get(utils.EventBus);
    this.journalApi = utils.Container.get(JournalApi);
  }
  handleMonacoLibPath(value) {
    const settings = utils.Container.get(utils.MonacoEditorSettings);
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
    const registry = utils.Container.get(utils.ActivityDriverRegistry);
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
    await this.eventBus.emit(utils.WorkflowEditorEventTypes.WorkflowDefinition.Imported, this, { workflowDefinition });
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
    await this.eventBus.emit(utils.WorkflowEditorEventTypes.WorkflowEditor.Ready, this, { workflowEditor: this });
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
    return (index.h("div", { class: "tw-absolute tw-inset-0", ref: el => this.container = el }, index.h("elsa-panel", { class: "elsa-activity-picker-container tw-z-30", position: models.PanelPosition.Left, onExpandedStateChanged: e => this.onActivityPickerPanelStateChanged(e.detail) }, index.h("elsa-workflow-journal", { model: workflowJournalModel })), index.h("elsa-flowchart", { ref: el => this.flowchartElement = el, rootActivity: this.flowchartRootActivity, interactiveMode: false }), index.h("elsa-panel", { class: "elsa-workflow-editor-container tw-z-30", position: models.PanelPosition.Right, onExpandedStateChanged: e => this.onActivityEditorPanelStateChanged(e.detail) }, index.h("div", { class: "object-editor-container" }, index.h("elsa-workflow-instance-properties", { workflowDefinition: workflowDefinition, workflowInstance: this.workflowInstanceState }))), index.h("elsa-panel", { class: "elsa-activity-editor-container", position: models.PanelPosition.Bottom }, index.h("div", { class: "activity-editor-container" }, this.renderSelectedObject()))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "monacoLibPath": ["handleMonacoLibPath"],
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowInstance": ["onWorkflowInstanceChanged"]
  }; }
};
WorkflowInstanceViewer.style = viewerCss;

exports.elsa_workflow_instance_viewer = WorkflowInstanceViewer;

//# sourceMappingURL=elsa-workflow-instance-viewer.cjs.entry.js.map