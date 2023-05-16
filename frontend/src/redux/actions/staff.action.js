import { createAction } from ".";
import { staffService } from "../../services";
import {
  FETCH_STAFF,
  SEARCH_STAFF,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

//get staff
export const getAllStaff = () => {
  return (dispatch) => {
    dispatch(startLoading());
    staffService
      .getAllStaff()
      .then((res) => {
        dispatch(createAction(FETCH_STAFF, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const searchStaff = (keyword) => {
  return (dispatch) => {
    dispatch(createAction(SEARCH_STAFF, keyword));
    console.log(keyword);
  };
};

export const listWorkStaff = (listKeeping) => {
  const morningData = [];
  const afternoonData = [];
  listKeeping?.map((item) => {
    if (item.time < "12:00:00") {
      morningData.push(item);
      item.today = "Buổi Sáng";
    } else {
      afternoonData.push(item);
      item.today = "Buổi Chiều";
    }
  });

  const staff = morningData
    .concat(afternoonData)
    .reduce((map, user) => {
      const existingUser = map.get(user.Id + user.day);
      if (existingUser) {
        existingUser.time_out = user.time;
      } else {
        map.set(user.Id + user.day, {
          Id: user.Id,
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

  const staffHour = Array.from(staff);

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

  return staffWorkHour;
};

export const salaryStaff = (staffWorkHour) => {
  const employeeSalaries = staffWorkHour.map((employee) => ({
    ...employee,
  }));

  return employeeSalaries;
};
