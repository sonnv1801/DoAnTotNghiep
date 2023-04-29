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
export const Statistical = (rows) => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [departm, setDepartm] = useState("");

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
    departm
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
  return (
    <div className="statistical">
      <div className="title-statistical">
        <p>TÍnh Lương</p>
      </div>
      <div className="sub-statistical">
        <div className="header-statistical">
          <div className="sub-header">
            <div className="row">
              <div className="col-2">
                <span>Năm</span>
              </div>
              <div className="col-2">
                <span>Tháng</span>
              </div>
              <div className="col-2">
                <span>Phòng Ban</span>
              </div>
              <div className="col-2">
                <span>Thống Kê Ngày Làm Việc</span>
              </div>
              <div className="col-2">
                <span></span>
              </div>
              <div className="col-2">
                <span>Xuất Dữ Liệu Excel</span>
              </div>
              <div className="col-2">
                <select value={year} onChange={handleMonthChangeYear}>
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
              <div className="col-2">
                <select value={month} onChange={handleMonthChange}>
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
              <div className="col-2">
                <select value={departm} onChange={handleDepartm}>
                  <option value="">Chọn Phòng Ban</option>
                  {filteredData?.map((item, index) => (
                    <option key={index} value={item.Dep}>
                      {item.Dep}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-2">
                <select id="sort" value={fillerDay} onChange={handleSortChange}>
                  <option value="desc">Từ cao đến thấp</option>
                  <option value="asc">Từ thấp đến cao</option>
                </select>
              </div>
              <div className="col-4">
                <Button variant="outlined" startIcon={<ArrowDownwardIcon />}>
                  <CSVLink
                    data={salaryDataWithSalaryDep}
                    filename={"Chấm công.csv"}
                  >
                    Xuất File
                  </CSVLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-list-statistical">
          <TableStatistical
            monthStaff={month}
            yearStaff={year}
            fillerDay={fillerDay}
            departmStaff={departm}
          />
        </div>
      </div>
    </div>
  );
};
