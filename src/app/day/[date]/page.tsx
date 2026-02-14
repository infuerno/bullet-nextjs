"use client";
import { useParams } from "next/navigation";
import { Day } from "@/components/day";

export default function ViewDayPage() {
  const { date } = useParams<{ date: string }>();
  return <Day date={new Date(date)} />;
}
