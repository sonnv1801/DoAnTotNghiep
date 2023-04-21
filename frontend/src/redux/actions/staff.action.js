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
