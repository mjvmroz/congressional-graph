import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  Background,
  Controls,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";
import dagre from "dagre";

import { episodeGraph } from "./data";
console.log(episodeGraph);

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

type GetLaidOutElements = (
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR"
) => { nodes: Node[]; edges: Edge[] };
const getLaidOutElements: GetLaidOutElements = (
  nodes,
  edges,
  direction = "TB"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const initialState = getLaidOutElements(
  episodeGraph.nodes,
  episodeGraph.edges,
  "LR"
);

export function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialState.nodes);
  const [edges, setEdges] = useState<Edge[]>(initialState.edges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // https://reactflow.dev/docs/examples/layout/dagre/
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
