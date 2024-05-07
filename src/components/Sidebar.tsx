import "./Sidebar.css";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const menuItems = [
  {
    icon: <FaShoppingCart />,
    text: "Products",
    path: "/",
  },
  {
    icon: <FaShoppingCart />,
    text: "Orders",
    path: "/orders",
  },
  {
    icon: <FaShoppingCart />,
    text: "Users",
    path: "/users",
  },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Products"); // first active class for home page
  return (
    <div className="sidebar__container">
      <div className="sidebar_logo">
        <img src={logo} />
      </div>
      <Stack direction="column" sx={{ margin: "0 25px" }}>
        {menuItems.map((menu: any, index: number) => (
          <Link
            to={menu.path}
            key={index}
            style={{
              background: activeMenu === menu.text ? "tomato" : "",
              color: activeMenu === menu.text ? "white" : "black",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: "5px",
            }}
            onClick={() => setActiveMenu(menu.text)}
          >
            <Stack direction="row" alignItems="center">
              <Box>{menu.icon}</Box>
              <Box sx={{ ml: 1, fontSize: "16px" }}>{menu.text}</Box>
            </Stack>
          </Link>
        ))}
      </Stack>
    </div>
  );
};

export default Sidebar;
