import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
export default function Paginate({
  handleClickPrev,
  handleClickNext,
  handlePageClick,
  currentPage,
  totalPages,
}) {
  return (
    <div className="flex justify-center mt-4 mb-14">
      <button
        className="mr-2   px-4 py-2 rounded btnx bg-white"
        onClick={handleClickPrev}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeftIcon />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`mr-2  px-4 py-2 rounded  btnx  ${
            currentPage === index + 1
              ? "active bg-red-700 text-gray-50"
              : "bg-white"
          } `}
        >
          {index + 1}
        </button>
      ))}
      <button
        className=" px-4 py-2 rounded btnx bg-white"
        onClick={handleClickNext}
        disabled={currentPage === totalPages}
      >
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );
}
