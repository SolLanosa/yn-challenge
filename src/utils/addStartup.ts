import { Investor } from "src/types";
import { generateRandomStartup } from "./getRandomStartups";

export const addStartup = (investor: Investor) => {
  const sessionInvestors = sessionStorage.getItem("investors");
  let deletedStartups = investor?.deletedStartups;
  let startups = investor?.startups;

  if (investor?.deletedStartups.length! > 0) {
    const deletedStartupPoped = deletedStartups?.pop();
    startups?.push(deletedStartupPoped!);
  } else {
    const newStartup = generateRandomStartup();
    investor?.startups.push(newStartup);
  }

  if (sessionInvestors) {
    const investorsParsed = JSON.parse(sessionInvestors ?? "[]");

    sessionStorage.setItem(
      "investors",
      JSON.stringify([
        ...investorsParsed,
        {
          name: investor?.name,
          industry: investor?.industry,
          startups: startups,
          originalName: investor?.originalName,
          deletedStartups: deletedStartups,
        },
      ])
    );
  } else {
    sessionStorage.setItem(
      "investors",
      JSON.stringify([
        {
          name: investor?.name,
          industry: investor?.industry,
          startups: startups,
          originalName: investor?.originalName,
          deletedStartups: deletedStartups,
        },
      ])
    );
  }
};
