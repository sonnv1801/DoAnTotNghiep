import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";
import { ChatBox } from "../chatbox/ChatBox";

const listmenu = [
  {
    id: 1,
    link: "/timekp",
    title: "Thời Gian Đi Làm",
    img: logo1,
  },
  {
    id: 2,
    link: "/statistic",
    title: "Xem Công",
    img: logo2,
  },
];

export const HomePageStaff = () => {
  return (
    <div className="bg-black h-screen flex  items-center w-full">
      <div className="">
        {listmenu?.map((item, index) => (
          <div className="col-xl-4" key={index}>
            <Card link={item?.link} title={item?.title} img={item?.img} />
          </div>
        ))}
      </div>
    </div>
  );
};
