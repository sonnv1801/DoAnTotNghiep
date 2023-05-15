import * as React from "react";
import Button from "@mui/material/Button";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Logo from "../../../assets/logo.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavHome() {
  const user = JSON.parse(localStorage.getItem("token"));
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

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <SettingsAccessibilityIcon /> {user?.fullname}
      </MenuItem>
      <MenuItem>
        <Button
          variant="contained"
          onClick={handlelogout}
          style={{ background: "green" }}
        >
          Đăng Xuất
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className="w-full bg-black shadow-xl">
      <ToastContainer />
      <div style={{ marginTop: "7rem" }}></div>
      <nav
        className="bg-white text-black w-full"
        position="static"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "1",
          boxShadow: "0 3px 6px #00000029",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to="/">
              <img src={Logo} className="w-16" alt="home" />
            </Link>
          </IconButton>

          <ul className="flex pl-8">
            <Link to="/timekp">
              <Button
                variant="text"
                style={{
                  color: "#37517e",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  borderRight: "1px solid",
                  borderRadius: "inherit",
                }}
              >
                <TimelapseIcon /> Thời Gian Đi Làm
              </Button>
            </Link>
            <Link to="/statistic">
              <Button
                variant="text"
                style={{
                  color: "#37517e",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                  borderRight: "1px solid",
                  borderRadius: "inherit",
                }}
              >
                <LibraryBooksIcon /> Xem Công
              </Button>
            </Link>
            <Link to="/feedback">
              <Button
                variant="text"
                style={{
                  color: "#37517e",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginRight: "0.5rem",
                }}
              >
                <ConnectWithoutContactIcon /> Phản Hồi
              </Button>
            </Link>
          </ul>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <ul className="flex">
              <li className="pr-4">
                <Button
                  variant="text"
                  style={{ color: "#37517e", fontWeight: "bold" }}
                >
                  <SettingsAccessibilityIcon /> {user?.fullname}
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={handlelogout}
                  style={{ background: "green" }}
                >
                  Đăng Xuất
                </Button>
              </li>
            </ul>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </nav>
      {renderMobileMenu}
    </Box>
  );
}
