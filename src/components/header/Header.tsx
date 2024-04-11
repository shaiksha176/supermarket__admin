import "./Header.css";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div>
        <FaUser className="icon" />
        <span>Hi, John</span>
      </div>
      <div>
        <IoLogOut className="icon" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Header;
