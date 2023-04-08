import React from "react";
import "./style.css";
import Logo from "../../../assets/logo.png";
import BrgLogin from "../../../assets/login-bgr.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export const Login = () => {
  return (
    <div className="login">
      <div className="row">
        <div className="col-6">
          <div className="logo-login">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sub-login">
            <h1>Đăng Nhập</h1>
            <div className="login-input">
              <span>Tên Đăng Nhập</span>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="input-gr"
              />
            </div>
            <div className="login-input">
              <span>Mật khẩu</span>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="input-gr"
              />
              <RemoveRedEyeIcon className="eyes-login" />
            </div>
            <Link to="/">
              <p>Quên mật khẩu</p>
            </Link>
            <Button variant="contained" color="success" className="btn-login">
              Đăng nhập
            </Button>
          </div>
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
