'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const lodash = require('./lodash-c9901408.js');
const models = require('./models-30c62239.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const state = require('./state-b887cd17.js');
const propsEditorTabs = require('./props-editor-tabs-124609c0.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');
require('./state-tunnel-df062325.js');

const editorCss = ":root{--workflow-editor-width:480px;--activity-picker-width:300px;--activity-editor-height:200px}elsa-flowchart{position:absolute;left:var(--activity-picker-width);top:54px;right:var(--workflow-editor-width);bottom:var(--activity-editor-height)}.elsa-panel-toolbar{left:var(--activity-picker-width);right:var(--workflow-editor-width)}elsa-panel.panel-state-expanded.elsa-activity-picker-container{width:var(--activity-picker-width)}elsa-panel.panel-state-expanded.elsa-workflow-editor-container{width:var(--workflow-editor-width);right:0;left:unset}elsa-panel.panel-state-expanded.elsa-activity-editor-container{height:var(--activity-editor-height);right:var(--workflow-editor-width);left:var(--activity-picker-width);bottom:0}.activity-picker-closed .activity-list{display:none}.activity-picker-closed elsa-flowchart{left:0}.object-editor-closed .object-editor-container{display:none}.object-editor-closed elsa-flowchart{right:0}.activity-editor-closed .activity-editor-container{display:none}.activity-editor-closed elsa-flowchart{bottom:0}.panel-bottom{width:calc(100vw - var(--workflow-editor-width) - var(--activity-picker-width))}";

const WorkflowDefinitionEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowUpdated = index.createEvent(this, "workflowUpdated", 7);
    this.renderSelectedObject = () => {
      if (!!this.selectedActivity)
        return index.h("elsa-activity-properties-editor", { isReadonly: this.workflowDefinition.isReadonly, activity: this.selectedActivity, variables: this.workflowDefinitionState.variables, outputs: this.workflowDefinitionState.outputs, workflowDefinitionId: this.workflowDefinitionState.definitionId, onActivityUpdated: e => this.onActivityUpdated(e) });
    };
    this.getWorkflowDefinitionInternal = async () => {
      const activity = await this.flowchart.export();
      const workflowDefinition = this.workflowDefinitionState;
      workflowDefinition.root = activity;
      return workflowDefinition;
    };
    this.saveChanges = async () => {
      const updatedWorkflowDefinition = this.workflowDefinitionState;
      if (updatedWorkflowDefinition.isReadonly) {
        console.debug('Workflow definition is readonly. Changes will not be saved.');
        return;
      }
      if (!updatedWorkflowDefinition.isLatest) {
        console.debug('Workflow definition is not the latest version. Changes will not be saved.');
        return;
      }
      if (await this.hasWorkflowDefinitionAnyUpdatedData(updatedWorkflowDefinition)) {
        // If workflow definition is published, override the latest version.
        if (updatedWorkflowDefinition.isPublished) {
          updatedWorkflowDefinition.version = this.workflowVersions.find(v => v.isLatest).version;
        }
        this.workflowUpdated.emit({ workflowDefinition: this.workflowDefinitionState });
      }
      await this.updateSelectedActivity();
    };
    // To prevent redundant post requests to server, save changes only if there is a difference
    // between existing workflow definition on server side and updated workflow definition on client side.
    this.hasWorkflowDefinitionAnyUpdatedData = async (updatedWorkflowDefinition) => {
      const existingWorkflowDefinition = await this.workflowDefinitionApi.get({ definitionId: updatedWorkflowDefinition.definitionId, versionOptions: { version: updatedWorkflowDefinition.version } });
      const updatedWorkflowDefinitionClone = utils.object.cloneDeep(updatedWorkflowDefinition);
      utils.removeGuidsFromPortNames(updatedWorkflowDefinitionClone.root);
      return !lodash.lodash.isEqual(existingWorkflowDefinition, updatedWorkflowDefinitionClone);
    };
    this.updateLayout = async () => {
      await this.flowchart.updateLayout();
    };
    this.updateContainerLayout = async (panelClassName, panelExpanded) => {
      if (panelExpanded)
        this.container.classList.remove(panelClassName);
      else
        this.container.classList.toggle(panelClassName, true);
      await this.updateLayout();
    };
    this.updateActivityInternal = async (args) => {
      args.updatePorts = true; // TODO: Make this configurable from a activity plugin.
      await this.flowchart.updateActivity(args);
      this.saveChangesDebounced();
    };
    this.onActivityPickerPanelStateChanged = async (e) => await this.updateContainerLayout('activity-picker-closed', e.expanded);
    this.onWorkflowEditorPanelStateChanged = async (e) => await this.updateContainerLayout('object-editor-closed', e.expanded);
    this.onActivityEditorPanelStateChanged = async (e) => await this.updateContainerLayout('activity-editor-closed', e.expanded);
    this.onDragOver = (e) => {
      e.preventDefault();
    };
    this.onDrop = async (e) => {
      const json = e.dataTransfer.getData('activity-descriptor');
      const activityDescriptor = JSON.parse(json);
      await this.flowchart.addActivity({
        descriptor: activityDescriptor,
        x: e.pageX,
        y: e.pageY
      });
    };
    this.onZoomToFit = async () => await this.flowchart.zoomToFit();
    this.onAutoLayout = async (direction) => {
      await this.flowchart.autoLayout(direction);
    };
    this.onActivityUpdated = async (e) => {
      var _a, _b, _c;
      const args = {
        activity: e.detail.activity,
        id: (_b = (_a = e.detail.newId) !== null && _a !== void 0 ? _a : e.detail.originalId) !== null && _b !== void 0 ? _b : e.detail.activity.id,
        originalId: (_c = e.detail.originalId) !== null && _c !== void 0 ? _c : e.detail.activity.id
      };
      await this.updateActivityInternal(args);
    };
    this.onWorkflowPropsUpdated = (e) => {
      this.saveChangesDebounced();
      if (e.detail.updatedTab == propsEditorTabs.WorkflowPropertiesEditorTabs.Variables) {
        const currentSelectedActivity = this.selectedActivity;
        this.selectedActivity = null;
        this.selectedActivity = currentSelectedActivity;
      }
    };
    this.onVersionSelected = async (e) => {
      const workflowToView = e.detail;
      const workflowDefinition = await this.workflowDefinitionApi.get({ definitionId: workflowToView.definitionId, versionOptions: { version: workflowToView.version } });
      await this.importWorkflow(workflowDefinition);
    };
    this.onDeleteVersionClicked = async (e) => {
      const workflowToDelete = e.detail;
      await this.workflowDefinitionApi.deleteVersion({ definitionId: workflowToDelete.definitionId, version: workflowToDelete.version });
      const latestWorkflowDefinition = await this.workflowDefinitionApi.get({ definitionId: workflowToDelete.definitionId, versionOptions: { isLatest: true } });
      await this.loadWorkflowVersions();
      await this.importWorkflow(latestWorkflowDefinition);
    };
    this.onRevertVersionClicked = async (e) => {
      const workflowToRevert = e.detail;
      await this.workflowDefinitionApi.revertVersion({ definitionId: workflowToRevert.definitionId, version: workflowToRevert.version });
      const workflowDefinition = await this.workflowDefinitionApi.get({ definitionId: workflowToRevert.definitionId, versionOptions: { isLatest: true } });
      await this.loadWorkflowVersions();
      await this.importWorkflow(workflowDefinition);
    };
    this.workflowDefinition = undefined;
    this.monacoLibPath = undefined;
    this.workflowDefinitionState = undefined;
    this.selectedActivity = undefined;
    this.workflowVersions = [];
    this.eventBus = utils.Container.get(utils.EventBus);
    this.pluginRegistry = utils.Container.get(utils.PluginRegistry);
    this.activityNameFormatter = utils.Container.get(utils.ActivityNameFormatter);
    this.portProviderRegistry = utils.Container.get(utils.PortProviderRegistry);
    this.saveChangesDebounced = lodash.lodash.debounce(this.saveChanges, 1000);
    this.workflowDefinitionApi = utils.Container.get(utils.WorkflowDefinitionsApi);
  }
  handleMonacoLibPath(value) {
    const settings = utils.Container.get(utils.MonacoEditorSettings);
    settings.monacoLibPath = value;
  }
  async onWorkflowDefinitionChanged(value) {
    await this.importWorkflow(value);
  }
  async handleResize() {
    await this.updateLayout();
  }
  async handleContainerSelected(e) {
    this.selectedActivity = e.detail.activity;
  }
  async getFlowchart() {
    return this.flowchart;
  }
  async registerActivityDrivers(register) {
    const registry = utils.Container.get(utils.ActivityDriverRegistry);
    register(registry);
  }
  getWorkflowDefinition() {
    return this.getWorkflowDefinitionInternal();
  }
  async importWorkflow(workflowDefinition) {
    await this.updateWorkflowDefinition(workflowDefinition);
    await this.loadWorkflowVersions();
    // Update the flowchart after state is updated.
    window.requestAnimationFrame(async () => {
      await this.flowchart.updateGraph();
      await this.updateSelectedActivity();
    });
    await this.eventBus.emit(utils.WorkflowEditorEventTypes.WorkflowDefinition.Imported, this, { workflowDefinition });
  }
  // Updates the workflow definition without importing it into the designer.
  async updateWorkflowDefinition(workflowDefinition) {
    if (this.workflowDefinitionState != workflowDefinition) {
      this.workflowDefinitionState = workflowDefinition;
      window.requestAnimationFrame(async () => {
        await this.updateSelectedActivity();
        await this.eventBus.emit(utils.WorkflowEditorEventTypes.WorkflowEditor.WorkflowLoaded, this, { workflowEditor: this, workflowDefinition: workflowDefinition });
      });
    }
  }
  async newWorkflow() {
    const newRoot = await this.flowchart.newRoot();
    const workflowDefinition = {
      root: newRoot,
      id: '',
      name: 'Workflow 1',
      definitionId: '',
      version: 1,
      isLatest: true,
      isPublished: false,
      isReadonly: false,
      materializerName: 'Json'
    };
    await this.updateWorkflowDefinition(workflowDefinition);
    return workflowDefinition;
  }
  async loadWorkflowVersions() {
    if (this.workflowDefinitionState.definitionId != null && this.workflowDefinitionState.definitionId.length > 0) {
      const workflowVersions = await this.workflowDefinitionApi.getVersions(this.workflowDefinitionState.definitionId);
      this.workflowVersions = workflowVersions.sort((a, b) => a.version > b.version ? -1 : 1);
    }
    else {
      this.workflowVersions = [];
    }
  }
  async updateActivity(activity) {
    const args = {
      activity: activity,
      id: activity.id,
      originalId: activity.id
    };
    await this.updateActivityInternal(args);
  }
  async componentWillLoad() {
    await this.updateWorkflowDefinition(this.workflowDefinition);
    await this.loadWorkflowVersions();
  }
  async componentDidLoad() {
    if (!this.workflowDefinitionState)
      await this.newWorkflow();
    else
      await this.importWorkflow(this.workflowDefinitionState);
    await this.eventBus.emit(utils.WorkflowEditorEventTypes.WorkflowEditor.Ready, this, { workflowEditor: this, workflowDefinition: this.workflowDefinitionState });
  }
  async onActivitySelected(e) {
    this.selectedActivity = e.detail.activity;
  }
  async onChildActivitySelected(e) {
    const { childActivity } = e.detail;
    this.selectedActivity = childActivity;
  }
  async onGraphUpdated(e) {
    await this.updateSelectedActivity();
    this.saveChangesDebounced();
  }
  async updateSelectedActivity() {
    var _a;
    if (!!this.selectedActivity)
      this.selectedActivity = await ((_a = this.flowchart) === null || _a === void 0 ? void 0 : _a.getActivity(this.selectedActivity.id));
  }
  render() {
    const workflowDefinition = this.workflowDefinitionState;
    const state$1 = {
      workflowDefinition: this.workflowDefinitionState
    };
    return (index.h(state.WorkflowDefinitionTunnel.Provider, { state: state$1 }, index.h("div", { class: "tw-absolute tw-inset-0", ref: el => this.container = el }, index.h("elsa-workflow-definition-editor-toolbar", { zoomToFit: this.onZoomToFit, onAutoLayout: (e) => this.onAutoLayout(e.detail) }), index.h("elsa-panel", { class: "elsa-activity-picker-container tw-z-30", position: models.PanelPosition.Left, onExpandedStateChanged: e => this.onActivityPickerPanelStateChanged(e.detail) }, index.h("elsa-workflow-definition-editor-toolbox", { isReadonly: this.workflowDefinition.isReadonly, ref: el => this.toolbox = el })), index.h("elsa-flowchart", { isReadonly: this.workflowDefinition.isReadonly, key: workflowDefinition.definitionId, ref: el => this.flowchart = el, rootActivity: workflowDefinition.root, interactiveMode: true, onActivitySelected: e => this.onActivitySelected(e), onChildActivitySelected: e => this.onChildActivitySelected(e), onGraphUpdated: e => this.onGraphUpdated(e), onDragOver: e => this.onDragOver(e), onDrop: e => this.onDrop(e) }), index.h("elsa-panel", { class: "elsa-workflow-editor-container tw-z-30", position: models.PanelPosition.Right, onExpandedStateChanged: e => this.onWorkflowEditorPanelStateChanged(e.detail) }, index.h("div", { class: "object-editor-container" }, index.h("elsa-workflow-definition-properties-editor", { readonly: this.workflowDefinition.isReadonly, workflowDefinition: this.workflowDefinitionState, workflowVersions: this.workflowVersions, onWorkflowPropsUpdated: e => this.onWorkflowPropsUpdated(e), onVersionSelected: e => this.onVersionSelected(e), onDeleteVersionClicked: e => this.onDeleteVersionClicked(e), onRevertVersionClicked: e => this.onRevertVersionClicked(e) }))), index.h("elsa-panel", { class: "elsa-activity-editor-container panel-bottom", position: models.PanelPosition.Bottom, onExpandedStateChanged: e => this.onActivityEditorPanelStateChanged(e.detail) }, index.h("div", { class: "activity-editor-container" }, this.renderSelectedObject())))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "monacoLibPath": ["handleMonacoLibPath"],
    "workflowDefinition": ["onWorkflowDefinitionChanged"]
  }; }
};
WorkflowDefinitionEditor.style = editorCss;

exports.elsa_workflow_definition_editor = WorkflowDefinitionEditor;

//# sourceMappingURL=elsa-workflow-definition-editor.cjs.entry.js.map