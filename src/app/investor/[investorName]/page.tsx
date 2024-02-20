"use client";
import Button from "@/components/atoms/Button";
import InputText from "@/components/atoms/InputText";
import { addStartup } from "@/utils/addStartup";
import { deleteStartup } from "@/utils/deleteStartup";
import { updateName } from "@/utils/updateName";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFetchInvestors } from "src/hooks/useFetchInvestors";

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
      <form className="flex flex-col w-full justify-center items-center bg-[#ffffff5c] max-w-xl rounded-xl p-3 max-md:max-w-full max-md:w-[90%]">
        <InputText
          id="update"
          label="Do you wish to update your name?"
          onChange={(e) => setUpdatedName(e.target.value)}
        />
        <Button
          disabled={!updatedName}
          onClick={(e) => updateName(e, updatedName, investor!, router)}
        >
          Submit
        </Button>
      </form>
      <div className="my-6">
        <span className="text-lg font-extralight">
          {investor?.name} interest: {investor?.industry}
        </span>
      </div>
      <div className="flex flex-col w-full justify-center items-center max-w-xl  bg-[#ffffff5c] rounded-xl p-3 max-md:max-w-full max-md:w-[90%]">
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
                <Button
                  className="font-extralight ml-4"
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
                </Button>
              </div>
            ))}
            {investor?.startups.length! < 10 && (
              <Button
                className="font-extralight w-32"
                onClick={() => {
                  addStartup(investor!);
                  refetch();
                }}
              >
                Add startup
              </Button>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex max-w-xl w-full max-md:max-w-full max-md:w-[90%]">
        <Link
          href={"/"}
          className="bg-[#ffffff5c] w-24 p-1.5 rounded-full w-24 font-extralight"
        >
          {`< Go back`}
        </Link>
      </div>
    </main>
  );
}
