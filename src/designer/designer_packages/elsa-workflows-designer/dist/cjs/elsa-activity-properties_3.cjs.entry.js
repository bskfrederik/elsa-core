'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const infoList = require('./info-list-d2663efb.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');
const notificationService = require('./notification-service-99c155e7.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
const locale = require('./locale-4dbc7596.js');
const activityWalker = require('./activity-walker-8d00b1aa.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');

const ActivityProperties = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.findActivityDescriptor = () => {
      const activity = this.activity;
      if (!activity)
        return null;
      const descriptor = descriptorsStore.state.activityDescriptors.find(x => x.typeName == activity.type && x.version == activity.version);
      return descriptor !== null && descriptor !== void 0 ? descriptor : descriptorsStore.state.activityDescriptors.sort((a, b) => b.version - a.version).find(x => x.typeName == this.activity.type);
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
      return index.h("div", null, index.h(infoList.InfoList, { title: this.strings.propertiesTab, dictionary: propertyDetails }));
    };
    this.renderCommonTab = () => {
      return index.h("div", null);
    };
    this.renderJournalTab = () => {
      var _a;
      const log = this.activityExecutionLog;
      if (log == null)
        return;
      const exception = (_a = log.payload) === null || _a === void 0 ? void 0 : _a.exception;
      const statusColor = log.eventName == "Completed" ? "tw-bg-blue-100" : log.eventName == "Faulted" ? "tw-bg-red-100" : "tw-bg-green-100";
      const icon = this.iconRegistry.getOrDefault(log.activityType)({ size: utils.ActivityIconSize.Small });
      return (index.h("div", { class: "tw-border-2 tw-cursor-pointer tw-p-4 tw-rounded" }, index.h("div", { class: "tw-relative tw-pb-10" }, index.h("div", { class: "tw-relative tw-flex tw-space-x-3" }, index.h("div", null, index.h("span", { class: `tw-h-8 tw-w-8 tw-rounded tw-p-1 tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-ring-8 tw-ring-white tw-mr-1` }, icon)), index.h("div", { class: "tw-min-w-0 tw-flex-1 tw-pt-1.5 tw-flex tw-justify-between tw-space-x-4" }, index.h("div", null, index.h("h3", { class: "tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-900" }, log.activityType)), index.h("div", null, index.h("span", { class: `tw-relative tw-inline-flex tw-items-center tw-rounded-full ${statusColor} tw-border tw-border-gray-300 tw-px-3 tw-py-0.5 tw-text-sm` }, index.h("span", { class: "tw-absolute tw-flex-shrink-0 tw-flex tw-items-center tw-justify-center" }, index.h("span", { class: `tw-h-1.5 tw-w-1.5 tw-rounded-full`, "aria-hidden": "true" })), index.h("span", { class: "tw-font-medium tw-text-gray-900" }, log.eventName))), index.h("div", { class: "tw-text-right tw-text-sm tw-whitespace-nowrap tw-text-gray-500" }, index.h("span", null, notificationService.hooks(log.timestamp).format('DD-MM-YYYY HH:mm:ss'))))), index.h("div", { class: "tw-ml-12 tw-mt-2" }, index.h("dl", { class: "sm:tw-divide-y sm:tw-divide-gray-200" }, index.h("div", { class: "tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8 sm:tw-grid-cols-2" }, index.h("div", { class: "sm:tw-col-span-2" }, index.h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, index.h("span", null, this.strings.journalTabActivityId), index.h("copy-button", { value: log.activityId })), index.h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-mb-2" }, log.activityId)), !!exception ? ([index.h("div", { class: "sm:tw-col-span-2" }, index.h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, index.h("span", null, this.strings.journalTabException), index.h("copy-button", { value: exception.Type + '\n' + exception.Message })), index.h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900" }, exception.message)), index.h("div", { class: "sm:tw-col-span-2" }, index.h("dt", { class: "tw-text-sm tw-font-medium tw-text-gray-500" }, index.h("span", null, "Exception Details"), index.h("copy-button", { value: JSON.stringify(exception, null, 1) })), index.h("dd", { class: "tw-mt-1 tw-text-sm tw-text-gray-900 tw-overflow-x-auto" }, index.h("pre", null, JSON.stringify(exception, null, 1))))]) : undefined))))));
    };
    this.activity = undefined;
    this.activityExecutionLog = undefined;
    this.activityPropertyTabIndex = undefined;
    this.selectedTabIndex = 0;
    this.iconRegistry = utils.Container.get(utils.ActivityIconRegistry);
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
    this.strings = await locale.getLocaleComponentStrings(this.element);
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
    return (index.h("elsa-form-panel", { mainTitle: mainTitle, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "activity": ["componentWillLoad"]
  }; }
};

