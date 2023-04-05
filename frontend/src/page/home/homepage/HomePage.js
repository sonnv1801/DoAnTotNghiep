import React from "react";
import "./style.css";
import { Card } from "../../../components/card/Card";

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="row">
        <div className="col-xl-3">
          <Card />
        </div>
        <div className="col-xl-3">
          <Card />
        </div>
        <div className="col-xl-3">
          <Card />
        </div>
        <div className="col-xl-3">
          <Card />
        </div>
      </div>
    </div>
  );
};
