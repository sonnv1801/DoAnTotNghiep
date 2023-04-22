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
import moment from "moment";

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

function formatTime(isoTime) {
  const date = new Date(isoTime);
  return date.toLocaleTimeString("en-US", { hour12: false });
}

function calculateWorkingHours(morningData, afternoonData) {
  // Create an object to store working hours of each employee
  const workingHours = {};

  // Loop through the morningData array
  morningData.forEach((morningItem) => {
    // Loop through the afternoonData array to find a matching item
    afternoonData.forEach((afternoonItem) => {
      if (
        morningItem.id === afternoonItem.id &&
        morningItem.date === afternoonItem.date
      ) {
        // Calculate the working hours for this employee on this day
        const start = moment(morningItem.time, "H");
        const end = moment(afternoonItem.time, "H");
        const duration = moment.duration(end.diff(start));
        const hours = duration.asHours();

        // Add the working hours to the workingHours object
        if (!workingHours[morningItem.id]) {
          workingHours[morningItem.id] = {
            name: morningItem.name,
            date: morningItem.date,
            hours: 0,
          };
        }
        workingHours[morningItem.id].hours += hours;
      }
    });
  });

  // Return the workingHours object
  return workingHours;
}

export default function Tables(listStaff) {
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);
  const search = useSelector((state) => state.defaultReducer.search);
  console.log(search);
  const filteredData = _.uniqBy(listStaff.listStaff, "Student_Id");
  const filteredsearch = _.uniqBy(search, "Student_Id");

  const mergedData = [];
  const morningData = [];
  const afternoonData = [];
  listStaff.listStaff.map((item) => {
    if (item.time < "12:00:00") {
      morningData.push(item);
    } else {
      afternoonData.push(item);
    }
  });

  console.log("Morning:", morningData);
  console.log("Afternoon:", afternoonData);

  // const morningData = [
  //   {
  //     Student_Id: 1,

  //     name: "Nguyen Van Son",
  //     day: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 2,

  //     name: "Nguyen Van Huy",
  //     day: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 3,

  //     name: "Nguyen Van Lip",
  //     day: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },

  //   {
  //     Student_Id: 4,

  //     name: "Nguyen Van Hoang",
  //     day: "26/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 5,

  //     name: "Nguyen Van B",
  //     day: "26/04/2023",
  //     time: "10:59:43",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 6,

  //     name: "Nguyen Van 123",
  //     day: "30/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 6,

  //     name: "Nguyen Van 123",
  //     day: "31/04/2023",
  //     time: "10:00:59",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 8,

  //     name: "Nguyen Van Líp Báo",
  //     day: "31/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 8,

  //     name: "Nguyen Van Líp Báo",
  //     day: "31/04/2023",
  //     time: "11:59:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  // ];

  // const afternoonData = [
  //   {
  //     Student_Id: 1,

  //     name: "Nguyen Van Son",
  //     day: "25/04/2023",
  //     time: "17:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 2,

  //     name: "Nguyen Van Huy",
  //     day: "25/04/2023",
  //     time: "17:00:45",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 3,

  //     name: "Nguyen Van Lip",
  //     day: "25/04/2023",
  //     time: "16:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },

  //   {
  //     Student_Id: 5,

  //     name: "Nguyen Van B",
  //     day: "27/04/2023",
  //     time: "14:43:34",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 6,

  //     name: "Nguyen Van 123",
  //     day: "31/04/2023",
  //     time: "17:40:34",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 7,

  //     name: "Nguyen Van Báo",
  //     day: "31/04/2023",
  //     time: "15:00:43",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 7,

  //     name: "Nguyen Van Báo",
  //     day: "31/04/2023",
  //     time: "17:59:21",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 8,

  //     name: "Nguyen Van Líp Báo",
  //     day: "31/04/2023",
  //     time: "13:00:59",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  //   {
  //     Student_Id: 8,

  //     name: "Nguyen Van Líp Báo",
  //     day: "31/04/2023",
  //     time: "16:01:21",
  //     Dep: "IT",
  //     roll: "Admin",
  //   },
  // ];

  // for (let i = 0; i < morningData.length; i++) {
  // const morningObj = morningData[i];
  // const afternoonObj = afternoonData.find(
  //   (obj) =>
  //     obj.Student_Id === morningObj.Student_Id && obj.day === morningObj.day
  // );
  // const morningItem = morningData[i];
  // const matchingAfternoonItem = afternoonData.find(
  //   (afternoonItem) =>
  //     afternoonItem.Student_Id === morningItem.Student_Id &&
  //     afternoonItem.day === morningItem.day
  // );
  // if (afternoonObj) {
  //   const mergedObj = {
  //     Student_Id: morningObj.Student_Id,
  //     name: morningObj.name,
  //     day: morningObj.day,
  //     time_in: morningObj.time,
  //     time_out: afternoonObj.time,
  //     Dep: morningObj.Dep,
  //     roll: morningObj.roll,
  //   };

  //   mergedData.push(mergedObj);
  // }\
  //   if (matchingAfternoonItem) {
  //     mergedData.push({
  //       Student_Id: morningItem.Student_Id,
  //       name: morningItem.name,
  //       day: morningItem.day,
  //       time_in: morningItem.time,
  //       time_out: matchingAfternoonItem.time,
  //       Dep: morningItem.Dep,
  //       roll: morningItem.roll,
  //     });
  //   }
  // }

  // console.log(mergedData, "mergedData");

  const users = morningData
    .concat(afternoonData)
    .reduce((map, user) => {
      const existingUser = map.get(user.Student_Id + user.day);
      if (existingUser) {
        existingUser.time_out = user.time;
      } else {
        map.set(user.Student_Id + user.day, {
          Student_Id: user.Student_Id,
          name: user.name,
          day: user.day,
          time_in: user.time,
          time_out: null,
          Dep: user.Dep,
          roll: user.roll,
        });
      }
      return map;
    }, new Map())
    .values();

  console.log(Array.from(users), "users");

  // const morningData = [
  //   { id: 1,  name: 'Nguyen Van Son', date: '25/04/2023', time: '08:00:00', Dep: 'IT', roll: 'Admin' },
  //   { id: 2, age: 18, name: 'Nguyen Van Huy', date: '25/04/2023', time: '08:00:00', Dep: 'IT', roll: 'Admin' },
  //   { id: 3, age: 18, name: 'Nguyen Van Lip', date: '25/04/2023', time: '08:00:00', Dep: 'IT', roll: 'Admin' },
  // ];

  // const afternoonData = [
  //   { id: 1, age: 18, name: 'Nguyen Van Son', date: '25/04/2023', time: '17:00:00', Dep: 'IT', roll: 'Admin' },
  //   { id: 2, age: 18, name: 'Nguyen Van Huy', date: '25/04/2023', time: '17:00:00', Dep: 'IT', roll: 'Admin' }
  // ];

  // const dataMap = new Map();

  // // Process morning data
  // morningData.forEach((item) => {
  //   const key = item.id + item.date;
  //   if (dataMap.has(key)) {
  //     dataMap.get(key).time_in = item.time;
  //   } else {
  //     dataMap.set(key, Object.assign({}, item));
  //   }
  // });

  // // Process afternoon data
  // afternoonData.forEach((item) => {
  //   const key = item.id + item.date;
  //   if (dataMap.has(key)) {
  //     dataMap.get(key).time_out = item.time;
  //   } else {
  //     dataMap.set(key, Object.assign({}, item));
  //   }
  // });

  // // Convert Map to array
  // const result = Array.from(dataMap.values());

  // console.log(result, "result");

  // console.log(workingHours[2]); // { name: 'Nguyen Van Son', date: '25/04/2023', hours: 9 }
  // console.log(workingHours[2]); // { name: 'Nguyen Van Huy', date: '25/04/2023', hours: 9 }
  // console.log(workingHours[3]); // { name: 'Nguyen Van Huy', date: '25/04/2023', hours: 9 }

  // console.log(filteredEmployeeList, "filteredEmployeeList");

  // const employeess = [
  //   {
  //     id: 1,
  //     age: 18,
  //     name: "Nguyen Van Son",
  //     date: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //     time_in: "08:00:00",
  //     time_out: "17:20:30",
  //   },
  //   {
  //     id: 2,
  //     age: 18,
  //     name: "Nguyen Van Huy",
  //     date: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //     time_in: "08:00:00",
  //     time_out: "17:50:59",
  //   },
  // ];

  // function getTimeDiff(time_in, time_out) {
  //   const diff = new Date(
  //     new Date(`01/01/1970 ${time_out}`) - new Date(`01/01/1970 ${time_in}`)
  //   );
  //   const hours = diff.getUTCHours();
  //   const minutes = diff.getUTCMinutes();
  //   return `${hours}:${minutes}`;
  // }

  // const employeeWorkTimes = employeess.map((employee) => ({
  //   ...employee,
  //   workTime: getTimeDiff(employee.time_in, employee.time_out),
  // }));

  // console.log(employeeWorkTimes, "employeeWorkTimes");

  // function getSalary(workTime, salaryPerHour) {
  //   const [hours, minutes] = workTime.split(":");
  //   const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  //   const salary = totalMinutes * (salaryPerHour / 60);
  //   return salary;
  // }

  // const employeesss = [
  //   {
  //     id: 1,
  //     age: 18,
  //     name: "Nguyen Van Son",
  //     date: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //     time_in: "08:00:00",
  //     time_out: "17:00:00",
  //     workTime: "8:00",
  //   },
  //   {
  //     id: 2,
  //     age: 18,
  //     name: "Nguyen Van Huy",
  //     date: "25/04/2023",
  //     time: "08:00:00",
  //     Dep: "IT",
  //     roll: "Admin",
  //     time_in: "08:00:00",
  //     time_out: "16:30:00",
  //     workTime: "8:59",
  //   },
  // ];

  // const salaryPerHour = 20000;

  // const employeeSalaries = employeesss.map((employee) => ({
  //   ...employee,
  //   salary: getSalary(employee.workTime, salaryPerHour),
  // }));

  // console.log(employeeSalaries, "employeeSalaries");
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
                      <StyledTableCell align="right">
                        {row.Student_Id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">18/10/2001</StyledTableCell> */}
                      <StyledTableCell align="right">{row.Dep}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roll === 1 ? "Nhân Viên" : "Admin"}
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
                      <StyledTableCell align="right">
                        {row.Student_Id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.Dep}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.roll === 1 ? "Nhân Viên" : "Admin"}
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
