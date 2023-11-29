import { r as registerInstance, c as createEvent, h, a as getElement } from './index-08112852.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { P as PanelPosition } from './models-38a0b372.js';
import { ad as object, ae as removeGuidsFromPortNames, C as Container, B as EventBus, P as PluginRegistry, G as ActivityNameFormatter, J as PortProviderRegistry, Y as WorkflowDefinitionsApi, M as MonacoEditorSettings, w as ActivityDriverRegistry, af as WorkflowEditorEventTypes } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './descriptors-store-6bb78eef.js';
import { W as WorkflowDefinitionTunnel } from './state-4c58f716.js';
import { W as WorkflowPropertiesEditorTabs } from './props-editor-tabs-0fa07a20.js';
import './_commonjsHelpers-7db8bc26.js';
import './index-01748867.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

const editorCss = ":root{--workflow-editor-width:480px;--activity-picker-width:300px;--activity-editor-height:200px}elsa-flowchart{position:absolute;left:var(--activity-picker-width);top:54px;right:var(--workflow-editor-width);bottom:var(--activity-editor-height)}.elsa-panel-toolbar{left:var(--activity-picker-width);right:var(--workflow-editor-width)}elsa-panel.panel-state-expanded.elsa-activity-picker-container{width:var(--activity-picker-width)}elsa-panel.panel-state-expanded.elsa-workflow-editor-container{width:var(--workflow-editor-width);right:0;left:unset}elsa-panel.panel-state-expanded.elsa-activity-editor-container{height:var(--activity-editor-height);right:var(--workflow-editor-width);left:var(--activity-picker-width);bottom:0}.activity-picker-closed .activity-list{display:none}.activity-picker-closed elsa-flowchart{left:0}.object-editor-closed .object-editor-container{display:none}.object-editor-closed elsa-flowchart{right:0}.activity-editor-closed .activity-editor-container{display:none}.activity-editor-closed elsa-flowchart{bottom:0}.panel-bottom{width:calc(100vw - var(--workflow-editor-width) - var(--activity-picker-width))}";

const WorkflowDefinitionEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.workflowUpdated = createEvent(this, "workflowUpdated", 7);
    this.renderSelectedObject = () => {
      if (!!this.selectedActivity)
        return h("elsa-activity-properties-editor", { isReadonly: this.workflowDefinition.isReadonly, activity: this.selectedActivity, variables: this.workflowDefinitionState.variables, outputs: this.workflowDefinitionState.outputs, workflowDefinitionId: this.workflowDefinitionState.definitionId, onActivityUpdated: e => this.onActivityUpdated(e) });
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
      const updatedWorkflowDefinitionClone = object.cloneDeep(updatedWorkflowDefinition);
      removeGuidsFromPortNames(updatedWorkflowDefinitionClone.root);
      return !lodash.isEqual(existingWorkflowDefinition, updatedWorkflowDefinitionClone);
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
      if (e.detail.updatedTab == WorkflowPropertiesEditorTabs.Variables) {
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
    this.eventBus = Container.get(EventBus);
    this.pluginRegistry = Container.get(PluginRegistry);
    this.activityNameFormatter = Container.get(ActivityNameFormatter);
    this.portProviderRegistry = Container.get(PortProviderRegistry);
    this.saveChangesDebounced = lodash.debounce(this.saveChanges, 1000);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
  }
  handleMonacoLibPath(value) {
    const settings = Container.get(MonacoEditorSettings);
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
    const registry = Container.get(ActivityDriverRegistry);
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
    await this.eventBus.emit(WorkflowEditorEventTypes.WorkflowDefinition.Imported, this, { workflowDefinition });
  }
  // Updates the workflow definition without importing it into the designer.
  async updateWorkflowDefinition(workflowDefinition) {
    if (this.workflowDefinitionState != workflowDefinition) {
      this.workflowDefinitionState = workflowDefinition;
      window.requestAnimationFrame(async () => {
        await this.updateSelectedActivity();
        await this.eventBus.emit(WorkflowEditorEventTypes.WorkflowEditor.WorkflowLoaded, this, { workflowEditor: this, workflowDefinition: workflowDefinition });
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
    await this.eventBus.emit(WorkflowEditorEventTypes.WorkflowEditor.Ready, this, { workflowEditor: this, workflowDefinition: this.workflowDefinitionState });
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
    const state = {
      workflowDefinition: this.workflowDefinitionState
    };
    return (h(WorkflowDefinitionTunnel.Provider, { state: state }, h("div", { class: "tw-absolute tw-inset-0", ref: el => this.container = el }, h("elsa-workflow-definition-editor-toolbar", { zoomToFit: this.onZoomToFit, onAutoLayout: (e) => this.onAutoLayout(e.detail) }), h("elsa-panel", { class: "elsa-activity-picker-container tw-z-30", position: PanelPosition.Left, onExpandedStateChanged: e => this.onActivityPickerPanelStateChanged(e.detail) }, h("elsa-workflow-definition-editor-toolbox", { isReadonly: this.workflowDefinition.isReadonly, ref: el => this.toolbox = el })), h("elsa-flowchart", { isReadonly: this.workflowDefinition.isReadonly, key: workflowDefinition.definitionId, ref: el => this.flowchart = el, rootActivity: workflowDefinition.root, interactiveMode: true, onActivitySelected: e => this.onActivitySelected(e), onChildActivitySelected: e => this.onChildActivitySelected(e), onGraphUpdated: e => this.onGraphUpdated(e), onDragOver: e => this.onDragOver(e), onDrop: e => this.onDrop(e) }), h("elsa-panel", { class: "elsa-workflow-editor-container tw-z-30", position: PanelPosition.Right, onExpandedStateChanged: e => this.onWorkflowEditorPanelStateChanged(e.detail) }, h("div", { class: "object-editor-container" }, h("elsa-workflow-definition-properties-editor", { readonly: this.workflowDefinition.isReadonly, workflowDefinition: this.workflowDefinitionState, workflowVersions: this.workflowVersions, onWorkflowPropsUpdated: e => this.onWorkflowPropsUpdated(e), onVersionSelected: e => this.onVersionSelected(e), onDeleteVersionClicked: e => this.onDeleteVersionClicked(e), onRevertVersionClicked: e => this.onRevertVersionClicked(e) }))), h("elsa-panel", { class: "elsa-activity-editor-container panel-bottom", position: PanelPosition.Bottom, onExpandedStateChanged: e => this.onActivityEditorPanelStateChanged(e.detail) }, h("div", { class: "activity-editor-container" }, this.renderSelectedObject())))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "monacoLibPath": ["handleMonacoLibPath"],
    "workflowDefinition": ["onWorkflowDefinitionChanged"]
  }; }
};
WorkflowDefinitionEditor.style = editorCss;

export { WorkflowDefinitionEditor as elsa_workflow_definition_editor };

//# sourceMappingURL=elsa-workflow-definition-editor.entry.js.map