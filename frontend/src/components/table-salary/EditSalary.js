import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSalary,
  getIdSalary,
  updateSalarys,
} from "../../redux/actions/salary.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllStaff } from "../../redux/actions/staff.action";
import _ from "lodash";

const EditSalary = () => {
  const currentUser = JSON.parse(localStorage.getItem("token"));
  const salaryFecth = useSelector((state) => state.defaultReducer?.salaryFecth);
  const [Dep, setDep] = useState(salaryFecth?.Dep);
  const [basicSalary, setBasicSalary] = useState(salaryFecth?.basicSalary);
  const [allowance, setAllowance] = useState(salaryFecth?.allowance);
  const [social_insurance, setSocialInsurance] = useState(
    salaryFecth?.social_insurance
  );
  const [health_insurance, setHealthInsurance] = useState(
    salaryFecth?.health_insurance
  );


  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const listStaff = useSelector((state) => state.defaultReducer.listStaff);
  const filteredData = _.uniqBy(listStaff, "Dep");
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  useEffect(() => {
    dispatch(getAllSalary());
  }, []);
  useEffect(() => {
    dispatch(getIdSalary(id));
  }, []);

  const handleDepChange = (event) => {
    setDep(event.target.value);
  };

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(event.target.value);
  };
  const handleAllowanceChange = (event) => {
    setAllowance(event.target.value);
  };
  const handleSocialChange = (event) => {
    setSocialInsurance(event.target.value);
  };
  const handleHealthChange = (event) => {
    setHealthInsurance(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Dep !== "" &&
      basicSalary !== "" &&
      allowance !== "" &&
      social_insurance !== "" &&
      health_insurance !== ""
    ) {
      const newSalary = {
        Dep: Dep,
        basicSalary: basicSalary,
        allowance: allowance,
        social_insurance: social_insurance,
        health_insurance: health_insurance,
      };

      dispatch(
        updateSalarys(id, currentUser?.accessToken, newSalary, navigate)
      );
    } else {
      toast.warning("Vui lòng không để trống trường này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="w-full h-full flex justify-content-center">
      <div className="w-2/5 m-6 border-2 border-black  ">
        <form className="min-h-full px-4">
          <div className="text-xl font-bold text-center py-3">
            <p>Chỉnh sửa lương nhân viên</p>
          </div>
          <div className="mb-3">
            <label className="form-label">Phòng/Ban</label>
            <br />
            <select
              disabled
              className="border border-gray-200 rounded w-full py-1"
              onChange={handleDepChange}
            >
              <option>{Dep}</option>
              {/* {filteredData.map((item, index) => (
                <option key={index} value={item.Dep}>
                  {item.Dep}
                </option>
              ))} */}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Lương cơ bản</label>
            <input
              value={basicSalary}
              onChange={handleBasicSalaryChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phụ cấp</label>
            <input
              defaultValue={allowance}
              onChange={handleAllowanceChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">BHXH</label>
            <input
              defaultValue={social_insurance}
              onChange={handleSocialChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">BHYT</label>
            <input
              defaultValue={health_insurance}
              onChange={handleHealthChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-4">
            <button
              className="p-2 bg-blue-400 rounded text-base text-white font-semibold hover:bg-blue-700"
              onClick={handleSubmit}
              type="submit"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalary;
