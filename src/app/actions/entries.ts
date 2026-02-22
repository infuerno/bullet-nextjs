//use "server" (this is the default)

import { stackServerApp } from "@/stack/server";

export type EntryInput = {
  type: string;
  date: Date;
  content: string;
  completed: boolean;
};

export async function createEntry(data: EntryInput) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error("❌ Unauthorised");

  return { success: true, message: "Entry created" };
}

export async function updateEntry(id: number, data: EntryInput) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error("❌ Unauthorised");

  return { success: true, message: "Entry updated" };
}

export async function deleteEntry(id: number) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error("❌ Unauthorised");

  return { success: true, message: "Entry deleted" };
}
