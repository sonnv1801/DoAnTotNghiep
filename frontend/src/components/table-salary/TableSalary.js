import React from "react";
import Table from "@mui/material/Table";
import moment from "moment";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteSalarys } from "../../redux/actions/salary.action";
import { updateSalarys } from "../../redux/actions/salary.action";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

export const TableSalary = (
  listSalary
) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("token"));
  const loading = useSelector((state) => state.defaultReducer.isLoading);
  console.log(listSalary, "listSalary");
 

  return (
    <>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Phòng/Ban</TableCell>
                  <TableCell align="right">Lương Cơ Bản</TableCell>
                  <TableCell align="right">Phụ cấp</TableCell>
                  <TableCell align="right">BHXH</TableCell>
                  <TableCell align="right">BHYT</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listSalary?.listSalary?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.Dep}</TableCell>
                    <TableCell align="right">{item.basicSalary}</TableCell>
                    <TableCell align="right">{item.allowance}</TableCell>
                    <TableCell align="right">{item.social_insurance}</TableCell>
                    <TableCell align="right">{item.health_insurance}</TableCell>
                    <TableCell align="right">
                      <DeleteForeverOutlinedIcon style={{
              color: "red",
              cursor: "pointer"}} onClick={() => {
                          dispatch(
                            deleteSalarys(item._id, currentUser?.accessToken)
                          );
                        }} />
                      <Link to={`/edit-salary/${item._id}`}>
                      
                  < NoteAltOutlinedIcon    style={{cursor: "pointer" }}/>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default TableSalary;
