"use server";

import { stackServerApp } from "@/stack/server";
import type { EntryInput } from "@/app/types/entry";
import { entries } from "@/data/entries";

export async function getEntries() {
  return entries;
}

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
