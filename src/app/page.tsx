"use client";
import { useState } from "react";
import { Day } from "@/components/day";

export default function Home() {
  const [date, setDate] = useState(new Date());
  return <Day date={date} setDate={setDate} />;
}
