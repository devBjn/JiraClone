import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Typography } from "@material-tailwind/react";
import ItemsPagination from "./ItemsPagination";

const TABLE_HEAD = [
  "Id",
  "Project Name",
  "Category",
  "Creator",
  "Members",
  "Actions",
];
export default function Pagination({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <table className="w-full ps-4 table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-black bg-white p-4">
                <Typography
                  variant="h5"
                  color="black"
                  className="font-semibold leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ItemsPagination currentItems={currentItems} />
        </tbody>
      </table>
      <div className="flex items-center justify-center mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<<"
          renderOnZeroPageCount={null}
          className="flex gap-4 items-center"
          pageLinkClassName="block rounded-[50%] w-10 h-10 p-3 text-center leading-[15px] cursor-pointer"
          disabledClassName="text-gray-500 font-semibold cursor-not-allowed"
          nextClassName="font-semibold"
          previousClassName="font-semibold"
          breakClassName="font-semibold"
        />
      </div>
    </>
  );
}
