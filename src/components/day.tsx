"use client";
import { addDays, format } from "date-fns";
import {
  CalendarIcon,
  CircleIcon,
  CornerDownLeftIcon,
  DotIcon,
  HashIcon,
  MinusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { EntryInput } from "@/app/types/entry";
import { createEntry, getEntries, updateEntry } from "@/app/actions/entries";

export const Day = ({ date }: { date: Date }) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(0);

  const router = useRouter();
  const prev = () => {
    router.push(`/day/${format(addDays(date, -1), "yyyy-MM-dd")}`);
    // setDate(addDays(date, -1));
  };
  const next = () => {
    router.push(`/day/${format(addDays(date, 1), "yyyy-MM-dd")}`);
    // setDate(addDays(date, 1));
  };

  useEffect(() => {
    const getEntriesFromAction = async () => {
      setEntries(await getEntries());
    };
    getEntriesFromAction();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content) return false;

    setIsSubmitting(true);

    try {
      const payload: EntryInput = {
        type: "task",
        content,
        date: new Date(date),
        completed: false,
      };

      if (isEditing && id) {
        await updateEntry(id, payload);
        alert("Entry updated (stub)");
      } else {
        await createEntry(payload);
        const id = entries.length + 1;
        entries.push({
          id,
          date: format(date, "yyyy-MM-dd"),
          content: payload.content,
          completed: payload.completed,
          type: payload.type,
        });
      }
      setContent("");
    } catch (err) {
      console.error("Error submitting entry:", err);
      alert("Failed to submit entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center p-4">
        <button type="button" onClick={prev} className="underline">
          prev
        </button>
        <h1 className="font-bold w-xl p-4 text-center text-6xl">
          {format(date, "EEEE, d MMMM, yyyy")}
        </h1>
        <button type="button" onClick={next} className="underline">
          next
        </button>
      </div>
      <div className="flex flex-col max-w-xl mx-auto p-2 mb-5">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center p-1 gap-2">
            <span className="text-muted-forground">
              {entry.type === "task" && <DotIcon size="16" />}
              {entry.type === "event" && <CircleIcon size="16" />}
              {entry.type === "note" && <MinusIcon size="16" />}
            </span>
            {entry.content}
          </div>
        ))}
      </div>
      <form className="mx-auto max-w-xl" onSubmit={handleSubmit}>
        <Label htmlFor="new" className="pb-1">
          Add new
        </Label>
        <div className="flex max-w-xl justify-center items-center mx-auto space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <CircleIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <DotIcon />
                  Task
                  <DropdownMenuShortcut>T</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleIcon />
                  Event
                  <DropdownMenuShortcut>E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MinusIcon />
                  Note
                  <DropdownMenuShortcut>N</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            placeholder="new event..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <CornerDownLeftIcon />
          </Button>
          <Button variant="outline" size="icon">
            <HashIcon />
          </Button>
          <Button variant="outline" size="icon">
            <CalendarIcon />
          </Button>
        </div>{" "}
      </form>
    </div>
  );
};
