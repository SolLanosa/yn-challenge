"use client";
import { matchData } from "src/utils/matchData";
import { useEffect, useState } from "react";
import { Item } from "src/global";
import Cards from "../modules/Cards";
import Link from "next/link";
import { fetchCsv } from "@/utils/getCsvData";
export default function HomeView() {
  const [matches, setMatches] = useState<{ [key: string]: Item[] }>({});

  const fetchData = async () => {
    const investors = await fetchCsv("/investors.csv");
    const startups = await fetchCsv("/startups.csv");
    const industryMatches = matchData(investors, startups);
    setMatches(industryMatches);
    localStorage.setItem("matches", JSON.stringify(industryMatches));
  };

  useEffect(() => {
    const matchesLocal = localStorage.getItem("matches");
    const sessionInvestors = sessionStorage.getItem("investors");
    if (matchesLocal) {
      const parsedMatchesLocal = JSON.parse(matchesLocal);
      const parsedSessionInvestors = JSON.parse(sessionInvestors ?? "{}");
      setMatches({ ...parsedMatchesLocal, ...parsedSessionInvestors });
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1 className="text-center">Match</h1>
      <Link href={"/investor/new"} className="border rounded">
        Add Investor
      </Link>
      <Cards matches={matches} />
    </div>
  );
}
