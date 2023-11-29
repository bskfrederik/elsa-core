import { h } from "@stencil/core";
import { Container } from "typedi";
import { ActivityIconRegistry, flatten, walkActivities } from "../../../services";
import { durationToString, formatTime, getDuration, isNullOrWhitespace } from "../../../utils";
import { ActivityIconSize } from "../../../components/icons/activities";
import { WorkflowInstancesApi } from "../services/workflow-instances-api";
import { getLocaleComponentStrings } from "../../../utils/locale";
// TODO: Implement dynamic loading of records.
const PAGE_SIZE = 10000;
export class Journal {
  constructor() {
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
  static get is() { return "elsa-workflow-journal"; }
  static get originalStyleUrls() {
    return {
      "$": ["journal.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["journal.css"]
    };
  }
  static get properties() {
    return {
      "model": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowJournalModel",
          "resolved": "WorkflowJournalModel",
          "references": {
            "WorkflowJournalModel": {
              "location": "import",
              "path": "../models"
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
      "workflowExecutionLogRecords": {},
      "blocks": {},
      "rootBlocks": {},
      "expandedBlocks": {},
      "journalActivityMap": {}
    };
  }
  static get events() {
    return [{
        "method": "journalItemSelected",
        "name": "journalItemSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "JournalItemSelectedArgs",
          "resolved": "JournalItemSelectedArgs",
          "references": {
            "JournalItemSelectedArgs": {
              "location": "import",
              "path": "../events"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "refresh": {
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
        "propName": "model",
        "methodName": "onWorkflowInstanceModelChanged"
      }];
  }
}
//# sourceMappingURL=journal.js.map
