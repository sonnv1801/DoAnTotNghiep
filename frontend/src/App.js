import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { HomePage } from "./page/home/homepage/HomePage";
import { Staff } from "./page/home/staff/Staff";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list-staff" element={<Staff />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
