import React, { useState } from "react";
import "./style.css";
import Logo from "../../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/user.action";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const messerr = useSelector((state) => state.defaultReducer.login.error);
  const loading = useSelector((state) => state.defaultReducer.login.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const newUser = {
        username: username,
        password: password,
      };
      loginUser(newUser, dispatch, navigate);
    } else {
      toast.warning("Vui lòng nhập đầy đủ Username và mật khẩu", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[url('https://img.freepik.com/free-vector/futuristic-horizon-background-with-blue-light_52683-25182.jpg?w=826&t=st=1683268764~exp=1683269364~hmac=694a12a5bf7948c5278b8aaf1c28296a801753880951b4a11e78026c5345f3d8')] bg-center bg-cover">
      <ToastContainer />
      <div className="w-96 p-6 shadow-lg bg-white rounded-xl">
        {messerr === false ? (
          ``
        ) : (
          <>
            <Alert severity="error">
              Vui lòng kiểm tra lại Tên Đăng Nhập & Mật Khẩu
            </Alert>
          </>
        )}

        {loading === false ? (
          ``
        ) : (
          <>
            <div className="loading">
              <Alert severity="warning">
                Đợi tý! Chúng tôi đang chuyển hướng....
              </Alert>
            </div>
          </>
        )}
        <form onSubmit={handleLogin}>
          <img src={Logo} className="w-20  ml-32 mb-4" alt="logo" />
          <h1 className="text-3xl block text-center font-semibold uppercase">
            Đăng nhập
          </h1>
          <hr className="mt-3" />
          <div className="mt-3">
            <label for="username" className="block text-base mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              name="username1"
              className="border h-10 w-full text-base rounded-lg px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Tên đăng nhập..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-3 position-relative">
            <label for="password" className="block text-base mb-2">
              Mật khẩu
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="form-password"
              name="password1"
              className="border h-10 w-full text-base rounded-lg px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder="Mật khẩu..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              className="eyes-login position-absolute top-10 left-[309px]"
            >
              {showPassword ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i class="fa fa-eye-slash"></i>
              )}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <a href="#!" className="text-indigo-800 font-semibold">
                Quên mật khẩu?
              </a>
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="text-white uppercase font-bold py-2 w-full rounded-md bg-gradient-to-r from-cyan-400 to-blue-400 border border-slate-300"
              variant="contained"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
