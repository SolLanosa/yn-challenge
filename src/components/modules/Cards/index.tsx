import { Item } from "src/global";
import Card from "../../atoms/Card";

interface CardsProps {
  matches: { [key: string]: Item[] };
}

export default function Cards({ matches }: CardsProps) {
  return (
    <div className="flex flex-wrap justify-between items-center w-full m-auto">
      {Object.keys(matches).map((investorName) => (
        <div
          key={investorName}
          className="border-radius border border-black rounded-lg p-4 m-auto mb-4"
        >
          <Card investorName={investorName} />
        </div>
      ))}
    </div>
  );
}
