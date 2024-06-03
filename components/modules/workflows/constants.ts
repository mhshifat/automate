import NodeActions from "./node-actions";
import NodeSettings from "./node-settings";

export const NODE_TYPES = [
  { type: "TRIGGER", title: "Google Drive", description: "Connect with google drive to trigger an action", settingsComponent: NodeSettings, connection: false, nodeType: "GOOGLE_DRIVE", connectionUrl: "/api/connections/drive", settings: [NodeActions] },
  { type: "TRIGGER", title: "Trigger", description: "An event that starts the workflow", settingsComponent: NodeSettings, nodeType: "TRIGGER" },
  { type: "EMAIL", title: "Email", description: "Send email to user", settingsComponent: NodeSettings, connection: false, nodeType: "EMAIL" },
  { type: "SLACK", title: "Slack", description: "Connect to slack for more actions", settingsComponent: NodeSettings, connection: false, nodeType: "SLACK", connectionUrl: "/api/connections/slack", settings: [NodeActions] },
  { type: "DISCORD", title: "Discord", description: "Connect to discord for more actions", settingsComponent: NodeSettings, connection: false, nodeType: "DISCORD" },
  { type: "Notion", title: "Notion", description: "Connect to notion for more actions", settingsComponent: NodeSettings, connection: false, nodeType: "NOTION" },
];
