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
import { deleteTimes } from "../../redux/actions/time.action";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export const TableTime = (listTime) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("token"));

  const loading = useSelector((state) => state.defaultReducer.isLoading);



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
          <TableContainer component={Paper} className="">
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell align="right">Thời gian buổi sáng</TableCell>
                  <TableCell align="right">Thời gian buổi chiều</TableCell>
                  <TableCell align="right">Ngày tạo</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listTime?.listTime?.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.time_morning}</TableCell>
                    <TableCell align="right">{item.time_afternoon}</TableCell>
                    <TableCell align="right">
                      {moment(item.created_at).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      <DeleteForeverOutlinedIcon
                        style={{
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch(
                            deleteTimes(item._id, currentUser?.accessToken)
                          );
                        }}
                      />
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

export default TableTime;
