import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import _ from "lodash";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables(listStaff) {
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);
  const search = useSelector((state) => state.defaultReducer.search);
  const filteredData = _.uniqBy(listStaff.listStaff, "Id");
  const filteredsearch = _.uniqBy(search, "Id");
  console.log(filteredData, "filteredData");
  return (
    <>
      {search.length > 0 ? (
        <>
          {isLoading ? (
            <>
              <div className="spinner-border" roll="status">
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="right">ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Tên nhân viên
                    </StyledTableCell>
                    <StyledTableCell align="right">Phòng ban</StyledTableCell>
                    <StyledTableCell align="right">Vai trò</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredsearch?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.Id}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">18/10/2001</StyledTableCell> */}
                      <StyledTableCell align="right">{row.Dep}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roll === "1" ? "Nhân Viên" : "Admin"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <div className="spinner-border" roll="status">
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell align="right">ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Tên nhân viên
                    </StyledTableCell>
                    <StyledTableCell align="right">Phòng ban</StyledTableCell>
                    <StyledTableCell align="right">Vai trò</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.Id}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.Dep}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roll === "1" ? "Nhân Viên" : "Admin"}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
}
