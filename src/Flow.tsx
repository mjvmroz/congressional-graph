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

export function Flow() {
  const [nodes, setNodes] = useState<Node[]>(episodeGraph.nodes);
  const [edges, setEdges] = useState<Edge[]>(episodeGraph.edges);

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
    </ReactFlow>
  );
}
