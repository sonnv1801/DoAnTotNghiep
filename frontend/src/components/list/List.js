import React, { useState } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tables from "./tables/Tables";
import Paginate from "../pagination/Pagination";
import { useDispatch } from "react-redux";
import { searchStaff } from "../../redux/actions/staff.action";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const List = (listStaff) => {
  const dispatch = useDispatch();
  const [key, setkey] = useState("");
  const handleChange = (e) => {
    const key = e.target.value;
    setkey(key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchStaff(key));
    // setkey("")
    if (key.length <= 0) {
      toast.warning("Vui lòng không để trống trường này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="list">
      <ToastContainer />
      <div className="list-title">
        <p>Thông tin nhân viên</p>
      </div>
      <div className="list-search">
        <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0 ml-5">
          <div className="search-staff">
            <input
              className="form-control mr-sm-2"
              type="text"
              value={key}
              name="search"
              onChange={handleChange}
              placeholder="Search"
              aria-label="Search"
            />
            <SearchIcon className="icon-search" />
          </div>
        </form>

        {/* <div className="sub-list-filter">
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
        </div> */}
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
