import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { HomePage } from "./page/home/homepage/HomePage";
import { Staff } from "./page/home/staff/Staff";
import { Login } from "./page/home/login/Login";
import { TimeConfig } from "./page/home/timeconfig/TimeConfig";
import { Statistical } from "./page/home/statistical/Statistical";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list-staff" element={<Staff />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cf-time" element={<TimeConfig />} />
          <Route path="/statistic" element={<Statistical />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
