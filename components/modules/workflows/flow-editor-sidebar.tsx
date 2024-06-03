import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NODE_TYPES } from "./constants";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditorSettings from "./editor-settings";

export default function FlowEditorSidebar() {
  return (
    <div className="flex flex-col flex-1 p-5 border-t border-slate-200">
      <Tabs defaultValue="actions">
        <TabsList>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="actions" className="flex flex-col gap-2">
          {NODE_TYPES.map(item => (
            <Card
              key={item.title} 
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("application/react-flow", item.title);
                e.dataTransfer.effectAllowed = 'move';
              }}
            >
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="settings">
          <EditorSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}