import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";
import BackImage from "../../../assets/support.jpg";
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
    // <div className="h-screen   items-center w-full flex ">
    //   <div className="grid grid-cols-2   mx-auto w-1/2">
    //     {listmenu?.map((item, index) => (
    //       <div className=" w-9/12" key={index}>
    //         <Card  link={item?.link} title={item?.title} img={item?.img} />
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="h-screen w-full   ">
      <div className="w-full h-[500px] bg-gray-900/90 absolute ">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={BackImage}
          alt="/"
        />
      </div>

      <div className="w-full  text-white relative">
        <div className="mb-28">
          <h2 className="text-3xl pt-8 text-slate-300 uppercase text-center">
            Xem Chấm Công
          </h2>
          <h3 className="text-5xl font-bold py-6 text-center text-uppercase">
            I-Work Company
          </h3>
        </div>
        <div className="w-[50%] flex  m-auto ">
          {listmenu?.map((item, index) => (
            <div className="mx-4" key={index}>
              <Card link={item?.link} title={item?.title} img={item?.img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
