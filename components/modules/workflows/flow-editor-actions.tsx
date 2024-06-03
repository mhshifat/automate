import { Button } from "@/components/ui/button";

export default function FlowEditorActions() {
  return (
    <div className="flex items-center justify-end p-5 gap-2">
      <Button size="sm">Save</Button>
      <Button size="sm">Publish</Button>
    </div>
  )
}