import Papa from "papaparse";

import { RawInvestor, Startup } from "src/types";

const formatData = (data: RawInvestor[] | Startup[]) => {
  return data.map((item: RawInvestor) => {
    const array = Object.values(item);
    return {
      name: array[0],
      industry: array[1],
    };
  });
};

export const fetchCsv = async (filePath: string) => {
  const response = await fetch(filePath);
  const reader = response.body!.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csvString = decoder.decode(result.value!);
  const { data } = Papa.parse(csvString, {});
  const newData = formatData(data);
  return newData;
};
