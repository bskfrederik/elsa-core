import { r as registerInstance, h, a as getElement, c as createEvent } from './index-08112852.js';
import { I as InfoList } from './info-list-bcdc458e.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import { h as hooks } from './notification-service-c7fdb37c.js';
import { ag as ActivityIconSize, C as Container, x as ActivityIconRegistry, B as EventBus, o as isNullOrWhitespace, f as formatTimestamp, r as durationToString, g as formatTime, h as getDuration, a0 as WorkflowInstancesApi } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import { g as getLocaleComponentStrings } from './locale-9771e9cf.js';
import { w as walkActivities, f as flatten } from './activity-walker-8232cc44.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';

const ActivityProperties = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.findActivityDescriptor = () => {
      const activity = this.activity;
      if (!activity)
        return null;
      const descriptor = state.activityDescriptors.find(x => x.typeName == activity.type && x.version == activity.version);
      return descriptor !== null && descriptor !== void 0 ? descriptor : state.activityDescriptors.sort((a, b) => b.version - a.version).find(x => x.typeName == this.activity.type);
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.renderPropertiesTab = () => {
      var _a, _b, _c;
      const activity = this.activity;
      const activityDescriptor = this.findActivityDescriptor();
      const properties = activityDescriptor.inputs.filter(x => x.isBrowsable);
      const activityId = activity.id;
      const displayText = (_b = (_a = activity.metadata) === null || _a === void 0 ? void 0 : _a.displayText) !== null && _b !== void 0 ? _b : '';
      const executionLogEntry = this.activityExecutionLog;
      const activityState = (_c = executionLogEntry === null || executionLogEntry === void 0 ? void 0 : executionLogEntry.activityState) !== null && _c !== void 0 ? _c : {};
      const propertyDetails = {
        [this.strings.propertiesTabActivityId]: activityId,
        [this.strings.propertiesTabDisplayText]: displayText
      };
      for (const property of properties) {
        const loggedPropName = property.name;
        const propertyValue = activityState[loggedPropName];
        const propertyValueText = (propertyValue !== null && typeof propertyValue === 'object') ? JSON.stringify(propertyValue) : (propertyValue != null ? propertyValue.toString() : '');
        propertyDetails[property.displayName] = propertyValueText;
      }
      return h("div", null, h(InfoList, { title: this.strings.propertiesTab, dictionary: propertyDetails }));
    };
    this.renderCommonTab = () => {
      return h("div", null);
    };
    this.renderJournalTab = () => {
      var _a;
      const log = this.activityExecutionLog;
      if (log == null)
        return;
      const exception = (_a = log.payload) === null || _a === void 0 ? void 0 : _a.exception;
      const statusColor = log.eventName == "Completed" ? "tw-bg-blue-100" : log.eventName == "Faulted" ? "tw-bg-red-100" : "tw-bg-green-100";
      const icon = this.iconRegistry.getOrDefault(log.activityType)({ size: ActivityIconSize.Small });
      return (h("div", { class: "tw-border-2 tw-cursor-pointer tw-p-4 tw-rounded" }, h("div", { class: "tw-relative tw-pb-10" }, h("div", { class: "tw-relative tw-flex tw-space-x-3" }, h("div", null, h("span", { class: `tw-h-8 tw-w-8 tw-rounded tw-p-1 tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-ring-8 tw-ring-white tw-mr-1` }, icon)), h("div", { class: "tw-min-w-0 tw-flex-1 tw-pt-1.5 tw-flex tw-justify-between tw-space-x-4" }, h("div", null, h("h3", { class: "tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-900" }, log.activityType)), h("div", null, h("span", { class: `tw-relative tw-inline-flex tw-items-center tw-rounded-full ${statusColor} tw-border tw-border-gray-300 tw-px-3 tw-py-0.5 tw-text-sm` }, h("span", { class: "tw-absolute tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center" }, h("span", { class: `tw-h-1.5 tw-w-1.5 tw-rounded-full`, "aria-hidden": "true" })), h("span", { class: "tw-font-medium tw-text-gray-900" }, log.eventName))), h("div", { class: "tw-text-right tw-text-sm tw-whitespace-nowrap tw-text-gray-500" }, h("span", null, hooks(log.timestamp).format('DD-MM-YYYY HH:mm:ss'))))), h("div", { class: "tw-ml-12 tw-mt-2" }, h("dl", { class: "sm:tw-divide-y sm:tw-divide-gray-200" }, h("div", { class: "tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8 sm:tw-grid-cols-2" }, h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, this.strings.journalTabActivityId), h("copy-button", { value: log.activityId })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-mb-2" }, log.activityId)), !!exception ? ([h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, this.strings.journalTabException), h("copy-button", { value: exception.Type + '\n' + exception.Message })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900" }, exception.message)), h("div", { class: "sm:tw-col-span-2" }, h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, h("span", null, "Exception Details"), h("copy-button", { value: JSON.stringify(exception, null, 1) })), h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-overflow-x-auto" }, h("pre", null, JSON.stringify(exception, null, 1))))]) : undefined))))));
    };
    this.activity = undefined;
    this.activityExecutionLog = undefined;
    this.activityPropertyTabIndex = undefined;
    this.selectedTabIndex = 0;
    this.iconRegistry = Container.get(ActivityIconRegistry);
  }
  async show() {
    await this.slideOverPanel.show();
  }
  async hide() {
    await this.slideOverPanel.hide();
  }
  async updateSelectedTab(tabIndex) {
    this.selectedTabIndex = tabIndex;
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    console.log(this.strings);
    if (this.activityPropertyTabIndex != null) {
      this.selectedTabIndex = this.activityPropertyTabIndex;
    }
  }
  render() {
    const activity = this.activity;
    const activityDescriptor = this.findActivityDescriptor();
    const propertiesTab = {
      displayText: this.strings.propertiesTab,
      content: () => this.renderPropertiesTab()
    };
    const commonTab = {
      displayText: this.strings.commonTab,
      content: () => this.renderCommonTab()
    };
    const journalTab = {
      displayText: this.strings.journalTab,
      content: () => this.renderJournalTab()
    };
    const tabs = !!activityDescriptor ? [propertiesTab, commonTab, journalTab] : [];
    const mainTitle = activity.id;
    const subTitle = activityDescriptor.displayName;
    return (h("elsa-form-panel", { mainTitle: mainTitle, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "activity": ["componentWillLoad"]
  }; }
};

const WorkflowInstancePropertiesEventTypes = {
  Displaying: 'workflow-instance-properties:displaying'
};

const WorkflowDefinitionPropertiesEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get element() { return getElement(this); }
  static get watchers() { return {
    "workflowDefinition": ["onWorkflowDefinitionChanged"],
    "workflowInstance": ["onWorkflowInstanceChanged"]
  }; }
};

const journalCss = "table.workflow-journal-table tbody tr td{padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0px}table.workflow-journal-table tbody tr td:first-child{padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0px}";

// TODO: Implement dynamic loading of records.
const PAGE_SIZE = 10000;
const Journal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.journalItemSelected = createEvent(this, "journalItemSelected", 7);
    this.renderBlocks = (blocks) => {
      const journalActivityMap = this.journalActivityMap;
      const iconRegistry = this.iconRegistry;
      const expandedBlocks = this.expandedBlocks;
      const sortedBlocks = this.sortByTimestamp(blocks);
      return sortedBlocks.map((block) => {
        const activityNode = journalActivityMap[block.nodeId];
        if (activityNode == null)
          debugger;
        const activity = activityNode.activity;
        if (activity.type == "Elsa.Workflow" || activity.type == "Elsa.Flowchart")
          return this.renderBlocks(block.children);
        const activityMetadata = activity.metadata;
        const activityDisplayText = isNullOrWhitespace(activityMetadata.displayText) ? activity.id : activityMetadata.displayText;
        const duration = durationToString(block.duration);
        const status = block.completed ? 'Completed' : block.suspended ? 'Suspended' : block.faulted ? 'Faulted' : 'Started';
        const icon = iconRegistry.getOrDefault(activity.type)({ size: ActivityIconSize.Small });
        const expanded = !!expandedBlocks.find(x => x == block);
        const statusColor = block.completed ? "tw-bg-blue-100" : block.faulted ? "tw-bg-red-100" : "tw-bg-green-100";
        const toggleIcon = expanded
          ? (h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), h("line", { x1: "9", y1: "12", x2: "15", y2: "12" })))
          : (h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), h("line", { x1: "9", y1: "12", x2: "15", y2: "12" }), h("line", { x1: "12", y1: "9", x2: "12", y2: "15" })));
        return ([h("tr", null, h("td", { class: "tw-w-1" }, block.children.length > 0 ? (h("a", { href: "#", onClick: e => this.onBlockClick(e, block) }, toggleIcon)) : undefined), h("td", null, h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, formatTime(block.timestamp))), h("td", { class: "tw-min-w-full" }, h("div", { class: "tw-flex tw-items-center tw-space-x-1" }, h("div", { class: "tw-flex-shrink" }, h("div", { class: "tw-bg-blue-500 tw-rounded tw-p-1" }, h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, icon))), h("div", null, h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, activityDisplayText)))), h("td", null, h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity), class: `tw-inline-flex tw-rounded-full ${statusColor} tw-px-2 tw-text-xs tw-font-semibold tw-leading-5 tw-text-green-800` }, status)), h("td", null, h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, duration))), expanded ? this.renderBlocks(block.children) : undefined]);
      }).filter(x => !!x);
    };
    this.loadJournalPage = async (page) => {
      if (!this.model)
        return;
      const workflowInstance = this.model.workflowInstance;
      const workflowInstanceId = workflowInstance.id;
      const pageOfRecords = await this.workflowInstancesApi.getJournal({ page, pageSize: PAGE_SIZE, workflowInstanceId: workflowInstanceId });
      const blocks = this.createBlocks(pageOfRecords.items);
      const rootBlocks = blocks.filter(x => !x.parentActivityInstanceId);
      this.workflowExecutionLogRecords = [...this.workflowExecutionLogRecords, ...pageOfRecords.items];
      this.rootBlocks = rootBlocks;
      this.blocks = this.sortByTimestamp(blocks);
    };
    this.createBlocks = (records) => {
      const startedEvents = records.filter(x => x.eventName == 'Started');
      const completedEvents = records.filter(x => x.eventName == 'Completed');
      const faultedEvents = records.filter(x => x.eventName == 'Faulted');
      const suspendedEvents = records.filter(x => x.eventName == 'Suspended');
      const blocks = startedEvents.map(startedRecord => {
        const completedRecord = completedEvents.find(x => x.activityInstanceId == startedRecord.activityInstanceId);
        const faultedRecord = faultedEvents.find(x => x.activityInstanceId == startedRecord.activityInstanceId);
        const suspendedRecord = suspendedEvents.find(x => x.activityInstanceId == startedRecord.activityInstanceId);
        const duration = !!completedRecord ? getDuration(completedRecord.timestamp, startedRecord.timestamp) : null;
        return {
          nodeId: startedRecord.nodeId,
          activityId: startedRecord.activityId,
          activityInstanceId: startedRecord.activityInstanceId,
          parentActivityInstanceId: startedRecord.parentActivityInstanceId,
          completed: !!completedRecord,
          faulted: !!faultedRecord,
          suspended: !!suspendedRecord,
          timestamp: startedRecord.timestamp,
          duration: duration,
          startedRecord: startedRecord,
          completedRecord: completedRecord,
          faultedRecord: faultedRecord,
          suspendedRecord: suspendedRecord,
          children: []
        };
      });
      for (const block of blocks)
        block.children = this.findChildBlocks(blocks, block.activityInstanceId);
      return blocks;
    };
    this.findChildBlocks = (blocks, parentActivityInstanceId) => {
      if (blocks.length == 0)
        return [];
      return !!parentActivityInstanceId
        ? blocks.filter(x => x.parentActivityInstanceId == parentActivityInstanceId)
        : blocks.filter(x => !x.parentActivityInstanceId);
    };
    this.onBlockClick = (e, block) => {
      e.preventDefault();
      const existingBlock = this.expandedBlocks.find(x => x == block);
      this.expandedBlocks = existingBlock ? this.expandedBlocks.filter(x => x != existingBlock) : [...this.expandedBlocks, block];
    };
    this.onJournalItemClick = async (e, block, activity) => {
      e.preventDefault();
      this.journalItemSelected.emit({ activity: activity, executionEventBlock: block, activityNode: this.journalActivityMap[block.nodeId] });
    };
    this.model = undefined;
    this.workflowExecutionLogRecords = [];
    this.blocks = [];
    this.rootBlocks = [];
    this.expandedBlocks = [];
    this.journalActivityMap = new Set();
    this.iconRegistry = Container.get(ActivityIconRegistry);
    this.workflowInstancesApi = Container.get(WorkflowInstancesApi);
  }
  async onWorkflowInstanceModelChanged(oldValue, newValue) {
    if (oldValue.workflowInstance.id != newValue.workflowInstance.id)
      await this.refresh();
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    await this.refresh();
  }
  async refresh() {
    this.rootBlocks = [];
    await this.loadJournalPage(0);
    this.createActivityMapForJournal();
  }
  render() {
    return (h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, h("div", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl" }, h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50 sm:tw-px-6" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-1" }, h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900" }, this.strings.worfklowJournal)))), h("div", { class: "tw-flex-1 tw-relative" }, h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, h("table", { class: "workflow-journal-table" }, h("thead", null, h("tr", null, h("th", { class: "tw-w-1" }), h("th", null, this.strings.time), h("th", { class: "tw-min-w-full" }, this.strings.activity), h("th", null, this.strings.status), h("th", null, this.strings.duration))), h("tbody", { class: "tw-bg-white tw-divide-y tw-divide-gray-100" }, this.renderBlocks(this.rootBlocks)))))))));
  }
  sortByTimestamp(blocks) {
    return blocks.sort(function (x, y) {
      if (x.timestamp > y.timestamp)
        return 1;
      return -1;
    });
  }
  createActivityMapForJournal() {
    const workflowDefinition = this.model.workflowDefinition;
    // Create dummy root workflow to match structure of workflow execution log entries in order to generate the right node IDs.
    const workflow = {
      type: 'Elsa.Workflow',
      version: workflowDefinition.version,
      id: "Workflow1",
      root: workflowDefinition.root,
      variables: workflowDefinition.variables,
      metadata: {},
      customProperties: {}
    };
    const graph = walkActivities(workflow);
    const nodes = flatten(graph);
    const map = new Set();
    for (const node of nodes)
      map[node.nodeId] = node;
    this.journalActivityMap = map;
    this.blocks = this.blocks.filter(x => !!map[x.nodeId]);
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "model": ["onWorkflowInstanceModelChanged"]
  }; }
};
Journal.style = journalCss;

export { ActivityProperties as elsa_activity_properties, WorkflowDefinitionPropertiesEditor as elsa_workflow_instance_properties, Journal as elsa_workflow_journal };

//# sourceMappingURL=elsa-activity-properties_3.entry.js.map