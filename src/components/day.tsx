"use client";
import { addDays, format } from "date-fns";
import type { Dispatch, SetStateAction } from "react";

export const Day = ({
  date = new Date(),
  setDate,
}: {
  date?: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const prev = () => {
    setDate(addDays(date, -1));
  };
  const next = () => {
    setDate(addDays(date, 1));
  };

  return (
    <div className="flex justify-center items-center p-4 mt-10">
      <button type="button" onClick={prev} className="underline">
        prev
      </button>
      <h1 className="font-bold min-w-100 p-4 text-center">
        {format(date, "EEEE, d MMMM, yyyy")}
      </h1>
      <button type="button" onClick={next} className="underline">
        next
      </button>
    </div>
  );
};
