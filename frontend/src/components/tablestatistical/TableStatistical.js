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
import {
  getAllStaff,
  listWorkStaff,
  salaryStaff,
} from "../../redux/actions/staff.action";

export default function BasicTable({ monthStaff, yearStaff }) {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const staffWorkHour = listWorkStaff(listKeeping);
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  console.log(yearStaff, "yearStaff");
  console.log(monthStaff, "yearStaff");

  const basicSalary = 10000;
  const allowance = 10000;
  const social_insurance = 10000;
  const health_insurance = 10000;
  const salary = salaryStaff(staffWorkHour, basicSalary);

  // function calculateSalary(data, month, year) {
  //   const totalWorktime = {};
  //   const totalDays = {};

  //   data.forEach(({ Student_Id, name, day, workTime }) => {
  //     const [_, monthStr, __] = day.split("/");
  //     const monthValue = parseInt(monthStr);
  //     if (monthValue === month) {
  //       const [hours, minutes] = workTime.split(":").map(Number);
  //       const totalMinutes = hours * 60 + minutes;
  //       const adjustedMinutes = Math.max(0, totalMinutes - 60); // trừ đi 1 tiếng nghỉ trưa (60 phút)
  //       const adjustedHours = Math.floor(adjustedMinutes / 60);
  //       if (totalWorktime[Student_Id]) {
  //         totalWorktime[Student_Id].worktime += adjustedHours;
  //         totalDays[Student_Id] += 1;
  //       } else {
  //         totalWorktime[Student_Id] = { name: name, worktime: adjustedHours };
  //         totalDays[Student_Id] = 1;
  //       }
  //     }
  //   });

  //   const results = [];
  //   for (const [id, { name, worktime }] of Object.entries(totalWorktime)) {
  //     const days = totalDays[id];
  //     const averageDailyWorktime = Math.round((worktime / days) * 10) / 10;
  //     const salary = Math.round(averageDailyWorktime * 100000);
  //     const data = {
  //       id,
  //       name,
  //       worktime,
  //       total_days: days,
  //       basicSalary: basicSalary,
  //       allowance: allowance,
  //       social_insurance: social_insurance,
  //       health_insurance: health_insurance,
  //       average_daily_worktime: averageDailyWorktime,
  //       salaryStaff: worktime * basicSalary,
  //       total:
  //         worktime * basicSalary -
  //         (social_insurance + health_insurance) +
  //         allowance,
  //       month,
  //     };
  //     results.push(data);
  //   }

  //   return results;
  // }

  // const salaryData = calculateSalary(salary, monthStaff.monthStaff);

  // console.log(salaryData);

  function calculateSalary(data, month, year) {
    const totalWorktime = {};
    const totalDays = {};

    data.forEach(({ Student_Id, name, day, workTime }) => {
      const [dayStr, monthStr, yearStr] = day.split("/");
      const dayValue = parseInt(dayStr);
      const monthValue = parseInt(monthStr);
      const yearValue = parseInt(yearStr);
      console.log(yearValue);
      if (monthValue === month && yearValue === year) {
        const [hours, minutes] = workTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const adjustedMinutes = Math.max(0, totalMinutes - 60); // trừ đi 1 tiếng nghỉ trưa (60 phút)
        const adjustedHours = Math.floor(adjustedMinutes / 60);
        if (totalWorktime[Student_Id]) {
          totalWorktime[Student_Id].worktime += adjustedHours;
          totalDays[Student_Id] += 1;
        } else {
          totalWorktime[Student_Id] = { name: name, worktime: adjustedHours };
          totalDays[Student_Id] = 1;
        }
      }
    });

    const results = [];
    for (const [id, { name, worktime }] of Object.entries(totalWorktime)) {
      const days = totalDays[id];
      const averageDailyWorktime = Math.round((worktime / days) * 10) / 10;
      const salary = Math.round(averageDailyWorktime * 100000);
      const data = {
        id,
        name,
        worktime,
        total_days: days,
        basicSalary: basicSalary,
        allowance: allowance,
        social_insurance: social_insurance,
        health_insurance: health_insurance,
        average_daily_worktime: averageDailyWorktime,
        salaryStaff: worktime * basicSalary,
        total:
          worktime * basicSalary -
          (social_insurance + health_insurance) +
          allowance,
        month,
        year,
      };
      results.push(data);
    }

    return results;
  }

  const salaryData = calculateSalary(salary, monthStaff, yearStaff);

  console.log(salaryData, "salaryData");

  return (
    <TableContainer component={Paper}>
      <Button variant="outlined" startIcon={<ArrowDownwardIcon />}>
        <CSVLink data={salaryData} filename={"Chấm công.csv"}>
          Xuất File
        </CSVLink>
      </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tên nhân viên</TableCell>
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
          {salaryData?.map((datas, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{datas.name}</TableCell>
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
                {(parseInt(datas.worktime) * basicSalary).toLocaleString(
                  "vi-VN",
                  {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }
                )}
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
