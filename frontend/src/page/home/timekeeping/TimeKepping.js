import React from "react";
import "./style.css"; 
import TableTimeKp from "./../../../components/table-tiemkeeping/TableTimeKp"

export const TimeKeeping = () => {
  return (
    <div className="timekeeping">
      <div className="title-timekeeping">
        <p>Chấm công</p>
      </div>
      <div className="table-time-keeping">
        <TableTimeKp />
      </div>
    </div>
  );
};
