"use client";
import { matchData } from "src/utils/matchData";
import { useEffect, useState } from "react";
import { Item } from "src/global";
import Cards from "../modules/Cards";
import { fetchCsv } from "../../utils/getCsvData";
import Link from "next/link";
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
    if (matchesLocal) {
      console.log(matchesLocal);
      setMatches(JSON.parse(matchesLocal));
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
