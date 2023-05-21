import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paginate from ".././pagination/Pagination";
import Paper from "@mui/material/Paper";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff, listWorkStaff } from "../../redux/actions/staff.action";
import {
  getAllSalary,
  salaryStaffWithDep,
} from "../../redux/actions/salary.action";

export default function BasicTable({
  monthStaff,
  yearStaff,
  fillerDay,
  departmStaff,
  nameFilter,
}) {
  const user = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const salaryDep = useSelector((state) => state.defaultReducer.listSalary);
  const staffWorkHour = listWorkStaff(listKeeping, "staffWorkHour");

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  useEffect(() => {
    dispatch(getAllSalary());
  }, []);

  const salaryDataWithSalaryDep = salaryStaffWithDep(
    fillerDay,
    staffWorkHour,
    monthStaff,
    yearStaff,
    salaryDep,
    departmStaff,
    nameFilter
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 100;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentStaff = salaryDataWithSalaryDep.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(salaryDataWithSalaryDep.length / usersPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(currentStaff, "currentStaffcurrentStaff");
  return (
    <>
      {currentStaff.length === 0 ? (
        <>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span
            style={{
              color: "red",
              marginLeft: "1rem",
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
          >
            Nhập dữ liệu cho đúng nha..
          </span>
        </>
      ) : (
        <>
          {user.role === true ? (
            <>
              <div className="w-[100%] m-auto">
                <div className="col-span-12">
                  <div className="overflow-auto lg:overflow-visible ">
                    <table
                      className="table text-white border-separate space-y-6 text-sm "
                      id="main-table"
                    >
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3 text-center">ID</th>
                          <th className="p-3 text-center">Tên Nhân Viên</th>
                          <th className="p-3 text-center">Phòng Ban</th>
                          <th className="p-3 text-center">Năm</th>
                          <th className="p-3 text-center">Số Giờ Công</th>
                          <th className="p-3 text-center">Số Công</th>
                          <th className="p-3 text-center">Lương cơ bản</th>
                          <th className="p-3 text-center"> Lương thực tế</th>
                          <th className="p-3 text-center">Phụ cấp</th>
                          <th className="p-3 text-center"> BHXH</th>
                          <th className="p-3 text-center"> BHYT</th>
                          <th className="p-3 text-center">Thực nhận</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStaff.map((item, index) => (
                          <tr className="bg-gray-800">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{item.id}</td>
                            <td className="p-3 font-bold">{item.name}</td>
                            <td className="p-3 font-bold">{item.department}</td>
                            <td className="p-3 font-bold">{`${item.month}/${item.year}`}</td>
                            <td className="p-3 font-bold">
                              {item.worktime.toFixed(2).toString()}
                            </td>
                            <td className="p-3 font-bold">{` ${item.total_days
                              .toFixed(2)
                              .toString()} `}</td>
                            <td className="p-3 font-bold">
                              {item.basicSalary.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.salaryStaff.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>

                            <td className="p-3">
                              {item.total_days < 26 ? (
                                <span className="bg-red-400 text-gray-50 rounded-md px-3">
                                  Không
                                </span>
                              ) : (
                                <span className="bg-green-400 text-gray-50 rounded-md px-2">
                                  {item.allowance.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              )}
                            </td>
                            <td className="p-3 font-bold">
                              {item.social_insurance.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.health_insurance.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.total.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[100%] m-auto">
                <div className="col-span-12">
                  <div className="overflow-auto lg:overflow-visible ">
                    <table
                      className="table text-white border-separate space-y-6 text-sm text-center"
                      id="main-table"
                    >
                      <thead className="bg-gray-800 text-white">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3 ">ID</th>
                          <th className="p-3 ">Tên Nhân Viên</th>
                          <th className="p-3 ">Phòng Ban</th>
                          <th className="p-3 ">Năm</th>
                          <th className="p-3 ">Số Giờ Công</th>
                          <th className="p-3 ">Số Công</th>
                          {/* <th className="p-3 text-center">Lương cơ bản</th>
                          <th className="p-3 text-center"> Lương thực tế</th>
                          <th className="p-3 text-center">Phụ cấp</th>
                          <th className="p-3 text-center"> BHXH</th>
                          <th className="p-3 text-center"> BHYT</th>
                          <th className="p-3 text-center">Thực nhận</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentStaff.map((item, index) => (
                          <tr className="bg-gray-800">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{item.id}</td>
                            <td className="p-3 font-bold">{item.name}</td>
                            <td className="p-3 font-bold">{item.department}</td>
                            <td className="p-3 font-bold">{`${item.month}/${item.year}`}</td>
                            <td className="p-3 font-bold">
                              {item.worktime.toFixed(2).toString()}
                            </td>
                            <td className="p-3 font-bold">{` ${item.total_days
                              .toFixed(2)
                              .toString()} `}</td>
                            {/* <td className="p-3 font-bold">
                              {item.basicSalary.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.salaryStaff.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>

                            <td className="p-3">
                              {item.total_days < 26 ? (
                                <span className="bg-red-400 text-gray-50 rounded-md px-3">
                                  Không
                                </span>
                              ) : (
                                <span className="bg-green-400 text-gray-50 rounded-md px-2">
                                  {item.allowance.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              )}
                            </td>
                            <td className="p-3 font-bold">
                              {item.social_insurance.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.health_insurance.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td>
                            <td className="p-3 font-bold">
                              {item.total.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <div className="pagination">
        <Paginate
          handleClickPrev={handlePreviousPage}
          handleClickNext={handleNextPage}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
