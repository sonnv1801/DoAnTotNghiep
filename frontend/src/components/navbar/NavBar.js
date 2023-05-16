import React from "react";
import "./style.css";
import Logo from "../../assets/logo.png";
import { useRecoilState } from "recoil";
import { activeNavItemState } from "../../page/admin/atoms/ActiveNavBarAtom";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const user = JSON.parse(localStorage.getItem("token"));
const navLinks = [
  {
    id: 0,
    link: "/",
    title: `${user?.fullname}`,
    icon: <WavingHandIcon className="nav-icon" />,
  },
  {
    id: 1,
    link: "/list-staff",
    title: "Thông tin nhân viên",
    icon: <Person4OutlinedIcon className="nav-icon" />,
  },
  {
    id: 2,
    link: "/cf-time",
    title: "Cấu hình thời gian",
    icon: <ManageHistoryOutlinedIcon className="nav-icon" />,
  },

  {
    id: 3,
    link: "/statistic",
    title: "Tính lương",
    icon: <CalculateOutlinedIcon className="nav-icon" />,
  },
  {
    id: 4,
    link: "/timekp",
    title: "Bảng công",
    icon: <ListAltOutlinedIcon className="nav-icon" />,
  },
  {
    id: 5,
    link: "/salary",
    title: "Thêm lương",
    icon: <EditCalendarOutlinedIcon className="nav-icon" />,
  },
  {
    id: 6,
    link: "/register-account",
    title: "Cấp tài khoản",
    icon: <PersonAddOutlinedIcon className="nav-icon" />,
  },
  {
    id: 7,
    title: "Cấp tài khoản",
    icon: <LogoutTwoToneIcon className="nav-icon" />,
  },
  // {
  //   id: 8,
  //   title: "LogOut",
  //   icon: <LogoutTwoToneIcon className="nav-icon" />,
  // },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
      window.location.reload(false);
    }, 2000);
    toast.success(
      "Đăng xuất thành công! Đợi tý chúng tôi đang chuyển hướng...",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  };
  return (
    <nav className=" shadow-xl shadow-slate-300 min-h-screen w-[100px] xl:w-[250px]  px-1 flex flex-col items-start ">
      <div className=" my-4 xl:ml-[72px]">
        <Link to="/">
          <img src={Logo} className="w-16" alt="home" />
        </Link>
      </div>
      <div className="space-y-8  w-full ">
        {navLinks.slice(0, 7).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}

        <div className="w-full border-t border-gray-200" />

        <div
          onClick={handlelogout}
          className="w-full flex items-center justify-start space-x-4 px-3 cursor-pointer
     group hover:border-gray-900 border-l-4 border-transparent"
        >
          <span className=" -ml-2">
            <LogoutTwoToneIcon />
          </span>

          <h1 className="text-gray-600 group-hover:text-black xl:flex hidden ">
            Đăng Xuất
          </h1>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

function NavItem({ link }) {
  const [activeNav, setActiveNav] = useRecoilState(activeNavItemState);
  return (
    <div
      onClick={() => setActiveNav(link.id)}
      key={link.id}
      className={`w-full flex items-center justify-start space-x-4 px-3 cursor-pointer
     group hover:border-gray-900 border-l-4 border-transparent ${activeNav === link.id && "border-gray-900 "
        } `}
    >
      <span className=" -ml-2"> {link.icon}</span>
      <Link to={link.link}>
        <h1
          className={`text-gray-600 group-hover:text-black xl:flex text-sm hidden ${activeNav === link.id && "text-black "
            }} `}
        >
          {link.title}
        </h1>
      </Link>
    </div>
  );
}
