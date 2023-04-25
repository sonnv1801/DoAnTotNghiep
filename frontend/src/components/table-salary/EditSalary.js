import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIdSalary, updateSalarys } from "../../redux/actions/salary.action";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { getAllStaff } from "../../redux/actions/staff.action";
import _ from "lodash";
const EditSalary = () => {
  const currentUser = JSON.parse(localStorage.getItem("token"));
  const [Dep, setDep] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [social_insurance, setSocialInsurance] = useState("");
  const [health_insurance, setHealthInsurance] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const listStaff = useSelector((state) => state.defaultReducer.listStaff);
  const filteredData = _.uniqBy(listStaff, "Dep");
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);
  console.log(id, "id");
  useEffect(() => {
    dispatch(getIdSalary(id));
  }, []);
  const salaryFecth = useSelector((state) => state.defaultReducer?.salaryFecth);

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
      console.log(newSalary);
      dispatch(
        updateSalarys(id, currentUser?.accessToken, newSalary, navigate)
      );
    } else {
      toast.warning("Vui lòng không để trống trường này", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  console.log(salaryFecth, "salaryFecth");
  return (
    <div className="container">
      <form>
        <div className="title">
          <p>Chỉnh sửa lương nhân viên</p>
        </div>
        <div className="mb-3">
          <label className="form-label">Phòng/Ban</label>
          {/* <input
            defaultValue={salaryFecth?.Dep}
            onChange={handleDepChange}
            type="text"
            className="form-control"
          /> */}
<select onChange={handleDepChange}>
            <option>Chọn Phòng Ban</option>
            {filteredData.map((item, index) => (
              <option key={index} value={item.Dep}>
                {item.Dep}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Lương cơ bản</label>
          <input
            defaultValue={salaryFecth?.basicSalary}
            onChange={handleBasicSalaryChange}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phụ cấp</label>
          <input
            defaultValue={salaryFecth?.allowance}
            onChange={handleAllowanceChange}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">BHXH</label>
          <input
            defaultValue={salaryFecth?.social_insurance}
            onChange={handleSocialChange}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">BHYT</label>
          <input
            defaultValue={salaryFecth?.health_insurance}
            onChange={handleHealthChange}
            type="text"
            className="form-control"
          />
        </div>
        <Button onClick={handleSubmit} type="submit" variant="primary">
          Lưu thay đổi
        </Button>
      </form>
    </div>
  );
};

export default EditSalary;