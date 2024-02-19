import { fetchCsv } from "@/utils/getCsvData";
import { matchData } from "@/utils/matchData";
import { useCallback, useEffect, useState } from "react";
import { Investor } from "src/types";

export const useFetchInvestors = () => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataFromCsv = useCallback(async () => {
    const loadedInvestors = await fetchCsv("/investors.csv");
    const loadedStartups = await fetchCsv("/startups.csv");
    const matchedInvestors = matchData(loadedInvestors, loadedStartups);
    setInvestors(matchedInvestors);
    localStorage.setItem("investors", JSON.stringify(matchedInvestors));
  }, []);

  const fetchInvestor = useCallback(() => {
    try {
      const localInvestors = localStorage.getItem("investors");
      const sessionInvestors = sessionStorage.getItem("investors");

      if (localInvestors) {
        const parsedLocalInvestors = JSON.parse(localInvestors);
        const parsedSessionInvestors = JSON.parse(sessionInvestors ?? "[]");
        const setOriginalNameSessionInvestors = new Set(
          parsedSessionInvestors.map(
            ({ originalName }: Investor) => originalName
          )
        );
        const filteredDuplicateLocalInvestors = parsedLocalInvestors.filter(
          ({ originalName }: Investor) =>
            !setOriginalNameSessionInvestors.has(originalName)
        );

        let sessionInvestorsObj: { [key: string]: Investor } = {};

        parsedSessionInvestors.forEach((obj: Investor) => {
          sessionInvestorsObj[obj.originalName] = obj;
        });

        const filteredDuplicateSessionInvestors =
          Object.values(sessionInvestorsObj);

        setInvestors([
          ...filteredDuplicateLocalInvestors,
          ...filteredDuplicateSessionInvestors,
        ]);
      } else {
        fetchDataFromCsv();
      }
    } catch (error) {
      setError("Error");
    } finally {
      setIsLoading(false);
    }
  }, [fetchDataFromCsv]);

  useEffect(() => {
    fetchInvestor();
  }, [fetchInvestor]);

  return { investors, refetch: fetchInvestor, isLoading, error };
};
