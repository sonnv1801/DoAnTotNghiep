import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {HomePage}  from "./page/admin/homepage/HomePage";
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
import RegisterAccount from "./page/admin/registerAccount/RegisterAccount";
import Test from "./components/Test";
import KommunicateChat from "./page/home/chatbox/ChatBox";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import NavBarTest from "./page/admin/testHome/TestHome";
import { FeedBack } from "./page/home/feedback/Feedback";

Kommunicate.init("3df8fbf7aa958bd54c3732cacff94409f");

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
      {/* <KommunicateChat /> */}
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
                <Route path="/register-account" element={<RegisterAccount />} />
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/testh" element={<NavBarTest />} />

              </Route>
            </>
          ) : (
            <>
              <Route element={<LayOut />}>
                <Route path="/" element={<HomePageStaff />} />
                <Route path="/statistic" element={<Statistical />} />
                <Route path="/timekp" element={<TimeKeeping />} />
                <Route path="/feedback" element={<FeedBack />} />
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
