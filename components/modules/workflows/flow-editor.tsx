import { useMemo, useState } from "react";
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Controls, MiniMap, NodeTypes, ReactFlowInstance } from "reactflow";
import SourceNode from "./source-node";
import TargetNode from "./target-node";
import { NODE_TYPES } from "./constants";
import { toast } from "sonner";
import { EditorNode } from "./editor-provider";

export default function FlowEditor() {
  const [instance, setInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useState<EditorNode[]>([]);
  const [edges, setEdges] = useState<{
    id: string;
    source: string;
    target: string;
}[]>([]);

  const nodeTypes = useMemo(() => ({
    TRIGGER: SourceNode,
    EMAIL: TargetNode,
    SLACK: TargetNode,
    DISCORD: TargetNode,
    NOTION: TargetNode,
  }), []);

  return (
    <ReactFlow
      onInit={setInstance}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onDrop={(event) => {
        event.preventDefault();
        if (!instance) return;
        const { x, y } = instance.flowToScreenPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const eventData = event.dataTransfer.getData("application/react-flow");
        const nodeData = NODE_TYPES.find(item => item.title === eventData);
        if (!nodeData) return;
        if (nodeData?.type === "TRIGGER" && nodes?.some(node => node.type === nodeData.type)) return toast.error("Already have a trigger type node inside");

        const newNode = {
          position: { x, y },
          data: nodeData,
          type: nodeData.type
        }
        
        setNodes(values => values.concat({
          id: String(values.length + 1),
          ...newNode
        }))
      }}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onNodesChange={(changes) => {
        setNodes(values => applyNodeChanges(changes, values))
      }}
      onEdgesChange={(changes) => {
        setEdges(values => applyEdgeChanges(changes, values))
      }}
      onConnect={(params) => {
        setEdges(values => addEdge(params, values))
      }}
    >
      <Controls
        position='top-left'
      />
      <MiniMap
        position='bottom-left'
      />
      <Background
        variant={BackgroundVariant.Dots}
      />
    </ReactFlow>
  )
}