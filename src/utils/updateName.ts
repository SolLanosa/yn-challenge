import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Investor } from "src/types";

export const updateName = (
  e: { preventDefault: () => void },
  updatedName: string,
  investor: Investor,
  router: AppRouterInstance
) => {
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
