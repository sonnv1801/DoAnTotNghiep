import {
  CREATE_TIME,
  DELETE_TIME,
  FETCH_STAFF,
  FETCH_TIME_CONFIG,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SEARCH_STAFF,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";

const initialState = {
  listStaff: [],
  listTime: [],
  search: [],

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

    case SEARCH_STAFF: {
      const key = payload;
      state.selected = key;
      if (key === "") {
        state.search = [];
      } else {
        const update = state.listStaff.filter(
          (staff) =>
            staff.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
            staff.Dep.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
            staff.Student_Id.toLowerCase().indexOf(key.toLowerCase()) !== -1
        );
        state.search = update;
      }

      return { ...state };
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

    case CREATE_TIME: {
      let updateList = [...state.listTime];
      updateList.push(payload);
      state.listTime = updateList;
      return { ...state };
    }

    case FETCH_TIME_CONFIG: {
      state.listTime = payload;
      return { ...state };
    }

    case DELETE_TIME: {
      let updateList = [...state.listTime];
      let index = updateList.findIndex((time) => time.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listTime = updateList;
      }
        return {...state};
    }
    default:
      return state;
  }
};

export default defaultReducer;
