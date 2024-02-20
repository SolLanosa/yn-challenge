import Link from "next/link";

interface CardProps {
  investorName: string;
  investorIndustry: string;
}

export default function Card({ investorName, investorIndustry }: CardProps) {
  return (
    <Link href={`investor/${investorName}`}>
      <p>Investor: {investorName}</p>
      <p>Interest: {investorIndustry}</p>
    </Link>
  );
}
