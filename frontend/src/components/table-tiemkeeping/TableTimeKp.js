import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CSVLink } from "react-csv";
import _ from "lodash";
import { useSelector } from "react-redux";
import moment from "moment";

export default function TableTimeKp(staffkeeping) {
  // console.log(staffkeeping.staffkeeping, "staffkeeping11111");
  const filteredData = _.uniqBy(staffkeeping.staffkeeping, "Student_Id");
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);
  const off = "1";

  const start = moment("06:00	", "HH:mm");
  const end = moment("16:00", "HH:mm");
  const duration = moment.duration(end.diff(start));
  const workingHours = duration.asHours();
  const overtimeHours = Math.max(workingHours - 8, 0);

  if (overtimeHours >= 1) {
    console.log(`Tăng ca ${overtimeHours} giờ`);
  } else {
    console.log("Chưa đủ giờ tăng ca");
  }
  return (
    <>
      {isLoading ? (
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Tên Nhân Viên</TableCell>
                <TableCell align="right">Phòng Ban</TableCell>
                <TableCell align="right">Ngày</TableCell>
                <TableCell align="right">Thời gian vào</TableCell>
                <TableCell align="right">Thời gian ra</TableCell>
                <TableCell align="right">Thời gian nghỉ ngơi</TableCell>
                <TableCell align="right">Thời gian thực tế</TableCell>
                <TableCell align="right">Đánh giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffkeeping.staffkeeping?.map((row, index) => (
                <TableRow
                  key={row.Student_Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{row.Student_Id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.Dep}</TableCell>
                  <TableCell align="right">{row.day}</TableCell>
                  <TableCell align="right">{row.time_in}</TableCell>
                  <TableCell align="right">{row.time_out}</TableCell>
                  <TableCell align="right">{off}</TableCell>
                  <TableCell align="right">
                    {moment
                      .utc(
                        moment(row.workTime, "HH:mm").diff(
                          moment("1:00", "HH:mm")
                        )
                      )
                      .format("HH:mm")}
                  </TableCell>

                  <TableCell align="right">
                    {moment
                      .utc(
                        moment(row.workTime, "HH:mm").diff(
                          moment("1:00", "HH:mm")
                        )
                      )
                      .format("HH:mm") === "08:00" ? (
                      <p style={{ color: "orange", margin: "0" }}>Đủ 8 Tiếng</p>
                    ) : moment
                        .utc(
                          moment(row.workTime, "HH:mm").diff(
                            moment("1:00", "HH:mm")
                          )
                        )
                        .format("HH:mm") > "08:00" ? (
                      <p style={{ color: "green", margin: "0" }}>
                        {`Chấm công sau ${moment
                          .utc(
                            moment(row.workTime, "HH:mm").diff(
                              moment("9:00", "HH:mm")
                            )
                          )
                          .format("HH:mm")} 
                       `}
                      </p>
                    ) : (
                      <p style={{ color: "red", margin: "0" }}>Đi Trễ</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
