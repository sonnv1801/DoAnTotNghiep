import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "../../../components/list/List";
import { getAllStaff } from "../../../redux/actions/staff.action";
import "./style.css";

export const Staff = () => {
  const dispatch = useDispatch();
  const listStaff = useSelector((state) => state.defaultReducer.listStaff);

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  return (
    <div className="staff">
      <List listStaff={listStaff} />
    </div>
  );
};
