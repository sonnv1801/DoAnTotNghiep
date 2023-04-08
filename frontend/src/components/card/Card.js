import React from "react";
import "./style.css";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

export const Card = ({ link, title, img }) => {
  console.log(img);
  return (
    <Link to={link}>
      <div className="card">
        <div className="sub-card">
          <p>{title}</p>
          <div className="card-body">
            <img src={img} alt="logo" />
          </div>
        </div>
      </div>
    </Link>
  );
};
