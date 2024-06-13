import {
    faSearch,
    faBell,
    faUser,
    faSignOutAlt,
  } from "@fortawesome/free-solid-svg-icons";
  import img from "../images/logo-removebg.png";
  import * as solidIcons from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NavBar=()=>{
    const {AdminLogout}=useContext(AuthContext)

    return(
        <div className="top-bar flex justify-between items-center p-4 bg-white text-black shadow">
        <div className=" flex items-center ">
          <img src={img} alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-xl font-bold items-center text-orange-600">
            Berso Admin
          </h1>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-lg mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="py-1 px-2 bg-gray-200 rounded w-96"
          />
        </div>
        <div className="top-bar-icons flex items-center justify-between w-60">
          <Link to="/Notifications">
            <FontAwesomeIcon icon={faBell} className="text-lg " />
          </Link>{" "}
          <FontAwesomeIcon icon={faUser} className="text-lg " />
          <Button onClick={AdminLogout}><FontAwesomeIcon icon={faSignOutAlt} className="text-lg" /></Button>
        </div>
      </div>
    )
}
export default NavBar;