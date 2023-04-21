import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./style.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TableTime from "./../../../components/tabletimeconfig/TableTimeConfig"
import { createTimes } from "../../../redux/actions/time.action";


export const TimeConfig = () => {
  const [time_in, setTimeIn] = useState('');
  const [time_out, setTimeOut] = useState('');
  const dispatch = useDispatch();

  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };


  const handleTimeOutChange = (event) => {
    setTimeOut(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTime = {
      time_in: time_in,
      time_out : time_out
    };
    dispatch(createTimes(newTime));
   
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(`Time in: ${time_in}, Time out: ${time_out}`);
  // };
  return (
    <div className="timecf">
      <div className="title-time">
        <p>Cấu hình thời gian</p>
      </div>
      
        <div className="sub-time-cf">
        <form onSubmit={handleSubmit} className="sub-time-cf">
        <div className="save-time">
          <Button  type="submit" variant="outlined" startIcon={<SaveIcon />}>
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
                  <span>Thời gian vào</span>
                </div>
                <div className="col-8">
                <input type="time" value={time_in} onChange={handleTimeInChange} />
                </div>
                <div className="col-4">
                  <span>Thời gian ra</span>
                </div>
                <div className="col-8">
                <input type="time" value={time_out} onChange={handleTimeOutChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table-time-config">
            <TableTime />
        </div>
        </div>
      </div>
  );
};


