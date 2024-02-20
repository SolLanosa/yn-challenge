"use client";
import { useFetchInvestors } from "src/hooks/useFetchInvestors";
import Cards from "../modules/Cards";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function HomeView() {
  const { investors, isLoading } = useFetchInvestors();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 10;
  const currentItems = investors.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(investors.length / 10);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % investors.length;
    setItemOffset(newOffset);
  };

  if (isLoading) {
    return <div>...isLoading</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center font-medium text-4xl mb-8">
        Get to know our investors
      </h1>
      <Link
        href={"/investor/new"}
        className="border-[#bf5baa5c] border rounded-full mb-8 py-4 px-6 hover:bg-[#bf5baa5c] font-light"
      >
        Add NEW Investor
      </Link>
      <Cards investors={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        className="w-full flex justify-center mt-20 items-center font-extralight"
        pageClassName="mx-2"
        activeLinkClassName="border border-[#bf5baa5c] rounded-full hover:bg-[#bf5baa5c] p-2 rounded-md"
        previousClassName="border border-[#bf5baa5c] rounded-full hover:bg-[#bf5baa5c] p-2 rounded-md mr-6 max-md:mr-1"
        nextClassName=" border border-[#bf5baa5c] rounded-full hover:bg-[#bf5baa5c] p-2 rounded-md ml-6 max-md:ml-1"
      />
    </div>
  );
}
