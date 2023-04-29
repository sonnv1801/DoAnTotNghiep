import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TableTime from "./../../../components/tabletimeconfig/TableTimeConfig";
import { addTime, getAllTimeCf } from "../../../redux/actions/time.action";

export const TimeConfig = () => {
  const currentUser = JSON.parse(localStorage.getItem("token"));
  const listTime = useSelector((state) => state.defaultReducer.listTimeCf);
  const [time_in, setTimeIn] = useState("");
  const [time_out, setTimeOut] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimeCf());
  }, []);

  console.log(listTime);

  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };

  const handleTimeOutChange = (event) => {
    setTimeOut(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (time_in !== "" && time_out !== "") {
      const newTime = {
        time_in: time_in,
        time_out: time_out,
      };
      dispatch(addTime(newTime, currentUser?.accessToken));
    } else {
      toast.warning("Vui lòng không để trống trường này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="timecf">
      <ToastContainer />
      <div className="title-time">
        <p>Cấu hình thời gian</p>
      </div>

      <div className="sub-time-cf">
        <form onSubmit={handleSubmit} className="sub-time-cf">
          <div className="save-time">
            <Button type="submit" variant="outlined" startIcon={<SaveIcon />}>
              Lưu cấu hình
            </Button>
          </div>
        </form>

        {/* <p onClick={handleClick}>Lưu</p> */}

        <div className="time-work">
          <div className="title-time-work">
            <p>Thiết lập thời gian</p>
          </div>
          <div className="body-time-work">
            <div className="sub-body-time">
              <div className="row">
                <div className="col-4">
                  <span>Thời gian vào</span>
                </div>
                <div className="col-8">
                  <input
                    type="time"
                    step="1"
                    value={time_in}
                    onChange={handleTimeInChange}
                  />

                </div>
                <div className="col-4">
                  <span>Thời gian ra</span>
                </div>
                <div className="col-8">
                  <input
                    type="time"
                    step="1"
                    value={time_out}
                    onChange={handleTimeOutChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-time-config">
          <TableTime listTime={listTime} />
        </div>
      </div>
    </div>
  );
};
