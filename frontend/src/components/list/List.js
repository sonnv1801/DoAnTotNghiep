import React, { useEffect, useState } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import Tables from "./tables/Tables";
import Paginate from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff, searchStaff } from "../../redux/actions/staff.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
const itemsPerPage = 5;

export const List = () => {
  const dispatch = useDispatch();

  const listStaff = useSelector((state) => state.defaultReducer.listStaff);
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

  //Phân Trang
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const datalist = _.uniqBy(listStaff, "Student_Id");

  useEffect(() => {
    dispatch(getAllStaff());
    const data = datalist;
    setItems(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, []);

  const handleClickPrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleChangeItemsPerPage = (e) => {
    const value = parseInt(e.target.value);
    setCurrentPage(1);
    setTotalPages(Math.ceil(items.length / value));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);
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
      </div>
      <div className="ilst-table">
        <Tables listStaff={visibleItems} />
      </div>
      <div className="pagination">
        <Paginate
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
          handleChangeItemsPerPage={handleChangeItemsPerPage}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
