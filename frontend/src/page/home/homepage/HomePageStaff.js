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
    <div className="homepage-staff">
      <div className="row">
        {listmenu?.map((item, index) => (
          <div className="col-xl-4" key={index}>
            <Card link={item?.link} title={item?.title} img={item?.img} />
          </div>
        ))}
      </div>
    </div>
  );
};
