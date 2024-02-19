"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFetchInvestors } from "src/hooks/useFetchInvestors";

export default function InvestorPage() {
  const [updatedName, setUpdatedName] = useState("");
  const router = useRouter();
  const params = useParams<{ investorName: string }>();
  const investors = useFetchInvestors();
  const investor = investors.find(
    (investor) => investor.name === params.investorName
  );

  const updateName = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const sessionInvestors = sessionStorage.getItem("investors");

    if (sessionInvestors) {
      const investorsParsed = JSON.parse(sessionInvestors ?? "[]");
      sessionStorage.setItem(
        "investors",
        JSON.stringify([
          ...investorsParsed,
          {
            name: updatedName,
            industry: investor?.industry,
            startups: investor?.startups,
            originalName: investor?.originalName,
            deletedStartups: investor?.deletedStartups,
          },
        ])
      );
    } else {
      sessionStorage.setItem(
        "investors",
        JSON.stringify([
          {
            name: updatedName,
            industry: investor?.industry,
            startups: investor?.startups,
            deletedStartups: investor?.deletedStartups,
            originalName: investor?.originalName,
          },
        ])
      );
    }
    router.push("/");
  };

  return (
    <main className="flex w-full flex-col  justify-center items-center pb-6">
      <h1 className="my-6 font-medium text-4xl">{investor?.name}</h1>
      <form className="flex flex-col w-full justify-center items-center bg-[#ffffff5c] max-w-xl rounded-xl p-3">
        <label htmlFor="update" className="mb-4 text-lg font-extralight">
          Do you wish to update your name?
        </label>
        <input
          className="mb-4"
          type="text"
          id="update"
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <button
          disabled={!updatedName}
          className=" bg-[#ffffff5c] w-24 px-1.5 py-1 rounded-xl disabled:cursor-no-drop"
          onClick={updateName}
        >
          Submit
        </button>
      </form>
      <div className="my-6">
        <span className="text-lg font-extralight">
          {investor?.name} interest: {investor?.industry}
        </span>
      </div>
      <div className="flex flex-col w-full justify-center items-center max-w-xl  bg-[#ffffff5c] rounded-xl p-3">
        <span className="mb-4 text-lg font-extralight">Startups:</span>
        <div>
          <ul>
            {investor?.startups.map((startup, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full mb-3"
              >
                <li className="font-extralight">
                  {index + 1}. {startup.name} - {startup.industry}
                </li>
                <button className="border w-24 p-px rounded-xl ml-4 font-extralight">
                  Delete
                </button>
              </div>
            ))}
            {investor?.startups.length! < 10 && (
              <button className="border w-24 px-1.5 py-1 rounded-xl font-extralight">
                Add startup
              </button>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex max-w-xl  w-full">
        <Link
          href={"/"}
          className=" bg-[#ffffff5c] w-24 px-1.5 py-1 rounded-xl w-24 font-extralight"
        >
          {`< Go back`}
        </Link>
      </div>
    </main>
  );
}
