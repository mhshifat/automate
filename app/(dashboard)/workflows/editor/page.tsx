import { redirectToFirstWorkflowEditor } from "@/actions/workflows";

export default async function WorkflowEditorPage() {
  await redirectToFirstWorkflowEditor();
  
  return null;
}