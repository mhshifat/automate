import { NODE_TYPES } from "./constants";
import { useEditor } from "./editor-provider";

export default function EditorSettings() {
  const { selectedNode } = useEditor();

  const nodeType = NODE_TYPES?.find(item => item.title === selectedNode?.data?.title);
  
  if (!selectedNode || !nodeType) return <p>Please select a node</p>
  const SettingsComponent = nodeType.settingsComponent;
  const settings = nodeType.settings;
  return (
    <div>
      <SettingsComponent />

      {settings?.map((item, itemIdx) => {
        const Component = item;
        return <Component key={"EditorSettings__SETTINGS_" + itemIdx} />;
      })}
    </div>
  )
}