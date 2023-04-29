import React, { useEffect } from "react";
import "./style.css";
import TableTimeKp from "./../../../components/table-tiemkeeping/TableTimeKp";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStaff,
  listWorkStaff,
} from "../../../redux/actions/staff.action";

export const TimeKeeping = () => {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const staffWorkHour = listWorkStaff(listKeeping);
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  console.log(staffWorkHour, "staffWorkHour");
  return (
    <div className="timekeeping">
      <div className="title-timekeeping">
        <p>Chấm công</p>
      </div>
      <div className="table-time-keeping">
        <TableTimeKp staffkeeping={staffWorkHour} />
      </div>
    </div>
  );
};
