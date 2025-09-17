"use client";

import graduation from "../assets/graduation.svg";
import Image from "next/image";

export interface Props {
  handler: () => void;
}

export default function ResultCard({ handler }: Props) {
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  return (
    <div className="w-full p-6 mt-12 bg-orange-500/50 rounded-2xl">
      <Image alt="graduation" src={graduation} />

      <p className="text-slate-800 font-bold">Completed on {date}</p>
      <p className="text-slate-800">
        Well done on completing your test. You can view the results now
      </p>
      <button
        className="btn btn-primary bg-orange-500 border-orange-300 rounded-md"
        onClick={handler}
      >
        See your results
      </button>
    </div>
  );
}
