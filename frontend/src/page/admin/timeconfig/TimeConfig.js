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


  const handleTimeMorningChange = (event) => {
    setTimeMorning(event.target.value);
  };

  const handleTimeAfternoonChange = (event) => {
    setTimeAfternoon(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (time_morning !== "" && time_afternoon !== "") {
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
    <div className="w-full mb-4 ml-4 mt-8">
      <ToastContainer />
      <div className="text-base font-bold uppercase mb-4 border-l-4 border-indigo-500 ">
        <p className="ml-2">Cấu hình thời gian</p>
      </div>

      <div className="grid mr-4">
        <div className="w-full ">
          <form onSubmit={handleSubmit} >
            <div className="float-right block">
              <button className="bg-blue-400 text-white text-sm uppercase font-semibold p-2 px-4 rounded-md my-2 hover:bg-blue-700" type="submit" variant="outlined" startIcon={<SaveIcon />}>
                Lưu cấu hình
              </button>
            </div>
          </form>
        </div>
        <div className="w-full  shadow-md ">
          <div className="bg-blue-400 text-xl uppercase text-white font-bold p-4">
            <p>Thiết lập thời gian</p>
          </div>
          <div className="p-4">
            <div >
              <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-y-4">
                <div className="text-xl font-semibold">
                  <span >Thời gian buổi sáng </span>
                </div>
                <div className="col-span-2">
                  <input
                    type="time"
                    step="1"
                    value={time_morning}
                    onChange={handleTimeMorningChange}
                  />

                </div>
                <div className="text-xl font-semibold">
                  <span>Thời gian buổi chiều</span>
                </div>
                <div className="col-span-2">
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
        <div className="mt-4">
          <TableTime listTime={listTime} />
        </div>
      </div>
    </div>
  );
};
