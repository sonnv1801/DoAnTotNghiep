import { FETCH_STAFF, START_LOADING, STOP_LOADING } from "../type/types";

const initialState = {
  listStaff: [],
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

    default:
      return state;
  }
};

export default defaultReducer;
