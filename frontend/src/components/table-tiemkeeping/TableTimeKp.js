import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(number, id, name, birtday, room, timekeeping) {
  return { number, id, name, birtday, room, timekeeping };
}

const rows = [
  createData("1", "NV1", "Huỳnh Ngọc Huy", "28/04/2001", "Develop", 29),
  createData("2", "NV2", "Nguyễn Văn Sơn", "28/04/2001", "Develop", 29),
  createData("3", "NV3", "Trần Ngọc Hoàng", "28/04/2001", "Develop", 29),
  createData("4", "NV4", "Nguyễn Phi Líp", "28/04/2001", "Develop", 29),
  createData("5", "NV5", "Huỳnh Ngọc Huy", "28/04/2001", "Develop", 29),
  createData("6", "NV6", "Huỳnh Ngọc Huy", "28/04/2001", "Develop", 29),
];

export default function TableTimeKp() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Tên Nhân Viên</TableCell>
            <TableCell align="right">Ngày sinh</TableCell>
            <TableCell align="right">Phòng/Ban</TableCell>
            <TableCell align="right">Ngày công</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.birtday}</TableCell>
              <TableCell align="right">{row.room}</TableCell>
              <TableCell align="right">{row.timekeeping}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
