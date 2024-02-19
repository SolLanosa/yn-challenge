"use client";

import { generateRandomStartupArray } from "@/utils/getRandomStartups";
import Link from "next/link";
import { useState } from "react";

export default function NewInvestor() {
  const [newInvestor, setNewInvestor] = useState("");
  const storeData = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newStartups = generateRandomStartupArray();
    const investors = sessionStorage.getItem("investors");

    if (investors) {
      const investorsParsed = JSON.parse(investors);
      sessionStorage.setItem(
        "investors",
        JSON.stringify([
          ...investorsParsed,
          {
            name: newInvestor,
            industry: "any",
            startups: newStartups,
            deletedStartups: [],
            originalName: newInvestor,
          },
        ])
      );
    } else {
      sessionStorage.setItem(
        "investors",
        JSON.stringify([
          {
            name: newInvestor,
            industry: "any",
            startups: newStartups,
            deletedStartups: [],
            originalName: newInvestor,
          },
        ])
      );
    }
  };

  return (
    <main className="w-full flex flex-col w-full justify-center items-center">
      <h1 className="my-10 font-medium text-4xl">Add NEW Investor</h1>
      <form className="flex flex-col w-full justify-center items-center  bg-[#ffffff5c] max-w-xl rounded-xl p-3">
        <label htmlFor="name" className="mb-4">
          Investor name:
        </label>
        <input
          className="mb-4"
          type="text"
          id="name"
          onChange={(e: any) => setNewInvestor(e.target.value)}
        />
        <button
          disabled={!newInvestor.length}
          onClick={(e) => storeData(e)}
          className="border w-24 px-1.5 py-1 rounded-xl disabled:cursor-no-drop"
        >
          Submit
        </button>
      </form>
      <div className="mt-6 flex max-w-xl w-full">
        <Link
          href={"/"}
          className=" bg-[#ffffff5c] w-24 px-1.5 py-1 rounded-xl w-24"
        >
          {`< Go back`}
        </Link>
      </div>
    </main>
  );
}
