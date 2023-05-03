import React, { useEffect, useState } from "react";
import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import TableTimeKp from "./../../../components/table-tiemkeeping/TableTimeKp";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStaff,
  listWorkStaff,
} from "../../../redux/actions/staff.action";
import { Search } from "../../../components/search/Search";

export const TimeKeeping = () => {
  const dispatch = useDispatch();
  const listKeeping = useSelector((state) => state.defaultReducer.listStaff);
  const staffWorkHour = listWorkStaff(listKeeping);
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  const user = JSON.parse(localStorage.getItem("token"));

  console.log(staffWorkHour, "staffWorkHour");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchDep, setSearchDep] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSearchMonth(event.target.value);
  };

  const handleDepChange = (event) => {
    setSearchDep(event.target.value);
  };

  // const filteredStudents = searchTerm
  //   ? staffWorkHour.filter(
  //       (staff) =>
  //         staff.name.toLowerCase() === searchTerm.toLowerCase() ||
  //         staff.Student_Id.toLowerCase() === searchTerm.toLowerCase() ||
  //         staff.Dep.toLowerCase() === searchTerm.toLowerCase()
  //     )
  //   : null;

  const filteredStudents = staffWorkHour.filter((staff) => {
    const nameMatch = staff.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const depMatch = staff.Dep.toLowerCase().includes(searchDep.toLowerCase());
    const monthMatch = searchMonth
      ? staff.day.includes(`/${searchMonth}/`)
      : true;
    return nameMatch && monthMatch && depMatch;
  });
  return (
    <div className="timekeeping">
      <div className="title-timekeeping">
        {user?.role === true ? (
          <>
            <p>Chấm công</p>
          </>
        ) : (
          <>
            <p>Thời gian đi làm</p>
          </>
        )}
      </div>
      <div className="table-time-keeping">
        <div className="row">
          <div className="col-3">
            <div className="list-search">
              <form className="form-inline my-2 my-lg-0 ml-5">
                <div className="search-staff">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    name="search"
                    placeholder="Tìm Kiếm"
                    onChange={handleSearchChange}
                    aria-label="Search"
                  />
                  <SearchIcon className="icon-search" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-3">
            <select onChange={handleMonthChange}>
              <option value="">Chọn Tháng</option>
              <option value="01">Tháng 1</option>
              <option value="02">Tháng 2</option>
              <option value="03">Tháng 3</option>
              <option value="04">Tháng 4</option>
              <option value="05">Tháng 5</option>
              <option value="06">Tháng 6</option>
              <option value="07">Tháng 7</option>
              <option value="08">Tháng 8</option>
              <option value="09">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>
          <div className="col-3">
            <div>
              <select onChange={handleDepChange}>
                <option value="">Tất cả phòng ban</option>
                <option value="IT">IT</option>
                <option value="Computer">Computer</option>
                <option value="Human">Human</option>
              </select>
            </div>
          </div>
        </div>
        <TableTimeKp
          staffkeeping={staffWorkHour}
          filteredStudents={filteredStudents}
        />
      </div>
    </div>
  );
};
