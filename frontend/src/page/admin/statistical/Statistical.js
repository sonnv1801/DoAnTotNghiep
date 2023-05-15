import React, { useEffect, useState } from "react";
import "./style.css";
import TableStatistical from "../../../components/tablestatistical/TableStatistical";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { salaryStaffWithDep } from "../../../redux/actions/salary.action";
import {
  getAllStaff,
  listWorkStaff,
} from "../../../redux/actions/staff.action";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
export const Statistical = (rows) => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [departm, setDepartm] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const user = JSON.parse(localStorage.getItem("token"));

  const [fillerDay, setFillerDay] = useState("desc");
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const salaryDep = useSelector((state) => state.defaultReducer.listSalary);
  const staffWorkHour = listWorkStaff(listKeeping);
  const filteredData = _.uniqBy(listKeeping, "Dep");

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  const salaryDataWithSalaryDep = salaryStaffWithDep(
    fillerDay,
    staffWorkHour,
    month,
    year,
    salaryDep,
    departm,
    nameFilter
  );

  // hàm xử lý khi người dùng thay đổi tháng
  function handleMonthChange(event) {
    const selectedMonth = Number(event.target.value);
    setMonth(selectedMonth);
  }

  function handleMonthChangeYear(event) {
    const selectedYear = Number(event.target.value);
    setYear(selectedYear);
  }

  function handleSortChange(event) {
    const sortedList = String(event.target.value);
    setFillerDay(sortedList);
  }
  function handleDepartm(event) {
    const departm = String(event.target.value);
    setDepartm(departm);
  }

  const handleSearchChange = (event) => {
    setNameFilter(event.target.value);
  };
  return (
    <div className="mb-4 ml-4 mt-8 ">
      <div className="text-base font-bold uppercase mb-4 border-l-4 border-indigo-500 ">
        <p className="ml-2">Tính lương</p>
      </div>
      <div className="w-[90%] m-auto">
        <div className="header-statistical">
          <div className="w-full">
            <div className="grid  gap-8 text-sm xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-1">
              <div className="w-full">
                <div class="max-w-2xl ">
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
              <div className="w-full  ">
                <select
                  className="w-full h-8 border border-gray-800 rounded-md"
                  value={year}
                  onChange={handleMonthChangeYear}
                >
                  <option value="">Chọn Năm</option>
                  <option value={2023}>Năm 2023</option>
                  <option value={2024}>Năm 2024</option>
                  <option value={2025}>Năm 2025</option>
                  <option value={2026}>Năm 2026</option>
                  <option value={2027}>Năm 2027</option>
                  <option value={2028}>Năm 2028</option>
                  <option value={2029}>Năm 2029</option>
                  <option value={2030}>Năm 2030</option>
                  <option value={2031}>Năm 2031</option>
                  <option value={2032}>Năm 2032</option>
                  <option value={2033}>Năm 2033</option>
                </select>
              </div>
              <div className="w-full">
                <select
                  className="w-full h-8 border border-gray-800 rounded-md"
                  value={month}
                  onChange={handleMonthChange}
                >
                  <option value="">Chọn Tháng</option>
                  <option value={1}>Tháng 1</option>
                  <option value={2}>Tháng 2</option>
                  <option value={3}>Tháng 3</option>
                  <option value={4}>Tháng 4</option>
                  <option value={5}>Tháng 5</option>
                  <option value={6}>Tháng 6</option>
                  <option value={7}>Tháng 7</option>
                  <option value={8}>Tháng 8</option>
                  <option value={9}>Tháng 9</option>
                  <option value={10}>Tháng 10</option>
                  <option value={11}>Tháng 11</option>
                  <option value={12}>Tháng 12</option>
                </select>
              </div>
              <div className="w-full">
                <select
                  className="w-full h-8 border border-gray-800 rounded-md"
                  value={departm}
                  onChange={handleDepartm}
                >
                  <option value="">Chọn Phòng Ban</option>
                  {filteredData?.map((item, index) => (
                    <option key={index} value={item.Dep}>
                      {item.Dep}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <select
                  className="w-full h-8 border border-gray-800 rounded-md"
                  id="sort"
                  value={fillerDay}
                  onChange={handleSortChange}
                >
                  <option value="desc">Từ cao đến thấp</option>
                  <option value="asc">Từ thấp đến cao</option>
                </select>
              </div>
              <div>
                {user.role === true ? (
                  <button
                    className="rounded-md py-1 border-2  px-3 bg-blue-400   font-bold text-white text-base float-right"
                    variant="outlined"
                  >
                    <CSVLink
                      className=""
                      data={salaryDataWithSalaryDep}
                      filename={"Chấm công.csv"}
                    >
                      Xuất File
                    </CSVLink>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
          <TableStatistical
            monthStaff={month}
            yearStaff={year}
            fillerDay={fillerDay}
            departmStaff={departm}
            nameFilter={nameFilter}
          />
        </div>
      </div>
    </div>
  );
};
