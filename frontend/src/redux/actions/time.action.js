import { timeService } from "../../services";
import { createAction } from ".";

import Swal from "sweetalert2";
import { CREATE_TIME } from "../type/types";

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