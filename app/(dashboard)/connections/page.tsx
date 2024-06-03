import { getConnections } from "@/actions/connections";
import DashboardLayout from "@/components/shared/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const CONNECTIONS = [
  { title: "Google Drive", type: "GOOGLE_DRIVE", path: "/api/connections/drive" },
  { title: "Discord", type: "DISCORD", path: "/" },
  { title: "Notion", type: "NOTION", path: "/" },
  { title: "Slack", type: "SLACK", path: "/api/connections/slack" },
]

export default async function ConnectionsPage() {
  const connections = await getConnections();
  
  const hasConnection = (type: string) => {
    return connections?.find(item => item.type === type)
  };
  return (
    <DashboardLayout
      title="Connections"
    >
      <div className="flex-col flex gap-5">
        {CONNECTIONS.map(item => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-center gap-5 justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>

                <Link href={item.path}>
                  <Button variant={hasConnection(item.type as string) ? "outline" : "default"}>{hasConnection(item.type as string) ? "Reconnect" : "Connect"}</Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  )
}