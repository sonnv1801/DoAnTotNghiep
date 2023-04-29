import { salaryService } from "../../services";
import { createAction } from ".";
import Swal from "sweetalert2";
import {
  CREATE_SALARY,
  UPDATE_SALARY,
  DELETE_SALARY,
  FETCH_SALARY_CONFIG,
  START_LOADING,
  STOP_LOADING,
  FETCH_ONLY_CONFIG,
} from "../type/types";
import { toast } from "react-toastify";

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

export const getAllSalary = () => {
  return (dispatch) => {
    dispatch(startLoading());
    salaryService
      .getSalary()
      .then((res) => {
        dispatch(createAction(FETCH_SALARY_CONFIG, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getIdSalary = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    salaryService
      .getIdSalary(id)
      .then((res) => {
        dispatch(createAction(FETCH_ONLY_CONFIG, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addSalary = (salary, accessToken) => {
  return (dispatch) => {
    // console.log("toi day r")
    salaryService
      .createSalary(salary, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(CREATE_SALARY, res.data));
        toast.success("Thêm thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateSalarys = (id, accessToken, salary, navigate) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn chắc chưa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          salaryService.updateSalary(id, accessToken, salary).then((res) => {
            dispatch(createAction(UPDATE_SALARY, res.data));
            dispatch(getAllSalary());
            dispatch(stopLoading());
          });
          toast.success("Cập nhật thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/salary");
          dispatch(stopLoading());
        }
      })
      .catch((err) => console.log(err));
  };
};

export const deleteSalarys = (id, accessToken) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn chắc chưa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          salaryService.deleteSalary(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_SALARY, res.data));
            dispatch(getAllSalary());
            dispatch(stopLoading());
          });
          toast.success("Xóa thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(stopLoading());
        }
      })
      .catch((err) => console.log(err));
  };
};

export const salaryStaffWithDep = (
  fillerDay,
  staffWorkHour,
  monthStaff,
  yearStaff,
  salaryDep,
  departmStaff = null
) => {
  function calculateSalaryWithSalaryDep(
    data,
    month,
    year,
    salaryDep,
    sortByDays = fillerDay
  ) {
    console.log(data, "data");
    const totalWorktime = {};
    const totalDays = {};
    const departmentMap = {};

    data.forEach(({ Student_Id, name, day, workTime, Dep }) => {
      console.log(Dep, "DepDepDepDep");
      const [dayStr, monthStr, yearStr] = day.split("/");
      const monthValue = parseInt(monthStr);
      const yearValue = parseInt(yearStr);

      if (
        monthValue === month &&
        yearValue === year &&
        (!departmStaff || Dep === departmStaff)
      ) {
        const [hours, minutes] = workTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const adjustedMinutes = Math.max(0, totalMinutes - 60);
        const adjustedHours = Math.floor(adjustedMinutes / 60);

        if (totalWorktime[Student_Id]) {
          totalWorktime[Student_Id].worktime += adjustedHours;
          totalDays[Student_Id] += 1;
        } else {
          totalWorktime[Student_Id] = { name: name, worktime: adjustedHours };
          totalDays[Student_Id] = 1;
          departmentMap[Student_Id] = Dep;
        }
      }
    });

    const results = [];
    for (const [id, { name, worktime }] of Object.entries(totalWorktime)) {
      const days = totalDays[id];
      const department = departmentMap[id];
      const averageDailyWorktime = Math.round((worktime / days) * 10) / 10;

      // Tìm thông tin lương cơ bản, phụ cấp, và các khoản khấu trừ cho phòng ban của nhân viên
      const depInfo = salaryDep.find((info) => info.Dep === department);
      if (depInfo) {
        const basicSalary = depInfo.basicSalary;
        const allowance = depInfo.allowance;
        const social_insurance = depInfo.social_insurance;
        const health_insurance = depInfo.health_insurance;

        const data = {
          id,
          department: department,
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
      } else {
        console.log(`Không tìm thấy thông tin về phòng ban ${department}`);
      }
    }

    // Sort results array based on total_days property
    if (sortByDays === "asc") {
      results.sort((a, b) => a.total_days - b.total_days);
    } else if (sortByDays === "desc") {
      results.sort((a, b) => b.total_days - a.total_days);
    }

    return results;
  }

  const salaryDataWithSalaryDep = calculateSalaryWithSalaryDep(
    staffWorkHour,
    monthStaff,
    yearStaff,
    salaryDep
  );

  return salaryDataWithSalaryDep;
};
