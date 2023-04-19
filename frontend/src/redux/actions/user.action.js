import { userService } from "../../services";
import { createAction } from ".";
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
} from "../type/types";
import Swal from "sweetalert2";

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

// export const logoutStart = () => {
//   return {
//     type: LOGOUT_START,
//   };
// };
// export const logoutSuccess = () => {
//   return {
//     type: LOGOUT_SUCCESS,
//   };
// };
// export const logoutFailed = () => {
//   return {
//     type: LOGOUT_FAILED,
//   };
// };

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
        Swal.fire("Chào mừng bạn quay lại!", "success");
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailed());
    });
};

// export const logoutUser = async (
//   id,
//   dispatch,
//   navigate,
//   token,
//   accessToken,
//   axiosJWT
// ) => {
//   dispatch(logoutStart());
//   try {
//     await axiosJWT.post("https://maizoshop.onrender.com/v1/auth/logout", id, {
//       headers: { token: `Bearer ${accessToken}` },
//     });
//     dispatch(logoutSuccess());
//   } catch (err) {
//     dispatch(logoutFailed());
//   }
// };
