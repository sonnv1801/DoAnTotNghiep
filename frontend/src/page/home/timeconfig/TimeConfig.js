import React from "react";
import "./style.css";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
export const TimeConfig = () => {
  return (
    <div className="timecf">
      <div className="title-time">
        <p>Cấu hình thời gian</p>
      </div>
      <div className="sub-time-cf">
        <div className="save-time">
          <Button variant="outlined" startIcon={<SaveIcon />}>
            Lưu cấu hình
          </Button>
        </div>
        <div className="time-work">
          <div className="title-time-work">
            <p>Thời Gian Vào Làm</p>
          </div>
          <div className="body-time-work">
            <div className="sub-body-time">
              <div className="row">
                <div className="col-4">
                  <span>Từ trước</span>
                </div>
                <div className="col-8">
                  <select>
                    <option>Chọn giờ</option>
                    <option>1H</option>
                    <option>2H</option>
                  </select>
                </div>
                <div className="col-4">
                  <span>Đến sau(phút)</span>
                </div>
                <div className="col-8">
                  <select>
                    <option>Chọn phút</option>
                    <option>1 phút</option>
                    <option>2 phút</option>
                    <option>3 phút</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="time-work">
          <div className="title-time-work">
            <p>Thời Gian Ra Về</p>
          </div>
          <div className="body-time-work">
            <div className="sub-body-time">
              <div className="row">
                <div className="col-4">
                  <span>Về sau</span>
                </div>
                <div className="col-8">
                  <select>
                    <option>Chọn giờ</option>
                    <option>1H</option>
                    <option>2H</option>
                  </select>
                </div>
                <div className="col-4">
                  <span>Đến trước(phút)</span>
                </div>
                <div className="col-8">
                  <select>
                    <option>Chọn phút</option>
                    <option>1 phút</option>
                    <option>2 phút</option>
                    <option>3 phút</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
