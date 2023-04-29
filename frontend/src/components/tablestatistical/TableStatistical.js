import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CSVLink } from "react-csv";
// import { data } from "../../data/Data";
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
}) {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const salaryDep = useSelector((state) => state.defaultReducer.listSalary);
  const staffWorkHour = listWorkStaff(listKeeping);
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
    departmStaff
  );

  console.log(salaryDataWithSalaryDep, "salaryDataWithSalaryDep");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tên nhân viên</TableCell>
            <TableCell align="right">Phòng Ban</TableCell>
            <TableCell align="right">Tổng Số Ngày làm trong tháng</TableCell>
            <TableCell align="right">Năm</TableCell>
            <TableCell align="right">Lương cơ bản</TableCell>
            <TableCell align="right">Số Giờ Công</TableCell>
            <TableCell align="right">Lương thực tế</TableCell>
            <TableCell align="right">Phụ cấp</TableCell>
            <TableCell align="right">BHXH</TableCell>
            <TableCell align="right">BHYT</TableCell>
            <TableCell align="right">Thực nhận</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryDataWithSalaryDep?.map((datas, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{datas.name}</TableCell>
              <TableCell align="right">{datas.department}</TableCell>
              <TableCell align="right">{`Đã làm ${datas.total_days} ngày trong tháng ${datas.month}`}</TableCell>
              <TableCell align="right">{`${datas.month}/${datas.year}`}</TableCell>
              <TableCell align="right">
                {datas.basicSalary.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">{datas.worktime}</TableCell>

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
  );
}
