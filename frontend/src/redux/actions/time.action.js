import { timeService } from "../../services";
import { createAction } from ".";
import Swal from "sweetalert2";
import {
  CREATE_TIME,
  DELETE_TIME,
  FETCH_TIME_CONFIG,
  START_LOADING,
  STOP_LOADING,
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

export const getAllTimeCf = () => {
  return (dispatch) => {
    dispatch(startLoading());
    timeService
      .getTime()
      .then((res) => {
        dispatch(createAction(FETCH_TIME_CONFIG, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addTime = (type, accessToken) => {
  return (dispatch) => {
    timeService
      .createTime(type, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(CREATE_TIME, res.data));
        toast.success("Thêm thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const deleteTimes = (id, accessToken) => {
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
          timeService.deleteTime(id, accessToken).then((res) => {

            dispatch(createAction(DELETE_TIME, res.data));
            dispatch(getAllTimeCf());
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
