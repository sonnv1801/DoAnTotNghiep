import React, { useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import TableTime from "./../../../components/tabletimeconfig/TableTimeConfig"

export const TimeConfig = () => {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };

  const handleTimeOutChange = (event) => {
    setTimeOut(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Time in: ${timeIn}, Time out: ${timeOut}`);
  };
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
                <input type="time" value={timeIn} onChange={handleTimeInChange} />
                </div>
                <div className="col-4">
                  <span>Thời gian ra</span>
                </div>
                <div className="col-8">
                <input type="time" value={timeOut} onChange={handleTimeOutChange} />
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


