import { createAction } from ".";
import { timekpService } from "../../services";
import { FETCH_TIME_KP, START_LOADING, STOP_LOADING } from "../type/types";

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

export const getTimeKP = () => {
  return (dispatch) => {
    dispatch(startLoading());
    timekpService
      .gettimeKP()
      .then((res) => {
        dispatch(createAction(FETCH_TIME_KP, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
