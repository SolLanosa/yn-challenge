import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "classnames";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-gradient-to-r from-[#e5e6d3] from-10% via-[#e8bdd0] via-40% to-[#e5e6d3] to-90% "
        )}
      >
        {children}
      </body>
    </html>
  );
}
