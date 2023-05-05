import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../redux/actions/staff.action";

const itemsPerPage = 5;

function Test() {
  const dispatch = useDispatch();
  const listStaff = useSelector((state) => state.defaultReducer.listStaff);

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const data = listStaff;
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div>
      <ul>
        {visibleItems.map((item, index) => (
          <div key={item._id}>
            <li>{index}</li>
            <li>{item.name}</li>
          </div>
        ))}
      </ul>
      <div>
        <button onClick={handleClickPrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleClickNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <span>Items per page:</span>
        <select onChange={handleChangeItemsPerPage}>
          {[5, 10, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Test;
