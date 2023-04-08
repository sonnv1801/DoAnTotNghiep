import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import menu1 from "../../../assets/menu1.png";
import menu2 from "../../../assets/menu3.png";
import menu3 from "../../../assets/menu4.png";
import menu4 from "../../../assets/menu2.png";

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
    title: "Thống kê",
    img: menu3,
  },
  {
    id: 4,
    link: "/",
    title: "Chấm công",
    img: menu4,
  },
];

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="row">
        {listmenu?.map((item, index) => (
          <div className="col-xl-3" key={index}>
            <Card link={item?.link} title={item?.title} img={item?.img} />
          </div>
        ))}
      </div>
    </div>
  );
};
