import React from "react";
import LogoAbout from "../../../assets/about.jpg";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
const About = () => {
  return (
    <div className="container main-about">
      <h1>I-Work - Phần mềm quản lý nhân sự toàn diện, chuyên nghiệp</h1>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className=" m-auto">
          <ul className="contact-right">
            <li>
              <div className="row">
                <div className="col-8 grid items-center">Quản lý nhân viên</div>
                <div className="col-4">
                  <div className="contact-icon">
                    <Person4OutlinedIcon />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="row">
                <div className="col-8 grid items-center">
                  Quản lý tính lương
                </div>
                <div className="col-4">
                  <div className="contact-icon">
                    <CalculateOutlinedIcon />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="row">
                <div className="col-8 grid items-center">Cấp tài khoản</div>
                <div className="col-4">
                  <div className="contact-icon">
                    <PersonAddOutlinedIcon />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className=" m-auto">
          <img src={LogoAbout} alt="LogoAbout" className="w-full" />
        </div>
        <div className=" m-auto">
          <ul className="contact-right contact-left">
            <li>
              <div className="row m-ml-4">
                <div className="col-4">
                  <div className="contact-icon">
                    <ListAltOutlinedIcon />
                  </div>
                </div>
                <div className="col-8 grid items-center">Quản lý chấm công</div>
              </div>
            </li>
            <li>
              <div className="row">
                <div className="col-4">
                  <div className="contact-icon">
                    <EditCalendarOutlinedIcon />
                  </div>
                </div>
                <div className="col-8 grid items-center">Tạo bảng lương</div>
              </div>
            </li>
            <li>
              <div className="row">
                <div className="col-4">
                  <div className="contact-icon">
                    <ManageHistoryOutlinedIcon />
                  </div>
                </div>
                <div className="col-8 grid items-center">
                  Cấu hình thời gian
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
