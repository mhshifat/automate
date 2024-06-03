"use server";

import { db } from "@/db/drizzle";
import { workflows } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { createId } from '@paralleldrive/cuid2';
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface CreateWorkflowPayload {
  title: string;
  description: string;
}

export async function createWorkflow(values: CreateWorkflowPayload) {
  const user = await currentUser();
  if (!user) return;

  const [data] = await db
    .insert(workflows)
    .values({
      ...values,
      id: createId(),
      userId: user.id,
      createdAt: new Date()
    })
    .returning({ id: workflows.id });

  return data;
}

export async function getWorkflows() {
  const user = await currentUser();
  if (!user) return;

  const data =  await db
    .select({
      id: workflows.id,
      title: workflows.title,
      description: workflows.description,
    })
    .from(workflows)
    .where(
      eq(workflows.userId, user.id)
    )

  return data;
}

export async function redirectToFirstWorkflowEditor() {
  const user = await currentUser();
  if (!user) return;

  let editorId = null;
  const [firstData] = await db
    .select({ id: workflows.id })
    .from(workflows)
    .where(
      eq(workflows.userId, user.id)
    )
    .limit(1);
  if (firstData) editorId = firstData.id;
  else {
    const { id } = await createWorkflow({
      title: "Test Workflow",
      description: "Text workflow description"
    }) || {};

    editorId = id;
  }
  
  return redirect(`/workflows/editor/${editorId}`);
}