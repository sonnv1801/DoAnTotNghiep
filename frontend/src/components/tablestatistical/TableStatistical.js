import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { data } from '../../data/Data'


export default function BasicTable() {
  return (      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tên nhân viên</TableCell>
            <TableCell align="right">Chức vụ</TableCell>
            <TableCell align="right">Lương cơ bản</TableCell>
            <TableCell align="right">Lương thực tế</TableCell>
            <TableCell align="right">Phụ cấp</TableCell>
            <TableCell align="right">BHXH</TableCell>
            <TableCell align="right">BHYT</TableCell>
            <TableCell align="right">Thực nhận</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((datas) => (
            <TableRow
              key={datas.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {datas.Id}
              </TableCell>
              <TableCell align="right">{datas.Fullname}</TableCell>
              <TableCell align="right">{datas.ChucVu}</TableCell>
              <TableCell align="right">{datas.LươngCB}</TableCell>
              {/* <TableCell align="right">{datas.NgayCong}</TableCell> */}
              <TableCell align="right">{datas.LươngTT}</TableCell>
              <TableCell align="right">{datas.PhuCap}</TableCell>
              <TableCell align="right">{datas.BHXH}</TableCell>
              <TableCell align="right">{datas.BHYT}</TableCell>
              <TableCell align="right">{datas.ThucNhan}</TableCell>



            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
