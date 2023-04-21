import React, { useState } from "react";
import "./style.css";
import Logo from "../../../assets/logo.png";
import BrgLogin from "../../../assets/login-bgr.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";

import Button from "@mui/material/Button";
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
    <div className="login">
      <ToastContainer />
      <div className="row">
        <div className="col-6">
          <div className="logo-login">
            <img src={Logo} alt="logo" />
          </div>
          <form>
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

            <div className="sub-login">
              <h1>Đăng Nhập</h1>
              <div className="login-input">
                <span>Tên Đăng Nhập</span>
                <input
                  id="usename"
                  name="usename1"
                  type="text"
                  placeholder="Tên đăng nhập"
                  className="input-gr"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login-input">
                <span>Mật khẩu</span>
                <input
                  id="form-password"
                  name="password1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="input-gr"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span onClick={togglePasswordVisibility} className="eyes-login">
                  {showPassword ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i class="fa fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <Link to="/">
                <p>Quên mật khẩu</p>
              </Link>
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="btn-login"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
        <div className="col-6">
          <div className="bgr-logo">
            <img src={BrgLogin} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
