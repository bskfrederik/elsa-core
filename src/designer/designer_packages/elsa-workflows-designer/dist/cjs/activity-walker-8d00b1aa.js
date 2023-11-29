'use strict';

require('./toolbar-component-store-27cb56e9.js');
const utils = require('./utils-c73bd981.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');

class ActivityNodeClass {
  constructor(activity) {
    this.activity = activity;
    this.parents = [];
    this.children = [];
  }
  get nodeId() {
    const ancestorIds = [...this.ancestors()].reverse().map(x => x.activity.id);
    return ancestorIds.length ? `${ancestorIds.join(":")}:${this.activity.id}` : this.activity.id;
  }
  get activity() {
    return this._activity;
  }
  set activity(value) {
    this._activity = value;
  }
  get parents() {
    return this._parents;
  }
  set parents(value) {
    this._parents = value;
  }
  get children() {
    return this._children;
  }
  set children(value) {
    this._children = value;
  }
  descendants() {
    const list = [];
    for (let child of this.children) {
      list.push(child);
      list.push(...child.descendants());
    }
    return list;
  }
  ancestors() {
    const list = [];
    for (let parent of this.parents) {
      list.push(parent);
      list.push(...parent.ancestors());
    }
    return list;
  }
  siblings() {
    return this.parents.flatMap(parent => parent.children);
  }
  siblingsAndCousins() {
    return this.parents.flatMap(parent => parent.descendants().flatMap(x => x.children));
  }
}
function createActivityLookup(nodes) {
  const map = {};
  for (const node of nodes)
    map[node.activity.id] = node.activity;
  return map;
}
function createActivityNodeMap(nodes) {
  const map = {};
  for (const node of nodes)
    map[node.activity.id] = node;
  return map;
}
function walkActivities(root) {
  const descriptors = descriptorsStore.state.activityDescriptors;
  const collectedActivities = new Set([root]);
  const graph = new ActivityNodeClass(root);
  const collectedNodes = new Set([graph]);
  walkRecursive(graph, root, collectedActivities, collectedNodes, descriptors);
  return graph;
}
function flatten(root) {
  return flattenList([root]);
}
function flattenList(activities) {
  let list = [...activities];
  for (const activity of activities) {
    const childList = flattenList(activity.children);
    list = [...list, ...childList];
  }
  return list;
}
function walkRecursive(node, activity, collectedActivities, collectedNodes, descriptors) {
  const ports = getPorts(node, activity, descriptors);
  for (const port of ports) {
    const collectedNodesArray = Array.from(collectedNodes);
    let childNode = collectedNodesArray.find(x => x.activity == port.activity);
    if (!childNode) {
      childNode = new ActivityNodeClass(port.activity);
      childNode.port = port.port;
      //childNode = {activity: port.activity, children: [], parents: [], port: port.port};
      if (!collectedNodes.has(childNode))
        collectedNodes.add(childNode);
    }
    if (childNode !== node) {
      if (!!childNode.activity) {
        if (!childNode.parents.includes(node))
          childNode.parents.push(node);
        if (!node.children.includes(childNode))
          node.children.push(childNode);
        if (!collectedActivities.has(port.activity))
          collectedActivities.add(port.activity);
        walkRecursive(childNode, port.activity, collectedActivities, collectedNodes, descriptors);
      }
    }
  }
}
function getPorts(node, activity, descriptors) {
  const portProviderRegistry = utils.Container.get(utils.PortProviderRegistry);
  const portProvider = portProviderRegistry.get(activity.type);
  const activityDescriptor = descriptors.find(x => x.typeName == activity.type);
  const ports = portProvider.getOutboundPorts({ activity, activityDescriptor });
  let activityPorts = [];
  const portProviderContext = {
    activityDescriptor,
    activity
  };
  for (const port of ports) {
    const value = portProvider.resolvePort(port.name, portProviderContext);
    if (Array.isArray(value)) {
      const activities = value;
      activityPorts = [...activityPorts, ...activities.map(x => ({ port: port.name, activity: x }))];
    }
    else {
      activityPorts.push({ port: port.name, activity: value });
    }
  }
  return activityPorts;
}

exports.ActivityNodeClass = ActivityNodeClass;
exports.createActivityLookup = createActivityLookup;
exports.createActivityNodeMap = createActivityNodeMap;
exports.flatten = flatten;
exports.flattenList = flattenList;
exports.walkActivities = walkActivities;

//# sourceMappingURL=activity-walker-8d00b1aa.js.map