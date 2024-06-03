"use client";

import { createWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

interface CreateWorkflowFormProps {
  onSubmit?: () => void;
}

export default function CreateWorkflowForm({ onSubmit }: CreateWorkflowFormProps) {
  const router = useRouter();
  const form = useForm<FormSchema>();
  
  async function handleSubmit(values: FormSchema) {
    const { id } = await createWorkflow(values) || {};
    if (id) {
      onSubmit?.();
      router.push(`/workflows/editor/${id}`);
    }
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2">
          <Button>Create workflow</Button>
        </div>
      </form>
    </Form>
  )
}