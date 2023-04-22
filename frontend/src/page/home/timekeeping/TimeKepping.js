import React, { useEffect } from "react";
import "./style.css";
import TableTimeKp from "./../../../components/table-tiemkeeping/TableTimeKp";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../../../redux/actions/staff.action";

export const TimeKeeping = () => {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  console.log(listKeeping, "");

  const morningData = [];
  const afternoonData = [];
  listKeeping?.map((item) => {
    // if (item.time < "12:00:00" && item.time < "08:00:00") {
    //   morningData.push(item);
    //   item.today = "Buổi Sáng";
    //   item.session = "Đi Sớm";
    // }
    // if (item.time < "12:00:00" && item.time > "08:00:00") {
    //   morningData.push(item);
    //   item.today = "Buổi Sáng";
    //   item.session = "Đi Trễ";
    // }
    // if (item.time > "12:00:00" && item.time > "17:00:00") {
    //   afternoonData.push(item);
    //   item.today = "Buổi Chiều";
    //   item.session = "Tăng ca";
    // } else {
    //   afternoonData.push(item);
    //   item.today = "Buổi Chiều";
    //   item.session = "Đủ 8 tiếng";
    // }
    if (item.time < "12:00:00") {
      morningData.push(item);
      item.today = "Buổi Sáng";
    } else {
      afternoonData.push(item);
      item.today = "Buổi Chiều";
    }
  });

  console.log("Morning:", morningData);
  console.log("Afternoon:", afternoonData);

  const staff = morningData
    .concat(afternoonData)
    .reduce((map, user) => {
      const existingUser = map.get(user.Student_Id + user.day);
      if (existingUser) {
        existingUser.time_out = user.time;
      } else {
        map.set(user.Student_Id + user.day, {
          Student_Id: user.Student_Id,
          name: user.name,
          day: user.day,
          time_in: user.time,
          time_out: null,
          Dep: user.Dep,
          roll: user.roll,
        });
      }
      return map;
    }, new Map())
    .values();

  // console.log(Array.from(staff), "staff");

  const staffHour = Array.from(staff);

  console.log(staffHour, "Array.from(staff)");

  function getTimeDiff(time_in, time_out) {
    const diff = new Date(
      new Date(`01/01/1970 ${time_out}`) - new Date(`01/01/1970 ${time_in}`)
    );
    const hours = diff.getUTCHours();
    const minutes = diff.getUTCMinutes();
    return `${hours}:${minutes}`;
  }

  const staffWorkHour = staffHour.map((staff) => ({
    ...staff,
    workTime: getTimeDiff(staff.time_in, staff.time_out),
  }));

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
