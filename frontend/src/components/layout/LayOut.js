import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";
export const LayOut = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
