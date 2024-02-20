import { Startup, RawInvestor, Investor } from "src/types";

export const matchData = (investors: RawInvestor[], startups: Startup[]) => {
  const newMatches: { [key: string]: Investor } = {};
  let matchedStartups: Startup[] = [];

  const investorsSorted = investors.sort((a, b) => {
    const nameA = a.industry.toUpperCase();
    const nameB = b.industry.toUpperCase();
    return nameB.localeCompare(nameA);
  });

  investorsSorted.forEach((investor) => {
    const investorName = investor.name;
    const industryPreference = investor.industry;
    let startupSliced: Startup[] = [];
    if (industryPreference === "any") {
      const startupName = new Set(
        matchedStartups.map(({ name }: Startup) => name)
      );
      const filteredStartup = startups.filter(
        ({ name }: Startup) => !startupName.has(name)
      );
      startupSliced = filteredStartup.slice(0, 10);
      matchedStartups = matchedStartups.concat(startupSliced);
    } else {
      const startupName = new Set(
        matchedStartups.map(({ name }: Startup) => name)
      );
      const filteredStartup = startups.filter(
        ({ name }: Startup) => !startupName.has(name)
      );
      startupSliced = filteredStartup
        .filter((startup) => startup.industry === industryPreference)
        .slice(0, 10);
      matchedStartups = matchedStartups.concat(startupSliced);
    }

    newMatches[investorName] = {
      name: investorName,
      industry: industryPreference,
      startups: startupSliced,
      deletedStartups: [],
      originalName: investorName,
    };
  });

  return Object.values(newMatches);
};
