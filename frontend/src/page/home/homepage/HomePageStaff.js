import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";

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
    <div className="h-screen   items-center w-full flex ">
      <div className="grid grid-cols-2   mx-auto w-1/2">
        {listmenu?.map((item, index) => (
          <div className=" w-9/12" key={index}>
            <Card  link={item?.link} title={item?.title} img={item?.img} />
          </div>
        ))}
      </div>
    </div>
  );
};
