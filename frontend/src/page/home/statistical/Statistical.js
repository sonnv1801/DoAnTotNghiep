import React from "react";
import "./style.css";
import Button from "@mui/material/Button";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TableStatistical from "../../../components/tablestatistical/TableStatistical";

export const Statistical = () => {
  return (
    <div className="statistical">
      <div className="title-statistical">
        <p>Thống kê</p>
      </div>
      <div className="sub-statistical">
        <div className="header-statistical">
          <div className="sub-header">
            <div className="row">
              <div className="col-3">
                <span>Năm</span>
              </div>
              <div className="col-9">
                <span>Tháng</span>
              </div>
              <div className="col-3">
                <select>
                  <option>Năm</option>
                  <option>2001</option>
                  <option>2002</option>
                </select>
              </div>
              <div className="col-3">
                <select>
                  <option>Tháng</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div className="col-3">
                <Button variant="outlined" startIcon={<LegendToggleIcon />}>
                  Thống kê
                </Button>
              </div>
              <div className="col-3">
                <Button variant="outlined" startIcon={<ArrowDownwardIcon />}>
                  Xuất File
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-list-statistical">
          <TableStatistical />
        </div>
      </div>
    </div>
  );
};
