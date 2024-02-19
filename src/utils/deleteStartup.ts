import { Investor, Startup } from "src/types";

export const deleteStartup = (startupDeleted: Startup, investor: Investor) => {
  const sessionInvestors = sessionStorage.getItem("investors");
  if (sessionInvestors) {
    const investorsParsed = JSON.parse(sessionInvestors ?? "[]");
    investor?.deletedStartups.push(startupDeleted);
    sessionStorage.setItem(
      "investors",
      JSON.stringify([
        ...investorsParsed,
        {
          name: investor?.name,
          industry: investor?.industry,
          startups: investor?.startups.filter(
            (startup) => startup.name !== startupDeleted.name
          ),
          originalName: investor?.originalName,
          deletedStartups: investor?.deletedStartups,
        },
      ])
    );
  } else {
    investor?.deletedStartups.push(startupDeleted);
    sessionStorage.setItem(
      "investors",
      JSON.stringify([
        {
          name: investor?.name,
          industry: investor?.industry,
          startups: investor?.startups.filter(
            (startup) => startup.name !== startupDeleted.name
          ),
          originalName: investor?.originalName,
          deletedStartups: investor?.deletedStartups,
        },
      ])
    );
  }
};
