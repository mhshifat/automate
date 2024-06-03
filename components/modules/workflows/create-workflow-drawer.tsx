"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import CreateWorkflowForm from "./create-workflow-form";
import { useState } from "react";

export default function CreateWorkflowDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger asChild>
        <Button onClick={() => setIsOpen(true)} size="icon">
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create workflow</DrawerTitle>
          <DrawerDescription>Please fill the necessary fields to create the workflow</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <CreateWorkflowForm
            onSubmit={() => setIsOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}