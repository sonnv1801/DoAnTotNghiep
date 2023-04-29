import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { HomePage } from "./page/admin/homepage/HomePage";
import { Staff } from "./page/admin/staff/Staff";
import { Login } from "./page/admin/login/Login";
import { TimeConfig } from "./page/admin/timeconfig/TimeConfig";
import { Statistical } from "./page/admin/statistical/Statistical";
import { TimeKeeping } from "./page/admin/timekeeping/TimeKepping";
import NotFound from "./page/admin/notfound/NotFound";
import { LayOut } from "./components/layout/LayOut";
import { CreateSalary } from "./page/admin/salary/Salary";
import EditSalary from "./components/table-salary/EditSalary";
import { HomePageStaff } from "./page/home/homepage/HomePageStaff";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
      <Router>
        <Routes>
          {user === null ? (
            <>
              <Route path="/" element={<Login />} />
            </>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}

          {user?.role === true ? (
            <>
              <Route element={<LayOut />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/list-staff" element={<Staff />} />

                <Route path="/cf-time" element={<TimeConfig />} />
                <Route path="/statistic" element={<Statistical />} />
                <Route path="/timekp" element={<TimeKeeping />} />
                <Route path="/salary" element={<CreateSalary />} />
                <Route path="/edit-salary/:id" element={<EditSalary />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </>
          ) : (
            <>
              <Route element={<LayOut />}>
                <Route path="/" element={<HomePageStaff />} />
                <Route path="/statistic" element={<Statistical />} />
                <Route path="/timekp" element={<TimeKeeping />} />
              </Route>
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
