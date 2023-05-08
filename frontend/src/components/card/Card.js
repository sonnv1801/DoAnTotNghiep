import React from "react";
// import "./style.css";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

export const Card = ({ link, title, img }) => {
  console.log(img);
  return (
    <Link to={link}>
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-500/50">
        <div className="rounded-2xl text-center px-2 py-3 font-semibold hover:bg-gray-200">
          <p className="text-black">{title}</p>
          <div className="p-3">
            <img className="w-full" src={img} alt="logo"/>
          </div>
        </div>
      </div>
    </Link>
  );
};
