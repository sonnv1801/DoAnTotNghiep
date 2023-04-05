import React from "react";
import "./style.css";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

export const Card = () => {
  return (
    <Link to="/list-staff">
      <div className="card">
        <div className="sub-card">
          <p>Danh Sách Nhân Viên</p>
          <div className="card-body">
            <ReceiptLongIcon />
          </div>
        </div>
      </div>
    </Link>
  );
};
