import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GoogleDriveActions() {
  return (
    <div>
      <Card className="flex flex-col gap-5 p-5">
        <Button variant='outline'>Create Listener</Button>
      </Card>
    </div>
  )
}