import { r as registerInstance, c as createEvent, h as h$1, a as getElement, H as Host } from './index-08112852.js';
import './toolbar-component-store-9c84420b.js';
import { l as lodash } from './lodash-fa7ebcea.js';
import { G as Graph$2, H as HTML, P as Path } from './_nodeUtil-7cd1b37b.js';
import { C as Container, w as ActivityDriverRegistry, ak as generateUniqueActivityName, al as deriveNewPortId, am as autoOrientConnections, an as createEdge, a8 as Service, J as PortProviderRegistry, Q as PortType, ah as v4, ao as rebuildGraph, ap as getPortNameByPortId, B as EventBus, aq as adjustPortMarkupByNode, x as ActivityIconRegistry, ar as FlowchartIcon } from './utils-972bf8be.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import { w as walkActivities, f as flatten, c as createActivityLookup } from './activity-walker-8232cc44.js';
import { C as ContextMenuAnchorPoint } from './models-107c382d.js';
import { a as createCommonjsModule, b as getDefaultExportFromCjs, c as commonjsGlobal } from './_commonjsHelpers-7db8bc26.js';
import { F as FlowchartTunnel } from './state-b09f9898.js';
import { P as PanelPosition } from './models-38a0b372.js';
import './index-01748867.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

class ActivityNodeShape extends HTML {
  get text() {
    return this.store.get('text');
  }
  set text(value) {
    this.store.set('text', value);
  }
  get activity() {
    return this.store.get('activity');
  }
  set activity(value) {
    this.store.set('activity', value);
  }
  get activityDescriptor() {
    return this.store.get('activityDescriptor');
  }
  set activityDescriptor(value) {
    this.store.set('activityDescriptor', value);
  }
  init() {
    super.init();
    this.updateSize();
  }
  setup() {
    const self = this;
    super.setup();
    this.on('change:text', this.updateSize, this);
    this.on('change:activity', this.updateSize, this);
    this.html = {
      render() {
        return self.createHtml();
      },
      shouldComponentUpdate(node) {
        return node.hasChanged('text') || node.hasChanged('activity');
      },
    };
  }
  updateSize() {
    const activityDescriptor = this.activityDescriptor;
    if (!activityDescriptor)
      return;
    const wrapper = document.createElement('div');
    wrapper.className = 'tw-inline-block tw-flex tw-items-center tw-pl-10 tw-pr-2 tw-py-2 tw-absolute';
    wrapper.style.left = '-1000px';
    wrapper.style.top = '-1000px';
    wrapper.innerHTML = this.createHtml();
    // Append the temporary element to the DOM.
    // Important: this needs to be a child of the elsa-studio element, otherwise the tailwind CSS classes will not be applied due to the "important" rule in tailwind.config.js.
    const elsaStudioElement = document.getElementsByTagName('elsa-flowchart')[0];
    console.log(elsaStudioElement);
    elsaStudioElement.append(wrapper);
    // Wait for activity element to be completely rendered.
    // When using custom elements, they are rendered after they are mounted. Before then, they have a 0 width and height.
    const tryUpdateSize = () => {
      const activityElement = wrapper.getElementsByTagName('elsa-default-activity-template')[0];
      const activityElementRect = activityElement.getBoundingClientRect();
      // If the custom element has no width or height yet, it means it has not yet rendered.
      if (activityElementRect.width == 0 || activityElementRect.height == 0) {
        // Request an animation frame and call ourselves back immediately after.
        window.requestAnimationFrame(tryUpdateSize);
        return;
      }
      const rect = wrapper.firstElementChild.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      // Update size of the activity node.
      this.prop({ size: { width, height } });
      // Remove the temporary element (used only to calculate its size).
      wrapper.remove();
    };
    // Begin try to get our element size.
    tryUpdateSize();
  }
  createHtml() {
    const activityDescriptor = this.activityDescriptor;
    const activity = this.activity;
    const activityType = activityDescriptor.typeName;
    const driverRegistry = Container.get(ActivityDriverRegistry);
    const driver = driverRegistry.createDriver(activityType);
    const displayContext = {
      activity: activity,
      activityDescriptor: activityDescriptor,
      displayType: "designer"
    };
    return driver.display(displayContext);
  }
}
ActivityNodeShape.config({
  ports: {
    groups: {
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#3c82f6',
            strokeWidth: 2,
            fill: '#fff',
          },
          text: {
            fontSize: 12,
            fill: '#888',
          },
        },
        label: {
          position: {
            name: 'outside',
          },
        },
      },
    },
  },
});
Graph$2.registerNode('activity', ActivityNodeShape, true);

Graph$2.registerConnector('elsa-connector', (s, e) => {
  const offset = 0;
  const deltaY = Math.abs(e.y - s.y);
  const control = Math.floor((deltaY / 3) * 2);
  const v1 = { x: s.x, y: s.y + offset + control };
  const v2 = { x: e.x, y: e.y - offset - control };
  return Path.normalize(`M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
       L ${e.x} ${e.y}
      `);
}, true);
Graph$2.registerEdge('elsa-edge', {
  inherit: 'edge',
  attrs: {
    line: {
      stroke: '#C2C8D5',
      strokeWidth: 1,
      targetMarker: 'classic', size: 6,
    },
  },
}, true);

function createGraph(container, interacting, getAllActivities) {
  const graph = new Graph$2({
    container: container,
    interacting: interacting,
    embedding: {
      enabled: false,
    },
    grid: {
      type: 'mesh',
      size: 20,
      visible: true,
      args: {
        color: '#e0e0e0'
      }
    },
    height: 5000,
    width: 5000,
    // Keep disabled for now until we find that performance degrades significantly when adding too many nodes.
    // When we do enable async rendering, we need to take care of the selection rectangle after pasting nodes, which would be calculated too early (before rendering completed).
    async: false,
    autoResize: true,
    keyboard: {
      enabled: true,
      global: false,
    },
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    selecting: {
      enabled: true,
      showNodeSelectionBox: true,
      rubberband: true,
    },
    scroller: {
      enabled: true,
      pannable: true,
      pageVisible: false,
      pageBreak: false,
      padding: 0,
      modifiers: ['ctrl', 'meta'],
    },
    connecting: {
      allowBlank: false,
      allowMulti: true,
      allowLoop: true,
      allowNode: true,
      allowEdge: false,
      allowPort: true,
      highlight: true,
      router: {
        name: 'manhattan',
        args: {
          startDirections: ['top', 'right', 'left', 'bottom'],
          endDirections: ['top', 'right', 'left', 'bottom'],
        },
      },
      // router: {
      //   name: 'metro',
      //   args: {
      //     startDirections: ['bottom'],
      //     endDirections: ['top'],
      //   },
      // },
      //connector: 'elsa-connector',
      connector: {
        name: 'rounded',
        args: {
          radius: 20
        },
      },
      snap: {
        radius: 20,
      },
      validateMagnet({ view, magnet }) {
        const node = view.cell;
        const sourcePort = node.getPort(magnet.getAttribute('port'));
        return sourcePort.type !== 'in';
      },
      validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
        if (!sourceMagnet || !targetMagnet) {
          return false;
        }
        const sourceNode = sourceView.cell;
        const sourcePort = sourceNode.getPort(sourceMagnet.getAttribute('port'));
        const targetNode = targetView.cell;
        const targetPort = targetNode.getPort(targetMagnet.getAttribute('port'));
        if (sourcePort.type === 'in') {
          return false;
        }
        if (targetPort.type !== 'in') {
          return false;
        }
        targetMagnet.getAttribute('port');
        return !(targetPort && targetPort.connected);
      },
      createEdge() {
        return graph.createEdge({
          shape: 'elsa-edge',
          zIndex: -1,
        });
      }
    },
    onPortRendered(args) {
      const selectors = args.contentSelectors;
      const container = selectors && selectors.foContent;
      if (container) {
        const port = document.createElement('div');
        port.className = 'tw-rounded-full tw-border tw-border-2 tw-border-blue tw-h-8 tw-w-8';
        port.innerHTML = `<p>done</p>`;
        container.append(port);
      }
    },
    mousewheel: {
      enabled: true,
      modifiers: ['ctrl', 'meta'],
    },
    history: {
      enabled: true,
      beforeAddCommand: (e, args) => {
        if (args.key == 'tools')
          return false;
        const supportedEvents = ['cell:added', 'cell:removed', 'cell:change:*'];
        return supportedEvents.indexOf(e) >= 0;
      },
    },
    // Todo:
    // minimap: {
    //   enabled: true,
    //   container: this.container,
    // },
    //interacting: () => state.interactingMap,
  });
  //graph.on('node:change:parent', assignParent);
  graph.on('node:mousedown', ({ node }) => {
    node.toFront();
  });
  graph.on('edge:mouseenter', ({ edge }) => {
    edge.addTools([
      'source-arrowhead',
      'target-arrowhead',
      {
        name: 'button-remove',
        args: {
          distance: -30,
        },
      },
    ]);
  });
  graph.on('edge:mouseleave', ({ edge }) => {
    edge.removeTools();
  });
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
  graph.bindKey(['meta+v', 'ctrl+v'], async () => {
    var _a, _b;
    if (!graph.isClipboardEmpty()) {
      const allActivities = [...getAllActivities()];
      const cells = graph.getCellsInClipboard();
      const activityCells = cells.filter(x => x.shape == 'activity');
      const connectionCells = cells.filter(x => x.shape == 'elsa-edge');
      const idMap = {};
      const newCells = [];
      for (const cell of activityCells) {
        const clonedCell = cell.clone({ keepId: false });
        const activity = Object.assign({}, clonedCell.getData());
        const activityTypeName = activity.type;
        const activityDescriptor = state.activityDescriptors.find(x => x.typeName == activityTypeName);
        const currentId = activity.id;
        const idExists = !!allActivities.find(x => x.id == currentId);
        if (idExists) {
          const newId = await generateUniqueActivityName(allActivities, activityDescriptor);
          idMap[currentId] = newId;
          activity.id = newId;
        }
        clonedCell.replaceData(activity, {});
        clonedCell.activity = activity;
        clonedCell.isClone = true;
        clonedCell.id = activity.id;
        clonedCell.store.data.id = activity.id;
        const clonedNode = clonedCell;
        const position = clonedNode.getPosition();
        position.x += 64;
        position.y += 64;
        clonedNode.setPosition(position);
        allActivities.push(activity);
        newCells.push(clonedCell);
      }
      for (const cell of connectionCells) {
        const connection = Object.assign({}, cell.getData());
        connection.source = {
          activity: (_a = idMap[connection.source.activity]) !== null && _a !== void 0 ? _a : connection.source.activity,
          port: deriveNewPortId(connection.source.port)
        };
        connection.target = {
          activity: (_b = idMap[connection.target.activity]) !== null && _b !== void 0 ? _b : connection.target.activity,
          port: deriveNewPortId(connection.target.port)
        };
        const newEdgeProps = createEdge(connection);
        const edge = graph.createEdge(newEdgeProps);
        newCells.push(edge);
      }
      graph.addCell(newCells, {});
      // Wait for the new cells to be rendered.
      requestAnimationFrame(() => {
        graph.cleanSelection();
        graph.select(newCells);
      });
    }
    return false;
  });
  // undo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
      graph.history.undo();
    }
    return false;
  });
  // redo
  graph.bindKey(['meta+y', 'ctrl+y'], () => {
    if (graph.history.canRedo()) {
      graph.history.redo();
    }
    return false;
  });
  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes();
    if (nodes) {
      graph.select(nodes);
    }
  });
  // delete
  graph.bindKey('del', () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  });
  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.1);
    }
  });
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.1);
    }
  });
  graph.on("node:moving", ({ node }) => {
    autoOrientConnections(graph, node);
  });
  return graph;
}

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DefaultNodeHandler = class DefaultNodeHandler {
  constructor() {
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  createDesignerNode(context) {
    const { activityDescriptor, activity, x, y } = context;
    const portModels = this.createPorts(context);
    return {
      id: activity.id,
      shape: 'activity',
      activity: activity,
      activityDescriptor: activityDescriptor,
      x: x,
      y: y,
      data: activity,
      ports: portModels
    };
  }
  createPorts(context) {
    const { activityDescriptor, activity } = context;
    const provider = this.portProviderRegistry.get(activityDescriptor.typeName);
    const providerContext = { activityDescriptor, activity };
    const inPorts = [{ name: 'In', displayName: null, mode: PortType.Flow }];
    let outPorts = provider.getOutboundPorts(providerContext).filter(x => x.type == PortType.Flow);
    // In a flowchart, always add a Done port to connect the next node.
    if (outPorts.length == 0)
      outPorts = [{ name: 'Done', displayName: 'Done', type: PortType.Flow }];
    if (outPorts.length == 1)
      outPorts[0].displayName = null;
    const leftPortModels = inPorts.map((x) => ({
      id: v4() + '_' + x.name,
      group: 'left',
      attrs: !!x.displayName ? {
        text: {
          text: x.displayName
        },
      } : null,
      type: 'in',
      position: 'left'
    }));
    const rightPortModels = outPorts.map((x) => ({
      id: v4() + '_' + x.name,
      group: 'right',
      attrs: {
        text: {
          text: x.displayName
        },
      },
      type: 'out',
      position: 'right'
    }));
    const portModels = [...leftPortModels, ...rightPortModels];
    return portModels;
  }
};
DefaultNodeHandler = __decorate$2([
  Service(),
  __metadata$1("design:paramtypes", [])
], DefaultNodeHandler);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NodeHandlerRegistry = class NodeHandlerRegistry {
  constructor() {
    this.handlerMap = new Map();
    this.defaultHandlerFactory = () => Container.get(DefaultNodeHandler);
  }
  add(activityType, handlerFactory) {
    this.handlerMap.set(activityType, handlerFactory);
  }
  get(activityType) {
    return this.handlerMap.get(activityType);
  }
  createHandler(activityType) {
    var _a;
    const factory = (_a = this.get(activityType)) !== null && _a !== void 0 ? _a : this.defaultHandlerFactory;
    return factory();
  }
};
NodeHandlerRegistry = __decorate$1([
  Service()
], NodeHandlerRegistry);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NodeFactory = class NodeFactory {
  constructor() {
    this.handlerRegistry = Container.get(NodeHandlerRegistry);
  }
  createNode(activityDescriptor, activity, x, y) {
    const handler = this.handlerRegistry.createHandler(activityDescriptor.typeName);
    return handler.createDesignerNode({ activityDescriptor, activity, x, y });
  }
  createPorts(activityDescriptor, activity) {
    const handler = this.handlerRegistry.createHandler(activityDescriptor.typeName);
    return handler.createPorts({ activityDescriptor, activity });
  }
};
NodeFactory = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], NodeFactory);

const FlowchartEvents = {
  ConnectionCreated: 'connection-created'
};

class Base {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.combos = [];
        this.comboEdges = [];
        this.hiddenNodes = [];
        this.hiddenEdges = [];
        this.hiddenCombos = [];
        // temp edges e.g. the edge generated for releated collapsed combo
        this.vedges = [];
        this.positions = [];
        this.destroyed = false;
        this.onLayoutEnd = () => { };
    }
    layout(data) {
        this.init(data);
        return this.execute(true);
    }
    init(data) {
        this.nodes = data.nodes || [];
        this.edges = data.edges || [];
        this.combos = data.combos || [];
        this.comboEdges = data.comboEdges || [];
        this.hiddenNodes = data.hiddenNodes || [];
        this.hiddenEdges = data.hiddenEdges || [];
        this.hiddenCombos = data.hiddenCombos || [];
        this.vedges = data.vedges || [];
    }
    execute(reloadData) { }
    executeWithWorker() { }
    getDefaultCfg() {
        return {};
    }
    updateCfg(cfg) {
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    getType() {
        return 'base';
    }
    destroy() {
        this.nodes = null;
        this.edges = null;
        this.combos = null;
        this.positions = null;
        this.destroyed = true;
    }
}

const isString = (val) => typeof val === 'string';
// export const capitalize = cacheStringFunction(
//   (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
// )

const isArray = Array.isArray;

const isNumber = (val) => typeof val === 'number';

const isObject = (val) => val !== null && typeof val === 'object';
const clone = (target) => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime());
    }
    if (target instanceof Array) {
        const cp = [];
        target.forEach((v) => {
            cp.push(v);
        });
        return cp.map((n) => clone(n));
    }
    if (typeof target === 'object' && Object.keys(target).length) {
        const cp = Object.assign({}, target);
        Object.keys(cp).forEach((k) => {
            cp[k] = clone(cp[k]);
        });
        return cp;
    }
    return target;
};

const getEdgeTerminal = (edge, type) => {
    const terminal = edge[type];
    if (isObject(terminal)) {
        return terminal.cell;
    }
    return terminal;
};

const getFunc = (value, defaultValue, func) => {
    let resultFunc;
    if (func) {
        resultFunc = func;
    }
    else if (isNumber(value)) {
        resultFunc = () => value;
    }
    else {
        resultFunc = () => defaultValue;
    }
    return resultFunc;
};

const filterOutLinks = (k, v) => {
    if (k !== "next" && k !== "prev") {
        return v;
    }
};
const unlink = (entry) => {
    entry.prev.next = entry.next;
    entry.next.prev = entry.prev;
    delete entry.next;
    delete entry.prev;
};
class List$1 {
    constructor() {
        const shortcut = {};
        shortcut.prev = shortcut;
        shortcut.next = shortcut.prev;
        this.shortcut = shortcut;
    }
    dequeue() {
        const shortcut = this.shortcut;
        const entry = shortcut.prev;
        if (entry && entry !== shortcut) {
            unlink(entry);
            return entry;
        }
    }
    enqueue(entry) {
        const shortcut = this.shortcut;
        if (entry.prev && entry.next) {
            unlink(entry);
        }
        entry.next = shortcut.next;
        shortcut.next.prev = entry;
        shortcut.next = entry;
        entry.prev = shortcut;
    }
    toString() {
        const strs = [];
        const sentinel = this.shortcut;
        let curr = sentinel.prev;
        while (curr !== sentinel) {
            strs.push(JSON.stringify(curr, filterOutLinks));
            curr = curr === null || curr === void 0 ? void 0 : curr.prev;
        }
        return `[${strs.join(", ")}]`;
    }
}

var GraphEnum;

(function (GraphEnum) {
  GraphEnum["DEFAULT_EDGE_NAME"] = "\0";
  GraphEnum["GRAPH_NODE"] = "\0";
  GraphEnum["EDGE_KEY_DELIM"] = "\x01";
})(GraphEnum || (GraphEnum = {}));

/**
 * @description add one to key's value in map
 * @description.zh-CN 在 map 中 key 的值加 1
 * @param map
 * @param key
 */

function incrementOrInitEntry(map, key) {
  var val = map.get(key) || 0;
  map.set(key, val + 1);
}
/**
 * @description minus one from key's value in map, is value is 0, delete the key
 * @description.zh-CN 在 map 中 key 的值减 1，如果值为 0，则删除 key
 */

function decrementOrRemoveEntry(map, key) {
  var val = map.get(key);

  if (val !== undefined) {
    val = val - 1;

    if (val > 0) {
      map.set(key, val);
    } else {
      map.delete(key);
    }
  }
}
/**
 * @description convert edge to string id
 * @description.zh-CN 转换边为字符串 id
 */

function edgeArgsToId(isDirected, v_, w_, name) {
  var v = String(v_);
  var w = String(w_);

  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }

  return v + GraphEnum.EDGE_KEY_DELIM + w + GraphEnum.EDGE_KEY_DELIM + (name === undefined ? GraphEnum.DEFAULT_EDGE_NAME : name);
}
/**
 * @description convert edge arguments to edge object
 * @description.zh-CN 转换边参数为边对象
 */

function edgeArgsToObj(isDirected, v, w, name) {
  var strV = String(v);
  var strW = String(w);
  var edgeObj = {
    v: v,
    w: w
  };

  if (!isDirected && strV > strW) {
    var tmp = edgeObj.v;
    edgeObj.v = edgeObj.w;
    edgeObj.w = tmp;
  }

  if (name !== undefined) {
    edgeObj.name = name;
  }

  return edgeObj;
}
/**
 * @description convert edge object to string id
 * @description.zh-CN 转换边对象为字符串 id
 */

function edgeObjToId(isDirected, edgeObj) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
function isFunction(obj) {
  return typeof obj === 'function';
}

/**
 * @description Convert a graph's node to JSON.
 * @description.zh-CN 转换图的节点为 JSON。
 * @param graph
 * @returns
 */

var nodeToJSON = function nodeToJSON(graph) {
  return graph.nodes().map(function (n) {
    var value = graph.node(n);
    var parent = graph.parent(n);
    var node = {
      id: n,
      value: value,
      parent: parent
    };

    if (node.value === undefined) {
      delete node.value;
    }

    if (node.parent === undefined) {
      delete node.parent;
    }

    return node;
  });
};
/**
 * @description Convert all graph's edges to JSON.
 * @description.zh-CN 转换图的所有边为 JSON。
 * @param graph
 * @returns
 */


var edgeToJSON = function edgeToJSON(graph) {
  return graph.edges().map(function (edge) {
    var value = graph.edge(edge);
    var e = {
      v: edge.v,
      w: edge.w,
      value: value,
      name: edge.name
    };

    if (e.name === undefined) {
      delete e.name;
    }

    if (e.value === undefined) {
      delete e.value;
    }

    return e;
  });
};
/**
 * @description Convert a graph to JSON.
 * @description.zh-CN 转换图为 JSON。
 * @param graph
 * @returns
 */


var write = function write(graph) {
  var json = {
    options: {
      directed: graph.isDirected(),
      multigraph: graph.isMultigraph(),
      compound: graph.isCompound()
    },
    nodes: nodeToJSON(graph),
    edges: edgeToJSON(graph),
    value: graph.graph()
  };

  if (json.value === undefined) {
    delete json.value;
  }

  return json;
};
/**
 * @description read a graph from JSON.
 * @description.zh-CN 从 JSON 读取图。
 * @param json
 * @returns
 */

var read = function read(json) {
  var graph = new Graph$1(json.options);

  if (json.value !== undefined) {
    graph.setGraph(json.value);
  }

  json.nodes.forEach(function (entry) {
    graph.setNode(entry.id, entry.value);

    if (entry.parent) {
      graph.setParent(entry.id, entry.parent);
    }
  });
  json.edges.forEach(function (entry) {
    graph.setEdge(entry.v, entry.w, entry.value, entry.name);
  });
  return graph;
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var defaultOption = {
  compound: false,
  multigraph: false,
  directed: true
};

var Graph$1 = /*#__PURE__*/function () {
  // Graph option or basic props

  /**
   * @description Label for this graph itself
   * @description.zh-CN 图本身的标签（label）
   * @default undefined
   */

  /**
   * @description Number of nodes in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */

  /**
   * @description Number of edges in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */

  /**
   * @description return node label with its id
   * @description.zh-CN 返回节点的默认的标签
   */

  /**
   * @description return edge label with its id
   * @description.zh-CN 返回边的默认的标签
   */
  function Graph() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck$2(this, Graph);

    this.directed = true;
    this.multigraph = false;
    this.compound = false;
    this.GRAPH_NODE = GraphEnum.GRAPH_NODE;
    this.label = void 0;
    this.nodeCountNum = 0;
    this.edgeCountNum = 0;

    this.defaultNodeLabelFn = function () {
      return undefined;
    };

    this.defaultEdgeLabelFn = function () {
      return undefined;
    };

    this.parentMap = void 0;
    this.childrenMap = void 0;
    this.nodesLabelMap = new Map();
    this.inEdgesMap = new Map();
    this.outEdgesMap = new Map();
    this.predecessorsMap = new Map();
    this.successorsMap = new Map();
    this.edgesMap = new Map();
    this.edgesLabelsMap = new Map();

    this.isDirected = function () {
      return _this.directed;
    };

    this.isMultigraph = function () {
      return _this.multigraph;
    };

    this.isCompound = function () {
      return _this.compound;
    };

    this.setGraph = function (label) {
      _this.label = label;
      return _this;
    };

    this.graph = function () {
      return _this.label;
    };

    this.setDefaultNodeLabel = function (newDefault) {
      if (isFunction(newDefault)) {
        _this.defaultNodeLabelFn = newDefault;
      } else {
        _this.defaultNodeLabelFn = function () {
          return newDefault;
        };
      }

      return _this;
    };

    this.nodeCount = function () {
      return _this.nodeCountNum;
    };

    this.node = function (n) {
      return _this.nodesLabelMap.get(n);
    };

    this.nodes = function () {
      return Array.from(_this.nodesLabelMap.keys());
    };

    this.sources = function () {
      return _this.nodes().filter(function (n) {
        var _this$inEdgesMap$get;

        return !((_this$inEdgesMap$get = _this.inEdgesMap.get(n)) === null || _this$inEdgesMap$get === void 0 ? void 0 : _this$inEdgesMap$get.size);
      });
    };

    this.sinks = function () {
      return _this.nodes().filter(function (n) {
        var _this$outEdgesMap$get;

        return !((_this$outEdgesMap$get = _this.outEdgesMap.get(n)) === null || _this$outEdgesMap$get === void 0 ? void 0 : _this$outEdgesMap$get.size);
      });
    };

    this.setNodes = function (nodes, value) {
      nodes.map(function (node) {
        return _this.setNode(node, value);
      });
      return _this;
    };

    this.hasNode = function (node) {
      return _this.nodesLabelMap.has(node);
    };

    this.checkCompound = function () {
      if (!_this.isCompound()) {
        throw new Error('Cannot construct parent-children relations in a non-compound graph');
      }
    };

    this.parent = function (node) {
      if (_this.isCompound()) {
        var _this$parentMap;

        var parent = (_this$parentMap = _this.parentMap) === null || _this$parentMap === void 0 ? void 0 : _this$parentMap.get(node);

        if (parent !== _this.GRAPH_NODE) {
          return parent;
        }
      }
    };

    this.removeFromParentsChildList = function (node) {
      var targetParent = _this.parentMap.get(node);

      _this.childrenMap.get(targetParent).delete(node);
    };

    this.setParent = function (node, parent) {
      var _this$parentMap2, _this$childrenMap;

      _this.checkCompound();

      var realParent = parent === undefined ? _this.GRAPH_NODE : parent;

      var checkNode = _this.parent(realParent);

      while (checkNode) {
        if (node === checkNode) {
          throw new Error('Setting ' + parent + ' as parent of ' + node + ' would create a cycle');
        }

        checkNode = _this.parent(checkNode);
      }

      if (parent) {
        _this.setNode(parent);
      }

      _this.setNode(node);

      _this.removeFromParentsChildList(node);

      (_this$parentMap2 = _this.parentMap) === null || _this$parentMap2 === void 0 ? void 0 : _this$parentMap2.set(node, realParent);

      var realParentChilren = _this.childrenMap.get(realParent);

      realParentChilren.set(node, true);
      (_this$childrenMap = _this.childrenMap) === null || _this$childrenMap === void 0 ? void 0 : _this$childrenMap.set(realParent, realParentChilren);
      return _this;
    };

    this.children = function (node) {
      var targetNode = node === undefined ? _this.GRAPH_NODE : node;

      if (_this.isCompound()) {
        var _this$childrenMap2;

        var target = (_this$childrenMap2 = _this.childrenMap) === null || _this$childrenMap2 === void 0 ? void 0 : _this$childrenMap2.get(targetNode);

        if (target) {
          return Array.from(target.keys());
        }

        return undefined;
      }

      if (targetNode === _this.GRAPH_NODE) {
        return _this.nodes();
      }

      if (node && _this.hasNode(node)) {
        return [];
      }
    };

    this.predecessors = function (node) {
      var preds = _this.predecessorsMap.get(node);

      return preds ? Array.from(preds.keys()) : undefined;
    };

    this.successors = function (node) {
      var succs = _this.successorsMap.get(node);

      return succs ? Array.from(succs.keys()) : undefined;
    };

    this.neighbors = function (node) {
      var _this$predecessors;

      if (!_this.hasNode(node)) {
        return undefined;
      }

      return Array.from(new Set((_this$predecessors = _this.predecessors(node)) === null || _this$predecessors === void 0 ? void 0 : _this$predecessors.concat(_this.successors(node))));
    };

    this.isLeaf = function (node) {
      var _this$neighbors;

      if (_this.isDirected()) {
        var _this$successors;

        return !((_this$successors = _this.successors(node)) === null || _this$successors === void 0 ? void 0 : _this$successors.length);
      }

      return !((_this$neighbors = _this.neighbors(node)) === null || _this$neighbors === void 0 ? void 0 : _this$neighbors.length);
    };

    this.filterNodes = function (filter) {
      var directed = _this.directed,
          multigraph = _this.multigraph,
          compound = _this.compound;
      var copyGraph = new Graph({
        directed: directed,
        multigraph: multigraph,
        compound: compound
      });
      copyGraph.setGraph(_this.graph());

      _this.nodes().forEach(function (n) {
        if (filter(n)) {
          copyGraph.setNode(n, _this.node(n));
        }
      });

      _this.edges().forEach(function (edgeObj) {
        if (copyGraph.hasNode(edgeObj.v) && copyGraph.hasNode(edgeObj.w)) {
          copyGraph.setEdgeObj(edgeObj, _this.edge(edgeObj));
        }
      });

      if (compound) {
        var findParent = function findParent(node) {
          var parent = _this.parent(node);

          while (parent !== undefined && !copyGraph.hasNode(parent)) {
            parent = _this.parent(parent);
          }

          return parent;
        };

        copyGraph.nodes().forEach(function (node) {
          copyGraph.setParent(node, findParent(node));
        });
      }

      return copyGraph;
    };

    this.setDefaultEdgeLabel = function (newDefault) {
      if (isFunction(newDefault)) {
        _this.defaultEdgeLabelFn = newDefault;
      } else {
        _this.defaultEdgeLabelFn = function () {
          return newDefault;
        };
      }

      return _this;
    };

    this.edgeCount = function () {
      return _this.edgeCountNum;
    };

    this.setEdgeObj = function (edgeObj, value) {
      return _this.setEdge(edgeObj.v, edgeObj.w, value, edgeObj.name);
    };

    this.setPath = function (edges, value) {
      edges.reduce(function (v, w) {
        _this.setEdge(v, w, value);

        return w;
      });
      return _this;
    };

    this.edgeFromArgs = function (v, w, name) {
      return _this.edge({
        v: v,
        w: w,
        name: name
      });
    };

    this.edge = function (edgeObj) {
      return _this.edgesLabelsMap.get(edgeObjToId(_this.isDirected(), edgeObj));
    };

    this.hasEdge = function (v, w, name) {
      return _this.edgesLabelsMap.has(edgeObjToId(_this.isDirected(), {
        v: v,
        w: w,
        name: name
      }));
    };

    this.removeEdgeObj = function (_ref) {
      var v = _ref.v,
          w = _ref.w,
          name = _ref.name;
      return _this.removeEdge(v, w, name);
    };

    this.edges = function () {
      return Array.from(_this.edgesMap.values());
    };

    this.inEdges = function (v, u) {
      var inV = _this.inEdgesMap.get(v);

      if (inV) {
        return Array.from(inV.values()).filter(function (e) {
          return !u || e.v === u;
        });
      }

      return undefined;
    };

    this.outEdges = function (w, u) {
      var outW = _this.outEdgesMap.get(w);

      if (outW) {
        return Array.from(outW.values()).filter(function (e) {
          return !u || e.w === u;
        });
      }

      return undefined;
    };

    this.nodeEdges = function (v, w) {
      var _this$inEdges;

      if (!_this.hasNode(v)) {
        return undefined;
      }

      return (_this$inEdges = _this.inEdges(v, w)) === null || _this$inEdges === void 0 ? void 0 : _this$inEdges.concat(_this.outEdges(v, w));
    };

    this.toJSON = function () {
      return write(_this);
    };

    this.nodeInDegree = function (node) {
      var inEdges = _this.inEdgesMap.get(node);

      if (inEdges) {
        return inEdges.size;
      }

      return 0;
    };

    this.nodeOutDegree = function (node) {
      var outEdges = _this.outEdgesMap.get(node);

      if (outEdges) {
        return outEdges.size;
      }

      return 0;
    };

    this.nodeDegree = function (node) {
      return _this.nodeInDegree(node) + _this.nodeOutDegree(node);
    };

    this.source = function (edge) {
      return edge.v;
    };

    this.target = function (edge) {
      return edge.w;
    };

    var resultOptions = _objectSpread(_objectSpread({}, defaultOption), options);

    this.compound = resultOptions.compound;
    this.directed = resultOptions.directed;
    this.multigraph = resultOptions.multigraph;

    if (this.compound) {
      this.parentMap = new Map();
      this.childrenMap = new Map();
    }
  } // Map for graph

  /**
   * @description Map for parent relationship
   * @description.zh-CN 父子关系的映射
   */


  _createClass$2(Graph, [{
    key: "setNode",
    value:
    /**
     * @description Set Node label in graph if node not in graph then create it
     * @description.zh-CN 设置节点的label，如果这个节点不在图中，则在图中创建这个节点
     * @param node
     * @param value
     * @returns
     */
    function setNode(node, value) {
      var nodesLabelMap = this.nodesLabelMap,
          defaultNodeLabelFn = this.defaultNodeLabelFn,
          isCompound = this.isCompound,
          parentMap = this.parentMap,
          childrenMap = this.childrenMap,
          inEdgesMap = this.inEdgesMap,
          outEdgesMap = this.outEdgesMap,
          predecessorsMap = this.predecessorsMap,
          successorsMap = this.successorsMap; // 如果节点不在图中，则创建节点

      if (nodesLabelMap.has(node)) {
        if (value !== undefined) {
          nodesLabelMap.set(node, value);
        }

        return this;
      }

      nodesLabelMap.set(node, value || defaultNodeLabelFn(node)); // 如果是复合图，则创建节点的子节点

      if (isCompound()) {
        var _childrenMap$get;

        parentMap === null || parentMap === void 0 ? void 0 : parentMap.set(node, this.GRAPH_NODE);
        childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(node, new Map());

        if (!(childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.has(this.GRAPH_NODE))) {
          childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(this.GRAPH_NODE, new Map());
        }

        childrenMap === null || childrenMap === void 0 ? void 0 : (_childrenMap$get = childrenMap.get(this.GRAPH_NODE)) === null || _childrenMap$get === void 0 ? void 0 : _childrenMap$get.set(node, true);
      }

      [inEdgesMap, outEdgesMap, predecessorsMap, successorsMap].forEach(function (map) {
        return map.set(node, new Map());
      });
      this.nodeCountNum += 1;
      return this;
    }
    /**
     * @description Set nodes or add nodes in batch
     * @description.zh-CN 批量设置或者创建节点
     * @param nodes
     * @param value
     * @returns
     */

  }, {
    key: "removeNode",
    value:
    /**
     * @description Remove node from graph
     * @description.zh-CN 将节点从图中移除
     * @param node
     * @returns
     */
    function removeNode(node) {
      var _this2 = this;

      if (this.hasNode(node)) {
        var cleanEdge = function cleanEdge(edgeObj) {
          _this2.removeEdge(edgeObj.v, edgeObj.w, edgeObj.name);
        };

        var inEdgesMap = this.inEdgesMap,
            outEdgesMap = this.outEdgesMap,
            predecessorsMap = this.predecessorsMap,
            successorsMap = this.successorsMap,
            nodesLabelMap = this.nodesLabelMap;

        if (this.isCompound()) {
          var _this$parentMap3, _this$children, _this$childrenMap3;

          this.removeFromParentsChildList(node);
          (_this$parentMap3 = this.parentMap) === null || _this$parentMap3 === void 0 ? void 0 : _this$parentMap3.delete(node);
          (_this$children = this.children(node)) === null || _this$children === void 0 ? void 0 : _this$children.forEach(function (n) {
            return _this2.setParent(n);
          });
          (_this$childrenMap3 = this.childrenMap) === null || _this$childrenMap3 === void 0 ? void 0 : _this$childrenMap3.delete(node);
        }

        var inE = inEdgesMap.get(node);
        var outE = outEdgesMap.get(node);
        Array.from(inE.values()).forEach(function (edge) {
          return cleanEdge(edge);
        });
        Array.from(outE.values()).forEach(function (edge) {
          return cleanEdge(edge);
        });
        nodesLabelMap.delete(node);
        inEdgesMap.delete(node);
        outEdgesMap.delete(node);
        predecessorsMap.delete(node);
        successorsMap.delete(node);
        this.nodeCountNum -= 1;
      }

      return this;
    }
    /**
     * @description Set function that generate default label for edge, if param is non-function value then default label will always be this value;
     * @description.zh-CN 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
     * @param newDefault
     * @returns
     */

  }, {
    key: "setEdge",
    value:
    /**
     * @description set edge value, if nodes or edges not exsit then add to graph
     * @description.zh-CN 设置边的属性，如果边或节点不存在，那么将他们加入这个图
     * @param v
     * @param w
     * @param value
     * @param name
     * @returns
     */
    function setEdge(v_, w_, value, name) {
      var _this$inEdgesMap$get2, _this$outEdgesMap$get2;

      var edgeObj = edgeArgsToObj(this.isDirected(), v_, w_, name);
      var edgeId = edgeObjToId(this.isDirected(), edgeObj);
      var v = edgeObj.v,
          w = edgeObj.w;

      if (this.edgesLabelsMap.has(edgeId)) {
        this.edgesLabelsMap.set(edgeId, value);
        return this;
      }

      if (name !== undefined && !this.isMultigraph()) {
        throw new Error('Cannot set a named edge when isMultigraph = false');
      }

      this.setNode(v);
      this.setNode(w);
      this.edgesLabelsMap.set(edgeId, value || this.defaultEdgeLabelFn(v, w, name));
      Object.freeze(edgeObj);
      this.edgesMap.set(edgeId, edgeObj);
      var preds = this.predecessorsMap.get(w);
      var succs = this.successorsMap.get(v);
      incrementOrInitEntry(preds, v);
      incrementOrInitEntry(succs, w);
      (_this$inEdgesMap$get2 = this.inEdgesMap.get(w)) === null || _this$inEdgesMap$get2 === void 0 ? void 0 : _this$inEdgesMap$get2.set(edgeId, edgeObj);
      (_this$outEdgesMap$get2 = this.outEdgesMap.get(v)) === null || _this$outEdgesMap$get2 === void 0 ? void 0 : _this$outEdgesMap$get2.set(edgeId, edgeObj);
      this.edgeCountNum += 1;
      return this;
    }
  }, {
    key: "removeEdge",
    value:
    /**
     * @description remove a specific edge
     * @description.zh-CN 删除一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    function removeEdge(v_, w_, name) {
      var edgeId = edgeArgsToId(this.isDirected(), v_, w_, name);
      var edgeObj = this.edgesMap.get(edgeId);

      if (edgeObj) {
        var _edgeArgsToObj = edgeArgsToObj(this.isDirected(), v_, w_, name),
            v = _edgeArgsToObj.v,
            w = _edgeArgsToObj.w;

        this.edgesLabelsMap.delete(edgeId);
        this.edgesMap.delete(edgeId);
        var preds = this.predecessorsMap.get(w);
        var succs = this.successorsMap.get(v);
        decrementOrRemoveEntry(preds, v);
        decrementOrRemoveEntry(succs, w);
        this.inEdgesMap.get(w).delete(edgeId);
        this.outEdgesMap.get(v).delete(edgeId);
        this.edgeCountNum -= 1;
      }

      return this;
    }
    /**
     * @description remove a specific edge by edge object
     * @description.zh-CN 删除一条边
     */

  }]);

  return Graph;
}();

Graph$1.fromJSON = read;

function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A PriorityQueue is a queue that can be sorted by priority.
var PriorityQueue = /*#__PURE__*/_createClass$1(function PriorityQueue() {
  var _this = this;

  _classCallCheck$1(this, PriorityQueue);

  this.arr = [];
  this.keyIndice = new Map();

  this.size = function () {
    return _this.arr.length;
  };

  this.keys = function () {
    return _this.arr.map(function (e) {
      return e.key;
    });
  };

  this.has = function (key) {
    return _this.keyIndice.has(key);
  };

  this.priority = function (key) {
    var index = _this.keyIndice.get(key);

    if (index !== undefined) {
      return _this.arr[index].priority;
    }
  };

  this.swap = function (i, j) {
    var arr = _this.arr,
        keyIndice = _this.keyIndice;
    var _ref = [arr[i], arr[j]],
        originI = _ref[0],
        originJ = _ref[1];
    arr[i] = originJ;
    arr[j] = originI;
    keyIndice.set(originI.key, j);
    keyIndice.set(originJ.key, i);
  };

  this.innerDecrease = function (index) {
    var arr = _this.arr;
    var priority = arr[index].priority;
    var parent;
    var i = index;

    while (i !== 0) {
      var _arr$parent;

      parent = i >> 1;

      if (((_arr$parent = arr[parent]) === null || _arr$parent === void 0 ? void 0 : _arr$parent.priority) < priority) {
        break;
      }

      _this.swap(i, parent);

      i = parent;
    }
  };

  this.heapify = function (i) {
    var arr = _this.arr;
    var l = i << 1;
    var r = l + 1;
    var largest = i;

    if (l < arr.length) {
      largest = arr[l].priority < arr[largest].priority ? l : largest;

      if (r < arr.length) {
        largest = arr[r].priority < arr[largest].priority ? r : largest;
      }

      if (largest !== i) {
        _this.swap(i, largest);

        _this.heapify(largest);
      }
    }
  };

  this.min = function () {
    if (_this.size() === 0) {
      throw new Error('Queue underflow');
    }

    return _this.arr[0].key;
  };

  this.add = function (key, priority) {
    var keyIndice = _this.keyIndice,
        arr = _this.arr; // if the key is already in the queue, update the priority

    if (!keyIndice.has(key)) {
      var index = arr.length;
      keyIndice.set(key, index);
      arr.push({
        key: key,
        priority: priority
      });

      _this.innerDecrease(index);

      return true;
    }

    return false;
  };

  this.removeMin = function () {
    _this.swap(0, _this.arr.length - 1);

    var min = _this.arr.pop();

    _this.keyIndice.delete(min.key);

    _this.heapify(0);

    return min.key;
  };

  this.decrease = function (key, priority) {
    if (!_this.has(key)) {
      throw new Error("There's no key named ".concat(key));
    } // there must be an index


    var index = _this.keyIndice.get(key);

    if (priority > _this.arr[index].priority) {
      throw new Error("New priority is greater than current priority.Key: ".concat(key, " Old: + ").concat(_this.arr[index].priority, " New: ").concat(priority));
    }

    _this.arr[index].priority = priority;

    _this.innerDecrease(index);
  };
});

var prim = function prim(graph, weightFn) {
  var result = new Graph$1();
  var parents = new Map();
  var pq = new PriorityQueue();
  var v;

  function updateNeighbors(edge) {
    var w = edge.v === v ? edge.w : edge.v;
    var pri = pq.priority(w);

    if (pri !== undefined) {
      var edgeWeight = weightFn(edge);

      if (edgeWeight < pri) {
        parents.set(w, v);
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (graph.nodeCount() === 0) {
    return result;
  }

  graph.nodes().forEach(function (node) {
    pq.add(node, Number.POSITIVE_INFINITY);
    result.setNode(node);
  }); // Start from an arbitrary node

  pq.decrease(graph.nodes()[0], 0);
  var init = false;

  while (pq.size() > 0) {
    var _graph$nodeEdges;

    v = pq.removeMin();

    if (parents.has(v)) {
      result.setEdge(v, parents.get(v));
    } else if (init) {
      throw new Error('Input graph is not connected: ' + graph.graph());
    } else {
      init = true;
    }

    (_graph$nodeEdges = graph.nodeEdges(v)) === null || _graph$nodeEdges === void 0 ? void 0 : _graph$nodeEdges.forEach(updateNeighbors);
  }

  return result;
};

var components = function components(graph) {
  var visited = new Set();
  var resultComponents = [];
  var nodes = graph.nodes();
  nodes.forEach(function (n) {
    var componentsArr = [];
    var waitingList = [n];

    while (waitingList.length > 0) {
      var node = waitingList.pop();

      if (!visited.has(node)) {
        var _graph$successors, _graph$predecessors;

        visited.add(node);
        componentsArr.push(node);
        (_graph$successors = graph.successors(node)) === null || _graph$successors === void 0 ? void 0 : _graph$successors.forEach(function (n) {
          return waitingList.push(n);
        });
        (_graph$predecessors = graph.predecessors(node)) === null || _graph$predecessors === void 0 ? void 0 : _graph$predecessors.forEach(function (n) {
          return waitingList.push(n);
        });
      }
    }

    if (componentsArr.length) {
      resultComponents.push(componentsArr);
    }
  });
  return resultComponents;
};

/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
var doDFS = function doDFS(graph, node, postorder, visited, navigator, result) {
  if (!visited.includes(node)) {
    visited.push(node);

    if (!postorder) {
      result.push(node);
    }

    navigator(node).forEach(function (n) {
      return doDFS(graph, n, postorder, visited, navigator, result);
    });

    if (postorder) {
      result.push(node);
    }
  }
};
/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */


var dfs$1 = function dfs(graph, node, order) {
  var nodes = Array.isArray(node) ? node : [node];

  var navigator = function navigator(n) {
    return graph.isDirected() ? graph.successors(n) : graph.neighbors(n);
  };

  var results = [];
  var visited = [];
  nodes.forEach(function (node) {
    if (!graph.hasNode(node)) {
      throw new Error('Graph does not have node: ' + node);
    } else {
      doDFS(graph, node, order === 'post', visited, navigator, results);
    }
  });
  return results;
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_WEIGHT_FUNC$1 = function DEFAULT_WEIGHT_FUNC() {
  return 1;
};
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */


var dijkstra = function dijkstra(graph, source, weightFn, edgeFn) {
  return runDijkstra(graph, source, weightFn || DEFAULT_WEIGHT_FUNC$1, edgeFn || function (v) {
    return graph.outEdges(v);
  });
};
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */


var runDijkstra = function runDijkstra(graph, source, weightFn, edgeFn) {
  var results = new Map();
  var pq = new PriorityQueue();
  var v;
  var vEntry;

  var updateNeighbors = function updateNeighbors(edge) {
    var w = edge.v !== v ? edge.v : edge.w;
    var wEntry = results.get(w);
    var weight = weightFn(edge);
    var distance = vEntry.distance + weight;

    if (weight < 0) {
      throw new Error('dijkstra does not allow negative edge weights. ' + 'Bad edge: ' + edge + ' Weight: ' + weight);
    } // If there is already a shorter path to w, ignore this edge.


    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  graph.nodes().forEach(function (v) {
    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results.set(v, {
      distance: distance
    });
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin();
    vEntry = results.get(v);

    if (vEntry && vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    edgeFn(v).forEach(updateNeighbors);
  }

  var obj = {};
  Array.from(results.entries()).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node = _ref2[0],
        e = _ref2[1];

    obj[String(node)] = e;
    return obj;
  });
  return obj;
};

var dijkstraAll = function dijkstraAll(graph, weightFn, edgeFn) {
  var map = {};
  graph.nodes().forEach(function (node) {
    map[String(node)] = dijkstra(graph, node, weightFn, edgeFn);
    return map;
  });
  return map;
};

/**
 * @description Tarjan's algorithm for finding the strongly connected components of a graph.
 * @description https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 * @description.zh-CN Tarjan 算法用于找到图的强连通子图。
 * @param graph
 * @returns
 */
var tarjan = function tarjan(graph) {
  var index = 0;
  var stack = [];
  var visited = new Map(); // node id -> { onStack, lowlink, index }

  var results = [];

  function dfs(v) {
    var _graph$successors;

    var entry = {
      onStack: true,
      lowlink: index,
      index: index
    };
    visited.set(v, entry);
    index += 1;
    stack.push(v);
    (_graph$successors = graph.successors(v)) === null || _graph$successors === void 0 ? void 0 : _graph$successors.forEach(function (w) {
      var _visited$get;

      // 如果 w 没有被访问过，则继续访问 w
      if (!visited.has(w)) {
        dfs(w);
        var wEntry = visited.get(w);
        entry.lowlink = Math.min(entry.lowlink, wEntry.lowlink); // 如果 w 在栈顶，则说明 w 和 v 不是强连通的
      } else if ((_visited$get = visited.get(w)) === null || _visited$get === void 0 ? void 0 : _visited$get.onStack) {
        var _wEntry = visited.get(w); // 如果 w 在栈中，则说明 w 在当前访问的路径上


        entry.lowlink = Math.min(entry.lowlink, _wEntry.index);
      }
    }); // 如果 v 的 lowlink 不等于 v 的 index，则说明 v 和 v 的 lowlink 不是强连通的

    if (entry.lowlink === entry.index) {
      var cmpt = [];
      var w;

      do {
        // 将 w 出栈，并将 w 的所有邻接点加入强连通子图
        w = stack.pop();
        var wEntry = visited.get(w);
        wEntry.onStack = false;
        cmpt.push(w);
      } while (v !== w);

      results.push(cmpt);
    }
  }

  graph.nodes().forEach(function (v) {
    if (!visited.has(v)) {
      dfs(v);
    }
  });
  return results;
};

var findCycles = function findCycles(graph) {
  return tarjan(graph).filter(function (cmpt) {
    return cmpt.length > 1 || cmpt.length === 1 && graph.hasEdge(cmpt[0], cmpt[0]);
  });
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CycleException = /*#__PURE__*/function (_Error) {
  _inherits(CycleException, _Error);

  var _super = _createSuper(CycleException);

  function CycleException() {
    _classCallCheck(this, CycleException);

    return _super.apply(this, arguments);
  }

  return _createClass(CycleException);
}( /*#__PURE__*/_wrapNativeSuper(Error));

function topsort(graph) {
  var visited = new Set();
  var stack = new Set();
  var results = [];

  function visit(node) {
    if (stack.has(node)) {
      throw new CycleException();
    }

    if (!visited.has(node)) {
      var _graph$predecessors;

      stack.add(node);
      visited.add(node);
      (_graph$predecessors = graph.predecessors(node)) === null || _graph$predecessors === void 0 ? void 0 : _graph$predecessors.forEach(visit);
      stack.delete(node);
      results.push(node);
    }
  }

  graph.sinks().forEach(visit);

  if (visited.size !== graph.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

var isAcyclic = function isAcyclic(graph) {
  try {
    topsort(graph);
  } catch (e) {
    if (e instanceof CycleException) {
      return false;
    }

    throw e;
  }

  return true;
};

var postorder$1 = function postorder(graph, nodes) {
  return dfs$1(graph, nodes, 'post');
};

var preorder$1 = function preorder(graph, nodes) {
  return dfs$1(graph, nodes, 'pre');
};

var DEFAULT_WEIGHT_FUNC = function DEFAULT_WEIGHT_FUNC() {
  return 1;
};

function floydWarshall(graph, weightFn, edgeFn) {
  return runFloydWarshall(graph, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
    return graph.outEdges(v);
  });
}

function runFloydWarshall(graph, weightFn, edgeFn) {
  var results = {};
  var nodes = graph.nodes();
  nodes.forEach(function (node) {
    var v = String(node);
    results[v] = {};
    results[v][v] = {
      distance: 0
    };
    nodes.forEach(function (w) {
      if (node !== w) {
        results[v][String(w)] = {
          distance: Number.POSITIVE_INFINITY
        };
      }
    });
    edgeFn(node).forEach(function (edge) {
      var w = edge.v === node ? edge.w : edge.v;
      var d = weightFn(edge);
      results[v][String(w)] = {
        distance: d,
        predecessor: node
      };
    });
  });
  nodes.forEach(function (nodek) {
    var k = String(nodek);
    var rowK = results[k];
    nodes.forEach(function (nodei) {
      var i = String(nodei);
      var rowI = results[i];
      nodes.forEach(function (nodej) {
        var j = String(nodej);
        var ik = rowI[k];
        var kj = rowK[j];
        var ij = rowI[j];
        var altDistance = ik.distance + kj.distance;

        if (altDistance < ij.distance) {
          ij.distance = altDistance;
          ij.predecessor = kj.predecessor;
        }
      });
    });
  });
  return results;
}

const algorithm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  components: components,
  dfs: dfs$1,
  dijkstra: dijkstra,
  dijkstraAll: dijkstraAll,
  findCycles: findCycles,
  tarjan: tarjan,
  isAcyclic: isAcyclic,
  postorder: postorder$1,
  preorder: preorder$1,
  prim: prim,
  topsort: topsort,
  floydWarshall: floydWarshall
});

class List extends List$1 {
}
class StateGraph extends Graph$1 {
}
/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */
const DEFAULT_WEIGHT_FN = () => 1;
const greedyFAS = (g, weightFn) => {
    var _a;
    if (g.nodeCount() <= 1)
        return [];
    const state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
    const results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    return (_a = results.map((e) => g.outEdges(e.v, e.w))) === null || _a === void 0 ? void 0 : _a.flat();
};
const doGreedyFAS = (g, buckets, zeroIdx) => {
    let results = [];
    const sources = buckets[buckets.length - 1];
    const sinks = buckets[0];
    let entry;
    while (g.nodeCount()) {
        while ((entry = sinks.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        while ((entry = sources.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        if (g.nodeCount()) {
            for (let i = buckets.length - 2; i > 0; --i) {
                entry = buckets[i].dequeue();
                if (entry) {
                    results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
                    break;
                }
            }
        }
    }
    return results;
};
const removeNode = (g, buckets, zeroIdx, entry, collectPredecessors) => {
    var _a, _b;
    const results = [];
    (_a = g.inEdges(entry.v)) === null || _a === void 0 ? void 0 : _a.forEach((edge) => {
        const weight = g.edge(edge);
        const uEntry = g.node(edge.v);
        if (collectPredecessors) {
            // this result not really care about in or out
            results.push({ v: edge.v, w: edge.w, in: 0, out: 0 });
        }
        if (uEntry.out === undefined)
            uEntry.out = 0;
        uEntry.out -= weight;
        assignBucket(buckets, zeroIdx, uEntry);
    });
    (_b = g.outEdges(entry.v)) === null || _b === void 0 ? void 0 : _b.forEach((edge) => {
        const weight = g.edge(edge);
        const w = edge.w;
        const wEntry = g.node(w);
        if (wEntry.in === undefined)
            wEntry.in = 0;
        wEntry.in -= weight;
        assignBucket(buckets, zeroIdx, wEntry);
    });
    g.removeNode(entry.v);
    return collectPredecessors ? results : undefined;
};
const buildState = (g, weightFn) => {
    const fasGraph = new StateGraph();
    let maxIn = 0;
    let maxOut = 0;
    g.nodes().forEach((v) => {
        fasGraph.setNode(v, { v, in: 0, out: 0 });
    });
    // Aggregate weights on nodes, but also sum the weights across multi-edges
    // into a single edge for the fasGraph.
    g.edges().forEach((e) => {
        const prevWeight = fasGraph.edge(e) || 0;
        const weight = (weightFn === null || weightFn === void 0 ? void 0 : weightFn(e)) || 1;
        const edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, (fasGraph.node(e.v).out += weight));
        maxIn = Math.max(maxIn, (fasGraph.node(e.w).in += weight));
    });
    const buckets = [];
    const rangeMax = maxOut + maxIn + 3;
    for (let i = 0; i < rangeMax; i++) {
        buckets.push(new List());
    }
    const zeroIdx = maxIn + 1;
    fasGraph.nodes().forEach((v) => {
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
    });
    return { buckets, zeroIdx, graph: fasGraph };
};
const assignBucket = (buckets, zeroIdx, entry) => {
    if (!entry.out) {
        buckets[0].enqueue(entry);
    }
    else if (!entry["in"]) {
        buckets[buckets.length - 1].enqueue(entry);
    }
    else {
        buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
    }
};

const run$2 = (g) => {
    const weightFn = (g) => {
        return (e) => { var _a; return ((_a = g.edge(e)) === null || _a === void 0 ? void 0 : _a.weight) || 1; };
    };
    const fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
    fas === null || fas === void 0 ? void 0 : fas.forEach((e) => {
        const label = g.edge(e);
        g.removeEdgeObj(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, `rev-${Math.random()}`);
    });
};
const dfsFAS = (g) => {
    const fas = [];
    const stack = {};
    const visited = {};
    const dfs = (v) => {
        var _a;
        if (visited[v]) {
            return;
        }
        visited[v] = true;
        stack[v] = true;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            if (stack[e.w]) {
                fas.push(e);
            }
            else {
                dfs(e.w);
            }
        });
        delete stack[v];
    };
    g.nodes().forEach(dfs);
    return fas;
};
const undo$2 = (g) => {
    g.edges().forEach((e) => {
        const label = g.edge(e);
        if (label.reversed) {
            g.removeEdgeObj(e);
            const forwardName = label.forwardName;
            delete label.reversed;
            delete label.forwardName;
            g.setEdge(e.w, e.v, label, forwardName);
        }
    });
};
const acyclic = { run: run$2, undo: undo$2 };

class Graph extends Graph$1 {
}

const safeSort = (valueA, valueB) => {
    return Number(valueA) - Number(valueB);
};
/*
 * Adds a dummy node to the graph and return v.
 */
const addDummyNode = (g, type, attrs, name) => {
    let v;
    do {
        v = `${name}${Math.random()}`;
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
};
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
const simplify = (g) => {
    const simplified = new Graph().setGraph(g.graph());
    g.nodes().forEach((v) => { simplified.setNode(v, g.node(v)); });
    g.edges().forEach((e) => {
        const simpleLabel = simplified.edgeFromArgs(e.v, e.w) || { weight: 0, minlen: 1 };
        const label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
};
const asNonCompoundGraph = (g) => {
    const simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    g.nodes().forEach((node) => {
        var _a;
        if (!((_a = g.children(node)) === null || _a === void 0 ? void 0 : _a.length)) {
            simplified.setNode(node, g.node(node));
        }
    });
    g.edges().forEach((edge) => {
        simplified.setEdgeObj(edge, g.edge(edge));
    });
    return simplified;
};
const zipObject = (keys, values) => {
    return keys === null || keys === void 0 ? void 0 : keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});
};
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
const intersectRect = (rect, point) => {
    const x = Number(rect.x);
    const y = Number(rect.y);
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    const dx = Number(point.x) - x;
    const dy = Number(point.y) - y;
    let w = Number(rect.width) / 2;
    let h = Number(rect.height) / 2;
    if (!dx && !dy) {
        // completely overlapped directly, then return points its self
        return { x: 0, y: 0 };
    }
    let sx;
    let sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        // Intersection is top or bottom of rect.
        if (dy < 0) {
            h = -h;
        }
        sx = (h * dx) / dy;
        sy = h;
    }
    else {
        // Intersection is left or right of rect.
        if (dx < 0) {
            w = -w;
        }
        sx = w;
        sy = (w * dy) / dx;
    }
    return { x: x + sx, y: y + sy };
};
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * const will produce a matrix with the ids of each node.
 */
const buildLayerMatrix = (g) => {
    const layeringNodes = [];
    const rankMax = maxRank(g) + 1;
    for (let i = 0; i < rankMax; i++) {
        layeringNodes.push([]);
    }
    // const layering = _.map(_.range(maxRank(g) + 1), function() { return []; });
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (!node)
            return;
        const rank = node.rank;
        if (rank !== undefined && layeringNodes[rank]) {
            layeringNodes[rank].push(v);
        }
    });
    for (let i = 0; i < rankMax; i++) {
        layeringNodes[i] = layeringNodes[i].sort((va, vb) => { var _a, _b; return safeSort((_a = g.node(va)) === null || _a === void 0 ? void 0 : _a.order, (_b = g.node(vb)) === null || _b === void 0 ? void 0 : _b.order); });
    }
    return layeringNodes;
};
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
const normalizeRanks = (g) => {
    const nodeRanks = g
        .nodes()
        .filter((v) => { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map((v) => g.node(v).rank);
    const min = Math.min(...nodeRanks);
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node.hasOwnProperty("rank") && min !== Infinity) {
            node.rank -= min;
        }
    });
};
const removeEmptyRanks = (g) => {
    // Ranks may not start at 0, so we need to offset them
    const nodes = g.nodes();
    const nodeRanks = nodes
        .filter((v) => { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map((v) => g.node(v).rank);
    const offset = Math.min(...nodeRanks);
    const layers = [];
    nodes.forEach((v) => {
        var _a;
        const rank = (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) || 0) - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });
    let delta = 0;
    const nodeRankFactor = g.graph().nodeRankFactor || 0;
    for (let i = 0; i < layers.length; i++) {
        const vs = layers[i];
        if (vs === undefined) {
            if (i % nodeRankFactor !== 0) {
                delta -= 1;
            }
        }
        else if (delta) {
            vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
                const node = g.node(v);
                if (node) {
                    node.rank = node.rank || 0;
                    node.rank += delta;
                }
            });
        }
    }
};
const addBorderNode$1 = (g, prefix, rank, order) => {
    const node = {
        width: 0,
        height: 0
    };
    if (isNumber(rank) && isNumber(order)) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
};
const maxRank = (g) => {
    let maxRank;
    g.nodes().forEach((v) => {
        var _a;
        const rank = (_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank;
        if (rank !== undefined) {
            if (maxRank === undefined || rank > maxRank) {
                maxRank = rank;
            }
        }
    });
    if (!maxRank) {
        maxRank = 0;
    }
    return maxRank;
};
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * const returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
const partition = (collection, fn) => {
    const result = { lhs: [], rhs: [] };
    collection === null || collection === void 0 ? void 0 : collection.forEach((value) => {
        if (fn(value)) {
            result.lhs.push(value);
        }
        else {
            result.rhs.push(value);
        }
    });
    return result;
};
/*
 * Returns a new const that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
const time = (name, fn) => {
    const start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log(`${name} time: ${Date.now() - start}ms`);
    }
};
const notime = (name, fn) => {
    return fn();
};
const minBy = (array, func) => {
    return array.reduce((a, b) => {
        const valA = func(a);
        const valB = func(b);
        return valA > valB ? b : a;
    });
};

/*
 * Breaks any long edges in the graph into short segments that span 1 layer
 * each. This operation is undoable with the denormalize function.
 *
 * Pre-conditions:
 *
 *    1. The input graph is a DAG.
 *    2. Each node in the graph has a "rank" property.
 *
 * Post-condition:
 *
 *    1. All edges in the graph have a length of 1.
 *    2. Dummy nodes are added where edges have been split into segments.
 *    3. The graph is augmented with a "dummyChains" attribute which contains
 *       the first dummy in each chain of dummy nodes produced.
 */
const run$1 = (g) => {
    g.graph().dummyChains = [];
    g.edges().forEach((edge) => normalizeEdge(g, edge));
};
const normalizeEdge = (g, e) => {
    let v = e.v;
    let vRank = g.node(v).rank;
    const w = e.w;
    const wRank = g.node(w).rank;
    const name = e.name;
    const edgeLabel = g.edge(e);
    const labelRank = edgeLabel.labelRank;
    if (wRank === vRank + 1)
        return;
    g.removeEdgeObj(e);
    const graph = g.graph();
    let dummy;
    let attrs;
    let i;
    for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
        edgeLabel.points = [];
        attrs = {
            edgeLabel,
            width: 0,
            height: 0,
            edgeObj: e,
            rank: vRank,
        };
        dummy = addDummyNode(g, "edge", attrs, "_d");
        if (vRank === labelRank) {
            attrs.width = edgeLabel.width;
            attrs.height = edgeLabel.height;
            attrs.dummy = "edge-label";
            attrs.labelpos = edgeLabel.labelpos;
        }
        g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
        if (i === 0) {
            if (!graph.dummyChains)
                graph.dummyChains = [];
            graph.dummyChains.push(dummy);
        }
        v = dummy;
    }
    g.setEdge(v, w, { weight: edgeLabel.weight }, name);
};
const undo$1 = (g) => {
    var _a;
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
        let node = g.node(v);
        const origLabel = node.edgeLabel;
        let w;
        if (node.edgeObj) {
            g.setEdgeObj(node.edgeObj, origLabel);
        }
        let currentV = v;
        while (node.dummy) {
            w = g.successors(currentV)[0];
            g.removeNode(currentV);
            origLabel.points.push({ x: node.x, y: node.y });
            if (node.dummy === "edge-label") {
                origLabel.x = node.x;
                origLabel.y = node.y;
                origLabel.width = node.width;
                origLabel.height = node.height;
            }
            currentV = w;
            node = g.node(currentV);
        }
    });
};
const normalize = { run: run$1, undo: undo$1 };

/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */
const longestPath = (g) => {
    var _a;
    const visited = {};
    const dfs = (v) => {
        var _a;
        const label = g.node(v);
        if (!label)
            return 0;
        if (visited[v]) {
            return label.rank;
        }
        visited[v] = true;
        let rank;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((edgeObj) => {
            const wRank = dfs(edgeObj.w);
            const minLen = g.edge(edgeObj).minlen;
            const r = wRank - minLen;
            if (r) {
                if (rank === undefined || r < rank) {
                    rank = r;
                }
            }
        });
        if (!rank) {
            rank = 0;
        }
        label.rank = rank;
        return rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach((source) => dfs(source));
};
const longestPathWithLayer = (g) => {
    var _a;
    // 用longest path，找出最深的点
    const visited = {};
    let minRank;
    const dfs = (v) => {
        var _a;
        const label = g.node(v);
        if (!label)
            return 0;
        if (visited[v]) {
            return label.rank;
        }
        visited[v] = true;
        let rank;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((edgeObj) => {
            const wRank = dfs(edgeObj.w);
            const minLen = g.edge(edgeObj).minlen;
            const r = wRank - minLen;
            if (r) {
                if (rank === undefined || r < rank) {
                    rank = r;
                }
            }
        });
        if (!rank) {
            rank = 0;
        }
        if (minRank === undefined || rank < minRank) {
            minRank = rank;
        }
        label.rank = rank;
        return rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach((source) => {
        if (g.node(source))
            dfs(source);
    });
    if (minRank === undefined) {
        minRank = 0;
    }
    // minRank += 1; // NOTE: 最小的层级是dummy root，+1
    // forward一遍，赋值层级
    const forwardVisited = {};
    const dfsForward = (v, nextRank) => {
        var _a;
        const label = g.node(v);
        const currRank = (!isNaN(label.layer) ? label.layer : nextRank);
        // 没有指定，取最大值
        if (label.rank === undefined || label.rank < currRank) {
            label.rank = currRank;
        }
        if (forwardVisited[v])
            return;
        forwardVisited[v] = true;
        // DFS遍历子节点
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map((e) => {
            dfsForward(e.w, currRank + g.edge(e).minlen);
        });
    };
    // 指定层级的，更新下游
    g.nodes().forEach((n) => {
        const label = g.node(n);
        if (!label)
            return;
        if (!isNaN(label.layer)) {
            dfsForward(n, label.layer); // 默认的dummy root所在层的rank是-1
        }
        else {
            label.rank -= minRank;
        }
    });
};
/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */
const slack = (g, e) => {
    return (g.node(e.w).rank -
        g.node(e.v).rank -
        g.edge(e).minlen);
};

/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */
const feasibleTree = (g) => {
    const t = new Graph({ directed: false });
    // Choose arbitrary node from which to start our tree
    const start = g.nodes()[0];
    const size = g.nodeCount();
    t.setNode(start, {});
    let edge;
    let delta;
    while (tightTree(t, g) < size) {
        edge = findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
        shiftRanks(t, g, delta);
    }
    return t;
};
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */
const tightTree = (t, g) => {
    const dfs = (v) => {
        g.nodeEdges(v).forEach((e) => {
            const edgeV = e.v;
            const w = (v === edgeV) ? e.w : edgeV;
            if (!t.hasNode(w) && !slack(g, e)) {
                t.setNode(w, {});
                t.setEdge(v, w, {});
                dfs(w);
            }
        });
    };
    t.nodes().forEach(dfs);
    return t.nodeCount();
};
/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */
const feasibleTreeWithLayer = (g) => {
    const t = new Graph({ directed: false });
    // Choose arbitrary node from which to start our tree
    const start = g.nodes()[0];
    const size = g.nodes().filter((n) => !!g.node(n)).length;
    t.setNode(start, {});
    let edge;
    let delta;
    while (tightTreeWithLayer(t, g) < size) {
        edge = findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
        shiftRanks(t, g, delta);
    }
    return t;
};
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */
const tightTreeWithLayer = (t, g) => {
    const dfs = (v) => {
        var _a;
        (_a = g.nodeEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            const edgeV = e.v;
            const w = (v === edgeV) ? e.w : edgeV;
            // 对于指定layer的，直接加入tight-tree，不参与调整
            if (!t.hasNode(w) && (g.node(w).layer !== undefined || !slack(g, e))) {
                t.setNode(w, {});
                t.setEdge(v, w, {});
                dfs(w);
            }
        });
    };
    t.nodes().forEach(dfs);
    return t.nodeCount();
};
/*
 * Finds the edge with the smallest slack that is incident on tree and returns
 * it.
 */
const findMinSlackEdge = (t, g) => {
    return minBy(g.edges(), (e) => {
        if (t.hasNode(e.v) !== t.hasNode(e.w)) {
            return slack(g, e);
        }
        return Infinity;
    });
};
const shiftRanks = (t, g, delta) => {
    t.nodes().forEach((v) => {
        if (!g.node(v).rank)
            g.node(v).rank = 0;
        g.node(v).rank += delta;
    });
};

const { preorder, postorder } = algorithm;
/*
 * The network simplex algorithm assigns ranks to each node in the input graph
 * and iteratively improves the ranking to reduce the length of edges.
 *
 * Preconditions:
 *
 *    1. The input graph must be a DAG.
 *    2. All nodes in the graph must have an object value.
 *    3. All edges in the graph must have "minlen" and "weight" attributes.
 *
 * Postconditions:
 *
 *    1. All nodes in the graph will have an assigned "rank" attribute that has
 *       been optimized by the network simplex algorithm. Ranks start at 0.
 *
 *
 * A rough sketch of the algorithm is as follows:
 *
 *    1. Assign initial ranks to each node. We use the longest path algorithm,
 *       which assigns ranks to the lowest position possible. In general this
 *       leads to very wide bottom ranks and unnecessarily long edges.
 *    2. Construct a feasible tight tree. A tight tree is one such that all
 *       edges in the tree have no slack (difference between length of edge
 *       and minlen for the edge). This by itself greatly improves the assigned
 *       rankings by shorting edges.
 *    3. Iteratively find edges that have negative cut values. Generally a
 *       negative cut value indicates that the edge could be removed and a new
 *       tree edge could be added to produce a more compact graph.
 *
 * Much of the algorithms here are derived from Gansner, et al., "A Technique
 * for Drawing Directed Graphs." The structure of the file roughly follows the
 * structure of the overall algorithm.
 */
const networkSimplex = (og) => {
    const g = simplify(og);
    longestPath(g);
    const t = feasibleTree(g);
    initLowLimValues(t);
    initCutValues(t, g);
    let e;
    let f;
    while ((e = leaveEdge(t))) {
        f = enterEdge(t, g, e);
        exchangeEdges(t, g, e, f);
    }
};
/*
 * Initializes cut values for all edges in the tree.
 */
const initCutValues = (t, g) => {
    let vs = postorder(t, t.nodes());
    vs = vs === null || vs === void 0 ? void 0 : vs.slice(0, (vs === null || vs === void 0 ? void 0 : vs.length) - 1);
    vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
        assignCutValue(t, g, v);
    });
};
const assignCutValue = (t, g, child) => {
    const childLab = t.node(child);
    const parent = childLab.parent;
    t.edgeFromArgs(child, parent).cutvalue = calcCutValue(t, g, child);
};
/*
 * Given the tight tree, its graph, and a child in the graph calculate and
 * return the cut value for the edge between the child and its parent.
 */
const calcCutValue = (t, g, child) => {
    var _a;
    const childLab = t.node(child);
    const parent = childLab.parent;
    // True if the child is on the tail end of the edge in the directed graph
    let childIsTail = true;
    // The graph's view of the tree edge we're inspecting
    let graphEdge = g.edgeFromArgs(child, parent);
    // The accumulated cut value for the edge between this node and its parent
    let cutValue = 0;
    if (!graphEdge) {
        childIsTail = false;
        graphEdge = g.edgeFromArgs(parent, child);
    }
    cutValue = graphEdge.weight;
    (_a = g.nodeEdges(child)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
        const isOutEdge = e.v === child;
        const other = isOutEdge ? e.w : e.v;
        if (other !== parent) {
            const pointsToHead = isOutEdge === childIsTail;
            const otherWeight = g.edge(e).weight;
            cutValue += pointsToHead ? otherWeight : -otherWeight;
            if (isTreeEdge(t, child, other)) {
                const otherCutValue = t.edgeFromArgs(child, other).cutvalue;
                cutValue += pointsToHead ? -otherCutValue : otherCutValue;
            }
        }
    });
    return cutValue;
};
const initLowLimValues = (tree, root = tree.nodes()[0]) => {
    dfsAssignLowLim(tree, {}, 1, root);
};
const dfsAssignLowLim = (tree, visited, nextLim, v, parent) => {
    var _a;
    const low = nextLim;
    let useNextLim = nextLim;
    const label = tree.node(v);
    visited[v] = true;
    (_a = tree.neighbors(v)) === null || _a === void 0 ? void 0 : _a.forEach((w) => {
        if (!visited[w]) {
            useNextLim = dfsAssignLowLim(tree, visited, useNextLim, w, v);
        }
    });
    label.low = low;
    label.lim = useNextLim++;
    if (parent) {
        label.parent = parent;
    }
    else {
        // TODO should be able to remove this when we incrementally update low lim
        delete label.parent;
    }
    return useNextLim;
};
const leaveEdge = (tree) => {
    return tree.edges().find((e) => {
        return tree.edge(e).cutvalue < 0;
    });
};
const enterEdge = (t, g, edge) => {
    let v = edge.v;
    let w = edge.w;
    // For the rest of this function we assume that v is the tail and w is the
    // head, so if we don't have this edge in the graph we should flip it to
    // match the correct orientation.
    if (!g.hasEdge(v, w)) {
        v = edge.w;
        w = edge.v;
    }
    const vLabel = t.node(v);
    const wLabel = t.node(w);
    let tailLabel = vLabel;
    let flip = false;
    // If the root is in the tail of the edge then we need to flip the logic that
    // checks for the head and tail nodes in the candidates function below.
    if (vLabel.lim > wLabel.lim) {
        tailLabel = wLabel;
        flip = true;
    }
    const candidates = g.edges().filter((edge) => {
        return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
            flip !== isDescendant(t, t.node(edge.w), tailLabel);
    });
    return minBy(candidates, (edge) => { return slack(g, edge); });
};
const exchangeEdges = (t, g, e, f) => {
    const v = e.v;
    const w = e.w;
    t.removeEdge(v, w);
    t.setEdge(f.v, f.w, {});
    initLowLimValues(t);
    initCutValues(t, g);
    updateRanks(t, g);
};
const updateRanks = (t, g) => {
    const root = t.nodes().find((v) => { var _a; return !((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.parent); });
    let vs = preorder(t, root);
    vs = vs === null || vs === void 0 ? void 0 : vs.slice(1);
    vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
        const parent = t.node(v).parent;
        let edge = g.edgeFromArgs(v, parent);
        let flipped = false;
        if (!edge) {
            edge = g.edgeFromArgs(parent, v);
            flipped = true;
        }
        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
    });
};
/*
 * Returns true if the edge is in the tree.
 */
const isTreeEdge = (tree, u, v) => {
    return tree.hasEdge(u, v);
};
/*
 * Returns true if the specified node is descendant of the root node per the
 * assigned low and lim attributes in the tree.
 */
const isDescendant = (tree, vLabel, rootLabel) => {
    return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
};

// "use strict";
/*
 * Assigns a rank to each node in the input graph that respects the "minlen"
 * constraint specified on edges between nodes.
 *
 * This basic structure is derived from Gansner, et al., "A Technique for
 * Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a connected DAG
 *    2. Graph nodes must be objects
 *    3. Graph edges must have "weight" and "minlen" attributes
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have a "rank" attribute based on the results of the
 *       algorithm. Ranks can start at any index (including negative), we'll
 *       fix them up later.
 */
const rank = (g) => {
    switch (g.graph().ranker) {
        case "network-simplex":
            networkSimplexRanker(g);
            break;
        case "tight-tree":
            tightTreeRanker(g);
            break;
        case "longest-path":
            longestPathRanker(g);
            break;
        // default: networkSimplexRanker(g);
        default: tightTreeRanker(g);
    }
};
// A fast and simple ranker, but results are far from optimal.
const longestPathRanker = longestPath;
const tightTreeRanker = (g) => {
    longestPathWithLayer(g);
    feasibleTreeWithLayer(g);
};
const networkSimplexRanker = (g) => {
    networkSimplex(g);
};

// deep first search with both order low for pre, lim for post
const dfsBothOrder = (g) => {
    var _a;
    const result = {};
    let lim = 0;
    const dfs = (v) => {
        var _a;
        const low = lim;
        (_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
        result[v] = { low, lim: lim++ };
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(dfs);
    return result;
};
// Find a path from v to w through the lowest common ancestor (LCA). Return the
// full path and the LCA.
const findPath = (g, postorderNums, v, w) => {
    const vPath = [];
    const wPath = [];
    const low = Math.min(postorderNums[v].low, postorderNums[w].low);
    const lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
    let parent;
    let lca;
    // Traverse up from v to find the LCA
    parent = v;
    do {
        parent = g.parent(parent);
        vPath.push(parent);
    } while (parent &&
        (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
    lca = parent;
    // Traverse from w to LCA
    parent = w;
    while (parent && parent !== lca) {
        wPath.push(parent);
        parent = g.parent(parent);
    }
    return { lca, path: vPath.concat(wPath.reverse()) };
};
const parentDummyChains = (g) => {
    var _a;
    const postorderNums = dfsBothOrder(g);
    (_a = g.graph().dummyChains) === null || _a === void 0 ? void 0 : _a.forEach((startV) => {
        var _a, _b;
        let v = startV;
        let node = g.node(v);
        const edgeObj = node.edgeObj;
        if (!edgeObj)
            return;
        const pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
        const path = pathData.path;
        const lca = pathData.lca;
        let pathIdx = 0;
        let pathV = path[pathIdx];
        let ascending = true;
        while (v !== edgeObj.w) {
            node = g.node(v);
            if (ascending) {
                while (pathV !== lca && ((_a = g.node(pathV)) === null || _a === void 0 ? void 0 : _a.maxRank) < node.rank) {
                    pathIdx++;
                    pathV = path[pathIdx];
                }
                if (pathV === lca) {
                    ascending = false;
                }
            }
            if (!ascending) {
                while (pathIdx < path.length - 1 &&
                    ((_b = g.node(path[pathIdx + 1])) === null || _b === void 0 ? void 0 : _b.minRank) <=
                        node.rank) {
                    pathIdx++;
                }
                pathV = path[pathIdx];
            }
            g.setParent(v, pathV);
            v = g.successors(v)[0];
        }
    });
};

/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */
const run = (g) => {
    var _a;
    const root = addDummyNode(g, "root", {}, "_root");
    const depths = treeDepths(g);
    let maxDepth = Math.max(...Object.values(depths));
    if (Math.abs(maxDepth) === Infinity) {
        maxDepth = 1;
    }
    const height = maxDepth - 1; // Note: depths is an Object not an array
    const nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;
    // Multiply minlen by nodeSep to align nodes on non-border ranks.
    g.edges().forEach((e) => {
        g.edge(e).minlen *= nodeSep;
    });
    // Calculate a weight that is sufficient to keep subgraphs vertically compact
    const weight = sumWeights(g) + 1;
    // Create border nodes and link them up
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
        dfs(g, root, nodeSep, weight, height, depths, child);
    });
    // Save the multiplier for node layers for later removal of empty border
    // layers.
    g.graph().nodeRankFactor = nodeSep;
};
const dfs = (g, root, nodeSep, weight, height, depths, v) => {
    const children = g.children(v);
    if (!(children === null || children === void 0 ? void 0 : children.length)) {
        if (v !== root) {
            g.setEdge(root, v, { weight: 0, minlen: nodeSep });
        }
        return;
    }
    const top = addBorderNode$1(g, "_bt");
    const bottom = addBorderNode$1(g, "_bb");
    const label = g.node(v);
    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;
    children === null || children === void 0 ? void 0 : children.forEach((child) => {
        dfs(g, root, nodeSep, weight, height, depths, child);
        const childNode = g.node(child);
        const childTop = childNode.borderTop ? childNode.borderTop : child;
        const childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        const thisWeight = childNode.borderTop ? weight : 2 * weight;
        const minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
            minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
        g.setEdge(childBottom, bottom, {
            minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
    });
    if (!g.parent(v)) {
        g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
    }
};
const treeDepths = (g) => {
    var _a;
    const depths = {};
    const dfs = (v, depth) => {
        const children = g.children(v);
        children === null || children === void 0 ? void 0 : children.forEach((child) => dfs(child, depth + 1));
        depths[v] = depth;
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((v) => dfs(v, 1));
    return depths;
};
const sumWeights = (g) => {
    let result = 0;
    g.edges().forEach((e) => {
        result += g.edge(e).weight;
    });
    return result;
};
const cleanup = (g) => {
    const graphLabel = g.graph();
    graphLabel.nestingRoot && g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge.nestingEdge) {
            g.removeEdgeObj(e);
        }
    });
};
const nestingGraph = { run, cleanup };

const addBorderSegments = (g) => {
    var _a;
    const dfs = (v) => {
        const children = g.children(v);
        const node = g.node(v);
        if (children === null || children === void 0 ? void 0 : children.length) {
            children.forEach((child) => dfs(child));
        }
        if (node.hasOwnProperty("minRank")) {
            node.borderLeft = [];
            node.borderRight = [];
            for (let rank = node.minRank, maxRank = node.maxRank + 1; rank < maxRank; rank += 1) {
                addBorderNode(g, "borderLeft", "_bl", v, node, rank);
                addBorderNode(g, "borderRight", "_br", v, node, rank);
            }
        }
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((child) => dfs(child));
};
const addBorderNode = (g, prop, prefix, sg, sgNode, rank) => {
    const label = { rank, borderType: prop, width: 0, height: 0 };
    const prev = sgNode[prop][rank - 1];
    const curr = addDummyNode(g, "border", label, prefix);
    sgNode[prop][rank] = curr;
    g.setParent(curr, sg);
    if (prev) {
        g.setEdge(prev, curr, { weight: 1 });
    }
};

const adjust = (g) => {
    var _a;
    const rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "lr" || rankDir === "rl") {
        swapWidthHeight(g);
    }
};
const undo = (g) => {
    var _a;
    const rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "bt" || rankDir === "rl") {
        reverseY(g);
    }
    if (rankDir === "lr" || rankDir === "rl") {
        swapXY(g);
        swapWidthHeight(g);
    }
};
const swapWidthHeight = (g) => {
    g.nodes().forEach((v) => {
        swapWidthHeightOne(g.node(v));
    });
    g.edges().forEach((e) => {
        swapWidthHeightOne(g.edge(e));
    });
};
const swapWidthHeightOne = (attrs) => {
    const w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
};
const reverseY = (g) => {
    g.nodes().forEach((v) => {
        reverseYOne(g.node(v));
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => reverseYOne(point));
        if (edge.hasOwnProperty("y")) {
            reverseYOne(edge);
        }
    });
};
const reverseYOne = (attrs) => {
    if (attrs === null || attrs === void 0 ? void 0 : attrs.y) {
        attrs.y = -attrs.y;
    }
};
const swapXY = (g) => {
    g.nodes().forEach((v) => {
        swapXYOne(g.node(v));
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => swapXYOne(point));
        if (edge.hasOwnProperty("x")) {
            swapXYOne(edge);
        }
    });
};
const swapXYOne = (attrs) => {
    const x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
};
const coordinateSystem = { adjust, undo };

/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
const initOrder = (g) => {
    const visited = {};
    const simpleNodes = g.nodes().filter((v) => {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    const nodeRanks = simpleNodes.map((v) => g.node(v).rank);
    const maxRank = Math.max(...nodeRanks);
    const layers = [];
    for (let i = 0; i < maxRank + 1; i++) {
        layers.push([]);
    }
    const dfs = (v) => {
        var _a;
        if (visited.hasOwnProperty(v))
            return;
        visited[v] = true;
        const node = g.node(v);
        if (!isNaN(node.rank)) {
            layers[node.rank].push(v);
        }
        (_a = g.successors(v)) === null || _a === void 0 ? void 0 : _a.forEach((child) => dfs(child));
    };
    const orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
    // const orderedVs = _.sortBy(simpleNodes, function(v) { return g.node(v)!.rank; });
    // 有fixOrder的，直接排序好放进去
    const beforeSort = orderedVs.filter((n) => {
        return g.node(n).fixorder !== undefined;
    });
    const fixOrderNodes = beforeSort.sort((a, b) => g.node(a).fixorder - g.node(b).fixorder);
    fixOrderNodes === null || fixOrderNodes === void 0 ? void 0 : fixOrderNodes.forEach((n) => {
        if (!isNaN(g.node(n).rank)) {
            layers[g.node(n).rank].push(n);
        }
        visited[n] = true;
    });
    orderedVs === null || orderedVs === void 0 ? void 0 : orderedVs.forEach(dfs);
    return layers;
};

/*
 * A function that takes a layering (an array of layers, each with an array of
 * ordererd nodes) and a graph and returns a weighted crossing count.
 *
 * Pre-conditions:
 *
 *    1. Input graph must be simple (not a multigraph), directed, and include
 *       only simple edges.
 *    2. Edges in the input graph must have assigned weights.
 *
 * Post-conditions:
 *
 *    1. The graph and layering matrix are left unchanged.
 *
 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
 */
const twoLayerCrossCount = (g, northLayer, southLayer) => {
    // Sort all of the edges between the north and south layers by their position
    // in the north layer and then the south. Map these edges to the position of
    // their head in the south layer.
    const southPos = zipObject(southLayer, southLayer.map((v, i) => i));
    const unflat = northLayer.map((v) => {
        var _a;
        const unsort = (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map((e) => {
            return { pos: southPos[e.w] || 0, weight: g.edge(e).weight };
        });
        return unsort === null || unsort === void 0 ? void 0 : unsort.sort((a, b) => a.pos - b.pos);
    });
    const southEntries = unflat.flat().filter((entry) => entry !== undefined);
    // Build the accumulator tree
    let firstIndex = 1;
    while (firstIndex < southLayer.length)
        firstIndex <<= 1;
    const treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    const tree = Array(treeSize).fill(0, 0, treeSize);
    // Calculate the weighted crossings
    let cc = 0;
    southEntries === null || southEntries === void 0 ? void 0 : southEntries.forEach((entry) => {
        if (entry) {
            let index = entry.pos + firstIndex;
            tree[index] += entry.weight;
            let weightSum = 0;
            while (index > 0) {
                if (index % 2) {
                    weightSum += tree[index + 1];
                }
                index = (index - 1) >> 1;
                tree[index] += entry.weight;
            }
            cc += entry.weight * weightSum;
        }
    });
    return cc;
};
const crossCount = (g, layering) => {
    let cc = 0;
    for (let i = 1; i < (layering === null || layering === void 0 ? void 0 : layering.length); i += 1) {
        cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
    }
    return cc;
};

/*
 * Constructs a graph that can be used to sort a layer of nodes. The graph will
 * contain all base and subgraph nodes from the request layer in their original
 * hierarchy and any edges that are incident on these nodes and are of the type
 * requested by the "relationship" parameter.
 *
 * Nodes from the requested rank that do not have parents are assigned a root
 * node in the output graph, which is set in the root graph attribute. This
 * makes it easy to walk the hierarchy of movable nodes during ordering.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG
 *    2. Base nodes in the input graph have a rank attribute
 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
 *    4. Edges have an assigned weight
 *
 * Post-conditions:
 *
 *    1. Output graph has all nodes in the movable rank with preserved
 *       hierarchy.
 *    2. Root nodes in the movable layer are made children of the node
 *       indicated by the root attribute of the graph.
 *    3. Non-movable nodes incident on movable nodes, selected by the
 *       relationship parameter, are included in the graph (without hierarchy).
 *    4. Edges incident on movable nodes, selected by the relationship
 *       parameter, are added to the output graph.
 *    5. The weights for copied edges are aggregated as need, since the output
 *       graph is not a multi-graph.
 */
const buildLayerGraph = (g, rank, relationship) => {
    const root = createRootNode(g);
    const result = new Graph({ compound: true })
        .setGraph({ root })
        .setDefaultNodeLabel((v) => {
        return g.node(v);
    });
    g.nodes().forEach((v) => {
        var _a;
        const node = g.node(v);
        const parent = g.parent(v);
        if (node.rank === rank ||
            (node.minRank <= rank && rank <= node.maxRank)) {
            result.setNode(v);
            result.setParent(v, parent || root);
            // This assumes we have only short edges!
            (_a = g[relationship](v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
                const u = e.v === v ? e.w : e.v;
                const edge = result.edgeFromArgs(u, v);
                const weight = edge !== undefined ? edge.weight : 0;
                result.setEdge(u, v, { weight: g.edge(e).weight + weight });
            });
            if (node.hasOwnProperty("minRank")) {
                result.setNode(v, {
                    borderLeft: node.borderLeft[rank],
                    borderRight: node.borderRight[rank],
                });
            }
        }
    });
    return result;
};
const createRootNode = (g) => {
    let v;
    while (g.hasNode((v = `_root${Math.random()}`)))
        ;
    return v;
};

const addSubgraphConstraints = (g, cg, vs) => {
    const prev = {};
    let rootPrev;
    vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
        let child = g.parent(v);
        let parent;
        let prevChild;
        while (child) {
            parent = g.parent(child);
            if (parent) {
                prevChild = prev[parent];
                prev[parent] = child;
            }
            else {
                prevChild = rootPrev;
                rootPrev = child;
            }
            if (prevChild && prevChild !== child) {
                cg.setEdge(prevChild, child);
                return;
            }
            child = parent;
        }
    });
};

const barycenter = (g, movable) => {
    return movable.map((v) => {
        const inV = g.inEdges(v);
        if (!(inV === null || inV === void 0 ? void 0 : inV.length)) {
            return { v };
        }
        {
            const result = { sum: 0, weight: 0 };
            inV === null || inV === void 0 ? void 0 : inV.forEach((e) => {
                const edge = g.edge(e);
                const nodeU = g.node(e.v);
                result.sum += (edge.weight * nodeU.order);
                result.weight += edge.weight;
            });
            return {
                v,
                barycenter: result.sum / result.weight,
                weight: result.weight
            };
        }
    });
};

const resolveConflicts = (entries, cg) => {
    var _a, _b, _c;
    const mappedEntries = {};
    entries === null || entries === void 0 ? void 0 : entries.forEach((entry, i) => {
        mappedEntries[entry.v] = {
            i,
            indegree: 0,
            in: [],
            out: [],
            vs: [entry.v],
        };
        const tmp = mappedEntries[entry.v];
        if (entry.barycenter !== undefined) {
            tmp.barycenter = entry.barycenter;
            tmp.weight = entry.weight;
        }
    });
    (_a = cg.edges()) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
        const entryV = mappedEntries[e.v];
        const entryW = mappedEntries[e.w];
        if (entryV !== undefined && entryW !== undefined) {
            entryW.indegree++;
            entryV.out.push(mappedEntries[e.w]);
        }
    });
    const sourceSet = (_c = (_b = Object.values(mappedEntries)).filter) === null || _c === void 0 ? void 0 : _c.call(_b, (entry) => !entry.indegree);
    return doResolveConflicts(sourceSet);
};
const doResolveConflicts = (sourceSet) => {
    var _a, _b;
    const entries = [];
    const handleIn = (vEntry) => {
        return (uEntry) => {
            if (uEntry.merged)
                return;
            if (uEntry.barycenter === undefined ||
                vEntry.barycenter === undefined ||
                uEntry.barycenter >= vEntry.barycenter) {
                mergeEntries(vEntry, uEntry);
            }
        };
    };
    const handleOut = (vEntry) => {
        return (wEntry) => {
            wEntry["in"].push(vEntry);
            if (--wEntry.indegree === 0) {
                sourceSet.push(wEntry);
            }
        };
    };
    while (sourceSet === null || sourceSet === void 0 ? void 0 : sourceSet.length) {
        const entry = sourceSet.pop();
        entries.push(entry);
        (_a = entry["in"].reverse()) === null || _a === void 0 ? void 0 : _a.forEach((e) => handleIn(entry)(e));
        (_b = entry.out) === null || _b === void 0 ? void 0 : _b.forEach((e) => handleOut(entry)(e));
    }
    const filtered = entries.filter((entry) => !entry.merged);
    const keys = [
        "vs",
        "i",
        "barycenter",
        "weight",
    ];
    return filtered.map((entry) => {
        const picked = {};
        keys === null || keys === void 0 ? void 0 : keys.forEach((key) => {
            if (entry[key] === undefined)
                return;
            picked[key] = entry[key];
        });
        return picked;
    });
};
const mergeEntries = (target, source) => {
    var _a;
    let sum = 0;
    let weight = 0;
    if (target.weight) {
        sum += target.barycenter * target.weight;
        weight += target.weight;
    }
    if (source.weight) {
        sum += source.barycenter * source.weight;
        weight += source.weight;
    }
    target.vs = (_a = source.vs) === null || _a === void 0 ? void 0 : _a.concat(target.vs);
    target.barycenter = sum / weight;
    target.weight = weight;
    target.i = Math.min(source.i, target.i);
    source.merged = true;
};

const sort = (entries, biasRight, usePrev, keepNodeOrder) => {
    const parts = partition(entries, (entry) => {
        const hasFixOrder = entry.hasOwnProperty("fixorder") && !isNaN(entry.fixorder);
        if (keepNodeOrder)
            return !hasFixOrder && entry.hasOwnProperty("barycenter");
        // NOTE: 有fixorder的也可以排
        return hasFixOrder || entry.hasOwnProperty("barycenter");
    });
    const sortable = parts.lhs;
    const unsortable = parts.rhs.sort((a, b) => -a.i - (-b.i));
    const vs = [];
    let sum = 0;
    let weight = 0;
    let vsIndex = 0;
    sortable === null || sortable === void 0 ? void 0 : sortable.sort(compareWithBias(!!biasRight, !!usePrev));
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
    sortable === null || sortable === void 0 ? void 0 : sortable.forEach((entry) => {
        var _a;
        vsIndex += (_a = entry.vs) === null || _a === void 0 ? void 0 : _a.length;
        vs.push(entry.vs);
        sum += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
    });
    const result = { vs: vs.flat() };
    if (weight) {
        result.barycenter = sum / weight;
        result.weight = weight;
    }
    return result;
};
const consumeUnsortable = (vs, unsortable, index) => {
    let iindex = index;
    let last;
    while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= iindex) {
        unsortable.pop();
        vs === null || vs === void 0 ? void 0 : vs.push(last.vs);
        iindex++;
    }
    return iindex;
};
/**
 * 配置是否考虑使用之前的布局结果
 */
const compareWithBias = (bias, usePrev) => {
    return (entryV, entryW) => {
        // 排序的时候先判断fixorder，不行再判断重心
        if (entryV.fixorder !== undefined && entryW.fixorder !== undefined) {
            return entryV.fixorder - entryW.fixorder;
        }
        if (entryV.barycenter < entryW.barycenter) {
            return -1;
        }
        if (entryV.barycenter > entryW.barycenter) {
            return 1;
        }
        // 重心相同，考虑之前排好的顺序
        if (usePrev && entryV.order !== undefined && entryW.order !== undefined) {
            if (entryV.order < entryW.order) {
                return -1;
            }
            if (entryV.order > entryW.order) {
                return 1;
            }
        }
        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
    };
};

const sortSubgraph = (g, v, cg, biasRight, usePrev, keepNodeOrder) => {
    var _a, _b, _c, _d;
    let movable = g.children(v);
    // fixorder的点不参与排序（这个方案不合适，只排了新增节点，和原来的分离）
    const node = g.node(v);
    const bl = node ? node.borderLeft : undefined;
    const br = node ? node.borderRight : undefined;
    const subgraphs = {};
    if (bl) {
        movable = movable === null || movable === void 0 ? void 0 : movable.filter((w) => {
            return w !== bl && w !== br;
        });
    }
    const barycenters = barycenter(g, movable || []);
    barycenters === null || barycenters === void 0 ? void 0 : barycenters.forEach((entry) => {
        var _a;
        if ((_a = g.children(entry.v)) === null || _a === void 0 ? void 0 : _a.length) {
            const subgraphResult = sortSubgraph(g, entry.v, cg, biasRight, keepNodeOrder);
            subgraphs[entry.v] = subgraphResult;
            if (subgraphResult.hasOwnProperty("barycenter")) {
                mergeBarycenters(entry, subgraphResult);
            }
        }
    });
    const entries = resolveConflicts(barycenters, cg);
    expandSubgraphs(entries, subgraphs);
    // 添加fixorder信息到entries里边
    // TODO: 不考虑复合情况，只用第一个点的fixorder信息，后续考虑更完备的实现
    (_a = entries
        .filter((e) => e.vs.length > 0)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
        const node = g.node(e.vs[0]);
        if (node) {
            e.fixorder = node.fixorder;
            e.order = node.order;
        }
    });
    const result = sort(entries, biasRight, usePrev, keepNodeOrder);
    if (bl) {
        result.vs = [bl, result.vs, br].flat();
        if ((_b = g.predecessors(bl)) === null || _b === void 0 ? void 0 : _b.length) {
            const blPred = g.node(((_c = g.predecessors(bl)) === null || _c === void 0 ? void 0 : _c[0]) || "");
            const brPred = g.node(((_d = g.predecessors(br)) === null || _d === void 0 ? void 0 : _d[0]) || "");
            if (!result.hasOwnProperty("barycenter")) {
                result.barycenter = 0;
                result.weight = 0;
            }
            result.barycenter =
                (result.barycenter * result.weight +
                    blPred.order +
                    brPred.order) /
                    (result.weight + 2);
            result.weight += 2;
        }
    }
    return result;
};
const expandSubgraphs = (entries, subgraphs) => {
    entries === null || entries === void 0 ? void 0 : entries.forEach((entry) => {
        var _a;
        const vss = (_a = entry.vs) === null || _a === void 0 ? void 0 : _a.map((v) => {
            if (subgraphs[v]) {
                return subgraphs[v].vs;
            }
            return v;
        });
        entry.vs = vss.flat();
    });
};
const mergeBarycenters = (target, other) => {
    if (target.barycenter !== undefined) {
        target.barycenter =
            (target.barycenter * target.weight + other.barycenter * other.weight) /
                (target.weight + other.weight);
        target.weight += other.weight;
    }
    else {
        target.barycenter = other.barycenter;
        target.weight = other.weight;
    }
};

/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
const order = (g, keepNodeOrder) => {
    const mxRank = maxRank(g);
    const range1 = [];
    const range2 = [];
    for (let i = 1; i < mxRank + 1; i++)
        range1.push(i);
    for (let i = mxRank - 1; i > -1; i--)
        range2.push(i);
    const downLayerGraphs = buildLayerGraphs(g, range1, "inEdges");
    const upLayerGraphs = buildLayerGraphs(g, range2, "outEdges");
    let layering = initOrder(g);
    assignOrder(g, layering);
    let bestCC = Number.POSITIVE_INFINITY;
    let best;
    for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, false, keepNodeOrder);
        layering = buildLayerMatrix(g);
        const cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = clone(layering);
            bestCC = cc;
        }
    }
    // consider use previous result, maybe somewhat reduendant
    layering = initOrder(g);
    assignOrder(g, layering);
    for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, true, keepNodeOrder);
        layering = buildLayerMatrix(g);
        const cc = crossCount(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = clone(layering);
            bestCC = cc;
        }
    }
    assignOrder(g, best);
};
const buildLayerGraphs = (g, ranks, relationship) => {
    return ranks.map((rank) => {
        return buildLayerGraph(g, rank, relationship);
    });
};
const sweepLayerGraphs = (layerGraphs, biasRight, usePrev, keepNodeOrder) => {
    const cg = new Graph();
    layerGraphs === null || layerGraphs === void 0 ? void 0 : layerGraphs.forEach((lg) => {
        var _a;
        const root = lg.graph().root;
        const sorted = sortSubgraph(lg, root, cg, biasRight, usePrev, keepNodeOrder);
        for (let i = 0; i < ((_a = sorted.vs) === null || _a === void 0 ? void 0 : _a.length) || 0; i++) {
            const lnode = lg.node(sorted.vs[i]);
            if (lnode) {
                lnode.order = i;
            }
        }
        addSubgraphConstraints(lg, cg, sorted.vs);
    });
};
const assignOrder = (g, layering) => {
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        layer === null || layer === void 0 ? void 0 : layer.forEach((v, i) => {
            g.node(v).order = i;
        });
    });
};

/*
 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
 * and Simple Horizontal Coordinate Assignment."
 */
class BlockGraph extends Graph$1 {
}
const findType1Conflicts = (g, layering) => {
    const conflicts = {};
    const visitLayer = (prevLayer, layer) => {
        // last visited node in the previous layer that is incident on an inner
        // segment.
        let k0 = 0;
        // Tracks the last node in this layer scanned for crossings with a type-1
        // segment.
        let scanPos = 0;
        const prevLayerLength = prevLayer.length;
        const lastNode = layer === null || layer === void 0 ? void 0 : layer[(layer === null || layer === void 0 ? void 0 : layer.length) - 1];
        layer === null || layer === void 0 ? void 0 : layer.forEach((v, i) => {
            var _a;
            const w = findOtherInnerSegmentNode(g, v);
            const k1 = w ? g.node(w).order : prevLayerLength;
            if (w || v === lastNode) {
                (_a = layer.slice(scanPos, i + 1)) === null || _a === void 0 ? void 0 : _a.forEach((scanNode) => {
                    var _a;
                    (_a = g.predecessors(scanNode)) === null || _a === void 0 ? void 0 : _a.forEach((u) => {
                        var _a;
                        const uLabel = g.node(u);
                        const uPos = uLabel.order;
                        if ((uPos < k0 || k1 < uPos) &&
                            !(uLabel.dummy && ((_a = g.node(scanNode)) === null || _a === void 0 ? void 0 : _a.dummy))) {
                            addConflict(conflicts, u, scanNode);
                        }
                    });
                });
                scanPos = i + 1;
                k0 = k1;
            }
        });
        return layer;
    };
    if (layering === null || layering === void 0 ? void 0 : layering.length) {
        layering.reduce(visitLayer);
    }
    return conflicts;
};
const findType2Conflicts = (g, layering) => {
    const conflicts = {};
    function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
        var _a, _b;
        let v;
        for (let i = southPos; i < southEnd; i++) {
            v = south[i];
            if ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.dummy) {
                (_b = g.predecessors(v)) === null || _b === void 0 ? void 0 : _b.forEach((u) => {
                    const uNode = g.node(u);
                    if (uNode.dummy &&
                        (uNode.order < prevNorthBorder ||
                            uNode.order > nextNorthBorder)) {
                        addConflict(conflicts, u, v);
                    }
                });
            }
        }
    }
    function getScannedKey(params) {
        // south数组可能很大，不适合做key
        return JSON.stringify(params.slice(1));
    }
    function scanIfNeeded(params, scanCache) {
        const cacheKey = getScannedKey(params);
        if (scanCache.get(cacheKey))
            return;
        scan(...params);
        scanCache.set(cacheKey, true);
    }
    const visitLayer = (north, south) => {
        let prevNorthPos = -1;
        let nextNorthPos;
        let southPos = 0;
        const scanned = new Map();
        south === null || south === void 0 ? void 0 : south.forEach((v, southLookahead) => {
            var _a;
            if (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.dummy) === "border") {
                const predecessors = g.predecessors(v) || [];
                if (predecessors.length) {
                    nextNorthPos = g.node(predecessors[0]).order;
                    scanIfNeeded([south, southPos, southLookahead, prevNorthPos, nextNorthPos], scanned);
                    southPos = southLookahead;
                    prevNorthPos = nextNorthPos;
                }
            }
            scanIfNeeded([south, southPos, south.length, nextNorthPos, north.length], scanned);
        });
        return south;
    };
    if (layering === null || layering === void 0 ? void 0 : layering.length) {
        layering.reduce(visitLayer);
    }
    return conflicts;
};
const findOtherInnerSegmentNode = (g, v) => {
    var _a, _b;
    if ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.dummy) {
        return (_b = g.predecessors(v)) === null || _b === void 0 ? void 0 : _b.find((u) => g.node(u).dummy);
    }
};
const addConflict = (conflicts, v, w) => {
    let vv = v;
    let ww = w;
    if (vv > ww) {
        const tmp = vv;
        vv = ww;
        ww = tmp;
    }
    let conflictsV = conflicts[vv];
    if (!conflictsV) {
        conflicts[vv] = conflictsV = {};
    }
    conflictsV[ww] = true;
};
const hasConflict = (conflicts, v, w) => {
    let vv = v;
    let ww = w;
    if (vv > ww) {
        const tmp = v;
        vv = ww;
        ww = tmp;
    }
    return !!conflicts[vv];
};
/*
 * Try to align nodes into vertical "blocks" where possible. This algorithm
 * attempts to align a node with one of its median neighbors. If the edge
 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
 * If a previous node has already formed a block with a node after the node
 * we're trying to form a block with, we also ignore that possibility - our
 * blocks would be split in that scenario.
 */
const verticalAlignment = (g, layering, conflicts, neighborFn) => {
    const root = {};
    const align = {};
    const pos = {};
    // We cache the position here based on the layering because the graph and
    // layering may be out of sync. The layering matrix is manipulated to
    // generate different extreme alignments.
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        layer === null || layer === void 0 ? void 0 : layer.forEach((v, order) => {
            root[v] = v;
            align[v] = v;
            pos[v] = order;
        });
    });
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        let prevIdx = -1;
        layer === null || layer === void 0 ? void 0 : layer.forEach((v) => {
            let ws = neighborFn(v);
            if (ws.length) {
                ws = ws.sort((a, b) => pos[a] - pos[b]);
                const mp = (ws.length - 1) / 2;
                for (let i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
                    const w = ws[i];
                    if (align[v] === v &&
                        prevIdx < pos[w] &&
                        !hasConflict(conflicts, v, w)) {
                        align[w] = v;
                        align[v] = root[v] = root[w];
                        prevIdx = pos[w];
                    }
                }
            }
        });
    });
    return { root, align };
};
const horizontalCompaction = (g, layering, root, align, reverseSep) => {
    var _a;
    // This portion of the algorithm differs from BK due to a number of problems.
    // Instead of their algorithm we construct a new block graph and do two
    // sweeps. The first sweep places blocks with the smallest possible
    // coordinates. The second sweep removes unused space by moving blocks to the
    // greatest coordinates without violating separation.
    const xs = {};
    const blockG = buildBlockGraph(g, layering, root, reverseSep);
    const borderType = reverseSep ? "borderLeft" : "borderRight";
    const iterate = (setXsFunc, nextNodesFunc) => {
        let stack = blockG.nodes();
        let elem = stack.pop();
        const visited = {};
        while (elem) {
            if (visited[elem]) {
                setXsFunc(elem);
            }
            else {
                visited[elem] = true;
                stack.push(elem);
                stack = stack.concat(nextNodesFunc(elem));
            }
            elem = stack.pop();
        }
    };
    // First pass, assign smallest coordinates
    const pass1 = (elem) => {
        xs[elem] = (blockG.inEdges(elem) || []).reduce((acc, e) => {
            return Math.max(acc, (xs[e.v] || 0) + blockG.edge(e));
        }, 0);
    };
    // Second pass, assign greatest coordinates
    const pass2 = (elem) => {
        const min = (blockG.outEdges(elem) || []).reduce((acc, e) => {
            return Math.min(acc, (xs[e.w] || 0) - blockG.edge(e));
        }, Number.POSITIVE_INFINITY);
        const node = g.node(elem);
        if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
            xs[elem] = Math.max(xs[elem], min);
        }
    };
    iterate(pass1, blockG.predecessors.bind(blockG));
    iterate(pass2, blockG.successors.bind(blockG));
    // Assign x coordinates to all nodes
    (_a = Object.values(align)) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
        xs[v] = xs[root[v]];
    });
    return xs;
};
const buildBlockGraph = (g, layering, root, reverseSep) => {
    const blockGraph = new BlockGraph();
    const graphLabel = g.graph();
    const sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        let u;
        layer === null || layer === void 0 ? void 0 : layer.forEach((v) => {
            const vRoot = root[v];
            blockGraph.setNode(vRoot);
            if (u) {
                const uRoot = root[u];
                const prevMax = blockGraph.edgeFromArgs(uRoot, vRoot);
                blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
            }
            u = v;
        });
    });
    return blockGraph;
};
/*
 * Returns the alignment that has the smallest width of the given alignments.
 */
const findSmallestWidthAlignment = (g, xss) => {
    return minBy(Object.values(xss), (xs) => {
        var _a;
        let max = Number.NEGATIVE_INFINITY;
        let min = Number.POSITIVE_INFINITY;
        (_a = Object.keys(xs)) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
            const x = xs[v];
            const halfWidth = width(g, v) / 2;
            max = Math.max(x + halfWidth, max);
            min = Math.min(x - halfWidth, min);
        });
        return max - min;
    });
};
/*
 * Align the coordinates of each of the layout alignments such that
 * left-biased alignments have their minimum coordinate at the same point as
 * the minimum coordinate of the smallest width alignment and right-biased
 * alignments have their maximum coordinate at the same point as the maximum
 * coordinate of the smallest width alignment.
 */
function alignCoordinates(xss, alignTo) {
    // @ts-ignore
    const alignToVals = Object.values(alignTo);
    const alignToMin = Math.min(...alignToVals);
    const alignToMax = Math.max(...alignToVals);
    ["u", "d"].forEach((vert) => {
        ["l", "r"].forEach((horiz) => {
            const alignment = vert + horiz;
            const xs = xss[alignment];
            let delta;
            if (xs === alignTo)
                return;
            const xsVals = Object.values(xs);
            delta =
                horiz === "l"
                    ? alignToMin - Math.min(...xsVals)
                    : alignToMax - Math.max(...xsVals);
            if (delta) {
                xss[alignment] = {};
                Object.keys(xs).forEach((key) => {
                    xss[alignment][key] = xs[key] + delta;
                });
            }
        });
    });
}
const balance = (xss, align) => {
    const result = {};
    Object.keys(xss.ul).forEach((key) => {
        if (align) {
            result[key] = xss[align.toLowerCase()][key];
        }
        else {
            const values = Object.values(xss).map((x) => x[key]);
            result[key] = (values[0] + values[1]) / 2; // (ur + ul) / 2
        }
    });
    return result;
};
const sep = (nodeSep, edgeSep, reverseSep) => {
    return (g, v, w) => {
        const vLabel = g.node(v);
        const wLabel = g.node(w);
        let sum = 0;
        let delta;
        sum += vLabel.width / 2;
        if (vLabel.hasOwnProperty("labelpos")) {
            switch ((vLabel.labelpos || "").toLowerCase()) {
                case "l":
                    delta = -vLabel.width / 2;
                    break;
                case "r":
                    delta = vLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
        sum += wLabel.width / 2;
        if (wLabel.labelpos) {
            switch ((wLabel.labelpos || "").toLowerCase()) {
                case "l":
                    delta = wLabel.width / 2;
                    break;
                case "r":
                    delta = -wLabel.width / 2;
                    break;
            }
        }
        if (delta) {
            sum += reverseSep ? delta : -delta;
        }
        delta = 0;
        return sum;
    };
};
const width = (g, v) => g.node(v).width || 0;

const positionY = (g) => {
    const layering = buildLayerMatrix(g);
    const rankSep = g.graph().ranksep;
    let prevY = 0;
    layering === null || layering === void 0 ? void 0 : layering.forEach((layer) => {
        const heights = layer.map((v) => g.node(v).height);
        const maxHeight = Math.max(...heights, 0);
        layer === null || layer === void 0 ? void 0 : layer.forEach((v) => {
            g.node(v).y = prevY + maxHeight / 2;
        });
        prevY += maxHeight + rankSep;
    });
};
const positionX = (g) => {
    const layering = buildLayerMatrix(g);
    const conflicts = Object.assign(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
    const xss = {};
    let adjustedLayering = [];
    ["u", "d"].forEach((vert) => {
        adjustedLayering =
            vert === "u" ? layering : Object.values(layering).reverse();
        ["l", "r"].forEach((horiz) => {
            if (horiz === "r") {
                adjustedLayering = adjustedLayering.map((inner) => Object.values(inner).reverse());
            }
            const neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            const align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
            const xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
            if (horiz === "r") {
                Object.keys(xs).forEach((xsKey) => (xs[xsKey] = -xs[xsKey]));
            }
            xss[vert + horiz] = xs;
        });
    });
    const smallestWidth = findSmallestWidthAlignment(g, xss);
    smallestWidth && alignCoordinates(xss, smallestWidth);
    return balance(xss, g.graph().align);
};
const position = (g) => {
    var _a;
    const ng = asNonCompoundGraph(g);
    positionY(ng);
    const xs = positionX(ng);
    (_a = Object.keys(xs)) === null || _a === void 0 ? void 0 : _a.forEach((key) => {
        ng.node(key).x = xs[key];
    });
};

/**
 * 按照数据中的结果设置fixorder
 */
const initDataOrder = (g, nodeOrder) => {
    const simpleNodes = g.nodes().filter((v) => {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    const ranks = simpleNodes.map((v) => g.node(v).rank);
    const maxRank = Math.max(...ranks);
    const layers = [];
    for (let i = 0; i < maxRank + 1; i++) {
        layers[i] = [];
    }
    nodeOrder === null || nodeOrder === void 0 ? void 0 : nodeOrder.forEach((n) => {
        const node = g.node(n);
        // 只考虑原有节点，dummy节点需要按照后续算法排出
        if (!node || (node === null || node === void 0 ? void 0 : node.dummy)) {
            return;
        }
        if (!isNaN(node.rank)) {
            node.fixorder = layers[node.rank].length; // 设置fixorder为当层的顺序
            layers[node.rank].push(n);
        }
    });
};

const layout = (g, opts) => {
    const time$1 = opts && opts.debugTiming ? time : notime;
    time$1("layout", () => {
        // 如果在原图基础上修改，继承原图的order结果
        if (opts && !opts.keepNodeOrder && opts.prevGraph) {
            time$1("  inheritOrder", () => {
                inheritOrder(g, opts.prevGraph);
            });
        }
        const layoutGraph = time$1("  buildLayoutGraph", () => {
            return buildLayoutGraph(g);
        });
        // 控制是否为边的label留位置（这会影响是否在边中间添加dummy node）
        if (!(opts && opts.edgeLabelSpace === false)) {
            time$1("  makeSpaceForEdgeLabels", () => {
                makeSpaceForEdgeLabels(layoutGraph);
            });
        }
        // TODO: 暂时处理层级设置不正确时的异常报错，提示设置正确的层级
        try {
            time$1("  runLayout", () => {
                runLayout(layoutGraph, time$1, opts);
            });
        }
        catch (e) {
            if (e.message ===
                "Not possible to find intersection inside of the rectangle") {
                console.error("The following error may be caused by improper layer setting, please make sure your manual layer setting does not violate the graph's structure:\n", e);
                return;
            }
            throw e;
        }
        time$1("  updateInputGraph", () => {
            updateInputGraph(g, layoutGraph);
        });
    });
};
const runLayout = (g, time, opts) => {
    time("    removeSelfEdges", () => {
        removeSelfEdges(g);
    });
    time("    acyclic", () => {
        acyclic.run(g);
    });
    time("    nestingGraph.run", () => {
        nestingGraph.run(g);
    });
    time("    rank", () => {
        rank(asNonCompoundGraph(g));
    });
    time("    injectEdgeLabelProxies", () => {
        injectEdgeLabelProxies(g);
    });
    time("    removeEmptyRanks", () => {
        removeEmptyRanks(g);
    });
    time("    nestingGraph.cleanup", () => {
        nestingGraph.cleanup(g);
    });
    time("    normalizeRanks", () => {
        normalizeRanks(g);
    });
    time("    assignRankMinMax", () => {
        assignRankMinMax(g);
    });
    time("    removeEdgeLabelProxies", () => {
        removeEdgeLabelProxies(g);
    });
    time("    normalize.run", () => {
        normalize.run(g);
    });
    time("    parentDummyChains", () => {
        parentDummyChains(g);
    });
    time("    addBorderSegments", () => {
        addBorderSegments(g);
    });
    if (opts && opts.keepNodeOrder) {
        time("    initDataOrder", () => {
            initDataOrder(g, opts.nodeOrder);
        });
    }
    time("    order", () => {
        order(g, opts === null || opts === void 0 ? void 0 : opts.keepNodeOrder);
    });
    time("    insertSelfEdges", () => {
        insertSelfEdges(g);
    });
    time("    adjustCoordinateSystem", () => {
        coordinateSystem.adjust(g);
    });
    time("    position", () => {
        position(g);
    });
    time("    positionSelfEdges", () => {
        positionSelfEdges(g);
    });
    time("    removeBorderNodes", () => {
        removeBorderNodes(g);
    });
    time("    normalize.undo", () => {
        normalize.undo(g);
    });
    time("    fixupEdgeLabelCoords", () => {
        fixupEdgeLabelCoords(g);
    });
    time("    undoCoordinateSystem", () => {
        coordinateSystem.undo(g);
    });
    time("    translateGraph", () => {
        translateGraph(g);
    });
    time("    assignNodeIntersects", () => {
        assignNodeIntersects(g);
    });
    time("    reversePoints", () => {
        reversePointsForReversedEdges(g);
    });
    time("    acyclic.undo", () => {
        acyclic.undo(g);
    });
};
/**
 * 继承上一个布局中的order，防止翻转
 * TODO: 暂时没有考虑涉及层级变动的布局，只保证原来布局层级和相对顺序不变
 */
const inheritOrder = (currG, prevG) => {
    currG.nodes().forEach((n) => {
        const node = currG.node(n);
        const prevNode = prevG.node(n);
        if (prevNode !== undefined) {
            node.fixorder = prevNode._order;
            delete prevNode._order;
        }
        else {
            delete node.fixorder;
        }
    });
};
/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */
const updateInputGraph = (inputGraph, layoutGraph) => {
    inputGraph.nodes().forEach((v) => {
        var _a;
        const inputLabel = inputGraph.node(v);
        if (inputLabel) {
            const layoutLabel = layoutGraph.node(v);
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
            inputLabel._order = layoutLabel.order;
            inputLabel._rank = layoutLabel.rank;
            if ((_a = layoutGraph.children(v)) === null || _a === void 0 ? void 0 : _a.length) {
                inputLabel.width = layoutLabel.width;
                inputLabel.height = layoutLabel.height;
            }
        }
    });
    inputGraph.edges().forEach((e) => {
        const inputLabel = inputGraph.edge(e);
        const layoutLabel = layoutGraph.edge(e);
        inputLabel.points = layoutLabel ? layoutLabel.points : [];
        if (layoutLabel && layoutLabel.hasOwnProperty("x")) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
        }
    });
    inputGraph.graph().width = layoutGraph.graph().width;
    inputGraph.graph().height = layoutGraph.graph().height;
};
const graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
const graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
const graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
const nodeNumAttrs = ["width", "height", "layer", "fixorder"]; // 需要传入layer, fixOrder作为参数参考
const nodeDefaults = { width: 0, height: 0 };
const edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
const edgeDefaults = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r",
};
const edgeAttrs = ["labelpos"];
/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */
const buildLayoutGraph = (inputGraph) => {
    const g = new Graph({ multigraph: true, compound: true });
    const graph = canonicalize(inputGraph.graph());
    const pickedProperties = {};
    graphAttrs === null || graphAttrs === void 0 ? void 0 : graphAttrs.forEach((key) => {
        if (graph[key] !== undefined)
            pickedProperties[key] = graph[key];
    });
    g.setGraph(Object.assign({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), pickedProperties));
    inputGraph.nodes().forEach((v) => {
        const node = canonicalize(inputGraph.node(v));
        const defaultNode = Object.assign(Object.assign({}, nodeDefaults), node);
        const defaultAttrs = selectNumberAttrs(defaultNode, nodeNumAttrs);
        g.setNode(v, defaultAttrs);
        g.setParent(v, inputGraph.parent(v));
    });
    inputGraph.edges().forEach((e) => {
        const edge = canonicalize(inputGraph.edge(e));
        const pickedProperties = {};
        edgeAttrs === null || edgeAttrs === void 0 ? void 0 : edgeAttrs.forEach((key) => {
            if (edge[key] !== undefined)
                pickedProperties[key] = edge[key];
        });
        g.setEdgeObj(e, Object.assign({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), pickedProperties));
    });
    return g;
};
/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */
const makeSpaceForEdgeLabels = (g) => {
    const graph = g.graph();
    if (!graph.ranksep)
        graph.ranksep = 0;
    graph.ranksep /= 2;
    g.nodes().forEach((n) => {
        const node = g.node(n);
        if (!isNaN(node.layer)) {
            if (!node.layer)
                node.layer = 0;
        }
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        edge.minlen *= 2;
        if (((_a = edge.labelpos) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== "c") {
            if (graph.rankdir === "TB" || graph.rankdir === "BT") {
                edge.width += edge.labeloffset;
            }
            else {
                edge.height += edge.labeloffset;
            }
        }
    });
};
/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */
const injectEdgeLabelProxies = (g) => {
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge.width && edge.height) {
            const v = g.node(e.v);
            const w = g.node(e.w);
            const label = {
                e,
                rank: (w.rank - v.rank) / 2 + v.rank,
            };
            addDummyNode(g, "edge-proxy", label, "_ep");
        }
    });
};
const assignRankMinMax = (g) => {
    let maxRank = 0;
    g.nodes().forEach((v) => {
        var _a, _b;
        const node = g.node(v);
        if (node.borderTop) {
            node.minRank = (_a = g.node(node.borderTop)) === null || _a === void 0 ? void 0 : _a.rank;
            node.maxRank = (_b = g.node(node.borderBottom)) === null || _b === void 0 ? void 0 : _b.rank;
            maxRank = Math.max(maxRank, node.maxRank || -Infinity);
        }
    });
    g.graph().maxRank = maxRank;
};
const removeEdgeLabelProxies = (g) => {
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node.dummy === "edge-proxy") {
            g.edge(node.e).labelRank = node.rank;
            g.removeNode(v);
        }
    });
};
const translateGraph = (g) => {
    let minX;
    let maxX = 0;
    let minY;
    let maxY = 0;
    const graphLabel = g.graph();
    const marginX = graphLabel.marginx || 0;
    const marginY = graphLabel.marginy || 0;
    const getExtremes = (attrs) => {
        if (!attrs)
            return;
        const x = attrs.x;
        const y = attrs.y;
        const w = attrs.width;
        const h = attrs.height;
        if (!isNaN(x) && !isNaN(w)) {
            if (minX === undefined) {
                minX = x - w / 2;
            }
            minX = Math.min(minX, x - w / 2);
            maxX = Math.max(maxX, x + w / 2);
        }
        if (!isNaN(y) && !isNaN(h)) {
            if (minY === undefined) {
                minY = y - h / 2;
            }
            minY = Math.min(minY, y - h / 2);
            maxY = Math.max(maxY, y + h / 2);
        }
    };
    g.nodes().forEach((v) => {
        getExtremes(g.node(v));
    });
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge === null || edge === void 0 ? void 0 : edge.hasOwnProperty("x")) {
            getExtremes(edge);
        }
    });
    minX -= marginX;
    minY -= marginY;
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node) {
            node.x -= minX;
            node.y -= minY;
        }
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
            p.x -= minX;
            p.y -= minY;
        });
        if (edge.hasOwnProperty("x")) {
            edge.x -= minX;
        }
        if (edge.hasOwnProperty("y")) {
            edge.y -= minY;
        }
    });
    graphLabel.width = maxX - minX + marginX;
    graphLabel.height = maxY - minY + marginY;
};
const assignNodeIntersects = (g) => {
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        const nodeV = g.node(e.v);
        const nodeW = g.node(e.w);
        let p1;
        let p2;
        if (!edge.points) {
            edge.points = [];
            p1 = nodeW;
            p2 = nodeV;
        }
        else {
            p1 = edge.points[0];
            p2 = edge.points[edge.points.length - 1];
        }
        edge.points.unshift(intersectRect(nodeV, p1));
        edge.points.push(intersectRect(nodeW, p2));
    });
};
const fixupEdgeLabelCoords = (g) => {
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge === null || edge === void 0 ? void 0 : edge.hasOwnProperty("x")) {
            if (edge.labelpos === "l" || edge.labelpos === "r") {
                edge.width -= edge.labeloffset;
            }
            switch (edge.labelpos) {
                case "l":
                    edge.x -= edge.width / 2 + edge.labeloffset;
                    break;
                case "r":
                    edge.x += edge.width / 2 + edge.labeloffset;
                    break;
            }
        }
    });
};
const reversePointsForReversedEdges = (g) => {
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        if (edge.reversed) {
            (_a = edge.points) === null || _a === void 0 ? void 0 : _a.reverse();
        }
    });
};
const removeBorderNodes = (g) => {
    g.nodes().forEach((v) => {
        var _a, _b, _c;
        if ((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length) {
            const node = g.node(v);
            const t = g.node(node.borderTop);
            const b = g.node(node.borderBottom);
            const l = g.node(node.borderLeft[((_b = node.borderLeft) === null || _b === void 0 ? void 0 : _b.length) - 1]);
            const r = g.node(node.borderRight[((_c = node.borderRight) === null || _c === void 0 ? void 0 : _c.length) - 1]);
            node.width = Math.abs((r === null || r === void 0 ? void 0 : r.x) - (l === null || l === void 0 ? void 0 : l.x)) || 10;
            node.height = Math.abs((b === null || b === void 0 ? void 0 : b.y) - (t === null || t === void 0 ? void 0 : t.y)) || 10;
            node.x = ((l === null || l === void 0 ? void 0 : l.x) || 0) + node.width / 2;
            node.y = ((t === null || t === void 0 ? void 0 : t.y) || 0) + node.height / 2;
        }
    });
    g.nodes().forEach((v) => {
        var _a;
        if (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.dummy) === "border") {
            g.removeNode(v);
        }
    });
};
const removeSelfEdges = (g) => {
    g.edges().forEach((e) => {
        if (e.v === e.w) {
            const node = g.node(e.v);
            if (!node.selfEdges) {
                node.selfEdges = [];
            }
            node.selfEdges.push({ e, label: g.edge(e) });
            g.removeEdgeObj(e);
        }
    });
};
const insertSelfEdges = (g) => {
    const layers = buildLayerMatrix(g);
    layers === null || layers === void 0 ? void 0 : layers.forEach((layer) => {
        let orderShift = 0;
        layer === null || layer === void 0 ? void 0 : layer.forEach((v, i) => {
            var _a;
            const node = g.node(v);
            node.order = i + orderShift;
            (_a = node.selfEdges) === null || _a === void 0 ? void 0 : _a.forEach((selfEdge) => {
                addDummyNode(g, "selfedge", {
                    width: selfEdge.label.width,
                    height: selfEdge.label.height,
                    rank: node.rank,
                    order: i + ++orderShift,
                    e: selfEdge.e,
                    label: selfEdge.label,
                }, "_se");
            });
            delete node.selfEdges;
        });
    });
};
const positionSelfEdges = (g) => {
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node.dummy === "selfedge") {
            const selfNode = g.node(node.e.v);
            const x = selfNode.x + selfNode.width / 2;
            const y = selfNode.y;
            const dx = node.x - x;
            const dy = selfNode.height / 2;
            g.setEdgeObj(node.e, node.label);
            g.removeNode(v);
            node.label.points = [
                { x: x + (2 * dx) / 3, y: y - dy },
                { x: x + (5 * dx) / 6, y: y - dy },
                { y, x: x + dx },
                { x: x + (5 * dx) / 6, y: y + dy },
                { x: x + (2 * dx) / 3, y: y + dy },
            ];
            node.label.x = node.x;
            node.label.y = node.y;
        }
    });
};
const selectNumberAttrs = (obj, attrs) => {
    const pickedProperties = {};
    attrs === null || attrs === void 0 ? void 0 : attrs.forEach((key) => {
        if (obj[key] === undefined)
            return;
        pickedProperties[key] = (+obj[key]);
    });
    return pickedProperties;
};
const canonicalize = (attrs = {}) => {
    const newAttrs = {};
    Object.keys(attrs).forEach((k) => {
        newAttrs[k.toLowerCase()] = attrs[k];
    });
    return newAttrs;
};

/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
const dagre = {
    layout,
    util: {
        time,
        notime
    },
};

/**
 * @fileOverview dagre layout
 * @author shiwu.wyy@antfin.com
 */
/**
 * 层次布局
 */
class DagreLayout extends Base {
    constructor(options) {
        super();
        /** layout 方向, 可选 TB, BT, LR, RL */
        this.rankdir = "TB";
        /** 节点水平间距(px) */
        this.nodesep = 50;
        /** 每一层节点之间间距 */
        this.ranksep = 50;
        /** 是否保留布局连线的控制点 */
        this.controlPoints = false;
        /** 每层节点是否根据节点数据中的 comboId 进行排序，以防止同层 combo 重叠 */
        this.sortByCombo = false;
        /** 是否保留每条边上的dummy node */
        this.edgeLabelSpace = true;
        /** 是否基于 dagre 进行辐射布局，若是，第一层节点将被放置在最内环上，其余层依次向外辐射 */
        this.radial = false;
        this.nodes = [];
        this.edges = [];
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.layoutNode = (nodeId) => {
            const self = this;
            const { nodes } = self;
            const node = nodes.find((node) => node.id === nodeId);
            if (node) {
                const layout = node.layout !== false;
                return layout;
            }
            return true;
        };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            rankdir: "TB",
            align: undefined,
            nodeSize: undefined,
            nodesepFunc: undefined,
            ranksepFunc: undefined,
            nodesep: 50,
            ranksep: 50,
            controlPoints: false,
            radial: false,
            focusNode: null, // radial 为 true 时生效，关注的节点
        };
    }
    /**
     * 执行布局
     */
    execute() {
        var _a, _b, _c;
        const self = this;
        const { nodes, nodeSize, rankdir, combos, begin, radial, comboEdges = [], vedges = [], } = self;
        if (!nodes)
            return;
        const edges = self.edges || [];
        const g = new Graph({
            multigraph: true,
            compound: true,
        });
        // collect the nodes in their combo, to create virtual edges for comboEdges
        self.nodeMap = {};
        const nodeComboMap = {};
        nodes.forEach((node) => {
            self.nodeMap[node.id] = node;
            if (!node.comboId)
                return;
            nodeComboMap[node.comboId] = nodeComboMap[node.comboId] || [];
            nodeComboMap[node.comboId].push(node.id);
        });
        let nodeSizeFunc;
        if (!nodeSize) {
            nodeSizeFunc = (d) => {
                if (d.size) {
                    if (isArray(d.size)) {
                        return d.size;
                    }
                    if (isObject(d.size)) {
                        return [d.size.width || 40, d.size.height || 40];
                    }
                    return [d.size, d.size];
                }
                return [40, 40];
            };
        }
        else if (isArray(nodeSize)) {
            nodeSizeFunc = () => nodeSize;
        }
        else {
            nodeSizeFunc = () => [nodeSize, nodeSize];
        }
        const ranksepfunc = getFunc(self.ranksep, 50, self.ranksepFunc);
        const nodesepfunc = getFunc(self.nodesep, 50, self.nodesepFunc);
        let horisep = nodesepfunc;
        let vertisep = ranksepfunc;
        if (rankdir === "LR" || rankdir === "RL") {
            horisep = ranksepfunc;
            vertisep = nodesepfunc;
        }
        g.setDefaultEdgeLabel(() => ({}));
        g.setGraph(self);
        const comboMap = {};
        if (this.sortByCombo && combos) {
            combos.forEach((combo) => {
                comboMap[combo.id] = combo;
                // regard the collapsed combo as a node
                if (combo.collapsed) {
                    const size = nodeSizeFunc(combo);
                    const verti = vertisep(combo);
                    const hori = horisep(combo);
                    const width = size[0] + 2 * hori;
                    const height = size[1] + 2 * verti;
                    g.setNode(combo.id, { width, height });
                }
                if (!combo.parentId)
                    return;
                if (!comboMap[combo.parentId]) {
                    g.setNode(combo.parentId, {});
                }
                g.setParent(combo.id, combo.parentId);
            });
        }
        nodes
            .filter((node) => node.layout !== false)
            .forEach((node) => {
            const size = nodeSizeFunc(node);
            const verti = vertisep(node);
            const hori = horisep(node);
            const width = size[0] + 2 * hori;
            const height = size[1] + 2 * verti;
            const layer = node.layer;
            if (isNumber(layer)) {
                // 如果有layer属性，加入到node的label中
                g.setNode(node.id, { width, height, layer });
            }
            else {
                g.setNode(node.id, { width, height });
            }
            if (this.sortByCombo && node.comboId) {
                if (!comboMap[node.comboId]) {
                    comboMap[node.comboId] = { id: node.comboId };
                    g.setNode(node.comboId, {});
                }
                g.setParent(node.id, node.comboId);
            }
        });
        edges.forEach((edge) => {
            // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
            const source = getEdgeTerminal(edge, "source");
            const target = getEdgeTerminal(edge, "target");
            if (this.layoutNode(source) && this.layoutNode(target)) {
                g.setEdge(source, target, {
                    weight: edge.weight || 1,
                });
            }
        });
        // create virtual edges from node to node for comboEdges
        (_a = comboEdges === null || comboEdges === void 0 ? void 0 : comboEdges.concat(vedges || [])) === null || _a === void 0 ? void 0 : _a.forEach((comboEdge) => {
            var _a, _b;
            const { source, target } = comboEdge;
            const sources = ((_a = comboMap[source]) === null || _a === void 0 ? void 0 : _a.collapsed)
                ? [source]
                : nodeComboMap[source] || [source];
            const targets = ((_b = comboMap[target]) === null || _b === void 0 ? void 0 : _b.collapsed)
                ? [target]
                : nodeComboMap[target] || [target];
            sources.forEach((s) => {
                targets.forEach((t) => {
                    g.setEdge(s, t, {
                        weight: comboEdge.weight || 1,
                    });
                });
            });
        });
        // 考虑增量图中的原始图
        let prevGraph = undefined;
        if ((_b = self.preset) === null || _b === void 0 ? void 0 : _b.nodes) {
            prevGraph = new Graph({
                multigraph: true,
                compound: true,
            });
            self.preset.nodes.forEach((node) => {
                prevGraph === null || prevGraph === void 0 ? void 0 : prevGraph.setNode(node.id, node);
            });
        }
        dagre.layout(g, {
            prevGraph,
            edgeLabelSpace: self.edgeLabelSpace,
            keepNodeOrder: Boolean(!!self.nodeOrder),
            nodeOrder: self.nodeOrder,
        });
        const dBegin = [0, 0];
        if (begin) {
            let minX = Infinity;
            let minY = Infinity;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                if (minX > coord.x)
                    minX = coord.x;
                if (minY > coord.y)
                    minY = coord.y;
            });
            g.edges().forEach((edge) => {
                var _a;
                const coord = g.edge(edge);
                (_a = coord.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => {
                    if (minX > point.x)
                        minX = point.x;
                    if (minY > point.y)
                        minY = point.y;
                });
            });
            dBegin[0] = begin[0] - minX;
            dBegin[1] = begin[1] - minY;
        }
        const isHorizontal = rankdir === "LR" || rankdir === "RL";
        // 变形为辐射
        if (radial) {
            const { focusNode, ranksep, getRadialPos } = this;
            const focusId = isString(focusNode) ? focusNode : focusNode === null || focusNode === void 0 ? void 0 : focusNode.id;
            const focusLayer = focusId ? (_c = g.node(focusId)) === null || _c === void 0 ? void 0 : _c._rank : 0;
            const layers = [];
            const dim = isHorizontal ? "y" : "x";
            const sizeDim = isHorizontal ? "height" : "width";
            // 找到整个图作为环的坐标维度（dim）的最大、最小值，考虑节点宽度
            let min = Infinity;
            let max = -Infinity;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                const i = nodes.findIndex((it) => it.id === node);
                if (!nodes[i])
                    return;
                const currentNodesep = nodesepfunc(nodes[i]);
                if (focusLayer === 0) {
                    if (!layers[coord._rank]) {
                        layers[coord._rank] = {
                            nodes: [],
                            totalWidth: 0,
                            maxSize: -Infinity,
                        };
                    }
                    layers[coord._rank].nodes.push(node);
                    layers[coord._rank].totalWidth += currentNodesep * 2 + coord[sizeDim];
                    if (layers[coord._rank].maxSize < Math.max(coord.width, coord.height)) {
                        layers[coord._rank].maxSize = Math.max(coord.width, coord.height);
                    }
                }
                else {
                    const diffLayer = coord._rank - focusLayer;
                    if (diffLayer === 0) {
                        if (!layers[diffLayer]) {
                            layers[diffLayer] = {
                                nodes: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers[diffLayer].nodes.push(node);
                        layers[diffLayer].totalWidth += currentNodesep * 2 + coord[sizeDim];
                        if (layers[diffLayer].maxSize < Math.max(coord.width, coord.height)) {
                            layers[diffLayer].maxSize = Math.max(coord.width, coord.height);
                        }
                    }
                    else {
                        const diffLayerAbs = Math.abs(diffLayer);
                        if (!layers[diffLayerAbs]) {
                            layers[diffLayerAbs] = {
                                left: [],
                                right: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers[diffLayerAbs].totalWidth +=
                            currentNodesep * 2 + coord[sizeDim];
                        if (layers[diffLayerAbs].maxSize < Math.max(coord.width, coord.height)) {
                            layers[diffLayerAbs].maxSize = Math.max(coord.width, coord.height);
                        }
                        if (diffLayer < 0) {
                            layers[diffLayerAbs].left.push(node);
                        }
                        else {
                            layers[diffLayerAbs].right.push(node);
                        }
                    }
                }
                const leftPos = coord[dim] - coord[sizeDim] / 2 - currentNodesep;
                const rightPos = coord[dim] + coord[sizeDim] / 2 + currentNodesep;
                if (leftPos < min)
                    min = leftPos;
                if (rightPos > max)
                    max = rightPos;
            });
            // const padding = (max - min) * 0.1; // TODO
            // 初始化为第一圈的半径，后面根据每层 ranksep 叠加
            let radius = ranksep || 50; // TODO;
            const radiusMap = {};
            // 扩大最大最小值范围，以便为环上留出接缝处的空隙
            const rangeLength = (max - min) / 0.9;
            const range = [
                (min + max - rangeLength) * 0.5,
                (min + max + rangeLength) * 0.5,
            ];
            // 根据半径、分布比例，计算节点在环上的位置，并返回该组节点中最大的 ranksep 值
            const processNodes = (layerNodes, radius, propsMaxRanksep = -Infinity, arcRange = [0, 1]) => {
                let maxRanksep = propsMaxRanksep;
                layerNodes.forEach((node) => {
                    const coord = g.node(node);
                    radiusMap[node] = radius;
                    // 获取变形为 radial 后的直角坐标系坐标
                    const { x: newX, y: newY } = getRadialPos(coord[dim], range, rangeLength, radius, arcRange);
                    // 将新坐标写入源数据
                    const i = nodes.findIndex((it) => it.id === node);
                    if (!nodes[i])
                        return;
                    nodes[i].x = newX + dBegin[0];
                    nodes[i].y = newY + dBegin[1];
                    // @ts-ignore: pass layer order to data for increment layout use
                    nodes[i]._order = coord._order;
                    // 找到本层最大的一个 ranksep，作为下一层与本层的间隙，叠加到下一层的半径上
                    const currentNodeRanksep = ranksepfunc(nodes[i]);
                    if (maxRanksep < currentNodeRanksep)
                        maxRanksep = currentNodeRanksep;
                });
                return maxRanksep;
            };
            let isFirstLevel = true;
            layers.forEach((layerNodes) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!((_a = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.nodes) === null || _a === void 0 ? void 0 : _a.length) &&
                    !((_b = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.left) === null || _b === void 0 ? void 0 : _b.length) &&
                    !((_c = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.right) === null || _c === void 0 ? void 0 : _c.length)) {
                    return;
                }
                // 第一层只有一个节点，直接放在圆心，初始半径设定为 0
                if (isFirstLevel && layerNodes.nodes.length === 1) {
                    // 将新坐标写入源数据
                    const i = nodes.findIndex((it) => it.id === layerNodes.nodes[0]);
                    if (i <= -1)
                        return;
                    nodes[i].x = dBegin[0];
                    nodes[i].y = dBegin[1];
                    radiusMap[layerNodes.nodes[0]] = 0;
                    radius = ranksepfunc(nodes[i]);
                    isFirstLevel = false;
                    return;
                }
                // 为接缝留出空隙，半径也需要扩大
                radius = Math.max(radius, layerNodes.totalWidth / (2 * Math.PI)); // / 0.9;
                let maxRanksep = -Infinity;
                if (focusLayer === 0 || ((_d = layerNodes.nodes) === null || _d === void 0 ? void 0 : _d.length)) {
                    maxRanksep = processNodes(layerNodes.nodes, radius, maxRanksep, [0, 1]); // 0.8
                }
                else {
                    const leftRatio = ((_e = layerNodes.left) === null || _e === void 0 ? void 0 : _e.length) /
                        (((_f = layerNodes.left) === null || _f === void 0 ? void 0 : _f.length) + ((_g = layerNodes.right) === null || _g === void 0 ? void 0 : _g.length));
                    maxRanksep = processNodes(layerNodes.left, radius, maxRanksep, [
                        0,
                        leftRatio,
                    ]); // 接缝留出 0.05 的缝隙
                    maxRanksep = processNodes(layerNodes.right, radius, maxRanksep, [
                        leftRatio + 0.05,
                        1,
                    ]); // 接缝留出 0.05 的缝隙
                }
                radius += maxRanksep;
                isFirstLevel = false;
            });
            g.edges().forEach((edge) => {
                var _a, _b, _c;
                const coord = g.edge(edge);
                const i = edges.findIndex((it) => {
                    const source = getEdgeTerminal(it, "source");
                    const target = getEdgeTerminal(it, "target");
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== "loop") {
                    const otherDim = dim === "x" ? "y" : "x";
                    const controlPoints = (_a = coord === null || coord === void 0 ? void 0 : coord.points) === null || _a === void 0 ? void 0 : _a.slice(1, coord.points.length - 1);
                    const newControlPoints = [];
                    const sourceOtherDimValue = (_b = g.node(edge.v)) === null || _b === void 0 ? void 0 : _b[otherDim];
                    const otherDimDist = sourceOtherDimValue - ((_c = g.node(edge.w)) === null || _c === void 0 ? void 0 : _c[otherDim]);
                    const sourceRadius = radiusMap[edge.v];
                    const radiusDist = sourceRadius - radiusMap[edge.w];
                    controlPoints === null || controlPoints === void 0 ? void 0 : controlPoints.forEach((point) => {
                        // 根据该边的起点、终点半径，及起点、终点、控制点位置关系，确定该控制点的半径
                        const cRadius = ((point[otherDim] - sourceOtherDimValue) / otherDimDist) *
                            radiusDist +
                            sourceRadius;
                        // 获取变形为 radial 后的直角坐标系坐标
                        const newPos = getRadialPos(point[dim], range, rangeLength, cRadius);
                        newControlPoints.push({
                            x: newPos.x + dBegin[0],
                            y: newPos.y + dBegin[1],
                        });
                    });
                    edges[i].controlPoints = newControlPoints;
                }
            });
        }
        else {
            const layerCoords = new Set();
            const isInvert = rankdir === "BT" || rankdir === "RL";
            const layerCoordSort = isInvert
                ? (a, b) => b - a
                : (a, b) => a - b;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                if (!coord)
                    return;
                let ndata = this.nodeMap[node];
                if (!ndata) {
                    ndata = combos === null || combos === void 0 ? void 0 : combos.find((it) => it.id === node);
                }
                if (!ndata)
                    return;
                ndata.x = coord.x + dBegin[0];
                ndata.y = coord.y + dBegin[1];
                // @ts-ignore: pass layer order to data for increment layout use
                ndata._order = coord._order;
                layerCoords.add(isHorizontal ? ndata.x : ndata.y);
            });
            const layerCoordsArr = Array.from(layerCoords).sort(layerCoordSort);
            // pre-define the isHorizontal related functions to avoid redundant calc in interations
            const isDifferentLayer = isHorizontal
                ? (point1, point2) => point1.x !== point2.x
                : (point1, point2) => point1.y !== point2.y;
            const filterControlPointsOutOfBoundary = isHorizontal
                ? (ps, point1, point2) => {
                    const max = Math.max(point1.y, point2.y);
                    const min = Math.min(point1.y, point2.y);
                    return ps.filter((point) => point.y <= max && point.y >= min);
                }
                : (ps, point1, point2) => {
                    const max = Math.max(point1.x, point2.x);
                    const min = Math.min(point1.x, point2.x);
                    return ps.filter((point) => point.x <= max && point.x >= min);
                };
            g.edges().forEach((edge) => {
                const coord = g.edge(edge);
                const i = edges.findIndex((it) => {
                    const source = getEdgeTerminal(it, "source");
                    const target = getEdgeTerminal(it, "target");
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== "loop") {
                    const sourceNode = self.nodeMap[edge.v];
                    const targetNode = self.nodeMap[edge.w];
                    edges[i].controlPoints = getControlPoints(coord === null || coord === void 0 ? void 0 : coord.points, sourceNode, targetNode, layerCoordsArr, isHorizontal, isDifferentLayer, filterControlPointsOutOfBoundary);
                    edges[i].controlPoints.forEach((point) => {
                        point.x += dBegin[0];
                        point.y += dBegin[1];
                    });
                }
            });
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes,
            edges,
        };
    }
    getRadialPos(dimValue, range, rangeLength, radius, arcRange = [0, 1]) {
        // dimRatio 占圆弧的比例
        let dimRatio = (dimValue - range[0]) / rangeLength;
        // 再进一步归一化到指定的范围上
        dimRatio = dimRatio * (arcRange[1] - arcRange[0]) + arcRange[0];
        // 使用最终归一化后的范围计算角度
        const angle = dimRatio * 2 * Math.PI; // 弧度
        // 将极坐标系转换为直角坐标系
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    }
    getType() {
        return "dagre";
    }
}
/**
 * Format controlPoints to avoid polylines crossing nodes
 * @param points
 * @param sourceNode
 * @param targetNode
 * @param layerCoordsArr
 * @param isHorizontal
 * @returns
 */
const getControlPoints = (points, sourceNode, targetNode, layerCoordsArr, isHorizontal, isDifferentLayer, filterControlPointsOutOfBoundary) => {
    let controlPoints = (points === null || points === void 0 ? void 0 : points.slice(1, points.length - 1)) || []; // 去掉头尾
    // 酌情增加控制点，使折线不穿过跨层的节点
    if (sourceNode && targetNode) {
        let { x: sourceX, y: sourceY } = sourceNode;
        let { x: targetX, y: targetY } = targetNode;
        if (isHorizontal) {
            sourceX = sourceNode.y;
            sourceY = sourceNode.x;
            targetX = targetNode.y;
            targetY = targetNode.x;
        }
        // 为跨层级的边增加第一个控制点。忽略垂直的/横向的边。
        // 新控制点 = {
        //   x: 终点x,
        //   y: (起点y + 下一层y) / 2,   #下一层y可能不等于终点y
        // }
        if (targetY !== sourceY && sourceX !== targetX) {
            const sourceLayer = layerCoordsArr.indexOf(sourceY);
            const sourceNextLayerCoord = layerCoordsArr[sourceLayer + 1];
            if (sourceNextLayerCoord) {
                const firstControlPoint = controlPoints[0];
                const insertStartControlPoint = isHorizontal
                    ? {
                        x: (sourceY + sourceNextLayerCoord) / 2,
                        y: (firstControlPoint === null || firstControlPoint === void 0 ? void 0 : firstControlPoint.y) || targetX,
                    }
                    : {
                        x: (firstControlPoint === null || firstControlPoint === void 0 ? void 0 : firstControlPoint.x) || targetX,
                        y: (sourceY + sourceNextLayerCoord) / 2,
                    };
                // 当新增的控制点不存在（!=当前第一个控制点）时添加
                if (!firstControlPoint ||
                    isDifferentLayer(firstControlPoint, insertStartControlPoint)) {
                    controlPoints.unshift(insertStartControlPoint);
                }
            }
            const targetLayer = layerCoordsArr.indexOf(targetY);
            const layerDiff = Math.abs(targetLayer - sourceLayer);
            if (layerDiff === 1) {
                controlPoints = filterControlPointsOutOfBoundary(controlPoints, sourceNode, targetNode);
                // one controlPoint at least
                if (!controlPoints.length) {
                    controlPoints.push(isHorizontal
                        ? {
                            x: (sourceY + targetY) / 2,
                            y: sourceX,
                        }
                        : {
                            x: sourceX,
                            y: (sourceY + targetY) / 2,
                        });
                }
            }
            else if (layerDiff > 1) {
                const targetLastLayerCoord = layerCoordsArr[targetLayer - 1];
                if (targetLastLayerCoord) {
                    const lastControlPoints = controlPoints[controlPoints.length - 1];
                    const insertEndControlPoint = isHorizontal
                        ? {
                            x: (targetY + targetLastLayerCoord) / 2,
                            y: (lastControlPoints === null || lastControlPoints === void 0 ? void 0 : lastControlPoints.y) || targetX,
                        }
                        : {
                            x: (lastControlPoints === null || lastControlPoints === void 0 ? void 0 : lastControlPoints.x) || sourceX,
                            y: (targetY + targetLastLayerCoord) / 2,
                        };
                    // 当新增的控制点不存在（!=当前最后一个控制点）时添加
                    if (!lastControlPoints ||
                        isDifferentLayer(lastControlPoints, insertEndControlPoint)) {
                        controlPoints.push(insertEndControlPoint);
                    }
                }
            }
        }
    }
    return controlPoints;
};

var i,a,u,c;!function(e){e[e.META=0]="META",e[e.NODE=1]="NODE",e[e.BRIDGE=2]="BRIDGE";}(i||(i={})),function(e){e[e.INCLUDE=0]="INCLUDE",e[e.EXCLUDE=1]="EXCLUDE",e[e.UNSPECIFIED=2]="UNSPECIFIED";}(a||(a={})),function(e){e[e.META=0]="META",e[e.CORE=1]="CORE",e[e.BRIDGE=2]="BRIDGE";}(u||(u={})),function(e){e[e.META=0]="META",e[e.OP=1]="OP",e[e.SERIES=2]="SERIES";}(c||(c={}));var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function d(e,n){return e(n={exports:{}},n.exports),n.exports}var f=function(){this.__data__=[],this.size=0;};var h=function(e,n){return e===n||e!=e&&n!=n};var l=function(e,n){for(var t=e.length;t--;)if(h(e[t][0],n))return t;return -1},v=Array.prototype.splice;var p=function(e){var n=this.__data__,t=l(n,e);return !(t<0)&&(t==n.length-1?n.pop():v.call(n,t,1),--this.size,!0)};var g=function(e){var n=this.__data__,t=l(n,e);return t<0?void 0:n[t][1]};var y=function(e){return l(this.__data__,e)>-1};var b=function(e,n){var t=this.__data__,r=l(t,e);return r<0?(++this.size,t.push([e,n])):t[r][1]=n,this};function m(e){var n=-1,t=null==e?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1]);}}m.prototype.clear=f,m.prototype.delete=p,m.prototype.get=g,m.prototype.has=y,m.prototype.set=b;var w=m;var E=function(){this.__data__=new w,this.size=0;};var _=function(e){var n=this.__data__,t=n.delete(e);return this.size=n.size,t};var j=function(e){return this.__data__.get(e)};var x=function(e){return this.__data__.has(e)},N="object"==typeof s&&s&&s.Object===Object&&s,O="object"==typeof self&&self&&self.Object===Object&&self,k=N||O||Function("return this")(),I=k.Symbol,S=Object.prototype,M=S.hasOwnProperty,C=S.toString,G=I?I.toStringTag:void 0;var B=function(e){var n=M.call(e,G),t=e[G];try{e[G]=void 0;var r=!0;}catch(e){}var o=C.call(e);return r&&(n?e[G]=t:delete e[G]),o},A=Object.prototype.toString;var L=function(e){return A.call(e)},R=I?I.toStringTag:void 0;var T=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":R&&R in Object(e)?B(e):L(e)};var D=function(e){var n=typeof e;return null!=e&&("object"==n||"function"==n)};var P,z=function(e){if(!D(e))return !1;var n=T(e);return "[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n},F=k["__core-js_shared__"],U=(P=/[^.]+$/.exec(F&&F.keys&&F.keys.IE_PROTO||""))?"Symbol(src)_1."+P:"";var V=function(e){return !!U&&U in e},$=Function.prototype.toString;var H=function(e){if(null!=e){try{return $.call(e)}catch(e){}try{return e+""}catch(e){}}return ""},W=/^\[object .+?Constructor\]$/,q=Function.prototype,Y=Object.prototype,J=q.toString,X=Y.hasOwnProperty,K=RegExp("^"+J.call(X).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var Q=function(e){return !(!D(e)||V(e))&&(z(e)?K:W).test(H(e))};var Z=function(e,n){return null==e?void 0:e[n]};var ee=function(e,n){var t=Z(e,n);return Q(t)?t:void 0},ne=ee(k,"Map"),te=ee(Object,"create");var re=function(){this.__data__=te?te(null):{},this.size=0;};var oe=function(e){var n=this.has(e)&&delete this.__data__[e];return this.size-=n?1:0,n},ie=Object.prototype.hasOwnProperty;var ae=function(e){var n=this.__data__;if(te){var t=n[e];return "__lodash_hash_undefined__"===t?void 0:t}return ie.call(n,e)?n[e]:void 0},ue=Object.prototype.hasOwnProperty;var ce=function(e){var n=this.__data__;return te?void 0!==n[e]:ue.call(n,e)};var se=function(e,n){var t=this.__data__;return this.size+=this.has(e)?0:1,t[e]=te&&void 0===n?"__lodash_hash_undefined__":n,this};function de(e){var n=-1,t=null==e?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1]);}}de.prototype.clear=re,de.prototype.delete=oe,de.prototype.get=ae,de.prototype.has=ce,de.prototype.set=se;var fe=de;var he=function(){this.size=0,this.__data__={hash:new fe,map:new(ne||w),string:new fe};};var le=function(e){var n=typeof e;return "string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==e:null===e};var ve=function(e,n){var t=e.__data__;return le(n)?t["string"==typeof n?"string":"hash"]:t.map};var pe=function(e){var n=ve(this,e).delete(e);return this.size-=n?1:0,n};var ge=function(e){return ve(this,e).get(e)};var ye=function(e){return ve(this,e).has(e)};var be=function(e,n){var t=ve(this,e),r=t.size;return t.set(e,n),this.size+=t.size==r?0:1,this};function me(e){var n=-1,t=null==e?0:e.length;for(this.clear();++n<t;){var r=e[n];this.set(r[0],r[1]);}}me.prototype.clear=he,me.prototype.delete=pe,me.prototype.get=ge,me.prototype.has=ye,me.prototype.set=be;var we=me;var Ee=function(e,n){var t=this.__data__;if(t instanceof w){var r=t.__data__;if(!ne||r.length<199)return r.push([e,n]),this.size=++t.size,this;t=this.__data__=new we(r);}return t.set(e,n),this.size=t.size,this};function _e(e){var n=this.__data__=new w(e);this.size=n.size;}_e.prototype.clear=E,_e.prototype.delete=_,_e.prototype.get=j,_e.prototype.has=x,_e.prototype.set=Ee;var je=_e;var xe=function(e,n){for(var t=-1,r=null==e?0:e.length;++t<r&&!1!==n(e[t],t,e););return e},Ne=function(){try{var e=ee(Object,"defineProperty");return e({},"",{}),e}catch(e){}}();var Oe=function(e,n,t){"__proto__"==n&&Ne?Ne(e,n,{configurable:!0,enumerable:!0,value:t,writable:!0}):e[n]=t;},ke=Object.prototype.hasOwnProperty;var Ie=function(e,n,t){var r=e[n];ke.call(e,n)&&h(r,t)&&(void 0!==t||n in e)||Oe(e,n,t);};var Se=function(e,n,t,r){var o=!t;t||(t={});for(var i=-1,a=n.length;++i<a;){var u=n[i],c=r?r(t[u],e[u],u,t,e):void 0;void 0===c&&(c=e[u]),o?Oe(t,u,c):Ie(t,u,c);}return t};var Me=function(e,n){for(var t=-1,r=Array(e);++t<e;)r[t]=n(t);return r};var Ce=function(e){return null!=e&&"object"==typeof e};var Ge=function(e){return Ce(e)&&"[object Arguments]"==T(e)},Be=Object.prototype,Ae=Be.hasOwnProperty,Le=Be.propertyIsEnumerable,Re=Ge(function(){return arguments}())?Ge:function(e){return Ce(e)&&Ae.call(e,"callee")&&!Le.call(e,"callee")},Te=Array.isArray;var De=function(){return !1},Pe=d((function(e,n){var t=n&&!n.nodeType&&n,r=t&&e&&!e.nodeType&&e,o=r&&r.exports===t?k.Buffer:void 0,i=(o?o.isBuffer:void 0)||De;e.exports=i;})),ze=/^(?:0|[1-9]\d*)$/;var Fe=function(e,n){var t=typeof e;return !!(n=null==n?9007199254740991:n)&&("number"==t||"symbol"!=t&&ze.test(e))&&e>-1&&e%1==0&&e<n};var Ue=function(e){return "number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991},Ve={};Ve["[object Float32Array]"]=Ve["[object Float64Array]"]=Ve["[object Int8Array]"]=Ve["[object Int16Array]"]=Ve["[object Int32Array]"]=Ve["[object Uint8Array]"]=Ve["[object Uint8ClampedArray]"]=Ve["[object Uint16Array]"]=Ve["[object Uint32Array]"]=!0,Ve["[object Arguments]"]=Ve["[object Array]"]=Ve["[object ArrayBuffer]"]=Ve["[object Boolean]"]=Ve["[object DataView]"]=Ve["[object Date]"]=Ve["[object Error]"]=Ve["[object Function]"]=Ve["[object Map]"]=Ve["[object Number]"]=Ve["[object Object]"]=Ve["[object RegExp]"]=Ve["[object Set]"]=Ve["[object String]"]=Ve["[object WeakMap]"]=!1;var $e=function(e){return Ce(e)&&Ue(e.length)&&!!Ve[T(e)]};var He=function(e){return function(n){return e(n)}},We=d((function(e,n){var t=n&&!n.nodeType&&n,r=t&&e&&!e.nodeType&&e,o=r&&r.exports===t&&N.process,i=function(){try{var e=r&&r.require&&r.require("util").types;return e||o&&o.binding&&o.binding("util")}catch(e){}}();e.exports=i;})),qe=We&&We.isTypedArray,Ye=qe?He(qe):$e,Je=Object.prototype.hasOwnProperty;var Xe=function(e,n){var t=Te(e),r=!t&&Re(e),o=!t&&!r&&Pe(e),i=!t&&!r&&!o&&Ye(e),a=t||r||o||i,u=a?Me(e.length,String):[],c=u.length;for(var s in e)!n&&!Je.call(e,s)||a&&("length"==s||o&&("offset"==s||"parent"==s)||i&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||Fe(s,c))||u.push(s);return u},Ke=Object.prototype;var Qe=function(e){var n=e&&e.constructor;return e===("function"==typeof n&&n.prototype||Ke)};var Ze=function(e,n){return function(t){return e(n(t))}},en=Ze(Object.keys,Object),nn=Object.prototype.hasOwnProperty;var tn=function(e){if(!Qe(e))return en(e);var n=[];for(var t in Object(e))nn.call(e,t)&&"constructor"!=t&&n.push(t);return n};var rn=function(e){return null!=e&&Ue(e.length)&&!z(e)};var on=function(e){return rn(e)?Xe(e):tn(e)};var an=function(e,n){return e&&Se(n,on(n),e)};var un=function(e){var n=[];if(null!=e)for(var t in Object(e))n.push(t);return n},cn=Object.prototype.hasOwnProperty;var sn=function(e){if(!D(e))return un(e);var n=Qe(e),t=[];for(var r in e)("constructor"!=r||!n&&cn.call(e,r))&&t.push(r);return t};var dn=function(e){return rn(e)?Xe(e,!0):sn(e)};var fn=function(e,n){return e&&Se(n,dn(n),e)},hn=d((function(e,n){var t=n&&!n.nodeType&&n,r=t&&e&&!e.nodeType&&e,o=r&&r.exports===t?k.Buffer:void 0,i=o?o.allocUnsafe:void 0;e.exports=function(e,n){if(n)return e.slice();var t=e.length,r=i?i(t):new e.constructor(t);return e.copy(r),r};}));var ln=function(e,n){var t=-1,r=e.length;for(n||(n=Array(r));++t<r;)n[t]=e[t];return n};var vn=function(e,n){for(var t=-1,r=null==e?0:e.length,o=0,i=[];++t<r;){var a=e[t];n(a,t,e)&&(i[o++]=a);}return i};var pn=function(){return []},gn=Object.prototype.propertyIsEnumerable,yn=Object.getOwnPropertySymbols,bn=yn?function(e){return null==e?[]:(e=Object(e),vn(yn(e),(function(n){return gn.call(e,n)})))}:pn;var mn=function(e,n){return Se(e,bn(e),n)};var wn=function(e,n){for(var t=-1,r=n.length,o=e.length;++t<r;)e[o+t]=n[t];return e},En=Ze(Object.getPrototypeOf,Object),_n=Object.getOwnPropertySymbols?function(e){for(var n=[];e;)wn(n,bn(e)),e=En(e);return n}:pn;var jn=function(e,n){return Se(e,_n(e),n)};var xn=function(e,n,t){var r=n(e);return Te(e)?r:wn(r,t(e))};var Nn=function(e){return xn(e,on,bn)};var On=function(e){return xn(e,dn,_n)},kn=ee(k,"DataView"),In=ee(k,"Promise"),Sn=ee(k,"Set"),Mn=ee(k,"WeakMap"),Cn=H(kn),Gn=H(ne),Bn=H(In),An=H(Sn),Ln=H(Mn),Rn=T;(kn&&"[object DataView]"!=Rn(new kn(new ArrayBuffer(1)))||ne&&"[object Map]"!=Rn(new ne)||In&&"[object Promise]"!=Rn(In.resolve())||Sn&&"[object Set]"!=Rn(new Sn)||Mn&&"[object WeakMap]"!=Rn(new Mn))&&(Rn=function(e){var n=T(e),t="[object Object]"==n?e.constructor:void 0,r=t?H(t):"";if(r)switch(r){case Cn:return "[object DataView]";case Gn:return "[object Map]";case Bn:return "[object Promise]";case An:return "[object Set]";case Ln:return "[object WeakMap]"}return n});var Tn=Rn,Dn=Object.prototype.hasOwnProperty;var Pn=function(e){var n=e.length,t=new e.constructor(n);return n&&"string"==typeof e[0]&&Dn.call(e,"index")&&(t.index=e.index,t.input=e.input),t},zn=k.Uint8Array;var Fn=function(e){var n=new e.constructor(e.byteLength);return new zn(n).set(new zn(e)),n};var Un=function(e,n){var t=n?Fn(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.byteLength)},Vn=/\w*$/;var $n=function(e){var n=new e.constructor(e.source,Vn.exec(e));return n.lastIndex=e.lastIndex,n},Hn=I?I.prototype:void 0,Wn=Hn?Hn.valueOf:void 0;var qn=function(e){return Wn?Object(Wn.call(e)):{}};var Yn=function(e,n){var t=n?Fn(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)};var Jn=function(e,n,t){var r=e.constructor;switch(n){case"[object ArrayBuffer]":return Fn(e);case"[object Boolean]":case"[object Date]":return new r(+e);case"[object DataView]":return Un(e,t);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return Yn(e,t);case"[object Map]":return new r;case"[object Number]":case"[object String]":return new r(e);case"[object RegExp]":return $n(e);case"[object Set]":return new r;case"[object Symbol]":return qn(e)}},Xn=Object.create,Kn=function(){function e(){}return function(n){if(!D(n))return {};if(Xn)return Xn(n);e.prototype=n;var t=new e;return e.prototype=void 0,t}}();var Qn=function(e){return "function"!=typeof e.constructor||Qe(e)?{}:Kn(En(e))};var Zn=function(e){return Ce(e)&&"[object Map]"==Tn(e)},et=We&&We.isMap,nt=et?He(et):Zn;var tt=function(e){return Ce(e)&&"[object Set]"==Tn(e)},rt=We&&We.isSet,ot=rt?He(rt):tt,it={};it["[object Arguments]"]=it["[object Array]"]=it["[object ArrayBuffer]"]=it["[object DataView]"]=it["[object Boolean]"]=it["[object Date]"]=it["[object Float32Array]"]=it["[object Float64Array]"]=it["[object Int8Array]"]=it["[object Int16Array]"]=it["[object Int32Array]"]=it["[object Map]"]=it["[object Number]"]=it["[object Object]"]=it["[object RegExp]"]=it["[object Set]"]=it["[object String]"]=it["[object Symbol]"]=it["[object Uint8Array]"]=it["[object Uint8ClampedArray]"]=it["[object Uint16Array]"]=it["[object Uint32Array]"]=!0,it["[object Error]"]=it["[object Function]"]=it["[object WeakMap]"]=!1;var at=function e(n,t,r,o,i,a){var u,c=1&t,s=2&t,d=4&t;if(r&&(u=i?r(n,o,i,a):r(n)),void 0!==u)return u;if(!D(n))return n;var f=Te(n);if(f){if(u=Pn(n),!c)return ln(n,u)}else {var h=Tn(n),l="[object Function]"==h||"[object GeneratorFunction]"==h;if(Pe(n))return hn(n,c);if("[object Object]"==h||"[object Arguments]"==h||l&&!i){if(u=s||l?{}:Qn(n),!c)return s?jn(n,fn(u,n)):mn(n,an(u,n))}else {if(!it[h])return i?n:{};u=Jn(n,h,c);}}a||(a=new je);var v=a.get(n);if(v)return v;a.set(n,u),ot(n)?n.forEach((function(o){u.add(e(o,t,r,o,n,a));})):nt(n)&&n.forEach((function(o,i){u.set(i,e(o,t,r,i,n,a));}));var p=f?void 0:(d?s?On:Nn:s?dn:on)(n);return xe(p||n,(function(o,i){p&&(o=n[i=o]),Ie(u,i,e(o,t,r,i,n,a));})),u};var ut=function(e){return at(e,4)};var ct=function(e){return function(){return e}};var st=function(e){return function(n,t,r){for(var o=-1,i=Object(n),a=r(n),u=a.length;u--;){var c=a[e?u:++o];if(!1===t(i[c],c,i))break}return n}}();var dt=function(e,n){return e&&st(e,n,on)};var ft=function(e,n){return function(t,r){if(null==t)return t;if(!rn(t))return e(t,r);for(var o=t.length,i=n?o:-1,a=Object(t);(n?i--:++i<o)&&!1!==r(a[i],i,a););return t}}(dt);var ht=function(e){return e};var lt=function(e){return "function"==typeof e?e:ht};var vt=function(e,n){return (Te(e)?xe:ft)(e,lt(n))},pt=vt;var gt=function(e,n){var t=[];return ft(e,(function(e,r,o){n(e,r,o)&&t.push(e);})),t};var yt=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this};var bt=function(e){return this.__data__.has(e)};function mt(e){var n=-1,t=null==e?0:e.length;for(this.__data__=new we;++n<t;)this.add(e[n]);}mt.prototype.add=mt.prototype.push=yt,mt.prototype.has=bt;var wt=mt;var Et=function(e,n){for(var t=-1,r=null==e?0:e.length;++t<r;)if(n(e[t],t,e))return !0;return !1};var _t=function(e,n){return e.has(n)};var jt=function(e,n,t,r,o,i){var a=1&t,u=e.length,c=n.length;if(u!=c&&!(a&&c>u))return !1;var s=i.get(e),d=i.get(n);if(s&&d)return s==n&&d==e;var f=-1,h=!0,l=2&t?new wt:void 0;for(i.set(e,n),i.set(n,e);++f<u;){var v=e[f],p=n[f];if(r)var g=a?r(p,v,f,n,e,i):r(v,p,f,e,n,i);if(void 0!==g){if(g)continue;h=!1;break}if(l){if(!Et(n,(function(e,n){if(!_t(l,n)&&(v===e||o(v,e,t,r,i)))return l.push(n)}))){h=!1;break}}else if(v!==p&&!o(v,p,t,r,i)){h=!1;break}}return i.delete(e),i.delete(n),h};var xt=function(e){var n=-1,t=Array(e.size);return e.forEach((function(e,r){t[++n]=[r,e];})),t};var Nt=function(e){var n=-1,t=Array(e.size);return e.forEach((function(e){t[++n]=e;})),t},Ot=I?I.prototype:void 0,kt=Ot?Ot.valueOf:void 0;var It=function(e,n,t,r,o,i,a){switch(t){case"[object DataView]":if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return !1;e=e.buffer,n=n.buffer;case"[object ArrayBuffer]":return !(e.byteLength!=n.byteLength||!i(new zn(e),new zn(n)));case"[object Boolean]":case"[object Date]":case"[object Number]":return h(+e,+n);case"[object Error]":return e.name==n.name&&e.message==n.message;case"[object RegExp]":case"[object String]":return e==n+"";case"[object Map]":var u=xt;case"[object Set]":var c=1&r;if(u||(u=Nt),e.size!=n.size&&!c)return !1;var s=a.get(e);if(s)return s==n;r|=2,a.set(e,n);var d=jt(u(e),u(n),r,o,i,a);return a.delete(e),d;case"[object Symbol]":if(kt)return kt.call(e)==kt.call(n)}return !1},St=Object.prototype.hasOwnProperty;var Mt=function(e,n,t,r,o,i){var a=1&t,u=Nn(e),c=u.length;if(c!=Nn(n).length&&!a)return !1;for(var s=c;s--;){var d=u[s];if(!(a?d in n:St.call(n,d)))return !1}var f=i.get(e),h=i.get(n);if(f&&h)return f==n&&h==e;var l=!0;i.set(e,n),i.set(n,e);for(var v=a;++s<c;){var p=e[d=u[s]],g=n[d];if(r)var y=a?r(g,p,d,n,e,i):r(p,g,d,e,n,i);if(!(void 0===y?p===g||o(p,g,t,r,i):y)){l=!1;break}v||(v="constructor"==d);}if(l&&!v){var b=e.constructor,m=n.constructor;b==m||!("constructor"in e)||!("constructor"in n)||"function"==typeof b&&b instanceof b&&"function"==typeof m&&m instanceof m||(l=!1);}return i.delete(e),i.delete(n),l},Ct=Object.prototype.hasOwnProperty;var Gt=function(e,n,t,r,o,i){var a=Te(e),u=Te(n),c=a?"[object Array]":Tn(e),s=u?"[object Array]":Tn(n),d="[object Object]"==(c="[object Arguments]"==c?"[object Object]":c),f="[object Object]"==(s="[object Arguments]"==s?"[object Object]":s),h=c==s;if(h&&Pe(e)){if(!Pe(n))return !1;a=!0,d=!1;}if(h&&!d)return i||(i=new je),a||Ye(e)?jt(e,n,t,r,o,i):It(e,n,c,t,r,o,i);if(!(1&t)){var l=d&&Ct.call(e,"__wrapped__"),v=f&&Ct.call(n,"__wrapped__");if(l||v){var p=l?e.value():e,g=v?n.value():n;return i||(i=new je),o(p,g,t,r,i)}}return !!h&&(i||(i=new je),Mt(e,n,t,r,o,i))};var Bt=function e(n,t,r,o,i){return n===t||(null==n||null==t||!Ce(n)&&!Ce(t)?n!=n&&t!=t:Gt(n,t,r,o,e,i))};var At=function(e,n,t,r){var o=t.length,i=o,a=!r;if(null==e)return !i;for(e=Object(e);o--;){var u=t[o];if(a&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return !1}for(;++o<i;){var c=(u=t[o])[0],s=e[c],d=u[1];if(a&&u[2]){if(void 0===s&&!(c in e))return !1}else {var f=new je;if(r)var h=r(s,d,c,e,n,f);if(!(void 0===h?Bt(d,s,3,r,f):h))return !1}}return !0};var Lt=function(e){return e==e&&!D(e)};var Rt=function(e){for(var n=on(e),t=n.length;t--;){var r=n[t],o=e[r];n[t]=[r,o,Lt(o)];}return n};var Tt=function(e,n){return function(t){return null!=t&&(t[e]===n&&(void 0!==n||e in Object(t)))}};var Dt=function(e){var n=Rt(e);return 1==n.length&&n[0][2]?Tt(n[0][0],n[0][1]):function(t){return t===e||At(t,e,n)}};var Pt=function(e){return "symbol"==typeof e||Ce(e)&&"[object Symbol]"==T(e)},zt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ft=/^\w*$/;var Ut=function(e,n){if(Te(e))return !1;var t=typeof e;return !("number"!=t&&"symbol"!=t&&"boolean"!=t&&null!=e&&!Pt(e))||(Ft.test(e)||!zt.test(e)||null!=n&&e in Object(n))};function Vt(e,n){if("function"!=typeof e||null!=n&&"function"!=typeof n)throw new TypeError("Expected a function");var t=function(){var r=arguments,o=n?n.apply(this,r):r[0],i=t.cache;if(i.has(o))return i.get(o);var a=e.apply(this,r);return t.cache=i.set(o,a)||i,a};return t.cache=new(Vt.Cache||we),t}Vt.Cache=we;var $t=Vt;var Ht=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Wt=/\\(\\)?/g,qt=function(e){var n=$t(e,(function(e){return 500===t.size&&t.clear(),e})),t=n.cache;return n}((function(e){var n=[];return 46===e.charCodeAt(0)&&n.push(""),e.replace(Ht,(function(e,t,r,o){n.push(r?o.replace(Wt,"$1"):t||e);})),n}));var Yt=function(e,n){for(var t=-1,r=null==e?0:e.length,o=Array(r);++t<r;)o[t]=n(e[t],t,e);return o},Jt=I?I.prototype:void 0,Xt=Jt?Jt.toString:void 0;var Kt=function e(n){if("string"==typeof n)return n;if(Te(n))return Yt(n,e)+"";if(Pt(n))return Xt?Xt.call(n):"";var t=n+"";return "0"==t&&1/n==-Infinity?"-0":t};var Qt=function(e){return null==e?"":Kt(e)};var Zt=function(e,n){return Te(e)?e:Ut(e,n)?[e]:qt(Qt(e))};var er=function(e){if("string"==typeof e||Pt(e))return e;var n=e+"";return "0"==n&&1/e==-Infinity?"-0":n};var nr=function(e,n){for(var t=0,r=(n=Zt(n,e)).length;null!=e&&t<r;)e=e[er(n[t++])];return t&&t==r?e:void 0};var tr=function(e,n,t){var r=null==e?void 0:nr(e,n);return void 0===r?t:r};var rr=function(e,n){return null!=e&&n in Object(e)};var or=function(e,n,t){for(var r=-1,o=(n=Zt(n,e)).length,i=!1;++r<o;){var a=er(n[r]);if(!(i=null!=e&&t(e,a)))break;e=e[a];}return i||++r!=o?i:!!(o=null==e?0:e.length)&&Ue(o)&&Fe(a,o)&&(Te(e)||Re(e))};var ir=function(e,n){return null!=e&&or(e,n,rr)};var ar=function(e,n){return Ut(e)&&Lt(n)?Tt(er(e),n):function(t){var r=tr(t,e);return void 0===r&&r===n?ir(t,e):Bt(n,r,3)}};var ur=function(e){return function(n){return null==n?void 0:n[e]}};var cr=function(e){return function(n){return nr(n,e)}};var sr=function(e){return Ut(e)?ur(er(e)):cr(e)};var dr=function(e){return "function"==typeof e?e:null==e?ht:"object"==typeof e?Te(e)?ar(e[0],e[1]):Dt(e):sr(e)};var fr=function(e,n){return (Te(e)?vn:gt)(e,dr(n))},hr=Object.prototype.hasOwnProperty;var lr=function(e,n){return null!=e&&hr.call(e,n)};var vr=function(e,n){return null!=e&&or(e,n,lr)},pr=Object.prototype.hasOwnProperty;var gr=function(e){if(null==e)return !0;if(rn(e)&&(Te(e)||"string"==typeof e||"function"==typeof e.splice||Pe(e)||Ye(e)||Re(e)))return !e.length;var n=Tn(e);if("[object Map]"==n||"[object Set]"==n)return !e.size;if(Qe(e))return !tn(e).length;for(var t in e)if(pr.call(e,t))return !1;return !0};var yr=function(e){return void 0===e};var br=function(e,n){var t=-1,r=rn(e)?Array(e.length):[];return ft(e,(function(e,o,i){r[++t]=n(e,o,i);})),r};var mr=function(e,n){return (Te(e)?Yt:br)(e,dr(n))};var wr=function(e,n,t,r){var o=-1,i=null==e?0:e.length;for(r&&i&&(t=e[++o]);++o<i;)t=n(t,e[o],o,e);return t};var Er=function(e,n,t,r,o){return o(e,(function(e,o,i){t=r?(r=!1,e):n(t,e,o,i);})),t};var _r=function(e,n,t){var r=Te(e)?wr:Er,o=arguments.length<3;return r(e,dr(n),t,o,ft)};var jr=function(e){return "string"==typeof e||!Te(e)&&Ce(e)&&"[object String]"==T(e)},xr=ur("length"),Nr=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");var Or=function(e){return Nr.test(e)},kr="[\\ud800-\\udfff]",Ir="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",Sr="\\ud83c[\\udffb-\\udfff]",Mr="[^\\ud800-\\udfff]",Cr="(?:\\ud83c[\\udde6-\\uddff]){2}",Gr="[\\ud800-\\udbff][\\udc00-\\udfff]",Br="(?:"+Ir+"|"+Sr+")"+"?",Ar="[\\ufe0e\\ufe0f]?"+Br+("(?:\\u200d(?:"+[Mr,Cr,Gr].join("|")+")[\\ufe0e\\ufe0f]?"+Br+")*"),Lr="(?:"+[Mr+Ir+"?",Ir,Cr,Gr,kr].join("|")+")",Rr=RegExp(Sr+"(?="+Sr+")|"+Lr+Ar,"g");var Tr=function(e){for(var n=Rr.lastIndex=0;Rr.test(e);)++n;return n};var Dr=function(e){return Or(e)?Tr(e):xr(e)};var Pr=function(e){if(null==e)return 0;if(rn(e))return jr(e)?Dr(e):e.length;var n=Tn(e);return "[object Map]"==n||"[object Set]"==n?e.size:tn(e).length};var zr=function(e,n,t){var r=Te(e),o=r||Pe(e)||Ye(e);if(n=dr(n),null==t){var i=e&&e.constructor;t=o?r?new i:[]:D(e)&&z(i)?Kn(En(e)):{};}return (o?xe:dt)(e,(function(e,r,o){return n(t,e,r,o)})),t},Fr=I?I.isConcatSpreadable:void 0;var Ur=function(e){return Te(e)||Re(e)||!!(Fr&&e&&e[Fr])};var Vr=function e(n,t,r,o,i){var a=-1,u=n.length;for(r||(r=Ur),i||(i=[]);++a<u;){var c=n[a];t>0&&r(c)?t>1?e(c,t-1,r,o,i):wn(i,c):o||(i[i.length]=c);}return i};var $r=function(e,n,t){switch(t.length){case 0:return e.call(n);case 1:return e.call(n,t[0]);case 2:return e.call(n,t[0],t[1]);case 3:return e.call(n,t[0],t[1],t[2])}return e.apply(n,t)},Hr=Math.max;var Wr=function(e,n,t){return n=Hr(void 0===n?e.length-1:n,0),function(){for(var r=arguments,o=-1,i=Hr(r.length-n,0),a=Array(i);++o<i;)a[o]=r[n+o];o=-1;for(var u=Array(n+1);++o<n;)u[o]=r[o];return u[n]=t(a),$r(e,this,u)}},qr=Ne?function(e,n){return Ne(e,"toString",{configurable:!0,enumerable:!1,value:ct(n),writable:!0})}:ht,Yr=Date.now;var Jr=function(e){var n=0,t=0;return function(){var r=Yr(),o=16-(r-t);if(t=r,o>0){if(++n>=800)return arguments[0]}else n=0;return e.apply(void 0,arguments)}}(qr);var Xr=function(e,n){return Jr(Wr(e,n,ht),e+"")};var Kr=function(e,n,t,r){for(var o=e.length,i=t+(r?1:-1);r?i--:++i<o;)if(n(e[i],i,e))return i;return -1};var Qr=function(e){return e!=e};var Zr=function(e,n,t){for(var r=t-1,o=e.length;++r<o;)if(e[r]===n)return r;return -1};var eo=function(e,n,t){return n==n?Zr(e,n,t):Kr(e,Qr,t)};var no=function(e,n){return !!(null==e?0:e.length)&&eo(e,n,0)>-1};var to=function(e,n,t){for(var r=-1,o=null==e?0:e.length;++r<o;)if(t(n,e[r]))return !0;return !1};var ro=function(){},oo=Sn&&1/Nt(new Sn([,-0]))[1]==1/0?function(e){return new Sn(e)}:ro;var io=function(e,n,t){var r=-1,o=no,i=e.length,a=!0,u=[],c=u;if(t)a=!1,o=to;else if(i>=200){var s=n?null:oo(e);if(s)return Nt(s);a=!1,o=_t,c=new wt;}else c=n?[]:u;e:for(;++r<i;){var d=e[r],f=n?n(d):d;if(d=t||0!==d?d:0,a&&f==f){for(var h=c.length;h--;)if(c[h]===f)continue e;n&&c.push(f),u.push(d);}else o(c,f,t)||(c!==u&&c.push(f),u.push(d));}return u};var ao=function(e){return Ce(e)&&rn(e)},uo=Xr((function(e){return io(Vr(e,1,ao,!0))}));var co=function(e,n){return Yt(n,(function(n){return e[n]}))};var so,fo=function(e){return null==e?[]:co(e,on(e))};try{so={clone:ut,constant:ct,each:pt,filter:fr,has:vr,isArray:Te,isEmpty:gr,isFunction:z,isUndefined:yr,keys:on,map:mr,reduce:_r,size:Pr,transform:zr,union:uo,values:fo};}catch(e){}so||(so=window._);var ho=so;function vo(e){this._isDirected=!ho.has(e,"directed")||e.directed,this._isMultigraph=!!ho.has(e,"multigraph")&&e.multigraph,this._isCompound=!!ho.has(e,"compound")&&e.compound,this._label=void 0,this._defaultNodeLabelFn=ho.constant(void 0),this._defaultEdgeLabelFn=ho.constant(void 0),this._nodes={},this._isCompound&&(this._parent={},this._children={},this._children["\0"]={}),this._in={},this._preds={},this._out={},this._sucs={},this._edgeObjs={},this._edgeLabels={};}function po(e,n){e[n]?e[n]++:e[n]=1;}function go(e,n){--e[n]||delete e[n];}function yo(e,n,t,r){var o=""+n,i=""+t;if(!e&&o>i){var a=o;o=i,i=a;}return o+""+i+""+(ho.isUndefined(r)?"\0":r)}function bo(e,n,t,r){var o=""+n,i=""+t;if(!e&&o>i){var a=o;o=i,i=a;}var u={v:o,w:i};return r&&(u.name=r),u}function mo(e,n){return yo(e,n.v,n.w,n.name)}vo.prototype._nodeCount=0,vo.prototype._edgeCount=0,vo.prototype.isDirected=function(){return this._isDirected},vo.prototype.isMultigraph=function(){return this._isMultigraph},vo.prototype.isCompound=function(){return this._isCompound},vo.prototype.setGraph=function(e){return this._label=e,this},vo.prototype.graph=function(){return this._label},vo.prototype.setDefaultNodeLabel=function(e){return ho.isFunction(e)||(e=ho.constant(e)),this._defaultNodeLabelFn=e,this},vo.prototype.nodeCount=function(){return this._nodeCount},vo.prototype.nodes=function(){return ho.keys(this._nodes)},vo.prototype.sources=function(){var e=this;return ho.filter(this.nodes(),(function(n){return ho.isEmpty(e._in[n])}))},vo.prototype.sinks=function(){var e=this;return ho.filter(this.nodes(),(function(n){return ho.isEmpty(e._out[n])}))},vo.prototype.setNodes=function(e,n){var t=arguments,r=this;return ho.each(e,(function(e){t.length>1?r.setNode(e,n):r.setNode(e);})),this},vo.prototype.setNode=function(e,n){return ho.has(this._nodes,e)?(arguments.length>1&&(this._nodes[e]=n),this):(this._nodes[e]=arguments.length>1?n:this._defaultNodeLabelFn(e),this._isCompound&&(this._parent[e]="\0",this._children[e]={},this._children["\0"][e]=!0),this._in[e]={},this._preds[e]={},this._out[e]={},this._sucs[e]={},++this._nodeCount,this)},vo.prototype.node=function(e){return this._nodes[e]},vo.prototype.hasNode=function(e){return ho.has(this._nodes,e)},vo.prototype.removeNode=function(e){var n=this;if(ho.has(this._nodes,e)){var t=function(e){n.removeEdge(n._edgeObjs[e]);};delete this._nodes[e],this._isCompound&&(this._removeFromParentsChildList(e),delete this._parent[e],ho.each(this.children(e),(function(e){n.setParent(e);})),delete this._children[e]),ho.each(ho.keys(this._in[e]),t),delete this._in[e],delete this._preds[e],ho.each(ho.keys(this._out[e]),t),delete this._out[e],delete this._sucs[e],--this._nodeCount;}return this},vo.prototype.setParent=function(e,n){if(!this._isCompound)throw new Error("Cannot set parent in a non-compound graph");if(ho.isUndefined(n))n="\0";else {for(var t=n+="";!ho.isUndefined(t);t=this.parent(t))if(t===e)throw new Error("Setting "+n+" as parent of "+e+" would create a cycle");this.setNode(n);}return this.setNode(e),this._removeFromParentsChildList(e),this._parent[e]=n,this._children[n][e]=!0,this},vo.prototype._removeFromParentsChildList=function(e){delete this._children[this._parent[e]][e];},vo.prototype.parent=function(e){if(this._isCompound){var n=this._parent[e];if("\0"!==n)return n}},vo.prototype.children=function(e){if(ho.isUndefined(e)&&(e="\0"),this._isCompound){var n=this._children[e];if(n)return ho.keys(n)}else {if("\0"===e)return this.nodes();if(this.hasNode(e))return []}},vo.prototype.predecessors=function(e){var n=this._preds[e];if(n)return ho.keys(n)},vo.prototype.successors=function(e){var n=this._sucs[e];if(n)return ho.keys(n)},vo.prototype.neighbors=function(e){var n=this.predecessors(e);if(n)return ho.union(n,this.successors(e))},vo.prototype.isLeaf=function(e){return 0===(this.isDirected()?this.successors(e):this.neighbors(e)).length},vo.prototype.filterNodes=function(e){var n=new this.constructor({directed:this._isDirected,multigraph:this._isMultigraph,compound:this._isCompound});n.setGraph(this.graph());var t=this;ho.each(this._nodes,(function(t,r){e(r)&&n.setNode(r,t);})),ho.each(this._edgeObjs,(function(e){n.hasNode(e.v)&&n.hasNode(e.w)&&n.setEdge(e,t.edge(e));}));var r={};function o(e){var i=t.parent(e);return void 0===i||n.hasNode(i)?(r[e]=i,i):i in r?r[i]:o(i)}return this._isCompound&&ho.each(n.nodes(),(function(e){n.setParent(e,o(e));})),n},vo.prototype.setDefaultEdgeLabel=function(e){return ho.isFunction(e)||(e=ho.constant(e)),this._defaultEdgeLabelFn=e,this},vo.prototype.edgeCount=function(){return this._edgeCount},vo.prototype.edges=function(){return ho.values(this._edgeObjs)},vo.prototype.setPath=function(e,n){var t=this,r=arguments;return ho.reduce(e,(function(e,o){return r.length>1?t.setEdge(e,o,n):t.setEdge(e,o),o})),this},vo.prototype.setEdge=function(){var e,n,t,r,o=!1,i=arguments[0];"object"==typeof i&&null!==i&&"v"in i?(e=i.v,n=i.w,t=i.name,2===arguments.length&&(r=arguments[1],o=!0)):(e=i,n=arguments[1],t=arguments[3],arguments.length>2&&(r=arguments[2],o=!0)),e=""+e,n=""+n,ho.isUndefined(t)||(t=""+t);var a=yo(this._isDirected,e,n,t);if(ho.has(this._edgeLabels,a))return o&&(this._edgeLabels[a]=r),this;if(!ho.isUndefined(t)&&!this._isMultigraph)throw new Error("Cannot set a named edge when isMultigraph = false");this.setNode(e),this.setNode(n),this._edgeLabels[a]=o?r:this._defaultEdgeLabelFn(e,n,t);var u=bo(this._isDirected,e,n,t);return e=u.v,n=u.w,Object.freeze(u),this._edgeObjs[a]=u,po(this._preds[n],e),po(this._sucs[e],n),this._in[n][a]=u,this._out[e][a]=u,this._edgeCount++,this},vo.prototype.edge=function(e,n,t){var r=1===arguments.length?mo(this._isDirected,arguments[0]):yo(this._isDirected,e,n,t);return this._edgeLabels[r]},vo.prototype.hasEdge=function(e,n,t){var r=1===arguments.length?mo(this._isDirected,arguments[0]):yo(this._isDirected,e,n,t);return ho.has(this._edgeLabels,r)},vo.prototype.removeEdge=function(e,n,t){var r=1===arguments.length?mo(this._isDirected,arguments[0]):yo(this._isDirected,e,n,t),o=this._edgeObjs[r];return o&&(e=o.v,n=o.w,delete this._edgeLabels[r],delete this._edgeObjs[r],go(this._preds[n],e),go(this._sucs[e],n),delete this._in[n][r],delete this._out[e][r],this._edgeCount--),this},vo.prototype.inEdges=function(e,n){var t=this._in[e];if(t){var r=ho.values(t);return n?ho.filter(r,(function(e){return e.v===n})):r}},vo.prototype.outEdges=function(e,n){var t=this._out[e];if(t){var r=ho.values(t);return n?ho.filter(r,(function(e){return e.w===n})):r}},vo.prototype.nodeEdges=function(e,n){var t=this.inEdges(e,n);if(t)return t.concat(this.outEdges(e,n))};ho.constant(1);ho.constant(1);var Uo=function(e){return at(e,5)};var Vo=function(e,n,t){if(!D(t))return !1;var r=typeof n;return !!("number"==r?rn(t)&&Fe(n,t.length):"string"==r&&n in t)&&h(t[n],e)},$o=Object.prototype,Ho=$o.hasOwnProperty,Wo=Xr((function(e,n){e=Object(e);var t=-1,r=n.length,o=r>2?n[2]:void 0;for(o&&Vo(n[0],n[1],o)&&(r=1);++t<r;)for(var i=n[t],a=dn(i),u=-1,c=a.length;++u<c;){var s=a[u],d=e[s];(void 0===d||h(d,$o[s])&&!Ho.call(e,s))&&(e[s]=i[s]);}return e}));var qo=function(e){return function(n,t,r){var o=Object(n);if(!rn(n)){var i=dr(t);n=on(n),t=function(e){return i(o[e],e,o)};}var a=e(n,t,r);return a>-1?o[i?n[a]:a]:void 0}},Yo=/^\s+|\s+$/g,Jo=/^[-+]0x[0-9a-f]+$/i,Xo=/^0b[01]+$/i,Ko=/^0o[0-7]+$/i,Qo=parseInt;var Zo=function(e){if("number"==typeof e)return e;if(Pt(e))return NaN;if(D(e)){var n="function"==typeof e.valueOf?e.valueOf():e;e=D(n)?n+"":n;}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(Yo,"");var t=Xo.test(e);return t||Ko.test(e)?Qo(e.slice(2),t?2:8):Jo.test(e)?NaN:+e};var ei=function(e){return e?Infinity===(e=Zo(e))||-Infinity===e?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0};var ni=function(e){var n=ei(e),t=n%1;return n==n?t?n-t:n:0},ti=Math.max;var ri=qo((function(e,n,t){var r=null==e?0:e.length;if(!r)return -1;var o=null==t?0:ni(t);return o<0&&(o=ti(r+o,0)),Kr(e,dr(n),o)}));var oi=function(e){return (null==e?0:e.length)?Vr(e,1):[]};var ii=function(e,n){return null==e?e:st(e,lt(n),dn)};var ai=function(e){var n=null==e?0:e.length;return n?e[n-1]:void 0};var ui=function(e,n){var t={};return n=dr(n),dt(e,(function(e,r,o){Oe(t,r,n(e,r,o));})),t};var ci=function(e,n,t){for(var r=-1,o=e.length;++r<o;){var i=e[r],a=n(i);if(null!=a&&(void 0===u?a==a&&!Pt(a):t(a,u)))var u=a,c=i;}return c};var si=function(e,n){return e>n};var di=function(e){return e&&e.length?ci(e,ht,si):void 0};var fi=function(e,n,t){(void 0!==t&&!h(e[n],t)||void 0===t&&!(n in e))&&Oe(e,n,t);},hi=Function.prototype,li=Object.prototype,vi=hi.toString,pi=li.hasOwnProperty,gi=vi.call(Object);var yi=function(e){if(!Ce(e)||"[object Object]"!=T(e))return !1;var n=En(e);if(null===n)return !0;var t=pi.call(n,"constructor")&&n.constructor;return "function"==typeof t&&t instanceof t&&vi.call(t)==gi};var bi=function(e,n){if(("constructor"!==n||"function"!=typeof e[n])&&"__proto__"!=n)return e[n]};var mi=function(e){return Se(e,dn(e))};var wi=function(e,n,t,r,o,i,a){var u=bi(e,t),c=bi(n,t),s=a.get(c);if(s)fi(e,t,s);else {var d=i?i(u,c,t+"",e,n,a):void 0,f=void 0===d;if(f){var h=Te(c),l=!h&&Pe(c),v=!h&&!l&&Ye(c);d=c,h||l||v?Te(u)?d=u:ao(u)?d=ln(u):l?(f=!1,d=hn(c,!0)):v?(f=!1,d=Yn(c,!0)):d=[]:yi(c)||Re(c)?(d=u,Re(u)?d=mi(u):D(u)&&!z(u)||(d=Qn(c))):f=!1;}f&&(a.set(c,d),o(d,c,r,i,a),a.delete(c)),fi(e,t,d);}};var Ei=function e(n,t,r,o,i){n!==t&&st(t,(function(a,u){if(i||(i=new je),D(a))wi(n,t,u,r,e,o,i);else {var c=o?o(bi(n,u),a,u+"",n,t,i):void 0;void 0===c&&(c=a),fi(n,u,c);}}),dn);};var _i=function(e){return Xr((function(n,t){var r=-1,o=t.length,i=o>1?t[o-1]:void 0,a=o>2?t[2]:void 0;for(i=e.length>3&&"function"==typeof i?(o--,i):void 0,a&&Vo(t[0],t[1],a)&&(i=o<3?void 0:i,o=1),n=Object(n);++r<o;){var u=t[r];u&&e(n,u,r,i);}return n}))}((function(e,n,t){Ei(e,n,t);}));var ji=function(e,n){return e<n};var xi=function(e){return e&&e.length?ci(e,ht,ji):void 0};var Ni=function(e,n){return e&&e.length?ci(e,dr(n),ji):void 0},Oi=function(){return k.Date.now()};var ki=function(e,n,t,r){if(!D(e))return e;for(var o=-1,i=(n=Zt(n,e)).length,a=i-1,u=e;null!=u&&++o<i;){var c=er(n[o]),s=t;if("__proto__"===c||"constructor"===c||"prototype"===c)return e;if(o!=a){var d=u[c];void 0===(s=r?r(d,c,u):void 0)&&(s=D(d)?d:Fe(n[o+1])?[]:{});}Ie(u,c,s),u=u[c];}return e};var Ii=function(e,n,t){for(var r=-1,o=n.length,i={};++r<o;){var a=n[r],u=nr(e,a);t(u,a)&&ki(i,Zt(a,e),u);}return i};var Si=function(e,n){return Ii(e,n,(function(n,t){return ir(e,t)}))};var Mi=function(e){return Jr(Wr(e,void 0,oi),e+"")}((function(e,n){return null==e?{}:Si(e,n)})),Ci=Math.ceil,Gi=Math.max;var Bi=function(e,n,t,r){for(var o=-1,i=Gi(Ci((n-e)/(t||1)),0),a=Array(i);i--;)a[r?i:++o]=e,e+=t;return a};var Ai=function(e){return function(n,t,r){return r&&"number"!=typeof r&&Vo(n,t,r)&&(t=r=void 0),n=ei(n),void 0===t?(t=n,n=0):t=ei(t),r=void 0===r?n<t?1:-1:ei(r),Bi(n,t,r,e)}}();var Li=function(e,n){var t=e.length;for(e.sort(n);t--;)e[t]=e[t].value;return e};var Ri=function(e,n){if(e!==n){var t=void 0!==e,r=null===e,o=e==e,i=Pt(e),a=void 0!==n,u=null===n,c=n==n,s=Pt(n);if(!u&&!s&&!i&&e>n||i&&a&&c&&!u&&!s||r&&a&&c||!t&&c||!o)return 1;if(!r&&!i&&!s&&e<n||s&&t&&o&&!r&&!i||u&&t&&o||!a&&o||!c)return -1}return 0};var Ti=function(e,n,t){for(var r=-1,o=e.criteria,i=n.criteria,a=o.length,u=t.length;++r<a;){var c=Ri(o[r],i[r]);if(c)return r>=u?c:c*("desc"==t[r]?-1:1)}return e.index-n.index};var Di=function(e,n,t){n=n.length?Yt(n,(function(e){return Te(e)?function(n){return nr(n,1===e.length?e[0]:e)}:e})):[ht];var r=-1;n=Yt(n,He(dr));var o=br(e,(function(e,t,o){return {criteria:Yt(n,(function(n){return n(e)})),index:++r,value:e}}));return Li(o,(function(e,n){return Ti(e,n,t)}))},Pi=Xr((function(e,n){if(null==e)return [];var t=n.length;return t>1&&Vo(e,n[0],n[1])?n=[]:t>2&&Vo(n[0],n[1],n[2])&&(n=[n[0]]),Di(e,Vr(n,1),[])})),zi=0;var Fi=function(e){var n=++zi;return Qt(e)+n};var Ui=function(e,n,t){for(var r=-1,o=e.length,i=n.length,a={};++r<o;){var u=r<i?n[r]:void 0;t(a,e[r],u);}return a};var Vi,$i=function(e,n){return Ui(e||[],n||[],Ie)};try{Vi={cloneDeep:Uo,constant:ct,defaults:Wo,each:pt,filter:fr,find:ri,flatten:oi,forEach:vt,forIn:ii,has:vr,isUndefined:yr,last:ai,map:mr,mapValues:ui,max:di,merge:_i,min:xi,minBy:Ni,now:Oi,pick:Mi,range:Ai,reduce:_r,sortBy:Pi,uniqueId:Fi,values:fo,zipObject:$i};}catch(e){}Vi||(Vi=window._);var Hi=Vi;Hi.constant(1);

createCommonjsModule(function (module) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var toPrimitive = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var toPropertyKey = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];

function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var defineProperty = createCommonjsModule(function (module) {
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

const _defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty);

createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

createCommonjsModule(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorRuntime$1 = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];
function _regeneratorRuntime() {
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1();

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/**
 * WebGL 枚举值
 * @see http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
 * 使用 babel 插件对常量进行内联，以减少最终打包产物大小
 * @see https://github.com/uber/deck.gl/blob/7.1-release/dev-docs/roadmaps/dist-size-roadmap.md#inline-gl-constants
 * 为了支持 WebGPU，新增 TextureUsage
 * @see https://gpuweb.github.io/gpuweb/#gputextureusage
 */
var gl;
(function (gl) {
  gl[gl["DEPTH_BUFFER_BIT"] = 256] = "DEPTH_BUFFER_BIT";
  gl[gl["STENCIL_BUFFER_BIT"] = 1024] = "STENCIL_BUFFER_BIT";
  gl[gl["COLOR_BUFFER_BIT"] = 16384] = "COLOR_BUFFER_BIT";
  gl[gl["POINTS"] = 0] = "POINTS";
  gl[gl["LINES"] = 1] = "LINES";
  gl[gl["LINE_LOOP"] = 2] = "LINE_LOOP";
  gl[gl["LINE_STRIP"] = 3] = "LINE_STRIP";
  gl[gl["TRIANGLES"] = 4] = "TRIANGLES";
  gl[gl["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
  gl[gl["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
  gl[gl["ZERO"] = 0] = "ZERO";
  gl[gl["ONE"] = 1] = "ONE";
  gl[gl["SRC_COLOR"] = 768] = "SRC_COLOR";
  gl[gl["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
  gl[gl["SRC_ALPHA"] = 770] = "SRC_ALPHA";
  gl[gl["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
  gl[gl["DST_ALPHA"] = 772] = "DST_ALPHA";
  gl[gl["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
  gl[gl["DST_COLOR"] = 774] = "DST_COLOR";
  gl[gl["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
  gl[gl["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
  gl[gl["FUNC_ADD"] = 32774] = "FUNC_ADD";
  gl[gl["BLEND_EQUATION"] = 32777] = "BLEND_EQUATION";
  gl[gl["BLEND_EQUATION_RGB"] = 32777] = "BLEND_EQUATION_RGB";
  gl[gl["BLEND_EQUATION_ALPHA"] = 34877] = "BLEND_EQUATION_ALPHA";
  gl[gl["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
  gl[gl["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
  gl[gl["MAX_EXT"] = 32776] = "MAX_EXT";
  gl[gl["MIN_EXT"] = 32775] = "MIN_EXT";
  gl[gl["BLEND_DST_RGB"] = 32968] = "BLEND_DST_RGB";
  gl[gl["BLEND_SRC_RGB"] = 32969] = "BLEND_SRC_RGB";
  gl[gl["BLEND_DST_ALPHA"] = 32970] = "BLEND_DST_ALPHA";
  gl[gl["BLEND_SRC_ALPHA"] = 32971] = "BLEND_SRC_ALPHA";
  gl[gl["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
  gl[gl["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
  gl[gl["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
  gl[gl["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
  gl[gl["BLEND_COLOR"] = 32773] = "BLEND_COLOR";
  gl[gl["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
  gl[gl["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
  gl[gl["ARRAY_BUFFER_BINDING"] = 34964] = "ARRAY_BUFFER_BINDING";
  gl[gl["ELEMENT_ARRAY_BUFFER_BINDING"] = 34965] = "ELEMENT_ARRAY_BUFFER_BINDING";
  gl[gl["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
  gl[gl["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
  gl[gl["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
  gl[gl["BUFFER_SIZE"] = 34660] = "BUFFER_SIZE";
  gl[gl["BUFFER_USAGE"] = 34661] = "BUFFER_USAGE";
  gl[gl["CURRENT_VERTEX_ATTRIB"] = 34342] = "CURRENT_VERTEX_ATTRIB";
  gl[gl["FRONT"] = 1028] = "FRONT";
  gl[gl["BACK"] = 1029] = "BACK";
  gl[gl["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
  gl[gl["CULL_FACE"] = 2884] = "CULL_FACE";
  gl[gl["BLEND"] = 3042] = "BLEND";
  gl[gl["DITHER"] = 3024] = "DITHER";
  gl[gl["STENCIL_TEST"] = 2960] = "STENCIL_TEST";
  gl[gl["DEPTH_TEST"] = 2929] = "DEPTH_TEST";
  gl[gl["SCISSOR_TEST"] = 3089] = "SCISSOR_TEST";
  gl[gl["POLYGON_OFFSET_FILL"] = 32823] = "POLYGON_OFFSET_FILL";
  gl[gl["SAMPLE_ALPHA_TO_COVERAGE"] = 32926] = "SAMPLE_ALPHA_TO_COVERAGE";
  gl[gl["SAMPLE_COVERAGE"] = 32928] = "SAMPLE_COVERAGE";
  gl[gl["NO_ERROR"] = 0] = "NO_ERROR";
  gl[gl["INVALID_ENUM"] = 1280] = "INVALID_ENUM";
  gl[gl["INVALID_VALUE"] = 1281] = "INVALID_VALUE";
  gl[gl["INVALID_OPERATION"] = 1282] = "INVALID_OPERATION";
  gl[gl["OUT_OF_MEMORY"] = 1285] = "OUT_OF_MEMORY";
  gl[gl["CW"] = 2304] = "CW";
  gl[gl["CCW"] = 2305] = "CCW";
  gl[gl["LINE_WIDTH"] = 2849] = "LINE_WIDTH";
  gl[gl["ALIASED_POINT_SIZE_RANGE"] = 33901] = "ALIASED_POINT_SIZE_RANGE";
  gl[gl["ALIASED_LINE_WIDTH_RANGE"] = 33902] = "ALIASED_LINE_WIDTH_RANGE";
  gl[gl["CULL_FACE_MODE"] = 2885] = "CULL_FACE_MODE";
  gl[gl["FRONT_FACE"] = 2886] = "FRONT_FACE";
  gl[gl["DEPTH_RANGE"] = 2928] = "DEPTH_RANGE";
  gl[gl["DEPTH_WRITEMASK"] = 2930] = "DEPTH_WRITEMASK";
  gl[gl["DEPTH_CLEAR_VALUE"] = 2931] = "DEPTH_CLEAR_VALUE";
  gl[gl["DEPTH_FUNC"] = 2932] = "DEPTH_FUNC";
  gl[gl["STENCIL_CLEAR_VALUE"] = 2961] = "STENCIL_CLEAR_VALUE";
  gl[gl["STENCIL_FUNC"] = 2962] = "STENCIL_FUNC";
  gl[gl["STENCIL_FAIL"] = 2964] = "STENCIL_FAIL";
  gl[gl["STENCIL_PASS_DEPTH_FAIL"] = 2965] = "STENCIL_PASS_DEPTH_FAIL";
  gl[gl["STENCIL_PASS_DEPTH_PASS"] = 2966] = "STENCIL_PASS_DEPTH_PASS";
  gl[gl["STENCIL_REF"] = 2967] = "STENCIL_REF";
  gl[gl["STENCIL_VALUE_MASK"] = 2963] = "STENCIL_VALUE_MASK";
  gl[gl["STENCIL_WRITEMASK"] = 2968] = "STENCIL_WRITEMASK";
  gl[gl["STENCIL_BACK_FUNC"] = 34816] = "STENCIL_BACK_FUNC";
  gl[gl["STENCIL_BACK_FAIL"] = 34817] = "STENCIL_BACK_FAIL";
  gl[gl["STENCIL_BACK_PASS_DEPTH_FAIL"] = 34818] = "STENCIL_BACK_PASS_DEPTH_FAIL";
  gl[gl["STENCIL_BACK_PASS_DEPTH_PASS"] = 34819] = "STENCIL_BACK_PASS_DEPTH_PASS";
  gl[gl["STENCIL_BACK_REF"] = 36003] = "STENCIL_BACK_REF";
  gl[gl["STENCIL_BACK_VALUE_MASK"] = 36004] = "STENCIL_BACK_VALUE_MASK";
  gl[gl["STENCIL_BACK_WRITEMASK"] = 36005] = "STENCIL_BACK_WRITEMASK";
  gl[gl["VIEWPORT"] = 2978] = "VIEWPORT";
  gl[gl["SCISSOR_BOX"] = 3088] = "SCISSOR_BOX";
  gl[gl["COLOR_CLEAR_VALUE"] = 3106] = "COLOR_CLEAR_VALUE";
  gl[gl["COLOR_WRITEMASK"] = 3107] = "COLOR_WRITEMASK";
  gl[gl["UNPACK_ALIGNMENT"] = 3317] = "UNPACK_ALIGNMENT";
  gl[gl["PACK_ALIGNMENT"] = 3333] = "PACK_ALIGNMENT";
  gl[gl["MAX_TEXTURE_SIZE"] = 3379] = "MAX_TEXTURE_SIZE";
  gl[gl["MAX_VIEWPORT_DIMS"] = 3386] = "MAX_VIEWPORT_DIMS";
  gl[gl["SUBPIXEL_BITS"] = 3408] = "SUBPIXEL_BITS";
  gl[gl["RED_BITS"] = 3410] = "RED_BITS";
  gl[gl["GREEN_BITS"] = 3411] = "GREEN_BITS";
  gl[gl["BLUE_BITS"] = 3412] = "BLUE_BITS";
  gl[gl["ALPHA_BITS"] = 3413] = "ALPHA_BITS";
  gl[gl["DEPTH_BITS"] = 3414] = "DEPTH_BITS";
  gl[gl["STENCIL_BITS"] = 3415] = "STENCIL_BITS";
  gl[gl["POLYGON_OFFSET_UNITS"] = 10752] = "POLYGON_OFFSET_UNITS";
  gl[gl["POLYGON_OFFSET_FACTOR"] = 32824] = "POLYGON_OFFSET_FACTOR";
  gl[gl["TEXTURE_BINDING_2D"] = 32873] = "TEXTURE_BINDING_2D";
  gl[gl["SAMPLE_BUFFERS"] = 32936] = "SAMPLE_BUFFERS";
  gl[gl["SAMPLES"] = 32937] = "SAMPLES";
  gl[gl["SAMPLE_COVERAGE_VALUE"] = 32938] = "SAMPLE_COVERAGE_VALUE";
  gl[gl["SAMPLE_COVERAGE_INVERT"] = 32939] = "SAMPLE_COVERAGE_INVERT";
  gl[gl["COMPRESSED_TEXTURE_FORMATS"] = 34467] = "COMPRESSED_TEXTURE_FORMATS";
  gl[gl["DONT_CARE"] = 4352] = "DONT_CARE";
  gl[gl["FASTEST"] = 4353] = "FASTEST";
  gl[gl["NICEST"] = 4354] = "NICEST";
  gl[gl["GENERATE_MIPMAP_HINT"] = 33170] = "GENERATE_MIPMAP_HINT";
  gl[gl["BYTE"] = 5120] = "BYTE";
  gl[gl["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  gl[gl["SHORT"] = 5122] = "SHORT";
  gl[gl["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  gl[gl["INT"] = 5124] = "INT";
  gl[gl["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  gl[gl["FLOAT"] = 5126] = "FLOAT";
  gl[gl["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
  gl[gl["ALPHA"] = 6406] = "ALPHA";
  gl[gl["RGB"] = 6407] = "RGB";
  gl[gl["RGBA"] = 6408] = "RGBA";
  gl[gl["LUMINANCE"] = 6409] = "LUMINANCE";
  gl[gl["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
  gl[gl["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
  gl[gl["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
  gl[gl["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
  gl[gl["FRAGMENT_SHADER"] = 35632] = "FRAGMENT_SHADER";
  gl[gl["VERTEX_SHADER"] = 35633] = "VERTEX_SHADER";
  gl[gl["MAX_VERTEX_ATTRIBS"] = 34921] = "MAX_VERTEX_ATTRIBS";
  gl[gl["MAX_VERTEX_UNIFORM_VECTORS"] = 36347] = "MAX_VERTEX_UNIFORM_VECTORS";
  gl[gl["MAX_VARYING_VECTORS"] = 36348] = "MAX_VARYING_VECTORS";
  gl[gl["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 35661] = "MAX_COMBINED_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 35660] = "MAX_VERTEX_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_TEXTURE_IMAGE_UNITS"] = 34930] = "MAX_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_FRAGMENT_UNIFORM_VECTORS"] = 36349] = "MAX_FRAGMENT_UNIFORM_VECTORS";
  gl[gl["SHADER_TYPE"] = 35663] = "SHADER_TYPE";
  gl[gl["DELETE_STATUS"] = 35712] = "DELETE_STATUS";
  gl[gl["LINK_STATUS"] = 35714] = "LINK_STATUS";
  gl[gl["VALIDATE_STATUS"] = 35715] = "VALIDATE_STATUS";
  gl[gl["ATTACHED_SHADERS"] = 35717] = "ATTACHED_SHADERS";
  gl[gl["ACTIVE_UNIFORMS"] = 35718] = "ACTIVE_UNIFORMS";
  gl[gl["ACTIVE_ATTRIBUTES"] = 35721] = "ACTIVE_ATTRIBUTES";
  gl[gl["SHADING_LANGUAGE_VERSION"] = 35724] = "SHADING_LANGUAGE_VERSION";
  gl[gl["CURRENT_PROGRAM"] = 35725] = "CURRENT_PROGRAM";
  gl[gl["NEVER"] = 512] = "NEVER";
  gl[gl["LESS"] = 513] = "LESS";
  gl[gl["EQUAL"] = 514] = "EQUAL";
  gl[gl["LEQUAL"] = 515] = "LEQUAL";
  gl[gl["GREATER"] = 516] = "GREATER";
  gl[gl["NOTEQUAL"] = 517] = "NOTEQUAL";
  gl[gl["GEQUAL"] = 518] = "GEQUAL";
  gl[gl["ALWAYS"] = 519] = "ALWAYS";
  gl[gl["KEEP"] = 7680] = "KEEP";
  gl[gl["REPLACE"] = 7681] = "REPLACE";
  gl[gl["INCR"] = 7682] = "INCR";
  gl[gl["DECR"] = 7683] = "DECR";
  gl[gl["INVERT"] = 5386] = "INVERT";
  gl[gl["INCR_WRAP"] = 34055] = "INCR_WRAP";
  gl[gl["DECR_WRAP"] = 34056] = "DECR_WRAP";
  gl[gl["VENDOR"] = 7936] = "VENDOR";
  gl[gl["RENDERER"] = 7937] = "RENDERER";
  gl[gl["VERSION"] = 7938] = "VERSION";
  gl[gl["NEAREST"] = 9728] = "NEAREST";
  gl[gl["LINEAR"] = 9729] = "LINEAR";
  gl[gl["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
  gl[gl["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
  gl[gl["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
  gl[gl["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
  gl[gl["TEXTURE_MAG_FILTER"] = 10240] = "TEXTURE_MAG_FILTER";
  gl[gl["TEXTURE_MIN_FILTER"] = 10241] = "TEXTURE_MIN_FILTER";
  gl[gl["TEXTURE_WRAP_S"] = 10242] = "TEXTURE_WRAP_S";
  gl[gl["TEXTURE_WRAP_T"] = 10243] = "TEXTURE_WRAP_T";
  gl[gl["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
  gl[gl["TEXTURE"] = 5890] = "TEXTURE";
  gl[gl["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
  gl[gl["TEXTURE_BINDING_CUBE_MAP"] = 34068] = "TEXTURE_BINDING_CUBE_MAP";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
  gl[gl["MAX_CUBE_MAP_TEXTURE_SIZE"] = 34076] = "MAX_CUBE_MAP_TEXTURE_SIZE";
  gl[gl["TEXTURE0"] = 33984] = "TEXTURE0";
  gl[gl["TEXTURE1"] = 33985] = "TEXTURE1";
  gl[gl["TEXTURE2"] = 33986] = "TEXTURE2";
  gl[gl["TEXTURE3"] = 33987] = "TEXTURE3";
  gl[gl["TEXTURE4"] = 33988] = "TEXTURE4";
  gl[gl["TEXTURE5"] = 33989] = "TEXTURE5";
  gl[gl["TEXTURE6"] = 33990] = "TEXTURE6";
  gl[gl["TEXTURE7"] = 33991] = "TEXTURE7";
  gl[gl["TEXTURE8"] = 33992] = "TEXTURE8";
  gl[gl["TEXTURE9"] = 33993] = "TEXTURE9";
  gl[gl["TEXTURE10"] = 33994] = "TEXTURE10";
  gl[gl["TEXTURE11"] = 33995] = "TEXTURE11";
  gl[gl["TEXTURE12"] = 33996] = "TEXTURE12";
  gl[gl["TEXTURE13"] = 33997] = "TEXTURE13";
  gl[gl["TEXTURE14"] = 33998] = "TEXTURE14";
  gl[gl["TEXTURE15"] = 33999] = "TEXTURE15";
  gl[gl["TEXTURE16"] = 34000] = "TEXTURE16";
  gl[gl["TEXTURE17"] = 34001] = "TEXTURE17";
  gl[gl["TEXTURE18"] = 34002] = "TEXTURE18";
  gl[gl["TEXTURE19"] = 34003] = "TEXTURE19";
  gl[gl["TEXTURE20"] = 34004] = "TEXTURE20";
  gl[gl["TEXTURE21"] = 34005] = "TEXTURE21";
  gl[gl["TEXTURE22"] = 34006] = "TEXTURE22";
  gl[gl["TEXTURE23"] = 34007] = "TEXTURE23";
  gl[gl["TEXTURE24"] = 34008] = "TEXTURE24";
  gl[gl["TEXTURE25"] = 34009] = "TEXTURE25";
  gl[gl["TEXTURE26"] = 34010] = "TEXTURE26";
  gl[gl["TEXTURE27"] = 34011] = "TEXTURE27";
  gl[gl["TEXTURE28"] = 34012] = "TEXTURE28";
  gl[gl["TEXTURE29"] = 34013] = "TEXTURE29";
  gl[gl["TEXTURE30"] = 34014] = "TEXTURE30";
  gl[gl["TEXTURE31"] = 34015] = "TEXTURE31";
  gl[gl["ACTIVE_TEXTURE"] = 34016] = "ACTIVE_TEXTURE";
  gl[gl["REPEAT"] = 10497] = "REPEAT";
  gl[gl["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
  gl[gl["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
  gl[gl["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
  gl[gl["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
  gl[gl["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
  gl[gl["INT_VEC2"] = 35667] = "INT_VEC2";
  gl[gl["INT_VEC3"] = 35668] = "INT_VEC3";
  gl[gl["INT_VEC4"] = 35669] = "INT_VEC4";
  gl[gl["BOOL"] = 35670] = "BOOL";
  gl[gl["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
  gl[gl["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
  gl[gl["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
  gl[gl["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
  gl[gl["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
  gl[gl["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
  gl[gl["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
  gl[gl["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
  gl[gl["VERTEX_ATTRIB_ARRAY_ENABLED"] = 34338] = "VERTEX_ATTRIB_ARRAY_ENABLED";
  gl[gl["VERTEX_ATTRIB_ARRAY_SIZE"] = 34339] = "VERTEX_ATTRIB_ARRAY_SIZE";
  gl[gl["VERTEX_ATTRIB_ARRAY_STRIDE"] = 34340] = "VERTEX_ATTRIB_ARRAY_STRIDE";
  gl[gl["VERTEX_ATTRIB_ARRAY_TYPE"] = 34341] = "VERTEX_ATTRIB_ARRAY_TYPE";
  gl[gl["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 34922] = "VERTEX_ATTRIB_ARRAY_NORMALIZED";
  gl[gl["VERTEX_ATTRIB_ARRAY_POINTER"] = 34373] = "VERTEX_ATTRIB_ARRAY_POINTER";
  gl[gl["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 34975] = "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING";
  gl[gl["COMPILE_STATUS"] = 35713] = "COMPILE_STATUS";
  gl[gl["LOW_FLOAT"] = 36336] = "LOW_FLOAT";
  gl[gl["MEDIUM_FLOAT"] = 36337] = "MEDIUM_FLOAT";
  gl[gl["HIGH_FLOAT"] = 36338] = "HIGH_FLOAT";
  gl[gl["LOW_INT"] = 36339] = "LOW_INT";
  gl[gl["MEDIUM_INT"] = 36340] = "MEDIUM_INT";
  gl[gl["HIGH_INT"] = 36341] = "HIGH_INT";
  gl[gl["FRAMEBUFFER"] = 36160] = "FRAMEBUFFER";
  gl[gl["RENDERBUFFER"] = 36161] = "RENDERBUFFER";
  gl[gl["RGBA4"] = 32854] = "RGBA4";
  gl[gl["RGB5_A1"] = 32855] = "RGB5_A1";
  gl[gl["RGB565"] = 36194] = "RGB565";
  gl[gl["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
  gl[gl["STENCIL_INDEX"] = 6401] = "STENCIL_INDEX";
  gl[gl["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
  gl[gl["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
  gl[gl["RENDERBUFFER_WIDTH"] = 36162] = "RENDERBUFFER_WIDTH";
  gl[gl["RENDERBUFFER_HEIGHT"] = 36163] = "RENDERBUFFER_HEIGHT";
  gl[gl["RENDERBUFFER_INTERNAL_FORMAT"] = 36164] = "RENDERBUFFER_INTERNAL_FORMAT";
  gl[gl["RENDERBUFFER_RED_SIZE"] = 36176] = "RENDERBUFFER_RED_SIZE";
  gl[gl["RENDERBUFFER_GREEN_SIZE"] = 36177] = "RENDERBUFFER_GREEN_SIZE";
  gl[gl["RENDERBUFFER_BLUE_SIZE"] = 36178] = "RENDERBUFFER_BLUE_SIZE";
  gl[gl["RENDERBUFFER_ALPHA_SIZE"] = 36179] = "RENDERBUFFER_ALPHA_SIZE";
  gl[gl["RENDERBUFFER_DEPTH_SIZE"] = 36180] = "RENDERBUFFER_DEPTH_SIZE";
  gl[gl["RENDERBUFFER_STENCIL_SIZE"] = 36181] = "RENDERBUFFER_STENCIL_SIZE";
  gl[gl["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 36048] = "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE";
  gl[gl["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 36049] = "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME";
  gl[gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 36050] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL";
  gl[gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 36051] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE";
  gl[gl["COLOR_ATTACHMENT0"] = 36064] = "COLOR_ATTACHMENT0";
  gl[gl["DEPTH_ATTACHMENT"] = 36096] = "DEPTH_ATTACHMENT";
  gl[gl["STENCIL_ATTACHMENT"] = 36128] = "STENCIL_ATTACHMENT";
  gl[gl["DEPTH_STENCIL_ATTACHMENT"] = 33306] = "DEPTH_STENCIL_ATTACHMENT";
  gl[gl["NONE"] = 0] = "NONE";
  gl[gl["FRAMEBUFFER_COMPLETE"] = 36053] = "FRAMEBUFFER_COMPLETE";
  gl[gl["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 36054] = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
  gl[gl["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 36055] = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
  gl[gl["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 36057] = "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
  gl[gl["FRAMEBUFFER_UNSUPPORTED"] = 36061] = "FRAMEBUFFER_UNSUPPORTED";
  gl[gl["FRAMEBUFFER_BINDING"] = 36006] = "FRAMEBUFFER_BINDING";
  gl[gl["RENDERBUFFER_BINDING"] = 36007] = "RENDERBUFFER_BINDING";
  gl[gl["MAX_RENDERBUFFER_SIZE"] = 34024] = "MAX_RENDERBUFFER_SIZE";
  gl[gl["INVALID_FRAMEBUFFER_OPERATION"] = 1286] = "INVALID_FRAMEBUFFER_OPERATION";
  gl[gl["UNPACK_FLIP_Y_WEBGL"] = 37440] = "UNPACK_FLIP_Y_WEBGL";
  gl[gl["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 37441] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
  gl[gl["CONTEXT_LOST_WEBGL"] = 37442] = "CONTEXT_LOST_WEBGL";
  gl[gl["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 37443] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
  gl[gl["BROWSER_DEFAULT_WEBGL"] = 37444] = "BROWSER_DEFAULT_WEBGL";
  gl[gl["COPY_SRC"] = 1] = "COPY_SRC";
  gl[gl["COPY_DST"] = 2] = "COPY_DST";
  gl[gl["SAMPLED"] = 4] = "SAMPLED";
  gl[gl["STORAGE"] = 8] = "STORAGE";
  gl[gl["RENDER_ATTACHMENT"] = 16] = "RENDER_ATTACHMENT";
})(gl || (gl = {}));

typeof navigator !== 'undefined' && /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);

var AST_TOKEN_TYPES;
(function (AST_TOKEN_TYPES) {
  AST_TOKEN_TYPES["Void"] = "Void";
  AST_TOKEN_TYPES["Boolean"] = "Boolean";
  AST_TOKEN_TYPES["Float"] = "Float";
  AST_TOKEN_TYPES["Uint32"] = "Uint32";
  AST_TOKEN_TYPES["Int32"] = "Int32";
  AST_TOKEN_TYPES["Vector"] = "Vector";
  AST_TOKEN_TYPES["Vector2Float"] = "vec2<f32>";
  AST_TOKEN_TYPES["Vector3Float"] = "vec3<f32>";
  AST_TOKEN_TYPES["Vector4Float"] = "vec4<f32>";
  AST_TOKEN_TYPES["Vector2Boolean"] = "vec2<bool>";
  AST_TOKEN_TYPES["Vector3Boolean"] = "vec3<bool>";
  AST_TOKEN_TYPES["Vector4Boolean"] = "vec4<bool>";
  AST_TOKEN_TYPES["Vector2Uint"] = "vec2<u32>";
  AST_TOKEN_TYPES["Vector3Uint"] = "vec3<u32>";
  AST_TOKEN_TYPES["Vector4Uint"] = "vec4<u32>";
  AST_TOKEN_TYPES["Vector2Int"] = "vec2<i32>";
  AST_TOKEN_TYPES["Vector3Int"] = "vec3<i32>";
  AST_TOKEN_TYPES["Vector4Int"] = "vec4<i32>";
  AST_TOKEN_TYPES["Matrix"] = "Matrix";
  AST_TOKEN_TYPES["Matrix3x3Float"] = "mat3x3<f32>";
  AST_TOKEN_TYPES["Matrix4x4Float"] = "mat4x4<i32>";
  AST_TOKEN_TYPES["Struct"] = "Struct";
  AST_TOKEN_TYPES["FloatArray"] = "Float[]";
  AST_TOKEN_TYPES["Vector4FloatArray"] = "vec4<f32>[]";
})(AST_TOKEN_TYPES || (AST_TOKEN_TYPES = {}));
var AST_NODE_TYPES;
(function (AST_NODE_TYPES) {
  AST_NODE_TYPES["Program"] = "Program";
  AST_NODE_TYPES["Identifier"] = "Identifier";
  AST_NODE_TYPES["VariableDeclaration"] = "VariableDeclaration";
  AST_NODE_TYPES["BlockStatement"] = "BlockStatement";
  AST_NODE_TYPES["ReturnStatement"] = "ReturnStatement";
  AST_NODE_TYPES["FunctionDeclaration"] = "FunctionDeclaration";
  AST_NODE_TYPES["VariableDeclarator"] = "VariableDeclarator";
  AST_NODE_TYPES["AssignmentExpression"] = "AssignmentExpression";
  AST_NODE_TYPES["LogicalExpression"] = "LogicalExpression";
  AST_NODE_TYPES["BinaryExpression"] = "BinaryExpression";
  AST_NODE_TYPES["ArrayExpression"] = "ArrayExpression";
  AST_NODE_TYPES["UnaryExpression"] = "UnaryExpression";
  AST_NODE_TYPES["UpdateExpression"] = "UpdateExpression";
  AST_NODE_TYPES["FunctionExpression"] = "FunctionExpression";
  AST_NODE_TYPES["MemberExpression"] = "MemberExpression";
  AST_NODE_TYPES["ConditionalExpression"] = "ConditionalExpression";
  AST_NODE_TYPES["ExpressionStatement"] = "ExpressionStatement";
  AST_NODE_TYPES["CallExpression"] = "CallExpression";
  AST_NODE_TYPES["NumThreadStatement"] = "NumThreadStatement";
  AST_NODE_TYPES["StorageStatement"] = "StorageStatement";
  AST_NODE_TYPES["DoWhileStatement"] = "DoWhileStatement";
  AST_NODE_TYPES["WhileStatement"] = "WhileStatement";
  AST_NODE_TYPES["ForStatement"] = "ForStatement";
  AST_NODE_TYPES["BreakStatement"] = "BreakStatement";
  AST_NODE_TYPES["ContinueStatement"] = "ContinueStatement";
  AST_NODE_TYPES["IfStatement"] = "IfStatement";
  AST_NODE_TYPES["ImportedFunctionStatement"] = "ImportedFunctionStatement";
})(AST_NODE_TYPES || (AST_NODE_TYPES = {}));
var STORAGE_CLASS;
(function (STORAGE_CLASS) {
  STORAGE_CLASS["Input"] = "Input";
  STORAGE_CLASS["Output"] = "Output";
  STORAGE_CLASS["Uniform"] = "Uniform";
  STORAGE_CLASS["Workgroup"] = "Workgroup";
  STORAGE_CLASS["UniformConstant"] = "UniformConstant";
  STORAGE_CLASS["Image"] = "Image";
  STORAGE_CLASS["StorageBuffer"] = "StorageBuffer";
  STORAGE_CLASS["Private"] = "Private";
  STORAGE_CLASS["Function"] = "Function";
})(STORAGE_CLASS || (STORAGE_CLASS = {}));
/**
 * 根据目标平台生成 Shader 代码
 * * WebGL GLSL 1.0
 * * WebGPU Chrome/Edge GLSL 4.5 & WGSL @see https://gpuweb.github.io/gpuweb/wgsl.html
 * * Safari WHLSL (maybe deprecated)
 */
var Target;
(function (Target) {
  Target["GLSL100"] = "GLSL100";
  Target["GLSL450"] = "GLSL450";
  Target["WGSL"] = "WGSL";
})(Target || (Target = {}));

createCommonjsModule(function (module, exports) {
(function (global, factory) {
    module.exports = factory() ;
}(commonjsGlobal, (function () {
var isTypedArray = function (x) {
  return (
    x instanceof Uint8Array ||
    x instanceof Uint16Array ||
    x instanceof Uint32Array ||
    x instanceof Int8Array ||
    x instanceof Int16Array ||
    x instanceof Int32Array ||
    x instanceof Float32Array ||
    x instanceof Float64Array ||
    x instanceof Uint8ClampedArray
  )
};

var extend = function (base, opts) {
  var keys = Object.keys(opts);
  for (var i = 0; i < keys.length; ++i) {
    base[keys[i]] = opts[keys[i]];
  }
  return base
};

// Error checking and parameter validation.
//
// Statements for the form `check.someProcedure(...)` get removed by
// a browserify transform for optimized/minified bundles.
//
/* globals atob */
var endl = '\n';

// only used for extracting shader names.  if atob not present, then errors
// will be slightly crappier
function decodeB64 (str) {
  if (typeof atob !== 'undefined') {
    return atob(str)
  }
  return 'base64:' + str
}

function raise (message) {
  var error = new Error('(regl) ' + message);
  console.error(error);
  throw error
}

function check (pred, message) {
  if (!pred) {
    raise(message);
  }
}

function encolon (message) {
  if (message) {
    return ': ' + message
  }
  return ''
}

function checkParameter (param, possibilities, message) {
  if (!(param in possibilities)) {
    raise('unknown parameter (' + param + ')' + encolon(message) +
          '. possible values: ' + Object.keys(possibilities).join());
  }
}

function checkIsTypedArray (data, message) {
  if (!isTypedArray(data)) {
    raise(
      'invalid parameter type' + encolon(message) +
      '. must be a typed array');
  }
}

function standardTypeEh (value, type) {
  switch (type) {
    case 'number': return typeof value === 'number'
    case 'object': return typeof value === 'object'
    case 'string': return typeof value === 'string'
    case 'boolean': return typeof value === 'boolean'
    case 'function': return typeof value === 'function'
    case 'undefined': return typeof value === 'undefined'
    case 'symbol': return typeof value === 'symbol'
  }
}

function checkTypeOf (value, type, message) {
  if (!standardTypeEh(value, type)) {
    raise(
      'invalid parameter type' + encolon(message) +
      '. expected ' + type + ', got ' + (typeof value));
  }
}

function checkNonNegativeInt (value, message) {
  if (!((value >= 0) &&
        ((value | 0) === value))) {
    raise('invalid parameter type, (' + value + ')' + encolon(message) +
          '. must be a nonnegative integer');
  }
}

function checkOneOf (value, list, message) {
  if (list.indexOf(value) < 0) {
    raise('invalid value' + encolon(message) + '. must be one of: ' + list);
  }
}

var constructorKeys = [
  'gl',
  'canvas',
  'container',
  'attributes',
  'pixelRatio',
  'extensions',
  'optionalExtensions',
  'profile',
  'onDone'
];

function checkConstructor (obj) {
  Object.keys(obj).forEach(function (key) {
    if (constructorKeys.indexOf(key) < 0) {
      raise('invalid regl constructor argument "' + key + '". must be one of ' + constructorKeys);
    }
  });
}

function leftPad (str, n) {
  str = str + '';
  while (str.length < n) {
    str = ' ' + str;
  }
  return str
}

function ShaderFile () {
  this.name = 'unknown';
  this.lines = [];
  this.index = {};
  this.hasErrors = false;
}

function ShaderLine (number, line) {
  this.number = number;
  this.line = line;
  this.errors = [];
}

function ShaderError (fileNumber, lineNumber, message) {
  this.file = fileNumber;
  this.line = lineNumber;
  this.message = message;
}

function guessCommand () {
  var error = new Error();
  var stack = (error.stack || error).toString();
  var pat = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(stack);
  if (pat) {
    return pat[1]
  }
  var pat2 = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(stack);
  if (pat2) {
    return pat2[1]
  }
  return 'unknown'
}

function guessCallSite () {
  var error = new Error();
  var stack = (error.stack || error).toString();
  var pat = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(stack);
  if (pat) {
    return pat[1]
  }
  var pat2 = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(stack);
  if (pat2) {
    return pat2[1]
  }
  return 'unknown'
}

function parseSource (source, command) {
  var lines = source.split('\n');
  var lineNumber = 1;
  var fileNumber = 0;
  var files = {
    unknown: new ShaderFile(),
    0: new ShaderFile()
  };
  files.unknown.name = files[0].name = command || guessCommand();
  files.unknown.lines.push(new ShaderLine(0, ''));
  for (var i = 0; i < lines.length; ++i) {
    var line = lines[i];
    var parts = /^\s*#\s*(\w+)\s+(.+)\s*$/.exec(line);
    if (parts) {
      switch (parts[1]) {
        case 'line':
          var lineNumberInfo = /(\d+)(\s+\d+)?/.exec(parts[2]);
          if (lineNumberInfo) {
            lineNumber = lineNumberInfo[1] | 0;
            if (lineNumberInfo[2]) {
              fileNumber = lineNumberInfo[2] | 0;
              if (!(fileNumber in files)) {
                files[fileNumber] = new ShaderFile();
              }
            }
          }
          break
        case 'define':
          var nameInfo = /SHADER_NAME(_B64)?\s+(.*)$/.exec(parts[2]);
          if (nameInfo) {
            files[fileNumber].name = (nameInfo[1]
              ? decodeB64(nameInfo[2])
              : nameInfo[2]);
          }
          break
      }
    }
    files[fileNumber].lines.push(new ShaderLine(lineNumber++, line));
  }
  Object.keys(files).forEach(function (fileNumber) {
    var file = files[fileNumber];
    file.lines.forEach(function (line) {
      file.index[line.number] = line;
    });
  });
  return files
}

function parseErrorLog (errLog) {
  var result = [];
  errLog.split('\n').forEach(function (errMsg) {
    if (errMsg.length < 5) {
      return
    }
    var parts = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(errMsg);
    if (parts) {
      result.push(new ShaderError(
        parts[1] | 0,
        parts[2] | 0,
        parts[3].trim()));
    } else if (errMsg.length > 0) {
      result.push(new ShaderError('unknown', 0, errMsg));
    }
  });
  return result
}

function annotateFiles (files, errors) {
  errors.forEach(function (error) {
    var file = files[error.file];
    if (file) {
      var line = file.index[error.line];
      if (line) {
        line.errors.push(error);
        file.hasErrors = true;
        return
      }
    }
    files.unknown.hasErrors = true;
    files.unknown.lines[0].errors.push(error);
  });
}

function checkShaderError (gl, shader, source, type, command) {
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var errLog = gl.getShaderInfoLog(shader);
    var typeName = type === gl.FRAGMENT_SHADER ? 'fragment' : 'vertex';
    checkCommandType(source, 'string', typeName + ' shader source must be a string', command);
    var files = parseSource(source, command);
    var errors = parseErrorLog(errLog);
    annotateFiles(files, errors);

    Object.keys(files).forEach(function (fileNumber) {
      var file = files[fileNumber];
      if (!file.hasErrors) {
        return
      }

      var strings = [''];
      var styles = [''];

      function push (str, style) {
        strings.push(str);
        styles.push(style || '');
      }

      push('file number ' + fileNumber + ': ' + file.name + '\n', 'color:red;text-decoration:underline;font-weight:bold');

      file.lines.forEach(function (line) {
        if (line.errors.length > 0) {
          push(leftPad(line.number, 4) + '|  ', 'background-color:yellow; font-weight:bold');
          push(line.line + endl, 'color:red; background-color:yellow; font-weight:bold');

          // try to guess token
          var offset = 0;
          line.errors.forEach(function (error) {
            var message = error.message;
            var token = /^\s*'(.*)'\s*:\s*(.*)$/.exec(message);
            if (token) {
              var tokenPat = token[1];
              message = token[2];
              switch (tokenPat) {
                case 'assign':
                  tokenPat = '=';
                  break
              }
              offset = Math.max(line.line.indexOf(tokenPat, offset), 0);
            } else {
              offset = 0;
            }

            push(leftPad('| ', 6));
            push(leftPad('^^^', offset + 3) + endl, 'font-weight:bold');
            push(leftPad('| ', 6));
            push(message + endl, 'font-weight:bold');
          });
          push(leftPad('| ', 6) + endl);
        } else {
          push(leftPad(line.number, 4) + '|  ');
          push(line.line + endl, 'color:red');
        }
      });
      if (typeof document !== 'undefined' && !window.chrome) {
        styles[0] = strings.join('%c');
        console.log.apply(console, styles);
      } else {
        console.log(strings.join(''));
      }
    });

    check.raise('Error compiling ' + typeName + ' shader, ' + files[0].name);
  }
}

function checkLinkError (gl, program, fragShader, vertShader, command) {
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var errLog = gl.getProgramInfoLog(program);
    var fragParse = parseSource(fragShader, command);
    var vertParse = parseSource(vertShader, command);

    var header = 'Error linking program with vertex shader, "' +
      vertParse[0].name + '", and fragment shader "' + fragParse[0].name + '"';

    if (typeof document !== 'undefined') {
      console.log('%c' + header + endl + '%c' + errLog,
        'color:red;text-decoration:underline;font-weight:bold',
        'color:red');
    } else {
      console.log(header + endl + errLog);
    }
    check.raise(header);
  }
}

function saveCommandRef (object) {
  object._commandRef = guessCommand();
}

function saveDrawCommandInfo (opts, uniforms, attributes, stringStore) {
  saveCommandRef(opts);

  function id (str) {
    if (str) {
      return stringStore.id(str)
    }
    return 0
  }
  opts._fragId = id(opts.static.frag);
  opts._vertId = id(opts.static.vert);

  function addProps (dict, set) {
    Object.keys(set).forEach(function (u) {
      dict[stringStore.id(u)] = true;
    });
  }

  var uniformSet = opts._uniformSet = {};
  addProps(uniformSet, uniforms.static);
  addProps(uniformSet, uniforms.dynamic);

  var attributeSet = opts._attributeSet = {};
  addProps(attributeSet, attributes.static);
  addProps(attributeSet, attributes.dynamic);

  opts._hasCount = (
    'count' in opts.static ||
    'count' in opts.dynamic ||
    'elements' in opts.static ||
    'elements' in opts.dynamic);
}

function commandRaise (message, command) {
  var callSite = guessCallSite();
  raise(message +
    ' in command ' + (command || guessCommand()) +
    (callSite === 'unknown' ? '' : ' called from ' + callSite));
}

function checkCommand (pred, message, command) {
  if (!pred) {
    commandRaise(message, command || guessCommand());
  }
}

function checkParameterCommand (param, possibilities, message, command) {
  if (!(param in possibilities)) {
    commandRaise(
      'unknown parameter (' + param + ')' + encolon(message) +
      '. possible values: ' + Object.keys(possibilities).join(),
      command || guessCommand());
  }
}

function checkCommandType (value, type, message, command) {
  if (!standardTypeEh(value, type)) {
    commandRaise(
      'invalid parameter type' + encolon(message) +
      '. expected ' + type + ', got ' + (typeof value),
      command || guessCommand());
  }
}

function checkOptional (block) {
  block();
}

function checkFramebufferFormat (attachment, texFormats, rbFormats) {
  if (attachment.texture) {
    checkOneOf(
      attachment.texture._texture.internalformat,
      texFormats,
      'unsupported texture format for attachment');
  } else {
    checkOneOf(
      attachment.renderbuffer._renderbuffer.format,
      rbFormats,
      'unsupported renderbuffer format for attachment');
  }
}

var GL_CLAMP_TO_EDGE = 0x812F;

var GL_NEAREST = 0x2600;
var GL_NEAREST_MIPMAP_NEAREST = 0x2700;
var GL_LINEAR_MIPMAP_NEAREST = 0x2701;
var GL_NEAREST_MIPMAP_LINEAR = 0x2702;
var GL_LINEAR_MIPMAP_LINEAR = 0x2703;

var GL_BYTE = 5120;
var GL_UNSIGNED_BYTE = 5121;
var GL_SHORT = 5122;
var GL_UNSIGNED_SHORT = 5123;
var GL_INT = 5124;
var GL_UNSIGNED_INT = 5125;
var GL_FLOAT = 5126;

var GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
var GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
var GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
var GL_UNSIGNED_INT_24_8_WEBGL = 0x84FA;

var GL_HALF_FLOAT_OES = 0x8D61;

var TYPE_SIZE = {};

TYPE_SIZE[GL_BYTE] =
TYPE_SIZE[GL_UNSIGNED_BYTE] = 1;

TYPE_SIZE[GL_SHORT] =
TYPE_SIZE[GL_UNSIGNED_SHORT] =
TYPE_SIZE[GL_HALF_FLOAT_OES] =
TYPE_SIZE[GL_UNSIGNED_SHORT_5_6_5] =
TYPE_SIZE[GL_UNSIGNED_SHORT_4_4_4_4] =
TYPE_SIZE[GL_UNSIGNED_SHORT_5_5_5_1] = 2;

TYPE_SIZE[GL_INT] =
TYPE_SIZE[GL_UNSIGNED_INT] =
TYPE_SIZE[GL_FLOAT] =
TYPE_SIZE[GL_UNSIGNED_INT_24_8_WEBGL] = 4;

function pixelSize (type, channels) {
  if (type === GL_UNSIGNED_SHORT_5_5_5_1 ||
      type === GL_UNSIGNED_SHORT_4_4_4_4 ||
      type === GL_UNSIGNED_SHORT_5_6_5) {
    return 2
  } else if (type === GL_UNSIGNED_INT_24_8_WEBGL) {
    return 4
  } else {
    return TYPE_SIZE[type] * channels
  }
}

function isPow2 (v) {
  return !(v & (v - 1)) && (!!v)
}

function checkTexture2D (info, mipData, limits) {
  var i;
  var w = mipData.width;
  var h = mipData.height;
  var c = mipData.channels;

  // Check texture shape
  check(w > 0 && w <= limits.maxTextureSize &&
        h > 0 && h <= limits.maxTextureSize,
  'invalid texture shape');

  // check wrap mode
  if (info.wrapS !== GL_CLAMP_TO_EDGE || info.wrapT !== GL_CLAMP_TO_EDGE) {
    check(isPow2(w) && isPow2(h),
      'incompatible wrap mode for texture, both width and height must be power of 2');
  }

  if (mipData.mipmask === 1) {
    if (w !== 1 && h !== 1) {
      check(
        info.minFilter !== GL_NEAREST_MIPMAP_NEAREST &&
        info.minFilter !== GL_NEAREST_MIPMAP_LINEAR &&
        info.minFilter !== GL_LINEAR_MIPMAP_NEAREST &&
        info.minFilter !== GL_LINEAR_MIPMAP_LINEAR,
        'min filter requires mipmap');
    }
  } else {
    // texture must be power of 2
    check(isPow2(w) && isPow2(h),
      'texture must be a square power of 2 to support mipmapping');
    check(mipData.mipmask === (w << 1) - 1,
      'missing or incomplete mipmap data');
  }

  if (mipData.type === GL_FLOAT) {
    if (limits.extensions.indexOf('oes_texture_float_linear') < 0) {
      check(info.minFilter === GL_NEAREST && info.magFilter === GL_NEAREST,
        'filter not supported, must enable oes_texture_float_linear');
    }
    check(!info.genMipmaps,
      'mipmap generation not supported with float textures');
  }

  // check image complete
  var mipimages = mipData.images;
  for (i = 0; i < 16; ++i) {
    if (mipimages[i]) {
      var mw = w >> i;
      var mh = h >> i;
      check(mipData.mipmask & (1 << i), 'missing mipmap data');

      var img = mipimages[i];

      check(
        img.width === mw &&
        img.height === mh,
        'invalid shape for mip images');

      check(
        img.format === mipData.format &&
        img.internalformat === mipData.internalformat &&
        img.type === mipData.type,
        'incompatible type for mip image');

      if (img.compressed) ; else if (img.data) {
        // check(img.data.byteLength === mw * mh *
        // Math.max(pixelSize(img.type, c), img.unpackAlignment),
        var rowSize = Math.ceil(pixelSize(img.type, c) * mw / img.unpackAlignment) * img.unpackAlignment;
        check(img.data.byteLength === rowSize * mh,
          'invalid data for image, buffer size is inconsistent with image format');
      } else ;
    } else if (!info.genMipmaps) {
      check((mipData.mipmask & (1 << i)) === 0, 'extra mipmap data');
    }
  }

  if (mipData.compressed) {
    check(!info.genMipmaps,
      'mipmap generation for compressed images not supported');
  }
}

function checkTextureCube (texture, info, faces, limits) {
  var w = texture.width;
  var h = texture.height;
  var c = texture.channels;

  // Check texture shape
  check(
    w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize,
    'invalid texture shape');
  check(
    w === h,
    'cube map must be square');
  check(
    info.wrapS === GL_CLAMP_TO_EDGE && info.wrapT === GL_CLAMP_TO_EDGE,
    'wrap mode not supported by cube map');

  for (var i = 0; i < faces.length; ++i) {
    var face = faces[i];
    check(
      face.width === w && face.height === h,
      'inconsistent cube map face shape');

    if (info.genMipmaps) {
      check(!face.compressed,
        'can not generate mipmap for compressed textures');
      check(face.mipmask === 1,
        'can not specify mipmaps and generate mipmaps');
    }

    var mipmaps = face.images;
    for (var j = 0; j < 16; ++j) {
      var img = mipmaps[j];
      if (img) {
        var mw = w >> j;
        var mh = h >> j;
        check(face.mipmask & (1 << j), 'missing mipmap data');
        check(
          img.width === mw &&
          img.height === mh,
          'invalid shape for mip images');
        check(
          img.format === texture.format &&
          img.internalformat === texture.internalformat &&
          img.type === texture.type,
          'incompatible type for mip image');

        if (img.compressed) ; else if (img.data) {
          check(img.data.byteLength === mw * mh *
            Math.max(pixelSize(img.type, c), img.unpackAlignment),
          'invalid data for image, buffer size is inconsistent with image format');
        } else ;
      }
    }
  }
}

var check$1 = extend(check, {
  optional: checkOptional,
  raise: raise,
  commandRaise: commandRaise,
  command: checkCommand,
  parameter: checkParameter,
  commandParameter: checkParameterCommand,
  constructor: checkConstructor,
  type: checkTypeOf,
  commandType: checkCommandType,
  isTypedArray: checkIsTypedArray,
  nni: checkNonNegativeInt,
  oneOf: checkOneOf,
  shaderError: checkShaderError,
  linkError: checkLinkError,
  callSite: guessCallSite,
  saveCommandRef: saveCommandRef,
  saveDrawInfo: saveDrawCommandInfo,
  framebufferFormat: checkFramebufferFormat,
  guessCommand: guessCommand,
  texture2D: checkTexture2D,
  textureCube: checkTextureCube
});

var VARIABLE_COUNTER = 0;

var DYN_FUNC = 0;
var DYN_CONSTANT = 5;
var DYN_ARRAY = 6;

function DynamicVariable (type, data) {
  this.id = (VARIABLE_COUNTER++);
  this.type = type;
  this.data = data;
}

function escapeStr (str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function splitParts (str) {
  if (str.length === 0) {
    return []
  }

  var firstChar = str.charAt(0);
  var lastChar = str.charAt(str.length - 1);

  if (str.length > 1 &&
      firstChar === lastChar &&
      (firstChar === '"' || firstChar === "'")) {
    return ['"' + escapeStr(str.substr(1, str.length - 2)) + '"']
  }

  var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str);
  if (parts) {
    return (
      splitParts(str.substr(0, parts.index))
        .concat(splitParts(parts[1]))
        .concat(splitParts(str.substr(parts.index + parts[0].length)))
    )
  }

  var subparts = str.split('.');
  if (subparts.length === 1) {
    return ['"' + escapeStr(str) + '"']
  }

  var result = [];
  for (var i = 0; i < subparts.length; ++i) {
    result = result.concat(splitParts(subparts[i]));
  }
  return result
}

function toAccessorString (str) {
  return '[' + splitParts(str).join('][') + ']'
}

function defineDynamic (type, data) {
  return new DynamicVariable(type, toAccessorString(data + ''))
}

function isDynamic (x) {
  return (typeof x === 'function' && !x._reglType) || (x instanceof DynamicVariable)
}

function unbox (x, path) {
  if (typeof x === 'function') {
    return new DynamicVariable(DYN_FUNC, x)
  } else if (typeof x === 'number' || typeof x === 'boolean') {
    return new DynamicVariable(DYN_CONSTANT, x)
  } else if (Array.isArray(x)) {
    return new DynamicVariable(DYN_ARRAY, x.map((y, i) => unbox(y, path + '[' + i + ']')))
  } else if (x instanceof DynamicVariable) {
    return x
  }
  check$1(false, 'invalid option type in uniform ' + path);
}

var dynamic = {
  DynamicVariable: DynamicVariable,
  define: defineDynamic,
  isDynamic: isDynamic,
  unbox: unbox,
  accessor: toAccessorString
};

/* globals requestAnimationFrame, cancelAnimationFrame */
var raf = {
  next: typeof requestAnimationFrame === 'function'
    ? function (cb) { return requestAnimationFrame(cb) }
    : function (cb) { return setTimeout(cb, 16) },
  cancel: typeof cancelAnimationFrame === 'function'
    ? function (raf) { return cancelAnimationFrame(raf) }
    : clearTimeout
};

/* globals performance */
var clock = (typeof performance !== 'undefined' && performance.now)
    ? function () { return performance.now() }
    : function () { return +(new Date()) };

function createStringStore () {
  var stringIds = { '': 0 };
  var stringValues = [''];
  return {
    id: function (str) {
      var result = stringIds[str];
      if (result) {
        return result
      }
      result = stringIds[str] = stringValues.length;
      stringValues.push(str);
      return result
    },

    str: function (id) {
      return stringValues[id]
    }
  }
}

// Context and canvas creation helper functions
function createCanvas (element, onDone, pixelRatio) {
  var canvas = document.createElement('canvas');
  extend(canvas.style, {
    border: 0,
    margin: 0,
    padding: 0,
    top: 0,
    left: 0
  });
  element.appendChild(canvas);

  if (element === document.body) {
    canvas.style.position = 'absolute';
    extend(element.style, {
      margin: 0,
      padding: 0
    });
  }

  function resize () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (element !== document.body) {
      var bounds = element.getBoundingClientRect();
      w = bounds.right - bounds.left;
      h = bounds.bottom - bounds.top;
    }
    canvas.width = pixelRatio * w;
    canvas.height = pixelRatio * h;
    extend(canvas.style, {
      width: w + 'px',
      height: h + 'px'
    });
  }

  var resizeObserver;
  if (element !== document.body && typeof ResizeObserver === 'function') {
    // ignore 'ResizeObserver' is not defined
    // eslint-disable-next-line
    resizeObserver = new ResizeObserver(function () {
      // setTimeout to avoid flicker
      setTimeout(resize);
    });
    resizeObserver.observe(element);
  } else {
    window.addEventListener('resize', resize, false);
  }

  function onDestroy () {
    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', resize);
    }
    element.removeChild(canvas);
  }

  resize();

  return {
    canvas: canvas,
    onDestroy: onDestroy
  }
}

function createContext (canvas, contextAttributes) {
  function get (name) {
    try {
      return canvas.getContext(name, contextAttributes)
    } catch (e) {
      return null
    }
  }
  return (
    get('webgl') ||
    get('experimental-webgl') ||
    get('webgl-experimental')
  )
}

function isHTMLElement (obj) {
  return (
    typeof obj.nodeName === 'string' &&
    typeof obj.appendChild === 'function' &&
    typeof obj.getBoundingClientRect === 'function'
  )
}

function isWebGLContext (obj) {
  return (
    typeof obj.drawArrays === 'function' ||
    typeof obj.drawElements === 'function'
  )
}

function parseExtensions (input) {
  if (typeof input === 'string') {
    return input.split()
  }
  check$1(Array.isArray(input), 'invalid extension array');
  return input
}

function getElement (desc) {
  if (typeof desc === 'string') {
    check$1(typeof document !== 'undefined', 'not supported outside of DOM');
    return document.querySelector(desc)
  }
  return desc
}

function parseArgs (args_) {
  var args = args_ || {};
  var element, container, canvas, gl;
  var contextAttributes = {};
  var extensions = [];
  var optionalExtensions = [];
  var pixelRatio = (typeof window === 'undefined' ? 1 : window.devicePixelRatio);
  var profile = false;
  var onDone = function (err) {
    if (err) {
      check$1.raise(err);
    }
  };
  var onDestroy = function () {};
  if (typeof args === 'string') {
    check$1(
      typeof document !== 'undefined',
      'selector queries only supported in DOM enviroments');
    element = document.querySelector(args);
    check$1(element, 'invalid query string for element');
  } else if (typeof args === 'object') {
    if (isHTMLElement(args)) {
      element = args;
    } else if (isWebGLContext(args)) {
      gl = args;
      canvas = gl.canvas;
    } else {
      check$1.constructor(args);
      if ('gl' in args) {
        gl = args.gl;
      } else if ('canvas' in args) {
        canvas = getElement(args.canvas);
      } else if ('container' in args) {
        container = getElement(args.container);
      }
      if ('attributes' in args) {
        contextAttributes = args.attributes;
        check$1.type(contextAttributes, 'object', 'invalid context attributes');
      }
      if ('extensions' in args) {
        extensions = parseExtensions(args.extensions);
      }
      if ('optionalExtensions' in args) {
        optionalExtensions = parseExtensions(args.optionalExtensions);
      }
      if ('onDone' in args) {
        check$1.type(
          args.onDone, 'function',
          'invalid or missing onDone callback');
        onDone = args.onDone;
      }
      if ('profile' in args) {
        profile = !!args.profile;
      }
      if ('pixelRatio' in args) {
        pixelRatio = +args.pixelRatio;
        check$1(pixelRatio > 0, 'invalid pixel ratio');
      }
    }
  } else {
    check$1.raise('invalid arguments to regl');
  }

  if (element) {
    if (element.nodeName.toLowerCase() === 'canvas') {
      canvas = element;
    } else {
      container = element;
    }
  }

  if (!gl) {
    if (!canvas) {
      check$1(
        typeof document !== 'undefined',
        'must manually specify webgl context outside of DOM environments');
      var result = createCanvas(container || document.body, onDone, pixelRatio);
      if (!result) {
        return null
      }
      canvas = result.canvas;
      onDestroy = result.onDestroy;
    }
    // workaround for chromium bug, premultiplied alpha value is platform dependent
    if (contextAttributes.premultipliedAlpha === undefined) contextAttributes.premultipliedAlpha = true;
    gl = createContext(canvas, contextAttributes);
  }

  if (!gl) {
    onDestroy();
    onDone('webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org');
    return null
  }

  return {
    gl: gl,
    canvas: canvas,
    container: container,
    extensions: extensions,
    optionalExtensions: optionalExtensions,
    pixelRatio: pixelRatio,
    profile: profile,
    onDone: onDone,
    onDestroy: onDestroy
  }
}

function createExtensionCache (gl, config) {
  var extensions = {};

  function tryLoadExtension (name_) {
    check$1.type(name_, 'string', 'extension name must be string');
    var name = name_.toLowerCase();
    var ext;
    try {
      ext = extensions[name] = gl.getExtension(name);
    } catch (e) {}
    return !!ext
  }

  for (var i = 0; i < config.extensions.length; ++i) {
    var name = config.extensions[i];
    if (!tryLoadExtension(name)) {
      config.onDestroy();
      config.onDone('"' + name + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser');
      return null
    }
  }

  config.optionalExtensions.forEach(tryLoadExtension);

  return {
    extensions: extensions,
    restore: function () {
      Object.keys(extensions).forEach(function (name) {
        if (extensions[name] && !tryLoadExtension(name)) {
          throw new Error('(regl): error restoring extension ' + name)
        }
      });
    }
  }
}

function loop (n, f) {
  var result = Array(n);
  for (var i = 0; i < n; ++i) {
    result[i] = f(i);
  }
  return result
}

var GL_BYTE$1 = 5120;
var GL_UNSIGNED_BYTE$2 = 5121;
var GL_SHORT$1 = 5122;
var GL_UNSIGNED_SHORT$1 = 5123;
var GL_INT$1 = 5124;
var GL_UNSIGNED_INT$1 = 5125;
var GL_FLOAT$2 = 5126;

function nextPow16 (v) {
  for (var i = 16; i <= (1 << 28); i *= 16) {
    if (v <= i) {
      return i
    }
  }
  return 0
}

function log2 (v) {
  var r, shift;
  r = (v > 0xFFFF) << 4;
  v >>>= r;
  shift = (v > 0xFF) << 3;
  v >>>= shift; r |= shift;
  shift = (v > 0xF) << 2;
  v >>>= shift; r |= shift;
  shift = (v > 0x3) << 1;
  v >>>= shift; r |= shift;
  return r | (v >> 1)
}

function createPool () {
  var bufferPool = loop(8, function () {
    return []
  });

  function alloc (n) {
    var sz = nextPow16(n);
    var bin = bufferPool[log2(sz) >> 2];
    if (bin.length > 0) {
      return bin.pop()
    }
    return new ArrayBuffer(sz)
  }

  function free (buf) {
    bufferPool[log2(buf.byteLength) >> 2].push(buf);
  }

  function allocType (type, n) {
    var result = null;
    switch (type) {
      case GL_BYTE$1:
        result = new Int8Array(alloc(n), 0, n);
        break
      case GL_UNSIGNED_BYTE$2:
        result = new Uint8Array(alloc(n), 0, n);
        break
      case GL_SHORT$1:
        result = new Int16Array(alloc(2 * n), 0, n);
        break
      case GL_UNSIGNED_SHORT$1:
        result = new Uint16Array(alloc(2 * n), 0, n);
        break
      case GL_INT$1:
        result = new Int32Array(alloc(4 * n), 0, n);
        break
      case GL_UNSIGNED_INT$1:
        result = new Uint32Array(alloc(4 * n), 0, n);
        break
      case GL_FLOAT$2:
        result = new Float32Array(alloc(4 * n), 0, n);
        break
      default:
        return null
    }
    if (result.length !== n) {
      return result.subarray(0, n)
    }
    return result
  }

  function freeType (array) {
    free(array.buffer);
  }

  return {
    alloc: alloc,
    free: free,
    allocType: allocType,
    freeType: freeType
  }
}

var pool = createPool();

// zero pool for initial zero data
pool.zero = createPool();

var GL_SUBPIXEL_BITS = 0x0D50;
var GL_RED_BITS = 0x0D52;
var GL_GREEN_BITS = 0x0D53;
var GL_BLUE_BITS = 0x0D54;
var GL_ALPHA_BITS = 0x0D55;
var GL_DEPTH_BITS = 0x0D56;
var GL_STENCIL_BITS = 0x0D57;

var GL_ALIASED_POINT_SIZE_RANGE = 0x846D;
var GL_ALIASED_LINE_WIDTH_RANGE = 0x846E;

var GL_MAX_TEXTURE_SIZE = 0x0D33;
var GL_MAX_VIEWPORT_DIMS = 0x0D3A;
var GL_MAX_VERTEX_ATTRIBS = 0x8869;
var GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
var GL_MAX_VARYING_VECTORS = 0x8DFC;
var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
var GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872;
var GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
var GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
var GL_MAX_RENDERBUFFER_SIZE = 0x84E8;

var GL_VENDOR = 0x1F00;
var GL_RENDERER = 0x1F01;
var GL_VERSION = 0x1F02;
var GL_SHADING_LANGUAGE_VERSION = 0x8B8C;

var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;

var GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8CDF;
var GL_MAX_DRAW_BUFFERS_WEBGL = 0x8824;

var GL_TEXTURE_2D = 0x0DE1;
var GL_TEXTURE_CUBE_MAP = 0x8513;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
var GL_TEXTURE0 = 0x84C0;
var GL_RGBA = 0x1908;
var GL_FLOAT$1 = 0x1406;
var GL_UNSIGNED_BYTE$1 = 0x1401;
var GL_FRAMEBUFFER = 0x8D40;
var GL_FRAMEBUFFER_COMPLETE = 0x8CD5;
var GL_COLOR_ATTACHMENT0 = 0x8CE0;
var GL_COLOR_BUFFER_BIT$1 = 0x4000;

var wrapLimits = function (gl, extensions) {
  var maxAnisotropic = 1;
  if (extensions.ext_texture_filter_anisotropic) {
    maxAnisotropic = gl.getParameter(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  }

  var maxDrawbuffers = 1;
  var maxColorAttachments = 1;
  if (extensions.webgl_draw_buffers) {
    maxDrawbuffers = gl.getParameter(GL_MAX_DRAW_BUFFERS_WEBGL);
    maxColorAttachments = gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL);
  }

  // detect if reading float textures is available (Safari doesn't support)
  var readFloat = !!extensions.oes_texture_float;
  if (readFloat) {
    var readFloatTexture = gl.createTexture();
    gl.bindTexture(GL_TEXTURE_2D, readFloatTexture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_FLOAT$1, null);

    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(GL_FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, readFloatTexture, 0);
    gl.bindTexture(GL_TEXTURE_2D, null);

    if (gl.checkFramebufferStatus(GL_FRAMEBUFFER) !== GL_FRAMEBUFFER_COMPLETE) readFloat = false;

    else {
      gl.viewport(0, 0, 1, 1);
      gl.clearColor(1.0, 0.0, 0.0, 1.0);
      gl.clear(GL_COLOR_BUFFER_BIT$1);
      var pixels = pool.allocType(GL_FLOAT$1, 4);
      gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_FLOAT$1, pixels);

      if (gl.getError()) readFloat = false;
      else {
        gl.deleteFramebuffer(fbo);
        gl.deleteTexture(readFloatTexture);

        readFloat = pixels[0] === 1.0;
      }

      pool.freeType(pixels);
    }
  }

  // detect non power of two cube textures support (IE doesn't support)
  var isIE = typeof navigator !== 'undefined' && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent));

  var npotTextureCube = true;

  if (!isIE) {
    var cubeTexture = gl.createTexture();
    var data = pool.allocType(GL_UNSIGNED_BYTE$1, 36);
    gl.activeTexture(GL_TEXTURE0);
    gl.bindTexture(GL_TEXTURE_CUBE_MAP, cubeTexture);
    gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X, 0, GL_RGBA, 3, 3, 0, GL_RGBA, GL_UNSIGNED_BYTE$1, data);
    pool.freeType(data);
    gl.bindTexture(GL_TEXTURE_CUBE_MAP, null);
    gl.deleteTexture(cubeTexture);
    npotTextureCube = !gl.getError();
  }

  return {
    // drawing buffer bit depth
    colorBits: [
      gl.getParameter(GL_RED_BITS),
      gl.getParameter(GL_GREEN_BITS),
      gl.getParameter(GL_BLUE_BITS),
      gl.getParameter(GL_ALPHA_BITS)
    ],
    depthBits: gl.getParameter(GL_DEPTH_BITS),
    stencilBits: gl.getParameter(GL_STENCIL_BITS),
    subpixelBits: gl.getParameter(GL_SUBPIXEL_BITS),

    // supported extensions
    extensions: Object.keys(extensions).filter(function (ext) {
      return !!extensions[ext]
    }),

    // max aniso samples
    maxAnisotropic: maxAnisotropic,

    // max draw buffers
    maxDrawbuffers: maxDrawbuffers,
    maxColorAttachments: maxColorAttachments,

    // point and line size ranges
    pointSizeDims: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE),
    lineWidthDims: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE),
    maxViewportDims: gl.getParameter(GL_MAX_VIEWPORT_DIMS),
    maxCombinedTextureUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    maxCubeMapSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
    maxRenderbufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
    maxTextureUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
    maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
    maxAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
    maxVertexUniforms: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
    maxVertexTextureUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
    maxFragmentUniforms: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),

    // vendor info
    glsl: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
    renderer: gl.getParameter(GL_RENDERER),
    vendor: gl.getParameter(GL_VENDOR),
    version: gl.getParameter(GL_VERSION),

    // quirks
    readFloat: readFloat,
    npotTextureCube: npotTextureCube
  }
};

function isNDArrayLike (obj) {
  return (
    !!obj &&
    typeof obj === 'object' &&
    Array.isArray(obj.shape) &&
    Array.isArray(obj.stride) &&
    typeof obj.offset === 'number' &&
    obj.shape.length === obj.stride.length &&
    (Array.isArray(obj.data) ||
      isTypedArray(obj.data)))
}

var values = function (obj) {
  return Object.keys(obj).map(function (key) { return obj[key] })
};

var flattenUtils = {
  shape: arrayShape$1,
  flatten: flattenArray
};

function flatten1D (array, nx, out) {
  for (var i = 0; i < nx; ++i) {
    out[i] = array[i];
  }
}

function flatten2D (array, nx, ny, out) {
  var ptr = 0;
  for (var i = 0; i < nx; ++i) {
    var row = array[i];
    for (var j = 0; j < ny; ++j) {
      out[ptr++] = row[j];
    }
  }
}

function flatten3D (array, nx, ny, nz, out, ptr_) {
  var ptr = ptr_;
  for (var i = 0; i < nx; ++i) {
    var row = array[i];
    for (var j = 0; j < ny; ++j) {
      var col = row[j];
      for (var k = 0; k < nz; ++k) {
        out[ptr++] = col[k];
      }
    }
  }
}

function flattenRec (array, shape, level, out, ptr) {
  var stride = 1;
  for (var i = level + 1; i < shape.length; ++i) {
    stride *= shape[i];
  }
  var n = shape[level];
  if (shape.length - level === 4) {
    var nx = shape[level + 1];
    var ny = shape[level + 2];
    var nz = shape[level + 3];
    for (i = 0; i < n; ++i) {
      flatten3D(array[i], nx, ny, nz, out, ptr);
      ptr += stride;
    }
  } else {
    for (i = 0; i < n; ++i) {
      flattenRec(array[i], shape, level + 1, out, ptr);
      ptr += stride;
    }
  }
}

function flattenArray (array, shape, type, out_) {
  var sz = 1;
  if (shape.length) {
    for (var i = 0; i < shape.length; ++i) {
      sz *= shape[i];
    }
  } else {
    sz = 0;
  }
  var out = out_ || pool.allocType(type, sz);
  switch (shape.length) {
    case 0:
      break
    case 1:
      flatten1D(array, shape[0], out);
      break
    case 2:
      flatten2D(array, shape[0], shape[1], out);
      break
    case 3:
      flatten3D(array, shape[0], shape[1], shape[2], out, 0);
      break
    default:
      flattenRec(array, shape, 0, out, 0);
  }
  return out
}

function arrayShape$1 (array_) {
  var shape = [];
  for (var array = array_; array.length; array = array[0]) {
    shape.push(array.length);
  }
  return shape
}

var arrayTypes =  {
	"[object Int8Array]": 5120,
	"[object Int16Array]": 5122,
	"[object Int32Array]": 5124,
	"[object Uint8Array]": 5121,
	"[object Uint8ClampedArray]": 5121,
	"[object Uint16Array]": 5123,
	"[object Uint32Array]": 5125,
	"[object Float32Array]": 5126,
	"[object Float64Array]": 5121,
	"[object ArrayBuffer]": 5121
};

var int8 = 5120;
var int16 = 5122;
var int32 = 5124;
var uint8 = 5121;
var uint16 = 5123;
var uint32 = 5125;
var float = 5126;
var float32 = 5126;
var glTypes = {
	int8: int8,
	int16: int16,
	int32: int32,
	uint8: uint8,
	uint16: uint16,
	uint32: uint32,
	float: float,
	float32: float32
};

var dynamic$1 = 35048;
var stream = 35040;
var usageTypes = {
	dynamic: dynamic$1,
	stream: stream,
	"static": 35044
};

var arrayFlatten = flattenUtils.flatten;
var arrayShape = flattenUtils.shape;

var GL_STATIC_DRAW = 0x88E4;
var GL_STREAM_DRAW = 0x88E0;

var GL_UNSIGNED_BYTE$3 = 5121;
var GL_FLOAT$3 = 5126;

var DTYPES_SIZES = [];
DTYPES_SIZES[5120] = 1; // int8
DTYPES_SIZES[5122] = 2; // int16
DTYPES_SIZES[5124] = 4; // int32
DTYPES_SIZES[5121] = 1; // uint8
DTYPES_SIZES[5123] = 2; // uint16
DTYPES_SIZES[5125] = 4; // uint32
DTYPES_SIZES[5126] = 4; // float32

function typedArrayCode (data) {
  return arrayTypes[Object.prototype.toString.call(data)] | 0
}

function copyArray (out, inp) {
  for (var i = 0; i < inp.length; ++i) {
    out[i] = inp[i];
  }
}

function transpose (
  result, data, shapeX, shapeY, strideX, strideY, offset) {
  var ptr = 0;
  for (var i = 0; i < shapeX; ++i) {
    for (var j = 0; j < shapeY; ++j) {
      result[ptr++] = data[strideX * i + strideY * j + offset];
    }
  }
}

function wrapBufferState (gl, stats, config, destroyBuffer) {
  var bufferCount = 0;
  var bufferSet = {};

  function REGLBuffer (type) {
    this.id = bufferCount++;
    this.buffer = gl.createBuffer();
    this.type = type;
    this.usage = GL_STATIC_DRAW;
    this.byteLength = 0;
    this.dimension = 1;
    this.dtype = GL_UNSIGNED_BYTE$3;

    this.persistentData = null;

    if (config.profile) {
      this.stats = { size: 0 };
    }
  }

  REGLBuffer.prototype.bind = function () {
    gl.bindBuffer(this.type, this.buffer);
  };

  REGLBuffer.prototype.destroy = function () {
    destroy(this);
  };

  var streamPool = [];

  function createStream (type, data) {
    var buffer = streamPool.pop();
    if (!buffer) {
      buffer = new REGLBuffer(type);
    }
    buffer.bind();
    initBufferFromData(buffer, data, GL_STREAM_DRAW, 0, 1, false);
    return buffer
  }

  function destroyStream (stream$$1) {
    streamPool.push(stream$$1);
  }

  function initBufferFromTypedArray (buffer, data, usage) {
    buffer.byteLength = data.byteLength;
    gl.bufferData(buffer.type, data, usage);
  }

  function initBufferFromData (buffer, data, usage, dtype, dimension, persist) {
    var shape;
    buffer.usage = usage;
    if (Array.isArray(data)) {
      buffer.dtype = dtype || GL_FLOAT$3;
      if (data.length > 0) {
        var flatData;
        if (Array.isArray(data[0])) {
          shape = arrayShape(data);
          var dim = 1;
          for (var i = 1; i < shape.length; ++i) {
            dim *= shape[i];
          }
          buffer.dimension = dim;
          flatData = arrayFlatten(data, shape, buffer.dtype);
          initBufferFromTypedArray(buffer, flatData, usage);
          if (persist) {
            buffer.persistentData = flatData;
          } else {
            pool.freeType(flatData);
          }
        } else if (typeof data[0] === 'number') {
          buffer.dimension = dimension;
          var typedData = pool.allocType(buffer.dtype, data.length);
          copyArray(typedData, data);
          initBufferFromTypedArray(buffer, typedData, usage);
          if (persist) {
            buffer.persistentData = typedData;
          } else {
            pool.freeType(typedData);
          }
        } else if (isTypedArray(data[0])) {
          buffer.dimension = data[0].length;
          buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$3;
          flatData = arrayFlatten(
            data,
            [data.length, data[0].length],
            buffer.dtype);
          initBufferFromTypedArray(buffer, flatData, usage);
          if (persist) {
            buffer.persistentData = flatData;
          } else {
            pool.freeType(flatData);
          }
        } else {
          check$1.raise('invalid buffer data');
        }
      }
    } else if (isTypedArray(data)) {
      buffer.dtype = dtype || typedArrayCode(data);
      buffer.dimension = dimension;
      initBufferFromTypedArray(buffer, data, usage);
      if (persist) {
        buffer.persistentData = new Uint8Array(new Uint8Array(data.buffer));
      }
    } else if (isNDArrayLike(data)) {
      shape = data.shape;
      var stride = data.stride;
      var offset = data.offset;

      var shapeX = 0;
      var shapeY = 0;
      var strideX = 0;
      var strideY = 0;
      if (shape.length === 1) {
        shapeX = shape[0];
        shapeY = 1;
        strideX = stride[0];
        strideY = 0;
      } else if (shape.length === 2) {
        shapeX = shape[0];
        shapeY = shape[1];
        strideX = stride[0];
        strideY = stride[1];
      } else {
        check$1.raise('invalid shape');
      }

      buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$3;
      buffer.dimension = shapeY;

      var transposeData = pool.allocType(buffer.dtype, shapeX * shapeY);
      transpose(transposeData,
        data.data,
        shapeX, shapeY,
        strideX, strideY,
        offset);
      initBufferFromTypedArray(buffer, transposeData, usage);
      if (persist) {
        buffer.persistentData = transposeData;
      } else {
        pool.freeType(transposeData);
      }
    } else if (data instanceof ArrayBuffer) {
      buffer.dtype = GL_UNSIGNED_BYTE$3;
      buffer.dimension = dimension;
      initBufferFromTypedArray(buffer, data, usage);
      if (persist) {
        buffer.persistentData = new Uint8Array(new Uint8Array(data));
      }
    } else {
      check$1.raise('invalid buffer data');
    }
  }

  function destroy (buffer) {
    stats.bufferCount--;

    // remove attribute link
    destroyBuffer(buffer);

    var handle = buffer.buffer;
    check$1(handle, 'buffer must not be deleted already');
    gl.deleteBuffer(handle);
    buffer.buffer = null;
    delete bufferSet[buffer.id];
  }

  function createBuffer (options, type, deferInit, persistent) {
    stats.bufferCount++;

    var buffer = new REGLBuffer(type);
    bufferSet[buffer.id] = buffer;

    function reglBuffer (options) {
      var usage = GL_STATIC_DRAW;
      var data = null;
      var byteLength = 0;
      var dtype = 0;
      var dimension = 1;
      if (Array.isArray(options) ||
          isTypedArray(options) ||
          isNDArrayLike(options) ||
          options instanceof ArrayBuffer) {
        data = options;
      } else if (typeof options === 'number') {
        byteLength = options | 0;
      } else if (options) {
        check$1.type(
          options, 'object',
          'buffer arguments must be an object, a number or an array');

        if ('data' in options) {
          check$1(
            data === null ||
            Array.isArray(data) ||
            isTypedArray(data) ||
            isNDArrayLike(data),
            'invalid data for buffer');
          data = options.data;
        }

        if ('usage' in options) {
          check$1.parameter(options.usage, usageTypes, 'invalid buffer usage');
          usage = usageTypes[options.usage];
        }

        if ('type' in options) {
          check$1.parameter(options.type, glTypes, 'invalid buffer type');
          dtype = glTypes[options.type];
        }

        if ('dimension' in options) {
          check$1.type(options.dimension, 'number', 'invalid dimension');
          dimension = options.dimension | 0;
        }

        if ('length' in options) {
          check$1.nni(byteLength, 'buffer length must be a nonnegative integer');
          byteLength = options.length | 0;
        }
      }

      buffer.bind();
      if (!data) {
        // #475
        if (byteLength) gl.bufferData(buffer.type, byteLength, usage);
        buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
        buffer.usage = usage;
        buffer.dimension = dimension;
        buffer.byteLength = byteLength;
      } else {
        initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
      }

      if (config.profile) {
        buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
      }

      return reglBuffer
    }

    function setSubData (data, offset) {
      check$1(offset + data.byteLength <= buffer.byteLength,
        'invalid buffer subdata call, buffer is too small. ' + ' Can\'t write data of size ' + data.byteLength + ' starting from offset ' + offset + ' to a buffer of size ' + buffer.byteLength);

      gl.bufferSubData(buffer.type, offset, data);
    }

    function subdata (data, offset_) {
      var offset = (offset_ || 0) | 0;
      var shape;
      buffer.bind();
      if (isTypedArray(data) || data instanceof ArrayBuffer) {
        setSubData(data, offset);
      } else if (Array.isArray(data)) {
        if (data.length > 0) {
          if (typeof data[0] === 'number') {
            var converted = pool.allocType(buffer.dtype, data.length);
            copyArray(converted, data);
            setSubData(converted, offset);
            pool.freeType(converted);
          } else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
            shape = arrayShape(data);
            var flatData = arrayFlatten(data, shape, buffer.dtype);
            setSubData(flatData, offset);
            pool.freeType(flatData);
          } else {
            check$1.raise('invalid buffer data');
          }
        }
      } else if (isNDArrayLike(data)) {
        shape = data.shape;
        var stride = data.stride;

        var shapeX = 0;
        var shapeY = 0;
        var strideX = 0;
        var strideY = 0;
        if (shape.length === 1) {
          shapeX = shape[0];
          shapeY = 1;
          strideX = stride[0];
          strideY = 0;
        } else if (shape.length === 2) {
          shapeX = shape[0];
          shapeY = shape[1];
          strideX = stride[0];
          strideY = stride[1];
        } else {
          check$1.raise('invalid shape');
        }
        var dtype = Array.isArray(data.data)
          ? buffer.dtype
          : typedArrayCode(data.data);

        var transposeData = pool.allocType(dtype, shapeX * shapeY);
        transpose(transposeData,
          data.data,
          shapeX, shapeY,
          strideX, strideY,
          data.offset);
        setSubData(transposeData, offset);
        pool.freeType(transposeData);
      } else {
        check$1.raise('invalid data for buffer subdata');
      }
      return reglBuffer
    }

    if (!deferInit) {
      reglBuffer(options);
    }

    reglBuffer._reglType = 'buffer';
    reglBuffer._buffer = buffer;
    reglBuffer.subdata = subdata;
    if (config.profile) {
      reglBuffer.stats = buffer.stats;
    }
    reglBuffer.destroy = function () { destroy(buffer); };

    return reglBuffer
  }

  function restoreBuffers () {
    values(bufferSet).forEach(function (buffer) {
      buffer.buffer = gl.createBuffer();
      gl.bindBuffer(buffer.type, buffer.buffer);
      gl.bufferData(
        buffer.type, buffer.persistentData || buffer.byteLength, buffer.usage);
    });
  }

  if (config.profile) {
    stats.getTotalBufferSize = function () {
      var total = 0;
      // TODO: Right now, the streams are not part of the total count.
      Object.keys(bufferSet).forEach(function (key) {
        total += bufferSet[key].stats.size;
      });
      return total
    };
  }

  return {
    create: createBuffer,

    createStream: createStream,
    destroyStream: destroyStream,

    clear: function () {
      values(bufferSet).forEach(destroy);
      streamPool.forEach(destroy);
    },

    getBuffer: function (wrapper) {
      if (wrapper && wrapper._buffer instanceof REGLBuffer) {
        return wrapper._buffer
      }
      return null
    },

    restore: restoreBuffers,

    _initBuffer: initBufferFromData
  }
}

var points = 0;
var point = 0;
var lines = 1;
var line = 1;
var triangles = 4;
var triangle = 4;
var primTypes = {
	points: points,
	point: point,
	lines: lines,
	line: line,
	triangles: triangles,
	triangle: triangle,
	"line loop": 2,
	"line strip": 3,
	"triangle strip": 5,
	"triangle fan": 6
};

var GL_POINTS = 0;
var GL_LINES = 1;
var GL_TRIANGLES = 4;

var GL_BYTE$2 = 5120;
var GL_UNSIGNED_BYTE$4 = 5121;
var GL_SHORT$2 = 5122;
var GL_UNSIGNED_SHORT$2 = 5123;
var GL_INT$2 = 5124;
var GL_UNSIGNED_INT$2 = 5125;

var GL_ELEMENT_ARRAY_BUFFER = 34963;

var GL_STREAM_DRAW$1 = 0x88E0;
var GL_STATIC_DRAW$1 = 0x88E4;

function wrapElementsState (gl, extensions, bufferState, stats) {
  var elementSet = {};
  var elementCount = 0;

  var elementTypes = {
    'uint8': GL_UNSIGNED_BYTE$4,
    'uint16': GL_UNSIGNED_SHORT$2
  };

  if (extensions.oes_element_index_uint) {
    elementTypes.uint32 = GL_UNSIGNED_INT$2;
  }

  function REGLElementBuffer (buffer) {
    this.id = elementCount++;
    elementSet[this.id] = this;
    this.buffer = buffer;
    this.primType = GL_TRIANGLES;
    this.vertCount = 0;
    this.type = 0;
  }

  REGLElementBuffer.prototype.bind = function () {
    this.buffer.bind();
  };

  var bufferPool = [];

  function createElementStream (data) {
    var result = bufferPool.pop();
    if (!result) {
      result = new REGLElementBuffer(bufferState.create(
        null,
        GL_ELEMENT_ARRAY_BUFFER,
        true,
        false)._buffer);
    }
    initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
    return result
  }

  function destroyElementStream (elements) {
    bufferPool.push(elements);
  }

  function initElements (
    elements,
    data,
    usage,
    prim,
    count,
    byteLength,
    type) {
    elements.buffer.bind();
    var dtype;
    if (data) {
      var predictedType = type;
      if (!type && (
        !isTypedArray(data) ||
         (isNDArrayLike(data) && !isTypedArray(data.data)))) {
        predictedType = extensions.oes_element_index_uint
          ? GL_UNSIGNED_INT$2
          : GL_UNSIGNED_SHORT$2;
      }
      bufferState._initBuffer(
        elements.buffer,
        data,
        usage,
        predictedType,
        3);
    } else {
      gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
      elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$4;
      elements.buffer.usage = usage;
      elements.buffer.dimension = 3;
      elements.buffer.byteLength = byteLength;
    }

    dtype = type;
    if (!type) {
      switch (elements.buffer.dtype) {
        case GL_UNSIGNED_BYTE$4:
        case GL_BYTE$2:
          dtype = GL_UNSIGNED_BYTE$4;
          break

        case GL_UNSIGNED_SHORT$2:
        case GL_SHORT$2:
          dtype = GL_UNSIGNED_SHORT$2;
          break

        case GL_UNSIGNED_INT$2:
        case GL_INT$2:
          dtype = GL_UNSIGNED_INT$2;
          break

        default:
          check$1.raise('unsupported type for element array');
      }
      elements.buffer.dtype = dtype;
    }
    elements.type = dtype;

    // Check oes_element_index_uint extension
    check$1(
      dtype !== GL_UNSIGNED_INT$2 ||
      !!extensions.oes_element_index_uint,
      '32 bit element buffers not supported, enable oes_element_index_uint first');

    // try to guess default primitive type and arguments
    var vertCount = count;
    if (vertCount < 0) {
      vertCount = elements.buffer.byteLength;
      if (dtype === GL_UNSIGNED_SHORT$2) {
        vertCount >>= 1;
      } else if (dtype === GL_UNSIGNED_INT$2) {
        vertCount >>= 2;
      }
    }
    elements.vertCount = vertCount;

    // try to guess primitive type from cell dimension
    var primType = prim;
    if (prim < 0) {
      primType = GL_TRIANGLES;
      var dimension = elements.buffer.dimension;
      if (dimension === 1) primType = GL_POINTS;
      if (dimension === 2) primType = GL_LINES;
      if (dimension === 3) primType = GL_TRIANGLES;
    }
    elements.primType = primType;
  }

  function destroyElements (elements) {
    stats.elementsCount--;

    check$1(elements.buffer !== null, 'must not double destroy elements');
    delete elementSet[elements.id];
    elements.buffer.destroy();
    elements.buffer = null;
  }

  function createElements (options, persistent) {
    var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
    var elements = new REGLElementBuffer(buffer._buffer);
    stats.elementsCount++;

    function reglElements (options) {
      if (!options) {
        buffer();
        elements.primType = GL_TRIANGLES;
        elements.vertCount = 0;
        elements.type = GL_UNSIGNED_BYTE$4;
      } else if (typeof options === 'number') {
        buffer(options);
        elements.primType = GL_TRIANGLES;
        elements.vertCount = options | 0;
        elements.type = GL_UNSIGNED_BYTE$4;
      } else {
        var data = null;
        var usage = GL_STATIC_DRAW$1;
        var primType = -1;
        var vertCount = -1;
        var byteLength = 0;
        var dtype = 0;
        if (Array.isArray(options) ||
            isTypedArray(options) ||
            isNDArrayLike(options)) {
          data = options;
        } else {
          check$1.type(options, 'object', 'invalid arguments for elements');
          if ('data' in options) {
            data = options.data;
            check$1(
              Array.isArray(data) ||
                isTypedArray(data) ||
                isNDArrayLike(data),
              'invalid data for element buffer');
          }
          if ('usage' in options) {
            check$1.parameter(
              options.usage,
              usageTypes,
              'invalid element buffer usage');
            usage = usageTypes[options.usage];
          }
          if ('primitive' in options) {
            check$1.parameter(
              options.primitive,
              primTypes,
              'invalid element buffer primitive');
            primType = primTypes[options.primitive];
          }
          if ('count' in options) {
            check$1(
              typeof options.count === 'number' && options.count >= 0,
              'invalid vertex count for elements');
            vertCount = options.count | 0;
          }
          if ('type' in options) {
            check$1.parameter(
              options.type,
              elementTypes,
              'invalid buffer type');
            dtype = elementTypes[options.type];
          }
          if ('length' in options) {
            byteLength = options.length | 0;
          } else {
            byteLength = vertCount;
            if (dtype === GL_UNSIGNED_SHORT$2 || dtype === GL_SHORT$2) {
              byteLength *= 2;
            } else if (dtype === GL_UNSIGNED_INT$2 || dtype === GL_INT$2) {
              byteLength *= 4;
            }
          }
        }
        initElements(
          elements,
          data,
          usage,
          primType,
          vertCount,
          byteLength,
          dtype);
      }

      return reglElements
    }

    reglElements(options);

    reglElements._reglType = 'elements';
    reglElements._elements = elements;
    reglElements.subdata = function (data, offset) {
      buffer.subdata(data, offset);
      return reglElements
    };
    reglElements.destroy = function () {
      destroyElements(elements);
    };

    return reglElements
  }

  return {
    create: createElements,
    createStream: createElementStream,
    destroyStream: destroyElementStream,
    getElements: function (elements) {
      if (typeof elements === 'function' &&
          elements._elements instanceof REGLElementBuffer) {
        return elements._elements
      }
      return null
    },
    clear: function () {
      values(elementSet).forEach(destroyElements);
    }
  }
}

var FLOAT = new Float32Array(1);
var INT = new Uint32Array(FLOAT.buffer);

var GL_UNSIGNED_SHORT$4 = 5123;

function convertToHalfFloat (array) {
  var ushorts = pool.allocType(GL_UNSIGNED_SHORT$4, array.length);

  for (var i = 0; i < array.length; ++i) {
    if (isNaN(array[i])) {
      ushorts[i] = 0xffff;
    } else if (array[i] === Infinity) {
      ushorts[i] = 0x7c00;
    } else if (array[i] === -Infinity) {
      ushorts[i] = 0xfc00;
    } else {
      FLOAT[0] = array[i];
      var x = INT[0];

      var sgn = (x >>> 31) << 15;
      var exp = ((x << 1) >>> 24) - 127;
      var frac = (x >> 13) & ((1 << 10) - 1);

      if (exp < -24) {
        // round non-representable denormals to 0
        ushorts[i] = sgn;
      } else if (exp < -14) {
        // handle denormals
        var s = -14 - exp;
        ushorts[i] = sgn + ((frac + (1 << 10)) >> s);
      } else if (exp > 15) {
        // round overflow to +/- Infinity
        ushorts[i] = sgn + 0x7c00;
      } else {
        // otherwise convert directly
        ushorts[i] = sgn + ((exp + 15) << 10) + frac;
      }
    }
  }

  return ushorts
}

function isArrayLike (s) {
  return Array.isArray(s) || isTypedArray(s)
}

var isPow2$1 = function (v) {
  return !(v & (v - 1)) && (!!v)
};

var GL_COMPRESSED_TEXTURE_FORMATS = 0x86A3;

var GL_TEXTURE_2D$1 = 0x0DE1;
var GL_TEXTURE_CUBE_MAP$1 = 0x8513;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 = 0x8515;

var GL_RGBA$1 = 0x1908;
var GL_ALPHA = 0x1906;
var GL_RGB = 0x1907;
var GL_LUMINANCE = 0x1909;
var GL_LUMINANCE_ALPHA = 0x190A;

var GL_RGBA4 = 0x8056;
var GL_RGB5_A1 = 0x8057;
var GL_RGB565 = 0x8D62;

var GL_UNSIGNED_SHORT_4_4_4_4$1 = 0x8033;
var GL_UNSIGNED_SHORT_5_5_5_1$1 = 0x8034;
var GL_UNSIGNED_SHORT_5_6_5$1 = 0x8363;
var GL_UNSIGNED_INT_24_8_WEBGL$1 = 0x84FA;

var GL_DEPTH_COMPONENT = 0x1902;
var GL_DEPTH_STENCIL = 0x84F9;

var GL_SRGB_EXT = 0x8C40;
var GL_SRGB_ALPHA_EXT = 0x8C42;

var GL_HALF_FLOAT_OES$1 = 0x8D61;

var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

var GL_COMPRESSED_RGB_ATC_WEBGL = 0x8C92;
var GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8C93;
var GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87EE;

var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;

var GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;

var GL_UNSIGNED_BYTE$5 = 0x1401;
var GL_UNSIGNED_SHORT$3 = 0x1403;
var GL_UNSIGNED_INT$3 = 0x1405;
var GL_FLOAT$4 = 0x1406;

var GL_TEXTURE_WRAP_S = 0x2802;
var GL_TEXTURE_WRAP_T = 0x2803;

var GL_REPEAT = 0x2901;
var GL_CLAMP_TO_EDGE$1 = 0x812F;
var GL_MIRRORED_REPEAT = 0x8370;

var GL_TEXTURE_MAG_FILTER = 0x2800;
var GL_TEXTURE_MIN_FILTER = 0x2801;

var GL_NEAREST$1 = 0x2600;
var GL_LINEAR = 0x2601;
var GL_NEAREST_MIPMAP_NEAREST$1 = 0x2700;
var GL_LINEAR_MIPMAP_NEAREST$1 = 0x2701;
var GL_NEAREST_MIPMAP_LINEAR$1 = 0x2702;
var GL_LINEAR_MIPMAP_LINEAR$1 = 0x2703;

var GL_GENERATE_MIPMAP_HINT = 0x8192;
var GL_DONT_CARE = 0x1100;
var GL_FASTEST = 0x1101;
var GL_NICEST = 0x1102;

var GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;

var GL_UNPACK_ALIGNMENT = 0x0CF5;
var GL_UNPACK_FLIP_Y_WEBGL = 0x9240;
var GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
var GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;

var GL_BROWSER_DEFAULT_WEBGL = 0x9244;

var GL_TEXTURE0$1 = 0x84C0;

var MIPMAP_FILTERS = [
  GL_NEAREST_MIPMAP_NEAREST$1,
  GL_NEAREST_MIPMAP_LINEAR$1,
  GL_LINEAR_MIPMAP_NEAREST$1,
  GL_LINEAR_MIPMAP_LINEAR$1
];

var CHANNELS_FORMAT = [
  0,
  GL_LUMINANCE,
  GL_LUMINANCE_ALPHA,
  GL_RGB,
  GL_RGBA$1
];

var FORMAT_CHANNELS = {};
FORMAT_CHANNELS[GL_LUMINANCE] =
FORMAT_CHANNELS[GL_ALPHA] =
FORMAT_CHANNELS[GL_DEPTH_COMPONENT] = 1;
FORMAT_CHANNELS[GL_DEPTH_STENCIL] =
FORMAT_CHANNELS[GL_LUMINANCE_ALPHA] = 2;
FORMAT_CHANNELS[GL_RGB] =
FORMAT_CHANNELS[GL_SRGB_EXT] = 3;
FORMAT_CHANNELS[GL_RGBA$1] =
FORMAT_CHANNELS[GL_SRGB_ALPHA_EXT] = 4;

function objectName (str) {
  return '[object ' + str + ']'
}

var CANVAS_CLASS = objectName('HTMLCanvasElement');
var OFFSCREENCANVAS_CLASS = objectName('OffscreenCanvas');
var CONTEXT2D_CLASS = objectName('CanvasRenderingContext2D');
var BITMAP_CLASS = objectName('ImageBitmap');
var IMAGE_CLASS = objectName('HTMLImageElement');
var VIDEO_CLASS = objectName('HTMLVideoElement');

var PIXEL_CLASSES = Object.keys(arrayTypes).concat([
  CANVAS_CLASS,
  OFFSCREENCANVAS_CLASS,
  CONTEXT2D_CLASS,
  BITMAP_CLASS,
  IMAGE_CLASS,
  VIDEO_CLASS
]);

// for every texture type, store
// the size in bytes.
var TYPE_SIZES = [];
TYPE_SIZES[GL_UNSIGNED_BYTE$5] = 1;
TYPE_SIZES[GL_FLOAT$4] = 4;
TYPE_SIZES[GL_HALF_FLOAT_OES$1] = 2;

TYPE_SIZES[GL_UNSIGNED_SHORT$3] = 2;
TYPE_SIZES[GL_UNSIGNED_INT$3] = 4;

var FORMAT_SIZES_SPECIAL = [];
FORMAT_SIZES_SPECIAL[GL_RGBA4] = 2;
FORMAT_SIZES_SPECIAL[GL_RGB5_A1] = 2;
FORMAT_SIZES_SPECIAL[GL_RGB565] = 2;
FORMAT_SIZES_SPECIAL[GL_DEPTH_STENCIL] = 4;

FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1;

FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ATC_WEBGL] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1;

FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25;

FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ETC1_WEBGL] = 0.5;

function isNumericArray (arr) {
  return (
    Array.isArray(arr) &&
    (arr.length === 0 ||
    typeof arr[0] === 'number'))
}

function isRectArray (arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  var width = arr.length;
  if (width === 0 || !isArrayLike(arr[0])) {
    return false
  }
  return true
}

function classString (x) {
  return Object.prototype.toString.call(x)
}

function isCanvasElement (object) {
  return classString(object) === CANVAS_CLASS
}

function isOffscreenCanvas (object) {
  return classString(object) === OFFSCREENCANVAS_CLASS
}

function isContext2D (object) {
  return classString(object) === CONTEXT2D_CLASS
}

function isBitmap (object) {
  return classString(object) === BITMAP_CLASS
}

function isImageElement (object) {
  return classString(object) === IMAGE_CLASS
}

function isVideoElement (object) {
  return classString(object) === VIDEO_CLASS
}

function isPixelData (object) {
  if (!object) {
    return false
  }
  var className = classString(object);
  if (PIXEL_CLASSES.indexOf(className) >= 0) {
    return true
  }
  return (
    isNumericArray(object) ||
    isRectArray(object) ||
    isNDArrayLike(object))
}

function typedArrayCode$1 (data) {
  return arrayTypes[Object.prototype.toString.call(data)] | 0
}

function convertData (result, data) {
  var n = data.length;
  switch (result.type) {
    case GL_UNSIGNED_BYTE$5:
    case GL_UNSIGNED_SHORT$3:
    case GL_UNSIGNED_INT$3:
    case GL_FLOAT$4:
      var converted = pool.allocType(result.type, n);
      converted.set(data);
      result.data = converted;
      break

    case GL_HALF_FLOAT_OES$1:
      result.data = convertToHalfFloat(data);
      break

    default:
      check$1.raise('unsupported texture type, must specify a typed array');
  }
}

function preConvert (image, n) {
  return pool.allocType(
    image.type === GL_HALF_FLOAT_OES$1
      ? GL_FLOAT$4
      : image.type, n)
}

function postConvert (image, data) {
  if (image.type === GL_HALF_FLOAT_OES$1) {
    image.data = convertToHalfFloat(data);
    pool.freeType(data);
  } else {
    image.data = data;
  }
}

function transposeData (image, array, strideX, strideY, strideC, offset) {
  var w = image.width;
  var h = image.height;
  var c = image.channels;
  var n = w * h * c;
  var data = preConvert(image, n);

  var p = 0;
  for (var i = 0; i < h; ++i) {
    for (var j = 0; j < w; ++j) {
      for (var k = 0; k < c; ++k) {
        data[p++] = array[strideX * j + strideY * i + strideC * k + offset];
      }
    }
  }

  postConvert(image, data);
}

function getTextureSize (format, type, width, height, isMipmap, isCube) {
  var s;
  if (typeof FORMAT_SIZES_SPECIAL[format] !== 'undefined') {
    // we have a special array for dealing with weird color formats such as RGB5A1
    s = FORMAT_SIZES_SPECIAL[format];
  } else {
    s = FORMAT_CHANNELS[format] * TYPE_SIZES[type];
  }

  if (isCube) {
    s *= 6;
  }

  if (isMipmap) {
    // compute the total size of all the mipmaps.
    var total = 0;

    var w = width;
    while (w >= 1) {
      // we can only use mipmaps on a square image,
      // so we can simply use the width and ignore the height:
      total += s * w * w;
      w /= 2;
    }
    return total
  } else {
    return s * width * height
  }
}

function createTextureSet (
  gl, extensions, limits, reglPoll, contextState, stats, config) {
  // -------------------------------------------------------
  // Initialize constants and parameter tables here
  // -------------------------------------------------------
  var mipmapHint = {
    "don't care": GL_DONT_CARE,
    'dont care': GL_DONT_CARE,
    'nice': GL_NICEST,
    'fast': GL_FASTEST
  };

  var wrapModes = {
    'repeat': GL_REPEAT,
    'clamp': GL_CLAMP_TO_EDGE$1,
    'mirror': GL_MIRRORED_REPEAT
  };

  var magFilters = {
    'nearest': GL_NEAREST$1,
    'linear': GL_LINEAR
  };

  var minFilters = extend({
    'mipmap': GL_LINEAR_MIPMAP_LINEAR$1,
    'nearest mipmap nearest': GL_NEAREST_MIPMAP_NEAREST$1,
    'linear mipmap nearest': GL_LINEAR_MIPMAP_NEAREST$1,
    'nearest mipmap linear': GL_NEAREST_MIPMAP_LINEAR$1,
    'linear mipmap linear': GL_LINEAR_MIPMAP_LINEAR$1
  }, magFilters);

  var colorSpace = {
    'none': 0,
    'browser': GL_BROWSER_DEFAULT_WEBGL
  };

  var textureTypes = {
    'uint8': GL_UNSIGNED_BYTE$5,
    'rgba4': GL_UNSIGNED_SHORT_4_4_4_4$1,
    'rgb565': GL_UNSIGNED_SHORT_5_6_5$1,
    'rgb5 a1': GL_UNSIGNED_SHORT_5_5_5_1$1
  };

  var textureFormats = {
    'alpha': GL_ALPHA,
    'luminance': GL_LUMINANCE,
    'luminance alpha': GL_LUMINANCE_ALPHA,
    'rgb': GL_RGB,
    'rgba': GL_RGBA$1,
    'rgba4': GL_RGBA4,
    'rgb5 a1': GL_RGB5_A1,
    'rgb565': GL_RGB565
  };

  var compressedTextureFormats = {};

  if (extensions.ext_srgb) {
    textureFormats.srgb = GL_SRGB_EXT;
    textureFormats.srgba = GL_SRGB_ALPHA_EXT;
  }

  if (extensions.oes_texture_float) {
    textureTypes.float32 = textureTypes.float = GL_FLOAT$4;
  }

  if (extensions.oes_texture_half_float) {
    textureTypes['float16'] = textureTypes['half float'] = GL_HALF_FLOAT_OES$1;
  }

  if (extensions.webgl_depth_texture) {
    extend(textureFormats, {
      'depth': GL_DEPTH_COMPONENT,
      'depth stencil': GL_DEPTH_STENCIL
    });

    extend(textureTypes, {
      'uint16': GL_UNSIGNED_SHORT$3,
      'uint32': GL_UNSIGNED_INT$3,
      'depth stencil': GL_UNSIGNED_INT_24_8_WEBGL$1
    });
  }

  if (extensions.webgl_compressed_texture_s3tc) {
    extend(compressedTextureFormats, {
      'rgb s3tc dxt1': GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
      'rgba s3tc dxt1': GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
      'rgba s3tc dxt3': GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
      'rgba s3tc dxt5': GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
    });
  }

  if (extensions.webgl_compressed_texture_atc) {
    extend(compressedTextureFormats, {
      'rgb atc': GL_COMPRESSED_RGB_ATC_WEBGL,
      'rgba atc explicit alpha': GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
      'rgba atc interpolated alpha': GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
    });
  }

  if (extensions.webgl_compressed_texture_pvrtc) {
    extend(compressedTextureFormats, {
      'rgb pvrtc 4bppv1': GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
      'rgb pvrtc 2bppv1': GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
      'rgba pvrtc 4bppv1': GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
      'rgba pvrtc 2bppv1': GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
    });
  }

  if (extensions.webgl_compressed_texture_etc1) {
    compressedTextureFormats['rgb etc1'] = GL_COMPRESSED_RGB_ETC1_WEBGL;
  }

  // Copy over all texture formats
  var supportedCompressedFormats = Array.prototype.slice.call(
    gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS));
  Object.keys(compressedTextureFormats).forEach(function (name) {
    var format = compressedTextureFormats[name];
    if (supportedCompressedFormats.indexOf(format) >= 0) {
      textureFormats[name] = format;
    }
  });

  var supportedFormats = Object.keys(textureFormats);
  limits.textureFormats = supportedFormats;

  // associate with every format string its
  // corresponding GL-value.
  var textureFormatsInvert = [];
  Object.keys(textureFormats).forEach(function (key) {
    var val = textureFormats[key];
    textureFormatsInvert[val] = key;
  });

  // associate with every type string its
  // corresponding GL-value.
  var textureTypesInvert = [];
  Object.keys(textureTypes).forEach(function (key) {
    var val = textureTypes[key];
    textureTypesInvert[val] = key;
  });

  var magFiltersInvert = [];
  Object.keys(magFilters).forEach(function (key) {
    var val = magFilters[key];
    magFiltersInvert[val] = key;
  });

  var minFiltersInvert = [];
  Object.keys(minFilters).forEach(function (key) {
    var val = minFilters[key];
    minFiltersInvert[val] = key;
  });

  var wrapModesInvert = [];
  Object.keys(wrapModes).forEach(function (key) {
    var val = wrapModes[key];
    wrapModesInvert[val] = key;
  });

  // colorFormats[] gives the format (channels) associated to an
  // internalformat
  var colorFormats = supportedFormats.reduce(function (color, key) {
    var glenum = textureFormats[key];
    if (glenum === GL_LUMINANCE ||
        glenum === GL_ALPHA ||
        glenum === GL_LUMINANCE ||
        glenum === GL_LUMINANCE_ALPHA ||
        glenum === GL_DEPTH_COMPONENT ||
        glenum === GL_DEPTH_STENCIL ||
        (extensions.ext_srgb &&
                (glenum === GL_SRGB_EXT ||
                 glenum === GL_SRGB_ALPHA_EXT))) {
      color[glenum] = glenum;
    } else if (glenum === GL_RGB5_A1 || key.indexOf('rgba') >= 0) {
      color[glenum] = GL_RGBA$1;
    } else {
      color[glenum] = GL_RGB;
    }
    return color
  }, {});

  function TexFlags () {
    // format info
    this.internalformat = GL_RGBA$1;
    this.format = GL_RGBA$1;
    this.type = GL_UNSIGNED_BYTE$5;
    this.compressed = false;

    // pixel storage
    this.premultiplyAlpha = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.colorSpace = GL_BROWSER_DEFAULT_WEBGL;

    // shape info
    this.width = 0;
    this.height = 0;
    this.channels = 0;
  }

  function copyFlags (result, other) {
    result.internalformat = other.internalformat;
    result.format = other.format;
    result.type = other.type;
    result.compressed = other.compressed;

    result.premultiplyAlpha = other.premultiplyAlpha;
    result.flipY = other.flipY;
    result.unpackAlignment = other.unpackAlignment;
    result.colorSpace = other.colorSpace;

    result.width = other.width;
    result.height = other.height;
    result.channels = other.channels;
  }

  function parseFlags (flags, options) {
    if (typeof options !== 'object' || !options) {
      return
    }

    if ('premultiplyAlpha' in options) {
      check$1.type(options.premultiplyAlpha, 'boolean',
        'invalid premultiplyAlpha');
      flags.premultiplyAlpha = options.premultiplyAlpha;
    }

    if ('flipY' in options) {
      check$1.type(options.flipY, 'boolean',
        'invalid texture flip');
      flags.flipY = options.flipY;
    }

    if ('alignment' in options) {
      check$1.oneOf(options.alignment, [1, 2, 4, 8],
        'invalid texture unpack alignment');
      flags.unpackAlignment = options.alignment;
    }

    if ('colorSpace' in options) {
      check$1.parameter(options.colorSpace, colorSpace,
        'invalid colorSpace');
      flags.colorSpace = colorSpace[options.colorSpace];
    }

    if ('type' in options) {
      var type = options.type;
      check$1(extensions.oes_texture_float ||
        !(type === 'float' || type === 'float32'),
      'you must enable the OES_texture_float extension in order to use floating point textures.');
      check$1(extensions.oes_texture_half_float ||
        !(type === 'half float' || type === 'float16'),
      'you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures.');
      check$1(extensions.webgl_depth_texture ||
        !(type === 'uint16' || type === 'uint32' || type === 'depth stencil'),
      'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
      check$1.parameter(type, textureTypes,
        'invalid texture type');
      flags.type = textureTypes[type];
    }

    var w = flags.width;
    var h = flags.height;
    var c = flags.channels;
    var hasChannels = false;
    if ('shape' in options) {
      check$1(Array.isArray(options.shape) && options.shape.length >= 2,
        'shape must be an array');
      w = options.shape[0];
      h = options.shape[1];
      if (options.shape.length === 3) {
        c = options.shape[2];
        check$1(c > 0 && c <= 4, 'invalid number of channels');
        hasChannels = true;
      }
      check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
      check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
    } else {
      if ('radius' in options) {
        w = h = options.radius;
        check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid radius');
      }
      if ('width' in options) {
        w = options.width;
        check$1(w >= 0 && w <= limits.maxTextureSize, 'invalid width');
      }
      if ('height' in options) {
        h = options.height;
        check$1(h >= 0 && h <= limits.maxTextureSize, 'invalid height');
      }
      if ('channels' in options) {
        c = options.channels;
        check$1(c > 0 && c <= 4, 'invalid number of channels');
        hasChannels = true;
      }
    }
    flags.width = w | 0;
    flags.height = h | 0;
    flags.channels = c | 0;

    var hasFormat = false;
    if ('format' in options) {
      var formatStr = options.format;
      check$1(extensions.webgl_depth_texture ||
        !(formatStr === 'depth' || formatStr === 'depth stencil'),
      'you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.');
      check$1.parameter(formatStr, textureFormats,
        'invalid texture format');
      var internalformat = flags.internalformat = textureFormats[formatStr];
      flags.format = colorFormats[internalformat];
      if (formatStr in textureTypes) {
        if (!('type' in options)) {
          flags.type = textureTypes[formatStr];
        }
      }
      if (formatStr in compressedTextureFormats) {
        flags.compressed = true;
      }
      hasFormat = true;
    }

    // Reconcile channels and format
    if (!hasChannels && hasFormat) {
      flags.channels = FORMAT_CHANNELS[flags.format];
    } else if (hasChannels && !hasFormat) {
      if (flags.channels !== CHANNELS_FORMAT[flags.format]) {
        flags.format = flags.internalformat = CHANNELS_FORMAT[flags.channels];
      }
    } else if (hasFormat && hasChannels) {
      check$1(
        flags.channels === FORMAT_CHANNELS[flags.format],
        'number of channels inconsistent with specified format');
    }
  }

  function setFlags (flags) {
    gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
    gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
    gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
    gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
  }

  // -------------------------------------------------------
  // Tex image data
  // -------------------------------------------------------
  function TexImage () {
    TexFlags.call(this);

    this.xOffset = 0;
    this.yOffset = 0;

    // data
    this.data = null;
    this.needsFree = false;

    // html element
    this.element = null;

    // copyTexImage info
    this.needsCopy = false;
  }

  function parseImage (image, options) {
    var data = null;
    if (isPixelData(options)) {
      data = options;
    } else if (options) {
      check$1.type(options, 'object', 'invalid pixel data type');
      parseFlags(image, options);
      if ('x' in options) {
        image.xOffset = options.x | 0;
      }
      if ('y' in options) {
        image.yOffset = options.y | 0;
      }
      if (isPixelData(options.data)) {
        data = options.data;
      }
    }

    check$1(
      !image.compressed ||
      data instanceof Uint8Array,
      'compressed texture data must be stored in a uint8array');

    if (options.copy) {
      check$1(!data, 'can not specify copy and data field for the same texture');
      var viewW = contextState.viewportWidth;
      var viewH = contextState.viewportHeight;
      image.width = image.width || (viewW - image.xOffset);
      image.height = image.height || (viewH - image.yOffset);
      image.needsCopy = true;
      check$1(image.xOffset >= 0 && image.xOffset < viewW &&
            image.yOffset >= 0 && image.yOffset < viewH &&
            image.width > 0 && image.width <= viewW &&
            image.height > 0 && image.height <= viewH,
      'copy texture read out of bounds');
    } else if (!data) {
      image.width = image.width || 1;
      image.height = image.height || 1;
      image.channels = image.channels || 4;
    } else if (isTypedArray(data)) {
      image.channels = image.channels || 4;
      image.data = data;
      if (!('type' in options) && image.type === GL_UNSIGNED_BYTE$5) {
        image.type = typedArrayCode$1(data);
      }
    } else if (isNumericArray(data)) {
      image.channels = image.channels || 4;
      convertData(image, data);
      image.alignment = 1;
      image.needsFree = true;
    } else if (isNDArrayLike(data)) {
      var array = data.data;
      if (!Array.isArray(array) && image.type === GL_UNSIGNED_BYTE$5) {
        image.type = typedArrayCode$1(array);
      }
      var shape = data.shape;
      var stride = data.stride;
      var shapeX, shapeY, shapeC, strideX, strideY, strideC;
      if (shape.length === 3) {
        shapeC = shape[2];
        strideC = stride[2];
      } else {
        check$1(shape.length === 2, 'invalid ndarray pixel data, must be 2 or 3D');
        shapeC = 1;
        strideC = 1;
      }
      shapeX = shape[0];
      shapeY = shape[1];
      strideX = stride[0];
      strideY = stride[1];
      image.alignment = 1;
      image.width = shapeX;
      image.height = shapeY;
      image.channels = shapeC;
      image.format = image.internalformat = CHANNELS_FORMAT[shapeC];
      image.needsFree = true;
      transposeData(image, array, strideX, strideY, strideC, data.offset);
    } else if (isCanvasElement(data) || isOffscreenCanvas(data) || isContext2D(data)) {
      if (isCanvasElement(data) || isOffscreenCanvas(data)) {
        image.element = data;
      } else {
        image.element = data.canvas;
      }
      image.width = image.element.width;
      image.height = image.element.height;
      image.channels = 4;
    } else if (isBitmap(data)) {
      image.element = data;
      image.width = data.width;
      image.height = data.height;
      image.channels = 4;
    } else if (isImageElement(data)) {
      image.element = data;
      image.width = data.naturalWidth;
      image.height = data.naturalHeight;
      image.channels = 4;
    } else if (isVideoElement(data)) {
      image.element = data;
      image.width = data.videoWidth;
      image.height = data.videoHeight;
      image.channels = 4;
    } else if (isRectArray(data)) {
      var w = image.width || data[0].length;
      var h = image.height || data.length;
      var c = image.channels;
      if (isArrayLike(data[0][0])) {
        c = c || data[0][0].length;
      } else {
        c = c || 1;
      }
      var arrayShape = flattenUtils.shape(data);
      var n = 1;
      for (var dd = 0; dd < arrayShape.length; ++dd) {
        n *= arrayShape[dd];
      }
      var allocData = preConvert(image, n);
      flattenUtils.flatten(data, arrayShape, '', allocData);
      postConvert(image, allocData);
      image.alignment = 1;
      image.width = w;
      image.height = h;
      image.channels = c;
      image.format = image.internalformat = CHANNELS_FORMAT[c];
      image.needsFree = true;
    }

    if (image.type === GL_FLOAT$4) {
      check$1(limits.extensions.indexOf('oes_texture_float') >= 0,
        'oes_texture_float extension not enabled');
    } else if (image.type === GL_HALF_FLOAT_OES$1) {
      check$1(limits.extensions.indexOf('oes_texture_half_float') >= 0,
        'oes_texture_half_float extension not enabled');
    }

    // do compressed texture  validation here.
  }

  function setImage (info, target, miplevel) {
    var element = info.element;
    var data = info.data;
    var internalformat = info.internalformat;
    var format = info.format;
    var type = info.type;
    var width = info.width;
    var height = info.height;

    setFlags(info);

    if (element) {
      gl.texImage2D(target, miplevel, format, format, type, element);
    } else if (info.compressed) {
      gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
    } else if (info.needsCopy) {
      reglPoll();
      gl.copyTexImage2D(
        target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
    } else {
      gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
    }
  }

  function setSubImage (info, target, x, y, miplevel) {
    var element = info.element;
    var data = info.data;
    var internalformat = info.internalformat;
    var format = info.format;
    var type = info.type;
    var width = info.width;
    var height = info.height;

    setFlags(info);

    if (element) {
      gl.texSubImage2D(
        target, miplevel, x, y, format, type, element);
    } else if (info.compressed) {
      gl.compressedTexSubImage2D(
        target, miplevel, x, y, internalformat, width, height, data);
    } else if (info.needsCopy) {
      reglPoll();
      gl.copyTexSubImage2D(
        target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
    } else {
      gl.texSubImage2D(
        target, miplevel, x, y, width, height, format, type, data);
    }
  }

  // texImage pool
  var imagePool = [];

  function allocImage () {
    return imagePool.pop() || new TexImage()
  }

  function freeImage (image) {
    if (image.needsFree) {
      pool.freeType(image.data);
    }
    TexImage.call(image);
    imagePool.push(image);
  }

  // -------------------------------------------------------
  // Mip map
  // -------------------------------------------------------
  function MipMap () {
    TexFlags.call(this);

    this.genMipmaps = false;
    this.mipmapHint = GL_DONT_CARE;
    this.mipmask = 0;
    this.images = Array(16);
  }

  function parseMipMapFromShape (mipmap, width, height) {
    var img = mipmap.images[0] = allocImage();
    mipmap.mipmask = 1;
    img.width = mipmap.width = width;
    img.height = mipmap.height = height;
    img.channels = mipmap.channels = 4;
  }

  function parseMipMapFromObject (mipmap, options) {
    var imgData = null;
    if (isPixelData(options)) {
      imgData = mipmap.images[0] = allocImage();
      copyFlags(imgData, mipmap);
      parseImage(imgData, options);
      mipmap.mipmask = 1;
    } else {
      parseFlags(mipmap, options);
      if (Array.isArray(options.mipmap)) {
        var mipData = options.mipmap;
        for (var i = 0; i < mipData.length; ++i) {
          imgData = mipmap.images[i] = allocImage();
          copyFlags(imgData, mipmap);
          imgData.width >>= i;
          imgData.height >>= i;
          parseImage(imgData, mipData[i]);
          mipmap.mipmask |= (1 << i);
        }
      } else {
        imgData = mipmap.images[0] = allocImage();
        copyFlags(imgData, mipmap);
        parseImage(imgData, options);
        mipmap.mipmask = 1;
      }
    }
    copyFlags(mipmap, mipmap.images[0]);

    // For textures of the compressed format WEBGL_compressed_texture_s3tc
    // we must have that
    //
    // "When level equals zero width and height must be a multiple of 4.
    // When level is greater than 0 width and height must be 0, 1, 2 or a multiple of 4. "
    //
    // but we do not yet support having multiple mipmap levels for compressed textures,
    // so we only test for level zero.

    if (
      mipmap.compressed &&
      (
        mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
      )
    ) {
      check$1(mipmap.width % 4 === 0 && mipmap.height % 4 === 0,
        'for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4');
    }
  }

  function setMipMap (mipmap, target) {
    var images = mipmap.images;
    for (var i = 0; i < images.length; ++i) {
      if (!images[i]) {
        return
      }
      setImage(images[i], target, i);
    }
  }

  var mipPool = [];

  function allocMipMap () {
    var result = mipPool.pop() || new MipMap();
    TexFlags.call(result);
    result.mipmask = 0;
    for (var i = 0; i < 16; ++i) {
      result.images[i] = null;
    }
    return result
  }

  function freeMipMap (mipmap) {
    var images = mipmap.images;
    for (var i = 0; i < images.length; ++i) {
      if (images[i]) {
        freeImage(images[i]);
      }
      images[i] = null;
    }
    mipPool.push(mipmap);
  }

  // -------------------------------------------------------
  // Tex info
  // -------------------------------------------------------
  function TexInfo () {
    this.minFilter = GL_NEAREST$1;
    this.magFilter = GL_NEAREST$1;

    this.wrapS = GL_CLAMP_TO_EDGE$1;
    this.wrapT = GL_CLAMP_TO_EDGE$1;

    this.anisotropic = 1;

    this.genMipmaps = false;
    this.mipmapHint = GL_DONT_CARE;
  }

  function parseTexInfo (info, options) {
    if ('min' in options) {
      var minFilter = options.min;
      check$1.parameter(minFilter, minFilters);
      info.minFilter = minFilters[minFilter];
      if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !('faces' in options)) {
        info.genMipmaps = true;
      }
    }

    if ('mag' in options) {
      var magFilter = options.mag;
      check$1.parameter(magFilter, magFilters);
      info.magFilter = magFilters[magFilter];
    }

    var wrapS = info.wrapS;
    var wrapT = info.wrapT;
    if ('wrap' in options) {
      var wrap = options.wrap;
      if (typeof wrap === 'string') {
        check$1.parameter(wrap, wrapModes);
        wrapS = wrapT = wrapModes[wrap];
      } else if (Array.isArray(wrap)) {
        check$1.parameter(wrap[0], wrapModes);
        check$1.parameter(wrap[1], wrapModes);
        wrapS = wrapModes[wrap[0]];
        wrapT = wrapModes[wrap[1]];
      }
    } else {
      if ('wrapS' in options) {
        var optWrapS = options.wrapS;
        check$1.parameter(optWrapS, wrapModes);
        wrapS = wrapModes[optWrapS];
      }
      if ('wrapT' in options) {
        var optWrapT = options.wrapT;
        check$1.parameter(optWrapT, wrapModes);
        wrapT = wrapModes[optWrapT];
      }
    }
    info.wrapS = wrapS;
    info.wrapT = wrapT;

    if ('anisotropic' in options) {
      var anisotropic = options.anisotropic;
      check$1(typeof anisotropic === 'number' &&
         anisotropic >= 1 && anisotropic <= limits.maxAnisotropic,
      'aniso samples must be between 1 and ');
      info.anisotropic = options.anisotropic;
    }

    if ('mipmap' in options) {
      var hasMipMap = false;
      switch (typeof options.mipmap) {
        case 'string':
          check$1.parameter(options.mipmap, mipmapHint,
            'invalid mipmap hint');
          info.mipmapHint = mipmapHint[options.mipmap];
          info.genMipmaps = true;
          hasMipMap = true;
          break

        case 'boolean':
          hasMipMap = info.genMipmaps = options.mipmap;
          break

        case 'object':
          check$1(Array.isArray(options.mipmap), 'invalid mipmap type');
          info.genMipmaps = false;
          hasMipMap = true;
          break

        default:
          check$1.raise('invalid mipmap type');
      }
      if (hasMipMap && !('min' in options)) {
        info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
      }
    }
  }

  function setTexInfo (info, target) {
    gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
    gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
    gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
    gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
    if (extensions.ext_texture_filter_anisotropic) {
      gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
    }
    if (info.genMipmaps) {
      gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
      gl.generateMipmap(target);
    }
  }

  // -------------------------------------------------------
  // Full texture object
  // -------------------------------------------------------
  var textureCount = 0;
  var textureSet = {};
  var numTexUnits = limits.maxTextureUnits;
  var textureUnits = Array(numTexUnits).map(function () {
    return null
  });

  function REGLTexture (target) {
    TexFlags.call(this);
    this.mipmask = 0;
    this.internalformat = GL_RGBA$1;

    this.id = textureCount++;

    this.refCount = 1;

    this.target = target;
    this.texture = gl.createTexture();

    this.unit = -1;
    this.bindCount = 0;

    this.texInfo = new TexInfo();

    if (config.profile) {
      this.stats = { size: 0 };
    }
  }

  function tempBind (texture) {
    gl.activeTexture(GL_TEXTURE0$1);
    gl.bindTexture(texture.target, texture.texture);
  }

  function tempRestore () {
    var prev = textureUnits[0];
    if (prev) {
      gl.bindTexture(prev.target, prev.texture);
    } else {
      gl.bindTexture(GL_TEXTURE_2D$1, null);
    }
  }

  function destroy (texture) {
    var handle = texture.texture;
    check$1(handle, 'must not double destroy texture');
    var unit = texture.unit;
    var target = texture.target;
    if (unit >= 0) {
      gl.activeTexture(GL_TEXTURE0$1 + unit);
      gl.bindTexture(target, null);
      textureUnits[unit] = null;
    }
    gl.deleteTexture(handle);
    texture.texture = null;
    texture.params = null;
    texture.pixels = null;
    texture.refCount = 0;
    delete textureSet[texture.id];
    stats.textureCount--;
  }

  extend(REGLTexture.prototype, {
    bind: function () {
      var texture = this;
      texture.bindCount += 1;
      var unit = texture.unit;
      if (unit < 0) {
        for (var i = 0; i < numTexUnits; ++i) {
          var other = textureUnits[i];
          if (other) {
            if (other.bindCount > 0) {
              continue
            }
            other.unit = -1;
          }
          textureUnits[i] = texture;
          unit = i;
          break
        }
        if (unit >= numTexUnits) {
          check$1.raise('insufficient number of texture units');
        }
        if (config.profile && stats.maxTextureUnits < (unit + 1)) {
          stats.maxTextureUnits = unit + 1; // +1, since the units are zero-based
        }
        texture.unit = unit;
        gl.activeTexture(GL_TEXTURE0$1 + unit);
        gl.bindTexture(texture.target, texture.texture);
      }
      return unit
    },

    unbind: function () {
      this.bindCount -= 1;
    },

    decRef: function () {
      if (--this.refCount <= 0) {
        destroy(this);
      }
    }
  });

  function createTexture2D (a, b) {
    var texture = new REGLTexture(GL_TEXTURE_2D$1);
    textureSet[texture.id] = texture;
    stats.textureCount++;

    function reglTexture2D (a, b) {
      var texInfo = texture.texInfo;
      TexInfo.call(texInfo);
      var mipData = allocMipMap();

      if (typeof a === 'number') {
        if (typeof b === 'number') {
          parseMipMapFromShape(mipData, a | 0, b | 0);
        } else {
          parseMipMapFromShape(mipData, a | 0, a | 0);
        }
      } else if (a) {
        check$1.type(a, 'object', 'invalid arguments to regl.texture');
        parseTexInfo(texInfo, a);
        parseMipMapFromObject(mipData, a);
      } else {
        // empty textures get assigned a default shape of 1x1
        parseMipMapFromShape(mipData, 1, 1);
      }

      if (texInfo.genMipmaps) {
        mipData.mipmask = (mipData.width << 1) - 1;
      }
      texture.mipmask = mipData.mipmask;

      copyFlags(texture, mipData);

      check$1.texture2D(texInfo, mipData, limits);
      texture.internalformat = mipData.internalformat;

      reglTexture2D.width = mipData.width;
      reglTexture2D.height = mipData.height;

      tempBind(texture);
      setMipMap(mipData, GL_TEXTURE_2D$1);
      setTexInfo(texInfo, GL_TEXTURE_2D$1);
      tempRestore();

      freeMipMap(mipData);

      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          mipData.width,
          mipData.height,
          texInfo.genMipmaps,
          false);
      }
      reglTexture2D.format = textureFormatsInvert[texture.internalformat];
      reglTexture2D.type = textureTypesInvert[texture.type];

      reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
      reglTexture2D.min = minFiltersInvert[texInfo.minFilter];

      reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
      reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];

      return reglTexture2D
    }

    function subimage (image, x_, y_, level_) {
      check$1(!!image, 'must specify image data');

      var x = x_ | 0;
      var y = y_ | 0;
      var level = level_ | 0;

      var imageData = allocImage();
      copyFlags(imageData, texture);
      imageData.width = 0;
      imageData.height = 0;
      parseImage(imageData, image);
      imageData.width = imageData.width || ((texture.width >> level) - x);
      imageData.height = imageData.height || ((texture.height >> level) - y);

      check$1(
        texture.type === imageData.type &&
        texture.format === imageData.format &&
        texture.internalformat === imageData.internalformat,
        'incompatible format for texture.subimage');
      check$1(
        x >= 0 && y >= 0 &&
        x + imageData.width <= texture.width &&
        y + imageData.height <= texture.height,
        'texture.subimage write out of bounds');
      check$1(
        texture.mipmask & (1 << level),
        'missing mipmap data');
      check$1(
        imageData.data || imageData.element || imageData.needsCopy,
        'missing image data');

      tempBind(texture);
      setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
      tempRestore();

      freeImage(imageData);

      return reglTexture2D
    }

    function resize (w_, h_) {
      var w = w_ | 0;
      var h = (h_ | 0) || w;
      if (w === texture.width && h === texture.height) {
        return reglTexture2D
      }

      reglTexture2D.width = texture.width = w;
      reglTexture2D.height = texture.height = h;

      tempBind(texture);

      for (var i = 0; texture.mipmask >> i; ++i) {
        var _w = w >> i;
        var _h = h >> i;
        if (!_w || !_h) break
        gl.texImage2D(
          GL_TEXTURE_2D$1,
          i,
          texture.format,
          _w,
          _h,
          0,
          texture.format,
          texture.type,
          null);
      }
      tempRestore();

      // also, recompute the texture size.
      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          w,
          h,
          false,
          false);
      }

      return reglTexture2D
    }

    reglTexture2D(a, b);

    reglTexture2D.subimage = subimage;
    reglTexture2D.resize = resize;
    reglTexture2D._reglType = 'texture2d';
    reglTexture2D._texture = texture;
    if (config.profile) {
      reglTexture2D.stats = texture.stats;
    }
    reglTexture2D.destroy = function () {
      texture.decRef();
    };

    return reglTexture2D
  }

  function createTextureCube (a0, a1, a2, a3, a4, a5) {
    var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
    textureSet[texture.id] = texture;
    stats.cubeCount++;

    var faces = new Array(6);

    function reglTextureCube (a0, a1, a2, a3, a4, a5) {
      var i;
      var texInfo = texture.texInfo;
      TexInfo.call(texInfo);
      for (i = 0; i < 6; ++i) {
        faces[i] = allocMipMap();
      }

      if (typeof a0 === 'number' || !a0) {
        var s = (a0 | 0) || 1;
        for (i = 0; i < 6; ++i) {
          parseMipMapFromShape(faces[i], s, s);
        }
      } else if (typeof a0 === 'object') {
        if (a1) {
          parseMipMapFromObject(faces[0], a0);
          parseMipMapFromObject(faces[1], a1);
          parseMipMapFromObject(faces[2], a2);
          parseMipMapFromObject(faces[3], a3);
          parseMipMapFromObject(faces[4], a4);
          parseMipMapFromObject(faces[5], a5);
        } else {
          parseTexInfo(texInfo, a0);
          parseFlags(texture, a0);
          if ('faces' in a0) {
            var faceInput = a0.faces;
            check$1(Array.isArray(faceInput) && faceInput.length === 6,
              'cube faces must be a length 6 array');
            for (i = 0; i < 6; ++i) {
              check$1(typeof faceInput[i] === 'object' && !!faceInput[i],
                'invalid input for cube map face');
              copyFlags(faces[i], texture);
              parseMipMapFromObject(faces[i], faceInput[i]);
            }
          } else {
            for (i = 0; i < 6; ++i) {
              parseMipMapFromObject(faces[i], a0);
            }
          }
        }
      } else {
        check$1.raise('invalid arguments to cube map');
      }

      copyFlags(texture, faces[0]);

      if (!limits.npotTextureCube) {
        check$1(isPow2$1(texture.width) && isPow2$1(texture.height), 'your browser does not support non power or two texture dimensions');
      }

      if (texInfo.genMipmaps) {
        texture.mipmask = (faces[0].width << 1) - 1;
      } else {
        texture.mipmask = faces[0].mipmask;
      }

      check$1.textureCube(texture, texInfo, faces, limits);
      texture.internalformat = faces[0].internalformat;

      reglTextureCube.width = faces[0].width;
      reglTextureCube.height = faces[0].height;

      tempBind(texture);
      for (i = 0; i < 6; ++i) {
        setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
      }
      setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
      tempRestore();

      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          reglTextureCube.width,
          reglTextureCube.height,
          texInfo.genMipmaps,
          true);
      }

      reglTextureCube.format = textureFormatsInvert[texture.internalformat];
      reglTextureCube.type = textureTypesInvert[texture.type];

      reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
      reglTextureCube.min = minFiltersInvert[texInfo.minFilter];

      reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
      reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];

      for (i = 0; i < 6; ++i) {
        freeMipMap(faces[i]);
      }

      return reglTextureCube
    }

    function subimage (face, image, x_, y_, level_) {
      check$1(!!image, 'must specify image data');
      check$1(typeof face === 'number' && face === (face | 0) &&
        face >= 0 && face < 6, 'invalid face');

      var x = x_ | 0;
      var y = y_ | 0;
      var level = level_ | 0;

      var imageData = allocImage();
      copyFlags(imageData, texture);
      imageData.width = 0;
      imageData.height = 0;
      parseImage(imageData, image);
      imageData.width = imageData.width || ((texture.width >> level) - x);
      imageData.height = imageData.height || ((texture.height >> level) - y);

      check$1(
        texture.type === imageData.type &&
        texture.format === imageData.format &&
        texture.internalformat === imageData.internalformat,
        'incompatible format for texture.subimage');
      check$1(
        x >= 0 && y >= 0 &&
        x + imageData.width <= texture.width &&
        y + imageData.height <= texture.height,
        'texture.subimage write out of bounds');
      check$1(
        texture.mipmask & (1 << level),
        'missing mipmap data');
      check$1(
        imageData.data || imageData.element || imageData.needsCopy,
        'missing image data');

      tempBind(texture);
      setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
      tempRestore();

      freeImage(imageData);

      return reglTextureCube
    }

    function resize (radius_) {
      var radius = radius_ | 0;
      if (radius === texture.width) {
        return
      }

      reglTextureCube.width = texture.width = radius;
      reglTextureCube.height = texture.height = radius;

      tempBind(texture);
      for (var i = 0; i < 6; ++i) {
        for (var j = 0; texture.mipmask >> j; ++j) {
          gl.texImage2D(
            GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i,
            j,
            texture.format,
            radius >> j,
            radius >> j,
            0,
            texture.format,
            texture.type,
            null);
        }
      }
      tempRestore();

      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          reglTextureCube.width,
          reglTextureCube.height,
          false,
          true);
      }

      return reglTextureCube
    }

    reglTextureCube(a0, a1, a2, a3, a4, a5);

    reglTextureCube.subimage = subimage;
    reglTextureCube.resize = resize;
    reglTextureCube._reglType = 'textureCube';
    reglTextureCube._texture = texture;
    if (config.profile) {
      reglTextureCube.stats = texture.stats;
    }
    reglTextureCube.destroy = function () {
      texture.decRef();
    };

    return reglTextureCube
  }

  // Called when regl is destroyed
  function destroyTextures () {
    for (var i = 0; i < numTexUnits; ++i) {
      gl.activeTexture(GL_TEXTURE0$1 + i);
      gl.bindTexture(GL_TEXTURE_2D$1, null);
      textureUnits[i] = null;
    }
    values(textureSet).forEach(destroy);

    stats.cubeCount = 0;
    stats.textureCount = 0;
  }

  if (config.profile) {
    stats.getTotalTextureSize = function () {
      var total = 0;
      Object.keys(textureSet).forEach(function (key) {
        total += textureSet[key].stats.size;
      });
      return total
    };
  }

  function restoreTextures () {
    for (var i = 0; i < numTexUnits; ++i) {
      var tex = textureUnits[i];
      if (tex) {
        tex.bindCount = 0;
        tex.unit = -1;
        textureUnits[i] = null;
      }
    }

    values(textureSet).forEach(function (texture) {
      texture.texture = gl.createTexture();
      gl.bindTexture(texture.target, texture.texture);
      for (var i = 0; i < 32; ++i) {
        if ((texture.mipmask & (1 << i)) === 0) {
          continue
        }
        if (texture.target === GL_TEXTURE_2D$1) {
          gl.texImage2D(GL_TEXTURE_2D$1,
            i,
            texture.internalformat,
            texture.width >> i,
            texture.height >> i,
            0,
            texture.internalformat,
            texture.type,
            null);
        } else {
          for (var j = 0; j < 6; ++j) {
            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j,
              i,
              texture.internalformat,
              texture.width >> i,
              texture.height >> i,
              0,
              texture.internalformat,
              texture.type,
              null);
          }
        }
      }
      setTexInfo(texture.texInfo, texture.target);
    });
  }

  function refreshTextures () {
    for (var i = 0; i < numTexUnits; ++i) {
      var tex = textureUnits[i];
      if (tex) {
        tex.bindCount = 0;
        tex.unit = -1;
        textureUnits[i] = null;
      }
      gl.activeTexture(GL_TEXTURE0$1 + i);
      gl.bindTexture(GL_TEXTURE_2D$1, null);
      gl.bindTexture(GL_TEXTURE_CUBE_MAP$1, null);
    }
  }

  return {
    create2D: createTexture2D,
    createCube: createTextureCube,
    clear: destroyTextures,
    getTexture: function (wrapper) {
      return null
    },
    restore: restoreTextures,
    refresh: refreshTextures
  }
}

var GL_RENDERBUFFER = 0x8D41;

var GL_RGBA4$1 = 0x8056;
var GL_RGB5_A1$1 = 0x8057;
var GL_RGB565$1 = 0x8D62;
var GL_DEPTH_COMPONENT16 = 0x81A5;
var GL_STENCIL_INDEX8 = 0x8D48;
var GL_DEPTH_STENCIL$1 = 0x84F9;

var GL_SRGB8_ALPHA8_EXT = 0x8C43;

var GL_RGBA32F_EXT = 0x8814;

var GL_RGBA16F_EXT = 0x881A;
var GL_RGB16F_EXT = 0x881B;

var FORMAT_SIZES = [];

FORMAT_SIZES[GL_RGBA4$1] = 2;
FORMAT_SIZES[GL_RGB5_A1$1] = 2;
FORMAT_SIZES[GL_RGB565$1] = 2;

FORMAT_SIZES[GL_DEPTH_COMPONENT16] = 2;
FORMAT_SIZES[GL_STENCIL_INDEX8] = 1;
FORMAT_SIZES[GL_DEPTH_STENCIL$1] = 4;

FORMAT_SIZES[GL_SRGB8_ALPHA8_EXT] = 4;
FORMAT_SIZES[GL_RGBA32F_EXT] = 16;
FORMAT_SIZES[GL_RGBA16F_EXT] = 8;
FORMAT_SIZES[GL_RGB16F_EXT] = 6;

function getRenderbufferSize (format, width, height) {
  return FORMAT_SIZES[format] * width * height
}

var wrapRenderbuffers = function (gl, extensions, limits, stats, config) {
  var formatTypes = {
    'rgba4': GL_RGBA4$1,
    'rgb565': GL_RGB565$1,
    'rgb5 a1': GL_RGB5_A1$1,
    'depth': GL_DEPTH_COMPONENT16,
    'stencil': GL_STENCIL_INDEX8,
    'depth stencil': GL_DEPTH_STENCIL$1
  };

  if (extensions.ext_srgb) {
    formatTypes['srgba'] = GL_SRGB8_ALPHA8_EXT;
  }

  if (extensions.ext_color_buffer_half_float) {
    formatTypes['rgba16f'] = GL_RGBA16F_EXT;
    formatTypes['rgb16f'] = GL_RGB16F_EXT;
  }

  if (extensions.webgl_color_buffer_float) {
    formatTypes['rgba32f'] = GL_RGBA32F_EXT;
  }

  var formatTypesInvert = [];
  Object.keys(formatTypes).forEach(function (key) {
    var val = formatTypes[key];
    formatTypesInvert[val] = key;
  });

  var renderbufferCount = 0;
  var renderbufferSet = {};

  function REGLRenderbuffer (renderbuffer) {
    this.id = renderbufferCount++;
    this.refCount = 1;

    this.renderbuffer = renderbuffer;

    this.format = GL_RGBA4$1;
    this.width = 0;
    this.height = 0;

    if (config.profile) {
      this.stats = { size: 0 };
    }
  }

  REGLRenderbuffer.prototype.decRef = function () {
    if (--this.refCount <= 0) {
      destroy(this);
    }
  };

  function destroy (rb) {
    var handle = rb.renderbuffer;
    check$1(handle, 'must not double destroy renderbuffer');
    gl.bindRenderbuffer(GL_RENDERBUFFER, null);
    gl.deleteRenderbuffer(handle);
    rb.renderbuffer = null;
    rb.refCount = 0;
    delete renderbufferSet[rb.id];
    stats.renderbufferCount--;
  }

  function createRenderbuffer (a, b) {
    var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
    renderbufferSet[renderbuffer.id] = renderbuffer;
    stats.renderbufferCount++;

    function reglRenderbuffer (a, b) {
      var w = 0;
      var h = 0;
      var format = GL_RGBA4$1;

      if (typeof a === 'object' && a) {
        var options = a;
        if ('shape' in options) {
          var shape = options.shape;
          check$1(Array.isArray(shape) && shape.length >= 2,
            'invalid renderbuffer shape');
          w = shape[0] | 0;
          h = shape[1] | 0;
        } else {
          if ('radius' in options) {
            w = h = options.radius | 0;
          }
          if ('width' in options) {
            w = options.width | 0;
          }
          if ('height' in options) {
            h = options.height | 0;
          }
        }
        if ('format' in options) {
          check$1.parameter(options.format, formatTypes,
            'invalid renderbuffer format');
          format = formatTypes[options.format];
        }
      } else if (typeof a === 'number') {
        w = a | 0;
        if (typeof b === 'number') {
          h = b | 0;
        } else {
          h = w;
        }
      } else if (!a) {
        w = h = 1;
      } else {
        check$1.raise('invalid arguments to renderbuffer constructor');
      }

      // check shape
      check$1(
        w > 0 && h > 0 &&
        w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize,
        'invalid renderbuffer size');

      if (w === renderbuffer.width &&
          h === renderbuffer.height &&
          format === renderbuffer.format) {
        return
      }

      reglRenderbuffer.width = renderbuffer.width = w;
      reglRenderbuffer.height = renderbuffer.height = h;
      renderbuffer.format = format;

      gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);

      check$1(
        gl.getError() === 0,
        'invalid render buffer format');

      if (config.profile) {
        renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
      }
      reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];

      return reglRenderbuffer
    }

    function resize (w_, h_) {
      var w = w_ | 0;
      var h = (h_ | 0) || w;

      if (w === renderbuffer.width && h === renderbuffer.height) {
        return reglRenderbuffer
      }

      // check shape
      check$1(
        w > 0 && h > 0 &&
        w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize,
        'invalid renderbuffer size');

      reglRenderbuffer.width = renderbuffer.width = w;
      reglRenderbuffer.height = renderbuffer.height = h;

      gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);

      check$1(
        gl.getError() === 0,
        'invalid render buffer format');

      // also, recompute size.
      if (config.profile) {
        renderbuffer.stats.size = getRenderbufferSize(
          renderbuffer.format, renderbuffer.width, renderbuffer.height);
      }

      return reglRenderbuffer
    }

    reglRenderbuffer(a, b);

    reglRenderbuffer.resize = resize;
    reglRenderbuffer._reglType = 'renderbuffer';
    reglRenderbuffer._renderbuffer = renderbuffer;
    if (config.profile) {
      reglRenderbuffer.stats = renderbuffer.stats;
    }
    reglRenderbuffer.destroy = function () {
      renderbuffer.decRef();
    };

    return reglRenderbuffer
  }

  if (config.profile) {
    stats.getTotalRenderbufferSize = function () {
      var total = 0;
      Object.keys(renderbufferSet).forEach(function (key) {
        total += renderbufferSet[key].stats.size;
      });
      return total
    };
  }

  function restoreRenderbuffers () {
    values(renderbufferSet).forEach(function (rb) {
      rb.renderbuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
    });
    gl.bindRenderbuffer(GL_RENDERBUFFER, null);
  }

  return {
    create: createRenderbuffer,
    clear: function () {
      values(renderbufferSet).forEach(destroy);
    },
    restore: restoreRenderbuffers
  }
};

// We store these constants so that the minifier can inline them
var GL_FRAMEBUFFER$1 = 0x8D40;
var GL_RENDERBUFFER$1 = 0x8D41;

var GL_TEXTURE_2D$2 = 0x0DE1;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 = 0x8515;

var GL_COLOR_ATTACHMENT0$1 = 0x8CE0;
var GL_DEPTH_ATTACHMENT = 0x8D00;
var GL_STENCIL_ATTACHMENT = 0x8D20;
var GL_DEPTH_STENCIL_ATTACHMENT = 0x821A;

var GL_FRAMEBUFFER_COMPLETE$1 = 0x8CD5;
var GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
var GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
var GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
var GL_FRAMEBUFFER_UNSUPPORTED = 0x8CDD;

var GL_HALF_FLOAT_OES$2 = 0x8D61;
var GL_UNSIGNED_BYTE$6 = 0x1401;
var GL_FLOAT$5 = 0x1406;

var GL_RGB$1 = 0x1907;
var GL_RGBA$2 = 0x1908;

var GL_DEPTH_COMPONENT$1 = 0x1902;

var colorTextureFormatEnums = [
  GL_RGB$1,
  GL_RGBA$2
];

// for every texture format, store
// the number of channels
var textureFormatChannels = [];
textureFormatChannels[GL_RGBA$2] = 4;
textureFormatChannels[GL_RGB$1] = 3;

// for every texture type, store
// the size in bytes.
var textureTypeSizes = [];
textureTypeSizes[GL_UNSIGNED_BYTE$6] = 1;
textureTypeSizes[GL_FLOAT$5] = 4;
textureTypeSizes[GL_HALF_FLOAT_OES$2] = 2;

var GL_RGBA4$2 = 0x8056;
var GL_RGB5_A1$2 = 0x8057;
var GL_RGB565$2 = 0x8D62;
var GL_DEPTH_COMPONENT16$1 = 0x81A5;
var GL_STENCIL_INDEX8$1 = 0x8D48;
var GL_DEPTH_STENCIL$2 = 0x84F9;

var GL_SRGB8_ALPHA8_EXT$1 = 0x8C43;

var GL_RGBA32F_EXT$1 = 0x8814;

var GL_RGBA16F_EXT$1 = 0x881A;
var GL_RGB16F_EXT$1 = 0x881B;

var colorRenderbufferFormatEnums = [
  GL_RGBA4$2,
  GL_RGB5_A1$2,
  GL_RGB565$2,
  GL_SRGB8_ALPHA8_EXT$1,
  GL_RGBA16F_EXT$1,
  GL_RGB16F_EXT$1,
  GL_RGBA32F_EXT$1
];

var statusCode = {};
statusCode[GL_FRAMEBUFFER_COMPLETE$1] = 'complete';
statusCode[GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT] = 'incomplete attachment';
statusCode[GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS] = 'incomplete dimensions';
statusCode[GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT] = 'incomplete, missing attachment';
statusCode[GL_FRAMEBUFFER_UNSUPPORTED] = 'unsupported';

function wrapFBOState (
  gl,
  extensions,
  limits,
  textureState,
  renderbufferState,
  stats) {
  var framebufferState = {
    cur: null,
    next: null,
    dirty: false,
    setFBO: null
  };

  var colorTextureFormats = ['rgba'];
  var colorRenderbufferFormats = ['rgba4', 'rgb565', 'rgb5 a1'];

  if (extensions.ext_srgb) {
    colorRenderbufferFormats.push('srgba');
  }

  if (extensions.ext_color_buffer_half_float) {
    colorRenderbufferFormats.push('rgba16f', 'rgb16f');
  }

  if (extensions.webgl_color_buffer_float) {
    colorRenderbufferFormats.push('rgba32f');
  }

  var colorTypes = ['uint8'];
  if (extensions.oes_texture_half_float) {
    colorTypes.push('half float', 'float16');
  }
  if (extensions.oes_texture_float) {
    colorTypes.push('float', 'float32');
  }

  function FramebufferAttachment (target, texture, renderbuffer) {
    this.target = target;
    this.texture = texture;
    this.renderbuffer = renderbuffer;

    var w = 0;
    var h = 0;
    if (texture) {
      w = texture.width;
      h = texture.height;
    } else if (renderbuffer) {
      w = renderbuffer.width;
      h = renderbuffer.height;
    }
    this.width = w;
    this.height = h;
  }

  function decRef (attachment) {
    if (attachment) {
      if (attachment.texture) {
        attachment.texture._texture.decRef();
      }
      if (attachment.renderbuffer) {
        attachment.renderbuffer._renderbuffer.decRef();
      }
    }
  }

  function incRefAndCheckShape (attachment, width, height) {
    if (!attachment) {
      return
    }
    if (attachment.texture) {
      var texture = attachment.texture._texture;
      var tw = Math.max(1, texture.width);
      var th = Math.max(1, texture.height);
      check$1(tw === width && th === height,
        'inconsistent width/height for supplied texture');
      texture.refCount += 1;
    } else {
      var renderbuffer = attachment.renderbuffer._renderbuffer;
      check$1(
        renderbuffer.width === width && renderbuffer.height === height,
        'inconsistent width/height for renderbuffer');
      renderbuffer.refCount += 1;
    }
  }

  function attach (location, attachment) {
    if (attachment) {
      if (attachment.texture) {
        gl.framebufferTexture2D(
          GL_FRAMEBUFFER$1,
          location,
          attachment.target,
          attachment.texture._texture.texture,
          0);
      } else {
        gl.framebufferRenderbuffer(
          GL_FRAMEBUFFER$1,
          location,
          GL_RENDERBUFFER$1,
          attachment.renderbuffer._renderbuffer.renderbuffer);
      }
    }
  }

  function parseAttachment (attachment) {
    var target = GL_TEXTURE_2D$2;
    var texture = null;
    var renderbuffer = null;

    var data = attachment;
    if (typeof attachment === 'object') {
      data = attachment.data;
      if ('target' in attachment) {
        target = attachment.target | 0;
      }
    }

    check$1.type(data, 'function', 'invalid attachment data');

    var type = data._reglType;
    if (type === 'texture2d') {
      texture = data;
      check$1(target === GL_TEXTURE_2D$2);
    } else if (type === 'textureCube') {
      texture = data;
      check$1(
        target >= GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 &&
        target < GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + 6,
        'invalid cube map target');
    } else if (type === 'renderbuffer') {
      renderbuffer = data;
      target = GL_RENDERBUFFER$1;
    } else {
      check$1.raise('invalid regl object for attachment');
    }

    return new FramebufferAttachment(target, texture, renderbuffer)
  }

  function allocAttachment (
    width,
    height,
    isTexture,
    format,
    type) {
    if (isTexture) {
      var texture = textureState.create2D({
        width: width,
        height: height,
        format: format,
        type: type
      });
      texture._texture.refCount = 0;
      return new FramebufferAttachment(GL_TEXTURE_2D$2, texture, null)
    } else {
      var rb = renderbufferState.create({
        width: width,
        height: height,
        format: format
      });
      rb._renderbuffer.refCount = 0;
      return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb)
    }
  }

  function unwrapAttachment (attachment) {
    return attachment && (attachment.texture || attachment.renderbuffer)
  }

  function resizeAttachment (attachment, w, h) {
    if (attachment) {
      if (attachment.texture) {
        attachment.texture.resize(w, h);
      } else if (attachment.renderbuffer) {
        attachment.renderbuffer.resize(w, h);
      }
      attachment.width = w;
      attachment.height = h;
    }
  }

  var framebufferCount = 0;
  var framebufferSet = {};

  function REGLFramebuffer () {
    this.id = framebufferCount++;
    framebufferSet[this.id] = this;

    this.framebuffer = gl.createFramebuffer();
    this.width = 0;
    this.height = 0;

    this.colorAttachments = [];
    this.depthAttachment = null;
    this.stencilAttachment = null;
    this.depthStencilAttachment = null;
  }

  function decFBORefs (framebuffer) {
    framebuffer.colorAttachments.forEach(decRef);
    decRef(framebuffer.depthAttachment);
    decRef(framebuffer.stencilAttachment);
    decRef(framebuffer.depthStencilAttachment);
  }

  function destroy (framebuffer) {
    var handle = framebuffer.framebuffer;
    check$1(handle, 'must not double destroy framebuffer');
    gl.deleteFramebuffer(handle);
    framebuffer.framebuffer = null;
    stats.framebufferCount--;
    delete framebufferSet[framebuffer.id];
  }

  function updateFramebuffer (framebuffer) {
    var i;

    gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebuffer.framebuffer);
    var colorAttachments = framebuffer.colorAttachments;
    for (i = 0; i < colorAttachments.length; ++i) {
      attach(GL_COLOR_ATTACHMENT0$1 + i, colorAttachments[i]);
    }
    for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
      gl.framebufferTexture2D(
        GL_FRAMEBUFFER$1,
        GL_COLOR_ATTACHMENT0$1 + i,
        GL_TEXTURE_2D$2,
        null,
        0);
    }

    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_DEPTH_STENCIL_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);
    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_DEPTH_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);
    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_STENCIL_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);

    attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
    attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
    attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);

    // Check status code
    var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER$1);
    if (!gl.isContextLost() && status !== GL_FRAMEBUFFER_COMPLETE$1) {
      check$1.raise('framebuffer configuration not supported, status = ' +
        statusCode[status]);
    }

    gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebufferState.next ? framebufferState.next.framebuffer : null);
    framebufferState.cur = framebufferState.next;

    // FIXME: Clear error code here.  This is a work around for a bug in
    // headless-gl
    gl.getError();
  }

  function createFBO (a0, a1) {
    var framebuffer = new REGLFramebuffer();
    stats.framebufferCount++;

    function reglFramebuffer (a, b) {
      var i;

      check$1(framebufferState.next !== framebuffer,
        'can not update framebuffer which is currently in use');

      var width = 0;
      var height = 0;

      var needsDepth = true;
      var needsStencil = true;

      var colorBuffer = null;
      var colorTexture = true;
      var colorFormat = 'rgba';
      var colorType = 'uint8';
      var colorCount = 1;

      var depthBuffer = null;
      var stencilBuffer = null;
      var depthStencilBuffer = null;
      var depthStencilTexture = false;

      if (typeof a === 'number') {
        width = a | 0;
        height = (b | 0) || width;
      } else if (!a) {
        width = height = 1;
      } else {
        check$1.type(a, 'object', 'invalid arguments for framebuffer');
        var options = a;

        if ('shape' in options) {
          var shape = options.shape;
          check$1(Array.isArray(shape) && shape.length >= 2,
            'invalid shape for framebuffer');
          width = shape[0];
          height = shape[1];
        } else {
          if ('radius' in options) {
            width = height = options.radius;
          }
          if ('width' in options) {
            width = options.width;
          }
          if ('height' in options) {
            height = options.height;
          }
        }

        if ('color' in options ||
            'colors' in options) {
          colorBuffer =
            options.color ||
            options.colors;
          if (Array.isArray(colorBuffer)) {
            check$1(
              colorBuffer.length === 1 || extensions.webgl_draw_buffers,
              'multiple render targets not supported');
          }
        }

        if (!colorBuffer) {
          if ('colorCount' in options) {
            colorCount = options.colorCount | 0;
            check$1(colorCount > 0, 'invalid color buffer count');
          }

          if ('colorTexture' in options) {
            colorTexture = !!options.colorTexture;
            colorFormat = 'rgba4';
          }

          if ('colorType' in options) {
            colorType = options.colorType;
            if (!colorTexture) {
              if (colorType === 'half float' || colorType === 'float16') {
                check$1(extensions.ext_color_buffer_half_float,
                  'you must enable EXT_color_buffer_half_float to use 16-bit render buffers');
                colorFormat = 'rgba16f';
              } else if (colorType === 'float' || colorType === 'float32') {
                check$1(extensions.webgl_color_buffer_float,
                  'you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers');
                colorFormat = 'rgba32f';
              }
            } else {
              check$1(extensions.oes_texture_float ||
                !(colorType === 'float' || colorType === 'float32'),
              'you must enable OES_texture_float in order to use floating point framebuffer objects');
              check$1(extensions.oes_texture_half_float ||
                !(colorType === 'half float' || colorType === 'float16'),
              'you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects');
            }
            check$1.oneOf(colorType, colorTypes, 'invalid color type');
          }

          if ('colorFormat' in options) {
            colorFormat = options.colorFormat;
            if (colorTextureFormats.indexOf(colorFormat) >= 0) {
              colorTexture = true;
            } else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
              colorTexture = false;
            } else {
              if (colorTexture) {
                check$1.oneOf(
                  options.colorFormat, colorTextureFormats,
                  'invalid color format for texture');
              } else {
                check$1.oneOf(
                  options.colorFormat, colorRenderbufferFormats,
                  'invalid color format for renderbuffer');
              }
            }
          }
        }

        if ('depthTexture' in options || 'depthStencilTexture' in options) {
          depthStencilTexture = !!(options.depthTexture ||
            options.depthStencilTexture);
          check$1(!depthStencilTexture || extensions.webgl_depth_texture,
            'webgl_depth_texture extension not supported');
        }

        if ('depth' in options) {
          if (typeof options.depth === 'boolean') {
            needsDepth = options.depth;
          } else {
            depthBuffer = options.depth;
            needsStencil = false;
          }
        }

        if ('stencil' in options) {
          if (typeof options.stencil === 'boolean') {
            needsStencil = options.stencil;
          } else {
            stencilBuffer = options.stencil;
            needsDepth = false;
          }
        }

        if ('depthStencil' in options) {
          if (typeof options.depthStencil === 'boolean') {
            needsDepth = needsStencil = options.depthStencil;
          } else {
            depthStencilBuffer = options.depthStencil;
            needsDepth = false;
            needsStencil = false;
          }
        }
      }

      // parse attachments
      var colorAttachments = null;
      var depthAttachment = null;
      var stencilAttachment = null;
      var depthStencilAttachment = null;

      // Set up color attachments
      if (Array.isArray(colorBuffer)) {
        colorAttachments = colorBuffer.map(parseAttachment);
      } else if (colorBuffer) {
        colorAttachments = [parseAttachment(colorBuffer)];
      } else {
        colorAttachments = new Array(colorCount);
        for (i = 0; i < colorCount; ++i) {
          colorAttachments[i] = allocAttachment(
            width,
            height,
            colorTexture,
            colorFormat,
            colorType);
        }
      }

      check$1(extensions.webgl_draw_buffers || colorAttachments.length <= 1,
        'you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers.');
      check$1(colorAttachments.length <= limits.maxColorAttachments,
        'too many color attachments, not supported');

      width = width || colorAttachments[0].width;
      height = height || colorAttachments[0].height;

      if (depthBuffer) {
        depthAttachment = parseAttachment(depthBuffer);
      } else if (needsDepth && !needsStencil) {
        depthAttachment = allocAttachment(
          width,
          height,
          depthStencilTexture,
          'depth',
          'uint32');
      }

      if (stencilBuffer) {
        stencilAttachment = parseAttachment(stencilBuffer);
      } else if (needsStencil && !needsDepth) {
        stencilAttachment = allocAttachment(
          width,
          height,
          false,
          'stencil',
          'uint8');
      }

      if (depthStencilBuffer) {
        depthStencilAttachment = parseAttachment(depthStencilBuffer);
      } else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
        depthStencilAttachment = allocAttachment(
          width,
          height,
          depthStencilTexture,
          'depth stencil',
          'depth stencil');
      }

      check$1(
        (!!depthBuffer) + (!!stencilBuffer) + (!!depthStencilBuffer) <= 1,
        'invalid framebuffer configuration, can specify exactly one depth/stencil attachment');

      var commonColorAttachmentSize = null;

      for (i = 0; i < colorAttachments.length; ++i) {
        incRefAndCheckShape(colorAttachments[i], width, height);
        check$1(!colorAttachments[i] ||
          (colorAttachments[i].texture &&
            colorTextureFormatEnums.indexOf(colorAttachments[i].texture._texture.format) >= 0) ||
          (colorAttachments[i].renderbuffer &&
            colorRenderbufferFormatEnums.indexOf(colorAttachments[i].renderbuffer._renderbuffer.format) >= 0),
        'framebuffer color attachment ' + i + ' is invalid');

        if (colorAttachments[i] && colorAttachments[i].texture) {
          var colorAttachmentSize =
              textureFormatChannels[colorAttachments[i].texture._texture.format] *
              textureTypeSizes[colorAttachments[i].texture._texture.type];

          if (commonColorAttachmentSize === null) {
            commonColorAttachmentSize = colorAttachmentSize;
          } else {
            // We need to make sure that all color attachments have the same number of bitplanes
            // (that is, the same numer of bits per pixel)
            // This is required by the GLES2.0 standard. See the beginning of Chapter 4 in that document.
            check$1(commonColorAttachmentSize === colorAttachmentSize,
              'all color attachments much have the same number of bits per pixel.');
          }
        }
      }
      incRefAndCheckShape(depthAttachment, width, height);
      check$1(!depthAttachment ||
        (depthAttachment.texture &&
          depthAttachment.texture._texture.format === GL_DEPTH_COMPONENT$1) ||
        (depthAttachment.renderbuffer &&
          depthAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_COMPONENT16$1),
      'invalid depth attachment for framebuffer object');
      incRefAndCheckShape(stencilAttachment, width, height);
      check$1(!stencilAttachment ||
        (stencilAttachment.renderbuffer &&
          stencilAttachment.renderbuffer._renderbuffer.format === GL_STENCIL_INDEX8$1),
      'invalid stencil attachment for framebuffer object');
      incRefAndCheckShape(depthStencilAttachment, width, height);
      check$1(!depthStencilAttachment ||
        (depthStencilAttachment.texture &&
          depthStencilAttachment.texture._texture.format === GL_DEPTH_STENCIL$2) ||
        (depthStencilAttachment.renderbuffer &&
          depthStencilAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_STENCIL$2),
      'invalid depth-stencil attachment for framebuffer object');

      // decrement references
      decFBORefs(framebuffer);

      framebuffer.width = width;
      framebuffer.height = height;

      framebuffer.colorAttachments = colorAttachments;
      framebuffer.depthAttachment = depthAttachment;
      framebuffer.stencilAttachment = stencilAttachment;
      framebuffer.depthStencilAttachment = depthStencilAttachment;

      reglFramebuffer.color = colorAttachments.map(unwrapAttachment);
      reglFramebuffer.depth = unwrapAttachment(depthAttachment);
      reglFramebuffer.stencil = unwrapAttachment(stencilAttachment);
      reglFramebuffer.depthStencil = unwrapAttachment(depthStencilAttachment);

      reglFramebuffer.width = framebuffer.width;
      reglFramebuffer.height = framebuffer.height;

      updateFramebuffer(framebuffer);

      return reglFramebuffer
    }

    function resize (w_, h_) {
      check$1(framebufferState.next !== framebuffer,
        'can not resize a framebuffer which is currently in use');

      var w = Math.max(w_ | 0, 1);
      var h = Math.max((h_ | 0) || w, 1);
      if (w === framebuffer.width && h === framebuffer.height) {
        return reglFramebuffer
      }

      // resize all buffers
      var colorAttachments = framebuffer.colorAttachments;
      for (var i = 0; i < colorAttachments.length; ++i) {
        resizeAttachment(colorAttachments[i], w, h);
      }
      resizeAttachment(framebuffer.depthAttachment, w, h);
      resizeAttachment(framebuffer.stencilAttachment, w, h);
      resizeAttachment(framebuffer.depthStencilAttachment, w, h);

      framebuffer.width = reglFramebuffer.width = w;
      framebuffer.height = reglFramebuffer.height = h;

      updateFramebuffer(framebuffer);

      return reglFramebuffer
    }

    reglFramebuffer(a0, a1);

    return extend(reglFramebuffer, {
      resize: resize,
      _reglType: 'framebuffer',
      _framebuffer: framebuffer,
      destroy: function () {
        destroy(framebuffer);
        decFBORefs(framebuffer);
      },
      use: function (block) {
        framebufferState.setFBO({
          framebuffer: reglFramebuffer
        }, block);
      }
    })
  }

  function createCubeFBO (options) {
    var faces = Array(6);

    function reglFramebufferCube (a) {
      var i;

      check$1(faces.indexOf(framebufferState.next) < 0,
        'can not update framebuffer which is currently in use');

      var params = {
        color: null
      };

      var radius = 0;

      var colorBuffer = null;
      var colorFormat = 'rgba';
      var colorType = 'uint8';
      var colorCount = 1;

      if (typeof a === 'number') {
        radius = a | 0;
      } else if (!a) {
        radius = 1;
      } else {
        check$1.type(a, 'object', 'invalid arguments for framebuffer');
        var options = a;

        if ('shape' in options) {
          var shape = options.shape;
          check$1(
            Array.isArray(shape) && shape.length >= 2,
            'invalid shape for framebuffer');
          check$1(
            shape[0] === shape[1],
            'cube framebuffer must be square');
          radius = shape[0];
        } else {
          if ('radius' in options) {
            radius = options.radius | 0;
          }
          if ('width' in options) {
            radius = options.width | 0;
            if ('height' in options) {
              check$1(options.height === radius, 'must be square');
            }
          } else if ('height' in options) {
            radius = options.height | 0;
          }
        }

        if ('color' in options ||
            'colors' in options) {
          colorBuffer =
            options.color ||
            options.colors;
          if (Array.isArray(colorBuffer)) {
            check$1(
              colorBuffer.length === 1 || extensions.webgl_draw_buffers,
              'multiple render targets not supported');
          }
        }

        if (!colorBuffer) {
          if ('colorCount' in options) {
            colorCount = options.colorCount | 0;
            check$1(colorCount > 0, 'invalid color buffer count');
          }

          if ('colorType' in options) {
            check$1.oneOf(
              options.colorType, colorTypes,
              'invalid color type');
            colorType = options.colorType;
          }

          if ('colorFormat' in options) {
            colorFormat = options.colorFormat;
            check$1.oneOf(
              options.colorFormat, colorTextureFormats,
              'invalid color format for texture');
          }
        }

        if ('depth' in options) {
          params.depth = options.depth;
        }

        if ('stencil' in options) {
          params.stencil = options.stencil;
        }

        if ('depthStencil' in options) {
          params.depthStencil = options.depthStencil;
        }
      }

      var colorCubes;
      if (colorBuffer) {
        if (Array.isArray(colorBuffer)) {
          colorCubes = [];
          for (i = 0; i < colorBuffer.length; ++i) {
            colorCubes[i] = colorBuffer[i];
          }
        } else {
          colorCubes = [ colorBuffer ];
        }
      } else {
        colorCubes = Array(colorCount);
        var cubeMapParams = {
          radius: radius,
          format: colorFormat,
          type: colorType
        };
        for (i = 0; i < colorCount; ++i) {
          colorCubes[i] = textureState.createCube(cubeMapParams);
        }
      }

      // Check color cubes
      params.color = Array(colorCubes.length);
      for (i = 0; i < colorCubes.length; ++i) {
        var cube = colorCubes[i];
        check$1(
          typeof cube === 'function' && cube._reglType === 'textureCube',
          'invalid cube map');
        radius = radius || cube.width;
        check$1(
          cube.width === radius && cube.height === radius,
          'invalid cube map shape');
        params.color[i] = {
          target: GL_TEXTURE_CUBE_MAP_POSITIVE_X$2,
          data: colorCubes[i]
        };
      }

      for (i = 0; i < 6; ++i) {
        for (var j = 0; j < colorCubes.length; ++j) {
          params.color[j].target = GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + i;
        }
        // reuse depth-stencil attachments across all cube maps
        if (i > 0) {
          params.depth = faces[0].depth;
          params.stencil = faces[0].stencil;
          params.depthStencil = faces[0].depthStencil;
        }
        if (faces[i]) {
          (faces[i])(params);
        } else {
          faces[i] = createFBO(params);
        }
      }

      return extend(reglFramebufferCube, {
        width: radius,
        height: radius,
        color: colorCubes
      })
    }

    function resize (radius_) {
      var i;
      var radius = radius_ | 0;
      check$1(radius > 0 && radius <= limits.maxCubeMapSize,
        'invalid radius for cube fbo');

      if (radius === reglFramebufferCube.width) {
        return reglFramebufferCube
      }

      var colors = reglFramebufferCube.color;
      for (i = 0; i < colors.length; ++i) {
        colors[i].resize(radius);
      }

      for (i = 0; i < 6; ++i) {
        faces[i].resize(radius);
      }

      reglFramebufferCube.width = reglFramebufferCube.height = radius;

      return reglFramebufferCube
    }

    reglFramebufferCube(options);

    return extend(reglFramebufferCube, {
      faces: faces,
      resize: resize,
      _reglType: 'framebufferCube',
      destroy: function () {
        faces.forEach(function (f) {
          f.destroy();
        });
      }
    })
  }

  function restoreFramebuffers () {
    framebufferState.cur = null;
    framebufferState.next = null;
    framebufferState.dirty = true;
    values(framebufferSet).forEach(function (fb) {
      fb.framebuffer = gl.createFramebuffer();
      updateFramebuffer(fb);
    });
  }

  return extend(framebufferState, {
    getFramebuffer: function (object) {
      if (typeof object === 'function' && object._reglType === 'framebuffer') {
        var fbo = object._framebuffer;
        if (fbo instanceof REGLFramebuffer) {
          return fbo
        }
      }
      return null
    },
    create: createFBO,
    createCube: createCubeFBO,
    clear: function () {
      values(framebufferSet).forEach(destroy);
    },
    restore: restoreFramebuffers
  })
}

var GL_FLOAT$6 = 5126;
var GL_ARRAY_BUFFER$1 = 34962;

function AttributeRecord () {
  this.state = 0;

  this.x = 0.0;
  this.y = 0.0;
  this.z = 0.0;
  this.w = 0.0;

  this.buffer = null;
  this.size = 0;
  this.normalized = false;
  this.type = GL_FLOAT$6;
  this.offset = 0;
  this.stride = 0;
  this.divisor = 0;
}

function wrapAttributeState (
  gl,
  extensions,
  limits,
  stats,
  bufferState) {
  var NUM_ATTRIBUTES = limits.maxAttributes;
  var attributeBindings = new Array(NUM_ATTRIBUTES);
  for (var i = 0; i < NUM_ATTRIBUTES; ++i) {
    attributeBindings[i] = new AttributeRecord();
  }
  var vaoCount = 0;
  var vaoSet = {};

  var state = {
    Record: AttributeRecord,
    scope: {},
    state: attributeBindings,
    currentVAO: null,
    targetVAO: null,
    restore: extVAO() ? restoreVAO : function () {},
    createVAO: createVAO,
    getVAO: getVAO,
    destroyBuffer: destroyBuffer,
    setVAO: extVAO() ? setVAOEXT : setVAOEmulated,
    clear: extVAO() ? destroyVAOEXT : function () {}
  };

  function destroyBuffer (buffer) {
    for (var i = 0; i < attributeBindings.length; ++i) {
      var record = attributeBindings[i];
      if (record.buffer === buffer) {
        gl.disableVertexAttribArray(i);
        record.buffer = null;
      }
    }
  }

  function extVAO () {
    return extensions.oes_vertex_array_object
  }

  function extInstanced () {
    return extensions.angle_instanced_arrays
  }

  function getVAO (vao) {
    if (typeof vao === 'function' && vao._vao) {
      return vao._vao
    }
    return null
  }

  function setVAOEXT (vao) {
    if (vao === state.currentVAO) {
      return
    }
    var ext = extVAO();
    if (vao) {
      ext.bindVertexArrayOES(vao.vao);
    } else {
      ext.bindVertexArrayOES(null);
    }
    state.currentVAO = vao;
  }

  function setVAOEmulated (vao) {
    if (vao === state.currentVAO) {
      return
    }
    if (vao) {
      vao.bindAttrs();
    } else {
      var exti = extInstanced();
      for (var i = 0; i < attributeBindings.length; ++i) {
        var binding = attributeBindings[i];
        if (binding.buffer) {
          gl.enableVertexAttribArray(i);
          gl.vertexAttribPointer(i, binding.size, binding.type, binding.normalized, binding.stride, binding.offfset);
          if (exti && binding.divisor) {
            exti.vertexAttribDivisorANGLE(i, binding.divisor);
          }
        } else {
          gl.disableVertexAttribArray(i);
          gl.vertexAttrib4f(i, binding.x, binding.y, binding.z, binding.w);
        }
      }
    }
    state.currentVAO = vao;
  }

  function destroyVAOEXT () {
    values(vaoSet).forEach(function (vao) {
      vao.destroy();
    });
  }

  function REGLVAO () {
    this.id = ++vaoCount;
    this.attributes = [];
    var extension = extVAO();
    if (extension) {
      this.vao = extension.createVertexArrayOES();
    } else {
      this.vao = null;
    }
    vaoSet[this.id] = this;
    this.buffers = [];
  }

  REGLVAO.prototype.bindAttrs = function () {
    var exti = extInstanced();
    var attributes = this.attributes;
    for (var i = 0; i < attributes.length; ++i) {
      var attr = attributes[i];
      if (attr.buffer) {
        gl.enableVertexAttribArray(i);
        gl.bindBuffer(GL_ARRAY_BUFFER$1, attr.buffer.buffer);
        gl.vertexAttribPointer(i, attr.size, attr.type, attr.normalized, attr.stride, attr.offset);
        if (exti && attr.divisor) {
          exti.vertexAttribDivisorANGLE(i, attr.divisor);
        }
      } else {
        gl.disableVertexAttribArray(i);
        gl.vertexAttrib4f(i, attr.x, attr.y, attr.z, attr.w);
      }
    }
    for (var j = attributes.length; j < NUM_ATTRIBUTES; ++j) {
      gl.disableVertexAttribArray(j);
    }
  };

  REGLVAO.prototype.refresh = function () {
    var ext = extVAO();
    if (ext) {
      ext.bindVertexArrayOES(this.vao);
      this.bindAttrs();
      state.currentVAO = this;
    }
  };

  REGLVAO.prototype.destroy = function () {
    if (this.vao) {
      var extension = extVAO();
      if (this === state.currentVAO) {
        state.currentVAO = null;
        extension.bindVertexArrayOES(null);
      }
      extension.deleteVertexArrayOES(this.vao);
      this.vao = null;
    }
    if (vaoSet[this.id]) {
      delete vaoSet[this.id];
      stats.vaoCount -= 1;
    }
  };

  function restoreVAO () {
    var ext = extVAO();
    if (ext) {
      values(vaoSet).forEach(function (vao) {
        vao.refresh();
      });
    }
  }

  function createVAO (_attr) {
    var vao = new REGLVAO();
    stats.vaoCount += 1;

    function updateVAO (attributes) {
      check$1(Array.isArray(attributes), 'arguments to vertex array constructor must be an array');
      check$1(attributes.length < NUM_ATTRIBUTES, 'too many attributes');
      check$1(attributes.length > 0, 'must specify at least one attribute');

      var bufUpdated = {};
      var nattributes = vao.attributes;
      nattributes.length = attributes.length;
      for (var i = 0; i < attributes.length; ++i) {
        var spec = attributes[i];
        var rec = nattributes[i] = new AttributeRecord();
        var data = spec.data || spec;
        if (Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data)) {
          var buf;
          if (vao.buffers[i]) {
            buf = vao.buffers[i];
            if (isTypedArray(data) && buf._buffer.byteLength >= data.byteLength) {
              buf.subdata(data);
            } else {
              buf.destroy();
              vao.buffers[i] = null;
            }
          }
          if (!vao.buffers[i]) {
            buf = vao.buffers[i] = bufferState.create(spec, GL_ARRAY_BUFFER$1, false, true);
          }
          rec.buffer = bufferState.getBuffer(buf);
          rec.size = rec.buffer.dimension | 0;
          rec.normalized = false;
          rec.type = rec.buffer.dtype;
          rec.offset = 0;
          rec.stride = 0;
          rec.divisor = 0;
          rec.state = 1;
          bufUpdated[i] = 1;
        } else if (bufferState.getBuffer(spec)) {
          rec.buffer = bufferState.getBuffer(spec);
          rec.size = rec.buffer.dimension | 0;
          rec.normalized = false;
          rec.type = rec.buffer.dtype;
          rec.offset = 0;
          rec.stride = 0;
          rec.divisor = 0;
          rec.state = 1;
        } else if (bufferState.getBuffer(spec.buffer)) {
          rec.buffer = bufferState.getBuffer(spec.buffer);
          rec.size = ((+spec.size) || rec.buffer.dimension) | 0;
          rec.normalized = !!spec.normalized || false;
          if ('type' in spec) {
            check$1.parameter(spec.type, glTypes, 'invalid buffer type');
            rec.type = glTypes[spec.type];
          } else {
            rec.type = rec.buffer.dtype;
          }
          rec.offset = (spec.offset || 0) | 0;
          rec.stride = (spec.stride || 0) | 0;
          rec.divisor = (spec.divisor || 0) | 0;
          rec.state = 1;

          check$1(rec.size >= 1 && rec.size <= 4, 'size must be between 1 and 4');
          check$1(rec.offset >= 0, 'invalid offset');
          check$1(rec.stride >= 0 && rec.stride <= 255, 'stride must be between 0 and 255');
          check$1(rec.divisor >= 0, 'divisor must be positive');
          check$1(!rec.divisor || !!extensions.angle_instanced_arrays, 'ANGLE_instanced_arrays must be enabled to use divisor');
        } else if ('x' in spec) {
          check$1(i > 0, 'first attribute must not be a constant');
          rec.x = +spec.x || 0;
          rec.y = +spec.y || 0;
          rec.z = +spec.z || 0;
          rec.w = +spec.w || 0;
          rec.state = 2;
        } else {
          check$1(false, 'invalid attribute spec for location ' + i);
        }
      }

      // retire unused buffers
      for (var j = 0; j < vao.buffers.length; ++j) {
        if (!bufUpdated[j] && vao.buffers[j]) {
          vao.buffers[j].destroy();
          vao.buffers[j] = null;
        }
      }

      vao.refresh();
      return updateVAO
    }

    updateVAO.destroy = function () {
      for (var j = 0; j < vao.buffers.length; ++j) {
        if (vao.buffers[j]) {
          vao.buffers[j].destroy();
        }
      }
      vao.buffers.length = 0;
      vao.destroy();
    };

    updateVAO._vao = vao;
    updateVAO._reglType = 'vao';

    return updateVAO(_attr)
  }

  return state
}

var GL_FRAGMENT_SHADER = 35632;
var GL_VERTEX_SHADER = 35633;

var GL_ACTIVE_UNIFORMS = 0x8B86;
var GL_ACTIVE_ATTRIBUTES = 0x8B89;

function wrapShaderState (gl, stringStore, stats, config) {
  // ===================================================
  // glsl compilation and linking
  // ===================================================
  var fragShaders = {};
  var vertShaders = {};

  function ActiveInfo (name, id, location, info) {
    this.name = name;
    this.id = id;
    this.location = location;
    this.info = info;
  }

  function insertActiveInfo (list, info) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i].id === info.id) {
        list[i].location = info.location;
        return
      }
    }
    list.push(info);
  }

  function getShader (type, id, command) {
    var cache = type === GL_FRAGMENT_SHADER ? fragShaders : vertShaders;
    var shader = cache[id];

    if (!shader) {
      var source = stringStore.str(id);
      shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      check$1.shaderError(gl, shader, source, type, command);
      cache[id] = shader;
    }

    return shader
  }

  // ===================================================
  // program linking
  // ===================================================
  var programCache = {};
  var programList = [];

  var PROGRAM_COUNTER = 0;

  function REGLProgram (fragId, vertId) {
    this.id = PROGRAM_COUNTER++;
    this.fragId = fragId;
    this.vertId = vertId;
    this.program = null;
    this.uniforms = [];
    this.attributes = [];
    this.refCount = 1;

    if (config.profile) {
      this.stats = {
        uniformsCount: 0,
        attributesCount: 0
      };
    }
  }

  function linkProgram (desc, command, attributeLocations) {
    var i, info;

    // -------------------------------
    // compile & link
    // -------------------------------
    var fragShader = getShader(GL_FRAGMENT_SHADER, desc.fragId);
    var vertShader = getShader(GL_VERTEX_SHADER, desc.vertId);

    var program = desc.program = gl.createProgram();
    gl.attachShader(program, fragShader);
    gl.attachShader(program, vertShader);
    if (attributeLocations) {
      for (i = 0; i < attributeLocations.length; ++i) {
        var binding = attributeLocations[i];
        gl.bindAttribLocation(program, binding[0], binding[1]);
      }
    }

    gl.linkProgram(program);
    check$1.linkError(
      gl,
      program,
      stringStore.str(desc.fragId),
      stringStore.str(desc.vertId),
      command);

    // -------------------------------
    // grab uniforms
    // -------------------------------
    var numUniforms = gl.getProgramParameter(program, GL_ACTIVE_UNIFORMS);
    if (config.profile) {
      desc.stats.uniformsCount = numUniforms;
    }
    var uniforms = desc.uniforms;
    for (i = 0; i < numUniforms; ++i) {
      info = gl.getActiveUniform(program, i);
      if (info) {
        if (info.size > 1) {
          for (var j = 0; j < info.size; ++j) {
            var name = info.name.replace('[0]', '[' + j + ']');
            insertActiveInfo(uniforms, new ActiveInfo(
              name,
              stringStore.id(name),
              gl.getUniformLocation(program, name),
              info));
          }
        } else {
          insertActiveInfo(uniforms, new ActiveInfo(
            info.name,
            stringStore.id(info.name),
            gl.getUniformLocation(program, info.name),
            info));
        }
      }
    }

    // -------------------------------
    // grab attributes
    // -------------------------------
    var numAttributes = gl.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES);
    if (config.profile) {
      desc.stats.attributesCount = numAttributes;
    }

    var attributes = desc.attributes;
    for (i = 0; i < numAttributes; ++i) {
      info = gl.getActiveAttrib(program, i);
      if (info) {
        insertActiveInfo(attributes, new ActiveInfo(
          info.name,
          stringStore.id(info.name),
          gl.getAttribLocation(program, info.name),
          info));
      }
    }
  }

  if (config.profile) {
    stats.getMaxUniformsCount = function () {
      var m = 0;
      programList.forEach(function (desc) {
        if (desc.stats.uniformsCount > m) {
          m = desc.stats.uniformsCount;
        }
      });
      return m
    };

    stats.getMaxAttributesCount = function () {
      var m = 0;
      programList.forEach(function (desc) {
        if (desc.stats.attributesCount > m) {
          m = desc.stats.attributesCount;
        }
      });
      return m
    };
  }

  function restoreShaders () {
    fragShaders = {};
    vertShaders = {};
    for (var i = 0; i < programList.length; ++i) {
      linkProgram(programList[i], null, programList[i].attributes.map(function (info) {
        return [info.location, info.name]
      }));
    }
  }

  return {
    clear: function () {
      var deleteShader = gl.deleteShader.bind(gl);
      values(fragShaders).forEach(deleteShader);
      fragShaders = {};
      values(vertShaders).forEach(deleteShader);
      vertShaders = {};

      programList.forEach(function (desc) {
        gl.deleteProgram(desc.program);
      });
      programList.length = 0;
      programCache = {};

      stats.shaderCount = 0;
    },

    program: function (vertId, fragId, command, attribLocations) {
      check$1.command(vertId >= 0, 'missing vertex shader', command);
      check$1.command(fragId >= 0, 'missing fragment shader', command);

      var cache = programCache[fragId];
      if (!cache) {
        cache = programCache[fragId] = {};
      }
      var prevProgram = cache[vertId];
      if (prevProgram) {
        prevProgram.refCount++;
        if (!attribLocations) {
          return prevProgram
        }
      }
      var program = new REGLProgram(fragId, vertId);
      stats.shaderCount++;
      linkProgram(program, command, attribLocations);
      if (!prevProgram) {
        cache[vertId] = program;
      }
      programList.push(program);
      return extend(program, {
        destroy: function () {
          program.refCount--;
          if (program.refCount <= 0) {
            gl.deleteProgram(program.program);
            var idx = programList.indexOf(program);
            programList.splice(idx, 1);
            stats.shaderCount--;
          }
          // no program is linked to this vert anymore
          if (cache[program.vertId].refCount <= 0) {
            gl.deleteShader(vertShaders[program.vertId]);
            delete vertShaders[program.vertId];
            delete programCache[program.fragId][program.vertId];
          }
          // no program is linked to this frag anymore
          if (!Object.keys(programCache[program.fragId]).length) {
            gl.deleteShader(fragShaders[program.fragId]);
            delete fragShaders[program.fragId];
            delete programCache[program.fragId];
          }
        }
      })
    },

    restore: restoreShaders,

    shader: getShader,

    frag: -1,
    vert: -1
  }
}

var GL_RGBA$3 = 6408;
var GL_UNSIGNED_BYTE$7 = 5121;
var GL_PACK_ALIGNMENT = 0x0D05;
var GL_FLOAT$7 = 0x1406; // 5126

function wrapReadPixels (
  gl,
  framebufferState,
  reglPoll,
  context,
  glAttributes,
  extensions,
  limits) {
  function readPixelsImpl (input) {
    var type;
    if (framebufferState.next === null) {
      check$1(
        glAttributes.preserveDrawingBuffer,
        'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer');
      type = GL_UNSIGNED_BYTE$7;
    } else {
      check$1(
        framebufferState.next.colorAttachments[0].texture !== null,
        'You cannot read from a renderbuffer');
      type = framebufferState.next.colorAttachments[0].texture._texture.type;

      if (extensions.oes_texture_float) {
        check$1(
          type === GL_UNSIGNED_BYTE$7 || type === GL_FLOAT$7,
          'Reading from a framebuffer is only allowed for the types \'uint8\' and \'float\'');

        if (type === GL_FLOAT$7) {
          check$1(limits.readFloat, 'Reading \'float\' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float');
        }
      } else {
        check$1(
          type === GL_UNSIGNED_BYTE$7,
          'Reading from a framebuffer is only allowed for the type \'uint8\'');
      }
    }

    var x = 0;
    var y = 0;
    var width = context.framebufferWidth;
    var height = context.framebufferHeight;
    var data = null;

    if (isTypedArray(input)) {
      data = input;
    } else if (input) {
      check$1.type(input, 'object', 'invalid arguments to regl.read()');
      x = input.x | 0;
      y = input.y | 0;
      check$1(
        x >= 0 && x < context.framebufferWidth,
        'invalid x offset for regl.read');
      check$1(
        y >= 0 && y < context.framebufferHeight,
        'invalid y offset for regl.read');
      width = (input.width || (context.framebufferWidth - x)) | 0;
      height = (input.height || (context.framebufferHeight - y)) | 0;
      data = input.data || null;
    }

    // sanity check input.data
    if (data) {
      if (type === GL_UNSIGNED_BYTE$7) {
        check$1(
          data instanceof Uint8Array,
          'buffer must be \'Uint8Array\' when reading from a framebuffer of type \'uint8\'');
      } else if (type === GL_FLOAT$7) {
        check$1(
          data instanceof Float32Array,
          'buffer must be \'Float32Array\' when reading from a framebuffer of type \'float\'');
      }
    }

    check$1(
      width > 0 && width + x <= context.framebufferWidth,
      'invalid width for read pixels');
    check$1(
      height > 0 && height + y <= context.framebufferHeight,
      'invalid height for read pixels');

    // Update WebGL state
    reglPoll();

    // Compute size
    var size = width * height * 4;

    // Allocate data
    if (!data) {
      if (type === GL_UNSIGNED_BYTE$7) {
        data = new Uint8Array(size);
      } else if (type === GL_FLOAT$7) {
        data = data || new Float32Array(size);
      }
    }

    // Type check
    check$1.isTypedArray(data, 'data buffer for regl.read() must be a typedarray');
    check$1(data.byteLength >= size, 'data buffer for regl.read() too small');

    // Run read pixels
    gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
    gl.readPixels(x, y, width, height, GL_RGBA$3,
      type,
      data);

    return data
  }

  function readPixelsFBO (options) {
    var result;
    framebufferState.setFBO({
      framebuffer: options.framebuffer
    }, function () {
      result = readPixelsImpl(options);
    });
    return result
  }

  function readPixels (options) {
    if (!options || !('framebuffer' in options)) {
      return readPixelsImpl(options)
    } else {
      return readPixelsFBO(options)
    }
  }

  return readPixels
}

function slice (x) {
  return Array.prototype.slice.call(x)
}

function join (x) {
  return slice(x).join('')
}

function createEnvironment () {
  // Unique variable id counter
  var varCounter = 0;

  // Linked values are passed from this scope into the generated code block
  // Calling link() passes a value into the generated scope and returns
  // the variable name which it is bound to
  var linkedNames = [];
  var linkedValues = [];
  function link (value) {
    for (var i = 0; i < linkedValues.length; ++i) {
      if (linkedValues[i] === value) {
        return linkedNames[i]
      }
    }

    var name = 'g' + (varCounter++);
    linkedNames.push(name);
    linkedValues.push(value);
    return name
  }

  // create a code block
  function block () {
    var code = [];
    function push () {
      code.push.apply(code, slice(arguments));
    }

    var vars = [];
    function def () {
      var name = 'v' + (varCounter++);
      vars.push(name);

      if (arguments.length > 0) {
        code.push(name, '=');
        code.push.apply(code, slice(arguments));
        code.push(';');
      }

      return name
    }

    return extend(push, {
      def: def,
      toString: function () {
        return join([
          (vars.length > 0 ? 'var ' + vars.join(',') + ';' : ''),
          join(code)
        ])
      }
    })
  }

  function scope () {
    var entry = block();
    var exit = block();

    var entryToString = entry.toString;
    var exitToString = exit.toString;

    function save (object, prop) {
      exit(object, prop, '=', entry.def(object, prop), ';');
    }

    return extend(function () {
      entry.apply(entry, slice(arguments));
    }, {
      def: entry.def,
      entry: entry,
      exit: exit,
      save: save,
      set: function (object, prop, value) {
        save(object, prop);
        entry(object, prop, '=', value, ';');
      },
      toString: function () {
        return entryToString() + exitToString()
      }
    })
  }

  function conditional () {
    var pred = join(arguments);
    var thenBlock = scope();
    var elseBlock = scope();

    var thenToString = thenBlock.toString;
    var elseToString = elseBlock.toString;

    return extend(thenBlock, {
      then: function () {
        thenBlock.apply(thenBlock, slice(arguments));
        return this
      },
      else: function () {
        elseBlock.apply(elseBlock, slice(arguments));
        return this
      },
      toString: function () {
        var elseClause = elseToString();
        if (elseClause) {
          elseClause = 'else{' + elseClause + '}';
        }
        return join([
          'if(', pred, '){',
          thenToString(),
          '}', elseClause
        ])
      }
    })
  }

  // procedure list
  var globalBlock = block();
  var procedures = {};
  function proc (name, count) {
    var args = [];
    function arg () {
      var name = 'a' + args.length;
      args.push(name);
      return name
    }

    count = count || 0;
    for (var i = 0; i < count; ++i) {
      arg();
    }

    var body = scope();
    var bodyToString = body.toString;

    var result = procedures[name] = extend(body, {
      arg: arg,
      toString: function () {
        return join([
          'function(', args.join(), '){',
          bodyToString(),
          '}'
        ])
      }
    });

    return result
  }

  function compile () {
    var code = ['"use strict";',
      globalBlock,
      'return {'];
    Object.keys(procedures).forEach(function (name) {
      code.push('"', name, '":', procedures[name].toString(), ',');
    });
    code.push('}');
    var src = join(code)
      .replace(/;/g, ';\n')
      .replace(/}/g, '}\n')
      .replace(/{/g, '{\n');
    var proc = Function.apply(null, linkedNames.concat(src));
    return proc.apply(null, linkedValues)
  }

  return {
    global: globalBlock,
    link: link,
    block: block,
    proc: proc,
    scope: scope,
    cond: conditional,
    compile: compile
  }
}

// "cute" names for vector components
var CUTE_COMPONENTS = 'xyzw'.split('');

var GL_UNSIGNED_BYTE$8 = 5121;

var ATTRIB_STATE_POINTER = 1;
var ATTRIB_STATE_CONSTANT = 2;

var DYN_FUNC$1 = 0;
var DYN_PROP$1 = 1;
var DYN_CONTEXT$1 = 2;
var DYN_STATE$1 = 3;
var DYN_THUNK = 4;
var DYN_CONSTANT$1 = 5;
var DYN_ARRAY$1 = 6;

var S_DITHER = 'dither';
var S_BLEND_ENABLE = 'blend.enable';
var S_BLEND_COLOR = 'blend.color';
var S_BLEND_EQUATION = 'blend.equation';
var S_BLEND_FUNC = 'blend.func';
var S_DEPTH_ENABLE = 'depth.enable';
var S_DEPTH_FUNC = 'depth.func';
var S_DEPTH_RANGE = 'depth.range';
var S_DEPTH_MASK = 'depth.mask';
var S_COLOR_MASK = 'colorMask';
var S_CULL_ENABLE = 'cull.enable';
var S_CULL_FACE = 'cull.face';
var S_FRONT_FACE = 'frontFace';
var S_LINE_WIDTH = 'lineWidth';
var S_POLYGON_OFFSET_ENABLE = 'polygonOffset.enable';
var S_POLYGON_OFFSET_OFFSET = 'polygonOffset.offset';
var S_SAMPLE_ALPHA = 'sample.alpha';
var S_SAMPLE_ENABLE = 'sample.enable';
var S_SAMPLE_COVERAGE = 'sample.coverage';
var S_STENCIL_ENABLE = 'stencil.enable';
var S_STENCIL_MASK = 'stencil.mask';
var S_STENCIL_FUNC = 'stencil.func';
var S_STENCIL_OPFRONT = 'stencil.opFront';
var S_STENCIL_OPBACK = 'stencil.opBack';
var S_SCISSOR_ENABLE = 'scissor.enable';
var S_SCISSOR_BOX = 'scissor.box';
var S_VIEWPORT = 'viewport';

var S_PROFILE = 'profile';

var S_FRAMEBUFFER = 'framebuffer';
var S_VERT = 'vert';
var S_FRAG = 'frag';
var S_ELEMENTS = 'elements';
var S_PRIMITIVE = 'primitive';
var S_COUNT = 'count';
var S_OFFSET = 'offset';
var S_INSTANCES = 'instances';
var S_VAO = 'vao';

var SUFFIX_WIDTH = 'Width';
var SUFFIX_HEIGHT = 'Height';

var S_FRAMEBUFFER_WIDTH = S_FRAMEBUFFER + SUFFIX_WIDTH;
var S_FRAMEBUFFER_HEIGHT = S_FRAMEBUFFER + SUFFIX_HEIGHT;
var S_VIEWPORT_WIDTH = S_VIEWPORT + SUFFIX_WIDTH;
var S_VIEWPORT_HEIGHT = S_VIEWPORT + SUFFIX_HEIGHT;
var S_DRAWINGBUFFER = 'drawingBuffer';
var S_DRAWINGBUFFER_WIDTH = S_DRAWINGBUFFER + SUFFIX_WIDTH;
var S_DRAWINGBUFFER_HEIGHT = S_DRAWINGBUFFER + SUFFIX_HEIGHT;

var NESTED_OPTIONS = [
  S_BLEND_FUNC,
  S_BLEND_EQUATION,
  S_STENCIL_FUNC,
  S_STENCIL_OPFRONT,
  S_STENCIL_OPBACK,
  S_SAMPLE_COVERAGE,
  S_VIEWPORT,
  S_SCISSOR_BOX,
  S_POLYGON_OFFSET_OFFSET
];

var GL_ARRAY_BUFFER$2 = 34962;
var GL_ELEMENT_ARRAY_BUFFER$1 = 34963;

var GL_FRAGMENT_SHADER$1 = 35632;
var GL_VERTEX_SHADER$1 = 35633;

var GL_TEXTURE_2D$3 = 0x0DE1;
var GL_TEXTURE_CUBE_MAP$2 = 0x8513;

var GL_CULL_FACE = 0x0B44;
var GL_BLEND = 0x0BE2;
var GL_DITHER = 0x0BD0;
var GL_STENCIL_TEST = 0x0B90;
var GL_DEPTH_TEST = 0x0B71;
var GL_SCISSOR_TEST = 0x0C11;
var GL_POLYGON_OFFSET_FILL = 0x8037;
var GL_SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
var GL_SAMPLE_COVERAGE = 0x80A0;

var GL_FLOAT$8 = 5126;
var GL_FLOAT_VEC2 = 35664;
var GL_FLOAT_VEC3 = 35665;
var GL_FLOAT_VEC4 = 35666;
var GL_INT$3 = 5124;
var GL_INT_VEC2 = 35667;
var GL_INT_VEC3 = 35668;
var GL_INT_VEC4 = 35669;
var GL_BOOL = 35670;
var GL_BOOL_VEC2 = 35671;
var GL_BOOL_VEC3 = 35672;
var GL_BOOL_VEC4 = 35673;
var GL_FLOAT_MAT2 = 35674;
var GL_FLOAT_MAT3 = 35675;
var GL_FLOAT_MAT4 = 35676;
var GL_SAMPLER_2D = 35678;
var GL_SAMPLER_CUBE = 35680;

var GL_TRIANGLES$1 = 4;

var GL_FRONT = 1028;
var GL_BACK = 1029;
var GL_CW = 0x0900;
var GL_CCW = 0x0901;
var GL_MIN_EXT = 0x8007;
var GL_MAX_EXT = 0x8008;
var GL_ALWAYS = 519;
var GL_KEEP = 7680;
var GL_ZERO = 0;
var GL_ONE = 1;
var GL_FUNC_ADD = 0x8006;
var GL_LESS = 513;

var GL_FRAMEBUFFER$2 = 0x8D40;
var GL_COLOR_ATTACHMENT0$2 = 0x8CE0;

var blendFuncs = {
  '0': 0,
  '1': 1,
  'zero': 0,
  'one': 1,
  'src color': 768,
  'one minus src color': 769,
  'src alpha': 770,
  'one minus src alpha': 771,
  'dst color': 774,
  'one minus dst color': 775,
  'dst alpha': 772,
  'one minus dst alpha': 773,
  'constant color': 32769,
  'one minus constant color': 32770,
  'constant alpha': 32771,
  'one minus constant alpha': 32772,
  'src alpha saturate': 776
};

// There are invalid values for srcRGB and dstRGB. See:
// https://www.khronos.org/registry/webgl/specs/1.0/#6.13
// https://github.com/KhronosGroup/WebGL/blob/0d3201f5f7ec3c0060bc1f04077461541f1987b9/conformance-suites/1.0.3/conformance/misc/webgl-specific.html#L56
var invalidBlendCombinations = [
  'constant color, constant alpha',
  'one minus constant color, constant alpha',
  'constant color, one minus constant alpha',
  'one minus constant color, one minus constant alpha',
  'constant alpha, constant color',
  'constant alpha, one minus constant color',
  'one minus constant alpha, constant color',
  'one minus constant alpha, one minus constant color'
];

var compareFuncs = {
  'never': 512,
  'less': 513,
  '<': 513,
  'equal': 514,
  '=': 514,
  '==': 514,
  '===': 514,
  'lequal': 515,
  '<=': 515,
  'greater': 516,
  '>': 516,
  'notequal': 517,
  '!=': 517,
  '!==': 517,
  'gequal': 518,
  '>=': 518,
  'always': 519
};

var stencilOps = {
  '0': 0,
  'zero': 0,
  'keep': 7680,
  'replace': 7681,
  'increment': 7682,
  'decrement': 7683,
  'increment wrap': 34055,
  'decrement wrap': 34056,
  'invert': 5386
};

var shaderType = {
  'frag': GL_FRAGMENT_SHADER$1,
  'vert': GL_VERTEX_SHADER$1
};

var orientationType = {
  'cw': GL_CW,
  'ccw': GL_CCW
};

function isBufferArgs (x) {
  return Array.isArray(x) ||
    isTypedArray(x) ||
    isNDArrayLike(x)
}

// Make sure viewport is processed first
function sortState (state) {
  return state.sort(function (a, b) {
    if (a === S_VIEWPORT) {
      return -1
    } else if (b === S_VIEWPORT) {
      return 1
    }
    return (a < b) ? -1 : 1
  })
}

function Declaration (thisDep, contextDep, propDep, append) {
  this.thisDep = thisDep;
  this.contextDep = contextDep;
  this.propDep = propDep;
  this.append = append;
}

function isStatic (decl) {
  return decl && !(decl.thisDep || decl.contextDep || decl.propDep)
}

function createStaticDecl (append) {
  return new Declaration(false, false, false, append)
}

function createDynamicDecl (dyn, append) {
  var type = dyn.type;
  if (type === DYN_FUNC$1) {
    var numArgs = dyn.data.length;
    return new Declaration(
      true,
      numArgs >= 1,
      numArgs >= 2,
      append)
  } else if (type === DYN_THUNK) {
    var data = dyn.data;
    return new Declaration(
      data.thisDep,
      data.contextDep,
      data.propDep,
      append)
  } else if (type === DYN_CONSTANT$1) {
    return new Declaration(
      false,
      false,
      false,
      append)
  } else if (type === DYN_ARRAY$1) {
    var thisDep = false;
    var contextDep = false;
    var propDep = false;
    for (var i = 0; i < dyn.data.length; ++i) {
      var subDyn = dyn.data[i];
      if (subDyn.type === DYN_PROP$1) {
        propDep = true;
      } else if (subDyn.type === DYN_CONTEXT$1) {
        contextDep = true;
      } else if (subDyn.type === DYN_STATE$1) {
        thisDep = true;
      } else if (subDyn.type === DYN_FUNC$1) {
        thisDep = true;
        var subArgs = subDyn.data;
        if (subArgs >= 1) {
          contextDep = true;
        }
        if (subArgs >= 2) {
          propDep = true;
        }
      } else if (subDyn.type === DYN_THUNK) {
        thisDep = thisDep || subDyn.data.thisDep;
        contextDep = contextDep || subDyn.data.contextDep;
        propDep = propDep || subDyn.data.propDep;
      }
    }
    return new Declaration(
      thisDep,
      contextDep,
      propDep,
      append)
  } else {
    return new Declaration(
      type === DYN_STATE$1,
      type === DYN_CONTEXT$1,
      type === DYN_PROP$1,
      append)
  }
}

var SCOPE_DECL = new Declaration(false, false, false, function () {});

function reglCore (
  gl,
  stringStore,
  extensions,
  limits,
  bufferState,
  elementState,
  textureState,
  framebufferState,
  uniformState,
  attributeState,
  shaderState,
  drawState,
  contextState,
  timer,
  config) {
  var AttributeRecord = attributeState.Record;

  var blendEquations = {
    'add': 32774,
    'subtract': 32778,
    'reverse subtract': 32779
  };
  if (extensions.ext_blend_minmax) {
    blendEquations.min = GL_MIN_EXT;
    blendEquations.max = GL_MAX_EXT;
  }

  var extInstancing = extensions.angle_instanced_arrays;
  var extDrawBuffers = extensions.webgl_draw_buffers;

  // ===================================================
  // ===================================================
  // WEBGL STATE
  // ===================================================
  // ===================================================
  var currentState = {
    dirty: true,
    profile: config.profile
  };
  var nextState = {};
  var GL_STATE_NAMES = [];
  var GL_FLAGS = {};
  var GL_VARIABLES = {};

  function propName (name) {
    return name.replace('.', '_')
  }

  function stateFlag (sname, cap, init) {
    var name = propName(sname);
    GL_STATE_NAMES.push(sname);
    nextState[name] = currentState[name] = !!init;
    GL_FLAGS[name] = cap;
  }

  function stateVariable (sname, func, init) {
    var name = propName(sname);
    GL_STATE_NAMES.push(sname);
    if (Array.isArray(init)) {
      currentState[name] = init.slice();
      nextState[name] = init.slice();
    } else {
      currentState[name] = nextState[name] = init;
    }
    GL_VARIABLES[name] = func;
  }

  // Dithering
  stateFlag(S_DITHER, GL_DITHER);

  // Blending
  stateFlag(S_BLEND_ENABLE, GL_BLEND);
  stateVariable(S_BLEND_COLOR, 'blendColor', [0, 0, 0, 0]);
  stateVariable(S_BLEND_EQUATION, 'blendEquationSeparate',
    [GL_FUNC_ADD, GL_FUNC_ADD]);
  stateVariable(S_BLEND_FUNC, 'blendFuncSeparate',
    [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]);

  // Depth
  stateFlag(S_DEPTH_ENABLE, GL_DEPTH_TEST, true);
  stateVariable(S_DEPTH_FUNC, 'depthFunc', GL_LESS);
  stateVariable(S_DEPTH_RANGE, 'depthRange', [0, 1]);
  stateVariable(S_DEPTH_MASK, 'depthMask', true);

  // Color mask
  stateVariable(S_COLOR_MASK, S_COLOR_MASK, [true, true, true, true]);

  // Face culling
  stateFlag(S_CULL_ENABLE, GL_CULL_FACE);
  stateVariable(S_CULL_FACE, 'cullFace', GL_BACK);

  // Front face orientation
  stateVariable(S_FRONT_FACE, S_FRONT_FACE, GL_CCW);

  // Line width
  stateVariable(S_LINE_WIDTH, S_LINE_WIDTH, 1);

  // Polygon offset
  stateFlag(S_POLYGON_OFFSET_ENABLE, GL_POLYGON_OFFSET_FILL);
  stateVariable(S_POLYGON_OFFSET_OFFSET, 'polygonOffset', [0, 0]);

  // Sample coverage
  stateFlag(S_SAMPLE_ALPHA, GL_SAMPLE_ALPHA_TO_COVERAGE);
  stateFlag(S_SAMPLE_ENABLE, GL_SAMPLE_COVERAGE);
  stateVariable(S_SAMPLE_COVERAGE, 'sampleCoverage', [1, false]);

  // Stencil
  stateFlag(S_STENCIL_ENABLE, GL_STENCIL_TEST);
  stateVariable(S_STENCIL_MASK, 'stencilMask', -1);
  stateVariable(S_STENCIL_FUNC, 'stencilFunc', [GL_ALWAYS, 0, -1]);
  stateVariable(S_STENCIL_OPFRONT, 'stencilOpSeparate',
    [GL_FRONT, GL_KEEP, GL_KEEP, GL_KEEP]);
  stateVariable(S_STENCIL_OPBACK, 'stencilOpSeparate',
    [GL_BACK, GL_KEEP, GL_KEEP, GL_KEEP]);

  // Scissor
  stateFlag(S_SCISSOR_ENABLE, GL_SCISSOR_TEST);
  stateVariable(S_SCISSOR_BOX, 'scissor',
    [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);

  // Viewport
  stateVariable(S_VIEWPORT, S_VIEWPORT,
    [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);

  // ===================================================
  // ===================================================
  // ENVIRONMENT
  // ===================================================
  // ===================================================
  var sharedState = {
    gl: gl,
    context: contextState,
    strings: stringStore,
    next: nextState,
    current: currentState,
    draw: drawState,
    elements: elementState,
    buffer: bufferState,
    shader: shaderState,
    attributes: attributeState.state,
    vao: attributeState,
    uniforms: uniformState,
    framebuffer: framebufferState,
    extensions: extensions,

    timer: timer,
    isBufferArgs: isBufferArgs
  };

  var sharedConstants = {
    primTypes: primTypes,
    compareFuncs: compareFuncs,
    blendFuncs: blendFuncs,
    blendEquations: blendEquations,
    stencilOps: stencilOps,
    glTypes: glTypes,
    orientationType: orientationType
  };

  check$1.optional(function () {
    sharedState.isArrayLike = isArrayLike;
  });

  if (extDrawBuffers) {
    sharedConstants.backBuffer = [GL_BACK];
    sharedConstants.drawBuffer = loop(limits.maxDrawbuffers, function (i) {
      if (i === 0) {
        return [0]
      }
      return loop(i, function (j) {
        return GL_COLOR_ATTACHMENT0$2 + j
      })
    });
  }

  var drawCallCounter = 0;
  function createREGLEnvironment () {
    var env = createEnvironment();
    var link = env.link;
    var global = env.global;
    env.id = drawCallCounter++;

    env.batchId = '0';

    // link shared state
    var SHARED = link(sharedState);
    var shared = env.shared = {
      props: 'a0'
    };
    Object.keys(sharedState).forEach(function (prop) {
      shared[prop] = global.def(SHARED, '.', prop);
    });

    // Inject runtime assertion stuff for debug builds
    check$1.optional(function () {
      env.CHECK = link(check$1);
      env.commandStr = check$1.guessCommand();
      env.command = link(env.commandStr);
      env.assert = function (block, pred, message) {
        block(
          'if(!(', pred, '))',
          this.CHECK, '.commandRaise(', link(message), ',', this.command, ');');
      };

      sharedConstants.invalidBlendCombinations = invalidBlendCombinations;
    });

    // Copy GL state variables over
    var nextVars = env.next = {};
    var currentVars = env.current = {};
    Object.keys(GL_VARIABLES).forEach(function (variable) {
      if (Array.isArray(currentState[variable])) {
        nextVars[variable] = global.def(shared.next, '.', variable);
        currentVars[variable] = global.def(shared.current, '.', variable);
      }
    });

    // Initialize shared constants
    var constants = env.constants = {};
    Object.keys(sharedConstants).forEach(function (name) {
      constants[name] = global.def(JSON.stringify(sharedConstants[name]));
    });

    // Helper function for calling a block
    env.invoke = function (block, x) {
      switch (x.type) {
        case DYN_FUNC$1:
          var argList = [
            'this',
            shared.context,
            shared.props,
            env.batchId
          ];
          return block.def(
            link(x.data), '.call(',
            argList.slice(0, Math.max(x.data.length + 1, 4)),
            ')')
        case DYN_PROP$1:
          return block.def(shared.props, x.data)
        case DYN_CONTEXT$1:
          return block.def(shared.context, x.data)
        case DYN_STATE$1:
          return block.def('this', x.data)
        case DYN_THUNK:
          x.data.append(env, block);
          return x.data.ref
        case DYN_CONSTANT$1:
          return x.data.toString()
        case DYN_ARRAY$1:
          return x.data.map(function (y) {
            return env.invoke(block, y)
          })
      }
    };

    env.attribCache = {};

    var scopeAttribs = {};
    env.scopeAttrib = function (name) {
      var id = stringStore.id(name);
      if (id in scopeAttribs) {
        return scopeAttribs[id]
      }
      var binding = attributeState.scope[id];
      if (!binding) {
        binding = attributeState.scope[id] = new AttributeRecord();
      }
      var result = scopeAttribs[id] = link(binding);
      return result
    };

    return env
  }

  // ===================================================
  // ===================================================
  // PARSING
  // ===================================================
  // ===================================================
  function parseProfile (options) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    var profileEnable;
    if (S_PROFILE in staticOptions) {
      var value = !!staticOptions[S_PROFILE];
      profileEnable = createStaticDecl(function (env, scope) {
        return value
      });
      profileEnable.enable = value;
    } else if (S_PROFILE in dynamicOptions) {
      var dyn = dynamicOptions[S_PROFILE];
      profileEnable = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    }

    return profileEnable
  }

  function parseFramebuffer (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    if (S_FRAMEBUFFER in staticOptions) {
      var framebuffer = staticOptions[S_FRAMEBUFFER];
      if (framebuffer) {
        framebuffer = framebufferState.getFramebuffer(framebuffer);
        check$1.command(framebuffer, 'invalid framebuffer object');
        return createStaticDecl(function (env, block) {
          var FRAMEBUFFER = env.link(framebuffer);
          var shared = env.shared;
          block.set(
            shared.framebuffer,
            '.next',
            FRAMEBUFFER);
          var CONTEXT = shared.context;
          block.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_WIDTH,
            FRAMEBUFFER + '.width');
          block.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_HEIGHT,
            FRAMEBUFFER + '.height');
          return FRAMEBUFFER
        })
      } else {
        return createStaticDecl(function (env, scope) {
          var shared = env.shared;
          scope.set(
            shared.framebuffer,
            '.next',
            'null');
          var CONTEXT = shared.context;
          scope.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_WIDTH,
            CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
          scope.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_HEIGHT,
            CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
          return 'null'
        })
      }
    } else if (S_FRAMEBUFFER in dynamicOptions) {
      var dyn = dynamicOptions[S_FRAMEBUFFER];
      return createDynamicDecl(dyn, function (env, scope) {
        var FRAMEBUFFER_FUNC = env.invoke(scope, dyn);
        var shared = env.shared;
        var FRAMEBUFFER_STATE = shared.framebuffer;
        var FRAMEBUFFER = scope.def(
          FRAMEBUFFER_STATE, '.getFramebuffer(', FRAMEBUFFER_FUNC, ')');

        check$1.optional(function () {
          env.assert(scope,
            '!' + FRAMEBUFFER_FUNC + '||' + FRAMEBUFFER,
            'invalid framebuffer object');
        });

        scope.set(
          FRAMEBUFFER_STATE,
          '.next',
          FRAMEBUFFER);
        var CONTEXT = shared.context;
        scope.set(
          CONTEXT,
          '.' + S_FRAMEBUFFER_WIDTH,
          FRAMEBUFFER + '?' + FRAMEBUFFER + '.width:' +
          CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
        scope.set(
          CONTEXT,
          '.' + S_FRAMEBUFFER_HEIGHT,
          FRAMEBUFFER +
          '?' + FRAMEBUFFER + '.height:' +
          CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
        return FRAMEBUFFER
      })
    } else {
      return null
    }
  }

  function parseViewportScissor (options, framebuffer, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    function parseBox (param) {
      if (param in staticOptions) {
        var box = staticOptions[param];
        check$1.commandType(box, 'object', 'invalid ' + param, env.commandStr);

        var isStatic = true;
        var x = box.x | 0;
        var y = box.y | 0;
        var w, h;
        if ('width' in box) {
          w = box.width | 0;
          check$1.command(w >= 0, 'invalid ' + param, env.commandStr);
        } else {
          isStatic = false;
        }
        if ('height' in box) {
          h = box.height | 0;
          check$1.command(h >= 0, 'invalid ' + param, env.commandStr);
        } else {
          isStatic = false;
        }

        return new Declaration(
          !isStatic && framebuffer && framebuffer.thisDep,
          !isStatic && framebuffer && framebuffer.contextDep,
          !isStatic && framebuffer && framebuffer.propDep,
          function (env, scope) {
            var CONTEXT = env.shared.context;
            var BOX_W = w;
            if (!('width' in box)) {
              BOX_W = scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', x);
            }
            var BOX_H = h;
            if (!('height' in box)) {
              BOX_H = scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', y);
            }
            return [x, y, BOX_W, BOX_H]
          })
      } else if (param in dynamicOptions) {
        var dynBox = dynamicOptions[param];
        var result = createDynamicDecl(dynBox, function (env, scope) {
          var BOX = env.invoke(scope, dynBox);

          check$1.optional(function () {
            env.assert(scope,
              BOX + '&&typeof ' + BOX + '==="object"',
              'invalid ' + param);
          });

          var CONTEXT = env.shared.context;
          var BOX_X = scope.def(BOX, '.x|0');
          var BOX_Y = scope.def(BOX, '.y|0');
          var BOX_W = scope.def(
            '"width" in ', BOX, '?', BOX, '.width|0:',
            '(', CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', BOX_X, ')');
          var BOX_H = scope.def(
            '"height" in ', BOX, '?', BOX, '.height|0:',
            '(', CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', BOX_Y, ')');

          check$1.optional(function () {
            env.assert(scope,
              BOX_W + '>=0&&' +
              BOX_H + '>=0',
              'invalid ' + param);
          });

          return [BOX_X, BOX_Y, BOX_W, BOX_H]
        });
        if (framebuffer) {
          result.thisDep = result.thisDep || framebuffer.thisDep;
          result.contextDep = result.contextDep || framebuffer.contextDep;
          result.propDep = result.propDep || framebuffer.propDep;
        }
        return result
      } else if (framebuffer) {
        return new Declaration(
          framebuffer.thisDep,
          framebuffer.contextDep,
          framebuffer.propDep,
          function (env, scope) {
            var CONTEXT = env.shared.context;
            return [
              0, 0,
              scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH),
              scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT)]
          })
      } else {
        return null
      }
    }

    var viewport = parseBox(S_VIEWPORT);

    if (viewport) {
      var prevViewport = viewport;
      viewport = new Declaration(
        viewport.thisDep,
        viewport.contextDep,
        viewport.propDep,
        function (env, scope) {
          var VIEWPORT = prevViewport.append(env, scope);
          var CONTEXT = env.shared.context;
          scope.set(
            CONTEXT,
            '.' + S_VIEWPORT_WIDTH,
            VIEWPORT[2]);
          scope.set(
            CONTEXT,
            '.' + S_VIEWPORT_HEIGHT,
            VIEWPORT[3]);
          return VIEWPORT
        });
    }

    return {
      viewport: viewport,
      scissor_box: parseBox(S_SCISSOR_BOX)
    }
  }

  function parseAttribLocations (options, attributes) {
    var staticOptions = options.static;
    var staticProgram =
      typeof staticOptions[S_FRAG] === 'string' &&
      typeof staticOptions[S_VERT] === 'string';
    if (staticProgram) {
      if (Object.keys(attributes.dynamic).length > 0) {
        return null
      }
      var staticAttributes = attributes.static;
      var sAttributes = Object.keys(staticAttributes);
      if (sAttributes.length > 0 && typeof staticAttributes[sAttributes[0]] === 'number') {
        var bindings = [];
        for (var i = 0; i < sAttributes.length; ++i) {
          check$1(typeof staticAttributes[sAttributes[i]] === 'number', 'must specify all vertex attribute locations when using vaos');
          bindings.push([staticAttributes[sAttributes[i]] | 0, sAttributes[i]]);
        }
        return bindings
      }
    }
    return null
  }

  function parseProgram (options, env, attribLocations) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    function parseShader (name) {
      if (name in staticOptions) {
        var id = stringStore.id(staticOptions[name]);
        check$1.optional(function () {
          shaderState.shader(shaderType[name], id, check$1.guessCommand());
        });
        var result = createStaticDecl(function () {
          return id
        });
        result.id = id;
        return result
      } else if (name in dynamicOptions) {
        var dyn = dynamicOptions[name];
        return createDynamicDecl(dyn, function (env, scope) {
          var str = env.invoke(scope, dyn);
          var id = scope.def(env.shared.strings, '.id(', str, ')');
          check$1.optional(function () {
            scope(
              env.shared.shader, '.shader(',
              shaderType[name], ',',
              id, ',',
              env.command, ');');
          });
          return id
        })
      }
      return null
    }

    var frag = parseShader(S_FRAG);
    var vert = parseShader(S_VERT);

    var program = null;
    var progVar;
    if (isStatic(frag) && isStatic(vert)) {
      program = shaderState.program(vert.id, frag.id, null, attribLocations);
      progVar = createStaticDecl(function (env, scope) {
        return env.link(program)
      });
    } else {
      progVar = new Declaration(
        (frag && frag.thisDep) || (vert && vert.thisDep),
        (frag && frag.contextDep) || (vert && vert.contextDep),
        (frag && frag.propDep) || (vert && vert.propDep),
        function (env, scope) {
          var SHADER_STATE = env.shared.shader;
          var fragId;
          if (frag) {
            fragId = frag.append(env, scope);
          } else {
            fragId = scope.def(SHADER_STATE, '.', S_FRAG);
          }
          var vertId;
          if (vert) {
            vertId = vert.append(env, scope);
          } else {
            vertId = scope.def(SHADER_STATE, '.', S_VERT);
          }
          var progDef = SHADER_STATE + '.program(' + vertId + ',' + fragId;
          check$1.optional(function () {
            progDef += ',' + env.command;
          });
          return scope.def(progDef + ')')
        });
    }

    return {
      frag: frag,
      vert: vert,
      progVar: progVar,
      program: program
    }
  }

  function parseDraw (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    function parseElements () {
      if (S_ELEMENTS in staticOptions) {
        var elements = staticOptions[S_ELEMENTS];
        if (isBufferArgs(elements)) {
          elements = elementState.getElements(elementState.create(elements, true));
        } else if (elements) {
          elements = elementState.getElements(elements);
          check$1.command(elements, 'invalid elements', env.commandStr);
        }
        var result = createStaticDecl(function (env, scope) {
          if (elements) {
            var result = env.link(elements);
            env.ELEMENTS = result;
            return result
          }
          env.ELEMENTS = null;
          return null
        });
        result.value = elements;
        return result
      } else if (S_ELEMENTS in dynamicOptions) {
        var dyn = dynamicOptions[S_ELEMENTS];
        return createDynamicDecl(dyn, function (env, scope) {
          var shared = env.shared;

          var IS_BUFFER_ARGS = shared.isBufferArgs;
          var ELEMENT_STATE = shared.elements;

          var elementDefn = env.invoke(scope, dyn);
          var elements = scope.def('null');
          var elementStream = scope.def(IS_BUFFER_ARGS, '(', elementDefn, ')');

          var ifte = env.cond(elementStream)
            .then(elements, '=', ELEMENT_STATE, '.createStream(', elementDefn, ');')
            .else(elements, '=', ELEMENT_STATE, '.getElements(', elementDefn, ');');

          check$1.optional(function () {
            env.assert(ifte.else,
              '!' + elementDefn + '||' + elements,
              'invalid elements');
          });

          scope.entry(ifte);
          scope.exit(
            env.cond(elementStream)
              .then(ELEMENT_STATE, '.destroyStream(', elements, ');'));

          env.ELEMENTS = elements;

          return elements
        })
      }

      return null
    }

    var elements = parseElements();

    function parsePrimitive () {
      if (S_PRIMITIVE in staticOptions) {
        var primitive = staticOptions[S_PRIMITIVE];
        check$1.commandParameter(primitive, primTypes, 'invalid primitve', env.commandStr);
        return createStaticDecl(function (env, scope) {
          return primTypes[primitive]
        })
      } else if (S_PRIMITIVE in dynamicOptions) {
        var dynPrimitive = dynamicOptions[S_PRIMITIVE];
        return createDynamicDecl(dynPrimitive, function (env, scope) {
          var PRIM_TYPES = env.constants.primTypes;
          var prim = env.invoke(scope, dynPrimitive);
          check$1.optional(function () {
            env.assert(scope,
              prim + ' in ' + PRIM_TYPES,
              'invalid primitive, must be one of ' + Object.keys(primTypes));
          });
          return scope.def(PRIM_TYPES, '[', prim, ']')
        })
      } else if (elements) {
        if (isStatic(elements)) {
          if (elements.value) {
            return createStaticDecl(function (env, scope) {
              return scope.def(env.ELEMENTS, '.primType')
            })
          } else {
            return createStaticDecl(function () {
              return GL_TRIANGLES$1
            })
          }
        } else {
          return new Declaration(
            elements.thisDep,
            elements.contextDep,
            elements.propDep,
            function (env, scope) {
              var elements = env.ELEMENTS;
              return scope.def(elements, '?', elements, '.primType:', GL_TRIANGLES$1)
            })
        }
      }
      return null
    }

    function parseParam (param, isOffset) {
      if (param in staticOptions) {
        var value = staticOptions[param] | 0;
        check$1.command(!isOffset || value >= 0, 'invalid ' + param, env.commandStr);
        return createStaticDecl(function (env, scope) {
          if (isOffset) {
            env.OFFSET = value;
          }
          return value
        })
      } else if (param in dynamicOptions) {
        var dynValue = dynamicOptions[param];
        return createDynamicDecl(dynValue, function (env, scope) {
          var result = env.invoke(scope, dynValue);
          if (isOffset) {
            env.OFFSET = result;
            check$1.optional(function () {
              env.assert(scope,
                result + '>=0',
                'invalid ' + param);
            });
          }
          return result
        })
      } else if (isOffset && elements) {
        return createStaticDecl(function (env, scope) {
          env.OFFSET = '0';
          return 0
        })
      }
      return null
    }

    var OFFSET = parseParam(S_OFFSET, true);

    function parseVertCount () {
      if (S_COUNT in staticOptions) {
        var count = staticOptions[S_COUNT] | 0;
        check$1.command(
          typeof count === 'number' && count >= 0, 'invalid vertex count', env.commandStr);
        return createStaticDecl(function () {
          return count
        })
      } else if (S_COUNT in dynamicOptions) {
        var dynCount = dynamicOptions[S_COUNT];
        return createDynamicDecl(dynCount, function (env, scope) {
          var result = env.invoke(scope, dynCount);
          check$1.optional(function () {
            env.assert(scope,
              'typeof ' + result + '==="number"&&' +
              result + '>=0&&' +
              result + '===(' + result + '|0)',
              'invalid vertex count');
          });
          return result
        })
      } else if (elements) {
        if (isStatic(elements)) {
          if (elements) {
            if (OFFSET) {
              return new Declaration(
                OFFSET.thisDep,
                OFFSET.contextDep,
                OFFSET.propDep,
                function (env, scope) {
                  var result = scope.def(
                    env.ELEMENTS, '.vertCount-', env.OFFSET);

                  check$1.optional(function () {
                    env.assert(scope,
                      result + '>=0',
                      'invalid vertex offset/element buffer too small');
                  });

                  return result
                })
            } else {
              return createStaticDecl(function (env, scope) {
                return scope.def(env.ELEMENTS, '.vertCount')
              })
            }
          } else {
            var result = createStaticDecl(function () {
              return -1
            });
            check$1.optional(function () {
              result.MISSING = true;
            });
            return result
          }
        } else {
          var variable = new Declaration(
            elements.thisDep || OFFSET.thisDep,
            elements.contextDep || OFFSET.contextDep,
            elements.propDep || OFFSET.propDep,
            function (env, scope) {
              var elements = env.ELEMENTS;
              if (env.OFFSET) {
                return scope.def(elements, '?', elements, '.vertCount-',
                  env.OFFSET, ':-1')
              }
              return scope.def(elements, '?', elements, '.vertCount:-1')
            });
          check$1.optional(function () {
            variable.DYNAMIC = true;
          });
          return variable
        }
      }
      return null
    }

    return {
      elements: elements,
      primitive: parsePrimitive(),
      count: parseVertCount(),
      instances: parseParam(S_INSTANCES, false),
      offset: OFFSET
    }
  }

  function parseGLState (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    var STATE = {};

    GL_STATE_NAMES.forEach(function (prop) {
      var param = propName(prop);

      function parseParam (parseStatic, parseDynamic) {
        if (prop in staticOptions) {
          var value = parseStatic(staticOptions[prop]);
          STATE[param] = createStaticDecl(function () {
            return value
          });
        } else if (prop in dynamicOptions) {
          var dyn = dynamicOptions[prop];
          STATE[param] = createDynamicDecl(dyn, function (env, scope) {
            return parseDynamic(env, scope, env.invoke(scope, dyn))
          });
        }
      }

      switch (prop) {
        case S_CULL_ENABLE:
        case S_BLEND_ENABLE:
        case S_DITHER:
        case S_STENCIL_ENABLE:
        case S_DEPTH_ENABLE:
        case S_SCISSOR_ENABLE:
        case S_POLYGON_OFFSET_ENABLE:
        case S_SAMPLE_ALPHA:
        case S_SAMPLE_ENABLE:
        case S_DEPTH_MASK:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'boolean', prop, env.commandStr);
              return value
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  'typeof ' + value + '==="boolean"',
                  'invalid flag ' + prop, env.commandStr);
              });
              return value
            })

        case S_DEPTH_FUNC:
          return parseParam(
            function (value) {
              check$1.commandParameter(value, compareFuncs, 'invalid ' + prop, env.commandStr);
              return compareFuncs[value]
            },
            function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              check$1.optional(function () {
                env.assert(scope,
                  value + ' in ' + COMPARE_FUNCS,
                  'invalid ' + prop + ', must be one of ' + Object.keys(compareFuncs));
              });
              return scope.def(COMPARE_FUNCS, '[', value, ']')
            })

        case S_DEPTH_RANGE:
          return parseParam(
            function (value) {
              check$1.command(
                isArrayLike(value) &&
                value.length === 2 &&
                typeof value[0] === 'number' &&
                typeof value[1] === 'number' &&
                value[0] <= value[1],
                'depth range is 2d array',
                env.commandStr);
              return value
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  env.shared.isArrayLike + '(' + value + ')&&' +
                  value + '.length===2&&' +
                  'typeof ' + value + '[0]==="number"&&' +
                  'typeof ' + value + '[1]==="number"&&' +
                  value + '[0]<=' + value + '[1]',
                  'depth range must be a 2d array');
              });

              var Z_NEAR = scope.def('+', value, '[0]');
              var Z_FAR = scope.def('+', value, '[1]');
              return [Z_NEAR, Z_FAR]
            })

        case S_BLEND_FUNC:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'object', 'blend.func', env.commandStr);
              var srcRGB = ('srcRGB' in value ? value.srcRGB : value.src);
              var srcAlpha = ('srcAlpha' in value ? value.srcAlpha : value.src);
              var dstRGB = ('dstRGB' in value ? value.dstRGB : value.dst);
              var dstAlpha = ('dstAlpha' in value ? value.dstAlpha : value.dst);
              check$1.commandParameter(srcRGB, blendFuncs, param + '.srcRGB', env.commandStr);
              check$1.commandParameter(srcAlpha, blendFuncs, param + '.srcAlpha', env.commandStr);
              check$1.commandParameter(dstRGB, blendFuncs, param + '.dstRGB', env.commandStr);
              check$1.commandParameter(dstAlpha, blendFuncs, param + '.dstAlpha', env.commandStr);

              check$1.command(
                (invalidBlendCombinations.indexOf(srcRGB + ', ' + dstRGB) === -1),
                'unallowed blending combination (srcRGB, dstRGB) = (' + srcRGB + ', ' + dstRGB + ')', env.commandStr);

              return [
                blendFuncs[srcRGB],
                blendFuncs[dstRGB],
                blendFuncs[srcAlpha],
                blendFuncs[dstAlpha]
              ]
            },
            function (env, scope, value) {
              var BLEND_FUNCS = env.constants.blendFuncs;

              check$1.optional(function () {
                env.assert(scope,
                  value + '&&typeof ' + value + '==="object"',
                  'invalid blend func, must be an object');
              });

              function read (prefix, suffix) {
                var func = scope.def(
                  '"', prefix, suffix, '" in ', value,
                  '?', value, '.', prefix, suffix,
                  ':', value, '.', prefix);

                check$1.optional(function () {
                  env.assert(scope,
                    func + ' in ' + BLEND_FUNCS,
                    'invalid ' + prop + '.' + prefix + suffix + ', must be one of ' + Object.keys(blendFuncs));
                });

                return func
              }

              var srcRGB = read('src', 'RGB');
              var dstRGB = read('dst', 'RGB');

              check$1.optional(function () {
                var INVALID_BLEND_COMBINATIONS = env.constants.invalidBlendCombinations;

                env.assert(scope,
                  INVALID_BLEND_COMBINATIONS +
                           '.indexOf(' + srcRGB + '+", "+' + dstRGB + ') === -1 ',
                  'unallowed blending combination for (srcRGB, dstRGB)'
                );
              });

              var SRC_RGB = scope.def(BLEND_FUNCS, '[', srcRGB, ']');
              var SRC_ALPHA = scope.def(BLEND_FUNCS, '[', read('src', 'Alpha'), ']');
              var DST_RGB = scope.def(BLEND_FUNCS, '[', dstRGB, ']');
              var DST_ALPHA = scope.def(BLEND_FUNCS, '[', read('dst', 'Alpha'), ']');

              return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA]
            })

        case S_BLEND_EQUATION:
          return parseParam(
            function (value) {
              if (typeof value === 'string') {
                check$1.commandParameter(value, blendEquations, 'invalid ' + prop, env.commandStr);
                return [
                  blendEquations[value],
                  blendEquations[value]
                ]
              } else if (typeof value === 'object') {
                check$1.commandParameter(
                  value.rgb, blendEquations, prop + '.rgb', env.commandStr);
                check$1.commandParameter(
                  value.alpha, blendEquations, prop + '.alpha', env.commandStr);
                return [
                  blendEquations[value.rgb],
                  blendEquations[value.alpha]
                ]
              } else {
                check$1.commandRaise('invalid blend.equation', env.commandStr);
              }
            },
            function (env, scope, value) {
              var BLEND_EQUATIONS = env.constants.blendEquations;

              var RGB = scope.def();
              var ALPHA = scope.def();

              var ifte = env.cond('typeof ', value, '==="string"');

              check$1.optional(function () {
                function checkProp (block, name, value) {
                  env.assert(block,
                    value + ' in ' + BLEND_EQUATIONS,
                    'invalid ' + name + ', must be one of ' + Object.keys(blendEquations));
                }
                checkProp(ifte.then, prop, value);

                env.assert(ifte.else,
                  value + '&&typeof ' + value + '==="object"',
                  'invalid ' + prop);
                checkProp(ifte.else, prop + '.rgb', value + '.rgb');
                checkProp(ifte.else, prop + '.alpha', value + '.alpha');
              });

              ifte.then(
                RGB, '=', ALPHA, '=', BLEND_EQUATIONS, '[', value, '];');
              ifte.else(
                RGB, '=', BLEND_EQUATIONS, '[', value, '.rgb];',
                ALPHA, '=', BLEND_EQUATIONS, '[', value, '.alpha];');

              scope(ifte);

              return [RGB, ALPHA]
            })

        case S_BLEND_COLOR:
          return parseParam(
            function (value) {
              check$1.command(
                isArrayLike(value) &&
                value.length === 4,
                'blend.color must be a 4d array', env.commandStr);
              return loop(4, function (i) {
                return +value[i]
              })
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  env.shared.isArrayLike + '(' + value + ')&&' +
                  value + '.length===4',
                  'blend.color must be a 4d array');
              });
              return loop(4, function (i) {
                return scope.def('+', value, '[', i, ']')
              })
            })

        case S_STENCIL_MASK:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'number', param, env.commandStr);
              return value | 0
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  'typeof ' + value + '==="number"',
                  'invalid stencil.mask');
              });
              return scope.def(value, '|0')
            })

        case S_STENCIL_FUNC:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var cmp = value.cmp || 'keep';
              var ref = value.ref || 0;
              var mask = 'mask' in value ? value.mask : -1;
              check$1.commandParameter(cmp, compareFuncs, prop + '.cmp', env.commandStr);
              check$1.commandType(ref, 'number', prop + '.ref', env.commandStr);
              check$1.commandType(mask, 'number', prop + '.mask', env.commandStr);
              return [
                compareFuncs[cmp],
                ref,
                mask
              ]
            },
            function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              check$1.optional(function () {
                function assert () {
                  env.assert(scope,
                    Array.prototype.join.call(arguments, ''),
                    'invalid stencil.func');
                }
                assert(value + '&&typeof ', value, '==="object"');
                assert('!("cmp" in ', value, ')||(',
                  value, '.cmp in ', COMPARE_FUNCS, ')');
              });
              var cmp = scope.def(
                '"cmp" in ', value,
                '?', COMPARE_FUNCS, '[', value, '.cmp]',
                ':', GL_KEEP);
              var ref = scope.def(value, '.ref|0');
              var mask = scope.def(
                '"mask" in ', value,
                '?', value, '.mask|0:-1');
              return [cmp, ref, mask]
            })

        case S_STENCIL_OPFRONT:
        case S_STENCIL_OPBACK:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var fail = value.fail || 'keep';
              var zfail = value.zfail || 'keep';
              var zpass = value.zpass || 'keep';
              check$1.commandParameter(fail, stencilOps, prop + '.fail', env.commandStr);
              check$1.commandParameter(zfail, stencilOps, prop + '.zfail', env.commandStr);
              check$1.commandParameter(zpass, stencilOps, prop + '.zpass', env.commandStr);
              return [
                prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                stencilOps[fail],
                stencilOps[zfail],
                stencilOps[zpass]
              ]
            },
            function (env, scope, value) {
              var STENCIL_OPS = env.constants.stencilOps;

              check$1.optional(function () {
                env.assert(scope,
                  value + '&&typeof ' + value + '==="object"',
                  'invalid ' + prop);
              });

              function read (name) {
                check$1.optional(function () {
                  env.assert(scope,
                    '!("' + name + '" in ' + value + ')||' +
                    '(' + value + '.' + name + ' in ' + STENCIL_OPS + ')',
                    'invalid ' + prop + '.' + name + ', must be one of ' + Object.keys(stencilOps));
                });

                return scope.def(
                  '"', name, '" in ', value,
                  '?', STENCIL_OPS, '[', value, '.', name, ']:',
                  GL_KEEP)
              }

              return [
                prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                read('fail'),
                read('zfail'),
                read('zpass')
              ]
            })

        case S_POLYGON_OFFSET_OFFSET:
          return parseParam(
            function (value) {
              check$1.commandType(value, 'object', param, env.commandStr);
              var factor = value.factor | 0;
              var units = value.units | 0;
              check$1.commandType(factor, 'number', param + '.factor', env.commandStr);
              check$1.commandType(units, 'number', param + '.units', env.commandStr);
              return [factor, units]
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  value + '&&typeof ' + value + '==="object"',
                  'invalid ' + prop);
              });

              var FACTOR = scope.def(value, '.factor|0');
              var UNITS = scope.def(value, '.units|0');

              return [FACTOR, UNITS]
            })

        case S_CULL_FACE:
          return parseParam(
            function (value) {
              var face = 0;
              if (value === 'front') {
                face = GL_FRONT;
              } else if (value === 'back') {
                face = GL_BACK;
              }
              check$1.command(!!face, param, env.commandStr);
              return face
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  value + '==="front"||' +
                  value + '==="back"',
                  'invalid cull.face');
              });
              return scope.def(value, '==="front"?', GL_FRONT, ':', GL_BACK)
            })

        case S_LINE_WIDTH:
          return parseParam(
            function (value) {
              check$1.command(
                typeof value === 'number' &&
                value >= limits.lineWidthDims[0] &&
                value <= limits.lineWidthDims[1],
                'invalid line width, must be a positive number between ' +
                limits.lineWidthDims[0] + ' and ' + limits.lineWidthDims[1], env.commandStr);
              return value
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  'typeof ' + value + '==="number"&&' +
                  value + '>=' + limits.lineWidthDims[0] + '&&' +
                  value + '<=' + limits.lineWidthDims[1],
                  'invalid line width');
              });

              return value
            })

        case S_FRONT_FACE:
          return parseParam(
            function (value) {
              check$1.commandParameter(value, orientationType, param, env.commandStr);
              return orientationType[value]
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  value + '==="cw"||' +
                  value + '==="ccw"',
                  'invalid frontFace, must be one of cw,ccw');
              });
              return scope.def(value + '==="cw"?' + GL_CW + ':' + GL_CCW)
            })

        case S_COLOR_MASK:
          return parseParam(
            function (value) {
              check$1.command(
                isArrayLike(value) && value.length === 4,
                'color.mask must be length 4 array', env.commandStr);
              return value.map(function (v) { return !!v })
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  env.shared.isArrayLike + '(' + value + ')&&' +
                  value + '.length===4',
                  'invalid color.mask');
              });
              return loop(4, function (i) {
                return '!!' + value + '[' + i + ']'
              })
            })

        case S_SAMPLE_COVERAGE:
          return parseParam(
            function (value) {
              check$1.command(typeof value === 'object' && value, param, env.commandStr);
              var sampleValue = 'value' in value ? value.value : 1;
              var sampleInvert = !!value.invert;
              check$1.command(
                typeof sampleValue === 'number' &&
                sampleValue >= 0 && sampleValue <= 1,
                'sample.coverage.value must be a number between 0 and 1', env.commandStr);
              return [sampleValue, sampleInvert]
            },
            function (env, scope, value) {
              check$1.optional(function () {
                env.assert(scope,
                  value + '&&typeof ' + value + '==="object"',
                  'invalid sample.coverage');
              });
              var VALUE = scope.def(
                '"value" in ', value, '?+', value, '.value:1');
              var INVERT = scope.def('!!', value, '.invert');
              return [VALUE, INVERT]
            })
      }
    });

    return STATE
  }

  function parseUniforms (uniforms, env) {
    var staticUniforms = uniforms.static;
    var dynamicUniforms = uniforms.dynamic;

    var UNIFORMS = {};

    Object.keys(staticUniforms).forEach(function (name) {
      var value = staticUniforms[name];
      var result;
      if (typeof value === 'number' ||
          typeof value === 'boolean') {
        result = createStaticDecl(function () {
          return value
        });
      } else if (typeof value === 'function') {
        var reglType = value._reglType;
        if (reglType === 'texture2d' ||
            reglType === 'textureCube') {
          result = createStaticDecl(function (env) {
            return env.link(value)
          });
        } else if (reglType === 'framebuffer' ||
                   reglType === 'framebufferCube') {
          check$1.command(value.color.length > 0,
            'missing color attachment for framebuffer sent to uniform "' + name + '"', env.commandStr);
          result = createStaticDecl(function (env) {
            return env.link(value.color[0])
          });
        } else {
          check$1.commandRaise('invalid data for uniform "' + name + '"', env.commandStr);
        }
      } else if (isArrayLike(value)) {
        result = createStaticDecl(function (env) {
          var ITEM = env.global.def('[',
            loop(value.length, function (i) {
              check$1.command(
                typeof value[i] === 'number' ||
                typeof value[i] === 'boolean',
                'invalid uniform ' + name, env.commandStr);
              return value[i]
            }), ']');
          return ITEM
        });
      } else {
        check$1.commandRaise('invalid or missing data for uniform "' + name + '"', env.commandStr);
      }
      result.value = value;
      UNIFORMS[name] = result;
    });

    Object.keys(dynamicUniforms).forEach(function (key) {
      var dyn = dynamicUniforms[key];
      UNIFORMS[key] = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    });

    return UNIFORMS
  }

  function parseAttributes (attributes, env) {
    var staticAttributes = attributes.static;
    var dynamicAttributes = attributes.dynamic;

    var attributeDefs = {};

    Object.keys(staticAttributes).forEach(function (attribute) {
      var value = staticAttributes[attribute];
      var id = stringStore.id(attribute);

      var record = new AttributeRecord();
      if (isBufferArgs(value)) {
        record.state = ATTRIB_STATE_POINTER;
        record.buffer = bufferState.getBuffer(
          bufferState.create(value, GL_ARRAY_BUFFER$2, false, true));
        record.type = 0;
      } else {
        var buffer = bufferState.getBuffer(value);
        if (buffer) {
          record.state = ATTRIB_STATE_POINTER;
          record.buffer = buffer;
          record.type = 0;
        } else {
          check$1.command(typeof value === 'object' && value,
            'invalid data for attribute ' + attribute, env.commandStr);
          if ('constant' in value) {
            var constant = value.constant;
            record.buffer = 'null';
            record.state = ATTRIB_STATE_CONSTANT;
            if (typeof constant === 'number') {
              record.x = constant;
            } else {
              check$1.command(
                isArrayLike(constant) &&
                constant.length > 0 &&
                constant.length <= 4,
                'invalid constant for attribute ' + attribute, env.commandStr);
              CUTE_COMPONENTS.forEach(function (c, i) {
                if (i < constant.length) {
                  record[c] = constant[i];
                }
              });
            }
          } else {
            if (isBufferArgs(value.buffer)) {
              buffer = bufferState.getBuffer(
                bufferState.create(value.buffer, GL_ARRAY_BUFFER$2, false, true));
            } else {
              buffer = bufferState.getBuffer(value.buffer);
            }
            check$1.command(!!buffer, 'missing buffer for attribute "' + attribute + '"', env.commandStr);

            var offset = value.offset | 0;
            check$1.command(offset >= 0,
              'invalid offset for attribute "' + attribute + '"', env.commandStr);

            var stride = value.stride | 0;
            check$1.command(stride >= 0 && stride < 256,
              'invalid stride for attribute "' + attribute + '", must be integer betweeen [0, 255]', env.commandStr);

            var size = value.size | 0;
            check$1.command(!('size' in value) || (size > 0 && size <= 4),
              'invalid size for attribute "' + attribute + '", must be 1,2,3,4', env.commandStr);

            var normalized = !!value.normalized;

            var type = 0;
            if ('type' in value) {
              check$1.commandParameter(
                value.type, glTypes,
                'invalid type for attribute ' + attribute, env.commandStr);
              type = glTypes[value.type];
            }

            var divisor = value.divisor | 0;
            if ('divisor' in value) {
              check$1.command(divisor === 0 || extInstancing,
                'cannot specify divisor for attribute "' + attribute + '", instancing not supported', env.commandStr);
              check$1.command(divisor >= 0,
                'invalid divisor for attribute "' + attribute + '"', env.commandStr);
            }

            check$1.optional(function () {
              var command = env.commandStr;

              var VALID_KEYS = [
                'buffer',
                'offset',
                'divisor',
                'normalized',
                'type',
                'size',
                'stride'
              ];

              Object.keys(value).forEach(function (prop) {
                check$1.command(
                  VALID_KEYS.indexOf(prop) >= 0,
                  'unknown parameter "' + prop + '" for attribute pointer "' + attribute + '" (valid parameters are ' + VALID_KEYS + ')',
                  command);
              });
            });

            record.buffer = buffer;
            record.state = ATTRIB_STATE_POINTER;
            record.size = size;
            record.normalized = normalized;
            record.type = type || buffer.dtype;
            record.offset = offset;
            record.stride = stride;
            record.divisor = divisor;
          }
        }
      }

      attributeDefs[attribute] = createStaticDecl(function (env, scope) {
        var cache = env.attribCache;
        if (id in cache) {
          return cache[id]
        }
        var result = {
          isStream: false
        };
        Object.keys(record).forEach(function (key) {
          result[key] = record[key];
        });
        if (record.buffer) {
          result.buffer = env.link(record.buffer);
          result.type = result.type || (result.buffer + '.dtype');
        }
        cache[id] = result;
        return result
      });
    });

    Object.keys(dynamicAttributes).forEach(function (attribute) {
      var dyn = dynamicAttributes[attribute];

      function appendAttributeCode (env, block) {
        var VALUE = env.invoke(block, dyn);

        var shared = env.shared;
        var constants = env.constants;

        var IS_BUFFER_ARGS = shared.isBufferArgs;
        var BUFFER_STATE = shared.buffer;

        // Perform validation on attribute
        check$1.optional(function () {
          env.assert(block,
            VALUE + '&&(typeof ' + VALUE + '==="object"||typeof ' +
            VALUE + '==="function")&&(' +
            IS_BUFFER_ARGS + '(' + VALUE + ')||' +
            BUFFER_STATE + '.getBuffer(' + VALUE + ')||' +
            BUFFER_STATE + '.getBuffer(' + VALUE + '.buffer)||' +
            IS_BUFFER_ARGS + '(' + VALUE + '.buffer)||' +
            '("constant" in ' + VALUE +
            '&&(typeof ' + VALUE + '.constant==="number"||' +
            shared.isArrayLike + '(' + VALUE + '.constant))))',
            'invalid dynamic attribute "' + attribute + '"');
        });

        // allocate names for result
        var result = {
          isStream: block.def(false)
        };
        var defaultRecord = new AttributeRecord();
        defaultRecord.state = ATTRIB_STATE_POINTER;
        Object.keys(defaultRecord).forEach(function (key) {
          result[key] = block.def('' + defaultRecord[key]);
        });

        var BUFFER = result.buffer;
        var TYPE = result.type;
        block(
          'if(', IS_BUFFER_ARGS, '(', VALUE, ')){',
          result.isStream, '=true;',
          BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, ');',
          TYPE, '=', BUFFER, '.dtype;',
          '}else{',
          BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, ');',
          'if(', BUFFER, '){',
          TYPE, '=', BUFFER, '.dtype;',
          '}else if("constant" in ', VALUE, '){',
          result.state, '=', ATTRIB_STATE_CONSTANT, ';',
          'if(typeof ' + VALUE + '.constant === "number"){',
          result[CUTE_COMPONENTS[0]], '=', VALUE, '.constant;',
          CUTE_COMPONENTS.slice(1).map(function (n) {
            return result[n]
          }).join('='), '=0;',
          '}else{',
          CUTE_COMPONENTS.map(function (name, i) {
            return (
              result[name] + '=' + VALUE + '.constant.length>' + i +
              '?' + VALUE + '.constant[' + i + ']:0;'
            )
          }).join(''),
          '}}else{',
          'if(', IS_BUFFER_ARGS, '(', VALUE, '.buffer)){',
          BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, '.buffer);',
          '}else{',
          BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, '.buffer);',
          '}',
          TYPE, '="type" in ', VALUE, '?',
          constants.glTypes, '[', VALUE, '.type]:', BUFFER, '.dtype;',
          result.normalized, '=!!', VALUE, '.normalized;');
        function emitReadRecord (name) {
          block(result[name], '=', VALUE, '.', name, '|0;');
        }
        emitReadRecord('size');
        emitReadRecord('offset');
        emitReadRecord('stride');
        emitReadRecord('divisor');

        block('}}');

        block.exit(
          'if(', result.isStream, '){',
          BUFFER_STATE, '.destroyStream(', BUFFER, ');',
          '}');

        return result
      }

      attributeDefs[attribute] = createDynamicDecl(dyn, appendAttributeCode);
    });

    return attributeDefs
  }

  function parseVAO (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    if (S_VAO in staticOptions) {
      var vao = staticOptions[S_VAO];
      if (vao !== null && attributeState.getVAO(vao) === null) {
        vao = attributeState.createVAO(vao);
      }
      return createStaticDecl(function (env) {
        return env.link(attributeState.getVAO(vao))
      })
    } else if (S_VAO in dynamicOptions) {
      var dyn = dynamicOptions[S_VAO];
      return createDynamicDecl(dyn, function (env, scope) {
        var vaoRef = env.invoke(scope, dyn);
        return scope.def(env.shared.vao + '.getVAO(' + vaoRef + ')')
      })
    }
    return null
  }

  function parseContext (context) {
    var staticContext = context.static;
    var dynamicContext = context.dynamic;
    var result = {};

    Object.keys(staticContext).forEach(function (name) {
      var value = staticContext[name];
      result[name] = createStaticDecl(function (env, scope) {
        if (typeof value === 'number' || typeof value === 'boolean') {
          return '' + value
        } else {
          return env.link(value)
        }
      });
    });

    Object.keys(dynamicContext).forEach(function (name) {
      var dyn = dynamicContext[name];
      result[name] = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    });

    return result
  }

  function parseArguments (options, attributes, uniforms, context, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;

    check$1.optional(function () {
      var KEY_NAMES = [
        S_FRAMEBUFFER,
        S_VERT,
        S_FRAG,
        S_ELEMENTS,
        S_PRIMITIVE,
        S_OFFSET,
        S_COUNT,
        S_INSTANCES,
        S_PROFILE,
        S_VAO
      ].concat(GL_STATE_NAMES);

      function checkKeys (dict) {
        Object.keys(dict).forEach(function (key) {
          check$1.command(
            KEY_NAMES.indexOf(key) >= 0,
            'unknown parameter "' + key + '"',
            env.commandStr);
        });
      }

      checkKeys(staticOptions);
      checkKeys(dynamicOptions);
    });

    var attribLocations = parseAttribLocations(options, attributes);

    var framebuffer = parseFramebuffer(options);
    var viewportAndScissor = parseViewportScissor(options, framebuffer, env);
    var draw = parseDraw(options, env);
    var state = parseGLState(options, env);
    var shader = parseProgram(options, env, attribLocations);

    function copyBox (name) {
      var defn = viewportAndScissor[name];
      if (defn) {
        state[name] = defn;
      }
    }
    copyBox(S_VIEWPORT);
    copyBox(propName(S_SCISSOR_BOX));

    var dirty = Object.keys(state).length > 0;

    var result = {
      framebuffer: framebuffer,
      draw: draw,
      shader: shader,
      state: state,
      dirty: dirty,
      scopeVAO: null,
      drawVAO: null,
      useVAO: false,
      attributes: {}
    };

    result.profile = parseProfile(options);
    result.uniforms = parseUniforms(uniforms, env);
    result.drawVAO = result.scopeVAO = parseVAO(options);
    // special case: check if we can statically allocate a vertex array object for this program
    if (!result.drawVAO && shader.program && !attribLocations && extensions.angle_instanced_arrays) {
      var useVAO = true;
      var staticBindings = shader.program.attributes.map(function (attr) {
        var binding = attributes.static[attr];
        useVAO = useVAO && !!binding;
        return binding
      });
      if (useVAO && staticBindings.length > 0) {
        var vao = attributeState.getVAO(attributeState.createVAO(staticBindings));
        result.drawVAO = new Declaration(null, null, null, function (env, scope) {
          return env.link(vao)
        });
        result.useVAO = true;
      }
    }
    if (attribLocations) {
      result.useVAO = true;
    } else {
      result.attributes = parseAttributes(attributes, env);
    }
    result.context = parseContext(context);
    return result
  }

  // ===================================================
  // ===================================================
  // COMMON UPDATE FUNCTIONS
  // ===================================================
  // ===================================================
  function emitContext (env, scope, context) {
    var shared = env.shared;
    var CONTEXT = shared.context;

    var contextEnter = env.scope();

    Object.keys(context).forEach(function (name) {
      scope.save(CONTEXT, '.' + name);
      var defn = context[name];
      var value = defn.append(env, scope);
      if (Array.isArray(value)) {
        contextEnter(CONTEXT, '.', name, '=[', value.join(), '];');
      } else {
        contextEnter(CONTEXT, '.', name, '=', value, ';');
      }
    });

    scope(contextEnter);
  }

  // ===================================================
  // ===================================================
  // COMMON DRAWING FUNCTIONS
  // ===================================================
  // ===================================================
  function emitPollFramebuffer (env, scope, framebuffer, skipCheck) {
    var shared = env.shared;

    var GL = shared.gl;
    var FRAMEBUFFER_STATE = shared.framebuffer;
    var EXT_DRAW_BUFFERS;
    if (extDrawBuffers) {
      EXT_DRAW_BUFFERS = scope.def(shared.extensions, '.webgl_draw_buffers');
    }

    var constants = env.constants;

    var DRAW_BUFFERS = constants.drawBuffer;
    var BACK_BUFFER = constants.backBuffer;

    var NEXT;
    if (framebuffer) {
      NEXT = framebuffer.append(env, scope);
    } else {
      NEXT = scope.def(FRAMEBUFFER_STATE, '.next');
    }

    if (!skipCheck) {
      scope('if(', NEXT, '!==', FRAMEBUFFER_STATE, '.cur){');
    }
    scope(
      'if(', NEXT, '){',
      GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',', NEXT, '.framebuffer);');
    if (extDrawBuffers) {
      scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(',
        DRAW_BUFFERS, '[', NEXT, '.colorAttachments.length]);');
    }
    scope('}else{',
      GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',null);');
    if (extDrawBuffers) {
      scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', BACK_BUFFER, ');');
    }
    scope(
      '}',
      FRAMEBUFFER_STATE, '.cur=', NEXT, ';');
    if (!skipCheck) {
      scope('}');
    }
  }

  function emitPollState (env, scope, args) {
    var shared = env.shared;

    var GL = shared.gl;

    var CURRENT_VARS = env.current;
    var NEXT_VARS = env.next;
    var CURRENT_STATE = shared.current;
    var NEXT_STATE = shared.next;

    var block = env.cond(CURRENT_STATE, '.dirty');

    GL_STATE_NAMES.forEach(function (prop) {
      var param = propName(prop);
      if (param in args.state) {
        return
      }

      var NEXT, CURRENT;
      if (param in NEXT_VARS) {
        NEXT = NEXT_VARS[param];
        CURRENT = CURRENT_VARS[param];
        var parts = loop(currentState[param].length, function (i) {
          return block.def(NEXT, '[', i, ']')
        });
        block(env.cond(parts.map(function (p, i) {
          return p + '!==' + CURRENT + '[' + i + ']'
        }).join('||'))
          .then(
            GL, '.', GL_VARIABLES[param], '(', parts, ');',
            parts.map(function (p, i) {
              return CURRENT + '[' + i + ']=' + p
            }).join(';'), ';'));
      } else {
        NEXT = block.def(NEXT_STATE, '.', param);
        var ifte = env.cond(NEXT, '!==', CURRENT_STATE, '.', param);
        block(ifte);
        if (param in GL_FLAGS) {
          ifte(
            env.cond(NEXT)
              .then(GL, '.enable(', GL_FLAGS[param], ');')
              .else(GL, '.disable(', GL_FLAGS[param], ');'),
            CURRENT_STATE, '.', param, '=', NEXT, ';');
        } else {
          ifte(
            GL, '.', GL_VARIABLES[param], '(', NEXT, ');',
            CURRENT_STATE, '.', param, '=', NEXT, ';');
        }
      }
    });
    if (Object.keys(args.state).length === 0) {
      block(CURRENT_STATE, '.dirty=false;');
    }
    scope(block);
  }

  function emitSetOptions (env, scope, options, filter) {
    var shared = env.shared;
    var CURRENT_VARS = env.current;
    var CURRENT_STATE = shared.current;
    var GL = shared.gl;
    sortState(Object.keys(options)).forEach(function (param) {
      var defn = options[param];
      if (filter && !filter(defn)) {
        return
      }
      var variable = defn.append(env, scope);
      if (GL_FLAGS[param]) {
        var flag = GL_FLAGS[param];
        if (isStatic(defn)) {
          if (variable) {
            scope(GL, '.enable(', flag, ');');
          } else {
            scope(GL, '.disable(', flag, ');');
          }
        } else {
          scope(env.cond(variable)
            .then(GL, '.enable(', flag, ');')
            .else(GL, '.disable(', flag, ');'));
        }
        scope(CURRENT_STATE, '.', param, '=', variable, ';');
      } else if (isArrayLike(variable)) {
        var CURRENT = CURRENT_VARS[param];
        scope(
          GL, '.', GL_VARIABLES[param], '(', variable, ');',
          variable.map(function (v, i) {
            return CURRENT + '[' + i + ']=' + v
          }).join(';'), ';');
      } else {
        scope(
          GL, '.', GL_VARIABLES[param], '(', variable, ');',
          CURRENT_STATE, '.', param, '=', variable, ';');
      }
    });
  }

  function injectExtensions (env, scope) {
    if (extInstancing) {
      env.instancing = scope.def(
        env.shared.extensions, '.angle_instanced_arrays');
    }
  }

  function emitProfile (env, scope, args, useScope, incrementCounter) {
    var shared = env.shared;
    var STATS = env.stats;
    var CURRENT_STATE = shared.current;
    var TIMER = shared.timer;
    var profileArg = args.profile;

    function perfCounter () {
      if (typeof performance === 'undefined') {
        return 'Date.now()'
      } else {
        return 'performance.now()'
      }
    }

    var CPU_START, QUERY_COUNTER;
    function emitProfileStart (block) {
      CPU_START = scope.def();
      block(CPU_START, '=', perfCounter(), ';');
      if (typeof incrementCounter === 'string') {
        block(STATS, '.count+=', incrementCounter, ';');
      } else {
        block(STATS, '.count++;');
      }
      if (timer) {
        if (useScope) {
          QUERY_COUNTER = scope.def();
          block(QUERY_COUNTER, '=', TIMER, '.getNumPendingQueries();');
        } else {
          block(TIMER, '.beginQuery(', STATS, ');');
        }
      }
    }

    function emitProfileEnd (block) {
      block(STATS, '.cpuTime+=', perfCounter(), '-', CPU_START, ';');
      if (timer) {
        if (useScope) {
          block(TIMER, '.pushScopeStats(',
            QUERY_COUNTER, ',',
            TIMER, '.getNumPendingQueries(),',
            STATS, ');');
        } else {
          block(TIMER, '.endQuery();');
        }
      }
    }

    function scopeProfile (value) {
      var prev = scope.def(CURRENT_STATE, '.profile');
      scope(CURRENT_STATE, '.profile=', value, ';');
      scope.exit(CURRENT_STATE, '.profile=', prev, ';');
    }

    var USE_PROFILE;
    if (profileArg) {
      if (isStatic(profileArg)) {
        if (profileArg.enable) {
          emitProfileStart(scope);
          emitProfileEnd(scope.exit);
          scopeProfile('true');
        } else {
          scopeProfile('false');
        }
        return
      }
      USE_PROFILE = profileArg.append(env, scope);
      scopeProfile(USE_PROFILE);
    } else {
      USE_PROFILE = scope.def(CURRENT_STATE, '.profile');
    }

    var start = env.block();
    emitProfileStart(start);
    scope('if(', USE_PROFILE, '){', start, '}');
    var end = env.block();
    emitProfileEnd(end);
    scope.exit('if(', USE_PROFILE, '){', end, '}');
  }

  function emitAttributes (env, scope, args, attributes, filter) {
    var shared = env.shared;

    function typeLength (x) {
      switch (x) {
        case GL_FLOAT_VEC2:
        case GL_INT_VEC2:
        case GL_BOOL_VEC2:
          return 2
        case GL_FLOAT_VEC3:
        case GL_INT_VEC3:
        case GL_BOOL_VEC3:
          return 3
        case GL_FLOAT_VEC4:
        case GL_INT_VEC4:
        case GL_BOOL_VEC4:
          return 4
        default:
          return 1
      }
    }

    function emitBindAttribute (ATTRIBUTE, size, record) {
      var GL = shared.gl;

      var LOCATION = scope.def(ATTRIBUTE, '.location');
      var BINDING = scope.def(shared.attributes, '[', LOCATION, ']');

      var STATE = record.state;
      var BUFFER = record.buffer;
      var CONST_COMPONENTS = [
        record.x,
        record.y,
        record.z,
        record.w
      ];

      var COMMON_KEYS = [
        'buffer',
        'normalized',
        'offset',
        'stride'
      ];

      function emitBuffer () {
        scope(
          'if(!', BINDING, '.buffer){',
          GL, '.enableVertexAttribArray(', LOCATION, ');}');

        var TYPE = record.type;
        var SIZE;
        if (!record.size) {
          SIZE = size;
        } else {
          SIZE = scope.def(record.size, '||', size);
        }

        scope('if(',
          BINDING, '.type!==', TYPE, '||',
          BINDING, '.size!==', SIZE, '||',
          COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '!==' + record[key]
          }).join('||'),
          '){',
          GL, '.bindBuffer(', GL_ARRAY_BUFFER$2, ',', BUFFER, '.buffer);',
          GL, '.vertexAttribPointer(', [
            LOCATION,
            SIZE,
            TYPE,
            record.normalized,
            record.stride,
            record.offset
          ], ');',
          BINDING, '.type=', TYPE, ';',
          BINDING, '.size=', SIZE, ';',
          COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '=' + record[key] + ';'
          }).join(''),
          '}');

        if (extInstancing) {
          var DIVISOR = record.divisor;
          scope(
            'if(', BINDING, '.divisor!==', DIVISOR, '){',
            env.instancing, '.vertexAttribDivisorANGLE(', [LOCATION, DIVISOR], ');',
            BINDING, '.divisor=', DIVISOR, ';}');
        }
      }

      function emitConstant () {
        scope(
          'if(', BINDING, '.buffer){',
          GL, '.disableVertexAttribArray(', LOCATION, ');',
          BINDING, '.buffer=null;',
          '}if(', CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '!==' + CONST_COMPONENTS[i]
          }).join('||'), '){',
          GL, '.vertexAttrib4f(', LOCATION, ',', CONST_COMPONENTS, ');',
          CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '=' + CONST_COMPONENTS[i] + ';'
          }).join(''),
          '}');
      }

      if (STATE === ATTRIB_STATE_POINTER) {
        emitBuffer();
      } else if (STATE === ATTRIB_STATE_CONSTANT) {
        emitConstant();
      } else {
        scope('if(', STATE, '===', ATTRIB_STATE_POINTER, '){');
        emitBuffer();
        scope('}else{');
        emitConstant();
        scope('}');
      }
    }

    attributes.forEach(function (attribute) {
      var name = attribute.name;
      var arg = args.attributes[name];
      var record;
      if (arg) {
        if (!filter(arg)) {
          return
        }
        record = arg.append(env, scope);
      } else {
        if (!filter(SCOPE_DECL)) {
          return
        }
        var scopeAttrib = env.scopeAttrib(name);
        check$1.optional(function () {
          env.assert(scope,
            scopeAttrib + '.state',
            'missing attribute ' + name);
        });
        record = {};
        Object.keys(new AttributeRecord()).forEach(function (key) {
          record[key] = scope.def(scopeAttrib, '.', key);
        });
      }
      emitBindAttribute(
        env.link(attribute), typeLength(attribute.info.type), record);
    });
  }

  function emitUniforms (env, scope, args, uniforms, filter) {
    var shared = env.shared;
    var GL = shared.gl;

    var infix;
    for (var i = 0; i < uniforms.length; ++i) {
      var uniform = uniforms[i];
      var name = uniform.name;
      var type = uniform.info.type;
      var arg = args.uniforms[name];
      var UNIFORM = env.link(uniform);
      var LOCATION = UNIFORM + '.location';

      var VALUE;
      if (arg) {
        if (!filter(arg)) {
          continue
        }
        if (isStatic(arg)) {
          var value = arg.value;
          check$1.command(
            value !== null && typeof value !== 'undefined',
            'missing uniform "' + name + '"', env.commandStr);
          if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
            check$1.command(
              typeof value === 'function' &&
              ((type === GL_SAMPLER_2D &&
                (value._reglType === 'texture2d' ||
                value._reglType === 'framebuffer')) ||
              (type === GL_SAMPLER_CUBE &&
                (value._reglType === 'textureCube' ||
                value._reglType === 'framebufferCube'))),
              'invalid texture for uniform ' + name, env.commandStr);
            var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
            scope(GL, '.uniform1i(', LOCATION, ',', TEX_VALUE + '.bind());');
            scope.exit(TEX_VALUE, '.unbind();');
          } else if (
            type === GL_FLOAT_MAT2 ||
            type === GL_FLOAT_MAT3 ||
            type === GL_FLOAT_MAT4) {
            check$1.optional(function () {
              check$1.command(isArrayLike(value),
                'invalid matrix for uniform ' + name, env.commandStr);
              check$1.command(
                (type === GL_FLOAT_MAT2 && value.length === 4) ||
                (type === GL_FLOAT_MAT3 && value.length === 9) ||
                (type === GL_FLOAT_MAT4 && value.length === 16),
                'invalid length for matrix uniform ' + name, env.commandStr);
            });
            var MAT_VALUE = env.global.def('new Float32Array([' +
              Array.prototype.slice.call(value) + '])');
            var dim = 2;
            if (type === GL_FLOAT_MAT3) {
              dim = 3;
            } else if (type === GL_FLOAT_MAT4) {
              dim = 4;
            }
            scope(
              GL, '.uniformMatrix', dim, 'fv(',
              LOCATION, ',false,', MAT_VALUE, ');');
          } else {
            switch (type) {
              case GL_FLOAT$8:
                check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                infix = '1f';
                break
              case GL_FLOAT_VEC2:
                check$1.command(
                  isArrayLike(value) && value.length === 2,
                  'uniform ' + name, env.commandStr);
                infix = '2f';
                break
              case GL_FLOAT_VEC3:
                check$1.command(
                  isArrayLike(value) && value.length === 3,
                  'uniform ' + name, env.commandStr);
                infix = '3f';
                break
              case GL_FLOAT_VEC4:
                check$1.command(
                  isArrayLike(value) && value.length === 4,
                  'uniform ' + name, env.commandStr);
                infix = '4f';
                break
              case GL_BOOL:
                check$1.commandType(value, 'boolean', 'uniform ' + name, env.commandStr);
                infix = '1i';
                break
              case GL_INT$3:
                check$1.commandType(value, 'number', 'uniform ' + name, env.commandStr);
                infix = '1i';
                break
              case GL_BOOL_VEC2:
                check$1.command(
                  isArrayLike(value) && value.length === 2,
                  'uniform ' + name, env.commandStr);
                infix = '2i';
                break
              case GL_INT_VEC2:
                check$1.command(
                  isArrayLike(value) && value.length === 2,
                  'uniform ' + name, env.commandStr);
                infix = '2i';
                break
              case GL_BOOL_VEC3:
                check$1.command(
                  isArrayLike(value) && value.length === 3,
                  'uniform ' + name, env.commandStr);
                infix = '3i';
                break
              case GL_INT_VEC3:
                check$1.command(
                  isArrayLike(value) && value.length === 3,
                  'uniform ' + name, env.commandStr);
                infix = '3i';
                break
              case GL_BOOL_VEC4:
                check$1.command(
                  isArrayLike(value) && value.length === 4,
                  'uniform ' + name, env.commandStr);
                infix = '4i';
                break
              case GL_INT_VEC4:
                check$1.command(
                  isArrayLike(value) && value.length === 4,
                  'uniform ' + name, env.commandStr);
                infix = '4i';
                break
            }
            scope(GL, '.uniform', infix, '(', LOCATION, ',',
              isArrayLike(value) ? Array.prototype.slice.call(value) : value,
              ');');
          }
          continue
        } else {
          VALUE = arg.append(env, scope);
        }
      } else {
        if (!filter(SCOPE_DECL)) {
          continue
        }
        VALUE = scope.def(shared.uniforms, '[', stringStore.id(name), ']');
      }

      if (type === GL_SAMPLER_2D) {
        check$1(!Array.isArray(VALUE), 'must specify a scalar prop for textures');
        scope(
          'if(', VALUE, '&&', VALUE, '._reglType==="framebuffer"){',
          VALUE, '=', VALUE, '.color[0];',
          '}');
      } else if (type === GL_SAMPLER_CUBE) {
        check$1(!Array.isArray(VALUE), 'must specify a scalar prop for cube maps');
        scope(
          'if(', VALUE, '&&', VALUE, '._reglType==="framebufferCube"){',
          VALUE, '=', VALUE, '.color[0];',
          '}');
      }

      // perform type validation
      check$1.optional(function () {
        function emitCheck (pred, message) {
          env.assert(scope, pred,
            'bad data or missing for uniform "' + name + '".  ' + message);
        }

        function checkType (type) {
          check$1(!Array.isArray(VALUE), 'must not specify an array type for uniform');
          emitCheck(
            'typeof ' + VALUE + '==="' + type + '"',
            'invalid type, expected ' + type);
        }

        function checkVector (n, type) {
          if (Array.isArray(VALUE)) {
            check$1(VALUE.length === n, 'must have length ' + n);
          } else {
            emitCheck(
              shared.isArrayLike + '(' + VALUE + ')&&' + VALUE + '.length===' + n,
              'invalid vector, should have length ' + n);
          }
        }

        function checkTexture (target) {
          check$1(!Array.isArray(VALUE), 'must not specify a value type');
          emitCheck(
            'typeof ' + VALUE + '==="function"&&' +
            VALUE + '._reglType==="texture' +
            (target === GL_TEXTURE_2D$3 ? '2d' : 'Cube') + '"',
            'invalid texture type');
        }

        switch (type) {
          case GL_INT$3:
            checkType('number');
            break
          case GL_INT_VEC2:
            checkVector(2);
            break
          case GL_INT_VEC3:
            checkVector(3);
            break
          case GL_INT_VEC4:
            checkVector(4);
            break
          case GL_FLOAT$8:
            checkType('number');
            break
          case GL_FLOAT_VEC2:
            checkVector(2);
            break
          case GL_FLOAT_VEC3:
            checkVector(3);
            break
          case GL_FLOAT_VEC4:
            checkVector(4);
            break
          case GL_BOOL:
            checkType('boolean');
            break
          case GL_BOOL_VEC2:
            checkVector(2);
            break
          case GL_BOOL_VEC3:
            checkVector(3);
            break
          case GL_BOOL_VEC4:
            checkVector(4);
            break
          case GL_FLOAT_MAT2:
            checkVector(4);
            break
          case GL_FLOAT_MAT3:
            checkVector(9);
            break
          case GL_FLOAT_MAT4:
            checkVector(16);
            break
          case GL_SAMPLER_2D:
            checkTexture(GL_TEXTURE_2D$3);
            break
          case GL_SAMPLER_CUBE:
            checkTexture(GL_TEXTURE_CUBE_MAP$2);
            break
        }
      });

      var unroll = 1;
      switch (type) {
        case GL_SAMPLER_2D:
        case GL_SAMPLER_CUBE:
          var TEX = scope.def(VALUE, '._texture');
          scope(GL, '.uniform1i(', LOCATION, ',', TEX, '.bind());');
          scope.exit(TEX, '.unbind();');
          continue

        case GL_INT$3:
        case GL_BOOL:
          infix = '1i';
          break

        case GL_INT_VEC2:
        case GL_BOOL_VEC2:
          infix = '2i';
          unroll = 2;
          break

        case GL_INT_VEC3:
        case GL_BOOL_VEC3:
          infix = '3i';
          unroll = 3;
          break

        case GL_INT_VEC4:
        case GL_BOOL_VEC4:
          infix = '4i';
          unroll = 4;
          break

        case GL_FLOAT$8:
          infix = '1f';
          break

        case GL_FLOAT_VEC2:
          infix = '2f';
          unroll = 2;
          break

        case GL_FLOAT_VEC3:
          infix = '3f';
          unroll = 3;
          break

        case GL_FLOAT_VEC4:
          infix = '4f';
          unroll = 4;
          break

        case GL_FLOAT_MAT2:
          infix = 'Matrix2fv';
          break

        case GL_FLOAT_MAT3:
          infix = 'Matrix3fv';
          break

        case GL_FLOAT_MAT4:
          infix = 'Matrix4fv';
          break
      }

      scope(GL, '.uniform', infix, '(', LOCATION, ',');
      if (infix.charAt(0) === 'M') {
        var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
        var STORAGE = env.global.def('new Float32Array(', matSize, ')');
        if (Array.isArray(VALUE)) {
          scope(
            'false,(',
            loop(matSize, function (i) {
              return STORAGE + '[' + i + ']=' + VALUE[i]
            }), ',', STORAGE, ')');
        } else {
          scope(
            'false,(Array.isArray(', VALUE, ')||', VALUE, ' instanceof Float32Array)?', VALUE, ':(',
            loop(matSize, function (i) {
              return STORAGE + '[' + i + ']=' + VALUE + '[' + i + ']'
            }), ',', STORAGE, ')');
        }
      } else if (unroll > 1) {
        scope(loop(unroll, function (i) {
          return Array.isArray(VALUE) ? VALUE[i] : VALUE + '[' + i + ']'
        }));
      } else {
        check$1(!Array.isArray(VALUE), 'uniform value must not be an array');
        scope(VALUE);
      }
      scope(');');
    }
  }

  function emitDraw (env, outer, inner, args) {
    var shared = env.shared;
    var GL = shared.gl;
    var DRAW_STATE = shared.draw;

    var drawOptions = args.draw;

    function emitElements () {
      var defn = drawOptions.elements;
      var ELEMENTS;
      var scope = outer;
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          scope = inner;
        }
        ELEMENTS = defn.append(env, scope);
      } else {
        ELEMENTS = scope.def(DRAW_STATE, '.', S_ELEMENTS);
      }
      if (ELEMENTS) {
        scope(
          'if(' + ELEMENTS + ')' +
          GL + '.bindBuffer(' + GL_ELEMENT_ARRAY_BUFFER$1 + ',' + ELEMENTS + '.buffer.buffer);');
      }
      return ELEMENTS
    }

    function emitCount () {
      var defn = drawOptions.count;
      var COUNT;
      var scope = outer;
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          scope = inner;
        }
        COUNT = defn.append(env, scope);
        check$1.optional(function () {
          if (defn.MISSING) {
            env.assert(outer, 'false', 'missing vertex count');
          }
          if (defn.DYNAMIC) {
            env.assert(scope, COUNT + '>=0', 'missing vertex count');
          }
        });
      } else {
        COUNT = scope.def(DRAW_STATE, '.', S_COUNT);
        check$1.optional(function () {
          env.assert(scope, COUNT + '>=0', 'missing vertex count');
        });
      }
      return COUNT
    }

    var ELEMENTS = emitElements();
    function emitValue (name) {
      var defn = drawOptions[name];
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          return defn.append(env, inner)
        } else {
          return defn.append(env, outer)
        }
      } else {
        return outer.def(DRAW_STATE, '.', name)
      }
    }

    var PRIMITIVE = emitValue(S_PRIMITIVE);
    var OFFSET = emitValue(S_OFFSET);

    var COUNT = emitCount();
    if (typeof COUNT === 'number') {
      if (COUNT === 0) {
        return
      }
    } else {
      inner('if(', COUNT, '){');
      inner.exit('}');
    }

    var INSTANCES, EXT_INSTANCING;
    if (extInstancing) {
      INSTANCES = emitValue(S_INSTANCES);
      EXT_INSTANCING = env.instancing;
    }

    var ELEMENT_TYPE = ELEMENTS + '.type';

    var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements);

    function emitInstancing () {
      function drawElements () {
        inner(EXT_INSTANCING, '.drawElementsInstancedANGLE(', [
          PRIMITIVE,
          COUNT,
          ELEMENT_TYPE,
          OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$8 + ')>>1)',
          INSTANCES
        ], ');');
      }

      function drawArrays () {
        inner(EXT_INSTANCING, '.drawArraysInstancedANGLE(',
          [PRIMITIVE, OFFSET, COUNT, INSTANCES], ');');
      }

      if (ELEMENTS) {
        if (!elementsStatic) {
          inner('if(', ELEMENTS, '){');
          drawElements();
          inner('}else{');
          drawArrays();
          inner('}');
        } else {
          drawElements();
        }
      } else {
        drawArrays();
      }
    }

    function emitRegular () {
      function drawElements () {
        inner(GL + '.drawElements(' + [
          PRIMITIVE,
          COUNT,
          ELEMENT_TYPE,
          OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$8 + ')>>1)'
        ] + ');');
      }

      function drawArrays () {
        inner(GL + '.drawArrays(' + [PRIMITIVE, OFFSET, COUNT] + ');');
      }

      if (ELEMENTS) {
        if (!elementsStatic) {
          inner('if(', ELEMENTS, '){');
          drawElements();
          inner('}else{');
          drawArrays();
          inner('}');
        } else {
          drawElements();
        }
      } else {
        drawArrays();
      }
    }

    if (extInstancing && (typeof INSTANCES !== 'number' || INSTANCES >= 0)) {
      if (typeof INSTANCES === 'string') {
        inner('if(', INSTANCES, '>0){');
        emitInstancing();
        inner('}else if(', INSTANCES, '<0){');
        emitRegular();
        inner('}');
      } else {
        emitInstancing();
      }
    } else {
      emitRegular();
    }
  }

  function createBody (emitBody, parentEnv, args, program, count) {
    var env = createREGLEnvironment();
    var scope = env.proc('body', count);
    check$1.optional(function () {
      env.commandStr = parentEnv.commandStr;
      env.command = env.link(parentEnv.commandStr);
    });
    if (extInstancing) {
      env.instancing = scope.def(
        env.shared.extensions, '.angle_instanced_arrays');
    }
    emitBody(env, scope, args, program);
    return env.compile().body
  }

  // ===================================================
  // ===================================================
  // DRAW PROC
  // ===================================================
  // ===================================================
  function emitDrawBody (env, draw, args, program) {
    injectExtensions(env, draw);
    if (args.useVAO) {
      if (args.drawVAO) {
        draw(env.shared.vao, '.setVAO(', args.drawVAO.append(env, draw), ');');
      } else {
        draw(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
      }
    } else {
      draw(env.shared.vao, '.setVAO(null);');
      emitAttributes(env, draw, args, program.attributes, function () {
        return true
      });
    }
    emitUniforms(env, draw, args, program.uniforms, function () {
      return true
    });
    emitDraw(env, draw, draw, args);
  }

  function emitDrawProc (env, args) {
    var draw = env.proc('draw', 1);

    injectExtensions(env, draw);

    emitContext(env, draw, args.context);
    emitPollFramebuffer(env, draw, args.framebuffer);

    emitPollState(env, draw, args);
    emitSetOptions(env, draw, args.state);

    emitProfile(env, draw, args, false, true);

    var program = args.shader.progVar.append(env, draw);
    draw(env.shared.gl, '.useProgram(', program, '.program);');

    if (args.shader.program) {
      emitDrawBody(env, draw, args, args.shader.program);
    } else {
      draw(env.shared.vao, '.setVAO(null);');
      var drawCache = env.global.def('{}');
      var PROG_ID = draw.def(program, '.id');
      var CACHED_PROC = draw.def(drawCache, '[', PROG_ID, ']');
      draw(
        env.cond(CACHED_PROC)
          .then(CACHED_PROC, '.call(this,a0);')
          .else(
            CACHED_PROC, '=', drawCache, '[', PROG_ID, ']=',
            env.link(function (program) {
              return createBody(emitDrawBody, env, args, program, 1)
            }), '(', program, ');',
            CACHED_PROC, '.call(this,a0);'));
    }

    if (Object.keys(args.state).length > 0) {
      draw(env.shared.current, '.dirty=true;');
    }
  }

  // ===================================================
  // ===================================================
  // BATCH PROC
  // ===================================================
  // ===================================================

  function emitBatchDynamicShaderBody (env, scope, args, program) {
    env.batchId = 'a1';

    injectExtensions(env, scope);

    function all () {
      return true
    }

    emitAttributes(env, scope, args, program.attributes, all);
    emitUniforms(env, scope, args, program.uniforms, all);
    emitDraw(env, scope, scope, args);
  }

  function emitBatchBody (env, scope, args, program) {
    injectExtensions(env, scope);

    var contextDynamic = args.contextDep;

    var BATCH_ID = scope.def();
    var PROP_LIST = 'a0';
    var NUM_PROPS = 'a1';
    var PROPS = scope.def();
    env.shared.props = PROPS;
    env.batchId = BATCH_ID;

    var outer = env.scope();
    var inner = env.scope();

    scope(
      outer.entry,
      'for(', BATCH_ID, '=0;', BATCH_ID, '<', NUM_PROPS, ';++', BATCH_ID, '){',
      PROPS, '=', PROP_LIST, '[', BATCH_ID, '];',
      inner,
      '}',
      outer.exit);

    function isInnerDefn (defn) {
      return ((defn.contextDep && contextDynamic) || defn.propDep)
    }

    function isOuterDefn (defn) {
      return !isInnerDefn(defn)
    }

    if (args.needsContext) {
      emitContext(env, inner, args.context);
    }
    if (args.needsFramebuffer) {
      emitPollFramebuffer(env, inner, args.framebuffer);
    }
    emitSetOptions(env, inner, args.state, isInnerDefn);

    if (args.profile && isInnerDefn(args.profile)) {
      emitProfile(env, inner, args, false, true);
    }

    if (!program) {
      var progCache = env.global.def('{}');
      var PROGRAM = args.shader.progVar.append(env, inner);
      var PROG_ID = inner.def(PROGRAM, '.id');
      var CACHED_PROC = inner.def(progCache, '[', PROG_ID, ']');
      inner(
        env.shared.gl, '.useProgram(', PROGRAM, '.program);',
        'if(!', CACHED_PROC, '){',
        CACHED_PROC, '=', progCache, '[', PROG_ID, ']=',
        env.link(function (program) {
          return createBody(
            emitBatchDynamicShaderBody, env, args, program, 2)
        }), '(', PROGRAM, ');}',
        CACHED_PROC, '.call(this,a0[', BATCH_ID, '],', BATCH_ID, ');');
    } else {
      if (args.useVAO) {
        if (args.drawVAO) {
          if (isInnerDefn(args.drawVAO)) {
            // vao is a prop
            inner(env.shared.vao, '.setVAO(', args.drawVAO.append(env, inner), ');');
          } else {
            // vao is invariant
            outer(env.shared.vao, '.setVAO(', args.drawVAO.append(env, outer), ');');
          }
        } else {
          // scoped vao binding
          outer(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
        }
      } else {
        outer(env.shared.vao, '.setVAO(null);');
        emitAttributes(env, outer, args, program.attributes, isOuterDefn);
        emitAttributes(env, inner, args, program.attributes, isInnerDefn);
      }
      emitUniforms(env, outer, args, program.uniforms, isOuterDefn);
      emitUniforms(env, inner, args, program.uniforms, isInnerDefn);
      emitDraw(env, outer, inner, args);
    }
  }

  function emitBatchProc (env, args) {
    var batch = env.proc('batch', 2);
    env.batchId = '0';

    injectExtensions(env, batch);

    // Check if any context variables depend on props
    var contextDynamic = false;
    var needsContext = true;
    Object.keys(args.context).forEach(function (name) {
      contextDynamic = contextDynamic || args.context[name].propDep;
    });
    if (!contextDynamic) {
      emitContext(env, batch, args.context);
      needsContext = false;
    }

    // framebuffer state affects framebufferWidth/height context vars
    var framebuffer = args.framebuffer;
    var needsFramebuffer = false;
    if (framebuffer) {
      if (framebuffer.propDep) {
        contextDynamic = needsFramebuffer = true;
      } else if (framebuffer.contextDep && contextDynamic) {
        needsFramebuffer = true;
      }
      if (!needsFramebuffer) {
        emitPollFramebuffer(env, batch, framebuffer);
      }
    } else {
      emitPollFramebuffer(env, batch, null);
    }

    // viewport is weird because it can affect context vars
    if (args.state.viewport && args.state.viewport.propDep) {
      contextDynamic = true;
    }

    function isInnerDefn (defn) {
      return (defn.contextDep && contextDynamic) || defn.propDep
    }

    // set webgl options
    emitPollState(env, batch, args);
    emitSetOptions(env, batch, args.state, function (defn) {
      return !isInnerDefn(defn)
    });

    if (!args.profile || !isInnerDefn(args.profile)) {
      emitProfile(env, batch, args, false, 'a1');
    }

    // Save these values to args so that the batch body routine can use them
    args.contextDep = contextDynamic;
    args.needsContext = needsContext;
    args.needsFramebuffer = needsFramebuffer;

    // determine if shader is dynamic
    var progDefn = args.shader.progVar;
    if ((progDefn.contextDep && contextDynamic) || progDefn.propDep) {
      emitBatchBody(
        env,
        batch,
        args,
        null);
    } else {
      var PROGRAM = progDefn.append(env, batch);
      batch(env.shared.gl, '.useProgram(', PROGRAM, '.program);');
      if (args.shader.program) {
        emitBatchBody(
          env,
          batch,
          args,
          args.shader.program);
      } else {
        batch(env.shared.vao, '.setVAO(null);');
        var batchCache = env.global.def('{}');
        var PROG_ID = batch.def(PROGRAM, '.id');
        var CACHED_PROC = batch.def(batchCache, '[', PROG_ID, ']');
        batch(
          env.cond(CACHED_PROC)
            .then(CACHED_PROC, '.call(this,a0,a1);')
            .else(
              CACHED_PROC, '=', batchCache, '[', PROG_ID, ']=',
              env.link(function (program) {
                return createBody(emitBatchBody, env, args, program, 2)
              }), '(', PROGRAM, ');',
              CACHED_PROC, '.call(this,a0,a1);'));
      }
    }

    if (Object.keys(args.state).length > 0) {
      batch(env.shared.current, '.dirty=true;');
    }
  }

  // ===================================================
  // ===================================================
  // SCOPE COMMAND
  // ===================================================
  // ===================================================
  function emitScopeProc (env, args) {
    var scope = env.proc('scope', 3);
    env.batchId = 'a2';

    var shared = env.shared;
    var CURRENT_STATE = shared.current;

    emitContext(env, scope, args.context);

    if (args.framebuffer) {
      args.framebuffer.append(env, scope);
    }

    sortState(Object.keys(args.state)).forEach(function (name) {
      var defn = args.state[name];
      var value = defn.append(env, scope);
      if (isArrayLike(value)) {
        value.forEach(function (v, i) {
          scope.set(env.next[name], '[' + i + ']', v);
        });
      } else {
        scope.set(shared.next, '.' + name, value);
      }
    });

    emitProfile(env, scope, args, true, true)

    ;[S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(
      function (opt) {
        var variable = args.draw[opt];
        if (!variable) {
          return
        }
        scope.set(shared.draw, '.' + opt, '' + variable.append(env, scope));
      });

    Object.keys(args.uniforms).forEach(function (opt) {
      var value = args.uniforms[opt].append(env, scope);
      if (Array.isArray(value)) {
        value = '[' + value.join() + ']';
      }
      scope.set(
        shared.uniforms,
        '[' + stringStore.id(opt) + ']',
        value);
    });

    Object.keys(args.attributes).forEach(function (name) {
      var record = args.attributes[name].append(env, scope);
      var scopeAttrib = env.scopeAttrib(name);
      Object.keys(new AttributeRecord()).forEach(function (prop) {
        scope.set(scopeAttrib, '.' + prop, record[prop]);
      });
    });

    if (args.scopeVAO) {
      scope.set(shared.vao, '.targetVAO', args.scopeVAO.append(env, scope));
    }

    function saveShader (name) {
      var shader = args.shader[name];
      if (shader) {
        scope.set(shared.shader, '.' + name, shader.append(env, scope));
      }
    }
    saveShader(S_VERT);
    saveShader(S_FRAG);

    if (Object.keys(args.state).length > 0) {
      scope(CURRENT_STATE, '.dirty=true;');
      scope.exit(CURRENT_STATE, '.dirty=true;');
    }

    scope('a1(', env.shared.context, ',a0,', env.batchId, ');');
  }

  function isDynamicObject (object) {
    if (typeof object !== 'object' || isArrayLike(object)) {
      return
    }
    var props = Object.keys(object);
    for (var i = 0; i < props.length; ++i) {
      if (dynamic.isDynamic(object[props[i]])) {
        return true
      }
    }
    return false
  }

  function splatObject (env, options, name) {
    var object = options.static[name];
    if (!object || !isDynamicObject(object)) {
      return
    }

    var globals = env.global;
    var keys = Object.keys(object);
    var thisDep = false;
    var contextDep = false;
    var propDep = false;
    var objectRef = env.global.def('{}');
    keys.forEach(function (key) {
      var value = object[key];
      if (dynamic.isDynamic(value)) {
        if (typeof value === 'function') {
          value = object[key] = dynamic.unbox(value);
        }
        var deps = createDynamicDecl(value, null);
        thisDep = thisDep || deps.thisDep;
        propDep = propDep || deps.propDep;
        contextDep = contextDep || deps.contextDep;
      } else {
        globals(objectRef, '.', key, '=');
        switch (typeof value) {
          case 'number':
            globals(value);
            break
          case 'string':
            globals('"', value, '"');
            break
          case 'object':
            if (Array.isArray(value)) {
              globals('[', value.join(), ']');
            }
            break
          default:
            globals(env.link(value));
            break
        }
        globals(';');
      }
    });

    function appendBlock (env, block) {
      keys.forEach(function (key) {
        var value = object[key];
        if (!dynamic.isDynamic(value)) {
          return
        }
        var ref = env.invoke(block, value);
        block(objectRef, '.', key, '=', ref, ';');
      });
    }

    options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
      thisDep: thisDep,
      contextDep: contextDep,
      propDep: propDep,
      ref: objectRef,
      append: appendBlock
    });
    delete options.static[name];
  }

  // ===========================================================================
  // ===========================================================================
  // MAIN DRAW COMMAND
  // ===========================================================================
  // ===========================================================================
  function compileCommand (options, attributes, uniforms, context, stats) {
    var env = createREGLEnvironment();

    // link stats, so that we can easily access it in the program.
    env.stats = env.link(stats);

    // splat options and attributes to allow for dynamic nested properties
    Object.keys(attributes.static).forEach(function (key) {
      splatObject(env, attributes, key);
    });
    NESTED_OPTIONS.forEach(function (name) {
      splatObject(env, options, name);
    });

    var args = parseArguments(options, attributes, uniforms, context, env);

    emitDrawProc(env, args);
    emitScopeProc(env, args);
    emitBatchProc(env, args);

    return extend(env.compile(), {
      destroy: function () {
        args.shader.program.destroy();
      }
    })
  }

  // ===========================================================================
  // ===========================================================================
  // POLL / REFRESH
  // ===========================================================================
  // ===========================================================================
  return {
    next: nextState,
    current: currentState,
    procs: (function () {
      var env = createREGLEnvironment();
      var poll = env.proc('poll');
      var refresh = env.proc('refresh');
      var common = env.block();
      poll(common);
      refresh(common);

      var shared = env.shared;
      var GL = shared.gl;
      var NEXT_STATE = shared.next;
      var CURRENT_STATE = shared.current;

      common(CURRENT_STATE, '.dirty=false;');

      emitPollFramebuffer(env, poll);
      emitPollFramebuffer(env, refresh, null, true);

      // Refresh updates all attribute state changes
      var INSTANCING;
      if (extInstancing) {
        INSTANCING = env.link(extInstancing);
      }

      // update vertex array bindings
      if (extensions.oes_vertex_array_object) {
        refresh(env.link(extensions.oes_vertex_array_object), '.bindVertexArrayOES(null);');
      }
      for (var i = 0; i < limits.maxAttributes; ++i) {
        var BINDING = refresh.def(shared.attributes, '[', i, ']');
        var ifte = env.cond(BINDING, '.buffer');
        ifte.then(
          GL, '.enableVertexAttribArray(', i, ');',
          GL, '.bindBuffer(',
          GL_ARRAY_BUFFER$2, ',',
          BINDING, '.buffer.buffer);',
          GL, '.vertexAttribPointer(',
          i, ',',
          BINDING, '.size,',
          BINDING, '.type,',
          BINDING, '.normalized,',
          BINDING, '.stride,',
          BINDING, '.offset);'
        ).else(
          GL, '.disableVertexAttribArray(', i, ');',
          GL, '.vertexAttrib4f(',
          i, ',',
          BINDING, '.x,',
          BINDING, '.y,',
          BINDING, '.z,',
          BINDING, '.w);',
          BINDING, '.buffer=null;');
        refresh(ifte);
        if (extInstancing) {
          refresh(
            INSTANCING, '.vertexAttribDivisorANGLE(',
            i, ',',
            BINDING, '.divisor);');
        }
      }
      refresh(
        env.shared.vao, '.currentVAO=null;',
        env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');

      Object.keys(GL_FLAGS).forEach(function (flag) {
        var cap = GL_FLAGS[flag];
        var NEXT = common.def(NEXT_STATE, '.', flag);
        var block = env.block();
        block('if(', NEXT, '){',
          GL, '.enable(', cap, ')}else{',
          GL, '.disable(', cap, ')}',
          CURRENT_STATE, '.', flag, '=', NEXT, ';');
        refresh(block);
        poll(
          'if(', NEXT, '!==', CURRENT_STATE, '.', flag, '){',
          block,
          '}');
      });

      Object.keys(GL_VARIABLES).forEach(function (name) {
        var func = GL_VARIABLES[name];
        var init = currentState[name];
        var NEXT, CURRENT;
        var block = env.block();
        block(GL, '.', func, '(');
        if (isArrayLike(init)) {
          var n = init.length;
          NEXT = env.global.def(NEXT_STATE, '.', name);
          CURRENT = env.global.def(CURRENT_STATE, '.', name);
          block(
            loop(n, function (i) {
              return NEXT + '[' + i + ']'
            }), ');',
            loop(n, function (i) {
              return CURRENT + '[' + i + ']=' + NEXT + '[' + i + '];'
            }).join(''));
          poll(
            'if(', loop(n, function (i) {
              return NEXT + '[' + i + ']!==' + CURRENT + '[' + i + ']'
            }).join('||'), '){',
            block,
            '}');
        } else {
          NEXT = common.def(NEXT_STATE, '.', name);
          CURRENT = common.def(CURRENT_STATE, '.', name);
          block(
            NEXT, ');',
            CURRENT_STATE, '.', name, '=', NEXT, ';');
          poll(
            'if(', NEXT, '!==', CURRENT, '){',
            block,
            '}');
        }
        refresh(block);
      });

      return env.compile()
    })(),
    compile: compileCommand
  }
}

function stats () {
  return {
    vaoCount: 0,
    bufferCount: 0,
    elementsCount: 0,
    framebufferCount: 0,
    shaderCount: 0,
    textureCount: 0,
    cubeCount: 0,
    renderbufferCount: 0,
    maxTextureUnits: 0
  }
}

var GL_QUERY_RESULT_EXT = 0x8866;
var GL_QUERY_RESULT_AVAILABLE_EXT = 0x8867;
var GL_TIME_ELAPSED_EXT = 0x88BF;

var createTimer = function (gl, extensions) {
  if (!extensions.ext_disjoint_timer_query) {
    return null
  }

  // QUERY POOL BEGIN
  var queryPool = [];
  function allocQuery () {
    return queryPool.pop() || extensions.ext_disjoint_timer_query.createQueryEXT()
  }
  function freeQuery (query) {
    queryPool.push(query);
  }
  // QUERY POOL END

  var pendingQueries = [];
  function beginQuery (stats) {
    var query = allocQuery();
    extensions.ext_disjoint_timer_query.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
    pendingQueries.push(query);
    pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats);
  }

  function endQuery () {
    extensions.ext_disjoint_timer_query.endQueryEXT(GL_TIME_ELAPSED_EXT);
  }

  //
  // Pending stats pool.
  //
  function PendingStats () {
    this.startQueryIndex = -1;
    this.endQueryIndex = -1;
    this.sum = 0;
    this.stats = null;
  }
  var pendingStatsPool = [];
  function allocPendingStats () {
    return pendingStatsPool.pop() || new PendingStats()
  }
  function freePendingStats (pendingStats) {
    pendingStatsPool.push(pendingStats);
  }
  // Pending stats pool end

  var pendingStats = [];
  function pushScopeStats (start, end, stats) {
    var ps = allocPendingStats();
    ps.startQueryIndex = start;
    ps.endQueryIndex = end;
    ps.sum = 0;
    ps.stats = stats;
    pendingStats.push(ps);
  }

  // we should call this at the beginning of the frame,
  // in order to update gpuTime
  var timeSum = [];
  var queryPtr = [];
  function update () {
    var ptr, i;

    var n = pendingQueries.length;
    if (n === 0) {
      return
    }

    // Reserve space
    queryPtr.length = Math.max(queryPtr.length, n + 1);
    timeSum.length = Math.max(timeSum.length, n + 1);
    timeSum[0] = 0;
    queryPtr[0] = 0;

    // Update all pending timer queries
    var queryTime = 0;
    ptr = 0;
    for (i = 0; i < pendingQueries.length; ++i) {
      var query = pendingQueries[i];
      if (extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_AVAILABLE_EXT)) {
        queryTime += extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_EXT);
        freeQuery(query);
      } else {
        pendingQueries[ptr++] = query;
      }
      timeSum[i + 1] = queryTime;
      queryPtr[i + 1] = ptr;
    }
    pendingQueries.length = ptr;

    // Update all pending stat queries
    ptr = 0;
    for (i = 0; i < pendingStats.length; ++i) {
      var stats = pendingStats[i];
      var start = stats.startQueryIndex;
      var end = stats.endQueryIndex;
      stats.sum += timeSum[end] - timeSum[start];
      var startPtr = queryPtr[start];
      var endPtr = queryPtr[end];
      if (endPtr === startPtr) {
        stats.stats.gpuTime += stats.sum / 1e6;
        freePendingStats(stats);
      } else {
        stats.startQueryIndex = startPtr;
        stats.endQueryIndex = endPtr;
        pendingStats[ptr++] = stats;
      }
    }
    pendingStats.length = ptr;
  }

  return {
    beginQuery: beginQuery,
    endQuery: endQuery,
    pushScopeStats: pushScopeStats,
    update: update,
    getNumPendingQueries: function () {
      return pendingQueries.length
    },
    clear: function () {
      queryPool.push.apply(queryPool, pendingQueries);
      for (var i = 0; i < queryPool.length; i++) {
        extensions.ext_disjoint_timer_query.deleteQueryEXT(queryPool[i]);
      }
      pendingQueries.length = 0;
      queryPool.length = 0;
    },
    restore: function () {
      pendingQueries.length = 0;
      queryPool.length = 0;
    }
  }
};

var GL_COLOR_BUFFER_BIT = 16384;
var GL_DEPTH_BUFFER_BIT = 256;
var GL_STENCIL_BUFFER_BIT = 1024;

var GL_ARRAY_BUFFER = 34962;

var CONTEXT_LOST_EVENT = 'webglcontextlost';
var CONTEXT_RESTORED_EVENT = 'webglcontextrestored';

var DYN_PROP = 1;
var DYN_CONTEXT = 2;
var DYN_STATE = 3;

function find (haystack, needle) {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) {
      return i
    }
  }
  return -1
}

function wrapREGL (args) {
  var config = parseArgs(args);
  if (!config) {
    return null
  }

  var gl = config.gl;
  var glAttributes = gl.getContextAttributes();
  var contextLost = gl.isContextLost();

  var extensionState = createExtensionCache(gl, config);
  if (!extensionState) {
    return null
  }

  var stringStore = createStringStore();
  var stats$$1 = stats();
  var extensions = extensionState.extensions;
  var timer = createTimer(gl, extensions);

  var START_TIME = clock();
  var WIDTH = gl.drawingBufferWidth;
  var HEIGHT = gl.drawingBufferHeight;

  var contextState = {
    tick: 0,
    time: 0,
    viewportWidth: WIDTH,
    viewportHeight: HEIGHT,
    framebufferWidth: WIDTH,
    framebufferHeight: HEIGHT,
    drawingBufferWidth: WIDTH,
    drawingBufferHeight: HEIGHT,
    pixelRatio: config.pixelRatio
  };
  var uniformState = {};
  var drawState = {
    elements: null,
    primitive: 4, // GL_TRIANGLES
    count: -1,
    offset: 0,
    instances: -1
  };

  var limits = wrapLimits(gl, extensions);
  var bufferState = wrapBufferState(
    gl,
    stats$$1,
    config,
    destroyBuffer);
  var attributeState = wrapAttributeState(
    gl,
    extensions,
    limits,
    stats$$1,
    bufferState);
  function destroyBuffer (buffer) {
    return attributeState.destroyBuffer(buffer)
  }
  var elementState = wrapElementsState(gl, extensions, bufferState, stats$$1);
  var shaderState = wrapShaderState(gl, stringStore, stats$$1, config);
  var textureState = createTextureSet(
    gl,
    extensions,
    limits,
    function () { core.procs.poll(); },
    contextState,
    stats$$1,
    config);
  var renderbufferState = wrapRenderbuffers(gl, extensions, limits, stats$$1, config);
  var framebufferState = wrapFBOState(
    gl,
    extensions,
    limits,
    textureState,
    renderbufferState,
    stats$$1);
  var core = reglCore(
    gl,
    stringStore,
    extensions,
    limits,
    bufferState,
    elementState,
    textureState,
    framebufferState,
    uniformState,
    attributeState,
    shaderState,
    drawState,
    contextState,
    timer,
    config);
  var readPixels = wrapReadPixels(
    gl,
    framebufferState,
    core.procs.poll,
    contextState,
    glAttributes, extensions, limits);

  var nextState = core.next;
  var canvas = gl.canvas;

  var rafCallbacks = [];
  var lossCallbacks = [];
  var restoreCallbacks = [];
  var destroyCallbacks = [config.onDestroy];

  var activeRAF = null;
  function handleRAF () {
    if (rafCallbacks.length === 0) {
      if (timer) {
        timer.update();
      }
      activeRAF = null;
      return
    }

    // schedule next animation frame
    activeRAF = raf.next(handleRAF);

    // poll for changes
    poll();

    // fire a callback for all pending rafs
    for (var i = rafCallbacks.length - 1; i >= 0; --i) {
      var cb = rafCallbacks[i];
      if (cb) {
        cb(contextState, null, 0);
      }
    }

    // flush all pending webgl calls
    gl.flush();

    // poll GPU timers *after* gl.flush so we don't delay command dispatch
    if (timer) {
      timer.update();
    }
  }

  function startRAF () {
    if (!activeRAF && rafCallbacks.length > 0) {
      activeRAF = raf.next(handleRAF);
    }
  }

  function stopRAF () {
    if (activeRAF) {
      raf.cancel(handleRAF);
      activeRAF = null;
    }
  }

  function handleContextLoss (event) {
    event.preventDefault();

    // set context lost flag
    contextLost = true;

    // pause request animation frame
    stopRAF();

    // lose context
    lossCallbacks.forEach(function (cb) {
      cb();
    });
  }

  function handleContextRestored (event) {
    // clear error code
    gl.getError();

    // clear context lost flag
    contextLost = false;

    // refresh state
    extensionState.restore();
    shaderState.restore();
    bufferState.restore();
    textureState.restore();
    renderbufferState.restore();
    framebufferState.restore();
    attributeState.restore();
    if (timer) {
      timer.restore();
    }

    // refresh state
    core.procs.refresh();

    // restart RAF
    startRAF();

    // restore context
    restoreCallbacks.forEach(function (cb) {
      cb();
    });
  }

  if (canvas) {
    canvas.addEventListener(CONTEXT_LOST_EVENT, handleContextLoss, false);
    canvas.addEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored, false);
  }

  function destroy () {
    rafCallbacks.length = 0;
    stopRAF();

    if (canvas) {
      canvas.removeEventListener(CONTEXT_LOST_EVENT, handleContextLoss);
      canvas.removeEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored);
    }

    shaderState.clear();
    framebufferState.clear();
    renderbufferState.clear();
    textureState.clear();
    elementState.clear();
    bufferState.clear();
    attributeState.clear();

    if (timer) {
      timer.clear();
    }

    destroyCallbacks.forEach(function (cb) {
      cb();
    });
  }

  function compileProcedure (options) {
    check$1(!!options, 'invalid args to regl({...})');
    check$1.type(options, 'object', 'invalid args to regl({...})');

    function flattenNestedOptions (options) {
      var result = extend({}, options);
      delete result.uniforms;
      delete result.attributes;
      delete result.context;
      delete result.vao;

      if ('stencil' in result && result.stencil.op) {
        result.stencil.opBack = result.stencil.opFront = result.stencil.op;
        delete result.stencil.op;
      }

      function merge (name) {
        if (name in result) {
          var child = result[name];
          delete result[name];
          Object.keys(child).forEach(function (prop) {
            result[name + '.' + prop] = child[prop];
          });
        }
      }
      merge('blend');
      merge('depth');
      merge('cull');
      merge('stencil');
      merge('polygonOffset');
      merge('scissor');
      merge('sample');

      if ('vao' in options) {
        result.vao = options.vao;
      }

      return result
    }

    function separateDynamic (object, useArrays) {
      var staticItems = {};
      var dynamicItems = {};
      Object.keys(object).forEach(function (option) {
        var value = object[option];
        if (dynamic.isDynamic(value)) {
          dynamicItems[option] = dynamic.unbox(value, option);
          return
        } else if (useArrays && Array.isArray(value)) {
          for (var i = 0; i < value.length; ++i) {
            if (dynamic.isDynamic(value[i])) {
              dynamicItems[option] = dynamic.unbox(value, option);
              return
            }
          }
        }
        staticItems[option] = value;
      });
      return {
        dynamic: dynamicItems,
        static: staticItems
      }
    }

    // Treat context variables separate from other dynamic variables
    var context = separateDynamic(options.context || {}, true);
    var uniforms = separateDynamic(options.uniforms || {}, true);
    var attributes = separateDynamic(options.attributes || {}, false);
    var opts = separateDynamic(flattenNestedOptions(options), false);

    var stats$$1 = {
      gpuTime: 0.0,
      cpuTime: 0.0,
      count: 0
    };

    var compiled = core.compile(opts, attributes, uniforms, context, stats$$1);

    var draw = compiled.draw;
    var batch = compiled.batch;
    var scope = compiled.scope;

    // FIXME: we should modify code generation for batch commands so this
    // isn't necessary
    var EMPTY_ARRAY = [];
    function reserve (count) {
      while (EMPTY_ARRAY.length < count) {
        EMPTY_ARRAY.push(null);
      }
      return EMPTY_ARRAY
    }

    function REGLCommand (args, body) {
      var i;
      if (contextLost) {
        check$1.raise('context lost');
      }
      if (typeof args === 'function') {
        return scope.call(this, null, args, 0)
      } else if (typeof body === 'function') {
        if (typeof args === 'number') {
          for (i = 0; i < args; ++i) {
            scope.call(this, null, body, i);
          }
        } else if (Array.isArray(args)) {
          for (i = 0; i < args.length; ++i) {
            scope.call(this, args[i], body, i);
          }
        } else {
          return scope.call(this, args, body, 0)
        }
      } else if (typeof args === 'number') {
        if (args > 0) {
          return batch.call(this, reserve(args | 0), args | 0)
        }
      } else if (Array.isArray(args)) {
        if (args.length) {
          return batch.call(this, args, args.length)
        }
      } else {
        return draw.call(this, args)
      }
    }

    return extend(REGLCommand, {
      stats: stats$$1,
      destroy: function () {
        compiled.destroy();
      }
    })
  }

  var setFBO = framebufferState.setFBO = compileProcedure({
    framebuffer: dynamic.define.call(null, DYN_PROP, 'framebuffer')
  });

  function clearImpl (_, options) {
    var clearFlags = 0;
    core.procs.poll();

    var c = options.color;
    if (c) {
      gl.clearColor(+c[0] || 0, +c[1] || 0, +c[2] || 0, +c[3] || 0);
      clearFlags |= GL_COLOR_BUFFER_BIT;
    }
    if ('depth' in options) {
      gl.clearDepth(+options.depth);
      clearFlags |= GL_DEPTH_BUFFER_BIT;
    }
    if ('stencil' in options) {
      gl.clearStencil(options.stencil | 0);
      clearFlags |= GL_STENCIL_BUFFER_BIT;
    }

    check$1(!!clearFlags, 'called regl.clear with no buffer specified');
    gl.clear(clearFlags);
  }

  function clear (options) {
    check$1(
      typeof options === 'object' && options,
      'regl.clear() takes an object as input');
    if ('framebuffer' in options) {
      if (options.framebuffer &&
          options.framebuffer_reglType === 'framebufferCube') {
        for (var i = 0; i < 6; ++i) {
          setFBO(extend({
            framebuffer: options.framebuffer.faces[i]
          }, options), clearImpl);
        }
      } else {
        setFBO(options, clearImpl);
      }
    } else {
      clearImpl(null, options);
    }
  }

  function frame (cb) {
    check$1.type(cb, 'function', 'regl.frame() callback must be a function');
    rafCallbacks.push(cb);

    function cancel () {
      // FIXME:  should we check something other than equals cb here?
      // what if a user calls frame twice with the same callback...
      //
      var i = find(rafCallbacks, cb);
      check$1(i >= 0, 'cannot cancel a frame twice');
      function pendingCancel () {
        var index = find(rafCallbacks, pendingCancel);
        rafCallbacks[index] = rafCallbacks[rafCallbacks.length - 1];
        rafCallbacks.length -= 1;
        if (rafCallbacks.length <= 0) {
          stopRAF();
        }
      }
      rafCallbacks[i] = pendingCancel;
    }

    startRAF();

    return {
      cancel: cancel
    }
  }

  // poll viewport
  function pollViewport () {
    var viewport = nextState.viewport;
    var scissorBox = nextState.scissor_box;
    viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
    contextState.viewportWidth =
      contextState.framebufferWidth =
      contextState.drawingBufferWidth =
      viewport[2] =
      scissorBox[2] = gl.drawingBufferWidth;
    contextState.viewportHeight =
      contextState.framebufferHeight =
      contextState.drawingBufferHeight =
      viewport[3] =
      scissorBox[3] = gl.drawingBufferHeight;
  }

  function poll () {
    contextState.tick += 1;
    contextState.time = now();
    pollViewport();
    core.procs.poll();
  }

  function refresh () {
    textureState.refresh();
    pollViewport();
    core.procs.refresh();
    if (timer) {
      timer.update();
    }
  }

  function now () {
    return (clock() - START_TIME) / 1000.0
  }

  refresh();

  function addListener (event, callback) {
    check$1.type(callback, 'function', 'listener callback must be a function');

    var callbacks;
    switch (event) {
      case 'frame':
        return frame(callback)
      case 'lost':
        callbacks = lossCallbacks;
        break
      case 'restore':
        callbacks = restoreCallbacks;
        break
      case 'destroy':
        callbacks = destroyCallbacks;
        break
      default:
        check$1.raise('invalid event, must be one of frame,lost,restore,destroy');
    }

    callbacks.push(callback);
    return {
      cancel: function () {
        for (var i = 0; i < callbacks.length; ++i) {
          if (callbacks[i] === callback) {
            callbacks[i] = callbacks[callbacks.length - 1];
            callbacks.pop();
            return
          }
        }
      }
    }
  }

  var regl = extend(compileProcedure, {
    // Clear current FBO
    clear: clear,

    // Short cuts for dynamic variables
    prop: dynamic.define.bind(null, DYN_PROP),
    context: dynamic.define.bind(null, DYN_CONTEXT),
    this: dynamic.define.bind(null, DYN_STATE),

    // executes an empty draw command
    draw: compileProcedure({}),

    // Resources
    buffer: function (options) {
      return bufferState.create(options, GL_ARRAY_BUFFER, false, false)
    },
    elements: function (options) {
      return elementState.create(options, false)
    },
    texture: textureState.create2D,
    cube: textureState.createCube,
    renderbuffer: renderbufferState.create,
    framebuffer: framebufferState.create,
    framebufferCube: framebufferState.createCube,
    vao: attributeState.createVAO,

    // Expose context attributes
    attributes: glAttributes,

    // Frame rendering
    frame: frame,
    on: addListener,

    // System limits
    limits: limits,
    hasExtension: function (name) {
      return limits.extensions.indexOf(name.toLowerCase()) >= 0
    },

    // Read pixels
    read: readPixels,

    // Destroy regl and all associated resources
    destroy: destroy,

    // Direct GL state manipulation
    _gl: gl,
    _refresh: refresh,

    poll: function () {
      poll();
      if (timer) {
        timer.update();
      }
    },

    // Current time
    now: now,

    // regl Statistics Information
    stats: stats$$1
  });

  config.onDone(null, regl);

  return regl
}

return wrapREGL;

})));
//# sourceMappingURL=regl.js.map
});

var _primitiveMap, _usageMap, _dataTypeMap, _formatMap, _mipmapMap, _filterMap, _wrapModeMap, _colorSpaceMap, _depthFuncMap, _blendEquationMap, _blendFuncMap, _stencilFuncMap, _stencilOpMap, _cullFaceMap;
// @see https://github.com/regl-project/regl/blob/gh-pages/lib/constants/primitives.json
(_primitiveMap = {}, _defineProperty(_primitiveMap, gl.POINTS, 'points'), _defineProperty(_primitiveMap, gl.LINES, 'lines'), _defineProperty(_primitiveMap, gl.LINE_LOOP, 'line loop'), _defineProperty(_primitiveMap, gl.LINE_STRIP, 'line strip'), _defineProperty(_primitiveMap, gl.TRIANGLES, 'triangles'), _defineProperty(_primitiveMap, gl.TRIANGLE_FAN, 'triangle fan'), _defineProperty(_primitiveMap, gl.TRIANGLE_STRIP, 'triangle strip'), _primitiveMap);
(_usageMap = {}, _defineProperty(_usageMap, gl.STATIC_DRAW, 'static'), _defineProperty(_usageMap, gl.DYNAMIC_DRAW, 'dynamic'), _defineProperty(_usageMap, gl.STREAM_DRAW, 'stream'), _usageMap);
(_dataTypeMap = {}, _defineProperty(_dataTypeMap, gl.BYTE, 'int8'), _defineProperty(_dataTypeMap, gl.UNSIGNED_INT, 'int16'), _defineProperty(_dataTypeMap, gl.INT, 'int32'), _defineProperty(_dataTypeMap, gl.UNSIGNED_BYTE, 'uint8'), _defineProperty(_dataTypeMap, gl.UNSIGNED_SHORT, 'uint16'), _defineProperty(_dataTypeMap, gl.UNSIGNED_INT, 'uint32'), _defineProperty(_dataTypeMap, gl.FLOAT, 'float'), _dataTypeMap);
(_formatMap = {}, _defineProperty(_formatMap, gl.ALPHA, 'alpha'), _defineProperty(_formatMap, gl.LUMINANCE, 'luminance'), _defineProperty(_formatMap, gl.LUMINANCE_ALPHA, 'luminance alpha'), _defineProperty(_formatMap, gl.RGB, 'rgb'), _defineProperty(_formatMap, gl.RGBA, 'rgba'), _defineProperty(_formatMap, gl.RGBA4, 'rgba4'), _defineProperty(_formatMap, gl.RGB5_A1, 'rgb5 a1'), _defineProperty(_formatMap, gl.RGB565, 'rgb565'), _defineProperty(_formatMap, gl.DEPTH_COMPONENT, 'depth'), _defineProperty(_formatMap, gl.DEPTH_STENCIL, 'depth stencil'), _formatMap);
(_mipmapMap = {}, _defineProperty(_mipmapMap, gl.DONT_CARE, 'dont care'), _defineProperty(_mipmapMap, gl.NICEST, 'nice'), _defineProperty(_mipmapMap, gl.FASTEST, 'fast'), _mipmapMap);
(_filterMap = {}, _defineProperty(_filterMap, gl.NEAREST, 'nearest'), _defineProperty(_filterMap, gl.LINEAR, 'linear'), _defineProperty(_filterMap, gl.LINEAR_MIPMAP_LINEAR, 'mipmap'), _defineProperty(_filterMap, gl.NEAREST_MIPMAP_LINEAR, 'nearest mipmap linear'), _defineProperty(_filterMap, gl.LINEAR_MIPMAP_NEAREST, 'linear mipmap nearest'), _defineProperty(_filterMap, gl.NEAREST_MIPMAP_NEAREST, 'nearest mipmap nearest'), _filterMap);
(_wrapModeMap = {}, _defineProperty(_wrapModeMap, gl.REPEAT, 'repeat'), _defineProperty(_wrapModeMap, gl.CLAMP_TO_EDGE, 'clamp'), _defineProperty(_wrapModeMap, gl.MIRRORED_REPEAT, 'mirror'), _wrapModeMap);
(_colorSpaceMap = {}, _defineProperty(_colorSpaceMap, gl.NONE, 'none'), _defineProperty(_colorSpaceMap, gl.BROWSER_DEFAULT_WEBGL, 'browser'), _colorSpaceMap);
(_depthFuncMap = {}, _defineProperty(_depthFuncMap, gl.NEVER, 'never'), _defineProperty(_depthFuncMap, gl.ALWAYS, 'always'), _defineProperty(_depthFuncMap, gl.LESS, 'less'), _defineProperty(_depthFuncMap, gl.LEQUAL, 'lequal'), _defineProperty(_depthFuncMap, gl.GREATER, 'greater'), _defineProperty(_depthFuncMap, gl.GEQUAL, 'gequal'), _defineProperty(_depthFuncMap, gl.EQUAL, 'equal'), _defineProperty(_depthFuncMap, gl.NOTEQUAL, 'notequal'), _depthFuncMap);
(_blendEquationMap = {}, _defineProperty(_blendEquationMap, gl.FUNC_ADD, 'add'), _defineProperty(_blendEquationMap, gl.MIN_EXT, 'min'), _defineProperty(_blendEquationMap, gl.MAX_EXT, 'max'), _defineProperty(_blendEquationMap, gl.FUNC_SUBTRACT, 'subtract'), _defineProperty(_blendEquationMap, gl.FUNC_REVERSE_SUBTRACT, 'reverse subtract'), _blendEquationMap);
(_blendFuncMap = {}, _defineProperty(_blendFuncMap, gl.ZERO, 'zero'), _defineProperty(_blendFuncMap, gl.ONE, 'one'), _defineProperty(_blendFuncMap, gl.SRC_COLOR, 'src color'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_SRC_COLOR, 'one minus src color'), _defineProperty(_blendFuncMap, gl.SRC_ALPHA, 'src alpha'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_SRC_ALPHA, 'one minus src alpha'), _defineProperty(_blendFuncMap, gl.DST_COLOR, 'dst color'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_DST_COLOR, 'one minus dst color'), _defineProperty(_blendFuncMap, gl.DST_ALPHA, 'dst alpha'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_DST_ALPHA, 'one minus dst alpha'), _defineProperty(_blendFuncMap, gl.CONSTANT_COLOR, 'constant color'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_CONSTANT_COLOR, 'one minus constant color'), _defineProperty(_blendFuncMap, gl.CONSTANT_ALPHA, 'constant alpha'), _defineProperty(_blendFuncMap, gl.ONE_MINUS_CONSTANT_ALPHA, 'one minus constant alpha'), _defineProperty(_blendFuncMap, gl.SRC_ALPHA_SATURATE, 'src alpha saturate'), _blendFuncMap);
(_stencilFuncMap = {}, _defineProperty(_stencilFuncMap, gl.NEVER, 'never'), _defineProperty(_stencilFuncMap, gl.ALWAYS, 'always'), _defineProperty(_stencilFuncMap, gl.LESS, 'less'), _defineProperty(_stencilFuncMap, gl.LEQUAL, 'lequal'), _defineProperty(_stencilFuncMap, gl.GREATER, 'greater'), _defineProperty(_stencilFuncMap, gl.GEQUAL, 'gequal'), _defineProperty(_stencilFuncMap, gl.EQUAL, 'equal'), _defineProperty(_stencilFuncMap, gl.NOTEQUAL, 'notequal'), _stencilFuncMap);
(_stencilOpMap = {}, _defineProperty(_stencilOpMap, gl.ZERO, 'zero'), _defineProperty(_stencilOpMap, gl.KEEP, 'keep'), _defineProperty(_stencilOpMap, gl.REPLACE, 'replace'), _defineProperty(_stencilOpMap, gl.INVERT, 'invert'), _defineProperty(_stencilOpMap, gl.INCR, 'increment'), _defineProperty(_stencilOpMap, gl.DECR, 'decrement'), _defineProperty(_stencilOpMap, gl.INCR_WRAP, 'increment wrap'), _defineProperty(_stencilOpMap, gl.DECR_WRAP, 'decrement wrap'), _stencilOpMap);
(_cullFaceMap = {}, _defineProperty(_cullFaceMap, gl.FRONT, 'front'), _defineProperty(_cullFaceMap, gl.BACK, 'back'), _cullFaceMap);

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var arrayWithoutHoles = createCommonjsModule(function (module) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var iterableToArray = createCommonjsModule(function (module) {
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var nonIterableSpread = createCommonjsModule(function (module) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

createCommonjsModule(function (module) {
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to infer the `Object` constructor. */
funcToString.call(Object);

const flowchartCss = ".x6-graph-scroller{width:100vw !important;height:calc(100vh - 64px) !important}.x6-graph-scroller.x6-graph-scroller-pannable[data-panning=false]{cursor:default}.x6-widget-selection-box{box-sizing:content-box !important;margin-top:-4px;margin-left:-4px;padding-right:4px;padding-bottom:4px;border:2px dashed #34D399;box-shadow:none}.x6-widget-selection-inner{box-sizing:content-box !important;margin-top:-8px;margin-left:-8px;padding-right:12px;padding-bottom:12px;border:2px solid #34D399;box-shadow:none}";

const FlowchartTypeName = 'Elsa.Flowchart';
const FlowchartComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.activitySelected = createEvent(this, "activitySelected", 7);
    this.activityDeleted = createEvent(this, "activityDeleted", 7);
    this.containerSelected = createEvent(this, "containerSelected", 7);
    this.childActivitySelected = createEvent(this, "childActivitySelected", 7);
    this.graphUpdated = createEvent(this, "graphUpdated", 7);
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
      const activityDescriptor = state.activityDescriptors.find(x => x.typeName == activity.type);
      const childActivity = portProvider.resolvePort(portName, { activity: activity, activityDescriptor });
      return childActivity;
    };
    this.setPort = (owner, portName, child) => {
      const portProvider = this.portProviderRegistry.get(owner.type);
      const activityDescriptor = state.activityDescriptors.find(x => x.typeName == owner.type);
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
    this.getActivityDescriptor = (typeName, version) => state.activityDescriptors.find(x => x.typeName == typeName && x.version == version);
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
      const startActivity = rootActivities.find(x => x.canStartWorkflow) || lodash.first(rootActivities);
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
    return (h$1(FlowchartTunnel.Provider, { state: state }, h$1("div", { class: "tw-relative " }, h$1("div", { class: "tw-absolute tw-left-0 tw-top-3 tw-z-10" }, h$1("elsa-workflow-navigator", { items: path, rootActivity: this.rootActivity, onNavigate: this.onNavigateHierarchy })), h$1("div", { class: "tw-absolute tw-left-0 tw-top-0 tw-right-0 tw-bottom-0 ", ref: el => (this.container = el) }), h$1("elsa-context-menu", { ref: el => (this.activityContextMenu = el), hideButton: true, anchorPoint: ContextMenuAnchorPoint.TopLeft, class: "tw-absolute" }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "rootActivity": ["onActivityChanged"],
    "interactiveMode": ["onInteractiveModeChange"]
  }; }
};
FlowchartComponent.style = flowchartCss;

const positionToLocalStorage = {
  [PanelPosition.Right]: 'LS/rightPanelWidth',
  [PanelPosition.Left]: 'LS/leftPanelWidth',
  [PanelPosition.Bottom]: 'LS/bottomPanelWidth',
};
const positionToCssVariable = {
  [PanelPosition.Right]: '--workflow-editor-width',
  [PanelPosition.Left]: '--activity-picker-width',
  [PanelPosition.Bottom]: '--activity-editor-height',
};
const positionToDefaultSize = {
  [PanelPosition.Right]: 580,
  [PanelPosition.Left]: 300,
  [PanelPosition.Bottom]: 200,
};
function getPanelDefaultSize(position) {
  return localStorage.getItem(positionToLocalStorage[position]) || positionToDefaultSize[position];
}
function updatePanelDefaultSize(position, size) {
  return localStorage.setItem(positionToLocalStorage[position], size.toString());
}
function applyResize({ position, isDefault, isHide, size }) {
  const root = document.querySelector(':root');
  if (isHide) {
    root.style.setProperty(positionToCssVariable[position], '1px');
    return;
  }
  if (isDefault) {
    if (position < 0)
      position = position * -1;
    root.style.setProperty(positionToCssVariable[position], `${getPanelDefaultSize(position)}px`);
    return;
  }
  if (size < 0) {
    const flowChart = document.querySelector('elsa-flowchart');
    size = window.innerHeight + size - flowChart.getBoundingClientRect().y + 55;
  }
  root.style.setProperty(positionToCssVariable[position], `${size}px`);
  updatePanelDefaultSize(position, size);
  return;
}

const panelCss = ".panel-state-collapsed.panel-position-bottom{right:var(--workflow-editor-width);left:var(--activity-picker-width)}.panel-position-bottom{right:var(--workflow-editor-width) !important;left:var(--activity-picker-width) !important}";

const Panel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.expandedStateChanged = createEvent(this, "expandedStateChanged", 7);
    this.dragging = false;
    this.onToggleClick = () => {
      if (this.isExpanded) {
        applyResize({ position: this.position, isHide: true });
      }
      else {
        applyResize({ position: this.position, isDefault: true });
      }
      this.isExpanded = !this.isExpanded;
      this.expandedStateChanged.emit({ expanded: this.isExpanded });
    };
    this.onBodyMouseUp = () => {
      if (this.dragging) {
        this.clearJSEvents();
      }
    };
    this.resize = (e) => {
      if (this.position === PanelPosition.Right) {
        applyResize({ position: PanelPosition.Right, size: document.body.clientWidth - e.pageX });
      }
      if (this.position === PanelPosition.Left) {
        applyResize({ position: PanelPosition.Left, size: e.pageX });
      }
      if (this.position === PanelPosition.Bottom) {
        applyResize({ position: PanelPosition.Bottom, size: document.body.offsetHeight - e.pageY });
      }
    };
    this.onDragBarMouseDown = (e) => {
      e.preventDefault();
      const body = document.body;
      this.dragging = true;
      body.addEventListener('mousemove', this.resize);
    };
    this.position = PanelPosition.Left;
    this.isExpanded = true;
  }
  componentWillLoad() {
    document.addEventListener('mouseup', this.onBodyMouseUp);
    applyResize({ position: this.position, isDefault: true });
  }
  disconnectedCallback() {
    document.removeEventListener('mouseup', this.onBodyMouseUp);
  }
  clearJSEvents() {
    const body = document.body;
    this.dragging = false;
    body.removeEventListener('mousemove', this.resize);
  }
  render() {
    const isExpanded = this.isExpanded;
    const position = this.position;
    const stateClass = isExpanded ? 'panel-state-expanded' : 'panel-state-collapsed';
    const containerClassMap = [];
    containerClassMap[PanelPosition.Left] = 'panel-position-left tw-left-0 tw-top-0 tw-bottom-0 tw-border-r';
    containerClassMap[PanelPosition.Top] = 'panel-position-top tw-left-0 tw-top-0 tw-right-0 tw-border-b';
    containerClassMap[PanelPosition.Bottom] = 'panel-position-bottom h-0 tw-bottom-0 tw-border-t';
    containerClassMap[PanelPosition.Right] = 'panel-position-right tw-right-0 tw-top-0 tw-bottom-0 tw-border-l';
    const containerCssClass = containerClassMap[position];
    const toggleClassMap = {};
    toggleClassMap[PanelPosition.Left] = 'elsa-panel-toggle-left';
    toggleClassMap[PanelPosition.Top] = 'elsa-panel-toggle-top';
    toggleClassMap[PanelPosition.Right] = 'elsa-panel-toggle-right';
    toggleClassMap[PanelPosition.Bottom] = 'elsa-panel-toggle-bottom';
    const toggleCssClass = toggleClassMap[position];
    const iconOrientationCssClass = isExpanded ? 'tw-rotate-180' : '';
    const dragBarClassMap = {
      [PanelPosition.Left]: 'tw-right-0 tw-h-full tw-cursor-col-resize tw-w-1',
      [PanelPosition.Right]: 'tw-left-0 tw-h-full tw-cursor-col-resize tw-w-1',
      [PanelPosition.Bottom]: 'tw-top-0 tw-w-full tw-cursor-row-resize tw-h-1',
    };
    const dragBarClass = dragBarClassMap[this.position];
    return (h$1(Host, { class: `panel tw-absolute tw-bg-white tw-z-20 ${containerCssClass} ${stateClass}` }, h$1("div", { class: `tw-absolute tw-opacity-0 tw-bg-blue-400 tw-transition tw-ease-in-out tw-duration-300 hover:tw-opacity-100 tw-z-10 ${dragBarClass}`, onMouseDown: this.onDragBarMouseDown }), h$1("div", { class: "panel-content-container" }, h$1("slot", null)), h$1("div", { class: `tw-text-white ${toggleCssClass}`, onClick: () => this.onToggleClick() }, h$1("svg", { class: `tw-h-6 tw-w-6 tw-text-gray-700 ${iconOrientationCssClass}`, width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h$1("path", { stroke: "none", d: "M0 0h24v24H0z" }), h$1("polyline", { points: "9 6 15 12 9 18" })))));
  }
  get element() { return getElement(this); }
};
Panel.style = panelCss;

const WorkflowNavigator = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.navigate = createEvent(this, "navigate", 7);
    this.renderPathItem = (item, index, nodes) => {
      const activityId = item.activityId;
      const activity = nodes.find(x => x.activity.id == activityId).activity;
      const activityDescriptor = state.activityDescriptors.find(x => x.typeName == activity.type);
      const icon = this.iconRegistry.getOrDefault(activity.type)();
      const listElements = [];
      const isLastItem = index == this.items.length - 1;
      const onItemClick = (e, item) => {
        e.preventDefault();
        this.onItemClick(item);
      };
      let port = null;
      if (!!item.portName) {
        const portProvider = this.portProviderRegistry.get(activity.type);
        const ports = portProvider.getOutboundPorts({ activity, activityDescriptor });
        if (ports.length > 1)
          port = ports.find(x => x.name == item.portName);
      }
      if (isLastItem) {
        listElements.push(h$1("li", null, h$1("div", { class: "tw-flex tw-items-center" }, h$1("span", { class: "tw-block tw-flex tw-items-center tw-text-gray-500" }, h$1("div", { class: "tw-bg-blue-500 tw-rounded" }, icon), h$1("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500" }, activityId)), !!port ? (h$1("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h$1("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))) : undefined)));
      }
      else {
        listElements.push(h$1("li", null, h$1("div", { class: "tw-flex tw-items-center" }, h$1("a", { onClick: e => onItemClick(e, item), href: "#", class: "tw-block tw-flex tw-items-center tw-text-gray-400 hover:tw-text-gray-500" }, h$1("div", { class: "tw-bg-blue-500 tw-rounded" }, icon), h$1("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-text-gray-700" }, activityId)), h$1("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h$1("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" })))));
      }
      if (!!port) {
        listElements.push(h$1("li", null, h$1("div", { class: "tw-flex tw-items-center" }, h$1("span", { class: "tw-text-sm tw-font-medium tw-text-gray-500", "aria-current": "page" }, port.displayName))));
      }
      return listElements;
    };
    this.onItemClick = (item) => this.navigate.emit(item);
    this.items = [];
    this.rootActivity = undefined;
    this.iconRegistry = Container.get(ActivityIconRegistry);
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  render() {
    let items = this.items;
    if (items.length <= 0)
      return null;
    if (!this.rootActivity)
      return;
    const nodes = flatten(walkActivities(this.rootActivity));
    return h$1("div", { class: "tw-ml-8" }, h$1("nav", { class: "tw-flex", "aria-label": "Breadcrumb" }, h$1("ol", { role: "list", class: "tw-flex tw-items-center tw-space-x-3" }, items.length > 0 && (h$1("li", null, h$1("div", { class: "tw-flex tw-items-center" }, h$1("a", { onClick: e => this.onItemClick(null), href: "#", class: "tw-block tw-flex tw-items-center tw-text-gray-400 hover:tw-text-gray-500" }, h$1("div", { class: "tw-bg-blue-500 tw-rounded" }, h$1(FlowchartIcon, null)), h$1("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-text-gray-700" }, this.rootActivity.id)), h$1("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h$1("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))))), items.map((item, index) => this.renderPathItem(item, index, nodes)))));
  }
};

export { FlowchartComponent as elsa_flowchart, Panel as elsa_panel, WorkflowNavigator as elsa_workflow_navigator };

//# sourceMappingURL=elsa-flowchart_3.entry.js.map