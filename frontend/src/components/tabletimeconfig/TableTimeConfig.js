import  React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
// function createData(number, starttime, endtime, datecreate) {
//   return { number, starttime, endtime, datecreate };
// }

// const rows = [
//   createData("1", "08:00 am", "17h:30 pm", "13/04/2023"),
//   createData("2", "09:00 am", "18h:30 pm", "13/04/2023"),
// ];

export  const TableTime = ()  =>{

  const [data, setData] = useState([]);
  const loadData = async () => {
    const res = await axios.get("http://localhost:8000/v1/time");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
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
          {data.map((time, index) => (
            <TableRow
              key={time.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{time.time_in}</TableCell>
              <TableCell align="right">{time.time_out}</TableCell>
              <TableCell align="right">{time.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableTime;