"use client";

import { getUserDetails } from "@/actions/users";
import SubmitButton from "@/components/shared/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type IUser = Awaited<ReturnType<typeof getUserDetails>>;

interface SaveUserSettingsFormProps {
  defaultValues: Partial<IUser>
}

export default function SaveUserSettingsForm({ defaultValues }: SaveUserSettingsFormProps) {
  const form = useForm({
    defaultValues: defaultValues || {}
  });

  function handleSubmit() {
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-5">
          <SubmitButton>Save user settings</SubmitButton>
        </div>
      </form>
    </Form>
  )
}