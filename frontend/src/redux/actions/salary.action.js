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
  FETCH_ONLY_CONFIG
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
          navigate("/salary")
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
