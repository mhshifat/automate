import { useEditor } from "./editor-provider";
import GoogleDriveActions from "./google-drive-actions";
import SlackActions from "./slack-actions";

export default function NodeActions() {
  const { selectedNode } = useEditor();

  switch (selectedNode?.data?.nodeType) {
    case "SLACK":
      return <SlackActions />;
    case "GOOGLE_DRIVE":
      return <GoogleDriveActions />;
    default:
      return null;
  }
}