import {
  CREATE_SALARY,
  CREATE_TIME,
  DELETE_SALARY,
  DELETE_TIME,
  FETCH_SALARY_CONFIG,
  FETCH_STAFF,
  FETCH_TIME_CONFIG,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SEARCH_STAFF,
  START_LOADING,
  STOP_LOADING,
  UPDATE_SALARY,
  FETCH_ONLY_CONFIG,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  FETCH_USERS,
  DELETE_USER,
} from "../type/types";

const initialState = {
  listStaff: [],
  salaryFecth: null,
  listTimeCf: [],
  listSalary: [],
  search: [],
  listUser: [],

  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
};

const defaultReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case FETCH_STAFF: {
      state.listStaff = payload;
      return { ...state }; //setState
    }

    case FETCH_USERS: {
      state.listUser = payload;
      return { ...state }; //setState
    }

    case DELETE_USER: {
      let updateList = [...state.listUser];
      let index = updateList.findIndex((user) => user.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listUser = updateList;
      }

      return { ...state };
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
            staff.Id.toString().includes(key)
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

    case REGISTER_START: {
      state.register.isFetching = true;
      return { ...state };
    }
    case REGISTER_SUCCESS: {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
      return { ...state };
    }
    case REGISTER_FAILED: {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      return { ...state };
    }

    case CREATE_TIME: {
      const updatedList = [...state.listTimeCf];
      updatedList.push(payload);
      return { ...state, listTimeCf: updatedList };
    }

    case FETCH_TIME_CONFIG: {
      state.listTimeCf = payload;
      return { ...state };
    }

    case DELETE_TIME: {
      let updateList = [...state.listTimeCf];
      let index = updateList.findIndex((time) => time.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listTimeCf = updateList;
      }
      return { ...state };
    }

    case CREATE_SALARY: {
      const updatedList = [...state.listSalary];
      updatedList.push(payload);
      return { ...state, listSalary: updatedList };
    }

    case FETCH_SALARY_CONFIG: {
      state.listSalary = payload;
      return { ...state };
    }

    case FETCH_ONLY_CONFIG: {
      state.salaryFecth = payload;
      return { ...state };
    }

    case DELETE_SALARY: {
      let updateList = [...state.listSalary];
      let index = updateList.findIndex((salary) => salary.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listSalary = updateList;
      }
      return { ...state };
    }

    case UPDATE_SALARY: {
      const updatedList = state.listSalary.map((salary) => {
        if (salary.id === action.id) {
          return {
            ...salary,
            ...action.payload,
          };
        }
        return salary;
      });
      return {
        ...state,
        listSalary: updatedList,
      };
    }

    default:
      return state;
  }
};

export default defaultReducer;
