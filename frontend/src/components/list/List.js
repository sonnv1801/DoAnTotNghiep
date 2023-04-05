import React from "react";
import "./style.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tables from "./tables/Tables";
import Paginate from "../pagination/Pagination";

export const List = (listStaff) => {
  console.log(listStaff);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  return (
    <div className="list">
      <div className="list-title">
        <p>Thông tin nhân viên</p>
      </div>
      <div className="list-search">
        <div className="sub-list-search">
          <Search id="search-staff">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div>
        <div className="sub-list-filter">
          <div className="filler">
            <div className="filler-list">
              <div className="icon-filter">
                <FilterAltIcon />
              </div>
              <div className="title-filter">
                <select className="sl-op">
                  <option>Lọc</option>
                  <option>Nguyễn Văn Sơn</option>
                  <option>Huỳnh Ngọc Huy</option>
                  <option>Trần Ngọc Hoàng</option>
                  <option>Nguyễn Phi Líp</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ilst-table">
        <Tables listStaff={listStaff.listStaff} />
      </div>
      <div className="pagination">
        <Paginate />
      </div>
    </div>
  );
};
