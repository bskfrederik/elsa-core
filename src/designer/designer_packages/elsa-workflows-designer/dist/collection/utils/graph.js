import { v4 as uuid } from 'uuid';
import optionsStore from '../data/designer-options-store';
export function rebuildGraph(graph) {
  graph.getNodes().forEach((node) => {
    autoOrientConnections(graph, node);
    adjustPortMarkupByNode(node);
  });
}
export function autoOrientConnections(graph, selectedNode) {
  const neighbors = graph.getNeighbors(selectedNode);
  const selectedCenter = selectedNode.getBBox().center;
  const nodeCouplesWithPositions = neighbors.map((neighbourNode) => {
    return Object.assign(Object.assign({}, calculatePortPositionsOfNodeCouple(selectedCenter.x, selectedCenter.y, neighbourNode.getBBox().center.x, neighbourNode.getBBox().center.y)), { selectedNode: selectedNode, neighbourNode: neighbourNode });
  });
  nodeCouplesWithPositions.forEach(couple => updatePortsWithNewPositions(graph, couple.selectedNode, couple.portPositionOfSelectedNode, couple.neighbourNode, couple.portPositionOfNeighbourNode));
}
function updatePortsWithNewPositions(graph, selectedNode, portPositionOfSelectedNode, neighbourNode, portPositionOfNeighbourNode) {
  updatePortsAndEdgeOfNodeCouple(graph, selectedNode, neighbourNode, portPositionOfSelectedNode, portPositionOfNeighbourNode);
  updatePortsAndEdgeOfNodeCouple(graph, neighbourNode, selectedNode, portPositionOfNeighbourNode, portPositionOfSelectedNode);
  adjustPortMarkupByNode(selectedNode);
  adjustPortMarkupByNode(neighbourNode);
}
function calculatePositionsForInflexibleNode(sourceNode, targetNodes) {
  const sourceNodeCenter = sourceNode.getBBox().center;
  const dxAverageForTargetNodes = targetNodes.map(node => node.getBBox().center.x).reduce((a, b) => a + b, 0) / targetNodes.length;
  const dyAverageForTargetNodes = targetNodes.map(node => node.getBBox().center.y).reduce((a, b) => a + b, 0) / targetNodes.length;
  const sourcePortWithNewPosition = { node: sourceNode, position: calculatePortPositionsOfNodeCouple(sourceNodeCenter.x, sourceNodeCenter.y, dxAverageForTargetNodes, dyAverageForTargetNodes).portPositionOfSelectedNode };
  return targetNodes.map((targetNode) => {
    return {
      sourceNode: sourcePortWithNewPosition.node,
      sourceNodePosition: sourcePortWithNewPosition.position,
      targetNode: targetNode,
      targetNodePosition: calculatePortPositionsOfNodeCouple(sourceNode.getBBox().center.x, sourceNode.getBBox().center.y, targetNode.getBBox().center.x, targetNode.getBBox().center.y).portPositionOfNeighbourNode
    };
  });
}
function calculatePortPositionsOfNodeCouple(selectedNodeX, selectedNodeY, neighbourNodeX, neighbourNodeY) {
  const dx = selectedNodeX - neighbourNodeX;
  const dy = selectedNodeY - neighbourNodeY;
  if (dx >= 0 && dy >= 0) {
    if (dx > dy) {
      return { portPositionOfSelectedNode: "left", portPositionOfNeighbourNode: "right" };
    }
    else {
      return { portPositionOfSelectedNode: "top", portPositionOfNeighbourNode: "bottom" };
    }
  }
  else if (dx >= 0 && dy <= 0) {
    if (dx > -dy) {
      return { portPositionOfSelectedNode: "left", portPositionOfNeighbourNode: "right" };
    }
    else {
      return { portPositionOfSelectedNode: "bottom", portPositionOfNeighbourNode: "top" };
    }
  }
  else if (dx <= 0 && dy >= 0) {
    if (-dx > dy) {
      return { portPositionOfSelectedNode: "right", portPositionOfNeighbourNode: "left" };
    }
    else {
      return { portPositionOfSelectedNode: "top", portPositionOfNeighbourNode: "bottom" };
    }
  }
  else if (dx <= 0 && dy <= 0) {
    if (dx > dy) {
      return { portPositionOfSelectedNode: "right", portPositionOfNeighbourNode: "left" };
    }
    else {
      return { portPositionOfSelectedNode: "bottom", portPositionOfNeighbourNode: "left" };
    }
  }
}
function updatePortsAndEdgeOfNodeCouple(graph, sourceNode, targetNode, portPositionOfSourceNode, portPositionOfTargetNode) {
  const edge = graph.model.getEdges().find(({ data }) => {
    const connection = data;
    const source = connection.source;
    const target = connection.target;
    const sourceActivityId = source.activity;
    const targetActivityId = target.activity;
    return sourceActivityId == sourceNode.id && targetActivityId == targetNode.id;
  });
  if (edge != null) {
    const connection = edge.data;
    const sourcePortOfConnection = connection.source.port;
    if (!optionsStore.enableFlexiblePorts && isNewCalculationNeededForInflexiblePort(graph, sourceNode, sourcePortOfConnection)) {
      const outgoingEdges = findOutgoingEdges(graph, sourceNode, sourcePortOfConnection);
      const targetNodes = graph.getNodes().filter(node => outgoingEdges.map(edge => connection.target.activity).includes(node.id));
      const nodeCouplesWithPositions = calculatePositionsForInflexibleNode(sourceNode, targetNodes);
      nodeCouplesWithPositions.forEach(couple => {
        updatePortsAndEdge(graph, couple.sourceNode, couple.targetNode, couple.sourceNodePosition, couple.targetNodePosition);
      });
      return;
    }
    updatePortsAndEdge(graph, sourceNode, targetNode, portPositionOfSourceNode, portPositionOfTargetNode);
  }
}
function isNewCalculationNeededForInflexiblePort(graph, sourceNode, inflexiblePort) {
  const portName = getPortNameByPortId(inflexiblePort);
  if (portName != null && portName != "Done") {
    const outgoingEdges = findOutgoingEdges(graph, sourceNode, inflexiblePort);
    if (outgoingEdges.length > 1) {
      return true;
    }
  }
  return false;
}
function updatePortsAndEdge(graph, sourceNode, targetNode, newSourceNodePosition, newTargetNodePosition) {
  var _a, _b;
  const edge = graph.model.getEdges().find(({ data }) => {
    const conn = data;
    return conn.source.activity == sourceNode.id && conn.target.activity == targetNode.id;
  });
  const connection = edge.data;
  const source = connection.source;
  const sourcePort = source.port;
  const target = connection.target;
  const targetPort = target.port;
  const sourceNodePort = (_a = sourceNode.getPort(sourcePort)) !== null && _a !== void 0 ? _a : sourceNode.getPorts().find(p => p.type == "out" && getPortNameByPortId(p.id) == getPortNameByPortId(sourcePort));
  const targetNodePort = (_b = targetNode.getPort(targetPort)) !== null && _b !== void 0 ? _b : targetNode.getPorts().find(p => p.type == "in" && getPortNameByPortId(p.id) == getPortNameByPortId(targetPort));
  if (sourceNode.getPort(sourcePort) == null || targetNode.getPort(targetPort) == null || (sourceNodePort === null || sourceNodePort === void 0 ? void 0 : sourceNodePort.position) != newSourceNodePosition || (targetNodePort === null || targetNodePort === void 0 ? void 0 : targetNodePort.position) != newTargetNodePosition) {
    graph.removeEdge(edge);
    const newSourceNodePortId = updatePort(graph, sourceNode, sourceNodePort, newSourceNodePosition);
    const newTargetNodePortId = updatePort(graph, targetNode, targetNodePort, newTargetNodePosition);
    graph.addEdge(createEdge({
      source: {
        activity: sourceNode.id,
        port: newSourceNodePortId !== null && newSourceNodePortId !== void 0 ? newSourceNodePortId : sourceNodePort.id
      },
      target: {
        activity: targetNode.id,
        port: newTargetNodePortId !== null && newTargetNodePortId !== void 0 ? newTargetNodePortId : targetNodePort.id
      }
    }));
  }
}
function hasPortAnEdge(graph, port) {
  return graph.getEdges().some(({ data }) => {
    const connection = data;
    const source = connection.source;
    const sourcePort = source.port;
    const target = connection.target;
    const targetPort = target.port;
    return sourcePort == port.id || targetPort == port.id;
  });
}
function findMatchingPortForEdge(node, position, portType, portName) {
  return node.getPorts().find(p => p.position == position && p.type == portType && getPortNameByPortId(p.id) == portName);
}
export function getPortNameByPortId(portId) {
  return portId.includes('_') ? (portId.split('_')[1] == 'null' ? null : portId.split('_')[1]) : portId;
}
function findOutgoingEdges(graph, node, portId) {
  return graph.model.getEdges().filter(({ data }) => {
    const connection = data;
    const source = connection.source;
    const sourceActivityId = source.activity;
    const sourcePort = source.port;
    return sourceActivityId == node.id && getPortNameByPortId(sourcePort) == getPortNameByPortId(portId);
  });
}
function updatePort(graph, node, nodePort, newPortPosition) {
  let newNodePortId = null;
  if ((nodePort === null || nodePort === void 0 ? void 0 : nodePort.position) != newPortPosition) {
    if (!hasPortAnEdge(graph, nodePort)) {
      node.removePort(nodePort);
    }
    const matchingPort = findMatchingPortForEdge(node, newPortPosition, nodePort.type, getPortNameByPortId(nodePort.id));
    if (matchingPort == null) {
      newNodePortId = createNewPort(nodePort, node, newPortPosition);
    }
    else {
      newNodePortId = matchingPort.id;
    }
  }
  return newNodePortId;
}
export function deriveNewPortId(portId) {
  return uuid() + '_' + getPortNameByPortId(portId);
}
function createNewPort(nodePort, node, newPortPosition) {
  const newNodePortId = deriveNewPortId(nodePort.id);
  node.addPort(Object.assign(Object.assign({}, nodePort), { group: newPortPosition, id: newNodePortId, position: newPortPosition, type: nodePort.type }));
  return newNodePortId;
}
export function adjustPortMarkupByNode(node) {
  node.getPorts().forEach(port => {
    if (port.type == 'out') {
      node.setPortProp(port.id, "attrs", {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#fff',
          strokeWidth: 2,
          fill: '#3c82f6',
        },
        text: {
          fontSize: 12,
          fill: '#888',
        },
      });
    }
    else {
      node.setPortProp(port.id, "attrs", {
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
      });
    }
  });
}
export function createEdge(connection) {
  return {
    shape: 'elsa-edge',
    zIndex: -1,
    data: connection,
    source: connection.source.activity,
    target: connection.target.activity,
    sourcePort: connection.source.port,
    targetPort: connection.target.port
  };
}
export function removeGuidsFromPortNames(root) {
  var _a, _b;
  if (((_a = root.connections) === null || _a === void 0 ? void 0 : _a.length) > 0) {
    root.connections.forEach((connection) => {
      connection.source.port = getPortNameByPortId(connection.source.port);
      connection.target.port = getPortNameByPortId(connection.target.port);
    });
  }
  let activitiesWithConnections = (_b = root.activities) === null || _b === void 0 ? void 0 : _b.filter(act => { var _a, _b; return ((_b = (_a = act.body) === null || _a === void 0 ? void 0 : _a.connections) === null || _b === void 0 ? void 0 : _b.length) > 0; });
  activitiesWithConnections.forEach(activity => {
    removeGuidsFromPortNames(activity.body);
  });
}
export function addGuidsToPortNames(root) {
  var _a;
  if (root.connections.length > 0) {
    root.connections.forEach((connection) => {
      connection.source.port = uuid() + '_' + connection.source.port;
      connection.target.port = uuid() + '_' + connection.target.port;
    });
  }
  let activitiesWithConnections = (_a = root.activities) === null || _a === void 0 ? void 0 : _a.filter(act => { var _a, _b; return ((_b = (_a = act.body) === null || _a === void 0 ? void 0 : _a.connections) === null || _b === void 0 ? void 0 : _b.length) > 0; });
  activitiesWithConnections.forEach(activity => {
    addGuidsToPortNames(activity.body);
  });
}
//# sourceMappingURL=graph.js.map
