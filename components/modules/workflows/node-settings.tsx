import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEditor } from "./editor-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function NodeSettings() {
  const { selectedNode, setConnections } = useEditor();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios({
        url: "/api/connections",
        method: "GET"
      })
      const isConnected = data?.some((item: { type: unknown; }) => item?.type === selectedNode?.data?.nodeType)
      setConnected(isConnected);
      if (selectedNode?.data?.nodeType) {
        setConnections(values => ({
          ...values,
          [selectedNode?.data?.nodeType as string]: isConnected
        }))
      }
    })()
  }, [selectedNode?.data?.nodeType, setConnections])

  return (
    <div>
      <Accordion type="multiple">
        {selectedNode?.data?.hasOwnProperty("connection") && (
          <AccordionItem value="account" className="border-none">
            <AccordionTrigger className="!no-underline">
              Account
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="flex items-center gap-5 justify-between py-5 border-none">
                  <span className="text-base font-semibold">{selectedNode?.data?.title as string}</span>
                  
                  {connected ? (
                    <Badge variant="outline">Connected</Badge>
                  ) : (
                    <Link href={selectedNode?.data?.connectionUrl || ""}>
                      <Button size="sm">Connect</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}