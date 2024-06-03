import { getWorkflows } from "@/actions/workflows";
import CreateWorkflowDrawer from "@/components/modules/workflows/create-workflow-drawer";
import DashboardLayout from "@/components/shared/dashboard-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <DashboardLayout
      title="Workflows"
    >
      <div className="flex items-center gap-5 justify-between">
        <h3 className="text-lg font-medium">List of workflows</h3>

        <CreateWorkflowDrawer />
      </div>
      
      <div className="flex flex-col gap-5 mt-5">
        {workflows?.map(workflow => (
          <Card key={workflow.id} className="flex items-center gap-5 justify-between">
            <CardHeader>
              <CardTitle>{workflow.title}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>

            <div className="p-6">
              <Switch />
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}