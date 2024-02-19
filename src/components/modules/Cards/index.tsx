import { Investor } from "src/types";
import Card from "../../atoms/Card";

interface CardsProps {
  investors: Investor[];
}

export default function Cards({ investors }: CardsProps) {
  return (
    <div className="flex flex-wrap justify-between items-center w-full max-w-4xl m-auto">
      {investors?.map((investor) => (
        <div
          key={investor.name}
          className="bg-[#ffffff5c] rounded-lg p-4 m-auto mb-4"
        >
          <Card investorName={investor.name} />
        </div>
      ))}
    </div>
  );
}
