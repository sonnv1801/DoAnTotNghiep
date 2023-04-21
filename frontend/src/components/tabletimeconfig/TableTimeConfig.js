import  React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import moment from 'moment';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTimes, getAllTime } from "../../redux/actions/time.action";


export  const TableTime = ()  =>{
  const dispatch = useDispatch();
  const listTime = useSelector((state) => state.defaultReducer.listTime);
  const loading = useSelector((state) => state.defaultReducer.isLoading);
console.log(loading);


  useEffect(() => {
    dispatch(getAllTime());
  }, []);
  return (
  
    <>
    
    {loading ? (<>
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
    </>): (<>
    
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell align="right">Thời gian vào</TableCell>
            <TableCell align="right">Thời gian ra</TableCell>
            <TableCell align="right">Ngày tạo</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listTime?.times?.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{item.time_in}</TableCell>
              <TableCell align="right">{item.time_out}</TableCell>
              <TableCell align="right">{moment(item.created_at).format('DD/MM/YYYY')}</TableCell>
             <TableCell align="right"><button onClick={() => {
                            dispatch(
                              deleteTimes(item._id)
                            );
                          }}>delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>)}
    </>
   
  );
}

export default TableTime;