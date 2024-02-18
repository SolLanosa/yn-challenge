import Papa from "papaparse";

import { Item } from "src/global";

const formatData = (data: Item[]) => {
  return data.map((item: Item) => {
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
