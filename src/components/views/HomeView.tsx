"use client";
import { useFetchInvestors } from "src/hooks/useFetchInvestors";
import Cards from "../modules/Cards";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function HomeView() {
  const investors = useFetchInvestors();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = investors.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(investors.length / 10);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % investors.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-medium text-4xl mb-8">
        Get to know our investors
      </h1>
      <Link
        href={"/investor/new"}
        className=" bg-[#bf5baa5c] rounded-lg mb-8 py-4 px-6 hover:bg-[#ffffff42] font-light"
      >
        Add NEW Investor
      </Link>
      <Cards investors={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="w-full flex justify-center mt-20"
        pageClassName="mx-3"
      />
    </div>
  );
}
