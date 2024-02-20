import { generateRandomStartupArray } from "./getRandomStartups";

export const addNewInvestor = (
  event: { preventDefault: () => void },
  newInvestor: string
) => {
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
