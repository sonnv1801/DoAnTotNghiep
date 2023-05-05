import React, { useEffect, useState } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import Tables from "./tables/Tables";
import Paginate from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff, searchStaff } from "../../redux/actions/staff.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
const itemsPerPage = 5;

export const List = () => {
  const dispatch = useDispatch();

  const listStaff = useSelector((state) => state.defaultReducer.listStaff);
  const [key, setkey] = useState("");
  const handleChange = (e) => {
    const key = e.target.value;
    setkey(key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchStaff(key));
    // setkey("")
    if (key.length <= 0) {
      toast.warning("Vui lòng không để trống trường này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //Phân Trang
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const datalist = _.uniqBy(listStaff, "Student_Id");

  useEffect(() => {
    dispatch(getAllStaff());
    const data = datalist;
    setItems(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, []);

  const handleClickPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleChangeItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setCurrentPage(1);
    setTotalPages(Math.ceil(items.length / value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);
  return (
    <div className="w-full mb-4">
      <ToastContainer />
      <div className="text-base font-bold uppercase mb-4 border-l-4 border-indigo-500 ">
        <p className="ml-2">Thông tin nhân viên</p>
      </div>
      <div className="max-w-sm my-4">
        <form className="flex items-center" onSubmit={handleSearch}>
          <label for="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div>
        <Tables listStaff={listStaff.listStaff} />
      </div>
      <div className="mt-4 flex justify-center">
        <Paginate />
      </div>
      <div className="ilst-table">
        <Tables listStaff={visibleItems} />
      </div>
      <div className="pagination">
        <Paginate
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
