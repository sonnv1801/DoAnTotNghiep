import { userService } from "../../services";
import { createAction } from ".";
import Swal from "sweetalert2";
import {
  DELETE_USER,
  FETCH_USERS,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";
import { toast } from "react-toastify";

export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

export const loginFailed = () => {
  return {
    type: LOGIN_FAILED,
  };
};

export const registerStart = () => {
  return {
    type: REGISTER_START,
  };
};
export const registerFailed = () => {
  return {
    type: REGISTER_FAILED,
  };
};

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


export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  userService
    .Login(user)
    .then((res) => {
      dispatch(createAction(LOGIN_SUCCESS, res.data));
      localStorage.setItem("token", JSON.stringify(res.data));
      console.log("token", user);
      setTimeout(() => {
        window.location.reload(false);
        navigate("/");
      }, 1000);
      toast.success("Chào Mừng Bạn Quay Lại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailed());
    });
};



export const getAllUser = (accessToken) => {
  return (dispatch) => {
    dispatch(startLoading());
    userService
      .getAllUser(accessToken)
      .then((res) => {
        dispatch(createAction(FETCH_USERS, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
//REGISTER
export const registerUser = async (user, dispatch, navigate, setShow) => {
  dispatch(registerStart());
  userService
    .Register(user)
    .then((res) => {
      dispatch(createAction(REGISTER_SUCCESS, res.data));
      toast.success("Thêm thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(getAllUser());
      setShow();
    })
    .catch((err) => {
      toast.error(`${err.response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(registerFailed());
    });
};

export const deleteUser = (id, accessToken) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn có chắc chưa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          userService.deleteUser(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_USER, res.data));
            console.log(res);
            toast.success(`${res.data.msg}`, {
              position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(getAllUser());
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