const WorkflowInstancePropertiesEventTypes = {
  Displaying: 'workflow-instance-properties:displaying'
};

const WorkflowDefinitionPropertiesEditor = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
                [this.strings.propertiesTabInstanceId]: utils.isNullOrWhitespace(workflowInstance.id) ? this.strings.propertiesNew : workflowInstance.id,
                [this.strings.propertiesTabDefinitionId]: utils.isNullOrWhitespace(workflowDefinition.definitionId) ? this.strings.propertiesNew : workflowDefinition.definitionId,
                [this.strings.propertiesTabVersion]: workflowDefinition.version.toString(),
              };
              const statusDetails = {
                [this.strings.propertiesTabStatus]: workflowInstance.status,
                [this.strings.propertiesTabSubStatus]: workflowInstance.subStatus
              };
              const timestampDetails = {
                [this.strings.propertiesTabCreated]: utils.formatTimestamp(workflowInstance.createdAt),
                [this.strings.propertiesTabLastExecution]: utils.formatTimestamp(workflowInstance.updatedAt),
                [this.strings.propertiesTabFinished]: utils.formatTimestamp(workflowInstance.finishedAt),
              };
              return index.h("div", null, index.h(infoList.InfoList, { title: this.strings.propertiesTab, dictionary: identityDetails }), index.h(infoList.InfoList, { title: this.strings.propertiesTabStatus, dictionary: statusDetails }), index.h(infoList.InfoList, { title: this.strings.propertiesTabTimeStamps, dictionary: timestampDetails, hideEmptyValues: true }));
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
      return index.h("div", null, widgets.map(widget => widget.content()));
    };
    this.renderVariablesTab = () => {
      var _a, _b;
      const variables = (_b = (_a = this.workflowDefinition) === null || _a === void 0 ? void 0 : _a.variables) !== null && _b !== void 0 ? _b : [];
      return index.h("div", null, index.h("elsa-variables-viewer", { variables: variables, workflowDefinition: this.workflowDefinition, workflowInstance: this.workflowInstance }));
    };
    this.onSelectedTabIndexChanged = (e) => this.selectedTabIndex = e.detail.selectedTabIndex;
    this.workflowDefinition = undefined;
    this.workflowInstance = undefined;
    this.model = undefined;
    this.selectedTabIndex = 0;
    this.changeHandle = {};
    this.eventBus = utils.Container.get(utils.EventBus);
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
    this.strings = await locale.getLocaleComponentStrings(this.element);
    await this.createModel();
  }
  render() {
    const workflowDefinition = this.workflowDefinition;
    const title = !utils.isNullOrWhitespace(workflowDefinition === null || workflowDefinition === void 0 ? void 0 : workflowDefinition.name) ? workflowDefinition.name : '-';
    const subTitle = 'Workflow Instance';
    const tabs = this.model.tabModels.map(x => x.tab);
    return (index.h("elsa-form-panel", { mainTitle: title, subTitle: subTitle, tabs: tabs, selectedTabIndex: this.selectedTabIndex, onSelectedTabIndexChanged: e => this.onSelectedTabIndexChanged(e) }));
  }
  get element() { return index.getElement(this); }
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
    index.registerInstance(this, hostRef);
    this.journalItemSelected = index.createEvent(this, "journalItemSelected", 7);
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
        const activityDisplayText = utils.isNullOrWhitespace(activityMetadata.displayText) ? activity.id : activityMetadata.displayText;
        const duration = utils.durationToString(block.duration);
        const status = block.completed ? 'Completed' : block.suspended ? 'Suspended' : block.faulted ? 'Faulted' : 'Started';
        const icon = iconRegistry.getOrDefault(activity.type)({ size: utils.ActivityIconSize.Small });
        const expanded = !!expandedBlocks.find(x => x == block);
        const statusColor = block.completed ? "tw-bg-blue-100" : block.faulted ? "tw-bg-red-100" : "tw-bg-green-100";
        const toggleIcon = expanded
          ? (index.h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), index.h("line", { x1: "9", y1: "12", x2: "15", y2: "12" })))
          : (index.h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("path", { stroke: "none", d: "M0 0h24v24H0z" }), index.h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }), index.h("line", { x1: "9", y1: "12", x2: "15", y2: "12" }), index.h("line", { x1: "12", y1: "9", x2: "12", y2: "15" })));
        return ([index.h("tr", null, index.h("td", { class: "tw-w-1" }, block.children.length > 0 ? (index.h("a", { href: "#", onClick: e => this.onBlockClick(e, block) }, toggleIcon)) : undefined), index.h("td", null, index.h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, utils.formatTime(block.timestamp))), index.h("td", { class: "tw-min-w-full" }, index.h("div", { class: "tw-flex tw-items-center tw-space-x-1" }, index.h("div", { class: "tw-flex-shrink" }, index.h("div", { class: "tw-bg-blue-500 tw-rounded tw-p-1" }, index.h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, icon))), index.h("div", null, index.h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, activityDisplayText)))), index.h("td", null, index.h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity), class: `tw-inline-flex tw-rounded-full ${statusColor} tw-px-2 tw-text-xs tw-font-semibold tw-leading-5 tw-text-green-800` }, status)), index.h("td", null, index.h("a", { href: "#", onClick: e => this.onJournalItemClick(e, block, activity) }, duration))), expanded ? this.renderBlocks(block.children) : undefined]);
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
        const duration = !!completedRecord ? utils.getDuration(completedRecord.timestamp, startedRecord.timestamp) : null;
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
    this.iconRegistry = utils.Container.get(utils.ActivityIconRegistry);
    this.workflowInstancesApi = utils.Container.get(utils.WorkflowInstancesApi);
  }
  async onWorkflowInstanceModelChanged(oldValue, newValue) {
    if (oldValue.workflowInstance.id != newValue.workflowInstance.id)
      await this.refresh();
  }
  async componentWillLoad() {
    this.strings = await locale.getLocaleComponentStrings(this.element);
    await this.refresh();
  }
  async refresh() {
    this.rootBlocks = [];
    await this.loadJournalPage(0);
    this.createActivityMapForJournal();
  }
  render() {
    return (index.h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, index.h("div", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl" }, index.h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, index.h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50 sm:tw-px-6" }, index.h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, index.h("div", { class: "tw-space-y-1" }, index.h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900" }, this.strings.worfklowJournal)))), index.h("div", { class: "tw-flex-1 tw-relative" }, index.h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, index.h("table", { class: "workflow-journal-table" }, index.h("thead", null, index.h("tr", null, index.h("th", { class: "tw-w-1" }), index.h("th", null, this.strings.time), index.h("th", { class: "tw-min-w-full" }, this.strings.activity), index.h("th", null, this.strings.status), index.h("th", null, this.strings.duration))), index.h("tbody", { class: "tw-bg-white tw-divide-y tw-divide-gray-100" }, this.renderBlocks(this.rootBlocks)))))))));
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
    const graph = activityWalker.walkActivities(workflow);
    const nodes = activityWalker.flatten(graph);
    const map = new Set();
    for (const node of nodes)
      map[node.nodeId] = node;
    this.journalActivityMap = map;
    this.blocks = this.blocks.filter(x => !!map[x.nodeId]);
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "model": ["onWorkflowInstanceModelChanged"]
  }; }
};
Journal.style = journalCss;

exports.elsa_activity_properties = ActivityProperties;
exports.elsa_workflow_instance_properties = WorkflowDefinitionPropertiesEditor;
exports.elsa_workflow_journal = Journal;

//# sourceMappingURL=elsa-activity-properties_3.cjs.entry.js.map