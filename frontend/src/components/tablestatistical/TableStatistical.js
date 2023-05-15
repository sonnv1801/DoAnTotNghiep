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
  console.log(nameFilter, "nameFilter2222");
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
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentStaff = salaryDataWithSalaryDep.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(salaryDataWithSalaryDep.length / usersPerPage);

  console.log(currentStaff, "currentStaff");
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="text-white bg-black ">
                  <TableCell className="text-white">#</TableCell>
                  <TableCell className="text-white">ID</TableCell>
                  <TableCell className="text-white" align="right">
                    Tên nhân viên
                  </TableCell>
                  <TableCell className="text-white" align="right">
                    Phòng Ban
                  </TableCell>
                  <TableCell className="text-white" align="right">
                    Năm
                  </TableCell>
                  <TableCell className="text-white" align="right">
                    Số Giờ Công
                  </TableCell>
                  <TableCell className="text-white" align="right">
                    Số Công
                  </TableCell>
                  <TableCell className="text-white" align="right">
                    Lương cơ bản
                  </TableCell>
                  <TableCell align="right" className="text-white">
                    Lương thực tế
                  </TableCell>
                  <TableCell align="right" className="text-white">
                    Phụ cấp
                  </TableCell>
                  <TableCell align="right" className="text-white">
                    BHXH
                  </TableCell>
                  <TableCell align="right" className="text-white">
                    BHYT
                  </TableCell>
                  <TableCell align="right" className="text-white">
                    Thực nhận
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentStaff?.map((datas, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{datas.id}</TableCell>
                    <TableCell align="right">{datas.name}</TableCell>

                    <TableCell align="right">{datas.department}</TableCell>
                    <TableCell align="right">{`${datas.month}/${datas.year}`}</TableCell>
                    <TableCell align="right">
                      {datas.worktime.toFixed(2).toString()}
                    </TableCell>
                    <TableCell align="right">{` ${datas.total_days
                      .toFixed(2)
                      .toString()} `}</TableCell>
                    <TableCell align="right">
                      {datas.basicSalary.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>

                    <TableCell align="right">
                      {datas.salaryStaff.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>

                    <TableCell align="right">
                      {datas.allowance.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>

                    <TableCell align="right">
                      {datas.social_insurance.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {datas.health_insurance.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell align="right">
                      {datas.total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
