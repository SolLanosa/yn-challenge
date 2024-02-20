"use client";

import Button from "@/components/atoms/Button";
import InputText from "@/components/atoms/InputText";
import { addNewInvestor } from "@/utils/addNewInvestor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInvestor() {
  const [newInvestor, setNewInvestor] = useState("");
  const router = useRouter();

  return (
    <main className="w-full flex flex-col w-full justify-center items-center">
      <h1 className="my-10 font-medium text-4xl">Add NEW Investor</h1>
      <form className="flex flex-col w-full justify-center items-center  bg-[#ffffff5c] max-w-xl rounded-xl p-3 max-md:max-w-full max-md:w-[90%]">
        <InputText
          id="name"
          label="Investor name:"
          onChange={(e: any) => setNewInvestor(e.target.value)}
        />
        <Button
          disabled={!newInvestor.length}
          onClick={(e) => {
            addNewInvestor(e, newInvestor);
            router.push(`/investor/${newInvestor}`);
          }}
        >
          Submit
        </Button>
      </form>
      <div className="mt-6 flex max-w-xl w-full max-md:max-w-full max-md:w-[90%]">
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
