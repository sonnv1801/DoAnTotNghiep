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
  const [time_morning, setTimeMorning] = useState("");
  const [time_afternoon, setTimeAfternoon] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimeCf());
  }, []);

  console.log(listTime);

  const handleTimeMorningChange = (event) => {
    setTimeMorning(event.target.value);
  };

  const handleTimeAfternoonChange = (event) => {
    setTimeAfternoon(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (time_morning !== "" &&  time_afternoon !== "") {
      const newTime = {
        time_morning: time_morning,
        time_afternoon: time_afternoon,
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
        <div className="time-work">
          <div className="title-time-work">
            <p>Thiết lập thời gian</p>
          </div>
          <div className="body-time-work">
            <div className="sub-body-time">
              <div className="row">
                <div className="col-4">
                  <span>Thời gian buổi sáng </span>
                </div>
                <div className="col-8">
                  <input
                    type="time"
                    step="1"
                    value={time_morning}
                    onChange={handleTimeMorningChange}
                  />

                </div>
                <div className="col-4">
                  <span>Thời gian buổi chiều</span>
                </div>
                <div className="col-8">
                  <input
                    type="time"
                    step="1"
                    value={time_afternoon}
                    onChange={handleTimeAfternoonChange}
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
