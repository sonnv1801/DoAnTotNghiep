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
    salaryService
      .createSalary(salary, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(CREATE_SALARY, res.data));
        toast.success("Thêm thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(`${err.response.data.error}`, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
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
    }).then((result) => {
      if (result.isConfirmed) {
        salaryService
          .updateSalary(id, accessToken, salary)
          .then((res) => {
            try {
              dispatch(createAction(UPDATE_SALARY, res.data));
              dispatch(getAllSalary());
              dispatch(stopLoading());
              console.log(res);
              toast.success("Cập nhật thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              navigate("/salary");
            } catch (error) {
              console.log(error);
              toast.error(`${error}`, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => {
            console.log(error.response.data.error);
            toast.error(`${error.response.data.error}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    });
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
  departmStaff = null,
  nameFilter = null
) => {

  function calculateSalaryWithSalaryDep(data, month, year, salaryDep) {
    const totalWorktime = {};
    const totalDays = {};
    const departmentMap = {};


    data.forEach(({ Id, name, day, workTime, Dep }) => {
      const [dayStr, monthStr, yearStr] = day.split("-");
      const monthValue = parseInt(monthStr);
      const yearValue = parseInt(yearStr);
      if (
        monthValue === month &&
        yearValue === year &&
        (!departmStaff || Dep === departmStaff) &&
        (!nameFilter || name.toLowerCase().includes(nameFilter.toLowerCase()))
      ) {
        const [hours, minutes] = workTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const adjustedMinutes = Math.max(0, totalMinutes - 60);
        const adjustedHours = Math.max(adjustedMinutes / 60);

        if (totalWorktime[Id]) {
          totalWorktime[Id].worktime += adjustedHours;
          totalDays[Id] += 1;
        } else {
          totalWorktime[Id] = { name: name, worktime: adjustedHours };

          totalDays[Id] = 1;
          departmentMap[Id] = Dep;
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
          total_days: worktime / 8,
          basicSalary: basicSalary,
          allowance: allowance,
          social_insurance: social_insurance,
          health_insurance: health_insurance,
          average_daily_worktime: averageDailyWorktime,
          salaryStaff: ((worktime / 8) * basicSalary) / 26,
          // total:
          //   worktime * basicSalary -
          //   (social_insurance + health_insurance) +
          //   allowance,
          total:
            worktime / 8 >= 26
              ? ((worktime / 8) * basicSalary) / 26 -
              (social_insurance + health_insurance) +
              allowance
              : ((worktime / 8) * basicSalary) / 26 -
              (social_insurance + health_insurance),
          month,
          year,
        };
        results.push(data);
      } else {
        console.log(`Không tìm thấy thông tin về phòng ban ${department}`);
      }
    }

    // Sort results array based on total_days property
    if (fillerDay === "asc") {
      results.sort((a, b) => (a.total_days < b.total_days ? -1 : 1));

    } else if (fillerDay === "desc") {
      results.sort((a, b) => (a.total_days > b.total_days ? -1 : 1));

    }

    return results;
  }

  const salaryDataWithSalaryDep = calculateSalaryWithSalaryDep(
    staffWorkHour,
    monthStaff,
    yearStaff,
    salaryDep,
    nameFilter
  );

  return salaryDataWithSalaryDep;
};
