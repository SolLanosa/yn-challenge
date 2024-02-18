import Link from "next/link";

interface CardProps {
  investorName: string;
}

export default function Card({ investorName }: CardProps) {
  return (
    <Link href={`investor/${investorName}`}>
      <p>Investor: {investorName}</p>
    </Link>
  );
}
