import { timeService } from "../../services";
import { createAction } from ".";
import Swal from "sweetalert2";
import { CREATE_TIME, DELETE_TIME, FETCH_TIME_CONFIG, START_LOADING, STOP_LOADING } from "../type/types";

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

export const createTimes = (time) => {
  return (dispatch) => {
    timeService
      .createTime(time)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(CREATE_TIME, res.data));
        Swal.fire('Thêm thành công...', '', 'success');
      })
      .catch((err) => console.log(err));
  };
};
export const getAllTime = () => {
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

export const deleteTimes = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: 'Bạn chắc chưa?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK !',
    })
      .then((result) => {
        if (result.isConfirmed) {
          timeService.deleteTime(id, ).then((res) => {
            dispatch(createAction(DELETE_TIME, res.data));
            dispatch(getAllTime());
            dispatch(stopLoading());
          });
          Swal.fire('Xóa Thành Công!', 'success');
          dispatch(stopLoading());
        }
      })
      .catch((err) => console.log(err));
  };
};