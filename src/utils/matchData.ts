import { Item } from "src/global";

export const matchData = (investors: Item[], startups: Item[]) => {
  const newMatches: { [key: string]: Item[] } = {};

  investors.forEach((investor) => {
    const investorName = investor.name;
    const industryPreference = investor.industry;

    let matchedStartups: Item[] = [];
    if (industryPreference === "any") {
      matchedStartups = startups.slice(0, 10);
    } else {
      matchedStartups = startups
        .filter((startup) => startup.industry === industryPreference)
        .slice(0, 10);
    }

    newMatches[investorName] = matchedStartups;
  });

  return newMatches;
};
