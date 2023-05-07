import React from "react";
import { useRecoilState } from "recoil";
import {activeNavItemState} from "../atoms/ActiveNavBarAtom"
import { ChatAltIcon, CogIcon, LogoutIcon, ShoppingCartIcon, TemplateIcon, UserIcon } from "@heroicons/react/outline";

const navLinks = [
  {
    id: 0,
    link: "/list-staff",
    title: "Thông tin nhân viên",
    icon: <UserIcon className="nav-icon" />,
  },
  {
    id: 1,
    link: "/cf-time",
    title: "Cấu hình thời gian",
    icon: <ShoppingCartIcon className="nav-icon" />,
  },
  
  {
    id: 2,
    link: "/statistic",
    title: "Tính lương",
    icon: <UserIcon className="nav-icon" />,
  },
  {
    id: 3,
    link: "/timekp",
    title: "Bảng công",
    icon: <ChatAltIcon className="nav-icon" />,
  },
  {
    id: 4,
    link: "/salary",
    title: "Bảng lương",
    icon: <CogIcon className="nav-icon" />,
  },
  {
    id: 5,
     link: "/register-account",
    title: "Cấp tài khoản",
    icon: <CogIcon className="nav-icon" />,
  },
  {
    id: 6,
    title: "LogOut",
    icon: <LogoutIcon className="nav-icon" />,
  },
];


function NavBarTest() {
  return (
    <nav className="col-span-2 border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full ">
        {navLinks.slice(0, 5).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
        <div className="w-full border-t border-gray-200" />
        {navLinks.slice(6, 7).map((link) => (
          <NavItem link={link} key={link.id} />
        ))}
      </div>
    </nav>
  );
}
function NavItem({ link }) {
  const [activeNav, setActiveNav] = useRecoilState(activeNavItemState);
  return (
    <div
      onClick={() => setActiveNav(link.id)}
      key={link.id}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-gray-900 border-l-4 border-transparent ${
         activeNav === link.id && "border-gray-900 "
       } `}
    >
      <span> {link.icon}</span>
      <h1
        className={`text-gray-600 group-hover:text-black xl:flex hidden ${
          activeNav === link.id && "text-black "
        }} `}
      >
        {link.title}
      </h1>
    </div>
  );
}

export default NavBarTest;
