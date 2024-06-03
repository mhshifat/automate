import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Handle, NodeProps, Position } from "reactflow";
import { useEditor } from "./editor-provider";
import { cn } from "@/lib/utils";

type TargetNodeProps = NodeProps;

export default function TargetNode({type, id, data}: TargetNodeProps) {
  const { setSelectedNode, selectedNode, connections } = useEditor();

  return (
    <div className="relative min-w-80" onClick={() => setSelectedNode({
      id: id,
      position: { x: 0, y: 0 },
      data,
    })}>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-slate-300 !border-2 !border-slate-600 !bottom-[-5px]" />
      <Card className={cn("p-5 pt-10", {
        "border border-slate-900": selectedNode?.data?.title === data?.title
      })}>
        <CardTitle className="text-base">{data?.title}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
      </Card>
      <Badge className="absolute top-2 right-2">{type}</Badge>
      {data?.hasOwnProperty("connection") && <span className={cn("absolute top-2 left-2 w-2 h-2 rounded-full flex items-center justify-normal", {
        "bg-rose-600": !(connections as any)?.[data?.nodeType as string],
        "bg-emerald-600": (connections as any)?.[data?.nodeType as string]
      })} />}
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-slate-300 !border-2 !border-slate-600 !bottom-[-5px]" />
    </div>
  )
}