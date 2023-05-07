import React from "react";
import { Outlet } from "react-router-dom";
import {NavBar} from "../navbar/NavBar";
import NavHome from "../../page/home/navhome/NavHome";
export const LayOut = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
     <div className="row">
     
        {user?.role === true ? (  <div className="col-3"><NavBar/>      </div>) : (<NavHome/>)}

      <div className="col-9">
      <Outlet />
      </div>
     </div>
    </div>
  );
};
