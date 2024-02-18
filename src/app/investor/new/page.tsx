"use client";

import { generateRandomStartupArray } from "@/utils/getRandomStartups";
import { useState } from "react";

export default function NewInvestor() {
  const [newInvestor, setNewInvestor] = useState("");

  const storeData = (e: SubmitEvent) => {
    e.preventDefault();
    const newStartups = generateRandomStartupArray();
    const investors = sessionStorage.getItem("investors");

    if (investors) {
      const investorsParsed = JSON.parse(investors);
      sessionStorage.setItem(
        "investors",
        JSON.stringify({ ...investorsParsed, [newInvestor]: newStartups })
      );
    } else {
      sessionStorage.setItem(
        "investors",
        JSON.stringify({ [newInvestor]: newStartups })
      );
    }
  };

  return (
    <main>
      <form>
        <label htmlFor="name">Investor name</label>
        <input
          type="text"
          id="name"
          onChange={(e: any) => setNewInvestor(e.target.value)}
        />
        <button onClick={storeData}>submit</button>
      </form>
    </main>
  );
}
