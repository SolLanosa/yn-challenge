import { Startup, RawInvestor, Investor } from "src/types";

export const matchData = (investors: RawInvestor[], startups: Startup[]) => {
  const newMatches: { [key: string]: Investor } = {};

  investors.forEach((investor) => {
    const investorName = investor.name;
    const industryPreference = investor.industry;

    let matchedStartups: Startup[] = [];
    if (industryPreference === "any") {
      matchedStartups = startups.slice(0, 10);
    } else {
      matchedStartups = startups
        .filter((startup) => startup.industry === industryPreference)
        .slice(0, 10);
    }

    newMatches[investorName] = {
      name: investorName,
      industry: industryPreference,
      startups: matchedStartups,
      deletedStartups: [],
      originalName: investorName,
    };
  });

  return Object.values(newMatches);
};
