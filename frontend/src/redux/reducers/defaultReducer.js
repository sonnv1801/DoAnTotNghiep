import {
  FETCH_STAFF,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";

const initialState = {
  listStaff: [],
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
};

const defaultReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case FETCH_STAFF: {
      state.listStaff = payload;
      return { ...state }; //setState
    }
    case START_LOADING: {
      state.isLoading = true;
      return { ...state };
    }

    case STOP_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    case LOGIN_START: {
      state.login.isFetching = true;
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      state.login.isFetching = false;
      state.login.currentUser = payload;
      state.login.error = false;
      return { ...state };
    }
    case LOGIN_FAILED: {
      state.login.isFetching = false;
      state.login.error = true;
      return { ...state };
    }

    default:
      return state;
  }
};

export default defaultReducer;
