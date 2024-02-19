"use client";
import { addStartup } from "@/utils/addStartup";
import { deleteStartup } from "@/utils/deleteStartup";
import { updateName } from "@/utils/updateName";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useFetchInvestors } from "src/hooks/useFetchInvestors";
import { Investor } from "src/types";

export default function InvestorPage() {
  const [updatedName, setUpdatedName] = useState("");
  const params = useParams<{ investorName: string }>();
  const router = useRouter();
  const { investors, isLoading, refetch } = useFetchInvestors();

  const investor = investors.find(
    (investor) => investor.name === params.investorName
  );

  if (isLoading) {
    return <div>...isLoading</div>;
  }

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
          onClick={(e) => updateName(e, updatedName, investor!, router)}
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
                <button
                  className="border w-24 p-px rounded-xl ml-4 font-extralight"
                  onClick={() => {
                    deleteStartup(
                      {
                        name: startup.name,
                        industry: startup.industry,
                      },
                      investor!
                    );
                    refetch();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            {investor?.startups.length! < 10 && (
              <button
                className="border w-24 px-1.5 py-1 rounded-xl font-extralight"
                onClick={() => {
                  addStartup(investor!);
                  refetch();
                }}
              >
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
