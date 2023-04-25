import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { addSalary, getAllSalary } from "../../../redux/actions/salary.action";
import TableSalary from "../../../components/table-salary/TableSalary";
import { getAllStaff } from "../../../redux/actions/staff.action";
import _ from "lodash";

export const CreateSalary = () => {
  const [show, setShow] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("token"));
  const listSalary = useSelector((state) => state.defaultReducer.listSalary);
  const listStaff = useSelector((state) => state.defaultReducer.listStaff);
  const filteredData = _.uniqBy(listStaff, "Dep");

  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  console.log(filteredData, "filteredData111111111111111111111111");
  const [Dep, setDep] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [social_insurance, setSocialInsurance] = useState("");
  const [health_insurance, setHealthInsurance] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSalary());
  }, []);

  console.log(listSalary);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      dispatch(addSalary(newSalary, currentUser?.accessToken));
      setShow(false);
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
        <p>Thêm lương nhân viên</p>
      </div>
      <div className="sub-time-cf">
        <div className="sub-time-cf">
          <div className="save-time">
            <Button variant="primary" onClick={handleShow}>
              Thêm lương nhân viên
            </Button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm bảng lương nhân viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Phòng ban */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phòng/Ban</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Phòng/Ban"
                  autoFocus
                  value={Dep}
                  onChange={handleDepChange}
                /> */}
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleDepChange}
                >
                  {filteredData.map((item, index) => (
                    <option key={index} value={item.Dep}>
                      {item.Dep}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Lương Cơ bản */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Lương Cơ bản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số lương"
                  autoFocus
                  value={basicSalary}
                  onChange={handleBasicSalaryChange}
                />
              </Form.Group>

              {/* Phụ cấp */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phụ cấp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số tiền phụ cấp"
                  autoFocus
                  value={allowance}
                  onChange={handleAllowanceChange}
                />
              </Form.Group>
              {/* BHXH */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>BHXH</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số tiền đóng BHXH"
                  autoFocus
                  value={social_insurance}
                  onChange={handleSocialChange}
                />
              </Form.Group>

              {/* BHYT */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>BHYT</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Số tiền đóng BHYT"
                  autoFocus
                  value={health_insurance}
                  onChange={handleHealthChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary" onClick={handleSubmit}>
              Lưu thông tin
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="table-time-config">
          <TableSalary listSalary={listSalary} />
        </div>
      </div>
    </div>
  );
};
