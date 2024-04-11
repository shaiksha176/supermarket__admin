import "./Sidebar.css";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar__container">
      <div className="sidebar_logo">
        <img src={logo} />
      </div>
      <div className="menu__list">
        <div className="menu">
          <FaShoppingCart className="icon" />
          <span>Product</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
