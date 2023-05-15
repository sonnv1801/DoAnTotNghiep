import React from "react";
import { Outlet } from "react-router-dom";
import {NavBar} from "../navbar/NavBar";
import NavHome from "../../page/home/navhome/NavHome";
import Footer from "../../page/home/footer/Footer";
export const LayOut = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
     <div className="">
     
        {user?.role === true ? (  <div className="flex"><NavBar/> 
        <div className="w-full mr-4">
      <Outlet />
      </div> </div>    ) : (<div className=""><NavHome/>  <div className="cols-9">
      <Outlet />
      </div></div> )}

      {user?.role === true ? (  ``) : (<Footer/>)}
     </div>
     
    </div>
  );
};
