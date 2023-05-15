import React, { useEffect, useState } from "react";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  registerUser,
} from "../../redux/actions/user.action";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Paginate from "../pagination/Pagination";
export const ListAccount = () => {
  const [show, setShow] = useState("");

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.defaultReducer.isLoading);
  const listUser = useSelector((state) => state.defaultReducer.listUser);
  const currentUser = JSON.parse(localStorage.getItem("token"));

  const handleRegister = (e) => {
    e.preventDefault();
    if (fullname !== "" && username !== "" && password !== "" && role !== "") {
      const newUser = {
        fullname: fullname,
        username: username,
        password: password,
        role: role,
      };
      const close = setShow(false);

      registerUser(newUser, dispatch, close);
    } else {
      toast.warning("Vui lòng nhập đầy đủ thông tin", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(getAllUser(currentUser?.accessToken));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentAccount = listUser.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(listUser.length / usersPerPage);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="w-full mb-4 ml-4 mt-8">
      <div className="mr-4">
        <ToastContainer />
        <div className="float-right mb-2 bg-blue-400 rounded-md hover:bg-blue-600">
          <button
            className="p-2 text-md uppercase text-white font-bold "
            onClick={handleShow}
          >
            Thêm Tài Khoản
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cấp Tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tên</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                  >
                    <option value="">Chọn Tên</option>
                    <option value="Nhân Viên">Nhân Viên</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tài khoản đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User01"
                    autoFocus
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mật khẩu đăng nhập</Form.Label>
                  <Form.Control
                    type="password"
                    autoFocus
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Quyền Hạn</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value="">Chọn Quyền</option>
                    <option value={true}>Admin</option>
                    <option value={false}>Nhân Viên</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="border-2 border-blue-500 text-blue-400 p-2 rounded-md text-base font-semibold hover:bg-blue-500 hover:text-white"
                type="submit"
                onClick={handleRegister}
              >
                Lưu thông tin
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        <TableContainer
          className="shadow-lg shadow-slate-600 mt-4"
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Tên</TableCell>
                <TableCell align="right">Tên đăng nhập</TableCell>
                <TableCell align="right">Quyền</TableCell>
                <TableCell align="right">Hành Động</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span
                  style={{
                    color: "red",
                    marginLeft: "1rem",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  Loading...
                </span>
              </>
            ) : (
              <>
                <TableBody>
                  {currentAccount.map((item, index) => (
                    <>
                      {item?.role === false ? (
                        <TableRow
                          key={item._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index}
                          </TableCell>
                          <TableCell align="right">{item.fullname}</TableCell>
                          <TableCell align="right">{item.username}</TableCell>
                          <TableCell align="right">
                            {item.role ? "Admin" : "Nhân Viên"}
                          </TableCell>
                          <TableCell align="right">
                            <DeleteForeverOutlinedIcon
                              style={{
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch(
                                  deleteUser(item._id, currentUser?.accessToken)
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ) : (
                        ``
                      )}
                    </>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
      </div>
      <div className="pagination">
        <Paginate
          handleClickPrev={handlePreviousPage}
          handleClickNext={handleNextPage}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
