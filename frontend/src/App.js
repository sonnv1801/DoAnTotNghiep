import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { HomePage } from "./page/home/homepage/HomePage";
import { Staff } from "./page/home/staff/Staff";
import { Login } from "./page/home/login/Login";
import { TimeConfig } from "./page/home/timeconfig/TimeConfig";
import { Statistical } from "./page/home/statistical/Statistical";
import { TimeKeeping } from "./page/home/timekeeping/TimeKepping";
import NotFound from "./page/home/notfound/NotFound";
import { LayOut } from "./components/layout/LayOut";

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
            <Route element={<LayOut />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/list-staff" element={<Staff />} />

              <Route path="/cf-time" element={<TimeConfig />} />
              <Route path="/statistic" element={<Statistical />} />
              <Route path="/timekp" element={<TimeKeeping />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
