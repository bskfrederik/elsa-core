import 'reflect-metadata';
import { h } from '@stencil/core';
import { first } from 'lodash';
import './shapes';
import './ports';
import { createGraph } from './graph-factory';
import { NodeFactory } from './node-factory';
import { Container } from 'typedi';
import { createActivityLookup, EventBus, flatten, PortProviderRegistry, walkActivities } from '../../services';
import { FlowchartEvents } from './events';
import { ContextMenuAnchorPoint } from '../../components/shared/context-menu/models';
import descriptorsStore from '../../data/descriptors-store';
import { generateUniqueActivityName } from '../../utils/generate-activity-name';
import { DagreLayout } from '@antv/layout';
import { adjustPortMarkupByNode, getPortNameByPortId, rebuildGraph } from '../../utils/graph';
import FlowchartTunnel from './state';
const FlowchartTypeName = 'Elsa.Flowchart';
export class FlowchartComponent {
  constructor() {
    this.getFlowchartDescriptor = () => this.getActivityDescriptor(FlowchartTypeName, 1);
    this.createFlowchart = async () => {
      const descriptor = this.getFlowchartDescriptor();
      const activityId = await this.generateUniqueActivityName(descriptor);
      return {
        type: descriptor.typeName,
        version: descriptor.version,
        id: activityId,
        start: null,
        activities: [],
        connections: [],
        metadata: {},
        variables: [],
        customProperties: {},
        canStartWorkflow: false,
      };
    };
    this.createAndInitializeGraph = async () => {
      const graph = (this.graph = createGraph(this.container, {
        nodeMovable: () => this.interactiveMode,
        edgeMovable: () => this.interactiveMode,
        arrowheadMovable: () => this.interactiveMode,
        edgeLabelMovable: () => this.interactiveMode,
        magnetConnectable: () => this.interactiveMode,
        useEdgeTools: () => this.interactiveMode,
        toolsAddable: () => this.interactiveMode,
        stopDelegateOnDragging: () => this.interactiveMode,
        vertexAddable: () => this.interactiveMode,
        vertexDeletable: () => this.interactiveMode,
        vertexMovable: () => this.interactiveMode,
      }, this.getAllActivities));
      graph.on('blank:click', this.onGraphClick);
      graph.on('node:selected', this.onNodeSelected);
      graph.on('node:contextmenu', this.onNodeContextMenu);
      graph.on('edge:connected', this.onEdgeConnected);
      graph.on('node:moved', this.onNodeMoved);
      graph.on('node:moved', this.onGraphChanged);
      graph.on('node:added', this.onNodeAdded);
      graph.on('node:removed', this.onNodeRemoved);
      graph.on('edge:added', this.onGraphChanged);
      graph.on('edge:removed', this.onGraphChanged);
      graph.on('edge:connected', this.onGraphChanged);
      await this.updateLayout();
    };
    this.getCurrentActivity = () => {
      const activityLookup = this.activityLookup;
      const path = this.path;
      if (path.length > 0) {
        const lastItem = path[path.length - 1];
        return activityLookup[lastItem.activityId];
      }
      return this.rootActivity;
    };
    this.getCurrentFlowchartActivity = async () => {
      const path = this.path;
      let currentActivity = this.getCurrentActivity();
      if (path.length > 0) {
        const lastItem = path[path.length - 1];
        return this.resolvePort(currentActivity, lastItem.portName);
      }
      return currentActivity;
    };
    this.resolvePort = (activity, portName) => {
      const portProvider = this.portProviderRegistry.get(activity.type);
      const activityDescriptor = descriptorsStore.activityDescriptors.find(x => x.typeName == activity.type);
      const childActivity = portProvider.resolvePort(portName, { activity: activity, activityDescriptor });
      return childActivity;
    };
    this.setPort = (owner, portName, child) => {
      const portProvider = this.portProviderRegistry.get(owner.type);
      const activityDescriptor = descriptorsStore.activityDescriptors.find(x => x.typeName == owner.type);
      portProvider.assignPort(portName, child, { activity: owner, activityDescriptor });
      this.updateLookups();
    };
    this.updateModel = async () => {
      const model = this.getFlowchartModel();
      const currentFlowchart = await this.getCurrentFlowchartActivity();
      currentFlowchart.activities = model.activities;
      currentFlowchart.connections = model.connections;
      currentFlowchart.start = model.start;
      this.updateLookups();
    };
    this.exportInternal = () => {
      return this.rootActivity;
    };
    this.getActivityDescriptor = (typeName, version) => descriptorsStore.activityDescriptors.find(x => x.typeName == typeName && x.version == version);
    this.setupGraph = async (flowchart) => {
      const activities = flowchart.activities;
      const connections = flowchart.connections;
      this.updateGraphInternal(activities, connections);
      if (this.isReadonly) {
        this.graph.disableSelectionMovable();
        this.graph.disableKeyboard();
      }
    };
    this.updateGraphInternal = (activities, connections) => {
      const edges = [];
      console.log(activities);
      // Create an X6 node for each activity.
      const nodes = activities === null || activities === void 0 ? void 0 : activities.map(activity => {
        var _a;
        const position = ((_a = activity.metadata.designer) === null || _a === void 0 ? void 0 : _a.position) || { x: 100, y: 100 };
        const { x, y } = position;
        const descriptor = this.getActivityDescriptor(activity.type, activity.version);
        return this.nodeFactory.createNode(descriptor, activity, x, y);
      });
      // Create X6 edges for each connection in the flowchart.
      for (const connection of connections) {
        const edge = this.createEdge(connection);
        edges.push(edge);
      }
      const model = { nodes, edges };
      // Freeze then unfreeze prevents an error from occurring when importing JSON a second time (e.g. after loading a new workflow.
      this.graph.freeze();
      this.graph.fromJSON(model, { silent: false });
      this.graph.unfreeze();
      rebuildGraph(this.graph);
      this.graph.scrollToContent();
    };
    this.getFlowchartModel = () => {
      const graph = this.graph;
      const graphModel = graph.toJSON();
      const activities = graphModel.cells.filter(x => x.shape == 'activity').map(x => x.data);
      const connections = graphModel.cells.filter(x => x.shape == 'elsa-edge' && !!x.data).map(x => x.data);
      let rootActivities = activities.filter(activity => {
        const hasInboundConnections = connections.find(c => c.target.activity == activity.id) != null;
        return !hasInboundConnections;
      });
      const startActivity = rootActivities.find(x => x.canStartWorkflow) || first(rootActivities);
      return {
        activities,
        connections,
        start: startActivity === null || startActivity === void 0 ? void 0 : startActivity.id,
      };
    };
    this.createEdge = (connection) => {
      return {
        shape: 'elsa-edge',
        zIndex: -1,
        data: connection,
        source: connection.source.activity,
        target: connection.target.activity,
        sourcePort: connection.source.port,
        targetPort: connection.target.port,
      };
    };
    this.syncEdgeData = (cachedActivityId, updatedActivity) => {
      const graph = this.graph;
      const edges = graph.model.getEdges().filter(x => x.shape == 'elsa-edge' && !!x.data);
      for (const edge of edges) {
        const connection = edge.data;
        if (connection.target.activity != cachedActivityId && connection.source.activity != cachedActivityId)
          continue;
        if (connection.target.activity == cachedActivityId)
          connection.target.activity = updatedActivity.id;
        if (connection.source.activity == cachedActivityId)
          connection.source.activity = updatedActivity.id;
        edge.data = connection;
      }
    };
    this.updateLookups = () => {
      const graph = walkActivities(this.rootActivity);
      const activityNodes = flatten(graph);
      this.activities = activityNodes.map(x => x.activity);
      this.activityLookup = createActivityLookup(activityNodes);
    };
    this.generateUniqueActivityName = async (activityDescriptor) => {
      return await generateUniqueActivityName(this.activities, activityDescriptor);
    };
    this.getAllActivities = () => this.activities;
    this.onGraphClick = async (e) => {
      const currentFlowchart = await this.getCurrentFlowchartActivity();
      const args = {
        activity: currentFlowchart,
      };
      return this.containerSelected.emit(args);
    };
    this.onNodeSelected = async (e) => {
      const node = e.node;
      const activityCopy = node.activity;
      // X6 nodes store a copy of the data, so we need to get the original activity from the workflow definition.
      const activity = this.activityLookup[activityCopy.id];
      const args = {
        activity: activity,
      };
      this.activitySelected.emit(args);
    };
    this.onNodeContextMenu = async (e) => {
      const node = e.node;
      const activity = e.node.data;
      const menuItems = [
        {
          text: 'Startable',
          handler: () => this.onToggleCanStartWorkflowClicked(node),
          isToggle: true,
          checked: activity.canStartWorkflow,
        },
        {
          text: 'Cut',
          handler: () => this.onCutActivityClicked(node),
        },
        {
          text: 'Copy',
          handler: () => this.onCopyActivityClicked(node),
        },
        {
          text: 'Delete',
          handler: () => this.onDeleteActivityClicked(node),
        },
      ];
      this.activityContextMenu.menuItems = this.isReadonly ? [] : menuItems;
      const localPos = this.graph.localToClient(e.x, e.y);
      const scroll = this.graph.getScrollbarPosition();
      this.activityContextMenu.style.top = `${localPos.y}px`;
      this.activityContextMenu.style.left = `${e.x - scroll.left}px`;
      await this.activityContextMenu.open();
    };
    this.onNodeMoved = (e) => {
      const node = e.node;
      const activity = node.data;
      const nodePosition = node.position({ relative: false });
      activity.metadata = Object.assign(Object.assign({}, activity.metadata), { designer: Object.assign(Object.assign({}, activity.metadata.designer), { position: {
            x: nodePosition.x,
            y: nodePosition.y,
          } }) });
    };
    this.onEdgeConnected = async (e) => {
      const edge = e.edge;
      const sourceNode = edge.getSourceNode();
      const targetNode = edge.getTargetNode();
      const sourceActivity = edge.getSourceNode().data;
      const targetActivity = targetNode.data;
      const sourcePort = sourceNode.getPort(edge.getSourcePortId()).id;
      const targetPort = targetNode.getPort(edge.getTargetPortId()).id;
      const connection = {
        source: {
          activity: sourceActivity.id,
          port: sourcePort,
        },
        target: {
          activity: targetActivity.id,
          port: targetPort,
        },
      };
      edge.data = connection;
      const eventArgs = {
        graph: this.graph,
        connection,
        sourceNode,
        targetNode,
        sourceActivity,
        targetActivity,
        edge,
      };
      await this.eventBus.emit(FlowchartEvents.ConnectionCreated, this, eventArgs);
    };
    this.onGraphChanged = async (e) => {
      await this.updateModel();
      this.graphUpdated.emit();
    };
    this.onNodeRemoved = async (e) => {
      const activity = e.node.data;
      this.activityDeleted.emit({ activity });
      await this.onGraphChanged(e);
    };
    this.onNodeAdded = async (e) => {
      const node = e.node;
      if (!node.isClone) {
        const activity = Object.assign({}, node.getData());
        const activityDescriptor = this.getActivityDescriptor(activity.type, activity.version);
        activity.id = await this.generateUniqueActivityName(activityDescriptor);
        node.activity = Object.assign({}, activity);
      }
      await this.onGraphChanged(e);
    };
    this.onToggleCanStartWorkflowClicked = (node) => {
      const activity = node.data;
      activity.canStartWorkflow = !activity.canStartWorkflow;
      node.activity = Object.assign({}, activity);
    };
    this.onDeleteActivityClicked = (node) => {
      let cells = this.graph.getSelectedCells();
      if (cells.length == 0)
        cells = [node];
      this.graph.removeCells(cells);
      for (const cell of cells) {
        const activity = node.data;
        this.activityDeleted.emit({ activity: activity });
      }
    };
    this.onCopyActivityClicked = (node) => {
      let cells = this.graph.getSelectedCells();
      if (cells.length == 0)
        cells = [node];
      this.graph.copy(cells);
    };
    this.onCutActivityClicked = (node) => {
      let cells = this.graph.getSelectedCells();
      if (cells.length == 0)
        cells = [node];
      this.graph.cut(cells);
      for (const cell of cells) {
        const activity = node.data;
        this.activityDeleted.emit({ activity: activity });
      }
    };
    this.onNavigateHierarchy = async (e) => {
      const item = e.detail;
      const path = this.path;
      const index = path.indexOf(item);
      this.path = path.slice(0, index + 1);
      const childFlowchart = await this.getCurrentFlowchartActivity();
      await this.setupGraph(childFlowchart);
      await this.scrollToStart();
    };
    this.updatePorts = (node, activity) => {
      const descriptor = this.getActivityDescriptor(activity.type, activity.version);
      const desiredPorts = this.nodeFactory.createPorts(descriptor, activity);
      const actualPorts = node.ports.items;
      const addedPorts = desiredPorts.filter(x => !actualPorts.some(y => getPortNameByPortId(y.id) == getPortNameByPortId(x.id)));
      const removedPorts = actualPorts.filter(x => !desiredPorts.some(y => getPortNameByPortId(y.id) == getPortNameByPortId(x.id)));
      if (addedPorts.length > 0)
        node.addPorts(addedPorts);
      if (removedPorts.length > 0)
        node.removePorts(removedPorts);
    };
    this.rootActivity = undefined;
    this.interactiveMode = true;
    this.silent = false;
    this.isReadonly = false;
    this.activityLookup = {};
    this.activities = [];
    this.path = [];
    this.eventBus = Container.get(EventBus);
    this.nodeFactory = Container.get(NodeFactory);
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  async handleChildActivitySelected(e) {
    this.childActivitySelected.emit(e.detail);
  }
  async newRoot() {
    const flowchart = await this.createFlowchart();
    await this.setupGraph(flowchart);
    await this.scrollToStart();
    return flowchart;
  }
  async updateGraph() {
    const currentFlowchart = await this.getCurrentFlowchartActivity();
    await this.setupGraph(currentFlowchart);
  }
  async getGraph() {
    return this.graph;
  }
  async reset() {
    const model = { nodes: [], edges: [] };
    // Freeze then unfreeze prevents an error from occurring when importing JSON a second time (e.g. after loading a new workflow.
    this.graph.freeze();
    this.graph.fromJSON(model, { silent: false });
    this.graph.unfreeze();
  }
  async updateLayout() {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    this.graph.resize(width, height);
    this.graph.updateBackground();
  }
  async zoomToFit() {
    const graph = this.graph;
    graph.zoomToFit();
  }
  async scrollToStart() {
    const flowchartModel = this.getFlowchartModel();
    const startActivity = flowchartModel.activities.find(x => x.id == flowchartModel.start);
    if (startActivity != null) {
      this.graph.scrollToCell(this.graph.getCells()[0]);
    }
  }
  async autoLayout(direction) {
    const dagreLayout = new DagreLayout({
      type: 'dagre',
      rankdir: direction,
      align: 'UL',
      ranksep: 30,
      nodesep: 15,
      controlPoints: true,
    });
    const flowchartModel = this.getFlowchartModel();
    const nodes = [];
    const edges = [];
    flowchartModel.activities.forEach(activity => {
      const activityElement = document.querySelectorAll('[activity-id="' + activity.id + '"]')[0].getBoundingClientRect();
      nodes.push({
        id: activity.id,
        size: { width: activityElement.width, height: activityElement.height },
        x: activity.metadata.designer.position.x,
        y: activity.metadata.designer.position.y,
      });
    });
    flowchartModel.connections.forEach((connection, index) => {
      edges.push({ id: index, source: connection.source, target: connection.target });
    });
    let data = { nodes: nodes, edges: edges };
    let newLayout = dagreLayout.layout(data);
    newLayout.nodes.forEach(node => {
      let outNode = node;
      let activity = flowchartModel.activities.find(x => x.id == node.id);
      activity.metadata.designer.position.x = outNode.x;
      activity.metadata.designer.position.y = outNode.y;
      this.updateActivity({ id: activity.id, originalId: activity.id, activity: activity });
    });
    this.updateGraphInternal(flowchartModel.activities, flowchartModel.connections);
    this.graphUpdated.emit({});
  }
  async addActivity(args) {
    var _a;
    const graph = this.graph;
    const { descriptor, x, y } = args;
    let id = (_a = args.id) !== null && _a !== void 0 ? _a : (await this.generateUniqueActivityName(descriptor));
    const point = graph.pageToLocal(x, y);
    const sx = point.x;
    const sy = point.y;
    const activity = {
      id: id,
      type: descriptor.typeName,
      version: descriptor.version,
      customProperties: {},
      metadata: {
        designer: {
          position: {
            x: sx,
            y: sy,
          },
        },
      },
    };
    const nodeMetadata = this.nodeFactory.createNode(descriptor, activity, sx, sy);
    graph.addNode(nodeMetadata, { merge: true });
    const node = graph.getNodes().find(n => n.data.id == nodeMetadata.activity.id);
    adjustPortMarkupByNode(node);
    await this.updateModel();
    return activity;
  }
  async updateActivity(args) {
    var _a;
    const activityId = args.id;
    const originalId = (_a = args.originalId) !== null && _a !== void 0 ? _a : activityId;
    const activity = args.activity;
    const node = this.graph.getNodes().find(x => x.data.id == originalId);
    const nodeShape = node;
    if (!!node) {
      // Update the node's data with the activity.
      nodeShape.setData(activity, { overwrite: true });
      // Updating the node's activity property to trigger a rerender.
      nodeShape.activity = activity;
      // If the ID of the activity changed, we need to update connection references (X6 stores deep copies of data).
      if (activityId !== originalId) {
        this.syncEdgeData(originalId, activity);
        await this.updateModel();
      }
      // Update ports.
      if (args.updatePorts) {
        this.updatePorts(node, activity);
      }
    }
    this.updateLookups();
  }
  async getActivity(id) {
    return this.activityLookup[id];
  }
  async renameActivity(args) {
    const originalId = args.originalId;
    const activity = args.activity;
    const node = this.graph.getNodes().find(x => x.data.id == originalId);
    if (!node)
      return;
    // Update the node's data with the activity.
    node.setData(activity, { overwrite: true });
    // Update the node's activity property to trigger a rerender.
    node.activity = activity;
    // If the ID of the activity changed, we need to update connection references (X6 stores deep copies of data).
    if (activity.id !== originalId) {
      this.syncEdgeData(originalId, activity);
      await this.updateModel();
    }
  }
  async export() {
    return this.exportInternal();
  }
  onActivityChanged(value) {
    this.updateLookups();
  }
  async onInteractiveModeChange(value) {
    const graph = this.graph;
    if (!value || this.isReadonly) {
      graph.disableSelectionMovable();
      graph.disableKeyboard();
    }
    else {
      graph.enableSelectionMovable();
      graph.enableKeyboard();
    }
  }
  async editChildActivity(e) {
    const portName = e.detail.port.name;
    const activityId = e.detail.parentActivityId;
    const item = { activityId, portName };
    // Push child prop path.
    this.path = [...this.path, item];
    // Get current child.
    const currentActivity = await this.getCurrentActivity();
    // Get flowchart of child.
    let childFlowchart = await this.getCurrentFlowchartActivity();
    // If there's no flowchart, create it.
    if (!childFlowchart) {
      childFlowchart = await this.createFlowchart();
      this.setPort(currentActivity, portName, childFlowchart);
    }
    await this.setupGraph(childFlowchart);
  }
  async componentWillLoad() {
    this.updateLookups();
  }
  async componentDidLoad() {
    await this.createAndInitializeGraph();
    await this.updateGraph();
  }
  render() {
    const path = this.path;
    const state = {
      nodeMap: this.activityLookup,
    };
    return (h(FlowchartTunnel.Provider, { state: state }, h("div", { class: "tw-relative " }, h("div", { class: "tw-absolute tw-left-0 tw-top-3 tw-z-10" }, h("elsa-workflow-navigator", { items: path, rootActivity: this.rootActivity, onNavigate: this.onNavigateHierarchy })), h("div", { class: "tw-absolute tw-left-0 tw-top-0 tw-right-0 tw-bottom-0 ", ref: el => (this.container = el) }), h("elsa-context-menu", { ref: el => (this.activityContextMenu = el), hideButton: true, anchorPoint: ContextMenuAnchorPoint.TopLeft, class: "tw-absolute" }))));
  }
  static get is() { return "elsa-flowchart"; }
  static get originalStyleUrls() {
    return {
      "$": ["flowchart.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["flowchart.css"]
    };
  }
  static get properties() {
    return {
      "rootActivity": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Activity",
          "resolved": "Activity",
          "references": {
            "Activity": {
              "location": "import",
              "path": "../../models"
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
      "interactiveMode": {
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
        "attribute": "interactive-mode",
        "reflect": false,
        "defaultValue": "true"
      },
      "silent": {
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
        "attribute": "silent",
        "reflect": false,
        "defaultValue": "false"
      },
      "isReadonly": {
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
        "attribute": "is-readonly",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "activityLookup": {},
      "activities": {},
      "path": {}
    };
  }
  static get events() {
    return [{
        "method": "activitySelected",
        "name": "activitySelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ActivitySelectedArgs",
          "resolved": "ActivitySelectedArgs",
          "references": {
            "ActivitySelectedArgs": {
              "location": "import",
              "path": "../../models"
            }
          }
        }
      }, {
        "method": "activityDeleted",
        "name": "activityDeleted",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ActivityDeletedArgs",
          "resolved": "ActivityDeletedArgs",
          "references": {
            "ActivityDeletedArgs": {
              "location": "import",
              "path": "../../models"
            }
          }
        }
      }, {
        "method": "containerSelected",
        "name": "containerSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ContainerSelectedArgs",
          "resolved": "ContainerSelectedArgs",
          "references": {
            "ContainerSelectedArgs": {
              "location": "import",
              "path": "../../models"
            }
          }
        }
      }, {
        "method": "childActivitySelected",
        "name": "childActivitySelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "ChildActivitySelectedArgs",
          "resolved": "ChildActivitySelectedArgs",
          "references": {
            "ChildActivitySelectedArgs": {
              "location": "import",
              "path": "../../models"
            }
          }
        }
      }, {
        "method": "graphUpdated",
        "name": "graphUpdated",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "GraphUpdatedArgs",
          "resolved": "GraphUpdatedArgs",
          "references": {
            "GraphUpdatedArgs": {
              "location": "import",
              "path": "../../models"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "newRoot": {
        "complexType": {
          "signature": "() => Promise<Activity>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Activity": {
              "location": "import",
              "path": "../../models"
            }
          },
          "return": "Promise<Activity>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "updateGraph": {
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
      "getGraph": {
        "complexType": {
          "signature": "() => Promise<Graph>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Graph": {
              "location": "import",
              "path": "@antv/x6"
            }
          },
          "return": "Promise<Graph>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "reset": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "FromJSONData": {
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
      "updateLayout": {
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
      "zoomToFit": {
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
      "scrollToStart": {
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
      "autoLayout": {
        "complexType": {
          "signature": "(direction: LayoutDirection) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "LayoutDirection": {
              "location": "import",
              "path": "./models"
            },
            "OutNode": {
              "location": "import",
              "path": "@antv/layout"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "addActivity": {
        "complexType": {
          "signature": "(args: AddActivityArgs) => Promise<Activity>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Activity": {
              "location": "import",
              "path": "../../models"
            },
            "AddActivityArgs": {
              "location": "import",
              "path": "./models"
            },
            "PointLike": {
              "location": "global"
            }
          },
          "return": "Promise<Activity>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "updateActivity": {
        "complexType": {
          "signature": "(args: UpdateActivityArgs) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "UpdateActivityArgs": {
              "location": "import",
              "path": "./models"
            },
            "ActivityNodeShape": {
              "location": "import",
              "path": "./shapes"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "getActivity": {
        "complexType": {
          "signature": "(id: string) => Promise<Activity>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Activity": {
              "location": "import",
              "path": "../../models"
            }
          },
          "return": "Promise<Activity>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "renameActivity": {
        "complexType": {
          "signature": "(args: RenameActivityArgs) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global"
            },
            "RenameActivityArgs": {
              "location": "import",
              "path": "./models"
            },
            "ActivityNodeShape": {
              "location": "import",
              "path": "./shapes"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "export": {
        "complexType": {
          "signature": "() => Promise<Activity>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Activity": {
              "location": "import",
              "path": "../../models"
            }
          },
          "return": "Promise<Activity>"
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
        "propName": "rootActivity",
        "methodName": "onActivityChanged"
      }, {
        "propName": "interactiveMode",
        "methodName": "onInteractiveModeChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "childActivitySelected",
        "method": "handleChildActivitySelected",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "editChildActivity",
        "method": "editChildActivity",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=flowchart.js.map
