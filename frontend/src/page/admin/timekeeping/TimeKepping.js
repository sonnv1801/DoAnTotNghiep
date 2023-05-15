import React, { useEffect, useState } from "react";
import "./style.css";
import TableTimeKp from "./../../../components/table-tiemkeeping/TableTimeKp";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllStaff,
  listWorkStaff,
} from "../../../redux/actions/staff.action";
import Paginate from "../../../components/pagination/Pagination";

import _ from "lodash";

export const TimeKeeping = () => {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const staffWorkHour = listWorkStaff(listKeeping);
  const DepOption = _.uniqBy(staffWorkHour, "Dep");

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  const user = JSON.parse(localStorage.getItem("token"));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchDep, setSearchDep] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSearchMonth(event.target.value);
  };

  const handleDepChange = (event) => {
    setSearchDep(event.target.value);
  };

  const filteredStudents = staffWorkHour.filter((staff) => {
    const nameMatch = staff.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const depMatch = staff.Dep.toLowerCase().includes(searchDep.toLowerCase());
    const monthMatch = searchMonth
      ? staff.day.includes(`-${searchMonth}-`)
      : true;
    return nameMatch && monthMatch && depMatch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentStaff = filteredStudents.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredStudents.length / usersPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="container mb-4 mt-8 ">
      <div className="text-base font-bold uppercase mb-4 border-l-4 border-indigo-500 ">
        {user?.role === true ? (
          <>
            <p className="ml-4">Bảng công</p>
          </>
        ) : (
          <>
            <p className="ml-2">Thời gian đi làm</p>
          </>
        )}
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 w-[90%] m-auto">
          <div className="w-7/12 mt-2  ">
            <div class="max-w-2xl mt-2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="w-7/12 my-2">
            <select
              className="w-full h-8 my-2 rounded-md border border-gray-200"
              onChange={handleMonthChange}
            >
              <option value="">Chọn Tháng</option>
              <option value="01">Tháng 1</option>
              <option value="02">Tháng 2</option>
              <option value="03">Tháng 3</option>
              <option value="04">Tháng 4</option>
              <option value="05">Tháng 5</option>
              <option value="06">Tháng 6</option>
              <option value="07">Tháng 7</option>
              <option value="08">Tháng 8</option>
              <option value="09">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>
          <div className="w-7/12 my-2">
            <div>
              <select
                className="w-full h-8 my-2 rounded-md border border-gray-200"
                onChange={handleDepChange}
              >
                <option value="">Tất cả phòng ban</option>
                {DepOption.map((item, index) => (
                  <option value={item.Dep} key={index}>
                    {item.Dep}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <TableTimeKp
          staffkeeping={staffWorkHour}
          filteredStudents={currentStaff}
        />
        <div className="pagination">
          <Paginate
            handleClickPrev={handlePreviousPage}
            handleClickNext={handleNextPage}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
