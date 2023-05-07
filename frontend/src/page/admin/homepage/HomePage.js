import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import menu1 from "../../../assets/menu1.png";
import menu2 from "../../../assets/menu3.png";
import menu3 from "../../../assets/menu4.png";
import menu4 from "../../../assets/menu2.png";
import menu5 from "../../../assets/menu5.png";
import menu6 from "../../../assets/menu6.png";
import { Staff } from "../staff/Staff";

const listmenu = [
  {
    id: 1,
    link: "/list-staff",
    title: "Danh sách nhân viên",
    img: menu1,
  },
  {
    id: 2,
    link: "/cf-time",
    title: "Cấu hình thời gian",
    img: menu2,
  },
  {
    id: 3,
    link: "/statistic",
    title: "Tính Lương nhân viên",
    img: menu3,
  },
  {
    id: 4,
    link: "/timekp",
    title: "Bảng công nhân viên",
    img: menu4,
  },
  // {
  //   id: 5,
  //   link: "/salary",
  //   title: "Bảng lương nhân viên",
  //   img: menu5,
  // },
  // {
  //   id: 6,
  //   link: "/register-account",
  //   title: "Cấp Tài Khoản",
  //   img: menu6,
  // },
];

export const HomePage = () => {
  return (
    // <div className=" h-screen mt-20  items-center w-full">
    //   <div className="grid grid-cols-4 gap-2  ">
    //     {listmenu?.map((item, index) => (
    //       <div className="w-full " key={index}>
    //         <Card link={item?.link} title={item?.title} img={item?.img} />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <Staff/>
  );
};