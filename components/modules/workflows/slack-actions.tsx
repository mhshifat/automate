import { getConnections } from "@/actions/connections";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type SlackChannel = { name: string; id: string; }; 

export default function SlackActions() {
  const [channels, setChannels] = useState<SlackChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<SlackChannel | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios({
        url: "/api/connections/slack/channels",
        method: "GET"
      });
      setChannels(data);
    })()
  }, []);

  async function handleSendMessage() {
    await axios.post(`/api/connections/slack/channels/${selectedChannel?.id}/messages`, {
      content
    });
    setContent("");
    toast.success("Message posted");
  }
  return (
    <div>
      <Card className="flex flex-col gap-5 p-5">
        <Select
          value={selectedChannel?.id}
          onValueChange={(value) => {
            setSelectedChannel(channels.find(item => item.id === value) || null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a channel" />
          </SelectTrigger>
          <SelectContent>
            {channels.map(channel => (
              <SelectItem key={channel.name} value={channel.id}>{channel.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div>
          <Label>Message</Label>
          <Textarea value={content} onChange={({ target }) => setContent(target.value)} />
        </div>
        
        <Button disabled={!content} onClick={handleSendMessage}>Test Message</Button>
        <Button variant='outline'>Save Template</Button>
      </Card>
    </div>
  )
}