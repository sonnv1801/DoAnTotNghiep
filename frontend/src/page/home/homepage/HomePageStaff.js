import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";
import logo3 from "../../../assets/feedback-home.png";
import BackImage from "../../../assets/support.jpg";
import { ChatBox } from "../chatbox/ChatBox";
import About from "./About";
import { AboutUs } from "./AboutUs";
import avataHuy from "../../../assets/huy.jpg";
import avataLip from "../../../assets/lip.jpg";
import avataSon from "../../../assets/son.jpg";
import avataHoang from "../../../assets/hoang.jpg";

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
  {
    id: 3,
    link: "/feedback",
    title: "Phản hồi",
    img: logo3,
  },
];

const listAboutUs = [
  {
    id: 1,
    name: "Nguyễn Văn Sơn",
    profession: "Deveploper",
    address: "Hải Châu, Đà Nẵng",
    image: avataSon,
  },
  {
    id: 2,
    name: "Nguyễn Phi Líp",
    profession: "Tester",
    address: "Hải Châu, Đà Nẵng",
    image: avataLip,
  },
  {
    id: 3,
    name: "Trần Ngọc Hoàng",
    profession: "Designer",
    address: "Hải Châu, Đà Nẵng",
    image: avataHoang,
  },
  {
    id: 4,
    name: "Huỳnh Ngọc Huy",
    profession: "Data Analyster",
    address: "Hải Châu, Đà Nẵng",
    image: avataHuy,
  },
];

export const HomePageStaff = () => {
  return (
    <>
      <div className="w-full" style={{ marginTop: "-50px" }}>
        <div className="w-full h-[500px] bg-gray-900/90 absolute">
          <img
            className="w-full h-full object-cover xl:mb-auto mb-8  mix-blend-overlay"
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
          <div
            className=" w-[80%] flex lg:m-auto mx-auto"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {listmenu?.map((item, index) => (
              <div className="lg:mx-4 mx-2" key={index}>
                <Card link={item?.link} title={item?.title} img={item?.img} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <About />
      <div style={{ margin: "0 auto", width: "85%" }}>
        <div className="row">
          {listAboutUs.map((item, index) => (
            <div className="col-6 mb-4" key={item.id}>
              <AboutUs
                name={item.name}
                profession={item.profession}
                address={item.address}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
