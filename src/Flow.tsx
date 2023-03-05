import { useState, useCallback, useMemo } from "react";
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
  Background,
  Controls,
  Position,
  NodeTypes,
} from "reactflow";

import "reactflow/dist/style.css";
import dagre from "dagre";

import { EpisodeGraph, episodeGraph } from "./data";
import { EpisodeNode } from "./EpisodeNode";
import { GroupBy, Fn, Predicate, Endo } from "./Fn";
console.log(episodeGraph);

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

type GetLaidOutElements = (
  episodeGraph: EpisodeGraph,
  direction: "TB" | "LR"
) => { nodes: Node[]; edges: Edge[] };
const getLaidOutElements: GetLaidOutElements = (
  episodeGraph,
  direction = "TB"
) => {
  const nodeWidth = 400;
  const nodeHeight = 250;

  const isHorizontal = direction === "LR";

  const { nodes, edges } = episodeGraph;

  dagreGraph.setGraph({ rankdir: direction, ranksep: 200 });

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

type GraphNode = { node: Node; dependencies: Set<Edge>; dependents: Set<Edge> };

const edgesBy: GroupBy<Edge> = (selector) => (edges) => {
  return edges.reduce((acc, edge) => {
    const key = selector(edge);
    const edges = acc[key] || [];
    return { ...acc, [key]: [...edges, edge] };
  }, {} as Record<string, Edge[]>);
};

const filterGraph: Fn<Predicate<GraphNode>, Endo<EpisodeGraph>> =
  (predicate) => (graph) => {
    const edgesBySource = edgesBy((edge) => edge.source)(graph.edges);
    const edgesByTarget = edgesBy((edge) => edge.target)(graph.edges);

    const dependencies = (node: Node) => new Set(edgesBySource[node.id] ?? []);
    const dependents = (node: Node) => new Set(edgesByTarget[node.id] ?? []);

    const newNodes = new Map(
      graph.nodes
        .filter((node) =>
          predicate({
            node,
            dependencies: dependencies(node),
            dependents: dependents(node),
          })
        )
        .map((node) => [node.id, node])
    );

    const newEdges = graph.edges.filter(
      (edge) => newNodes.has(edge.source) && newNodes.has(edge.target)
    );

    return {
      nodes: Array.from(newNodes.values()),
      edges: newEdges,
    };
  };

const degree: Fn<GraphNode, number> = ({ dependencies, dependents }) =>
  new Set([...dependencies, ...dependents]).size;

const condition: Predicate<GraphNode> = (n) => degree(n) > 10;

const initialState = getLaidOutElements(
  filterGraph(condition)(episodeGraph),
  "LR"
);
const nodeTypes = { episode: EpisodeNode };

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnDoubleClick={false}
      nodeTypes={nodeTypes as NodeTypes}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
