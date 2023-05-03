import React, { useState } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="list-search">
      <form className="form-inline my-2 my-lg-0 ml-5">
        <div className="search-staff">
          <input
            className="form-control mr-sm-2"
            type="text"
            value=""
            name="search"
            placeholder="Tìm Kiếm"
            aria-label="Search"
          />
          <SearchIcon className="icon-search" />
        </div>
      </form>
    </div>
  );
};
