import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
export const AboutUs = ({ name, profession, address, image }) => {
  return (
    <div class="member d-flex align-items-start mb-4 container-fluid">
      <div class="pic">
        <img src={image} class="img-fluid" alt="" />
      </div>
      <div class="member-info">
        <h4>{name}</h4>

        <span>{profession}</span>
        <hr className="w-[20%]" />
        <p>{address}</p>
        <div class="social">
          <a href="">
            <FacebookOutlinedIcon />
          </a>
          <a href="">
            <GitHubIcon />
          </a>
          <a href="">
            <LinkedInIcon />
          </a>
          <a href="">
            {" "}
            <GoogleIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
