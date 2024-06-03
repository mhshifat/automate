import EditorCanvas from "@/components/modules/workflows/editor-canvas";
import DashboardLayout from "@/components/shared/dashboard-layout";

export default async function EditorPage() {
  return (
    <DashboardLayout
      title="Editor Canvas"
      className="p-0"
    >
      <EditorCanvas />
    </DashboardLayout>
  )
}